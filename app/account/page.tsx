'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BUYER_SESSION_KEY, type QuoteRecord } from '@/lib/orders/types'
import { fetchMyQuotesAction } from '@/lib/orders/actions'
import { formatGbpFromPence } from '@/lib/orders/pricing'
import { SITE_VERSION } from '@/lib/site-config'

export default function AccountPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)
  const [quotes, setQuotes] = useState<QuoteRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(BUYER_SESSION_KEY)
    if (!saved) {
      router.replace('/auth')
      return
    }
    setEmail(saved)
    fetchMyQuotesAction(saved).then((result) => {
      if (result.ok) setQuotes(result.quotes)
      setLoading(false)
    })
  }, [router])

  function signOut() {
    localStorage.removeItem(BUYER_SESSION_KEY)
    router.push('/')
  }

  if (!email) {
    return <main className="min-h-screen p-12 text-muted-foreground">Loading…</main>
  }

  return (
    <main className="relative min-h-screen noise-overlay">
      <header className="border-b border-foreground/10">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
          <Link href="/" className="font-display text-sm tracking-[0.12em]">
            PERSONAL CENTURION
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/account/profile" className="text-muted-foreground hover:text-foreground">
              Profile
            </Link>
            <Link href="/order" className="text-muted-foreground hover:text-foreground">
              New order
            </Link>
            <button type="button" onClick={signOut} className="text-muted-foreground hover:text-foreground">
              Sign out
            </button>
            <span className="font-mono text-xs text-muted-foreground">v{SITE_VERSION}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Account
        </span>
        <h1 className="mt-3 font-display text-4xl tracking-tight">Your orders</h1>
        <p className="mt-3 text-muted-foreground">
          Signed in as <span className="text-foreground">{email}</span>
        </p>

        <div className="mt-12 space-y-4">
          {loading && <p className="text-muted-foreground">Loading quotes…</p>}
          {!loading && quotes.length === 0 && (
            <div className="border border-foreground/10 p-8">
              <p className="text-muted-foreground">No quotes yet for this email.</p>
              <Link
                href="/order"
                className="mt-6 inline-block bg-foreground px-6 py-3 text-sm text-primary-foreground"
              >
                Secure a build slot
              </Link>
            </div>
          )}
          {quotes.map((quote) => (
            <Link
              key={quote.id}
              href={`/account/orders/${quote.id}`}
              className="block border border-foreground/10 p-6 transition-colors hover:bg-foreground/[0.03]"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {quote.status.replaceAll('_', ' ')}
                  </p>
                  <h2 className="mt-2 font-display text-2xl capitalize">{quote.engagement}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Qty {quote.quantity} · {new Date(quote.createdAt).toLocaleDateString('en-GB')}
                  </p>
                </div>
                <p className="font-display text-2xl">
                  {quote.totalGbp === 0 ? 'Enquiry' : formatGbpFromPence(quote.totalGbp)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
