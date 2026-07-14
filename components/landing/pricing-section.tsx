"use client";

import { ArrowRight, Check } from "lucide-react";

const plans = [
  {
    id: "personal",
    name: "Buy a Personal Centurion",
    description: "Own yours outright — start now",
    price: "£5,000",
    priceNote: "One Personal Centurion · GBP · secure your build slot today",
    features: [
      "Your private Centurion computer for the desk — hardware you own",
      "Personal Centurion AI Brain, ready for serious mission work",
      "CenturionAI Remote on iPhone — your Centurion in your pocket",
      "Soul Document Process included",
      "Personal Mission Discovery included",
      "Collaborate with other Centurions when your work demands it",
      "No subscription trap. No rented loyalty. Yours.",
    ],
    cta: "Secure Your Centurion",
    popular: false,
    href: "/order?engagement=personal",
  },
  {
    id: "pilot",
    name: "Start a Pilot Program",
    description: "Three Centurions + a white-glove proof of concept",
    price: "£15,000",
    priceNote: "Three Personal Centurions · GBP · full pilot programme included",
    features: [
      "Three Personal Centurions — ready for desk, boardroom, or home office",
      "Guided Proof of Concept / Pilot delivered with white-glove precision",
      "Dedicated programme lead from first kickoff to final readout",
      "Mission & use-case design tailored to your organisation",
      "Fully documented outcome: findings, ROI narrative, next-step brief",
      "Executive-ready deck and written report you can take to the board",
      "Support upgrade applied to all future Personal Centurion purchases",
      "Priority build scheduling and pioneer allocation",
      "Pilot playbook you keep — expand with confidence after the programme",
      "Hands-on onboarding for every unit so adoption is not optional",
      "Direct escalation path during and after the pilot",
      "Extraordinary value: the three Centurions alone are £15,000 — the pilot stack rides with them",
    ],
    cta: "Start the Pilot",
    popular: true,
    href: "/order?engagement=pilot",
  },
  {
    id: "board",
    name: "Centurion Board",
    description: "Equip the whole board — or lose ground to those who do",
    price: "£45,000+",
    priceNote: "Board edition — priced for the full board · GBP",
    features: [
      "A Personal Centurion for every director — not one shared toy",
      "Board units that work together across the table when stakes are high",
      "The Chairman receives the most senior Centurion",
      "Special Chairman of the Board remote for iPhone",
      "Soul Document & Mission Discovery for each member",
      "Built for companies that refuse public chat with their strategy",
    ],
    cta: "Enquire for Board Edition",
    popular: false,
    href: "/order?engagement=board",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative border-t border-foreground/10 py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-20 max-w-3xl">
          <span className="mb-6 block font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Decide
          </span>
          <h2 className="mb-6 font-display text-5xl tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Secure
            <br />
            <span className="text-stroke">yours.</span>
          </h2>
          <p className="max-w-xl text-lg text-muted-foreground">
            Your Centurion lives with you — not with the company. Buy one and own it.
            Run a three-unit pilot and walk away with documented proof. Or equip the
            entire board. No shared cloud. No long partnership that harvests your life.
            Choose a path and move.
          </p>
        </div>

        <div className="grid gap-px bg-foreground/10 md:grid-cols-3">
          {plans.map((plan, idx) => (
            <div
              key={plan.id}
              className={`relative bg-background p-8 lg:p-12 ${
                plan.popular ? "border-2 border-foreground md:-my-4 md:py-12 lg:py-16" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-8 bg-foreground px-3 py-1 font-mono text-xs tracking-widest text-primary-foreground uppercase">
                  Recommended · Highest leverage
                </span>
              )}

              <div className="mb-8">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-3xl text-foreground">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-8 border-b border-foreground/10 pb-8">
                <div className="font-display text-4xl text-foreground lg:text-5xl">
                  {plan.price}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.priceNote}</p>
              </div>

              <ul className="mb-10 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className={`group flex w-full items-center justify-center gap-2 py-4 text-sm font-medium transition-all ${
                  plan.popular
                    ? "bg-foreground text-primary-foreground hover:bg-foreground/90"
                    : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                }`}
              >
                {plan.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          Serious programmes only. By invitation and referral when demand requires it.{" "}
          <a
            href="mailto:hello@personal-centurion.com?subject=Secure%20a%20Personal%20Centurion"
            className="underline underline-offset-4 transition-colors hover:text-foreground"
          >
            Talk to the team now
          </a>
        </p>
      </div>
    </section>
  );
}
