import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { COMPANY, SITE_VERSION } from '@/lib/site-config'

export const metadata = {
  title: 'Terms of Service — Sovereign',
  description: 'Terms governing use of Sovereign website, ordering, and related services.',
}

export default async function TermsPage() {
  const t = await getTranslations('terms')
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
        <h2 className="font-display text-2xl text-foreground">{t('hardwareTitle')}</h2>
        <p>{t('hardwareBody')}</p>
        <h2 className="font-display text-2xl text-foreground">{t('paymentTitle')}</h2>
        <p>{t('paymentBody')}</p>
        <h2 className="font-display text-2xl text-foreground">{t('dataTitle')}</h2>
        <p>{t('dataBody')}</p>
        <p>
          {t('questions', { email: COMPANY.email })}
        </p>
      </div>
    </main>
  )
}
