import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { xai } from "@ai-sdk/xai";
import { retrieveCounselArticles } from "@/lib/counsel/knowledge";
import { buildCounselSystemPrompt } from "@/lib/counsel/system-prompt";

export const runtime = "nodejs";
export const maxDuration = 60;

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 20;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_MAX) return false;
  entry.count += 1;
  return true;
}

function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(req: Request) {
  if (!process.env.XAI_API_KEY) {
    return new Response(
      JSON.stringify({
        error:
          "Counsel is offline until XAI_API_KEY is configured on the server.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  const ip = getClientIp(req);
  if (!rateLimit(ip)) {
    return new Response(JSON.stringify({ error: "Too many requests. Pause briefly." }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: { messages?: UIMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const messages = body.messages ?? [];
  if (messages.length === 0) {
    return new Response(JSON.stringify({ error: "No messages provided." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (messages.length > 40) {
    return new Response(JSON.stringify({ error: "Conversation too long. Start a fresh counsel." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const lastText =
    lastUser?.parts
      ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join(" ") || "";

  const { catalog, contextBlock } = retrieveCounselArticles(lastText, 3);
  const system = buildCounselSystemPrompt({
    catalog,
    referenceArticles: contextBlock,
  });

  const modelId = process.env.XAI_MODEL || "grok-3";

  const result = streamText({
    model: xai.chat(modelId),
    system,
    messages: await convertToModelMessages(messages),
    temperature: 0.7,
    maxOutputTokens: 900,
  });

  return result.toUIMessageStreamResponse();
}
