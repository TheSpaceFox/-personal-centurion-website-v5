"use client";

import { useTranslations } from "next-intl";
import { CounselChamber } from "./counsel-chamber";

export function CounselSection() {
  const t = useTranslations("counsel");
  return (
    <section
      aria-label={t("title")}
      className="relative border-t border-foreground/10"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12 lg:py-24">
        <CounselChamber />
      </div>
    </section>
  );
}
