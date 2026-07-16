import { cn } from "@/lib/utils";

/** Brand mark + wordmark — sphere mark (header) or full pedestal (footer/whitepaper). */
export function CenturionLogo({
  className = "",
  size = "md",
  variant = "mark",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** `mark` = sphere only; `full` = sphere on pedestal */
  variant?: "mark" | "full";
}) {
  const markBox =
    size === "sm" ? "size-7" : size === "lg" ? "size-10" : "size-8";
  const fullBox =
    size === "sm" ? "h-10 w-auto" : size === "lg" ? "h-16 w-auto" : "h-12 w-auto";
  const word = size === "sm" ? "text-base" : size === "lg" ? "text-xl" : "text-lg";
  const src = variant === "full" ? "/logo-full.png" : "/logo-mark.png";

  return (
    <span className={cn("inline-flex items-center gap-2.5 text-foreground", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={variant === "full" ? 120 : 40}
        height={variant === "full" ? 128 : 40}
        className={cn("shrink-0 object-contain", variant === "full" ? fullBox : markBox)}
        aria-hidden
      />
      <span className={cn("font-display tracking-[0.08em]", word)}>
        Centurion
      </span>
    </span>
  );
}
