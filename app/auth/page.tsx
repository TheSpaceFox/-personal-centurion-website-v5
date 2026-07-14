'use client'

import { FormEvent, Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { BUYER_SESSION_KEY, WIZARD_DRAFT_KEY } from '@/lib/orders/types'
import { resolvePostLoginRedirect } from '@/lib/auth/post-login-redirect'
import { createClient } from '@/lib/supabase/client'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import { emptyProfile, saveBuyerProfile, loadBuyerProfile } from '@/lib/auth/buyer-profile'

function AuthForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('returnUrl')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const supabaseEnabled = isSupabaseConfigured()

  useEffect(() => {
    const client = createClient()
    if (!client) return
    client.auth.getSession().then(({ data }) => {
      const sessionEmail = data.session?.user?.email
      if (!sessionEmail) return
      localStorage.setItem(BUYER_SESSION_KEY, sessionEmail.toLowerCase())
      const hasDraft = Boolean(sessionStorage.getItem(WIZARD_DRAFT_KEY))
      router.replace(resolvePostLoginRedirect({ returnUrl, hasDraftOrder: hasDraft }))
    })
  }, [returnUrl, router])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Enter a valid email address.')
      return
    }

    setSubmitting(true)
    setError(null)
    setMessage(null)

    const client = createClient()
    if (client) {
      const origin = window.location.origin
      const next = resolvePostLoginRedirect({
        returnUrl,
        hasDraftOrder: Boolean(sessionStorage.getItem(WIZARD_DRAFT_KEY)),
      })
      const { error: authError } = await client.auth.signInWithOtp({
        email: trimmed,
        options: {
          emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      })
      setSubmitting(false)
      if (authError) {
        setError(authError.message)
        return
      }
      localStorage.setItem(BUYER_SESSION_KEY, trimmed)
      if (!loadBuyerProfile(trimmed)?.email) {
        saveBuyerProfile(emptyProfile(trimmed))
      }
      setMessage('Check your email for a magic link to continue.')
      return
    }

    localStorage.setItem(BUYER_SESSION_KEY, trimmed)
    const existing = loadBuyerProfile(trimmed)
    if (!existing?.firstName) {
      saveBuyerProfile(emptyProfile(trimmed))
    }
    const hasDraft = Boolean(sessionStorage.getItem(WIZARD_DRAFT_KEY))
    setSubmitting(false)
    router.push(resolvePostLoginRedirect({ returnUrl, hasDraftOrder: hasDraft }))
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-24">
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Buyer access
      </span>
      <h1 className="mt-4 font-display text-4xl tracking-tight">Sign in with your email</h1>
      <p className="mt-4 text-muted-foreground">
        {supabaseEnabled
          ? 'We will email you a magic link. After sign-in you return to your order or account.'
          : 'Use the email from your quote to view order status. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable magic-link auth.'}
      </p>

      <form onSubmit={onSubmit} className="mt-10 space-y-6">
        <label className="block space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full border border-foreground/20 bg-background px-4 outline-none focus:border-foreground"
            placeholder="you@company.com"
            required
          />
        </label>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {message && <p className="text-sm text-foreground">{message}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-foreground py-4 text-sm font-medium text-primary-foreground hover:bg-foreground/90 disabled:opacity-50"
        >
          {submitting ? 'Please wait…' : supabaseEnabled ? 'Email me a magic link' : 'Continue to account'}
        </button>
      </form>

      {returnUrl?.startsWith('/order') && (
        <p className="mt-6 text-sm text-muted-foreground">
          After sign-in you will return to the configurator to finish your quote.
        </p>
      )}
    </div>
  )
}

export default function AuthPage() {
  return (
    <main className="relative min-h-screen noise-overlay">
      <header className="border-b border-foreground/10">
        <div className="mx-auto flex max-w-xl items-center justify-between px-6 py-6">
          <Link href="/" className="font-display text-sm tracking-[0.12em]">
            PERSONAL CENTURION
          </Link>
          <Link href="/order" className="text-sm text-muted-foreground hover:text-foreground">
            Order
          </Link>
        </div>
      </header>
      <Suspense fallback={<div className="p-12 text-muted-foreground">Loading…</div>}>
        <AuthForm />
      </Suspense>
    </main>
  )
}
