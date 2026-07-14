import Link from 'next/link'
import { COMPANY, SITE_VERSION } from '@/lib/site-config'

export const metadata = {
  title: 'Terms of Service — Personal Centurion',
  description: 'Terms governing use of Personal Centurion website, ordering, and related services.',
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
      <Link href="/" className="font-display text-sm tracking-[0.12em]">
        PERSONAL CENTURION
      </Link>
      <h1 className="mt-10 font-display text-4xl tracking-tight">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: July 2026 · Platform v{SITE_VERSION}</p>
      <div className="prose prose-neutral mt-10 max-w-none space-y-6 text-muted-foreground">
        <p>
          These terms govern your use of {COMPANY.legalName}&apos;s website, ordering platform, and
          related services. By submitting an enquiry or creating an account, you agree to these
          terms.
        </p>
        <h2 className="font-display text-2xl text-foreground">Hardware and software</h2>
        <p>
          Centurion systems combine dedicated hardware with proprietary AI software configured for
          a single principal. Ownership of hardware transfers on delivery; software is licensed for
          use on that hardware subject to your order and support arrangements.
        </p>
        <h2 className="font-display text-2xl text-foreground">Orders and payment</h2>
        <p>
          Quotes and deposits are denominated in GBP unless otherwise agreed. Website quotes do not
          charge cards automatically — deposits and balances are arranged privately with our team.
          Deposits secure production slots.
        </p>
        <h2 className="font-display text-2xl text-foreground">Your data</h2>
        <p>
          Your Centurion runs on infrastructure you control. We do not access your private inference
          data except as required for agreed support, security updates, or legal obligation.
        </p>
        <p>
          Questions: {COMPANY.email}
        </p>
      </div>
    </main>
  )
}
