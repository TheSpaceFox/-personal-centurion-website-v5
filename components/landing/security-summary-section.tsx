'use client'

import { useTranslations } from 'next-intl'
import { ArrowRight, Check } from 'lucide-react'
import { Link } from '@/i18n/routing'

export function SecuritySummarySection() {
  const t = useTranslations('securitySummary')
  const bullets = t('bullets')
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <section
      id="security-brief"
      className="relative border-t border-foreground/10 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div className="max-w-2xl">
            <span className="mb-6 inline-flex items-center gap-3 font-mono text-sm text-muted-foreground">
              <span className="h-px w-8 bg-foreground/30" />
              {t('eyebrow')}
            </span>
            <h2 className="font-display text-4xl tracking-tight text-foreground lg:text-5xl">
              {t('title')}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {t('lead')}
            </p>
          </div>

          <div className="space-y-8">
            <ul className="space-y-4">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/security"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              {t('cta')}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
