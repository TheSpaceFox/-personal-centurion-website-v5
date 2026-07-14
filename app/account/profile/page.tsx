'use client'

import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BUYER_SESSION_KEY } from '@/lib/orders/types'
import {
  emptyProfile,
  loadBuyerProfile,
  saveBuyerProfile,
  type BuyerProfile,
} from '@/lib/auth/buyer-profile'
import { SITE_VERSION } from '@/lib/site-config'

export default function ProfilePage() {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)
  const [profile, setProfile] = useState<BuyerProfile>(emptyProfile())
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedEmail = localStorage.getItem(BUYER_SESSION_KEY)
    if (!savedEmail) {
      router.replace('/auth?returnUrl=/account/profile')
      return
    }
    setEmail(savedEmail)
    setProfile(loadBuyerProfile(savedEmail) || emptyProfile(savedEmail))
  }, [router])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email) return
    saveBuyerProfile({ ...profile, email })
    setSaved(true)
  }

  if (!email) {
    return <main className="p-12 text-muted-foreground">Loading…</main>
  }

  return (
    <main className="relative min-h-screen noise-overlay">
      <header className="border-b border-foreground/10">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-6">
          <Link href="/" className="font-display text-sm tracking-[0.12em]">
            PERSONAL CENTURION
          </Link>
          <div className="flex gap-6 text-sm">
            <Link href="/account" className="text-muted-foreground hover:text-foreground">
              Orders
            </Link>
            <span className="font-mono text-xs text-muted-foreground">v{SITE_VERSION}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-16">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Account
        </span>
        <h1 className="mt-3 font-display text-4xl tracking-tight">Profile</h1>
        <p className="mt-3 text-muted-foreground">
          Saved against {email}. Prefills the order configurator on this device.
        </p>

        <form onSubmit={onSubmit} className="mt-10 space-y-6">
          {(
            [
              ['firstName', 'First name'],
              ['lastName', 'Last name'],
              ['company', 'Company'],
              ['phone', 'Phone'],
              ['locale', 'Locale'],
              ['preferredCurrency', 'Preferred currency'],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="block space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {label}
              </span>
              <input
                value={profile[key]}
                onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                className="h-12 w-full border border-foreground/20 bg-background px-4 outline-none focus:border-foreground"
              />
            </label>
          ))}
          {saved && <p className="text-sm text-foreground">Profile saved.</p>}
          <button
            type="submit"
            className="bg-foreground px-8 py-4 text-sm font-medium text-primary-foreground hover:bg-foreground/90"
          >
            Save profile
          </button>
        </form>
      </div>
    </main>
  )
}
