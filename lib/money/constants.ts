/** Marketing hold amount in GBP pence (£500). Settlement remains GBP. */
export const HOLD_GBP_PENCE = 50_000

/** Catalogue display amounts (GBP pence) — source of truth for marketing UI. */
export const DISPLAY_GBP_PENCE = {
  personal: 500_000,
  personalBeta: 425_000,
  pilot: 1_500_000,
  boardFloor: 4_500_000,
} as const
