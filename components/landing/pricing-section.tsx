'use client'

import { ArrowRight, Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { PricingHardwareArt } from '@/components/landing/pricing-hardware-art'
import { BETA_DISCOUNT_PENCE, BETA_OFFER, isJuly2026BetaActive } from '@/lib/orders/beta'
import { DISPLAY_GBP_PENCE, HOLD_GBP_PENCE } from '@/lib/money/constants'
import { useDisplayMoney } from '@/hooks/use-display-money'

const betaActive = isJuly2026BetaActive()

const personalFeatures = [
  'Your private Sovereign computer for the desk — hardware you own',
  'Sovereign AI Brain, ready for serious mission work',
  'Sovereign Remote on iPhone — yours immediately after the hold',
  'Buy once → free lifetime updates for the Linux brain and iPhone Remote',
  'No monthly fees — unlike public AI subscriptions',
  'Weekly Sunday night AI Owners training session',
  'Soul Document Process included',
  'Personal Mission Discovery included',
  'Collaborate with other Sovereigns when your work demands it',
  'No subscription trap. No rented loyalty. Yours.',
]

const pilotFeatures = [
  'Walnut & copper Prime body — the Pilot finish',
  '£7,500 per unit — priced individually',
  'Minimum order of three units',
  'Sovereign AI Brain, ready for serious mission work',
  'Prime Remote on iPhone — yours after the hold',
  'Buy once → free lifetime updates for brain and Remote',
  'No monthly SaaS fees for the Centurion platform',
  'Weekly Sunday night AI Owners training',
  'Soul Document Process included',
  'Personal Mission Discovery included',
  'Collaborate across your Pilot units when work demands it',
]

const primeFeatures = [
  'Marble & brass Prime body — the Board finish',
  '£12,500 per unit — priced individually',
  'Minimum order of four units',
  'A Prime for every director — not one shared toy',
  'Board units that work together when stakes are high',
  'Prime Remote for iPhone',
  'Soul Document & Mission Discovery for each member',
  'Lifetime updates for every board unit and Remote',
  'No monthly SaaS fees for the Centurion platform itself',
  'Sunday night AI Owners training for directors who want the craft',
  'Built for companies that refuse public chat with their strategy',
]

export function PricingSection() {
  const t = useTranslations('pricing')
  const { format } = useDisplayMoney()
  const hold = format(HOLD_GBP_PENCE)
  const personalPrice = format(
    betaActive ? DISPLAY_GBP_PENCE.personalBeta : DISPLAY_GBP_PENCE.personal,
  )
  const personalList = format(DISPLAY_GBP_PENCE.personal)
  const pilotPrice = format(DISPLAY_GBP_PENCE.pilot)
  const boardPrice = format(DISPLAY_GBP_PENCE.board)
  const discount = format(BETA_DISCOUNT_PENCE)

  const securingSteps = [
    { title: t('stepPick'), detail: t('stepPickDetail') },
    { title: t('stepHold', { hold }), detail: t('stepHoldDetail') },
    { title: t('stepRemote'), detail: t('stepRemoteDetail') },
    { title: t('stepMission'), detail: t('stepMissionDetail') },
    { title: t('stepSoul'), detail: t('stepSoulDetail') },
    { title: t('stepBuild'), detail: t('stepBuildDetail') },
    { title: t('stepReceive'), detail: t('stepReceiveDetail') },
  ]

  const plans = [
    {
      id: 'personal',
      name: t('sovereignName'),
      description: betaActive ? t('sovereignDescBeta') : t('sovereignDesc'),
      price: personalPrice,
      originalPrice: betaActive ? personalList : undefined,
      priceNote: betaActive
        ? t('sovereignNoteBeta', { hold })
        : t('sovereignNote', { hold }),
      features: personalFeatures,
      cta: betaActive
        ? t('sovereignCtaBeta', { price: personalPrice })
        : t('sovereignCta'),
      popular: true,
      beta: betaActive,
      href: '/order?engagement=personal' as const,
    },
    {
      id: 'pilot',
      name: t('pilotName'),
      description: t('pilotDesc'),
      price: pilotPrice,
      priceNote: t('pilotNote', { hold }),
      minOrder: t('pilotMinOrder'),
      features: pilotFeatures,
      cta: t('pilotCta'),
      popular: false,
      href: '/order?engagement=pilot' as const,
    },
    {
      id: 'board',
      name: t('primeName'),
      description: t('primeDesc'),
      price: boardPrice,
      priceNote: t('primeNote', { hold }),
      minOrder: t('primeMinOrder'),
      features: primeFeatures,
      cta: t('primeCta'),
      popular: false,
      href: '/order?engagement=board' as const,
    },
  ]

  return (
    <section id="pricing" className="relative border-t border-foreground/10 py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 max-w-3xl">
          <span className="mb-6 block font-mono text-xs tracking-widest text-muted-foreground uppercase">
            {t('eyebrow')}
          </span>
          <h2 className="mb-6 font-display text-5xl tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {t('titleLine1')}
            <br />
            <span className="text-stroke">{t('titleLine2')}</span>
          </h2>
          <p className="max-w-xl text-lg text-muted-foreground">{t('lead', { hold })}</p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {t('leadExtra')}
          </p>
        </div>

        <div className="mb-20">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mb-3 block font-mono text-xs tracking-widest text-muted-foreground uppercase">
                {t('howEyebrow')}
              </span>
              <h3 className="font-display text-2xl tracking-tight text-foreground sm:text-3xl">
                {t('howTitle')}
              </h3>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">{t('howLead')}</p>
          </div>

          <div className="grid gap-px border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
            {securingSteps.map((step, index) => (
              <div key={step.title} className="bg-background p-6 lg:p-8">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h4 className="mt-3 font-display text-xl tracking-tight text-foreground">
                  {step.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {betaActive && (
          <div className="mb-8 border border-foreground/15 bg-[#0a0a0a] px-6 py-6 text-[#f4f1ec] sm:px-8 lg:px-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <span className="mb-3 block font-mono text-xs tracking-widest text-[#f4f1ec]/70 uppercase">
                  {BETA_OFFER.name} · {BETA_OFFER.endsLabel}
                </span>
                <h3 className="font-display text-3xl tracking-tight sm:text-4xl">
                  {discount} off your first Sovereign
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#f4f1ec]/75">
                  Limited to the first Sovereign purchased during the July 2026 Beta. Additional
                  units are at the full {personalList}. Hardware, lifetime updates, Sunday AI
                  Owners training, and Personal Mission Discovery — same full package, private
                  Beta pricing.
                </p>
              </div>
              <div className="shrink-0 text-left lg:text-right">
                <p className="font-mono text-xs tracking-widest text-[#f4f1ec]/55 uppercase">
                  {t('fromLabel')}
                </p>
                <p className="mt-1 font-display text-4xl tracking-tight">
                  <span className="mr-3 text-2xl text-[#f4f1ec]/45 line-through decoration-1">
                    {personalList}
                  </span>
                  {personalPrice}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-px bg-foreground/10 md:grid-cols-3">
          {plans.map((plan, idx) => {
            const isBeta = Boolean(plan.beta)
            return (
              <div
                key={plan.id}
                className={`relative p-8 lg:p-12 ${
                  isBeta
                    ? 'bg-[#0a0a0a] text-[#f4f1ec] border-2 border-foreground md:-my-5 md:py-14 lg:py-16'
                    : plan.popular
                      ? 'bg-background border-2 border-foreground md:-my-4 md:py-12 lg:py-16'
                      : 'bg-background'
                }`}
              >
                {(isBeta || plan.popular) && (
                  <span
                    className={`absolute -top-3 left-8 px-3 py-1 font-mono text-xs tracking-widest uppercase ${
                      isBeta
                        ? 'bg-[#f4f1ec] text-[#0a0a0a]'
                        : 'bg-foreground text-primary-foreground'
                    }`}
                  >
                    {isBeta
                      ? t('betaBadge', { discount })
                      : t('recommendedBadge')}
                  </span>
                )}

                <div className="mb-8">
                  <span
                    className={`font-mono text-xs ${
                      isBeta ? 'text-[#f4f1ec]/55' : 'text-muted-foreground'
                    }`}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3
                    className={`mt-2 font-display text-3xl ${
                      isBeta ? 'text-[#f4f1ec]' : 'text-foreground'
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`mt-2 text-sm ${
                      isBeta ? 'text-[#f4f1ec]/70' : 'text-muted-foreground'
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                <div
                  className={`mb-8 border-b pb-8 ${
                    isBeta ? 'border-white/10' : 'border-foreground/10'
                  }`}
                >
                  {plan.originalPrice && (
                    <p
                      className={`mb-1 font-display text-xl line-through decoration-1 ${
                        isBeta ? 'text-[#f4f1ec]/40' : 'text-muted-foreground'
                      }`}
                    >
                      {plan.originalPrice}
                    </p>
                  )}
                  <div
                    className={`font-display text-4xl lg:text-5xl ${
                      isBeta ? 'text-[#f4f1ec]' : 'text-foreground'
                    }`}
                  >
                    {plan.price}
                  </div>
                  {'minOrder' in plan && plan.minOrder && (
                    <p
                      className={`mt-1 font-mono text-[11px] tracking-wide ${
                        isBeta ? 'text-[#f4f1ec]/55' : 'text-muted-foreground'
                      }`}
                    >
                      {plan.minOrder}
                    </p>
                  )}
                  <p
                    className={`mt-2 text-sm ${
                      isBeta ? 'text-[#f4f1ec]/65' : 'text-muted-foreground'
                    }`}
                  >
                    {plan.priceNote}
                  </p>
                  {isBeta && (
                    <p className="mt-4 border-l border-[#f4f1ec]/25 pl-3 text-xs leading-relaxed text-[#f4f1ec]/70">
                      {t('betaOnlyNote', { price: personalList })}
                    </p>
                  )}
                </div>

                <PricingHardwareArt
                  planId={plan.id as 'personal' | 'pilot' | 'board'}
                  inverted={isBeta}
                  className={`mb-8 border-b pb-8 ${
                    isBeta ? 'border-white/10' : 'border-foreground/10'
                  }`}
                />

                <ul className="mb-10 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className={`mt-0.5 size-4 shrink-0 ${
                          isBeta ? 'text-[#f4f1ec]' : 'text-foreground'
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          isBeta ? 'text-[#f4f1ec]/75' : 'text-muted-foreground'
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`group flex w-full items-center justify-center gap-2 py-4 text-sm font-medium transition-all ${
                    isBeta
                      ? 'bg-[#f4f1ec] text-[#0a0a0a] hover:bg-white'
                      : plan.popular
                        ? 'bg-foreground text-primary-foreground hover:bg-foreground/90'
                        : 'border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            )
          })}
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          {t('footerNote')}{' '}
          <a
            href={`mailto:hello@1human1ai.com?subject=${encodeURIComponent(t('enquireEmailSubject'))}`}
            className="underline underline-offset-4 transition-colors hover:text-foreground"
          >
            {t('talkNow')}
          </a>
        </p>
      </div>
    </section>
  )
}
