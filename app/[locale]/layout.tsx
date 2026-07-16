import React from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono, Noto_Sans_TC, Noto_Sans_JP, Noto_Sans_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { isAppLocale, localeMeta, locales, type AppLocale } from '@/i18n/locales'
import '../globals.css'

const instrumentSans = Instrument_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-instrument',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  variable: '--font-instrument-serif',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-jetbrains',
})

const notoTc = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-tc',
  preload: false,
})

const notoJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-jp',
  preload: false,
})

const notoKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-kr',
  preload: false,
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale = (isAppLocale(raw) ? raw : 'en-GB') as AppLocale
  const messages = (await import(`../../messages/${locale === 'en-AU' || locale === 'en-US' ? 'en-GB' : locale}.json`)).default as {
    meta: { title: string; description: string }
  }
  return {
    title: messages.meta.title,
    description: messages.meta.description,
    icons: {
      icon: [
        { url: '/icon.svg', type: 'image/svg+xml' },
        {
          url: '/icon-light.png',
          type: 'image/png',
          media: '(prefers-color-scheme: light)',
        },
        {
          url: '/icon-dark.png',
          type: 'image/png',
          media: '(prefers-color-scheme: dark)',
        },
        { url: '/favicon.ico', sizes: 'any' },
      ],
      apple: '/apple-icon.png',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isAppLocale(raw)) notFound()
  const locale = raw as AppLocale
  setRequestLocale(locale)
  const messages = await getMessages()
  const meta = localeMeta[locale]

  return (
    <html lang={meta.htmlLang} suppressHydrationWarning>
      <body
        className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${notoTc.variable} ${notoJp.variable} ${notoKr.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
