"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "I",
    title: "Understand your world",
    description:
      "In conversation with you, we learn how you live and work — privacy, family, business, and what your life’s mission needs — then shape the right Centurion for you.",
    code: `centurion.understand({
  mission: 'yours',
  privacy: 'absolute',
  home: 'defined'
})

// Understood.`,
  },
  {
    number: "II",
    title: "Place it on your terms",
    description:
      "Your Centurion lives with you — at home or in your office. You choose how connected it is to the outside world, including fully offline when that matters.",
    code: `centurion.place({
  where: 'your home',
  outsideWorld: 'your choice',
  leaves: false
})

// Settled. Nothing wanders out.`,
  },
  {
    number: "III",
    title: "Live with it every day",
    description:
      "It works around the clock on your life’s mission, learns only from what you share with it, and never sells or shares your private world.",
    code: `centurion.live({
  always: true,
  learns: 'from you only',
  shares: 'nothing'
})

// Private. Loyal. Yours.`,
  },
];

function HowItWorksDiagram() {
  return (
    <svg
      viewBox="0 0 520 320"
      className="h-auto w-full text-background"
      role="img"
      aria-label="Diagram of Understand, Place, and Live — the three steps of bringing a Personal Centurion home"
    >
      <defs>
        <marker id="hiwArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" opacity="0.35" />
        </marker>
      </defs>
      <text
        x="260"
        y="28"
        textAnchor="middle"
        className="fill-current"
        fontSize="12"
        fontFamily="ui-monospace, monospace"
        opacity="0.4"
      >
        UNDERSTAND  →  PLACE  →  LIVE
      </text>

      {/* Stage I — Understand (brief / conversation, not audio listening) */}
      <g transform="translate(40, 70)">
        <text
          x="70"
          y="0"
          textAnchor="middle"
          className="fill-current"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          opacity="0.5"
        >
          I
        </text>
        <circle cx="70" cy="90" r="52" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        {/* Briefing card — what we learn in conversation with you */}
        <rect
          x="42"
          y="62"
          width="56"
          height="56"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.5"
        />
        <line x1="50" y1="76" x2="90" y2="76" stroke="currentColor" strokeWidth="1.25" opacity="0.55" />
        <line x1="50" y1="88" x2="84" y2="88" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <line x1="50" y1="98" x2="78" y2="98" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <line x1="50" y1="108" x2="86" y2="108" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <text
          x="70"
          y="168"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.45"
        >
          UNDERSTAND
        </text>
      </g>

      {/* Arrow I → II */}
      <path
        d="M168 160 L196 160"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        opacity="0.35"
        markerEnd="url(#hiwArrow)"
      />

      {/* Stage II — Place */}
      <g transform="translate(200, 70)">
        <text
          x="70"
          y="0"
          textAnchor="middle"
          className="fill-current"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          opacity="0.5"
        >
          II
        </text>
        {/* Roof */}
        <path
          d="M28 72 L70 40 L112 72"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <rect
          x="36"
          y="72"
          width="68"
          height="56"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.45"
        />
        {/* Desk sphere */}
        <circle cx="70" cy="108" r="14" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.55" />
        <line x1="52" y1="128" x2="88" y2="128" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <text
          x="70"
          y="168"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.45"
        >
          PLACE
        </text>
      </g>

      {/* Arrow II → III */}
      <path
        d="M328 160 L356 160"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        opacity="0.35"
        markerEnd="url(#hiwArrow)"
      />

      {/* Stage III — Live */}
      <g transform="translate(360, 70)">
        <text
          x="70"
          y="0"
          textAnchor="middle"
          className="fill-current"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          opacity="0.5"
        >
          III
        </text>
        <circle cx="70" cy="90" r="52" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        {/* Clock / orbit */}
        <circle cx="70" cy="90" r="28" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <line x1="70" y1="90" x2="70" y2="68" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
        <line x1="70" y1="90" x2="88" y2="98" stroke="currentColor" strokeWidth="1.25" opacity="0.45" />
        <circle cx="70" cy="90" r="3" fill="currentColor" opacity="0.5" />
        <circle r="3.5" fill="currentColor" opacity="0.45">
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path="M70 62 A28 28 0 1 1 69.9 62"
          />
        </circle>
        <text
          x="70"
          y="168"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.45"
        >
          LIVE
        </text>
      </g>

      <text
        x="260"
        y="290"
        textAnchor="middle"
        className="fill-current"
        fontSize="11"
        fontFamily="ui-monospace, monospace"
        opacity="0.35"
      >
        UNDER YOUR ROOF · ON YOUR TERMS
      </text>
    </svg>
  );
}

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative overflow-hidden bg-foreground py-24 text-background lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            currentColor 40px,
            currentColor 41px
          )`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-16 max-w-3xl lg:mb-20">
          <span className="mb-6 inline-flex items-center gap-3 font-mono text-sm text-background/50">
            <span className="h-px w-8 bg-background/30" />
            How it works
          </span>
          <h2
            className={`font-display text-4xl tracking-tight transition-all duration-700 lg:text-6xl ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Understand. Place.
            <br />
            <span className="text-background/50">Live.</span>
          </h2>
          <p
            className={`mt-8 max-w-2xl text-xl leading-relaxed text-background/60 transition-all delay-150 duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            We learn your world in conversation with you — not by ambient recording —
            then place your Centurion under your roof on your terms, and stay with you
            every day: loyal, private, and quiet about what is yours alone.
          </p>
        </div>

        <div className="mb-16 grid items-start gap-12 lg:mb-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div
            className={`border border-background/10 p-6 transition-all duration-700 lg:p-10 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <HowItWorksDiagram />
          </div>

          <div
            className={`relative mx-auto w-full max-w-[280px] transition-all delay-200 duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative rounded-[2rem] border border-background/15 bg-background/[0.04] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
              <div className="overflow-hidden rounded-[1.5rem] border border-background/10 bg-[#f4f1ec]">
                <Image
                  src="/how-it-works-place.jpg"
                  alt="Personal Centurion on a private desk under a home roof — placed on your terms"
                  width={940}
                  height={1410}
                  className="h-auto w-full"
                  sizes="280px"
                />
              </div>
            </div>
            <p className="mt-4 text-center font-mono text-xs tracking-widest text-background/45 uppercase">
              Understand · Place · Live
            </p>
          </div>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="space-y-0">
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`group w-full border-b border-background/10 py-8 text-left transition-all duration-500 ${
                  activeStep === index ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                <div className="flex items-start gap-6">
                  <span className="font-display text-3xl text-background/30">{step.number}</span>
                  <div className="flex-1">
                    <h3 className="mb-3 font-display text-2xl transition-transform duration-300 group-hover:translate-x-2 lg:text-3xl">
                      {step.title}
                    </h3>
                    <p className="leading-relaxed text-background/60">{step.description}</p>
                    {activeStep === index && (
                      <div className="mt-4 h-px overflow-hidden bg-background/20">
                        <div
                          className="h-full w-0 bg-background"
                          style={{ animation: "progress 5s linear forwards" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="self-start lg:sticky lg:top-32">
            <div className="overflow-hidden border border-background/10">
              <div className="flex items-center justify-between border-b border-background/10 px-6 py-4">
                <div className="flex gap-2">
                  <div className="size-3 rounded-full bg-background/20" />
                  <div className="size-3 rounded-full bg-background/20" />
                  <div className="size-3 rounded-full bg-background/20" />
                </div>
                <span className="font-mono text-xs text-background/40">your-centurion</span>
              </div>

              <div className="min-h-[280px] p-8 font-mono text-sm">
                <pre className="text-background/70">
                  {steps[activeStep].code.split("\n").map((line, lineIndex) => (
                    <div
                      key={`${activeStep}-${lineIndex}`}
                      className="code-line-reveal leading-loose"
                      style={{ animationDelay: `${lineIndex * 80}ms` }}
                    >
                      <span className="inline-block w-8 select-none text-background/20">
                        {lineIndex + 1}
                      </span>
                      <span className="inline-flex">
                        {line.split("").map((char, charIndex) => (
                          <span
                            key={`${activeStep}-${lineIndex}-${charIndex}`}
                            className="code-char-reveal"
                            style={{
                              animationDelay: `${lineIndex * 80 + charIndex * 15}ms`,
                            }}
                          >
                            {char === " " ? "\u00A0" : char}
                          </span>
                        ))}
                      </span>
                    </div>
                  ))}
                </pre>
              </div>

              <div className="flex items-center gap-3 border-t border-background/10 px-6 py-4">
                <span className="size-2 animate-pulse rounded-full bg-green-400" />
                <span className="font-mono text-xs text-background/40">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        .code-line-reveal {
          opacity: 0;
          transform: translateX(-8px);
          animation: lineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes lineReveal {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .code-char-reveal {
          opacity: 0;
          filter: blur(8px);
          animation: charReveal 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes charReveal {
          to {
            opacity: 1;
            filter: blur(0);
          }
        }
      `}</style>
    </section>
  );
}
