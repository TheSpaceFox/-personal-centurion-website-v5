'use client'

import { useWizard } from '@/components/order/wizard-context'
import { ENGAGEMENT_TIERS, type EngagementTier } from '@/lib/orders/types'
import { formatGbpFromPence } from '@/lib/orders/pricing'
import { cn } from '@/lib/utils'

export function StepEngagement() {
  const { state, setState, next } = useWizard()

  function select(id: EngagementTier) {
    const tier = ENGAGEMENT_TIERS[id]
    setState({
      engagement: id,
      quantity: Math.max(tier.minQuantity, Math.min(state.quantity, tier.maxQuantity)),
    })
  }

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Step 01 — Engagement
        </span>
        <h1 className="font-display text-4xl md:text-5xl tracking-tight text-foreground">
          Choose how you begin.
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Secure a Personal Centurion build slot, enquire for a Board edition, or register interest
          without commitment.
        </p>
      </header>

      <div className="grid gap-px bg-foreground/10 md:grid-cols-3">
        {(Object.keys(ENGAGEMENT_TIERS) as EngagementTier[]).map((id) => {
          const tier = ENGAGEMENT_TIERS[id]
          const selected = state.engagement === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => select(id)}
              className={cn(
                'bg-background p-8 text-left transition-colors hover:bg-foreground/[0.03]',
                selected && 'ring-2 ring-inset ring-foreground',
              )}
            >
              <h2 className="font-display text-2xl text-foreground">{tier.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
              <p className="mt-6 font-display text-3xl text-foreground">
                {tier.enquireOnly && tier.unitPrice === 0
                  ? 'Enquiry'
                  : tier.enquireOnly
                    ? `From ${formatGbpFromPence(tier.unitPrice)}`
                    : formatGbpFromPence(tier.unitPrice)}
              </p>
              <ul className="mt-6 space-y-2">
                {tier.includes.slice(0, 3).map((item) => (
                  <li key={item} className="text-sm text-muted-foreground">
                    — {item}
                  </li>
                ))}
              </ul>
            </button>
          )
        })}
      </div>

      {state.engagement !== 'interest' && (
        <div className="flex flex-wrap items-end gap-6 border-t border-foreground/10 pt-8">
          <label className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Quantity
            </span>
            <input
              type="number"
              min={ENGAGEMENT_TIERS[state.engagement].minQuantity}
              max={ENGAGEMENT_TIERS[state.engagement].maxQuantity}
              value={state.quantity}
              onChange={(e) => setState({ quantity: Number(e.target.value) || 1 })}
              className="block h-12 w-28 border border-foreground/20 bg-background px-3 text-foreground"
            />
          </label>
          <p className="text-sm text-muted-foreground pb-3">
            {state.engagement === 'board'
              ? 'Board editions typically start at three units. Final pricing is confirmed privately.'
              : 'One unit is a single Personal Centurion for one principal.'}
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={next}
          className="bg-foreground px-8 py-4 text-sm font-medium text-primary-foreground hover:bg-foreground/90"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
