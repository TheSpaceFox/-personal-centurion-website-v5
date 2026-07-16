"use client";

import { ArrowRight, Check } from "lucide-react";
import {
  BETA_OFFER,
  isJuly2026BetaActive,
} from "@/lib/orders/beta";

const securingSteps = [
  {
    title: "Pick an option",
    detail: "Sovereign, Prime Pilot, or Prime — choose the path that fits.",
  },
  {
    title: "Pay £500 to hold your build position",
    detail: "Reserves your place in the build queue.",
  },
  {
    title: "Receive Sovereign Remote immediately",
    detail: "Your iPhone companion while your Sovereign is built.",
  },
  {
    title: "Discover your Mission",
    detail: "Personal Mission Discovery clarifies what you are for.",
  },
  {
    title: "Hone your Sovereign’s Soul",
    detail: "Soul Document Process shapes personality and focus.",
  },
  {
    title: "Build completes · balance paid",
    detail: "Remaining amount after the £500 hold is settled.",
  },
  {
    title: "Receive your Sovereign and services",
    detail: "Hardware and purchased services delivered to you.",
  },
];

type Plan = {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  priceNote: string;
  features: string[];
  cta: string;
  popular: boolean;
  beta?: boolean;
  href: string;
};

const betaActive = isJuly2026BetaActive();

const plans: Plan[] = [
  {
    id: "personal",
    name: "Buy a Sovereign",
    description: betaActive
      ? "July 2026 Beta — first unit at a private launch price"
      : "Own yours outright — start now",
    price: betaActive ? "£4,250" : "£5,000",
    originalPrice: betaActive ? "£5,000" : undefined,
    priceNote: betaActive
      ? "First Sovereign only · July 2026 Beta · £500 hold deposits your place"
      : "One Sovereign · GBP · £500 hold deposits your place",
    features: [
      "Your private Sovereign computer for the desk — hardware you own",
      "Sovereign AI Brain, ready for serious mission work",
      "Sovereign Remote on iPhone — yours immediately after the hold",
      "Buy once → free lifetime updates for the Linux brain and iPhone Remote",
      "No monthly fees — unlike public AI subscriptions",
      "Weekly Sunday night AI Owners training session",
      "Soul Document Process included",
      "Personal Mission Discovery included",
      "Collaborate with other Sovereigns when your work demands it",
      "No subscription trap. No rented loyalty. Yours.",
    ],
    cta: betaActive ? "Secure Beta Unit – £4,250" : "Secure Your Sovereign",
    popular: true,
    beta: betaActive,
    href: "/order?engagement=personal",
  },
  {
    id: "pilot",
    name: "Prime Pilot",
    description: "Three Sovereign units + a white-glove proof of concept",
    price: "£15,000",
    priceNote: "Three Sovereign units · GBP · £500 hold deposits your place",
    features: [
      "Three Sovereign units — ready for desk, boardroom, or home office",
      "Guided Proof of Concept / Pilot delivered with white-glove precision",
      "Dedicated programme lead from first kickoff to final readout",
      "Mission & use-case design tailored to your organisation",
      "Fully documented outcome: findings, ROI narrative, next-step brief",
      "Executive-ready deck and written report you can take to the board",
      "Lifetime product updates for every unit — no per-seat monthly software fees",
      "Sunday night AI Owners training for the programme cohort",
      "Support upgrade applied to all future Sovereign purchases",
      "Priority build scheduling and pioneer allocation",
      "Pilot playbook you keep — expand with confidence after the programme",
      "Hands-on onboarding for every unit so adoption is not optional",
      "Direct escalation path during and after the pilot",
      "Extraordinary value: three Sovereigns plus the guided pilot programme",
    ],
    cta: "Start Prime Pilot",
    popular: false,
    href: "/order?engagement=pilot",
  },
  {
    id: "board",
    name: "Prime",
    description: "Full board-room team setup — custom fitted for each board",
    price: "£45,000+",
    priceNote: "Custom fitted · GBP · £500 hold deposits your place · priced for the full board",
    features: [
      "A Prime for every director — not one shared toy",
      "Board units that work together across the table when stakes are high",
      "The Chairman receives the most senior Prime",
      "Special Prime Remote for iPhone",
      "Soul Document & Mission Discovery for each member",
      "Lifetime updates for every board unit and Remote — buy once, keep growing",
      "No monthly SaaS fees for the Centurion platform itself",
      "Sunday night AI Owners training for directors who want the craft",
      "Built for companies that refuse public chat with their strategy",
    ],
    cta: "Enquire for Prime",
    popular: false,
    href: "/order?engagement=board",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative border-t border-foreground/10 py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 max-w-3xl">
          <span className="mb-6 block font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Decide
          </span>
          <h2 className="mb-6 font-display text-5xl tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Secure
            <br />
            <span className="text-stroke">yours.</span>
          </h2>
          <p className="max-w-xl text-lg text-muted-foreground">
            Choose a path. Hold your build position for £500. Receive Sovereign Remote
            immediately, then clarify your Mission and hone your Centurion&apos;s Soul while
            your hardware is built — private work that stays with you, not with the company.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Buy once. Free lifetime updates for both the Linux Fedora brain and iPhone Remote.
            No monthly fees — the differentiator public AIs cannot match. Join the weekly
            Sunday night AI Owners training to get more from what you own.
          </p>
        </div>

        <div className="mb-20">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mb-3 block font-mono text-xs tracking-widest text-muted-foreground uppercase">
                How securing works
              </span>
              <h3 className="font-display text-2xl tracking-tight text-foreground sm:text-3xl">
                Hold. Begin. Receive.
              </h3>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              Seven steps from option to delivery. Mission Discovery and the Soul Document
              both evolve — and neither lives in a company cloud.
            </p>
          </div>

          <div className="grid gap-px border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
            {securingSteps.map((step, index) => (
              <div key={step.title} className="bg-background p-6 lg:p-8">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-3 font-display text-xl tracking-tight text-foreground">
                  {step.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {betaActive && (
          <div className="mb-8 border border-foreground/15 bg-[#0a0a0a] px-6 py-6 text-[#f4f1ec] sm:px-8 lg:px-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <span className="mb-3 block font-mono text-xs tracking-widest text-[#f4f1ec]/70 uppercase">
                  {BETA_OFFER.name} · {BETA_OFFER.endsLabel}
                </span>
                <h3 className="font-display text-3xl tracking-tight sm:text-4xl">
                  {BETA_OFFER.headline}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#f4f1ec]/75">
                  {BETA_OFFER.detail} Hardware, lifetime updates, Sunday AI Owners training, and
                  Personal Mission Discovery — same full package, private Beta pricing.
                </p>
              </div>
              <div className="shrink-0 text-left lg:text-right">
                <p className="font-mono text-xs tracking-widest text-[#f4f1ec]/55 uppercase">
                  From
                </p>
                <p className="mt-1 font-display text-4xl tracking-tight">
                  <span className="mr-3 text-2xl text-[#f4f1ec]/45 line-through decoration-1">
                    £5,000
                  </span>
                  £4,250
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-px bg-foreground/10 md:grid-cols-3">
          {plans.map((plan, idx) => {
            const isBeta = Boolean(plan.beta);
            return (
              <div
                key={plan.id}
                className={`relative p-8 lg:p-12 ${
                  isBeta
                    ? "bg-[#0a0a0a] text-[#f4f1ec] border-2 border-foreground md:-my-5 md:py-14 lg:py-16"
                    : plan.popular
                      ? "bg-background border-2 border-foreground md:-my-4 md:py-12 lg:py-16"
                      : "bg-background"
                }`}
              >
                {(isBeta || plan.popular) && (
                  <span
                    className={`absolute -top-3 left-8 px-3 py-1 font-mono text-xs tracking-widest uppercase ${
                      isBeta
                        ? "bg-[#f4f1ec] text-[#0a0a0a]"
                        : "bg-foreground text-primary-foreground"
                    }`}
                  >
                    {isBeta
                      ? "July 2026 Beta · £750 off"
                      : "Recommended · Highest leverage"}
                  </span>
                )}

                <div className="mb-8">
                  <span
                    className={`font-mono text-xs ${
                      isBeta ? "text-[#f4f1ec]/55" : "text-muted-foreground"
                    }`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={`mt-2 font-display text-3xl ${
                      isBeta ? "text-[#f4f1ec]" : "text-foreground"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`mt-2 text-sm ${
                      isBeta ? "text-[#f4f1ec]/70" : "text-muted-foreground"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                <div
                  className={`mb-8 border-b pb-8 ${
                    isBeta ? "border-white/10" : "border-foreground/10"
                  }`}
                >
                  {plan.originalPrice && (
                    <p
                      className={`mb-1 font-display text-xl line-through decoration-1 ${
                        isBeta ? "text-[#f4f1ec]/40" : "text-muted-foreground"
                      }`}
                    >
                      {plan.originalPrice}
                    </p>
                  )}
                  <div
                    className={`font-display text-4xl lg:text-5xl ${
                      isBeta ? "text-[#f4f1ec]" : "text-foreground"
                    }`}
                  >
                    {plan.price}
                  </div>
                  <p
                    className={`mt-2 text-sm ${
                      isBeta ? "text-[#f4f1ec]/65" : "text-muted-foreground"
                    }`}
                  >
                    {plan.priceNote}
                  </p>
                  {isBeta && (
                    <p className="mt-4 border-l border-[#f4f1ec]/25 pl-3 text-xs leading-relaxed text-[#f4f1ec]/70">
                      Exclusive Beta launch offer for the <strong className="font-medium text-[#f4f1ec]">first</strong>{" "}
                      Sovereign only. Subsequent units remain £5,000.
                    </p>
                  )}
                </div>

                <ul className="mb-10 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className={`mt-0.5 size-4 shrink-0 ${
                          isBeta ? "text-[#f4f1ec]" : "text-foreground"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          isBeta ? "text-[#f4f1ec]/75" : "text-muted-foreground"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.href}
                  className={`group flex w-full items-center justify-center gap-2 py-4 text-sm font-medium transition-all ${
                    isBeta
                      ? "bg-[#f4f1ec] text-[#0a0a0a] hover:bg-white"
                      : plan.popular
                        ? "bg-foreground text-primary-foreground hover:bg-foreground/90"
                        : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            );
          })}
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          Serious programmes only. By invitation and referral when demand requires it.{" "}
          <a
            href="mailto:hello@1human1ai.com?subject=Secure%20a%20Personal%20Centurion"
            className="underline underline-offset-4 transition-colors hover:text-foreground"
          >
            Talk to the team now
          </a>
        </p>
      </div>
    </section>
  );
}
