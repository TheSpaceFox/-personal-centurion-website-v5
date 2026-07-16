import { getRequestConfig } from 'next-intl/server'
import { isAppLocale, messagesLocale, type AppLocale } from './locales'
import { routing } from './routing'

function deepMerge(
  base: Record<string, unknown>,
  overlay: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = { ...base }
  for (const [key, value] of Object.entries(overlay)) {
    const prev = out[key]
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      prev &&
      typeof prev === 'object' &&
      !Array.isArray(prev)
    ) {
      out[key] = deepMerge(
        prev as Record<string, unknown>,
        value as Record<string, unknown>,
      )
    } else {
      out[key] = value
    }
  }
  return out
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !isAppLocale(locale)) {
    locale = routing.defaultLocale
  }
  const appLocale = locale as AppLocale
  const catalog = messagesLocale(appLocale)
  const en = (await import('../messages/en-GB.json')).default as Record<
    string,
    unknown
  >
  const localized =
    catalog === 'en-GB'
      ? {}
      : ((await import(`../messages/${catalog}.json`)).default as Record<
          string,
          unknown
        >)

  return {
    locale: appLocale,
    messages: deepMerge(en, localized),
  }
})
