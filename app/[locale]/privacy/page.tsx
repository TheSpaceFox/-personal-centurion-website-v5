import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { COMPANY, SITE_VERSION } from '@/lib/site-config'

export const metadata = {
  title: 'Privacy Policy — Sovereign',
  description: 'How Sovereign collects and protects personal data.',
}

export default async function PrivacyPage() {
  const t = await getTranslations('privacy')
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
      <Link href="/" className="font-display text-sm tracking-[0.12em]">
        {t('brand')}
      </Link>
      <h1 className="mt-10 font-display text-4xl tracking-tight">{t('title')}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t('updated', { version: SITE_VERSION })}</p>
      <div className="prose prose-neutral mt-10 max-w-none space-y-6 text-muted-foreground">
        <p>
          {t('intro', { company: COMPANY.legalName })}
        </p>
        <h2 className="font-display text-2xl text-foreground">{t('collectTitle')}</h2>
        <p>{t('collectBody')}</p>
        <h2 className="font-display text-2xl text-foreground">{t('useTitle')}</h2>
        <p>{t('useBody')}</p>
        <h2 className="font-display text-2xl text-foreground">{t('rightsTitle')}</h2>
        <p>{t('rightsBody', { email: COMPANY.email })}</p>
        <p>
          {t('supportLibrary')}{' '}
          <a className="underline" href={COMPANY.helpUrl}>
            {COMPANY.helpUrl}
          </a>
        </p>
      </div>
    </main>
  )
}
