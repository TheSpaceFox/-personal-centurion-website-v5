"use client";

import { ArrowRight, Check } from "lucide-react";

const plans = [
  {
    name: "Register Interest",
    description: "Join the verified buyer list",
    price: "Private enquiry",
    priceNote: "No commitment",
    features: [
      "Private, confidential enquiry",
      "Priority updates on upcoming build cycles",
      "Option to reserve a build slot later",
      "Helps evidence buyer demand to investors",
    ],
    cta: "Register Interest",
    popular: false,
  },
  {
    name: "Secure a Build Slot",
    description: "Buy a Personal Centurion",
    price: "£5,000",
    priceNote: "Personal Centurion — GBP",
    features: [
      "Base Hardware — MSI NUK AI machine",
      "Personal Centurion AI Brain",
      "Remote Control iPhone App",
      "Soul Document Process",
      "Personal Mission Discovery",
      "Swarm Collaboration Capability",
    ],
    cta: "Secure Build Slot",
    popular: true,
  },
  {
    name: "Centurion Board",
    description: "Board membership with Personal Centurion for each member",
    price: "£25,000+",
    priceNote: "Per Board membership — GBP",
    features: [
      "Each Board Member issued with Base Hardware — MSI NUK AI machines",
      "Personal Centurion AI Brain",
      "Remote Control iPhone App",
      "Soul Document Process",
      "Personal Mission Discovery",
      "Swarm Collaboration Capability",
    ],
    cta: "Join Centurion Board",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-32 lg:py-40 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-6">
            Engagement
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6">
            Partner
            <br />
            <span className="text-stroke">with us.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Centurion is built, not rented. Register your interest, secure a Personal
            Centurion build slot from £5,000, or join the Centurion Board from £25,000+.
          </p>
        </div>

        {/* Engagement Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative p-8 lg:p-12 bg-background ${
                plan.popular ? "md:-my-4 md:py-12 lg:py-16 border-2 border-foreground" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-8 px-3 py-1 bg-foreground text-primary-foreground text-xs font-mono uppercase tracking-widest">
                  Recommended Start
                </span>
              )}

              {/* Plan Header */}
              <div className="mb-8">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-3xl text-foreground mt-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-foreground/10">
                <div className="font-display text-4xl lg:text-5xl text-foreground">
                  {plan.price}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.priceNote}</p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group ${
                  plan.popular
                    ? "bg-foreground text-primary-foreground hover:bg-foreground/90"
                    : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          Complete discretion. White-glove service. By invitation and referral.{" "}
          <a href="#" className="underline underline-offset-4 hover:text-foreground transition-colors">
            Download capability brief
          </a>
        </p>
      </div>
    </section>
  );
}
