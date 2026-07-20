'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowRight, Check } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { SecurityPillarsDiagram } from '@/components/landing/security-diagrams'

export function SecuritySummarySection() {
  const t = useTranslations('securitySummary')
  const bullets = t('bullets')
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean)

  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.12 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="security-brief"
      ref={sectionRef}
      className="relative border-t border-foreground/10 bg-foreground/[0.02] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
          <div className="max-w-2xl">
            <span className="mb-6 inline-flex items-center gap-3 font-mono text-sm text-muted-foreground">
              <span className="h-px w-8 bg-foreground/30" />
              {t('eyebrow')}
            </span>
            <h2
              className={`font-display text-4xl tracking-tight text-foreground transition-all duration-700 lg:text-5xl ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              {t('title')}
            </h2>
            <p
              className={`mt-6 text-lg leading-relaxed text-muted-foreground transition-all delay-100 duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              {t('lead')}
            </p>

            <ul
              className={`mt-8 space-y-4 transition-all delay-150 duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
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
              className={`group mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 transition-all delay-200 duration-700 hover:underline ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              {t('cta')}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/security#faq"
              className={`mt-3 block text-sm text-muted-foreground underline-offset-4 transition-all delay-200 duration-700 hover:text-foreground hover:underline ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              {t('faqLink')}
            </Link>
          </div>

          <div
            className={`border border-foreground/10 bg-background p-6 transition-all delay-150 duration-700 lg:p-10 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <SecurityPillarsDiagram />
            <p className="mt-4 text-center font-mono text-xs tracking-widest text-muted-foreground uppercase">
              {t('diagramCaption')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
