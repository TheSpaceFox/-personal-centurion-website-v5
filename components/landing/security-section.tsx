"use client";

import { useEffect, useState, useRef } from "react";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "Fully offline option",
    description: "When nothing may leave the room, Centurion can work without the public internet.",
  },
  {
    icon: Eye,
    title: "Trust nothing by default",
    description: "Access is careful and deliberate. Nothing is assumed safe without your say.",
  },
  {
    icon: FileCheck,
    title: "A clear history of decisions",
    description: "You can see what your Centurion did and why — records that stay with you.",
  },
  {
    icon: Lock,
    title: "You own it",
    description: "Hardware in your home. Control in your hands. Your private life does not leave with a vendor.",
  },
];

const trustSignals = [
  "Made for private lives",
  "Nothing leaves without you",
  "Built for serious work",
  "Loyal by design",
];

export function SecuritySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="security" ref={sectionRef} className="relative py-24 lg:py-32 bg-foreground/[0.02] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Privacy
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Yours,
              <br />
              not compromised.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Built for people who cannot put their life&apos;s work in a public
              chat box. Privacy is not an add-on — it is the starting point.
            </p>

            <div className="flex flex-wrap gap-3">
              {trustSignals.map((signal, index) => (
                <span
                  key={signal}
                  className={`px-4 py-2 border border-foreground/10 text-sm font-mono transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {securityFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 border border-foreground/10 hover:border-foreground/20 transition-all duration-500 group ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-foreground/10 group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1 group-hover:translate-x-1 transition-transform duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
