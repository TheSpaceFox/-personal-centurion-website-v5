"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { ArrowRight, Loader2, Minimize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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

/** Split so a trailing question sits on its own line under the statement. */
function displayParagraphs(text: string, role: UIMessage["role"]): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  const byBlank = trimmed
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (byBlank.length > 1) return byBlank;

  if (role === "assistant") {
    const match = trimmed.match(/^([\s\S]+[.!…])\s+([^?]+\?)\s*$/);
    if (match) return [match[1].trim(), match[2].trim()];
  }

  return [trimmed];
}

export function CounselChamber() {
  const [input, setInput] = useState("");
  const [minimized, setMinimized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/counsel" }),
    []
  );

  const { messages, sendMessage, status, error, clearError, setMessages } = useChat({
    transport,
  });

  const busy = status === "submitted" || status === "streaming";
  const inUse = messages.length > 0 || busy;
  const expanded = inUse && !minimized;
  const showEnquiryCta = messages.filter((m) => m.role === "user").length >= 2;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, status]);

  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMinimized(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  async function submitText(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    clearError();
    setInput("");
    setMinimized(false);
    await sendMessage({ text: trimmed });
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void submitText(input);
  }

  function endConversation() {
    setMessages([]);
    setInput("");
    clearError();
    setMinimized(false);
  }

  return (
    <>
      {/* Keep page flow / scroll target when overlay is open */}
      {expanded ? <div className="min-h-[420px]" aria-hidden /> : null}

      <div
        id="adrian"
        className={cn(
          "flex flex-col overflow-hidden bg-card transition-[border-radius,box-shadow] duration-500",
          expanded
            ? "fixed inset-0 z-[60] rounded-none border-0 shadow-none"
            : "relative min-h-[420px] rounded-2xl border border-foreground/10"
        )}
      >
        <div
          className={cn(
            "flex items-start justify-between gap-4 border-b border-foreground/10",
            expanded ? "px-6 py-5 sm:px-10 sm:py-6" : "px-6 py-5 sm:px-8"
          )}
        >
          <div className="min-w-0">
            <h2
              className={cn(
                "font-display tracking-tight text-foreground",
                expanded ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
              )}
            >
              Speak with Adrian
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {expanded
                ? "Take your time. Your Centurion lives with you — this conversation helps you see if one belongs beside you."
                : "I help people see whether a Personal Centurion belongs with them. Share what you are building toward."}
            </p>
          </div>

          {inUse ? (
            <div className="flex shrink-0 items-center gap-2">
              {expanded ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setMinimized(true)}
                  className="rounded-full border-foreground/20"
                  aria-label="Minimize conversation"
                >
                  <Minimize2 className="size-4" />
                  <span className="ml-1.5 hidden sm:inline">Minimize</span>
                </Button>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setMinimized(false)}
                  className="rounded-full bg-foreground text-background hover:bg-foreground/90"
                >
                  Expand
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={endConversation}
                className="rounded-full border-foreground/20"
                aria-label="End conversation"
              >
                <X className="size-4" />
                <span className="ml-1.5 hidden sm:inline">End</span>
              </Button>
            </div>
          ) : null}
        </div>

        <div
          className={cn(
            "flex-1 space-y-4 overflow-y-auto",
            expanded ? "px-6 py-6 sm:px-10 sm:py-8" : "px-6 py-5 sm:px-8"
          )}
        >
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2">
              {CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => void submitText(chip)}
                  className="rounded-full border border-foreground/15 px-4 py-2 text-left text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {messages.map((message) => {
            const paragraphs = displayParagraphs(getMessageText(message), message.role);
            return (
              <div
                key={message.id}
                className={cn(
                  "max-w-[90%] text-sm leading-relaxed",
                  expanded && "max-w-3xl",
                  message.role === "user" ? "ml-auto text-right" : ""
                )}
              >
                <div
                  className={cn(
                    "inline-block space-y-3 rounded-2xl px-4 py-3 text-left",
                    message.role === "user"
                      ? "bg-foreground text-background"
                      : "border border-foreground/10 bg-secondary text-foreground"
                  )}
                >
                  {paragraphs.map((paragraph, i) => (
                    <p key={i} className="m-0 whitespace-pre-wrap">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}

          {busy && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="size-3.5 animate-spin" />
              Thinking
            </div>
          )}

          {error && (
            <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error.message || "Adrian is temporarily unavailable."}
            </p>
          )}

          <div ref={bottomRef} />
        </div>

        {showEnquiryCta && (
          <div
            className={cn(
              "border-t border-foreground/10",
              expanded ? "px-6 py-4 sm:px-10" : "px-6 py-4 sm:px-8"
            )}
          >
            <a
              href="#pricing"
              onClick={() => setMinimized(true)}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              Continue to engagement options
              <ArrowRight className="size-4" />
            </a>
          </div>
        )}

        <form
          onSubmit={onSubmit}
          className={cn(
            "flex gap-2 border-t border-foreground/10",
            expanded ? "p-4 sm:px-10 sm:py-5" : "p-4 sm:px-6"
          )}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => {
              if (inUse) setMinimized(false);
            }}
            placeholder="What are you building your life toward?"
            disabled={busy}
            className="h-12 rounded-full border-foreground/15 bg-background px-5 text-foreground placeholder:text-muted-foreground focus-visible:border-foreground/40 focus-visible:ring-foreground/10"
          />
          <Button
            type="submit"
            disabled={busy || !input.trim()}
            className="h-12 shrink-0 rounded-full bg-foreground px-5 text-background hover:bg-foreground/90"
          >
            <ArrowRight className="size-4" />
          </Button>
        </form>
      </div>
    </>
  );
}
