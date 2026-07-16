'use client'

import { useLocale } from 'next-intl'
import { localeMeta, type AppLocale } from '@/i18n/locales'
import { formatMoneyFromGbpPenceSync } from '@/lib/money'

/** Client-side display money from GBP pence using the active locale currency. */
export function useDisplayMoney() {
  const locale = useLocale() as AppLocale
  const currency = localeMeta[locale]?.currency ?? 'GBP'

  function format(
    gbpPence: number,
    options?: { fromPlus?: boolean },
  ): string {
    return formatMoneyFromGbpPenceSync(gbpPence, currency, locale, options)
  }

  return { locale, currency, format }
}
