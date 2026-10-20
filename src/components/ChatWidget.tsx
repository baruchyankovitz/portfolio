"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import {
  MAX_ASSISTANT_CHARS,
  MAX_TURNS,
  MAX_USER_CHARS,
  type ChatMessage,
  type ChatRole,
  type ChatStreamEvent,
} from "@/lib/chat";

interface UiMessage {
  id: number;
  role: ChatRole;
  content: string;
  status: "done" | "streaming" | "error";
}

// URLs stop at whitespace, quotes (including curly quotes and Hebrew gershayim)
// and Hebrew letters, so a link written next to Hebrew text keeps a clean href.
const LINK_PATTERN =
  /(https?:\/\/[^\s<>"'()֐-׿“-‟]+[^\s<>"'().,;:!?֐-׿“-‟]|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;
const HEBREW = /[֐-׿]/;

type Dir = "rtl" | "ltr";

// Hebrew answers often start with an English technology name, which would make
// dir="auto" lay the whole bubble out left-to-right.
function textDir(text: string): Dir | undefined {
  if (!text.trim()) return undefined;
  return HEBREW.test(text) ? "rtl" : "ltr";
}

// Cut to max UTF-16 units without leaving half of a surrogate pair.
function clip(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return /[\uD800-\uDBFF]$/.test(cut) ? cut.slice(0, -1) : cut;
}

// Only completed question/answer pairs are sent back as history.
function buildHistory(list: UiMessage[]): ChatMessage[] {
  const history: ChatMessage[] = [];
  for (let i = 0; i + 1 < list.length; i++) {
    const question = list[i];
    const answer = list[i + 1];
    if (
      question.role === "user" &&
      answer.role === "assistant" &&
      answer.status === "done" &&
      answer.content.trim()
    ) {
      history.push(
        { role: "user", content: question.content },
        { role: "assistant", content: clip(answer.content, MAX_ASSISTANT_CHARS) },
      );
      i++;
    }
  }
  return history.slice(-(MAX_TURNS - 1) * 2);
}

// Turns URLs and email addresses into links. Text stays text: no HTML is injected.
function linkify(text: string): ReactNode[] {
  return text.split(LINK_PATTERN).map((part, i) => {
    if (i % 2 === 0) return part;
    const isEmail = !part.includes("://");
    return (
      <a
        key={i}
        href={isEmail ? `mailto:${part}` : part}
        target={isEmail ? undefined : "_blank"}
        rel="noopener noreferrer"
        className="break-all text-[var(--color-accent)] underline decoration-[var(--color-accent)]/40 underline-offset-2 hover:decoration-[var(--color-accent)]"
      >
        {part}
      </a>
    );
  });
}

function Bubble({
  role,
  status,
  dir,
  children,
}: {
  role: ChatRole;
  status?: UiMessage["status"];
  dir?: Dir;
  children: ReactNode;
}) {
  const isUser = role === "user";
  const tone =
    status === "error"
      ? "border border-red-400/25 bg-red-500/10 text-red-200"
      : isUser
        ? "bg-[var(--color-accent)]/15 text-white"
        : "bg-white/[0.05] text-[var(--color-text-primary)]";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        dir={dir ?? "auto"}
        className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${tone}`}
      >
        {children}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-1" aria-hidden="true">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-text-secondary)] motion-reduce:animate-none"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  );
}

export default function ChatWidget() {
  const { lang, t } = useLanguage();
  const uiDir: Dir = lang === "he" ? "rtl" : "ltr";
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const nextId = useRef(0);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  const limitReached = messages.filter((m) => m.role === "user").length >= MAX_TURNS;

  // Stop an answer in flight when the page goes away.
  useEffect(() => () => abortRef.current?.abort(), []);

  // Focus the input on open; return focus to the launcher on close.
  useEffect(() => {
    if (open) inputRef.current?.focus();
    else if (wasOpen.current) launcherRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, open]);

  async function send(text: string) {
    const question = text.trim().slice(0, MAX_USER_CHARS);
    if (!question || busy || limitReached) return;

    const history = buildHistory(messages);
    const questionId = ++nextId.current;
    const answerId = ++nextId.current;
    setMessages((prev) => [
      ...prev,
      { id: questionId, role: "user", content: question, status: "done" },
      { id: answerId, role: "assistant", content: "", status: "streaming" },
    ]);
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    setBusy(true);

    const update = (change: (m: UiMessage) => UiMessage) =>
      setMessages((prev) => prev.map((m) => (m.id === answerId ? change(m) : m)));

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang, messages: [...history, { role: "user", content: question }] }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        update((m) => ({ ...m, content: data?.error ?? t.chat.error, status: "error" }));
        return;
      }

      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      let buffer = "";
      let finished = false;
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += value;
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line) as ChatStreamEvent;
          if (event.type === "delta") update((m) => ({ ...m, content: m.content + event.text }));
          else if (event.type === "replace") update((m) => ({ ...m, content: event.text }));
          else if (event.type === "error") update((m) => ({ ...m, content: event.message, status: "error" }));
          else finished = true;
        }
      }
      update((m) => {
        if (m.status === "error") return m;
        return finished && m.content
          ? { ...m, status: "done" }
          : { ...m, content: t.chat.error, status: "error" };
      });
    } catch {
      const stopped = controller.signal.aborted;
      update((m) =>
        stopped && m.content
          ? { ...m, status: "done" }
          : { ...m, content: stopped ? t.chat.stopped : t.chat.error, status: "error" },
      );
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setBusy(false);
    }
  }

  function stop() {
    abortRef.current?.abort();
  }

  function reset() {
    abortRef.current?.abort();
    setMessages([]);
    setInput("");
    inputRef.current?.focus();
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send(input);
    }
  }

  function onInput(e: ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 112)}px`;
  }

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            ref={launcherRef}
            key="launcher"
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t.chat.open}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] end-5 z-[60] flex items-center gap-2.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-card)]/90 py-2.5 ps-2.5 pe-4 text-sm font-medium text-white shadow-[0_0_32px_rgba(0,212,255,0.18)] backdrop-blur-md transition-colors hover:border-[var(--color-accent)]/60"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)]">
              <svg className="h-4 w-4 text-black" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9L12 2zm7 11l.9 2.6 2.6.9-2.6.9L19 20l-.9-2.6-2.6-.9 2.6-.9L19 13z" />
              </svg>
              <span className="pulse-dot absolute -top-0.5 -end-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--color-card)] bg-emerald-400" />
            </span>
            {t.chat.launcher}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            role="dialog"
            aria-label={t.chat.title}
            onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] end-4 z-[60] flex h-[min(620px,calc(100dvh_-_2rem))] w-[min(400px,calc(100vw_-_2rem))] flex-col overflow-hidden rounded-2xl border border-[var(--color-border-hover)] bg-[var(--color-card)]/95 shadow-2xl shadow-black/60 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3">
              <div className="relative flex-shrink-0">
                <Image
                  src="/profile.jpg"
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <span className="absolute -bottom-0.5 -end-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--color-card)] bg-emerald-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{t.chat.title}</p>
                <p className="truncate text-[11px] text-[var(--color-text-muted)]">{t.chat.subtitle}</p>
              </div>
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  aria-label={t.chat.newChat}
                  title={t.chat.newChat}
                  className="rounded-lg p-1.5 text-[var(--color-text-secondary)] transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.chat.close}
                className="rounded-lg p-1.5 text-[var(--color-text-secondary)] transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} role="log" className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              <Bubble role="assistant" dir={uiDir}>
                {t.chat.greeting}
              </Bubble>
              {messages.map((m, i) => (
                <Bubble
                  key={m.id}
                  role={m.role}
                  status={m.status}
                  // Answers come in the visitor's language, so they follow the question.
                  dir={
                    m.role === "user"
                      ? textDir(m.content)
                      : m.status === "error"
                        ? uiDir
                        : textDir(messages[i - 1]?.content ?? m.content)
                  }
                >
                  {m.status === "streaming" && !m.content ? <TypingDots /> : linkify(m.content)}
                </Bubble>
              ))}
              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {t.chat.suggestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => send(question)}
                      className="rounded-full border border-[var(--color-border-hover)] bg-white/[0.03] px-3 py-1.5 text-start text-xs text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-white"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={onSubmit} className="border-t border-[var(--color-border)] p-3">
              {limitReached ? (
                <div className="flex flex-col items-center gap-2 py-1 text-center">
                  <p className="text-xs text-[var(--color-text-secondary)]">{t.chat.limit}</p>
                  <button
                    type="button"
                    onClick={reset}
                    className="rounded-full border border-[var(--color-accent)]/40 px-4 py-1.5 text-xs font-medium text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)]/10"
                  >
                    {t.chat.newChat}
                  </button>
                </div>
              ) : (
                <div className="flex items-end gap-2 rounded-xl border border-[var(--color-border)] bg-white/[0.03] px-3 py-2 transition-colors focus-within:border-[var(--color-accent)]/40">
                  <textarea
                    ref={inputRef}
                    id="chat-input"
                    rows={1}
                    dir="auto"
                    value={input}
                    maxLength={MAX_USER_CHARS}
                    onChange={onInput}
                    onKeyDown={onKeyDown}
                    placeholder={t.chat.placeholder}
                    aria-label={t.chat.placeholder}
                    className="max-h-28 min-h-[1.5rem] flex-1 resize-none bg-transparent text-sm leading-6 text-white placeholder:text-[var(--color-text-muted)] focus:outline-none"
                  />
                  {busy ? (
                    <button
                      type="button"
                      onClick={stop}
                      aria-label={t.chat.stop}
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/[0.08] text-white transition-colors hover:bg-white/[0.14]"
                    >
                      <span className="h-3 w-3 rounded-sm bg-current" aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!input.trim()}
                      aria-label={t.chat.send}
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent)] text-black transition-opacity disabled:opacity-30"
                    >
                      <svg className="h-4 w-4 rtl:-scale-x-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
              <p className="mt-2 text-center text-[10px] leading-4 text-[var(--color-text-muted)]">{t.chat.disclaimer}</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
