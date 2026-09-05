// 21 Automotive — local dev server
// Serves the static site and a small JSON API backed by SQLite (Node's built-in
// node:sqlite module — no extra dependencies to install).
//
// Endpoints:
//   POST /api/bookings              Create a test-drive booking
//   GET  /api/bookings              List bookings (requires x-admin-key header — see ADMIN_KEY below)
//   POST /api/finance-applications  Create a financing pre-qualification application
//   GET  /api/finance-applications  List applications (requires x-admin-key header)
//   POST /api/chat                  AI site assistant (see "Chat assistant" section below)
//
// Run with:  node server/index.js
// The site is then available at http://localhost:5173

const http = require("http");
const fs = require("fs");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");
const { VEHICLES } = require("../js/vehicles-data.js");
const { EXPORT_VEHICLES } = require("../js/export-vehicles.js");

const ROOT = path.join(__dirname, "..");
const PORT = process.env.PORT || 5173;
const ADMIN_KEY = process.env.ADMIN_KEY || "dev-admin-key";

// ---------------------------------------------------------------------------
// Local .env loader — no dependency, just a plain KEY=value file at
// server/.env (one per line, "#" comments allowed). This exists because the
// dev server here can be launched in ways that don't let you pass process
// env vars in directly (e.g. the preview tool's launch config), so a local
// file is the reliable option. Never commit this file — it's for your
// machine only. Values already set in the real environment win; this only
// fills in what's missing.
// ---------------------------------------------------------------------------
(function loadLocalEnv() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
})();

// ---------------------------------------------------------------------------
// Chat assistant — proxies to the Anthropic API so the API key never reaches
// the browser. Requires ANTHROPIC_API_KEY to be set before starting this
// server (get a key at console.anthropic.com) — either as a real environment
// variable, or by creating server/.env with a line like:
//   ANTHROPIC_API_KEY=your-key-here
// Without it, POST /api/chat responds with a clear 503 instead of failing
// oddly. Model is overridable via the CHAT_MODEL env var.
// ---------------------------------------------------------------------------
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";
const CHAT_MODEL = process.env.CHAT_MODEL || "claude-haiku-4-5-20251001";

// ---------------------------------------------------------------------------
// Database
// ---------------------------------------------------------------------------
const db = new DatabaseSync(path.join(__dirname, "data.sqlite"));

db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id TEXT,
    vehicle_name TEXT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    preferred_date TEXT NOT NULL,
    preferred_time TEXT,
    message TEXT,
    deposit_requested INTEGER NOT NULL DEFAULT 0,
    deposit_amount INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending_confirmation',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

const insertBooking = db.prepare(`
  INSERT INTO bookings
    (vehicle_id, vehicle_name, name, email, phone, preferred_date, preferred_time, message, deposit_requested, deposit_amount, status)
  VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const listBookings = db.prepare(`SELECT * FROM bookings ORDER BY created_at DESC`);

db.exec(`
  CREATE TABLE IF NOT EXISTS finance_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id TEXT,
    vehicle_name TEXT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    budget_range TEXT NOT NULL,
    est_car_price REAL,
    est_down_payment REAL,
    est_monthly_payment REAL,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

const insertFinanceApp = db.prepare(`
  INSERT INTO finance_applications
    (vehicle_id, vehicle_name, name, email, phone, budget_range, est_car_price, est_down_payment, est_monthly_payment, status)
  VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const listFinanceApps = db.prepare(`SELECT * FROM finance_applications ORDER BY created_at DESC`);

// ---------------------------------------------------------------------------
// Deposit handling — deliberately NOT a real payment integration.
//
// This project has no payment processor credentials (Stripe, etc). Rather than
// build a fake card-entry form — which would either collect real card numbers
// insecurely or silently pretend to charge people — a deposit request is
// stored as an intent. Staff follow up with a real, secure payment link
// (e.g. a genuine Stripe Checkout link) once a Stripe account is connected.
// See DEPOSIT_AMOUNT below and the swap-in point noted for real integration.
// ---------------------------------------------------------------------------
const DEPOSIT_AMOUNT = 100; // USD, refundable

// ---------------------------------------------------------------------------
// Static file serving
// ---------------------------------------------------------------------------
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".json": "application/json",
};

function serveStatic(req, res, pathname) {
  let filePath = path.join(ROOT, pathname === "/" ? "/index.html" : pathname);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
}

// ---------------------------------------------------------------------------
// JSON helpers
// ---------------------------------------------------------------------------
function sendJSON(res, status, body) {
  const data = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(data),
  });
  res.end(data);
}

function readJSONBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1e6) req.destroy(); // 1MB guard
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateBooking(body) {
  const errors = [];
  if (!body.name || typeof body.name !== "string" || !body.name.trim()) errors.push("name is required");
  if (!body.email || !EMAIL_RE.test(body.email)) errors.push("a valid email is required");
  if (!body.phone || typeof body.phone !== "string" || !body.phone.trim()) errors.push("phone is required");
  if (!body.date || typeof body.date !== "string" || !body.date.trim()) errors.push("preferred date is required");
  return errors;
}

// ---------------------------------------------------------------------------
// API handlers
// ---------------------------------------------------------------------------
async function handleCreateBooking(req, res) {
  let body;
  try {
    body = await readJSONBody(req);
  } catch {
    return sendJSON(res, 400, { error: "Invalid JSON body" });
  }

  const errors = validateBooking(body);
  if (errors.length) {
    return sendJSON(res, 422, { error: "Validation failed", details: errors });
  }

  const depositRequested = Boolean(body.depositRequested);

  const result = insertBooking.run(
    body.vehicleId || null,
    body.vehicleName || null,
    body.name.trim(),
    body.email.trim(),
    body.phone.trim(),
    body.date.trim(),
    body.time || null,
    body.message || null,
    depositRequested ? 1 : 0,
    depositRequested ? DEPOSIT_AMOUNT : 0,
    "pending_confirmation",
  );

  sendJSON(res, 201, {
    id: Number(result.lastInsertRowid),
    status: "pending_confirmation",
    depositRequested,
    depositAmount: depositRequested ? DEPOSIT_AMOUNT : 0,
    message: depositRequested
      ? `Request received. A member of our team will send a secure payment link to collect the $${DEPOSIT_AMOUNT} refundable deposit and confirm your appointment.`
      : "Request received. A member of our team will confirm your appointment shortly.",
  });
}

function handleListBookings(req, res) {
  if (req.headers["x-admin-key"] !== ADMIN_KEY) {
    return sendJSON(res, 401, { error: "Unauthorized. Pass header x-admin-key." });
  }
  const rows = listBookings.all();
  sendJSON(res, 200, { count: rows.length, bookings: rows });
}

function validateFinanceApp(body) {
  const errors = [];
  if (!body.name || typeof body.name !== "string" || !body.name.trim()) errors.push("name is required");
  if (!body.email || !EMAIL_RE.test(body.email)) errors.push("a valid email is required");
  if (!body.phone || typeof body.phone !== "string" || !body.phone.trim()) errors.push("phone is required");
  if (!body.budgetRange || typeof body.budgetRange !== "string" || !body.budgetRange.trim()) errors.push("budget is required");
  return errors;
}

async function handleCreateFinanceApp(req, res) {
  let body;
  try {
    body = await readJSONBody(req);
  } catch {
    return sendJSON(res, 400, { error: "Invalid JSON body" });
  }

  const errors = validateFinanceApp(body);
  if (errors.length) {
    return sendJSON(res, 422, { error: "Validation failed", details: errors });
  }

  const toNumberOrNull = (v) => (v === undefined || v === null || v === "" || Number.isNaN(Number(v)) ? null : Number(v));

  const result = insertFinanceApp.run(
    body.vehicleId || null,
    body.vehicleName || null,
    body.name.trim(),
    body.email.trim(),
    body.phone.trim(),
    body.budgetRange.trim(),
    toNumberOrNull(body.estCarPrice),
    toNumberOrNull(body.estDownPayment),
    toNumberOrNull(body.estMonthlyPayment),
    "new",
  );

  sendJSON(res, 201, {
    id: Number(result.lastInsertRowid),
    status: "new",
    message: "Application received. A financing specialist will reach out shortly to walk through your options — no credit check is run until you're ready.",
  });
}

function handleListFinanceApps(req, res) {
  if (req.headers["x-admin-key"] !== ADMIN_KEY) {
    return sendJSON(res, 401, { error: "Unauthorized. Pass header x-admin-key." });
  }
  const rows = listFinanceApps.all();
  sendJSON(res, 200, { count: rows.length, applications: rows });
}

// ---------------------------------------------------------------------------
// Chat assistant — system prompt, rate limiting, request handling
// ---------------------------------------------------------------------------
function buildSystemPrompt(lang) {
  const localList = VEHICLES
    .map((v) => `- ${v.name} | ${v.category} | ${v.price} | ${v.mileage} | ${v.condition} | fuel: ${v.fuel} | id: ${v.id}`)
    .join("\n");

  const exportList = EXPORT_VEHICLES
    .map((v) => `- ${v.year} ${v.make} ${v.model} ${v.trim} | €${v.netPriceEUR.toLocaleString("en-DE")} net | ${v.mileageKm.toLocaleString("en-DE")} km | ${v.fuel} | ${v.powerPS} PS | ${v.vatStatus === "deductible" ? "VAT deductible" : "margin-taxed"} | ${v.titleAvailable ? "export title available" : "NO export title"} | id: ${v.id}`)
    .join("\n");

  return `You are the AI assistant embedded on the 21 Automotive website — a car dealership opening in 2026 in Los Angeles. Phone +20 150 058 5100, email 21automotivee@gmail.com, open every day 12pm–12am.

Help visitors with anything about this site: browsing local inventory, export cars sourced from Germany, financing/loan estimates, warranty coverage, service packages, accessories, booking a test drive, and general contact/business info.

SITE PAGES: Home (index.html), Inventory (inventory.html) — local US lot, Export Cars (export.html) — vehicles sourced from Germany for export, Book a Test Drive (book-test-drive.html), Financing (financing.html) — loan calculator + pre-qualification form, Warranty (warranty.html), Service Packages (service-packages.html), Accessories (accessories.html), Contact (contact.html).

LOCAL INVENTORY (USD, on the lot):
${localList}

EXPORT INVENTORY (EUR net export price, sourced from Germany — see the Export Cars page for the full VAT explainer):
${exportList}

GUIDELINES:
- Be concise, friendly, and helpful. Point people to the right page by name when relevant.
- Only state specific prices/specs that appear above — don't invent numbers, VINs, or availability.
- For financing questions, explain the Financing page has a live loan calculator (price, down payment, APR, term) and a no-credit-check pre-qualification form.
- For export questions: VAT-deductible cars have Germany's 19% VAT zero-rated on export, so the net price above is the real cost; margin-taxed cars have no separate VAT to deduct, so the listed price is already the export price. Flag "NO export title" vehicles as generally not re-registerable abroad.
- To book a test drive, apply for financing, or ask something only staff can answer, direct users to the relevant form or the Contact page / phone / email — don't collect sensitive personal or payment info yourself.
- If asked something unrelated to 21 Automotive, politely steer back to how you can help with the site.
- Keep replies short (a few sentences) unless the user asks for more detail.
- The visitor's site language is set to "${lang === "ar" ? "Arabic" : "English"}". Reply in ${lang === "ar" ? "Arabic" : "English"} unless the user writes in a different language, in which case follow their language instead.`;
}

// Crude in-memory per-IP rate limit (20 messages / 5 minutes) — enough to
// stop a runaway loop from burning through API credit on this small server.
const chatRateLimits = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000;
  const max = 20;
  const entry = chatRateLimits.get(ip) || { count: 0, resetAt: now + windowMs };
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + windowMs;
  }
  entry.count += 1;
  chatRateLimits.set(ip, entry);
  return entry.count > max;
}

function validateChatMessages(body) {
  if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
    return "messages array is required";
  }
  if (body.messages.length > 40) return "too many messages";
  for (const m of body.messages) {
    if (!m || (m.role !== "user" && m.role !== "assistant")) return "each message needs role \"user\" or \"assistant\"";
    if (typeof m.content !== "string" || !m.content.trim()) return "each message needs non-empty string content";
    if (m.content.length > 4000) return "message too long";
  }
  return null;
}

async function handleChat(req, res) {
  const ip = req.socket.remoteAddress || "unknown";
  if (isRateLimited(ip)) {
    return sendJSON(res, 429, { error: "Too many messages — please wait a moment and try again." });
  }

  let body;
  try {
    body = await readJSONBody(req);
  } catch {
    return sendJSON(res, 400, { error: "Invalid JSON body" });
  }

  const validationError = validateChatMessages(body);
  if (validationError) {
    return sendJSON(res, 422, { error: validationError });
  }

  if (!ANTHROPIC_API_KEY) {
    return sendJSON(res, 503, {
      error: "The AI assistant isn't configured yet. Set the ANTHROPIC_API_KEY environment variable on the server and restart it.",
    });
  }

  const messages = body.messages.slice(-20).map((m) => ({ role: m.role, content: m.content.trim().slice(0, 4000) }));
  const lang = body.lang === "ar" ? "ar" : "en";

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        max_tokens: 512,
        system: buildSystemPrompt(lang),
        messages,
      }),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      console.error("Anthropic API error:", upstream.status, data);
      return sendJSON(res, 502, { error: "The assistant is temporarily unavailable. Please try again shortly." });
    }

    const reply = (data.content || []).map((block) => block.text || "").join("").trim()
      || "Sorry, I didn't catch that — could you rephrase?";

    sendJSON(res, 200, { reply });
  } catch (err) {
    console.error("Chat request failed:", err);
    sendJSON(res, 502, { error: "The assistant is temporarily unavailable. Please try again shortly." });
  }
}

// ---------------------------------------------------------------------------
// Server
// ---------------------------------------------------------------------------
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/api/bookings" && req.method === "POST") {
    return handleCreateBooking(req, res);
  }
  if (url.pathname === "/api/bookings" && req.method === "GET") {
    return handleListBookings(req, res);
  }
  if (url.pathname === "/api/finance-applications" && req.method === "POST") {
    return handleCreateFinanceApp(req, res);
  }
  if (url.pathname === "/api/finance-applications" && req.method === "GET") {
    return handleListFinanceApps(req, res);
  }
  if (url.pathname === "/api/chat" && req.method === "POST") {
    return handleChat(req, res);
  }
  if (url.pathname.startsWith("/api/")) {
    return sendJSON(res, 404, { error: "Not found" });
  }

  serveStatic(req, res, url.pathname);
});

server.listen(PORT, () => {
  console.log(`21 Automotive server running at http://localhost:${PORT}`);
  console.log(`Bookings DB: ${path.join(__dirname, "data.sqlite")}`);
});
