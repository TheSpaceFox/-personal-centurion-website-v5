import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { OrderWizard } from '@/components/order/order-wizard'
import { SITE_VERSION } from '@/lib/site-config'
import { isAppLocale, type AppLocale } from '@/i18n/locales'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale = (isAppLocale(raw) ? raw : 'en-GB') as AppLocale
  const t = await getTranslations({ locale, namespace: 'order' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale = (isAppLocale(raw) ? raw : 'en-GB') as AppLocale
  setRequestLocale(locale)
  const t = await getTranslations('order')

  return (
    <main className="relative min-h-screen noise-overlay">
      <header className="border-b border-foreground/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 lg:px-12">
          <Link href="/" className="font-display text-sm tracking-[0.12em] sm:text-base">
            CENTURION
          </Link>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/account" className="hover:text-foreground">
              {t('account')}
            </Link>
            <span className="font-mono text-xs">v{SITE_VERSION}</span>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-12 lg:py-24">
        <OrderWizard />
      </div>
    </main>
  )
}
