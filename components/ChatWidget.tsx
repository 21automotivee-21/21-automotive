"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { ChatIcon, CloseIcon, SendIcon } from "./icons";

type ChatMessage = { role: "user" | "assistant"; content: string; error?: boolean };

/**
 * Floating AI assistant, rendered on every page by the root layout. It talks to
 * POST /api/chat, which proxies to the Anthropic API so no API key ever reaches
 * the browser.
 */
export function ChatWidget() {
  const { t, lang } = useI18n();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const greeted = useRef(false);

  useEffect(() => {
    if (!open) return;
    if (!greeted.current) {
      greeted.current = true;
      setMessages([{ role: "assistant", content: t("chat.greeting") }]);
    }
    inputRef.current?.focus();
  }, [open, t]);

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, sending]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || sending) return;

    // Only real user/assistant turns go upstream — never the error notices.
    const history = [...messages, { role: "user" as const, content: text }];
    setMessages(history);
    setDraft("");
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history
            .filter((m) => !m.error)
            .slice(-20)
            .map(({ role, content }) => ({ role, content })),
          lang,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error || t("chat.errorGeneric"), error: true },
        ]);
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t("chat.errorOffline"), error: true },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="chat-widget">
      <button
        type="button"
        className="chat-widget__toggle"
        aria-expanded={open}
        aria-label={t("chat.open")}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <ChatIcon className="icon chat-widget__icon-chat" />
        <CloseIcon className="icon chat-widget__icon-close" />
      </button>

      <div
        className="chat-widget__panel"
        data-open={String(open)}
        role="dialog"
        aria-label={`${t("chat.title")}`}
      >
        <div className="chat-widget__header">
          <div>
            <strong>{t("chat.title")}</strong>
            <span>{t("chat.subtitle")}</span>
          </div>
          <button
            type="button"
            className="chat-widget__close"
            aria-label={t("chat.close")}
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="chat-widget__messages" role="log" aria-live="polite" ref={messagesRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-msg chat-msg--${message.role}${message.error ? " chat-msg--error" : ""}`}
            >
              {message.content}
            </div>
          ))}
          {sending && <div className="chat-msg chat-msg--assistant chat-msg--typing">···</div>}
        </div>

        <form className="chat-widget__input-row" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="chat-widget__input"
            placeholder={t("chat.placeholder")}
            aria-label="Message"
            autoComplete="off"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          <button type="submit" className="chat-widget__send" aria-label={t("chat.send")}>
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
}
