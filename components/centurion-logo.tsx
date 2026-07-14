import { cn } from "@/lib/utils";

/** Brand mark + wordmark — same lockup as Help site. */
export function CenturionLogo({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const mark =
    size === "sm" ? "size-7 rounded-[7px]" : size === "lg" ? "size-9 rounded-[9px]" : "size-8 rounded-lg";
  const word = size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl";

  return (
    <span className={cn("inline-flex items-center gap-2.5 text-foreground", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icon.svg"
        alt=""
        width={36}
        height={36}
        className={cn("shrink-0", mark)}
        aria-hidden
      />
      <span className={cn("font-display tracking-[0.2em]", word)}>CENTURION</span>
    </span>
  );
}
