"use client";

import { useEffect, useRef, useState } from "react";

export function PlainTalkSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="plain-talk"
      ref={sectionRef}
      className="relative py-24 lg:py-32 border-t border-foreground/10 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              No prompt theatre
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              You do not need
              <br />
              <span className="text-muted-foreground">to be a prompt expert.</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              Just talk plainly. Ask for what you want. Sovereign answers as it
              should — without making you learn a special language first.
            </p>
          </div>

          <div
            className={`space-y-8 transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="border border-foreground/10 p-8 lg:p-10">
              <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">
                Public AI chats
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                If you have to write a fancy prompt to get a useful answer, you are not
                &ldquo;winning at AI.&rdquo; You are fighting it — working around training that
                was shaped by big tech to seed ideas into the crowd and train{" "}
                <em className="not-italic text-foreground">you</em>, instead of letting
                you train the AI on your life. That dance is the product for public AI.
              </p>
            </div>

            <div className="border border-foreground p-8 lg:p-10 bg-foreground text-background">
              <p className="font-mono text-xs tracking-widest uppercase text-background/50 mb-4">
                Sovereign
              </p>
              <p className="text-lg text-background/80 leading-relaxed">
                This one is different. Ask whatever you want, in ordinary words, and it
                gives you what you asked for. No tip sheets. No prompt&nbsp;engineering.
                No need to become an &ldquo;expert prompter.&rdquo; Just talk to it the way you
                would talk to someone who works for you — because that is what it is.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
