'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { QuoteRecord } from '@/lib/orders/types'
import { formatGbpFromPence } from '@/lib/orders/pricing'

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRecord[]>([])
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useState('')

  useEffect(() => {
    const saved = sessionStorage.getItem('centurion-admin-token')
    if (saved) setToken(saved)
  }, [])

  async function refresh(adminToken: string) {
    setError(null)
    sessionStorage.setItem('centurion-admin-token', adminToken)
    try {
      const res = await fetch('/api/admin/quotes', {
        headers: { Authorization: `Bearer ${adminToken}` },
      })
      if (!res.ok) {
        setError('Invalid staff token or empty store.')
        setQuotes([])
        return
      }
      const data = (await res.json()) as { quotes: QuoteRecord[] }
      setQuotes(data.quotes)
    } catch {
      setError('Could not load quotes.')
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <Link href="/" className="font-display text-sm tracking-[0.12em]">
        PERSONAL CENTURION
      </Link>
      <h1 className="mt-8 font-display text-4xl">Quote inbox</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Staff triage for v5 quotes. Set <code className="font-mono">ADMIN_STAFF_TOKEN</code> in
        the environment.
      </p>

      <form
        className="mt-8 flex flex-wrap gap-3"
        onSubmit={(e) => {
          e.preventDefault()
          refresh(token)
        }}
      >
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Staff token"
          className="h-11 min-w-[240px] flex-1 border border-foreground/20 px-3"
        />
        <button type="submit" className="bg-foreground px-6 py-3 text-sm text-primary-foreground">
          Load quotes
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      <div className="mt-10 space-y-3">
        {quotes.map((q) => (
          <div key={q.id} className="border border-foreground/10 p-5 text-sm">
            <div className="flex flex-wrap justify-between gap-2">
              <strong className="capitalize">
                {q.engagement} · {q.firstName} {q.lastName}
              </strong>
              <span>{q.totalGbp === 0 ? 'Enquiry' : formatGbpFromPence(q.totalGbp)}</span>
            </div>
            <p className="mt-1 text-muted-foreground">
              {q.email} · qty {q.quantity} · {new Date(q.createdAt).toLocaleString('en-GB')}
            </p>
            <Link href={`/account/orders/${q.id}`} className="mt-2 inline-block underline">
              Open
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}
