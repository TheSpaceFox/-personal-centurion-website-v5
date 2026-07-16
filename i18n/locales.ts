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
