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
    description: 'Your private Centurion for the desk — AI Brain, iPhone Remote, Soul Document & Mission Discovery.',
    unitPrice: 500_000, // £5,000
    enquireOnly: false,
    includes: [
      'Private Centurion computer for the desk',
      'Personal Centurion AI Brain',
      'CenturionAI Remote on iPhone',
      'Soul Document Process',
      'Personal Mission Discovery',
    ],
    minQuantity: 1,
    maxQuantity: 12,
  },
  pilot: {
    id: 'pilot',
    name: 'Start a Pilot Program',
    shortLabel: 'Pilot',
    description: 'Three Personal Centurions plus a guided proof of concept — white-glove programme lead through final readout.',
    unitPrice: 1_500_000, // £15,000
    enquireOnly: false,
    includes: [
      'Three Personal Centurions',
      'Guided Proof of Concept / Pilot',
      'Dedicated programme lead',
      'Documented outcome and next-step brief',
    ],
    minQuantity: 3,
    maxQuantity: 3,
  },
  board: {
    id: 'board',
    name: 'Centurion Board',
    shortLabel: 'Board',
    description: 'A Personal Centurion for every board member — from £45,000+ depending on board size.',
    unitPrice: 4_500_000, // £45,000 floor display; final quote by enquiry
    enquireOnly: true,
    includes: [
      'One Personal Centurion per board member',
      'Board Centurions can work together',
      'Chairman receives the most senior Centurion',
      'Special Chairman Remote for iPhone',
    ],
    minQuantity: 3,
    maxQuantity: 24,
  },
}

export const WIZARD_DRAFT_KEY = 'centurion-v5-wizard-draft'
export const COUNSEL_HANDOFF_KEY = 'centurion-counsel-handoff-v1'
export const BUYER_SESSION_KEY = 'centurion-v5-buyer-email'
