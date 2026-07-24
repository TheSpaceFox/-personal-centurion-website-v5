'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from '@/i18n/routing'
import { useWizard, clearWizardDraft } from '@/components/order/wizard-context'
import { ENGAGEMENT_TIERS, BUYER_SESSION_KEY } from '@/lib/orders/types'
import { calculatePricing } from '@/lib/orders/pricing'
import { submitQuoteAction } from '@/lib/orders/actions'
import { emptyProfile, saveBuyerProfile } from '@/lib/auth/buyer-profile'
import { useDisplayMoney } from '@/hooks/use-display-money'
import { useTranslations } from 'next-intl'

export function StepSummary() {
  const t = useTranslations('order')
  const { state, back, counselHandoff, clearCounselHandoff } = useWizard()
  const pricing = calculatePricing(state)
  const tier = ENGAGEMENT_TIERS[state.engagement]
  const router = useRouter()
  const { format } = useDisplayMoney()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit() {
    setSubmitting(true)
    setError(null)
    const result = await submitQuoteAction({
      state,
      counselHandoff: counselHandoff
        ? (counselHandoff as unknown as Record<string, unknown>)
        : null,
    })
    setSubmitting(false)

    if (!result.ok) {
      setError(result.error)
      return
    }

    try {
      localStorage.setItem(BUYER_SESSION_KEY, state.email.trim().toLowerCase())
      saveBuyerProfile({
        ...emptyProfile(state.email),
        firstName: state.firstName,
        lastName: state.lastName,
        phone: state.phone,
        company: state.company,
      })
    } catch {
      // ignore
    }
    clearCounselHandoff()
    clearWizardDraft()
    router.push(`/account/orders/${result.quote.id}?submitted=1`)
  }

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          {t('stepSummary')}
        </span>
        <h1 className="font-display text-4xl md:text-5xl tracking-tight text-foreground">
          {t('summaryTitle')}
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          {t('summaryLead')}
        </p>
      </header>

      {counselHandoff?.summary && (
        <div className="border border-foreground/15 bg-foreground/[0.03] p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t('fromCounsel')}
          </p>
          <p className="mt-2 text-sm text-foreground">{counselHandoff.summary}</p>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4 border border-foreground/10 p-6">
          <h2 className="font-display text-2xl">{t('engagementHeading')}</h2>
          <p className="text-foreground">{tier.name}</p>
          <p className="text-sm text-muted-foreground">{tier.description}</p>
          <p className="text-sm text-muted-foreground">
            {t('quantityLabel', { quantity: state.quantity })}
          </p>
          <ul className="space-y-2 border-t border-foreground/10 pt-4">
            {pricing.lineItems.map((item) => (
              <li key={item.productId} className="flex justify-between text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  {pricing.enquireOnly && item.totalPriceGbp === 0
                    ? t('enquiryLabel')
                    : format(item.totalPriceGbp)}
                </span>
              </li>
            ))}
          </ul>
          {!pricing.enquireOnly && (
            <div className="space-y-1 border-t border-foreground/10 pt-4 text-sm">
              <div className="flex justify-between">
                <span>{t('total')}</span>
                <span className="font-medium">{format(pricing.total)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>{t('deposit')}</span>
                <span>{format(pricing.deposit)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 border border-foreground/10 p-6">
          <h2 className="font-display text-2xl">{t('contactHeading')}</h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-muted-foreground">{t('name')}</dt>
              <dd>
                {state.firstName} {state.lastName}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{t('email')}</dt>
              <dd>{state.email}</dd>
            </div>
            {state.phone && (
              <div>
                <dt className="text-muted-foreground">{t('phoneShort')}</dt>
                <dd>{state.phone}</dd>
              </div>
            )}
            {state.company && (
              <div>
                <dt className="text-muted-foreground">{t('companyShort')}</dt>
                <dd>{state.company}</dd>
              </div>
            )}
            {(state.city || state.region) && (
              <div>
                <dt className="text-muted-foreground">{t('location')}</dt>
                <dd>
                  {[state.city, state.region].filter(Boolean).join(', ')}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <p className="text-sm text-muted-foreground">
        {t('preferSignIn')}{' '}
        <Link
          href="/auth?returnUrl=/order?resume=1"
          className="underline underline-offset-4 hover:text-foreground"
        >
          {t('signInReturn')}
        </Link>
        .
      </p>

      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={back}
          className="border border-foreground/20 px-8 py-4 text-sm text-foreground hover:bg-foreground/5"
        >
          {t('back')}
        </button>
        <button
          type="button"
          disabled={submitting}
          onClick={submit}
          className="bg-foreground px-8 py-4 text-sm font-medium text-primary-foreground hover:bg-foreground/90 disabled:opacity-50"
        >
          {submitting
            ? t('submitting')
            : pricing.enquireOnly
              ? t('submitEnquiry')
              : t('requestQuote')}
        </button>
      </div>
    </div>
  )
}
