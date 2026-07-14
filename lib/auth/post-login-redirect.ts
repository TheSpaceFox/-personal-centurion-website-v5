/** Resolve where to send the buyer after auth. Prefers order resume, then explicit return, then account. */
export function resolvePostLoginRedirect(options: {
  returnUrl?: string | null
  hasDraftOrder?: boolean
}): string {
  const raw = options.returnUrl?.trim() || ''
  if (raw.startsWith('/order')) {
    const joiner = raw.includes('?') ? '&' : '?'
    return raw.includes('resume=') ? raw : `${raw}${joiner}resume=1`
  }
  if (raw.startsWith('/account')) return raw
  if (options.hasDraftOrder) return '/order?resume=1'
  return '/account'
}
