import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { COMPANY, SITE_VERSION } from "@/lib/site-config";
import { CenturionLogo } from "@/components/centurion-logo";
import {
  ThesisDiagram,
  SystemShapeDiagram,
  LifecycleDiagram,
  TrustBoundaryDiagram,
  SkillsForgeDiagram,
} from "@/components/whitepaper";

export const metadata: Metadata = {
  title: "Whitepaper — Personal Centurion",
  description:
    "A private AI for a private life. Ownership under your roof, loyalty by design, and a sealed study for your life's mission.",
};

function DiagramFrame({
  children,
  caption,
}: {
  children: ReactNode;
  caption: string;
}) {
  return (
    <figure className="my-10 border border-foreground/10 bg-card p-4 sm:p-8">
      {children}
      <figcaption className="mt-4 text-center font-mono text-[10px] tracking-widest text-muted-foreground uppercase sm:text-xs">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function WhitepaperPage() {
  return (
    <main className="noise-overlay relative min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12 lg:py-24">
        <div className="max-w-3xl">
          <Link
            href="/"
            className="inline-flex transition-opacity hover:opacity-80"
          >
            <CenturionLogo size="md" variant="full" />
          </Link>

          <p className="mt-12 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Whitepaper · {COMPANY.legalName} · v{SITE_VERSION}
          </p>

          <h1 className="mt-4 font-display text-4xl tracking-tight lg:text-5xl">
            Personal Centurion: A private AI for a private life
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            One human. One AI. Computation under your roof — loyal because you own it,
            sealed because your private world was never meant for a shared queue.
          </p>
        </div>

        <article className="mx-auto mt-16 max-w-3xl space-y-10 text-muted-foreground">
          <section className="space-y-4">
            <h2 className="font-display text-2xl text-foreground tracking-tight">Abstract</h2>
            <p className="leading-relaxed">
              Public AI systems are built for scale: many people, one platform, one
              pool of attention. Personal Centurion is built for the opposite shape —
              a single principal, a machine that lives with them, and a relationship
              that deepens without leaking into someone else’s product.
            </p>
            <p className="leading-relaxed">
              This paper describes the idea in plain terms: what Centurion is, how the
              system is shaped, where trust stops, and why a private study — not a
              rented chatbot — is the right form for serious private work.
            </p>
          </section>

          <DiagramFrame caption="Figure 1 · Public attention versus a sealed home study">
            <ThesisDiagram />
          </DiagramFrame>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-foreground tracking-tight">
              The problem
            </h2>
            <p className="leading-relaxed">
              Much of what people need from AI is intimate: family matters, business
              judgments, letters that should never travel, and the slow work of naming
              a life’s mission. Shared platforms excel at answers. They are poorly
              suited to stewardship of a private world.
            </p>
            <p className="leading-relaxed">
              When your context lives on someone else’s servers, loyalty is a
              policy — and policies change. Privacy becomes a promise about what a
              vendor will do, not a fact about where the machine sits. Principals who
              have built empires and guard a legacy need something quieter and harder:
              a sealed study under their own roof.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-foreground tracking-tight">
              What Centurion is
            </h2>
            <p className="leading-relaxed">
              A Personal Centurion is an owned appliance — a private brain on your
              network — paired with CenturionAI Remote on iPhone. You talk to{" "}
              <em className="text-foreground not-italic">your</em> Centurion, not to
              a crowd’s chatbot. Hardware stays with you. Control stays with you. The
              company that builds Centurion does not receive your private life as fuel.
            </p>
            <p className="leading-relaxed">
              Remote is the companion in your pocket: counsel, mission, and the day’s
              work — always against the desk machine that holds memory, skills, and
              history. The link is yours. The store is yours.
            </p>
          </section>

          <DiagramFrame caption="Figure 2 · System shape: device link inside the home; thinking services optional and outside the private store">
            <SystemShapeDiagram />
          </DiagramFrame>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-foreground tracking-tight">
              System shape
            </h2>
            <p className="leading-relaxed">
              Three ideas stay separate on purpose.
            </p>
            <ul className="list-disc space-y-2 pl-5 leading-relaxed">
              <li>
                <span className="text-foreground">Device link</span> — your iPhone
                talks to your Centurion over your network. That path is the relationship.
              </li>
              <li>
                <span className="text-foreground">Private store</span> — conversations,
                mission, skills, and decision history live on the brain you own.
              </li>
              <li>
                <span className="text-foreground">Thinking service</span> — when you
                choose an external model to help with reasoning, keys stay on the brain.
                The optional hop is not the same thing as surrendering your archive.
              </li>
            </ul>
            <p className="leading-relaxed">
              You may run fully offline when the room must stay sealed. Connectivity is
              a dial you set — not a default that assumes the public internet.
            </p>
          </section>

          <DiagramFrame caption="Figure 3 · Understand, Place, Live — a continuous loop">
            <LifecycleDiagram />
          </DiagramFrame>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-foreground tracking-tight">
              How it lives with you
            </h2>
            <p className="leading-relaxed">
              Centurion is not installed once and forgotten. It enters a life in three
              movements that repeat:
            </p>
            <ol className="list-decimal space-y-3 pl-5 leading-relaxed">
              <li>
                <span className="text-foreground">Understand</span> — it comes to know
                how you live and work from what you choose to share: privacy, family,
                business, and mission. That understanding stays on the machine.
              </li>
              <li>
                <span className="text-foreground">Place</span> — it settles at home or
                in the office on your terms, including fully offline when that matters.
              </li>
              <li>
                <span className="text-foreground">Live</span> — it works with you every
                day, learns only from what you give it, and does not sell or share your
                private world — including with the company that built it.
              </li>
            </ol>
          </section>

          <DiagramFrame caption="Figure 4 · Trust boundary — what stays home never crosses">
            <TrustBoundaryDiagram />
          </DiagramFrame>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-foreground tracking-tight">
              Privacy and sovereignty
            </h2>
            <p className="leading-relaxed">
              Sovereignty here is physical and operational: hardware in your space,
              deliberate access, a clear history of decisions that remains with you.
              Nothing is assumed safe without your say.
            </p>
            <p className="leading-relaxed">
              The wall is the point. Conversations, mission documents, forged skills,
              and the trail of what your Centurion did — those stay on your side. The
              company and public chat sit outside the ellipse. When you need silence,
              Centurion can work without the public internet.
            </p>
          </section>

          <DiagramFrame caption="Figure 5 · Stranger skill stores refused; skills forged under your roof">
            <SkillsForgeDiagram />
          </DiagramFrame>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-foreground tracking-tight">
              Skills
            </h2>
            <p className="leading-relaxed">
              Other systems treat skills like apps from a shop — made by strangers,
              downloaded into trusted places. Centurion refuses that door. A skill from
              someone you do not know can hide quiet ways to leak a private life or
              change how an AI behaves.
            </p>
            <p className="leading-relaxed">
              When work opens a gap, your Centurion forges the skill it needs and keeps
              it with you. Skills serve your mission. They do not arrive from a shelf
              designed for everyone.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-foreground tracking-tight">
              Mission
            </h2>
            <p className="leading-relaxed">
              A life’s mission is the organizing purpose — not a feature checkbox.
              CenturionAI Remote is the daily surface: talk, clarify, watch progress,
              return to the work that matters. The desk Centurion holds the depth;
              the phone carries the thread.
            </p>
            <p className="leading-relaxed">
              Understanding a mission is not the same as writing a soul document, and
              neither is meant for a shared platform’s retention policy. Both stay in
              the sealed study.
            </p>
          </section>

          <section className="space-y-4 border-t border-foreground/10 pt-10">
            <h2 className="font-display text-2xl text-foreground tracking-tight">
              Closing
            </h2>
            <p className="leading-relaxed">
              Personal Centurion is a bet on form: owned hardware, a pocket companion,
              skills made at home, and a trust boundary that does not depend on a
              vendor’s mood. Real privacy cannot be borrowed, rented, or shared.
            </p>
            <p className="leading-relaxed">
              If that shape belongs with you, secure a build slot — or read how people
              set up and live with Centurion in the support library.
            </p>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center">
              <Link
                href="/order"
                className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm text-background transition-opacity hover:opacity-90"
              >
                Secure a build slot
              </Link>
              <a
                href={COMPANY.helpUrl}
                className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/20 px-8 text-sm text-foreground transition-colors hover:bg-foreground/5"
              >
                Support library
              </a>
            </div>
          </section>

          <p className="pt-8 text-xs text-muted-foreground/70">
            {COMPANY.legalName} · Whitepaper · Platform v{SITE_VERSION} · July 2026
          </p>
        </article>
      </div>
    </main>
  );
}
