import { Link } from '@/i18n/routing'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { COMPANY, SITE_VERSION } from '@/lib/site-config'
import { CenturionLogo } from '@/components/centurion-logo'
import {
  ThesisDiagram,
  SystemShapeDiagram,
  LifecycleDiagram,
  TrustBoundaryDiagram,
  SkillsForgeDiagram,
} from '@/components/whitepaper'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'whitepaper' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

function DiagramFrame({
  children,
  caption,
}: {
  children: ReactNode
  caption: string
}) {
  return (
    <figure className="my-10 border border-foreground/10 bg-card p-4 sm:p-8">
      {children}
      <figcaption className="mt-4 text-center font-mono text-[10px] tracking-widest text-muted-foreground uppercase sm:text-xs">
        {caption}
      </figcaption>
    </figure>
  )
}

function splitRecords(raw: string): { title: string; body: string }[] {
  return raw
    .split('||')
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [title, ...rest] = chunk.split('|')
      return { title: (title ?? '').trim(), body: rest.join('|').trim() }
    })
}

export default async function WhitepaperPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('whitepaper')
  const shapeItems = splitRecords(t('shapeItems'))
  const livesSteps = splitRecords(t('livesSteps'))

  return (
    <main className="noise-overlay relative min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12 lg:py-24">
        <div className="max-w-3xl">
          <Link
            href="/"
            className="inline-flex transition-opacity hover:opacity-80"
          >
            <CenturionLogo size="md" variant="full" />
          </Link>

          <p className="mt-12 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            {t('eyebrow', { company: COMPANY.legalName, version: SITE_VERSION })}
          </p>

          <h1 className="mt-4 font-display text-4xl tracking-tight lg:text-5xl">
            {t('title')}
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            {t('lead')}
          </p>
        </div>

        <article className="mx-auto mt-16 max-w-3xl space-y-10 text-muted-foreground">
          <section className="space-y-4">
            <h2 className="font-display text-2xl text-foreground tracking-tight">
              {t('abstractTitle')}
            </h2>
            <p className="leading-relaxed">{t('abstractP1')}</p>
            <p className="leading-relaxed">{t('abstractP2')}</p>
          </section>

          <DiagramFrame caption={t('fig1')}>
            <ThesisDiagram />
          </DiagramFrame>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-foreground tracking-tight">
              {t('problemTitle')}
            </h2>
            <p className="leading-relaxed">{t('problemP1')}</p>
            <p className="leading-relaxed">{t('problemP2')}</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-foreground tracking-tight">
              {t('whatTitle')}
            </h2>
            <p className="leading-relaxed">{t('whatP1')}</p>
            <p className="leading-relaxed">{t('whatP2')}</p>
          </section>

          <DiagramFrame caption={t('fig2')}>
            <SystemShapeDiagram />
          </DiagramFrame>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-foreground tracking-tight">
              {t('shapeTitle')}
            </h2>
            <p className="leading-relaxed">{t('shapeLead')}</p>
            <ul className="list-disc space-y-2 pl-5 leading-relaxed">
              {shapeItems.map((item) => (
                <li key={item.title}>
                  <span className="text-foreground">{item.title}</span>
                  {item.body ? ` — ${item.body}` : null}
                </li>
              ))}
            </ul>
            <p className="leading-relaxed">{t('shapeClose')}</p>
          </section>

          <DiagramFrame caption={t('fig3')}>
            <LifecycleDiagram />
          </DiagramFrame>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-foreground tracking-tight">
              {t('livesTitle')}
            </h2>
            <p className="leading-relaxed">{t('livesLead')}</p>
            <ol className="list-decimal space-y-3 pl-5 leading-relaxed">
              {livesSteps.map((item) => (
                <li key={item.title}>
                  <span className="text-foreground">{item.title}</span>
                  {item.body ? ` — ${item.body}` : null}
                </li>
              ))}
            </ol>
          </section>

          <DiagramFrame caption={t('fig4')}>
            <TrustBoundaryDiagram />
          </DiagramFrame>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-foreground tracking-tight">
              {t('privacyTitle')}
            </h2>
            <p className="leading-relaxed">{t('privacyP1')}</p>
            <p className="leading-relaxed">{t('privacyP2')}</p>
          </section>

          <DiagramFrame caption={t('fig5')}>
            <SkillsForgeDiagram />
          </DiagramFrame>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-foreground tracking-tight">
              {t('skillsTitle')}
            </h2>
            <p className="leading-relaxed">{t('skillsP1')}</p>
            <p className="leading-relaxed">{t('skillsP2')}</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-foreground tracking-tight">
              {t('missionTitle')}
            </h2>
            <p className="leading-relaxed">{t('missionP1')}</p>
            <p className="leading-relaxed">{t('missionP2')}</p>
          </section>

          <section className="space-y-4 border-t border-foreground/10 pt-10">
            <h2 className="font-display text-2xl text-foreground tracking-tight">
              {t('closingTitle')}
            </h2>
            <p className="leading-relaxed">{t('closingP1')}</p>
            <p className="leading-relaxed">{t('closingP2')}</p>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center">
              <Link
                href="/order"
                className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm text-background transition-opacity hover:opacity-90"
              >
                {t('ctaBuild')}
              </Link>
              <a
                href={COMPANY.helpUrl}
                className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/20 px-8 text-sm text-foreground transition-colors hover:bg-foreground/5"
              >
                {t('ctaSupport')}
              </a>
            </div>
          </section>

          <p className="pt-8 text-xs text-muted-foreground/70">
            {t('footer', { company: COMPANY.legalName, version: SITE_VERSION })}
          </p>
        </article>
      </div>
    </main>
  )
}
