'use client'

import { useTranslations } from 'next-intl'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const FAQ_IDS = ['1', '2', '3', '4', '5', '6', '7', '8'] as const

export function SecurityFaqAccordion() {
  const t = useTranslations('securityPage')

  return (
    <Accordion type="single" collapsible className="w-full border border-foreground/10">
      {FAQ_IDS.map((id) => (
        <AccordionItem key={id} value={`faq-${id}`} className="px-4 sm:px-6">
          <AccordionTrigger className="font-display text-base text-foreground hover:no-underline sm:text-lg">
            {t(`faq${id}Q`)}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t(`faq${id}A`)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
