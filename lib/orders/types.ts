/** v5 catalogue — aligned with marketing pricing on the homepage. */

export type EngagementTier = 'interest' | 'personal' | 'pilot' | 'board'

export type OrderStatus =
  | 'quote'
  | 'deposit_paid'
  | 'soul_wizard_scheduled'
  | 'soul_wizard_complete'
  | 'embodiment'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export interface WizardState {
  engagement: EngagementTier
  quantity: number
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  city: string
  region: string
  notes: string
}

export interface LineItem {
  productId: string
  name: string
  description?: string
  quantity: number
  unitPriceGbp: number
  totalPriceGbp: number
}

export interface PricingResult {
  lineItems: LineItem[]
  total: number
  deposit: number
  balanceDue: number
  enquireOnly: boolean
}

export interface QuoteRecord {
  id: string
  status: OrderStatus
  engagement: EngagementTier
  quantity: number
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  city: string
  region: string
  notes: string
  totalGbp: number
  depositGbp: number
  balanceGbp: number
  lineItems: LineItem[]
  counselHandoff: Record<string, unknown> | null
  createdAt: string
  updatedAt: string
}

export const DEFAULT_WIZARD_STATE: WizardState = {
  engagement: 'personal',
  quantity: 1,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  city: '',
  region: '',
  notes: '',
}

export interface EngagementConfig {
  id: EngagementTier
  name: string
  shortLabel: string
  description: string
  /** Unit price in GBP pence. 0 = enquiry only. */
  unitPrice: number
  enquireOnly: boolean
  includes: string[]
  minQuantity: number
  maxQuantity: number
}

export const ENGAGEMENT_TIERS: Record<EngagementTier, EngagementConfig> = {
  interest: {
    id: 'interest',
    name: 'Register Interest',
    shortLabel: 'Interest',
    description: 'Join the verified buyer list — private enquiry, no commitment.',
    unitPrice: 0,
    enquireOnly: true,
    includes: [
      'Private, confidential enquiry',
      'Priority updates on upcoming build cycles',
      'Option to reserve a build slot later',
    ],
    minQuantity: 1,
    maxQuantity: 1,
  },
  personal: {
    id: 'personal',
    name: 'Secure a Build Slot',
    shortLabel: 'Personal',
    description: 'Your private Sovereign for the desk — AI Brain, Sovereign Remote, Soul Document & Mission Discovery.',
    unitPrice: 500_000, // £5,000
    enquireOnly: false,
    includes: [
      'Private Sovereign computer for the desk',
      'Sovereign AI Brain',
      'Sovereign Remote on iPhone',
      'Soul Document Process',
      'Personal Mission Discovery',
    ],
    minQuantity: 1,
    maxQuantity: 12,
  },
  pilot: {
    id: 'pilot',
    name: 'Prime Pilot',
    shortLabel: 'Pilot',
    description:
      'Walnut & copper Prime units — £7,500 each. Minimum order of three.',
    unitPrice: 750_000, // £7,500
    enquireOnly: false,
    includes: [
      'Walnut & copper Prime body',
      '£7,500 per unit',
      'Minimum order of three',
      'Sovereign AI Brain and Prime Remote',
      'Soul Document & Mission Discovery',
    ],
    minQuantity: 3,
    maxQuantity: 24,
  },
  board: {
    id: 'board',
    name: 'Prime Board',
    shortLabel: 'Board',
    description:
      'Marble & brass Prime units — £12,500 each. Minimum order of four.',
    unitPrice: 1_250_000, // £12,500
    enquireOnly: false,
    includes: [
      'Marble & brass Prime body',
      '£12,500 per unit',
      'Minimum order of four',
      'Board units that work together',
      'Prime Remote for iPhone',
    ],
    minQuantity: 4,
    maxQuantity: 24,
  },
}

export const WIZARD_DRAFT_KEY = 'centurion-v5-wizard-draft'
export const COUNSEL_HANDOFF_KEY = 'centurion-counsel-handoff-v1'
export const BUYER_SESSION_KEY = 'centurion-v5-buyer-email'
