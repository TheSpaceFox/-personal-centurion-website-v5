import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'
import {
  defaultLocale,
  isAppLocale,
  locales,
  resolveVisitorLocale,
} from './i18n/locales'

const handleI18nRouting = createMiddleware(routing)

function pathnameHasLocale(pathname: string): boolean {
  return locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value

  // First visit (no cookie, no locale prefix): pick language from browser,
  // then fall back to IP country, then UK. Currency follows the locale.
  if (!cookieLocale && !pathnameHasLocale(pathname)) {
    const locale = resolveVisitorLocale({
      acceptLanguage: request.headers.get('accept-language'),
      country: request.headers.get('x-vercel-ip-country'),
    })

    const url = request.nextUrl.clone()
    url.pathname =
      pathname === '/' ? `/${locale}` : `/${locale}${pathname}`

    const response = NextResponse.redirect(url)
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
    })
    return response
  }

  // Keep invalid cookies from sticking visitors on a bad locale
  if (cookieLocale && !isAppLocale(cookieLocale)) {
    const response = handleI18nRouting(request)
    response.cookies.set('NEXT_LOCALE', defaultLocale, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
    })
    return response
  }

  return handleI18nRouting(request)
}

export const config = {
  matcher: [
    '/',
    '/(de-DE|fr-FR|it-IT|es-ES|es-419|nl-NL|pt-PT|sv-SE|pl-PL|zh-HK|ja-JP|ko-KR|en-GB|en-AU|en-US)/:path*',
    '/((?!api|auth|_next|_vercel|.*\\..*).*)',
  ],
}
