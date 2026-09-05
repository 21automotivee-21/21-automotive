import { buildSystemPrompt } from "@/lib/chat-prompt";
import { normalizeLang } from "@/lib/i18n/settings";

// ---------------------------------------------------------------------------
// Chat assistant — proxies to the Anthropic API so the API key never reaches
// the browser. Requires ANTHROPIC_API_KEY in the environment (get a key at
// console.anthropic.com); Next.js loads it from .env.local automatically.
// Without it this route responds with a clear 503 instead of failing oddly.
// Model is overridable via the CHAT_MODEL env var.
// ---------------------------------------------------------------------------

const CHAT_MODEL = process.env.CHAT_MODEL || "claude-haiku-4-5-20251001";
const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";

type ChatTurn = { role: "user" | "assistant"; content: string };

// Crude in-memory per-IP rate limit (20 messages / 5 minutes) — enough to stop
// a runaway loop from burning through API credit. In-process only, so it
// resets on redeploy and doesn't span multiple server instances.
const RATE_WINDOW_MS = 5 * 60 * 1000;
const RATE_MAX = 20;

const globalForLimits = globalThis as unknown as {
  __chatRateLimits?: Map<string, { count: number; resetAt: number }>;
};
globalForLimits.__chatRateLimits ??= new Map();
const chatRateLimits = globalForLimits.__chatRateLimits;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = chatRateLimits.get(ip) ?? { count: 0, resetAt: now + RATE_WINDOW_MS };
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + RATE_WINDOW_MS;
  }
  entry.count += 1;
  chatRateLimits.set(ip, entry);
  return entry.count > RATE_MAX;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

function validateMessages(messages: unknown): string | null {
  if (!Array.isArray(messages) || messages.length === 0) {
    return "messages array is required";
  }
  if (messages.length > 40) return "too many messages";
  for (const m of messages) {
    if (!m || (m.role !== "user" && m.role !== "assistant")) {
      return 'each message needs role "user" or "assistant"';
    }
    if (typeof m.content !== "string" || !m.content.trim()) {
      return "each message needs non-empty string content";
    }
    if (m.content.length > 4000) return "message too long";
  }
  return null;
}

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return Response.json(
      { error: "Too many messages — please wait a moment and try again." },
      { status: 429 },
    );
  }

  let body: { messages?: unknown; lang?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validationError = validateMessages(body.messages);
  if (validationError) {
    return Response.json({ error: validationError }, { status: 422 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error:
          "The AI assistant isn't configured yet. Set the ANTHROPIC_API_KEY environment variable and restart the server.",
      },
      { status: 503 },
    );
  }

  const messages: ChatTurn[] = (body.messages as ChatTurn[])
    .slice(-20)
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, 4000) }));

  try {
    const upstream = await fetch(ANTHROPIC_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        max_tokens: 512,
        system: buildSystemPrompt(normalizeLang(body.lang)),
        messages,
      }),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      console.error("Anthropic API error:", upstream.status, data);
      return Response.json(
        { error: "The assistant is temporarily unavailable. Please try again shortly." },
        { status: 502 },
      );
    }

    const reply =
      (data.content ?? [])
        .map((block: { text?: string }) => block.text ?? "")
        .join("")
        .trim() || "Sorry, I didn't catch that — could you rephrase?";

    return Response.json({ reply });
  } catch (err) {
    console.error("Chat request failed:", err);
    return Response.json(
      { error: "The assistant is temporarily unavailable. Please try again shortly." },
      { status: 502 },
    );
  }
}
