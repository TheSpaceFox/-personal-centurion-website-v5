'use client'

import { useTranslations } from 'next-intl'
import { ArrowUpRight } from 'lucide-react'
import { CenturionLogo } from '@/components/centurion-logo'
import { Link } from '@/i18n/routing'
import { AnimatedWave } from './animated-wave'

export function FooterSection() {
  const t = useTranslations('footer')
  const year = new Date().getFullYear()

  const footerLinks = {
    [t('capabilities')]: [
      { name: t('sovereignIntelligence'), href: '#features' },
      { name: t('howItWorks'), href: '#how-it-works' },
      { name: t('sovereignRemote'), href: '#remote' },
      { name: t('whoItServes'), href: '#integrations' },
      { name: t('skillsLibrary'), href: '#developers' },
      { name: t('talkPlainly'), href: '#plain-talk' },
    ],
    [t('engagement')]: [
      { name: t('limitedEdition'), href: '#limited-edition' },
      { name: t('registerInterest'), href: '/order?engagement=interest' },
      { name: t('secureBuildSlot'), href: '/order?engagement=personal' },
      { name: t('prime'), href: '/order?engagement=board' },
      { name: t('buyerAccount'), href: '/account' },
    ],
    [t('company')]: [
      { name: t('whoItServes'), href: '#integrations' },
      { name: t('familyProgram'), href: '/family-beneficiary-program' },
      { name: t('support'), href: 'https://help.1human1ai.com/' },
      { name: t('enquiries'), href: 'mailto:hello@1human1ai.com' },
    ],
    [t('legal')]: [
      { name: t('whitepaper'), href: '/whitepaper' },
      { name: t('privacy'), href: '/privacy' },
      { name: t('terms'), href: '/terms' },
      { name: t('security'), href: '#security' },
    ],
  }

  const socialLinks = [
    { name: t('enquiries'), href: 'mailto:hello@1human1ai.com' },
    { name: t('support'), href: 'https://help.1human1ai.com/' },
  ]

  return (
    <footer className="relative border-t border-foreground/10">
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            <div className="col-span-2">
              <a href="#" className="mb-6 inline-flex items-center gap-2 transition-opacity hover:opacity-80">
                <CenturionLogo size="lg" variant="full" />
              </a>

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs">
                {t('tagline')}
              </p>

              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={`${title}-${link.name}`}>
                      {link.href.startsWith('/') ? (
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                        >
                          {link.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">{t('copyright', { year })}</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              {t('status')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
