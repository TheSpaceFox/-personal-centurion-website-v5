export const COMPANY = {
  /** Brand name shown after the logo */
  name: 'Centurion',
  legalName: 'Centurion Limited',
  tagline: '1 Human 1 AI',
  email: 'hello@1human1ai.com',
  phone: '',
  number: '',
  helpUrl: 'https://help.1human1ai.com',
  productApiHost: 'https://www.1human1ai.com',
} as const

/** Customer-facing products (not the brand wordmark). */
export const PRODUCTS = {
  sovereign: 'Sovereign',
  primePilot: 'Prime Pilot',
  prime: 'Prime Board',
} as const

/** Customer-facing platform generation — lockstep with OS / Desktop / iPhone. */
export const SITE_VERSION = '5.0.0'

export const SUPPORT_URL = COMPANY.helpUrl
export const ENQUIRY_EMAIL = COMPANY.email
