export const COMPANY = {
  name: 'Personal Centurion',
  legalName: 'Centurion AI Ltd',
  email: 'hello@personal-centurion.com',
  phone: '',
  number: '',
  helpUrl: 'https://help.personal-centurion.com',
  productApiHost: 'https://www.personal-centurion.com',
} as const

/** Customer-facing platform generation — lockstep with OS / Desktop / iPhone. */
export const SITE_VERSION = '5.0.0'

export const SUPPORT_URL = COMPANY.helpUrl
export const ENQUIRY_EMAIL = COMPANY.email
