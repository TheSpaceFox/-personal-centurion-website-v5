'use client'

import { useEffect, useState } from 'react'
import { Link } from '@/i18n/routing'
import { useParams, useSearchParams } from 'next/navigation'
import { fetchQuoteAction } from '@/lib/orders/actions'
import { formatGbpFromPence } from '@/lib/orders/pricing'
import type { QuoteRecord } from '@/lib/orders/types'
import { BUYER_SESSION_KEY } from '@/lib/orders/types'

export default function OrderDetailClient() {
  const params = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const submitted = searchParams.get('submitted') === '1'
  const [quote, setQuote] = useState<QuoteRecord | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchQuoteAction(params.id).then((result) => {
      if (!result.ok || !result.quote) {
        setError('Quote not found.')
        return
      }
      setQuote(result.quote)
      try {
        localStorage.setItem(BUYER_SESSION_KEY, result.quote.email)
      } catch {
        // ignore
      }
    })
  }, [params.id])

  if (error) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24">
        <p className="text-destructive">{error}</p>
        <Link href="/account" className="mt-6 inline-block text-sm underline">
          Back to account
        </Link>
      </main>
    )
  }

  if (!quote) {
    return <main className="p-12 text-muted-foreground">Loading quote…</main>
  }

  return (
    <main className="relative min-h-screen noise-overlay">
      <header className="border-b border-foreground/10">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
          <Link href="/" className="font-display text-sm tracking-[0.12em]">
            PERSONAL CENTURION
          </Link>
          <Link href="/account" className="text-sm text-muted-foreground hover:text-foreground">
            Account
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-16">
        {submitted && (
          <div className="mb-8 border border-foreground/20 bg-foreground/[0.03] p-6">
            <p className="font-display text-xl">Thank you — your quote is with our team.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              We will contact you at {quote.email} to arrange next steps. No card was charged.
            </p>
          </div>
        )}

        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Quote · {quote.status.replaceAll('_', ' ')}
        </span>
        <h1 className="mt-3 font-display text-4xl tracking-tight capitalize">{quote.engagement}</h1>
        <p className="mt-2 font-mono text-xs text-muted-foreground">{quote.id}</p>

        <dl className="mt-10 space-y-4 border border-foreground/10 p-6 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Quantity</dt>
            <dd>{quote.quantity}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Total</dt>
            <dd>{quote.totalGbp === 0 ? 'Enquiry' : formatGbpFromPence(quote.totalGbp)}</dd>
          </div>
          {quote.depositGbp > 0 && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Indicative deposit</dt>
              <dd>{formatGbpFromPence(quote.depositGbp)}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Contact</dt>
            <dd>
              {quote.firstName} {quote.lastName} · {quote.email}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Submitted</dt>
            <dd>{new Date(quote.createdAt).toLocaleString('en-GB')}</dd>
          </div>
        </dl>

        <p className="mt-8 text-sm text-muted-foreground">
          Status moves through quote → deposit → Soul Wizard → embodiment → shipped → delivered.
          Our team updates this as your Centurion is prepared.
        </p>
      </div>
    </main>
  )
}
