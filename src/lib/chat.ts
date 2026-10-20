// Shared by the chat widget (browser) and /api/chat (server).

export const MAX_USER_CHARS = 600;
export const MAX_ASSISTANT_CHARS = 2000;
export const MAX_TURNS = 10;

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

// The /api/chat response body is one JSON event per line (NDJSON).
export type ChatStreamEvent =
  | { type: "delta"; text: string }
  | { type: "replace"; text: string }
  | { type: "error"; message: string }
  | { type: "done" };
