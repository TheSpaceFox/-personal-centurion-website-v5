import { Link } from '@/i18n/routing'
import { COMPANY, SITE_VERSION } from '@/lib/site-config'

export const metadata = {
  title: 'Privacy Policy — Sovereign',
  description: 'How Sovereign collects and protects personal data.',
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
      <Link href="/" className="font-display text-sm tracking-[0.12em]">
        PERSONAL CENTURION
      </Link>
      <h1 className="mt-10 font-display text-4xl tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: July 2026 · Platform v{SITE_VERSION}</p>
      <div className="prose prose-neutral mt-10 max-w-none space-y-6 text-muted-foreground">
        <p>
          {COMPANY.legalName} (&quot;we&quot;) builds private AI systems that run on customer-owned
          hardware. This policy explains how we handle personal data when you use our website,
          ordering system, and support services.
        </p>
        <h2 className="font-display text-2xl text-foreground">Data we collect</h2>
        <p>
          We collect information you provide when registering interest, placing a quote, or
          contacting support — including name, email, phone, company, and order configuration. We
          also collect technical logs necessary to operate our services.
        </p>
        <h2 className="font-display text-2xl text-foreground">How we use your data</h2>
        <p>
          We use your data to process enquiries and orders, deliver and support Centurion systems,
          communicate about your account, and improve our services. We do not use your private
          Centurion inference data to train shared models.
        </p>
        <h2 className="font-display text-2xl text-foreground">Your rights</h2>
        <p>
          Under UK GDPR you may request access, correction, deletion, or portability of your
          personal data. Contact us at {COMPANY.email}.
        </p>
        <p>
          Support library:{' '}
          <a className="underline" href={COMPANY.helpUrl}>
            {COMPANY.helpUrl}
          </a>
        </p>
      </div>
    </main>
  )
}
