'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Globe } from 'lucide-react'
import { usePathname, useRouter } from '@/i18n/routing'
import { localeMeta, locales, type AppLocale } from '@/i18n/locales'

export function LocaleSwitcher({ compact = false }: { compact?: boolean }) {
  const t = useTranslations('localeSwitcher')
  const locale = useLocale() as AppLocale
  const router = useRouter()
  const pathname = usePathname()
  const current = localeMeta[locale] ?? localeMeta['en-GB']

  return (
    <label
      className={`relative inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/60 text-foreground transition-colors hover:border-foreground/40 hover:bg-background ${
        compact ? 'h-9 pl-2.5 pr-8 text-xs' : 'h-9 pl-3 pr-8 text-sm'
      }`}
    >
      <span className="sr-only">{t('aria')}</span>
      <Globe
        aria-hidden
        className={`pointer-events-none shrink-0 text-foreground/55 ${compact ? 'size-3.5' : 'size-4'}`}
      />
      <select
        aria-label={t('aria')}
        className="absolute inset-0 z-10 cursor-pointer appearance-none opacity-0"
        value={locale}
        onChange={(e) => {
          const next = e.target.value as AppLocale
          router.replace(pathname, { locale: next })
        }}
      >
        {locales.map((code) => {
          const meta = localeMeta[code]
          return (
            <option key={code} value={code}>
              {meta.nativeLabel} · {meta.currency}
            </option>
          )
        })}
      </select>
      <span className="pointer-events-none max-w-[9.5rem] truncate sm:max-w-none">
        <span className="font-medium">{current.nativeLabel}</span>
        <span className="text-muted-foreground"> · {current.currency}</span>
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute right-2.5 text-[10px] text-foreground/50"
      >
        ▾
      </span>
    </label>
  )
}
