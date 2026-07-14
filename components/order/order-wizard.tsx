'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { WizardProvider, useWizard } from '@/components/order/wizard-context'
import { StepEngagement } from '@/components/order/step-engagement'
import { StepDetails } from '@/components/order/step-details'
import { StepSummary } from '@/components/order/step-summary'
import type { EngagementTier } from '@/lib/orders/types'
import { cn } from '@/lib/utils'

function WizardSteps() {
  const { step, totalSteps, goToStep } = useWizard()
  const labels = ['Engagement', 'Details', 'Summary']

  return (
    <div className="space-y-12">
      <nav className="flex flex-wrap gap-4 border-b border-foreground/10 pb-6">
        {labels.map((label, index) => {
          const n = index + 1
          return (
            <button
              key={label}
              type="button"
              onClick={() => goToStep(n)}
              className={cn(
                'font-mono text-xs uppercase tracking-widest transition-colors',
                step === n ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {String(n).padStart(2, '0')} {label}
              {n < totalSteps && <span className="ml-4 hidden text-foreground/20 sm:inline">/</span>}
            </button>
          )
        })}
      </nav>
      {step === 1 && <StepEngagement />}
      {step === 2 && <StepDetails />}
      {step === 3 && <StepSummary />}
    </div>
  )
}

function OrderWizardInner() {
  const searchParams = useSearchParams()
  const raw = searchParams.get('engagement')
  const resume = searchParams.get('resume') === '1'
  const initialEngagement =
    raw === 'interest' || raw === 'personal' || raw === 'pilot' || raw === 'board'
      ? (raw as EngagementTier)
      : undefined

  return (
    <WizardProvider initialEngagement={initialEngagement} resume={resume}>
      <WizardSteps />
    </WizardProvider>
  )
}

export function OrderWizard() {
  return (
    <Suspense fallback={<div className="py-24 text-muted-foreground">Loading configurator…</div>}>
      <OrderWizardInner />
    </Suspense>
  )
}
