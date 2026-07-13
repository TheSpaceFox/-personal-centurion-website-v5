"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { ArrowRight, ArrowUpRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VISITOR_STAGES, inferStageFromMessages } from "@/lib/counsel/stages";

const CHIPS = [
  "I'm clarifying my life's mission",
  "I'm on a board",
  "Privacy is non-negotiable",
  "Cloud AI isn't loyal enough",
];

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function CounselChamber({ compact = false }: { compact?: boolean }) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/counsel" }),
    []
  );

  const { messages, sendMessage, status, error, clearError } = useChat({
    transport,
  });

  const busy = status === "submitted" || status === "streaming";

  const stage = useMemo(
    () =>
      inferStageFromMessages(
        messages.map((m) => ({ role: m.role, content: getMessageText(m) }))
      ),
    [messages]
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, status]);

  async function submitText(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    clearError();
    setInput("");
    await sendMessage({ text: trimmed });
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void submitText(input);
  }

  const stageIndex = VISITOR_STAGES.findIndex((s) => s.id === stage);

  return (
    <div
      id="counsel"
      className={`relative flex flex-col overflow-hidden border border-white/15 bg-[#0c0c0c] text-[#f4f1ec] shadow-[0_24px_80px_rgba(0,0,0,0.35)] ${
        compact ? "h-[min(640px,70vh)] rounded-sm" : "min-h-[520px] rounded-sm"
      }`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
        <div>
          <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-white/45">
            Briefing
          </p>
          <h3 className="font-display text-xl tracking-tight">Speak with Personal Centurion</h3>
        </div>
        <span className="font-mono text-[10px] tracking-widest uppercase text-white/40">
          Mission counsel
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-white/10 px-5 py-3">
        {VISITOR_STAGES.map((s, i) => {
          const active = i === stageIndex;
          const done = i < stageIndex;
          return (
            <div
              key={s.id}
              className={`shrink-0 px-3 py-1.5 border transition-colors ${
                active
                  ? "border-white/70 bg-white text-black"
                  : done
                    ? "border-white/30 text-white/70"
                    : "border-white/10 text-white/35"
              }`}
            >
              <span className="font-mono text-[10px] tracking-widest uppercase">
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {messages.length === 0 && (
          <div className="animate-in fade-in duration-700">
            <p className="font-display text-2xl leading-tight mb-3">
              What are you building your life toward?
            </p>
            <p className="text-sm text-white/55 leading-relaxed max-w-md mb-5">
              Personal Centurion helps people discover and live their life&apos;s mission —
              privately, on hardware they own. Share your situation and we will
              find whether one fits.
            </p>
            <div className="flex flex-wrap gap-2">
              {CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => void submitText(chip)}
                  className="border border-white/20 px-3 py-2 text-left text-xs text-white/70 hover:border-white/50 hover:text-white transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => {
          const text = getMessageText(message);
          if (!text) return null;
          const isUser = message.role === "user";
          return (
            <div
              key={message.id}
              className={`animate-in fade-in slide-in-from-bottom-2 duration-400 ${
                isUser ? "ml-8 text-right" : "mr-4"
              }`}
            >
              <p className="font-mono text-[10px] tracking-widest uppercase text-white/35 mb-1">
                {isUser ? "You" : "Personal Centurion"}
              </p>
              <div
                className={`inline-block max-w-full whitespace-pre-wrap text-sm leading-relaxed px-4 py-3 ${
                  isUser
                    ? "bg-white text-black text-left"
                    : "bg-white/5 border border-white/10 text-white/85"
                }`}
              >
                {text}
              </div>
            </div>
          );
        })}

        {busy && (
          <div className="flex items-center gap-2 text-white/45 font-mono text-xs tracking-widest uppercase">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Thinking
          </div>
        )}

        {error && (
          <p className="text-sm text-red-300/90 border border-red-400/30 bg-red-500/10 px-3 py-2">
            {error.message || "Counsel temporarily unavailable."}
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="border-t border-white/10 px-5 py-3 flex flex-wrap gap-2">
        <a
          href="#pricing"
          className="inline-flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-white/55 hover:text-white transition-colors"
        >
          Secure build slot <ArrowUpRight className="w-3 h-3" />
        </a>
        <a
          href="#pricing"
          className="inline-flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-white/55 hover:text-white transition-colors"
        >
          Board edition <ArrowUpRight className="w-3 h-3" />
        </a>
        <a
          href="#limited-edition"
          className="inline-flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-white/55 hover:text-white transition-colors"
        >
          Limited edition <ArrowUpRight className="w-3 h-3" />
        </a>
        <a
          href="mailto:hello@personal-centurion.com?subject=Personal%20Centurion%20enquiry"
          className="inline-flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-white/55 hover:text-white transition-colors"
        >
          Email hello@ <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>

      <form onSubmit={onSubmit} className="border-t border-white/10 p-4 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tell Centurion your situation…"
          disabled={busy}
          className="h-12 rounded-none border-white/20 bg-white/5 text-[#f4f1ec] placeholder:text-white/35 focus-visible:border-white/50 focus-visible:ring-white/20"
        />
        <Button
          type="submit"
          disabled={busy || !input.trim()}
          className="h-12 px-5 rounded-none bg-[#f4f1ec] text-black hover:bg-white shrink-0"
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
