"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ENQUIRY_EMAIL = "hello@personal-centurion.com";

const editions = [
  {
    id: "walnut-copper",
    name: "Walnut & Copper",
    description: "Hand-carved walnut with brushed copper meridian.",
    src: "/limited-edition/walnut-copper.jpg",
  },
  {
    id: "obsidian-amethyst",
    name: "Obsidian & Amethyst",
    description: "Polished stone sphere on a crystalline amethyst plinth.",
    src: "/limited-edition/obsidian-amethyst.jpg",
  },
  {
    id: "carbon-marble",
    name: "Carbon & Marble",
    description: "Carbon weave with copper fins on verdant marble.",
    src: "/limited-edition/carbon-marble.jpg",
  },
] as const;

export function LimitedEditionSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
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

  useEffect(() => {
    if (userPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % editions.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [userPaused]);

  const active = editions[activeIndex];

  function selectEdition(index: number) {
    setActiveIndex(index);
    setUserPaused(true);
  }

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail) return;

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "limited-edition",
          name: trimmedName,
          email: trimmedEmail,
          edition: active.name,
          note: note.trim() || undefined,
        }),
      });
      if (res.ok) {
        setName("");
        setEmail("");
        setNote("");
        window.alert("Thank you — your Limited Edition interest is registered.");
        return;
      }
    } catch {
      // fall through to mailto
    }

    const subject = encodeURIComponent(
      `Limited Edition Centurion — Registration (${active.name})`
    );
    const body = encodeURIComponent(
      [
        "I would like to register interest in the Limited Edition Personal Centurion range.",
        "",
        `Name: ${trimmedName}`,
        `Email: ${trimmedEmail}`,
        `Preferred finish: ${active.name}`,
        note.trim() ? `Note: ${note.trim()}` : null,
        "",
        "Please keep me informed when allocation opens.",
      ]
        .filter(Boolean)
        .join("\n")
    );

    window.location.href = `mailto:${ENQUIRY_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <section
      id="limited-edition"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0a0a] text-[#f4f1ec] border-t border-white/10"
    >
      <div
        className={`relative min-h-[70vh] lg:min-h-[85vh] transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {editions.map((edition, index) => (
          <div
            key={edition.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={edition.src}
              alt={`Personal Centurion — ${edition.name}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32 min-h-[70vh] lg:min-h-[85vh] flex flex-col justify-end">
          <div
            className={`max-w-2xl transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.25em] uppercase text-white/60 mb-6">
              <span className="w-8 h-px bg-white/40" />
              Coming soon
            </span>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95] mb-6">
              Limited Edition
              <br />
              Centurion Range
            </h2>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl mb-8">
              A scarce series of Personal Centurions in artisan finishes.
              Register now to be considered when places open.
            </p>
            <p className="font-mono text-xs tracking-widest uppercase text-white/50">
              {active.name}
              <span className="mx-3 text-white/20">/</span>
              {active.description}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-8">
        <div className="grid grid-cols-3 gap-3 lg:gap-4">
          {editions.map((edition, index) => (
            <button
              key={edition.id}
              type="button"
              onClick={() => selectEdition(index)}
              aria-label={`View ${edition.name}`}
              aria-pressed={index === activeIndex}
              className={`relative aspect-[16/9] overflow-hidden transition-all duration-500 ${
                index === activeIndex
                  ? "ring-1 ring-white/80 opacity-100"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              <Image
                src={edition.src}
                alt=""
                fill
                sizes="(max-width: 1024px) 33vw, 420px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div
          className={`grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <h3 className="font-display text-3xl lg:text-4xl tracking-tight mb-4">
              Register for a Limited Edition Personal Centurion
            </h3>
            <p className="text-white/60 leading-relaxed max-w-md">
              Early registration signals serious interest and helps us plan
              allocation. Your details stay private. Submitting opens a
              confidential email to our enquiries desk.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block space-y-2">
                <span className="font-mono text-xs tracking-widest uppercase text-white/50">
                  Name
                </span>
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="h-12 rounded-none border-white/20 bg-white/5 text-[#f4f1ec] placeholder:text-white/35 focus-visible:border-white/50 focus-visible:ring-white/20"
                />
              </label>
              <label className="block space-y-2">
                <span className="font-mono text-xs tracking-widest uppercase text-white/50">
                  Email
                </span>
                <Input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-12 rounded-none border-white/20 bg-white/5 text-[#f4f1ec] placeholder:text-white/35 focus-visible:border-white/50 focus-visible:ring-white/20"
                />
              </label>
            </div>

            <fieldset className="space-y-3">
              <legend className="font-mono text-xs tracking-widest uppercase text-white/50 mb-2">
                Preferred finish
              </legend>
              <div className="flex flex-wrap gap-2">
                {editions.map((edition, index) => (
                  <button
                    key={edition.id}
                    type="button"
                    onClick={() => selectEdition(index)}
                    className={`px-4 py-2 font-mono text-xs tracking-wide uppercase border transition-colors ${
                      index === activeIndex
                        ? "border-white bg-white text-black"
                        : "border-white/25 text-white/70 hover:border-white/50"
                    }`}
                  >
                    {edition.name}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="block space-y-2">
              <span className="font-mono text-xs tracking-widest uppercase text-white/50">
                Note <span className="normal-case tracking-normal">(optional)</span>
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Delivery region, timeline, or preferences"
                className="w-full rounded-none border border-white/20 bg-white/5 px-3 py-3 text-base text-[#f4f1ec] placeholder:text-white/35 outline-none focus-visible:border-white/50 focus-visible:ring-[3px] focus-visible:ring-white/20 md:text-sm"
              />
            </label>

            <Button
              type="submit"
              size="lg"
              className="bg-[#f4f1ec] hover:bg-white text-black px-8 h-14 text-base rounded-full group"
            >
              Register Interest
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
