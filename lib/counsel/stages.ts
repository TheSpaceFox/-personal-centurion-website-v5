export type CounselStageId = "rapport" | "clarity" | "fit" | "next";

export const VISITOR_STAGES: {
  id: CounselStageId;
  label: string;
  hint: string;
}[] = [
  { id: "rapport", label: "Rapport", hint: "Help is possible" },
  { id: "clarity", label: "Clarity", hint: "Mission & situation" },
  { id: "fit", label: "Fit", hint: "Why Centurion" },
  { id: "next", label: "Next step", hint: "Build slot or enquire" },
];

/** Soft heuristic for UI chrome only — sales logic lives in the system prompt. */
export function inferStageFromMessages(
  messages: { role: string; content: string }[]
): CounselStageId {
  const turns = messages.filter((m) => m.role === "user").length;
  const text = messages.map((m) => m.content).join(" ").toLowerCase();

  const closing =
    /register|build slot|board|limited edition|deposit|£|price|enquire|email|buy|purchase/.test(
      text
    );
  if (closing && turns >= 3) return "next";
  if (
    turns >= 3 ||
    /mission|soul|private|chat.?gpt|claude|cloud|loyal|sovereign/.test(text)
  ) {
    return "fit";
  }
  if (turns >= 1) return "clarity";
  return "rapport";
}
