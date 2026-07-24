import Image from "next/image";
import { Link } from '@/i18n/routing';
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { FamilyBeneficiaryDiagram } from "@/components/landing/family-beneficiary-diagram";

export const metadata: Metadata = {
  title: "Family Beneficiary Program — Centurion",
  description:
    "Introduce four colleagues who buy Centurion — earn one complimentary Centurion for someone you love.",
};

export default async function FamilyBeneficiaryProgramPage() {
  const t = await getTranslations("familyBeneficiary");
  const steps = t("steps").split("|").map((step) => step.trim()).filter(Boolean);
  const summaryItems = t("summaryItems").split("|").map((item) => item.trim()).filter(Boolean);
  const rules = t("rules").split("|").map((rule) => rule.trim()).filter(Boolean);
  return (
    <main className="noise-overlay relative min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12 lg:py-24">
        <div className="max-w-3xl">
          <Link
            href="/"
            className="font-display text-sm tracking-[0.12em] transition-opacity hover:opacity-80"
          >
            {t("brand")}
          </Link>

          <p className="mt-12 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            {t("eyebrow")}
          </p>

          <h1 className="mt-4 font-display text-4xl tracking-tight lg:text-5xl">
            {t("title")}
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            {t("lead")}
          </p>
        </div>

        <div className="mt-14 mb-12 grid items-start gap-12 lg:mb-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="border border-foreground/10 bg-card p-6 lg:p-10">
            <FamilyBeneficiaryDiagram />
          </div>

          <div className="relative mx-auto w-full max-w-[280px]">
            <div className="relative rounded-[2rem] border border-foreground/15 bg-foreground/[0.03] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
              <div className="overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-[#f4f1ec]">
                <Image
                  src="/family-beneficiary-remote.jpg"
                  alt={t("remoteImageAlt")}
                  width={431}
                  height={940}
                  className="h-auto w-full"
                  sizes="280px"
                  priority
                />
              </div>
            </div>
            <p className="mt-4 text-center font-mono text-xs tracking-widest text-muted-foreground uppercase">
              {t("remoteCaption")}
            </p>
          </div>
        </div>

        <div className="mb-16 lg:mb-20">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-foreground/[0.02] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
            <div className="overflow-hidden rounded-[1.1rem] border border-foreground/10 bg-[#f4f1ec]">
              <Image
                src="/family-beneficiary-scene.jpg"
                alt={t("sceneImageAlt")}
                width={1600}
                height={1066}
                className="h-auto w-full"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          </div>
          <p className="mt-4 text-center font-mono text-xs tracking-widest text-muted-foreground uppercase">
            {t("sceneCaption")}
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-10 text-muted-foreground">
          <section className="space-y-4">
            <h2 className="font-display text-2xl tracking-tight text-foreground">{t("howTitle")}</h2>
            <ol className="list-decimal space-y-4 pl-5 leading-relaxed">
              {steps.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </section>

          <section className="border border-foreground/10 bg-card p-6 lg:p-8">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              {t("atAGlance")}
            </p>
            <ul className="mt-4 space-y-3 leading-relaxed">
              {summaryItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl tracking-tight text-foreground">
              {t("manageTitle")}
            </h2>
            <p className="leading-relaxed">
              {t("manageBody")}
            </p>
            <p className="leading-relaxed">
              {t("confirmation")}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl tracking-tight text-foreground">{t("rulesTitle")}</h2>
            <ul className="list-disc space-y-3 pl-5 leading-relaxed">
              {rules.map((rule) => <li key={rule}>{rule}</li>)}
            </ul>
          </section>

          <section className="space-y-4 border-t border-foreground/10 pt-10">
            <h2 className="font-display text-2xl tracking-tight text-foreground">{t("contactTitle")}</h2>
            <p className="leading-relaxed">{t("contactBody", { email: "hello@1human1ai.com" })}</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/#pricing"
                className="inline-flex h-12 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                {t("pricingCta")}
              </Link>
              <Link
                href="/"
                className="inline-flex h-12 items-center rounded-full border border-foreground/20 px-6 text-sm transition-colors hover:bg-foreground/5"
              >
                {t("homeCta")}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
