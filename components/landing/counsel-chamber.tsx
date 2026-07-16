"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useLocale } from "next-intl";
import { ArrowRight, Loader2, Minimize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { localeMeta, type AppLocale } from "@/i18n/locales";

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

type ChamberBodyProps = {
  expanded: boolean;
  inUse: boolean;
  busy: boolean;
  input: string;
  messages: UIMessage[];
  error: Error | undefined;
  showEnquiryCta: boolean;
  bottomRef: React.RefObject<HTMLDivElement | null>;
  onInput: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
  onSubmitText: (text: string) => void;
  onMinimize: () => void;
  onExpand: () => void;
  onEnd: () => void;
  onFocusInput: () => void;
};

function ChamberBody({
  expanded,
  inUse,
  busy,
  input,
  messages,
  error,
  showEnquiryCta,
  bottomRef,
  onInput,
  onSubmit,
  onSubmitText,
  onMinimize,
  onExpand,
  onEnd,
  onFocusInput,
}: ChamberBodyProps) {
  return (
    <>
      {expanded ? (
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-foreground/10 bg-background/95 px-4 py-3 backdrop-blur-md sm:px-8">
          <div className="min-w-0">
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              Sovereign
            </p>
            <h2 className="font-display text-xl tracking-tight text-foreground sm:text-2xl">
              Speak with Adrian
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onMinimize}
              className="h-11 rounded-full border-foreground/20 px-4"
              aria-label="Minimize conversation"
            >
              <Minimize2 className="size-4" />
              <span className="ml-2">Minimize</span>
            </Button>
            <Button
              type="button"
              onClick={onEnd}
              className="h-11 rounded-full bg-foreground px-4 text-background hover:bg-foreground/90"
              aria-label="End conversation"
            >
              <X className="size-4" />
              <span className="ml-2">End</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between gap-4 border-b border-foreground/10 px-6 py-5 sm:px-8">
          <div className="min-w-0">
            <h2 className="font-display text-2xl tracking-tight text-foreground sm:text-3xl">
              Speak with Adrian
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              I help people see whether a Sovereign belongs with them. Share what you are
              building toward.
            </p>
          </div>
          {inUse ? (
            <div className="flex shrink-0 items-center gap-2">
              <Button
                type="button"
                size="sm"
                onClick={onExpand}
                className="rounded-full bg-foreground text-background hover:bg-foreground/90"
              >
                Expand
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onEnd}
                className="rounded-full border-foreground/20"
                aria-label="End conversation"
              >
                <X className="size-4" />
                <span className="ml-1.5 hidden sm:inline">End</span>
              </Button>
            </div>
          ) : null}
        </div>
      )}

      {expanded ? (
        <p className="shrink-0 border-b border-foreground/10 px-4 py-3 text-sm text-muted-foreground sm:px-8">
          Take your time. Your Sovereign lives with you — this conversation helps you see if one
          belongs beside you.
        </p>
      ) : null}

      <div
        className={cn(
          "flex-1 space-y-4 overflow-y-auto",
          expanded ? "px-4 py-6 sm:px-8 sm:py-8" : "px-6 py-5 sm:px-8"
        )}
      >
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2">
            {CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => onSubmitText(chip)}
                className="rounded-full border border-foreground/15 px-4 py-2 text-left text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        <div className={cn(expanded && "mx-auto w-full max-w-3xl space-y-4")}>
          {messages.map((message) => {
            const paragraphs = displayParagraphs(getMessageText(message), message.role);
            return (
              <div
                key={message.id}
                className={cn(
                  "max-w-[90%] text-sm leading-relaxed",
                  expanded && "max-w-[90%]",
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
      </div>

      {showEnquiryCta && (
        <div
          className={cn(
            "border-t border-foreground/10",
            expanded ? "px-4 py-4 sm:px-8" : "px-6 py-4 sm:px-8"
          )}
        >
          <a
            href="#pricing"
            onClick={onMinimize}
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
          "flex gap-2 border-t border-foreground/10 bg-background",
          expanded ? "p-4 sm:px-8 sm:py-5" : "p-4 sm:px-6"
        )}
      >
        <div className={cn("flex w-full gap-2", expanded && "mx-auto max-w-3xl")}>
          <Input
            value={input}
            onChange={(e) => onInput(e.target.value)}
            onFocus={onFocusInput}
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
        </div>
      </form>
    </>
  );
}

export function CounselChamber() {
  const [input, setInput] = useState("");
  const [minimized, setMinimized] = useState(false);
  const [mounted, setMounted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const locale = useLocale() as AppLocale;
  const displayCurrency = localeMeta[locale]?.currency ?? "GBP";
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/counsel",
        body: { locale, displayCurrency },
      }),
    [locale, displayCurrency]
  );

  const { messages, sendMessage, status, error, clearError, setMessages } = useChat({
    transport,
  });

  const busy = status === "submitted" || status === "streaming";
  const inUse = messages.length > 0 || busy;
  const expanded = inUse && !minimized;
  const showEnquiryCta = messages.filter((m) => m.role === "user").length >= 2;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only follow the conversation — never scroll the page on empty load.
    if (messages.length === 0) return;
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

  const bodyProps: ChamberBodyProps = {
    expanded,
    inUse,
    busy,
    input,
    messages,
    error: error ?? undefined,
    showEnquiryCta,
    bottomRef,
    onInput: setInput,
    onSubmit,
    onSubmitText: (text) => void submitText(text),
    onMinimize: () => setMinimized(true),
    onExpand: () => setMinimized(false),
    onEnd: endConversation,
    onFocusInput: () => {
      if (inUse) setMinimized(false);
    },
  };

  const collapsed = (
    <div
      id="adrian"
      className="relative flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card"
    >
      <ChamberBody {...bodyProps} expanded={false} />
    </div>
  );

  const overlay =
    expanded && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[100] flex flex-col bg-background text-foreground"
            role="dialog"
            aria-modal="true"
            aria-label="Speak with Adrian"
          >
            <ChamberBody {...bodyProps} expanded />
          </div>,
          document.body
        )
      : null;

  return (
    <>
      {expanded ? (
        <div id="adrian" className="min-h-[420px]" aria-hidden>
          <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-foreground/10 bg-card/50 px-6 text-center">
            <p className="font-display text-xl tracking-tight">Speaking with Adrian</p>
            <p className="mt-2 text-sm text-muted-foreground">Conversation is open full screen.</p>
          </div>
        </div>
      ) : (
        collapsed
      )}
      {overlay}
    </>
  );
}
