import Anthropic from "@anthropic-ai/sdk";
import {
  MAX_ASSISTANT_CHARS,
  MAX_TURNS,
  MAX_USER_CHARS,
  type ChatMessage,
  type ChatStreamEvent,
} from "@/lib/chat";
import { SYSTEM_PROMPT } from "@/lib/chat-prompt";
import { translations, type Lang } from "@/lib/i18n";

export const maxDuration = 60;

const MODEL = process.env.CHAT_MODEL || "claude-haiku-5-5";
// Haiku has no server-side refusal fallback.
const FALLBACK = MODEL.startsWith("claude-haiku")
  ? {}
  : { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" as const };
// Caps the cost of a single answer; leaves room for short thinking plus a reply.
const MAX_OUTPUT_TOKENS = 2048;
const MAX_BODY_BYTES = 64_000;

// Best-effort limits, kept per server instance. The real cost ceiling is the
// monthly spend limit on the Anthropic account.
const WINDOW_MS = 10 * 60 * 1000;
const WINDOW_LIMIT = 15;
const DAY_MS = 24 * 60 * 60 * 1000;
const DAY_LIMIT = 40;
const INSTANCE_DAY_LIMIT = 500;

const hits = new Map<string, number[]>();
let instanceDay = { start: Date.now(), count: 0 };

let client: Anthropic | null = null;
function getClient() {
  // Created lazily so a missing key fails the request, not the build.
  client ??= new Anthropic();
  return client;
}

function json(status: number, error: string) {
  return Response.json({ error }, { status, headers: { "Cache-Control": "no-store" } });
}

function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

// On Vercel the edge sets x-forwarded-for, so clients can't spoof it. IPv6
// clients usually control a whole /64, so limit by that prefix.
function clientKey(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (!ip.includes(":") || ip.includes("::ffff:")) return ip;
  const [head, tail = ""] = ip.split("::");
  const left = head ? head.split(":") : [];
  const right = tail ? tail.split(":") : [];
  const groups = [...left, ...Array(Math.max(0, 8 - left.length - right.length)).fill("0"), ...right];
  const prefix = groups.slice(0, 4).map((g) => (parseInt(g, 16) || 0).toString(16));
  return `${prefix.join(":")}::/64`;
}

function rateLimited(ip: string, now: number) {
  if (now - instanceDay.start > DAY_MS) instanceDay = { start: now, count: 0 };
  if (instanceDay.count >= INSTANCE_DAY_LIMIT) return true;

  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (now - times[times.length - 1] > DAY_MS) hits.delete(key);
    }
  }

  const recent = (hits.get(ip) ?? []).filter((t) => now - t < DAY_MS);
  const inWindow = recent.filter((t) => now - t < WINDOW_MS).length;
  if (recent.length >= DAY_LIMIT || inWindow >= WINDOW_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  instanceDay.count++;
  return false;
}

function parseBody(body: unknown): { lang: Lang; messages: ChatMessage[] } | null {
  if (typeof body !== "object" || body === null) return null;
  const { lang, messages } = body as Record<string, unknown>;
  if (lang !== "en" && lang !== "he") return null;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_TURNS * 2 - 1) {
    return null;
  }

  const clean: ChatMessage[] = [];
  for (const [i, message] of messages.entries()) {
    if (typeof message !== "object" || message === null) return null;
    const { role, content } = message as Record<string, unknown>;
    const expected = i % 2 === 0 ? "user" : "assistant";
    if (role !== expected || typeof content !== "string") return null;
    const text = content.trim();
    const max = expected === "user" ? MAX_USER_CHARS : MAX_ASSISTANT_CHARS;
    if (!text || text.length > max) return null;
    clean.push({ role: expected, content: text });
  }
  if (clean[clean.length - 1].role !== "user") return null;
  return { lang, messages: clean };
}

function logError(error: unknown) {
  if (error instanceof Anthropic.AuthenticationError) {
    console.error("[chat] Anthropic authentication failed; check ANTHROPIC_API_KEY");
  } else if (error instanceof Anthropic.RateLimitError) {
    console.error("[chat] Anthropic rate limit:", error.message);
  } else if (error instanceof Anthropic.APIError) {
    console.error(`[chat] Anthropic API error ${error.status}:`, error.message);
  } else {
    console.error("[chat] Unexpected error:", error);
  }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json(403, "Forbidden");

  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return json(413, "Request too large");

  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return json(400, "Invalid request");
  }
  if (raw.length > MAX_BODY_BYTES) return json(413, "Request too large");

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, "Invalid request");
  }

  const lang: Lang = (body as { lang?: unknown })?.lang === "he" ? "he" : "en";
  const t = translations[lang].chat;

  const parsed = parseBody(body);
  if (!parsed) return json(400, t.invalid);

  if (rateLimited(clientKey(req), Date.now())) return json(429, t.rateLimited);

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("[chat] ANTHROPIC_API_KEY is not set");
    return json(503, t.error);
  }

  let anthropic: Anthropic;
  try {
    anthropic = getClient();
  } catch (error) {
    logError(error);
    return json(503, t.error);
  }

  const stream = anthropic.beta.messages.stream(
    {
      model: MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      output_config: { effort: "low" },
      // Second breakpoint: caches the conversation so far for the next turn.
      cache_control: { type: "ephemeral" },
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages: parsed.messages,
      // On a policy refusal the API retries on its recommended fallback model.
      ...FALLBACK,
    },
    { signal: req.signal },
  );

  const encoder = new TextEncoder();
  const responseBody = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: ChatStreamEvent) =>
        controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));
      let sentText = false;
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            sentText ||= event.delta.text.length > 0;
            send({ type: "delta", text: event.delta.text });
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          // Discard any partial text from a declined answer.
          send({ type: "replace", text: t.refusal });
        } else if (final.stop_reason === "max_tokens") {
          // Thinking can use the whole budget before any visible text.
          if (sentText) send({ type: "delta", text: "…" });
          else send({ type: "error", message: t.error });
        }
        console.log("[chat] usage", {
          model: final.model,
          stop: final.stop_reason,
          input: final.usage.input_tokens,
          cacheRead: final.usage.cache_read_input_tokens,
          cacheWrite: final.usage.cache_creation_input_tokens,
          output: final.usage.output_tokens,
        });
        send({ type: "done" });
      } catch (error) {
        if (!(error instanceof Anthropic.APIUserAbortError)) {
          logError(error);
          try {
            send({ type: "error", message: t.error });
          } catch {
            // The client is gone.
          }
        }
      } finally {
        try {
          controller.close();
        } catch {
          // Already closed or cancelled.
        }
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(responseBody, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
