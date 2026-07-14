import Link from 'next/link'
import { OrderWizard } from '@/components/order/order-wizard'
import { SITE_VERSION } from '@/lib/site-config'

export const metadata = {
  title: 'Build your Centurion — Personal Centurion',
  description:
    'Configure your Personal Centurion engagement — secure a build slot, enquire for Board, or register interest.',
}

export default function OrderPage() {
  return (
    <main className="relative min-h-screen noise-overlay">
      <header className="border-b border-foreground/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 lg:px-12">
          <Link href="/" className="font-display text-sm tracking-[0.12em] sm:text-base">
            PERSONAL CENTURION
          </Link>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/account" className="hover:text-foreground">
              Account
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
