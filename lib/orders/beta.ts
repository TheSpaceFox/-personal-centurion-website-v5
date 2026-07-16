/** July 2026 limited Beta discount — first Sovereign only. */

export const PERSONAL_LIST_PRICE_PENCE = 500_000 // £5,000
export const BETA_DISCOUNT_PENCE = 75_000 // £750
export const BETA_PERSONAL_PRICE_PENCE = PERSONAL_LIST_PRICE_PENCE - BETA_DISCOUNT_PENCE // £4,250

export const BETA_OFFER = {
  id: 'july-2026-beta',
  name: 'July 2026 Beta',
  endsLabel: 'Ends 31 July 2026',
  headline: '£750 off your first Sovereign',
  detail:
    'Limited to the first Sovereign purchased during the July 2026 Beta. Additional units are at the full £5,000.',
} as const

/** Active throughout calendar July 2026 (UTC). */
export function isJuly2026BetaActive(now: Date = new Date()): boolean {
  return now.getUTCFullYear() === 2026 && now.getUTCMonth() === 6
}
