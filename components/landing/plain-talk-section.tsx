"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export function PlainTalkSection() {
  const t = useTranslations("plainTalk");
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
              {t("eyebrow")}
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              {t("titleLine1")}
              <br />
              <span className="text-muted-foreground">{t("titleLine2")}</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              {t("lead")}
            </p>
          </div>

          <div
            className={`space-y-8 transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="border border-foreground/10 p-8 lg:p-10">
              <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">
                {t("publicTitle")}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("publicBody")}
              </p>
            </div>

            <div className="border border-foreground p-8 lg:p-10 bg-foreground text-background">
              <p className="font-mono text-xs tracking-widest uppercase text-background/50 mb-4">
                {t("sovereignTitle")}
              </p>
              <p className="text-lg text-background/80 leading-relaxed">
                {t("sovereignBody")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
