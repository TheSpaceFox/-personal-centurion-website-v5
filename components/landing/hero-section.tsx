"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare } from "lucide-react";
import { AnimatedSphere } from "./animated-sphere";

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
      <div className="relative flex min-h-screen flex-col justify-center">
        <div className="pointer-events-none absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 opacity-30 lg:h-[800px] lg:w-[800px]">
          <AnimatedSphere />
        </div>

        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
          {[...Array(8)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute inset-x-0 h-px bg-foreground/10"
              style={{ top: `${12.5 * (i + 1)}%` }}
            />
          ))}
          {[...Array(12)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute inset-y-0 w-px bg-foreground/10"
              style={{ left: `${8.33 * (i + 1)}%` }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-16 pt-28 lg:px-12 lg:pb-20 lg:pt-32">
          <div className="max-w-3xl">
            <div
              className={`mb-8 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <span className="inline-flex items-center gap-3 font-mono text-sm text-muted-foreground">
                <span className="h-px w-8 bg-foreground/30" />
                A private AI for your life&apos;s mission
              </span>
            </div>

            <div className="mb-8">
              <h1
                className={`font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.92] tracking-tight transition-all duration-1000 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
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
              className={`mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground transition-all delay-200 duration-700 lg:text-xl ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              An AI that helps you discover and live your life&apos;s mission — private,
              sovereign, and loyal.
            </p>

            <div
              className={`flex flex-col items-start gap-4 transition-all delay-300 duration-700 sm:flex-row ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <Button
                size="lg"
                className="group h-14 rounded-full bg-foreground px-8 text-base text-background hover:bg-foreground/90"
                onClick={() =>
                  document.getElementById("adrian")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Speak with Adrian
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-foreground/20 px-8 text-base hover:bg-foreground/5"
                asChild
              >
                <a href="#pricing">Register Interest</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`relative z-10 pb-16 transition-all delay-500 duration-700 lg:pb-24 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="marquee flex gap-16 whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16">
              {[
                { value: "100%", label: "Your private world stays yours", company: "PRIVATE" },
                { value: "Your", label: "You decide how it works", company: "IN YOUR HOME" },
                { value: "Zero", label: "No strangers reading along", company: "YOURS FOREVER" },
                { value: "Offline", label: "Can work with no outside line", company: "WHEN NEEDED" },
              ].map((stat) => (
                <div key={`${stat.company}-${i}`} className="flex items-baseline gap-4">
                  <span className="font-display text-4xl lg:text-5xl">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                    <span className="mt-1 block font-mono text-xs">{stat.company}</span>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <a
        href="#adrian"
        className={`fixed bottom-6 right-6 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-5 text-sm text-background shadow-lg transition-all duration-500 ${
          showDock
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <MessageSquare className="size-4" />
        Speak with Adrian
      </a>
    </section>
  );
}
