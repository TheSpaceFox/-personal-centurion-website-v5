/** Supported marketing locales — language + default display currency. */

export const locales = [
  'en-GB',
  'en-AU',
  'en-US',
  'de-DE',
  'fr-FR',
  'it-IT',
  'es-ES',
  'es-419',
  'nl-NL',
  'pt-PT',
  'sv-SE',
  'pl-PL',
  'zh-HK',
  'ja-JP',
  'ko-KR',
] as const

export type AppLocale = (typeof locales)[number]

export const defaultLocale: AppLocale = 'en-GB'

export type DisplayCurrency =
  | 'GBP'
  | 'AUD'
  | 'USD'
  | 'EUR'
  | 'SEK'
  | 'PLN'
  | 'HKD'
  | 'JPY'
  | 'KRW'

export type LocaleMeta = {
  locale: AppLocale
  /** Short label in the switcher */
  label: string
  /** Native language name */
  nativeLabel: string
  currency: DisplayCurrency
  /** BCP 47 for Intl / html lang (es-419 stays es-419) */
  htmlLang: string
}

export const localeMeta: Record<AppLocale, LocaleMeta> = {
  'en-GB': {
    locale: 'en-GB',
    label: 'English (UK)',
    nativeLabel: 'English (UK)',
    currency: 'GBP',
    htmlLang: 'en-GB',
  },
  'en-AU': {
    locale: 'en-AU',
    label: 'English (AU)',
    nativeLabel: 'English (AU)',
    currency: 'AUD',
    htmlLang: 'en-AU',
  },
  'en-US': {
    locale: 'en-US',
    label: 'English (US)',
    nativeLabel: 'English (US)',
    currency: 'USD',
    htmlLang: 'en-US',
  },
  'de-DE': {
    locale: 'de-DE',
    label: 'Deutsch',
    nativeLabel: 'Deutsch',
    currency: 'EUR',
    htmlLang: 'de-DE',
  },
  'fr-FR': {
    locale: 'fr-FR',
    label: 'Français',
    nativeLabel: 'Français',
    currency: 'EUR',
    htmlLang: 'fr-FR',
  },
  'it-IT': {
    locale: 'it-IT',
    label: 'Italiano',
    nativeLabel: 'Italiano',
    currency: 'EUR',
    htmlLang: 'it-IT',
  },
  'es-ES': {
    locale: 'es-ES',
    label: 'Español (ES)',
    nativeLabel: 'Español (España)',
    currency: 'EUR',
    htmlLang: 'es-ES',
  },
  'es-419': {
    locale: 'es-419',
    label: 'Español (LatAm)',
    nativeLabel: 'Español (América)',
    currency: 'USD',
    htmlLang: 'es-419',
  },
  'nl-NL': {
    locale: 'nl-NL',
    label: 'Nederlands',
    nativeLabel: 'Nederlands',
    currency: 'EUR',
    htmlLang: 'nl-NL',
  },
  'pt-PT': {
    locale: 'pt-PT',
    label: 'Português',
    nativeLabel: 'Português',
    currency: 'EUR',
    htmlLang: 'pt-PT',
  },
  'sv-SE': {
    locale: 'sv-SE',
    label: 'Svenska',
    nativeLabel: 'Svenska',
    currency: 'SEK',
    htmlLang: 'sv-SE',
  },
  'pl-PL': {
    locale: 'pl-PL',
    label: 'Polski',
    nativeLabel: 'Polski',
    currency: 'PLN',
    htmlLang: 'pl-PL',
  },
  'zh-HK': {
    locale: 'zh-HK',
    label: '繁體中文',
    nativeLabel: '繁體中文（香港）',
    currency: 'HKD',
    htmlLang: 'zh-HK',
  },
  'ja-JP': {
    locale: 'ja-JP',
    label: '日本語',
    nativeLabel: '日本語',
    currency: 'JPY',
    htmlLang: 'ja-JP',
  },
  'ko-KR': {
    locale: 'ko-KR',
    label: '한국어',
    nativeLabel: '한국어',
    currency: 'KRW',
    htmlLang: 'ko-KR',
  },
}

export function isAppLocale(value: string): value is AppLocale {
  return (locales as readonly string[]).includes(value)
}

/** Message file to load — English variants share en-GB copy. */
export function messagesLocale(locale: AppLocale): string {
  if (locale === 'en-AU' || locale === 'en-US') return 'en-GB'
  return locale
}

/**
 * ISO 3166-1 alpha-2 country (e.g. Vercel `x-vercel-ip-country`) → default locale.
 * Used when Accept-Language does not map cleanly.
 */
export const countryToLocale: Record<string, AppLocale> = {
  GB: 'en-GB',
  UK: 'en-GB',
  IE: 'en-GB',
  AU: 'en-AU',
  NZ: 'en-AU',
  US: 'en-US',
  CA: 'en-US',
  MX: 'es-419',
  AR: 'es-419',
  CL: 'es-419',
  CO: 'es-419',
  PE: 'es-419',
  VE: 'es-419',
  BR: 'pt-PT',
  PT: 'pt-PT',
  DE: 'de-DE',
  AT: 'de-DE',
  CH: 'de-DE',
  FR: 'fr-FR',
  BE: 'nl-NL',
  LU: 'fr-FR',
  IT: 'it-IT',
  ES: 'es-ES',
  NL: 'nl-NL',
  SE: 'sv-SE',
  NO: 'sv-SE',
  DK: 'sv-SE',
  FI: 'sv-SE',
  PL: 'pl-PL',
  HK: 'zh-HK',
  TW: 'zh-HK',
  MO: 'zh-HK',
  JP: 'ja-JP',
  KR: 'ko-KR',
}

/** Language subtag → preferred locale when region is absent or unmatched. */
const languageToLocale: Record<string, AppLocale> = {
  en: 'en-GB',
  de: 'de-DE',
  fr: 'fr-FR',
  it: 'it-IT',
  es: 'es-ES',
  nl: 'nl-NL',
  pt: 'pt-PT',
  sv: 'sv-SE',
  pl: 'pl-PL',
  zh: 'zh-HK',
  ja: 'ja-JP',
  ko: 'ko-KR',
}

export function localeFromCountry(country: string | null | undefined): AppLocale | null {
  if (!country) return null
  return countryToLocale[country.toUpperCase()] ?? null
}

/**
 * Pick the best app locale from Accept-Language.
 * Exact locale match first, then language-only (e.g. `de` → `de-DE`).
 * Bare `en` returns null so geo can choose US/AU/GB.
 */
export function localeFromAcceptLanguage(
  header: string | null | undefined,
): AppLocale | null {
  if (!header) return null

  const tags = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';')
      const q = params.find((p) => p.trim().startsWith('q='))
      const quality = q ? Number(q.split('=')[1]) : 1
      return { tag: tag.trim().toLowerCase(), quality: Number.isFinite(quality) ? quality : 1 }
    })
    .filter((t) => t.tag)
    .sort((a, b) => b.quality - a.quality)

  for (const { tag } of tags) {
    if (tag === '*') continue
    // BCP47 → our locale ids (es-419 stays es-419)
    const normalized = tag === 'es-419' ? 'es-419' : tag
    if (isAppLocale(normalized)) return normalized

    // en-us / de-de style
    const parts = normalized.split('-')
    if (parts.length >= 2) {
      const asLocale = `${parts[0]}-${parts[1].toUpperCase()}`
      if (parts[0] === 'es' && parts[1] === '419') return 'es-419'
      if (isAppLocale(asLocale)) return asLocale
      // en-* with unknown region: defer to geo for US/AU/GB
      if (parts[0] === 'en') return null
    }

    if (parts[0] === 'en') return null
    const byLang = languageToLocale[parts[0]]
    if (byLang) return byLang
  }

  return null
}

/** Resolve first-visit locale: Accept-Language → IP country → UK. */
export function resolveVisitorLocale(opts: {
  acceptLanguage?: string | null
  country?: string | null
}): AppLocale {
  return (
    localeFromAcceptLanguage(opts.acceptLanguage) ??
    localeFromCountry(opts.country) ??
    defaultLocale
  )
}
