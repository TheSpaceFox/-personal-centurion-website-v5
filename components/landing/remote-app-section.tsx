"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  FileText,
  MessageSquare,
  Settings2,
  Target,
  Users,
  Ellipsis,
} from "lucide-react";

const capabilities = [
  {
    icon: MessageSquare,
    title: "Chat",
    description: "Talk with your Centurion from anywhere — counsel, clarity, and next steps in your pocket.",
  },
  {
    icon: FileText,
    title: "View documents",
    description: "Open Soul Documents, briefings, and mission notes your Centurion keeps on your side of the wall.",
  },
  {
    icon: Users,
    title: "Collaborate",
    description: "Work with others through swarm-ready sessions when your situation calls for more than one mind.",
  },
  {
    icon: Target,
    title: "Track your Life's Mission",
    description: "Pulse your progress — see whether days are aligning with the mission you are actually living.",
  },
  {
    icon: Settings2,
    title: "Make setup changes",
    description: "Connection, AI provider, appearance, and personality rules — tune the Remote without leaving iPhone.",
  },
  {
    icon: Ellipsis,
    title: "And more",
    description: "Privacy controls, Connect, and the full Remote stack evolve with your Centurion.",
  },
];

function DeskToRemoteDiagram() {
  return (
    <svg
      viewBox="0 0 520 320"
      className="w-full h-auto text-foreground"
      role="img"
      aria-label="Diagram of a Personal Centurion on a desk linked wirelessly to the Personal Centurion AI Remote on iPhone"
    >
      <defs>
        <marker
          id="remoteArrow"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" opacity="0.35" />
        </marker>
      </defs>

      {/* Desk surface */}
      <line
        x1="40"
        y1="250"
        x2="280"
        y2="250"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.35"
      />
      <line
        x1="56"
        y1="262"
        x2="264"
        y2="262"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.15"
      />

      {/* Centurion sphere on desk */}
      <g>
        <circle
          cx="160"
          cy="188"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.55"
        />
        <circle
          cx="160"
          cy="188"
          r="32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.25"
          strokeDasharray="3 4"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 160 188"
            to="360 160 188"
            dur="18s"
            repeatCount="indefinite"
          />
        </circle>
        <line
          x1="160"
          y1="140"
          x2="160"
          y2="236"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.2"
        />
        {/* Meridian band */}
        <path
          d="M124 188 Q160 168 196 188 Q160 208 124 188"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.4"
        />
        {/* Pedestal */}
        <rect
          x="132"
          y="236"
          width="56"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.45"
        />
        <text
          x="160"
          y="290"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.45"
        >
          CENTURION · DESK
        </text>
      </g>

      {/* Wireless link */}
      <g opacity="0.5">
        <path
          id="signalPath"
          d="M210 170 C 270 120, 320 120, 370 150"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeDasharray="4 6"
          markerEnd="url(#remoteArrow)"
        />
        <circle r="3.5" fill="currentColor">
          <animateMotion dur="2.4s" repeatCount="indefinite">
            <mpath href="#signalPath" />
          </animateMotion>
        </circle>
        <circle r="3.5" fill="currentColor" opacity="0.45">
          <animateMotion dur="2.4s" begin="1.2s" repeatCount="indefinite">
            <mpath href="#signalPath" />
          </animateMotion>
        </circle>
      </g>

      {/* iPhone outline */}
      <g transform="translate(372, 48)">
        <rect
          x="0"
          y="0"
          width="100"
          height="200"
          rx="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.55"
        />
        <rect
          x="28"
          y="10"
          width="44"
          height="8"
          rx="4"
          fill="currentColor"
          opacity="0.15"
        />
        {/* Mini screen lines suggesting Remote UI */}
        <rect x="14" y="36" width="72" height="18" rx="3" fill="currentColor" opacity="0.08" />
        <rect x="14" y="62" width="72" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <rect x="14" y="98" width="72" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <rect x="14" y="134" width="72" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        {/* Tab bar */}
        <line x1="18" y1="176" x2="82" y2="176" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        {[26, 42, 58, 74].map((x) => (
          <circle key={x} cx={x} cy="186" r="2.5" fill="currentColor" opacity="0.3" />
        ))}
        <text
          x="50"
          y="230"
          textAnchor="middle"
          className="fill-current"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity="0.45"
        >
          AI REMOTE
        </text>
      </g>

      {/* Caption */}
      <text
        x="260"
        y="28"
        textAnchor="middle"
        className="fill-current"
        fontSize="12"
        fontFamily="ui-monospace, monospace"
        opacity="0.4"
      >
        DESK UNIT  ↔  IPHONE REMOTE
      </text>
    </svg>
  );
}

export function RemoteAppSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="remote"
      ref={sectionRef}
      className="relative py-24 lg:py-32 border-t border-foreground/10 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-20 max-w-3xl">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Personal Centurion AI Remote
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Your Centurion
            <br />
            <span className="text-muted-foreground">on the desk.</span>
            <br />
            You in command.
          </h2>
          <p
            className={`mt-8 text-xl text-muted-foreground leading-relaxed max-w-2xl transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            The sphere stays put — private, on your hardware. You access and operate it
            through the Personal Centurion AI Remote on iPhone: chat, documents,
            collaboration, mission tracking, setup, and more.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start mb-20">
          <div
            className={`border border-foreground/10 p-6 lg:p-10 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <DeskToRemoteDiagram />
          </div>

          <div
            className={`relative mx-auto w-full max-w-[280px] transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative rounded-[2rem] border border-foreground/15 bg-foreground/[0.03] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
              <div className="overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-[#f4f1ec]">
                <Image
                  src="/personal-centurion-ai-remote.png"
                  alt="Personal Centurion AI Remote on iPhone — Settings, connection, and AI provider controls"
                  width={470}
                  height={1024}
                  className="w-full h-auto"
                  sizes="280px"
                />
              </div>
            </div>
            <p className="mt-4 text-center font-mono text-xs tracking-widest uppercase text-muted-foreground">
              iPhone · AI Remote
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
          {capabilities.map((item, index) => (
            <div
              key={item.title}
              className={`bg-background p-8 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${150 + index * 60}ms` }}
            >
              <item.icon className="w-5 h-5 mb-5 text-foreground/70" />
              <h3 className="font-display text-2xl mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
