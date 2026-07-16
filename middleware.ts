import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Skip API, Next internals, and static files
  matcher: ['/', '/(de-DE|fr-FR|it-IT|es-ES|es-419|nl-NL|pt-PT|sv-SE|pl-PL|zh-HK|ja-JP|ko-KR|en-GB|en-AU|en-US)/:path*', '/((?!api|auth|_next|_vercel|.*\\..*).*)'],
}
