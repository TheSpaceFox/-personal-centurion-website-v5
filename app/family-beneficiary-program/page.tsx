import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Family Beneficiary Program — Personal Centurion",
  description:
    "Introduce four colleagues who buy Centurion — earn one complimentary Centurion for someone you love.",
};

export default function FamilyBeneficiaryProgramPage() {
  return (
    <main className="noise-overlay relative min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-12 lg:py-24">
        <Link
          href="/"
          className="font-display text-sm tracking-[0.12em] transition-opacity hover:opacity-80"
        >
          PERSONAL CENTURION
        </Link>

        <p className="mt-12 font-mono text-xs tracking-widest text-muted-foreground uppercase">
          CenturionAI Remote · You
        </p>

        <h1 className="mt-4 font-display text-4xl tracking-tight lg:text-5xl">
          Family Beneficiary Program
        </h1>

        <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
          Introduce four colleagues who buy Centurion — earn one for someone you love.
        </p>

        <div className="mt-12 space-y-10 text-muted-foreground">
          <section className="space-y-4">
            <h2 className="font-display text-2xl tracking-tight text-foreground">How it works</h2>
            <ol className="list-decimal space-y-4 pl-5 leading-relaxed">
              <li>
                <span className="text-foreground font-medium">Nominate a family beneficiary</span> —
                first name only. Often a spouse or family member who wants a Centurion after
                seeing yours thrive.
              </li>
              <li>
                <span className="text-foreground font-medium">Refer colleagues</span> — people who
                will buy their own Personal Centurion. Family members are who you are earning{" "}
                <em>for</em>; they cannot be counted as referrals.
              </li>
              <li>
                <span className="text-foreground font-medium">Four successful purchases</span> —
                when four referred colleagues complete their buy, you earn one complimentary
                Centurion for your nominated family beneficiary.
              </li>
              <li>
                <span className="text-foreground font-medium">Start again</span> — cycles reset
                without limit. Nominate a new family beneficiary and keep going.
              </li>
            </ol>
          </section>

          <section className="border border-foreground/10 bg-card p-6 lg:p-8">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              At a glance
            </p>
            <ul className="mt-4 space-y-3 leading-relaxed">
              <li>4 colleague purchases = 1 family Centurion</li>
              <li>Referrals: colleagues only (non-family)</li>
              <li>Reward: complimentary Centurion for your nominated family member</li>
              <li>Manage it in CenturionAI Remote under You → Family Beneficiary Program</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl tracking-tight text-foreground">
              Where you manage it
            </h2>
            <p className="leading-relaxed">
              Open <span className="text-foreground">CenturionAI Remote</span> on your iPhone, go
              to the <span className="text-foreground">You</span> tab, and use the Family Beneficiary
              Program card. There you can nominate (or change) your beneficiary, refer colleagues,
              and track pending versus purchased progress toward your family Centurion.
            </p>
            <p className="leading-relaxed">
              A referral counts when Centurion operations confirms the colleague&apos;s purchase —
              not the moment you add their name in the app.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl tracking-tight text-foreground">Important rules</h2>
            <ul className="list-disc space-y-3 pl-5 leading-relaxed">
              <li>
                Family members are beneficiaries, not referral targets — listing family as a
                colleague referral is not allowed.
              </li>
              <li>
                You must attest that each referred colleague is not a family member when you add
                them.
              </li>
              <li>
                The complimentary unit is for the family beneficiary you nominated for that cycle.
              </li>
              <li>
                Program details may be updated; the authoritative progress always shows in your
                Remote app when linked to your Centurion.
              </li>
            </ul>
          </section>

          <section className="space-y-4 border-t border-foreground/10 pt-10">
            <h2 className="font-display text-2xl tracking-tight text-foreground">Talk to us</h2>
            <p className="leading-relaxed">
              Questions about a referral or a family Centurion you have earned? Write to{" "}
              <a
                href="mailto:hello@personal-centurion.com?subject=Family%20Beneficiary%20Program"
                className="text-foreground underline underline-offset-4"
              >
                hello@personal-centurion.com
              </a>{" "}
              or use{" "}
              <a
                href="https://help.personal-centurion.com/"
                className="text-foreground underline underline-offset-4"
              >
                Ask Adrian
              </a>{" "}
              in the help center.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/#pricing"
                className="inline-flex h-12 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                See engagement options
              </Link>
              <Link
                href="/"
                className="inline-flex h-12 items-center rounded-full border border-foreground/20 px-6 text-sm transition-colors hover:bg-foreground/5"
              >
                Back to home
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
