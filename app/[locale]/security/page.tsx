import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { CenturionLogo } from '@/components/centurion-logo'
import { TrustBoundaryDiagram } from '@/components/whitepaper'
import { COMPANY, SITE_VERSION } from '@/lib/site-config'
import { isAppLocale, type AppLocale } from '@/i18n/locales'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale = (isAppLocale(raw) ? raw : 'en-GB') as AppLocale
  const t = await getTranslations({ locale, namespace: 'securityPage' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

function splitList(raw: string): string[] {
  return raw.split('|').map((s) => s.trim()).filter(Boolean)
}

export default async function SecurityPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale = (isAppLocale(raw) ? raw : 'en-GB') as AppLocale
  setRequestLocale(locale)
  const t = await getTranslations('securityPage')

  const benefits = [
    { title: t('benefitOwnTitle'), body: t('benefitOwnBody') },
    { title: t('benefitCryptoTitle'), body: t('benefitCryptoBody') },
    { title: t('benefitOfflineTitle'), body: t('benefitOfflineBody') },
    { title: t('benefitSkillsTitle'), body: t('benefitSkillsBody') },
    { title: t('benefitHumanTitle'), body: t('benefitHumanBody') },
    { title: t('benefitNoTrainTitle'), body: t('benefitNoTrainBody') },
  ]

  const m365Items = splitList(t('m365Items'))
  const googleItems = splitList(t('googleItems'))
  const sharedItems = splitList(t('sharedItems'))

  return (
    <main className="noise-overlay relative min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12 lg:py-24">
        <div className="max-w-3xl">
          <Link href="/" className="inline-flex transition-opacity hover:opacity-80">
            <CenturionLogo size="md" variant="full" />
          </Link>

          <p className="mt-12 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            {t('eyebrow')} · v{SITE_VERSION}
          </p>

          <h1 className="mt-4 font-display text-4xl tracking-tight lg:text-5xl">
            {t('title')}
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            {t('lead')}
          </p>
        </div>

        <article className="mx-auto mt-16 max-w-3xl space-y-14 text-muted-foreground">
          <section className="space-y-4">
            <h2 className="font-display text-2xl tracking-tight text-foreground">
              {t('thesisTitle')}
            </h2>
            <p className="leading-relaxed">{t('thesisBody')}</p>
          </section>

          <section className="space-y-6">
            <h2 className="font-display text-2xl tracking-tight text-foreground">
              {t('benefitsTitle')}
            </h2>
            <div className="grid gap-px border border-foreground/10 bg-foreground/10 sm:grid-cols-2">
              {benefits.map((b) => (
                <div key={b.title} className="bg-background p-6 sm:p-8">
                  <h3 className="font-display text-xl text-foreground">{b.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed">{b.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl tracking-tight text-foreground">
              {t('boundaryTitle')}
            </h2>
            <figure className="border border-foreground/10 bg-card p-4 sm:p-8">
              <TrustBoundaryDiagram />
              <figcaption className="mt-4 text-center font-mono text-[10px] tracking-widest text-muted-foreground uppercase sm:text-xs">
                {t('boundaryCaption')}
              </figcaption>
            </figure>
          </section>

          <section className="space-y-8">
            <div className="space-y-4">
              <h2 className="font-display text-2xl tracking-tight text-foreground">
                {t('emailTitle')}
              </h2>
              <p className="leading-relaxed">{t('emailLead')}</p>
            </div>

            <div className="space-y-4 border border-foreground/10 p-6 sm:p-8">
              <h3 className="font-display text-xl text-foreground">{t('m365Title')}</h3>
              <p className="text-sm leading-relaxed">{t('m365Intro')}</p>
              <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed">
                {m365Items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>

            <div className="space-y-4 border border-foreground/10 p-6 sm:p-8">
              <h3 className="font-display text-xl text-foreground">{t('googleTitle')}</h3>
              <p className="text-sm leading-relaxed">{t('googleIntro')}</p>
              <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed">
                {googleItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>

            <div className="space-y-4">
              <h3 className="font-display text-xl text-foreground">{t('sharedTitle')}</h3>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
                {sharedItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="border border-foreground/15 bg-foreground/[0.03] p-6 sm:p-8">
            <h2 className="font-display text-2xl tracking-tight text-foreground">
              {t('honestTitle')}
            </h2>
            <p className="mt-4 leading-relaxed">{t('honestBody')}</p>
          </section>

          <section className="space-y-6 border-t border-foreground/10 pt-10">
            <h2 className="font-display text-2xl tracking-tight text-foreground">
              {t('ctaTitle')}
            </h2>
            <p className="leading-relaxed">{t('ctaBody')}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${COMPANY.email}?subject=${encodeURIComponent('Security questionnaire — Sovereign')}`}
                className="inline-flex h-12 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                {t('ctaEmail')}
              </a>
              <Link
                href="/whitepaper"
                className="inline-flex h-12 items-center rounded-full border border-foreground/20 px-6 text-sm transition-colors hover:border-foreground hover:bg-foreground/5"
              >
                {t('ctaWhitepaper')}
              </Link>
              <Link
                href="/privacy"
                className="inline-flex h-12 items-center rounded-full border border-foreground/20 px-6 text-sm transition-colors hover:border-foreground hover:bg-foreground/5"
              >
                {t('ctaPrivacy')}
              </Link>
              <Link
                href="/"
                className="inline-flex h-12 items-center px-2 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                {t('ctaHome')}
              </Link>
            </div>
            <p className="font-mono text-xs text-muted-foreground">{COMPANY.email}</p>
          </section>
        </article>
      </div>
    </main>
  )
}
