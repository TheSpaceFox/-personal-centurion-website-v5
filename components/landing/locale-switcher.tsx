'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'
import { localeMeta, locales, type AppLocale } from '@/i18n/locales'

export function LocaleSwitcher({ compact = false }: { compact?: boolean }) {
  const t = useTranslations('localeSwitcher')
  const locale = useLocale() as AppLocale
  const router = useRouter()
  const pathname = usePathname()

  return (
    <label className="relative inline-flex items-center text-foreground/70 hover:text-foreground transition-colors">
      <span className="sr-only">{t('aria')}</span>
      <select
        aria-label={t('aria')}
        className={`appearance-none bg-transparent border border-foreground/15 rounded-full cursor-pointer hover:border-foreground/30 focus:outline-none focus:ring-1 focus:ring-foreground/30 ${
          compact ? 'text-xs pl-2 pr-6 h-8' : 'text-sm pl-3 pr-7 h-9'
        }`}
        value={locale}
        onChange={(e) => {
          const next = e.target.value as AppLocale
          router.replace(pathname, { locale: next })
        }}
      >
        {locales.map((code) => {
          const meta = localeMeta[code]
          return (
            <option key={code} value={code} className="text-foreground bg-background">
              {meta.nativeLabel} · {meta.currency}
            </option>
          )
        })}
      </select>
      <span
        aria-hidden
        className={`pointer-events-none absolute right-2 text-foreground/50 ${compact ? 'text-[10px]' : 'text-xs'}`}
      >
        ▾
      </span>
    </label>
  )
}
