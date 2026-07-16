import { FALLBACK_GBP_RATES } from './fallback-rates'
import type { DisplayCurrency } from '@/i18n/locales'

export { DISPLAY_GBP_PENCE, HOLD_GBP_PENCE } from './constants'

export type FxSnapshot = {
  base: 'GBP'
  rates: Record<string, number>
  asOf: string
  source: 'frankfurter' | 'fallback'
}

const ZERO_DECIMAL = new Set(['JPY', 'KRW'])

let cached: { snapshot: FxSnapshot; fetchedAt: number } | null = null
const CACHE_MS = 24 * 60 * 60 * 1000

function fallbackSnapshot(): FxSnapshot {
  return {
    base: 'GBP',
    rates: { ...FALLBACK_GBP_RATES },
    asOf: new Date().toISOString().slice(0, 10),
    source: 'fallback',
  }
}

/** Server-side FX rates with GBP base; caches ~24h. */
export async function getGbpRates(): Promise<FxSnapshot> {
  const now = Date.now()
  if (cached && now - cached.fetchedAt < CACHE_MS) {
    return cached.snapshot
  }

  try {
    const res = await fetch(
      'https://api.frankfurter.app/latest?from=GBP',
      { next: { revalidate: 86_400 } },
    )
    if (!res.ok) throw new Error(`FX HTTP ${res.status}`)
    const data = (await res.json()) as {
      date?: string
      rates?: Record<string, number>
    }
    const rates: Record<string, number> = { GBP: 1, ...(data.rates ?? {}) }
    // Frankfurter may omit HKD/KRW — keep fallbacks
    for (const [code, rate] of Object.entries(FALLBACK_GBP_RATES)) {
      if (rates[code] == null) rates[code] = rate
    }
    const snapshot: FxSnapshot = {
      base: 'GBP',
      rates,
      asOf: data.date ?? new Date().toISOString().slice(0, 10),
      source: 'frankfurter',
    }
    cached = { snapshot, fetchedAt: now }
    return snapshot
  } catch {
    const snapshot = fallbackSnapshot()
    cached = { snapshot, fetchedAt: now }
    return snapshot
  }
}

export function convertGbpPenceToMinor(
  gbpPence: number,
  currency: DisplayCurrency,
  rates: Record<string, number>,
): number {
  const rate = rates[currency] ?? FALLBACK_GBP_RATES[currency] ?? 1
  const gbpMajor = gbpPence / 100
  const major = gbpMajor * rate
  if (ZERO_DECIMAL.has(currency)) {
    return Math.round(major)
  }
  return Math.round(major * 100)
}

export function formatMoneyFromGbpPence(
  gbpPence: number,
  currency: DisplayCurrency,
  locale: string,
  rates: Record<string, number>,
  options?: { maximumFractionDigits?: number; fromPlus?: boolean },
): string {
  const minor = convertGbpPenceToMinor(gbpPence, currency, rates)
  const fraction = ZERO_DECIMAL.has(currency) ? 0 : 0
  const major = ZERO_DECIMAL.has(currency) ? minor : minor / 100
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: options?.maximumFractionDigits ?? fraction,
    minimumFractionDigits: 0,
  }).format(major)
  return options?.fromPlus ? `${formatted}+` : formatted
}

/** Sync helper using fallback rates only (client components). */
export function formatMoneyFromGbpPenceSync(
  gbpPence: number,
  currency: DisplayCurrency,
  locale: string,
  options?: { fromPlus?: boolean },
): string {
  return formatMoneyFromGbpPence(
    gbpPence,
    currency,
    locale,
    FALLBACK_GBP_RATES,
    options,
  )
}
