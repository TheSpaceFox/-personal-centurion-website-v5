export type BuyerProfile = {
  email: string
  firstName: string
  lastName: string
  company: string
  phone: string
  locale: string
  preferredCurrency: string
  updatedAt: string
}

export const BUYER_PROFILE_KEY = 'centurion-v5-buyer-profile'

export function emptyProfile(email = ''): BuyerProfile {
  return {
    email,
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    locale: 'en',
    preferredCurrency: 'GBP',
    updatedAt: new Date().toISOString(),
  }
}

export function loadBuyerProfile(email?: string | null): BuyerProfile | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(BUYER_PROFILE_KEY)
    if (!raw) return email ? emptyProfile(email) : null
    const parsed = JSON.parse(raw) as BuyerProfile
    if (email && parsed.email && parsed.email !== email.toLowerCase()) {
      return emptyProfile(email)
    }
    return { ...emptyProfile(parsed.email), ...parsed }
  } catch {
    return email ? emptyProfile(email) : null
  }
}

export function saveBuyerProfile(profile: BuyerProfile): void {
  const next = {
    ...profile,
    email: profile.email.trim().toLowerCase(),
    updatedAt: new Date().toISOString(),
  }
  localStorage.setItem(BUYER_PROFILE_KEY, JSON.stringify(next))
}
