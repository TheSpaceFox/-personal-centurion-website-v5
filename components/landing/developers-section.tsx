"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";

const codeExamples = [
  {
    label: "Don't trust strangers",
    code: `// Skills from other people are not trusted
skill.fromSomeoneElse({
  trust: 'none',
  risk: 'stolen secrets | hidden behaviour'
})

// Centurion will not install
// a stranger's skill on your say-so alone.`,
  },
  {
    label: "Skill maker",
    code: `centurion.makeSkill({
  for: 'what you actually need',
  basedOn: 'your life's mission',
  author: 'your Centurion'
})

// It builds skills. It does not
// shop for skills in a store.`,
  },
  {
    label: "When needed",
    code: `work.continues({
  gap: 'found',
  skill: 'made now',
  stays: 'with you'
})

// Skills appear when they are needed —
// and stay in your home, under your control.`,
  },
  {
    label: "Improve",
    code: `loop.run({
  notice: true,
  act: true,
  learn: true,
  improve: true
})

// Notice. Act. Learn. Improve.
// Skills get better with use —
// without reporting home.`,
  },
];

const features = [
  {
    title: "Don't trust skills from strangers",
    description:
      "A skill written by someone else can hide quiet ways to leak your private life or change how your AI behaves. Centurion will not take that risk for you.",
  },
  {
    title: "Your Centurion makes the skills",
    description:
      "It is not scrolling a store of other people's tools. It builds what you need from your mission and your way of working.",
  },
  {
    title: "Made in the moment",
    description:
      "When work opens a gap, Centurion creates the skill it needs — then keeps it with you, not on someone else's shelf.",
  },
  {
    title: "Gets better with use",
    description:
      "Notice what happened. Act. Learn. Improve. Skills tighten as you live with them — without sending your life back to a vendor.",
  },
];

const codeAnimationStyles = `
  .dev-code-line {
    opacity: 0;
    transform: translateX(-8px);
    animation: devLineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes devLineReveal {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .dev-code-char {
    opacity: 0;
    filter: blur(8px);
    animation: devCharReveal 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes devCharReveal {
    to {
      opacity: 1;
      filter: blur(0);
    }
  }
`;

function SkillsLibraryDiagram() {
  return (
    <svg
      viewBox="0 0 520 320"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="Diagram showing stranger skill stores blocked while your Centurion makes skills at home"
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
        STRANGERS BLOCKED  ·  MADE HERE
      </text>

      {/* Stranger store — left */}
      <g>
        <text
          x="120"
          y="58"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.45"
        >
          STRANGER STORE
        </text>
        <rect
          x="50"
          y="72"
          width="140"
          height="120"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.35"
        />
        {/* Shelves */}
        <line x1="64" y1="100" x2="176" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <line x1="64" y1="128" x2="176" y2="128" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <line x1="64" y1="156" x2="176" y2="156" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        {[72, 100, 128].map((y) =>
          [74, 106, 138].map((x) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="20"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.22"
            />
          ))
        )}
        {/* Door / lock */}
        <rect
          x="100"
          y="198"
          width="40"
          height="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.45"
        />
        <circle cx="120" cy="222" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
        <line x1="112" y1="214" x2="128" y2="230" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
        <line x1="128" y1="214" x2="112" y2="230" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
        <text
          x="120"
          y="278"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.4"
        >
          NOT TRUSTED
        </text>
      </g>

      {/* Divider */}
      <line
        x1="260"
        y1="56"
        x2="260"
        y2="250"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
        strokeDasharray="4 6"
      />

      {/* Made at home — right */}
      <g>
        <text
          x="390"
          y="58"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.55"
        >
          YOUR CENTURION
        </text>
        <path
          d="M330 110 L390 70 L450 110"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.45"
        />
        <rect
          x="340"
          y="110"
          width="100"
          height="70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.4"
        />
        {/* Sphere forging skill */}
        <circle cx="390" cy="145" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
        <circle cx="390" cy="145" r="12" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" strokeDasharray="2 3">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 390 145"
            to="360 390 145"
            dur="14s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Skill craft rays */}
        <path
          d="M390 200 L390 230"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.4"
        />
        <rect
          x="362"
          y="230"
          width="56"
          height="28"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.5"
        />
        <line x1="372" y1="240" x2="408" y2="240" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <line x1="372" y1="248" x2="400" y2="248" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <circle r="3" fill="currentColor" opacity="0.45">
          <animateMotion dur="2.2s" repeatCount="indefinite" path="M390 168 L390 228" />
        </circle>
        <text
          x="390"
          y="288"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.45"
        >
          SKILL MADE · KEPT HOME
        </text>
      </g>
    </svg>
  );
}

export function DevelopersSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    <section id="developers" ref={sectionRef} className="relative overflow-hidden py-24 lg:py-32">
      <style dangerouslySetInnerHTML={{ __html: codeAnimationStyles }} />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-16 max-w-3xl lg:mb-20">
          <span className="mb-6 inline-flex items-center gap-3 font-mono text-sm text-muted-foreground">
            <span className="h-px w-8 bg-foreground/30" />
            Skills Library
          </span>
          <h2
            className={`mb-8 font-display text-4xl tracking-tight transition-all duration-700 lg:text-6xl ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            The Skills
            <br />
            <span className="text-muted-foreground">Library.</span>
          </h2>
          <p
            className={`max-w-2xl text-xl leading-relaxed text-muted-foreground transition-all delay-150 duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Other AIs treat skills like apps from a shop — made by strangers. Centurion
            does the opposite. It does not trust skills made by others. Your Centurion
            builds what you need, when you need it, and improves as you go.
          </p>

          <div className="mt-10 border border-foreground/10 bg-foreground/[0.02] p-6">
            <p className="mb-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Why skills from others are risky
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A skill you did not write can quietly send information out, change how your
              AI behaves later, or hide instructions you never agreed to. That is not a
              shortcut. It is a door into your private life. Centurion keeps that door
              closed.
            </p>
          </div>
        </div>

        <div className="mb-16 grid items-start gap-12 lg:mb-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div
            className={`border border-foreground/10 p-6 transition-all duration-700 lg:p-10 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <SkillsLibraryDiagram />
          </div>

          <div
            className={`relative mx-auto w-full max-w-[280px] transition-all delay-200 duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative rounded-[2rem] border border-foreground/15 bg-foreground/[0.03] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
              <div className="overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-[#f4f1ec]">
                <Image
                  src="/skills-made-at-home.jpg"
                  alt="Your Centurion building a skill at home — kept with you, not from a stranger store"
                  width={940}
                  height={1410}
                  className="h-auto w-full"
                  sizes="280px"
                />
              </div>
            </div>
            <p className="mt-4 text-center font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Skills Library · yours
            </p>
          </div>
        </div>

        <div className="mb-16 grid gap-px border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`bg-background p-8 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${150 + index * 60}ms` }}
            >
              <h3 className="mb-3 font-display text-xl lg:text-2xl">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div
          className={`transition-all delay-200 duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="border border-foreground/10">
            <div className="flex items-center overflow-x-auto border-b border-foreground/10">
              {codeExamples.map((example, idx) => (
                <button
                  key={example.label}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`relative shrink-0 px-5 py-4 font-mono text-sm transition-colors ${
                    activeTab === idx
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {example.label}
                  {activeTab === idx && (
                    <span className="absolute right-0 bottom-0 left-0 h-px bg-foreground" />
                  )}
                </button>
              ))}
              <div className="flex-1" />
              <button
                type="button"
                onClick={handleCopy}
                className="shrink-0 px-4 py-4 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Copy example"
              >
                {copied ? (
                  <Check className="size-4 text-green-600" />
                ) : (
                  <Copy className="size-4" />
                )}
              </button>
            </div>

            <div className="min-h-[260px] bg-foreground/[0.01] p-8 font-mono text-sm">
              <pre className="text-foreground/80">
                {codeExamples[activeTab].code.split("\n").map((line, lineIndex) => (
                  <div
                    key={`${activeTab}-${lineIndex}`}
                    className="dev-code-line leading-loose"
                    style={{ animationDelay: `${lineIndex * 80}ms` }}
                  >
                    <span className="inline-flex">
                      {line.split("").map((char, charIndex) => (
                        <span
                          key={`${activeTab}-${lineIndex}-${charIndex}`}
                          className="dev-code-char"
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
          </div>

          <div className="mt-6 border border-foreground/10 bg-foreground/[0.01] p-6">
            <h4 className="mb-2 text-sm font-medium">Made for you, kept with you</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Skills your Centurion makes stay in your home. They serve your life&apos;s
              mission — not someone else&apos;s product plan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
