"use client";

import { useState, useEffect, useRef } from "react";
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
    <section id="developers" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: codeAnimationStyles }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Skills Library
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              The Skills
              <br />
              <span className="text-muted-foreground">Library.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Other AIs treat skills like apps from a shop — made by strangers.
              Centurion does the opposite. It does not trust skills made by others.
              Your Centurion builds what you need, when you need it, and improves as
              you go.
            </p>

            <div className="mb-12 p-6 border border-foreground/10 bg-foreground/[0.02]">
              <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-3">
                Why skills from others are risky
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A skill you did not write can quietly send information out, change how
                your AI behaves later, or hide instructions you never agreed to. That is
                not a shortcut. It is a door into your private life. Centurion keeps that
                door closed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  <h3 className="font-medium mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`lg:sticky lg:top-32 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-foreground/10">
              <div className="flex items-center border-b border-foreground/10 overflow-x-auto">
                {codeExamples.map((example, idx) => (
                  <button
                    key={example.label}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`px-5 py-4 text-sm font-mono transition-colors relative shrink-0 ${
                      activeTab === idx
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {example.label}
                    {activeTab === idx && (
                      <span className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />
                    )}
                  </button>
                ))}
                <div className="flex-1" />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-4 text-muted-foreground hover:text-foreground transition-colors shrink-0"
                  aria-label="Copy example"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="p-8 font-mono text-sm bg-foreground/[0.01] min-h-[260px]">
                <pre className="text-foreground/80">
                  {codeExamples[activeTab].code.split("\n").map((line, lineIndex) => (
                    <div
                      key={`${activeTab}-${lineIndex}`}
                      className="leading-loose dev-code-line"
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

            <div className="mt-6 p-6 border border-foreground/10 bg-foreground/[0.01]">
              <h4 className="text-sm font-medium mb-2">Made for you, kept with you</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Skills your Centurion makes stay in your home. They serve your life&apos;s
                mission — not someone else&apos;s product plan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
