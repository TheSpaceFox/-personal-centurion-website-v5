/** Marketing hold amount in GBP pence (£500). Settlement remains GBP. */
export const HOLD_GBP_PENCE = 50_000

/** Catalogue display amounts (GBP pence) — source of truth for marketing UI. */
export const DISPLAY_GBP_PENCE = {
  personal: 500_000,
  personalBeta: 425_000,
  /** Prime Pilot — per unit (walnut & copper); minimum order three. */
  pilot: 750_000,
  /** Prime Board — per unit (marble & brass); minimum order four. */
  board: 1_250_000,
} as const
