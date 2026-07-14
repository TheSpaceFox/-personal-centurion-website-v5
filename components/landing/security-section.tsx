"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "Fully offline option",
    description:
      "When nothing may leave the room, Centurion can work without the public internet.",
  },
  {
    icon: Eye,
    title: "Trust nothing by default",
    description:
      "Access is careful and deliberate. Nothing is assumed safe without your say.",
  },
  {
    icon: FileCheck,
    title: "A clear history of decisions",
    description:
      "You can see what your Centurion did and why — records that stay with you.",
  },
  {
    icon: Lock,
    title: "You own it",
    description:
      "Hardware in your home. Control in your hands. Your private life does not leave with a vendor.",
  },
];

const trustSignals = [
  "Made for private lives",
  "Nothing leaves without you",
  "Built for serious work",
  "Loyal by design",
];

function PrivacyDiagram() {
  return (
    <svg
      viewBox="0 0 520 320"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="Diagram of your private world inside the home, sealed from public chat and cloud systems"
    >
      <text
        x="260"
        y="28"
        textAnchor="middle"
        className="fill-current"
        fontSize="12"
        fontFamily="ui-monospace, monospace"
        opacity="0.4"
      >
        YOUR WORLD  |  STAYS HOME
      </text>

      {/* Public side */}
      <g opacity="0.45">
        <text
          x="100"
          y="64"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.7"
        >
          PUBLIC
        </text>
        {/* Cloud */}
        <path
          d="M60 110 C60 90, 80 80, 100 85 C108 70, 132 70, 140 88 C158 88, 168 102, 164 118 L56 118 C48 118, 44 108, 52 100 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.5"
        />
        {/* Chat bubble */}
        <rect
          x="72"
          y="150"
          width="56"
          height="36"
          rx="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.45"
        />
        <path d="M88 186 L96 198 L104 186" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.45" />
        <line x1="82" y1="162" x2="118" y2="162" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <line x1="82" y1="172" x2="110" y2="172" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        {/* Block X */}
        <circle cx="100" cy="230" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
        <line x1="90" y1="220" x2="110" y2="240" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
        <line x1="110" y1="220" x2="90" y2="240" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      </g>

      {/* Boundary wall */}
      <line
        x1="220"
        y1="56"
        x2="220"
        y2="270"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.35"
      />
      <line
        x1="228"
        y1="56"
        x2="228"
        y2="270"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.15"
        strokeDasharray="4 6"
      />
      <text
        x="224"
        y="48"
        textAnchor="middle"
        className="fill-current"
        fontSize="10"
        fontFamily="ui-monospace, monospace"
        opacity="0.4"
      >
        WALL
      </text>

      {/* Private side — home */}
      <g>
        <text
          x="370"
          y="64"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.55"
        >
          PRIVATE
        </text>
        {/* House roof + body */}
        <path
          d="M300 140 L370 88 L440 140"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <rect
          x="310"
          y="140"
          width="120"
          height="90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.45"
        />
        {/* Inner private circle / Centurion */}
        <circle cx="370" cy="180" r="34" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
        <circle cx="370" cy="180" r="22" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" strokeDasharray="3 4">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 370 180"
            to="-360 370 180"
            dur="22s"
            repeatCount="indefinite"
          />
        </circle>
        <path
          d="M352 180 Q370 168 388 180 Q370 192 352 180"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.4"
        />
        {/* Offline seal arc */}
        <path
          d="M300 250 A80 40 0 0 0 440 250"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.35"
          strokeDasharray="6 5"
        />
        <text
          x="370"
          y="278"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.45"
        >
          OFFLINE WHEN NEEDED
        </text>
      </g>
    </svg>
  );
}

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
    <section
      id="security"
      ref={sectionRef}
      className="relative overflow-hidden bg-foreground/[0.02] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-16 max-w-3xl lg:mb-20">
          <span className="mb-6 inline-flex items-center gap-3 font-mono text-sm text-muted-foreground">
            <span className="h-px w-8 bg-foreground/30" />
            Privacy
          </span>
          <h2
            className={`mb-8 font-display text-4xl tracking-tight transition-all duration-700 lg:text-6xl ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Yours,
            <br />
            <span className="text-muted-foreground">not compromised.</span>
          </h2>
          <p
            className={`mb-8 max-w-2xl text-xl leading-relaxed text-muted-foreground transition-all delay-150 duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Built for people who cannot put their life&apos;s work in a public chat box.
            Privacy is not an add-on — it is the starting point.
          </p>

          <div className="flex flex-wrap gap-3">
            {trustSignals.map((signal, index) => (
              <span
                key={signal}
                className={`border border-foreground/10 px-4 py-2 font-mono text-sm transition-all duration-500 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 50 + 200}ms` }}
              >
                {signal}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-16 grid items-start gap-12 lg:mb-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div
            className={`border border-foreground/10 bg-background p-6 transition-all duration-700 lg:p-10 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <PrivacyDiagram />
          </div>

          <div
            className={`relative mx-auto w-full max-w-[280px] transition-all delay-200 duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative rounded-[2rem] border border-foreground/15 bg-foreground/[0.03] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
              <div className="overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-[#f4f1ec]">
                <Image
                  src="/privacy-sealed-home.jpg"
                  alt="Sealed private study — a Personal Centurion stays under your roof"
                  width={940}
                  height={1410}
                  className="h-auto w-full"
                  sizes="280px"
                />
              </div>
            </div>
            <p className="mt-4 text-center font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Privacy · starting point
            </p>
          </div>
        </div>

        <div className="grid gap-px border border-foreground/10 bg-foreground/10 sm:grid-cols-2">
          {securityFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className={`bg-background p-8 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${150 + index * 60}ms` }}
            >
              <feature.icon className="mb-5 size-5 text-foreground/70" />
              <h3 className="mb-3 font-display text-2xl">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
