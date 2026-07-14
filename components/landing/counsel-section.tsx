import { CounselChamber } from "./counsel-chamber";

export function CounselSection() {
  return (
    <section
      aria-label="Speak with Adrian"
      className="relative border-t border-foreground/10"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12 lg:py-24">
        <CounselChamber />
      </div>
    </section>
  );
}
