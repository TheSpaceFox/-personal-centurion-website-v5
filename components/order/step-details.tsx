'use client'

import { useWizard } from '@/components/order/wizard-context'

export function StepDetails() {
  const { state, setState, next, back } = useWizard()

  const canContinue =
    state.firstName.trim() &&
    state.lastName.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Step 02 — Details
        </span>
        <h1 className="font-display text-4xl md:text-5xl tracking-tight text-foreground">
          Who should we speak with?
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          We use this only for your build enquiry. Payment is arranged privately after quote —
          no card is taken on this page.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {(
          [
            ['firstName', 'First name', 'text'],
            ['lastName', 'Last name', 'text'],
            ['email', 'Email', 'email'],
            ['phone', 'Phone (optional)', 'tel'],
            ['company', 'Company (optional)', 'text'],
            ['city', 'City', 'text'],
            ['region', 'Region / country', 'text'],
          ] as const
        ).map(([key, label, type]) => (
          <label key={key} className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {label}
            </span>
            <input
              type={type}
              value={state[key]}
              onChange={(e) => setState({ [key]: e.target.value })}
              className="h-12 w-full border border-foreground/20 bg-background px-4 text-foreground outline-none focus:border-foreground"
            />
          </label>
        ))}
        <label className="space-y-2 md:col-span-2">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Notes (optional)
          </span>
          <textarea
            value={state.notes}
            onChange={(e) => setState({ notes: e.target.value })}
            rows={4}
            className="w-full border border-foreground/20 bg-background px-4 py-3 text-foreground outline-none focus:border-foreground"
            placeholder="Anything we should know about your mission or timeline…"
          />
        </label>
      </div>

      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={back}
          className="border border-foreground/20 px-8 py-4 text-sm text-foreground hover:bg-foreground/5"
        >
          Back
        </button>
        <button
          type="button"
          disabled={!canContinue}
          onClick={next}
          className="bg-foreground px-8 py-4 text-sm font-medium text-primary-foreground hover:bg-foreground/90 disabled:opacity-40"
        >
          Review
        </button>
      </div>
    </div>
  )
}
