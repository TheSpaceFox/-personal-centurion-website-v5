"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare } from "lucide-react";
import { AnimatedSphere } from "./animated-sphere";
import { CounselChamber } from "./counsel-chamber";

const words = ["private", "sovereign", "loyal", "yours"];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [showDock, setShowDock] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowDock(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative flex flex-col overflow-hidden">
      <div className="relative min-h-screen flex flex-col justify-center">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] opacity-30 pointer-events-none">
          <AnimatedSphere />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          {[...Array(8)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute h-px bg-foreground/10"
              style={{
                top: `${12.5 * (i + 1)}%`,
                left: 0,
                right: 0,
              }}
            />
          ))}
          {[...Array(12)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute w-px bg-foreground/10"
              style={{
                left: `${8.33 * (i + 1)}%`,
                top: 0,
                bottom: 0,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 lg:px-12 pt-28 pb-16 lg:pt-32 lg:pb-20">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
            <div>
              <div
                className={`mb-8 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
                  <span className="w-8 h-px bg-foreground/30" />
                  Sovereign AI for life&apos;s mission
                </span>
              </div>

              <div className="mb-8">
                <h1
                  className={`text-[clamp(2.75rem,8vw,6.5rem)] font-display leading-[0.92] tracking-tight transition-all duration-1000 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <span className="block">One Human.</span>
                  <span className="block">
                    One AI.{" "}
                    <span className="relative inline-block">
                      <span key={wordIndex} className="inline-flex">
                        {words[wordIndex].split("").map((char, i) => (
                          <span
                            key={`${wordIndex}-${i}`}
                            className="inline-block animate-char-in"
                            style={{ animationDelay: `${i * 50}ms` }}
                          >
                            {char}
                          </span>
                        ))}
                      </span>
                      <span className="absolute -bottom-2 left-0 right-0 h-3 bg-foreground/10" />
                    </span>
                  </span>
                </h1>
              </div>

              <p
                className={`text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mb-8 transition-all duration-700 delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                An AI that helps you discover and live your life&apos;s mission —
                private, sovereign, and loyal. Talk with Centurion now; scroll for the
                full dossier.
              </p>

              <div
                className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <Button
                  size="lg"
                  className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group"
                  onClick={() =>
                    document.getElementById("counsel")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Speak with Centurion
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-base rounded-full border-foreground/20 hover:bg-foreground/5"
                  asChild
                >
                  <a href="#pricing">Register Interest</a>
                </Button>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-150 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <CounselChamber compact />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`relative z-10 pb-16 lg:pb-24 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex gap-16 marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16">
              {[
                { value: "100%", label: "Complete data sovereignty", company: "PRIVATE" },
                { value: "Your", label: "Full operational control", company: "HARDWARE" },
                { value: "Zero", label: "No third-party access", company: "YOURS FOREVER" },
                { value: "Air-Gapped", label: "Native offline operation", company: "DOOMSDAY PROTOCOL" },
              ].map((stat) => (
                <div key={`${stat.company}-${i}`} className="flex items-baseline gap-4">
                  <span className="text-4xl lg:text-5xl font-display">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                    <span className="block font-mono text-xs mt-1">{stat.company}</span>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <a
        href="#counsel"
        className={`fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 h-12 text-sm shadow-lg transition-all duration-500 ${
          showDock
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <MessageSquare className="w-4 h-4" />
        Speak with Centurion
      </a>
    </section>
  );
}
