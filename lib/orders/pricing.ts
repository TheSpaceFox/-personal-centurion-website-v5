import {
  ENGAGEMENT_TIERS,
  type PricingResult,
  type WizardState,
} from './types'

type PricingInput = Pick<WizardState, 'engagement' | 'quantity'>

export function formatGbpFromPence(pence: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(pence / 100)
}

export function calculatePricing(state: PricingInput): PricingResult {
  const tier = ENGAGEMENT_TIERS[state.engagement]
  const quantity = Math.min(
    Math.max(state.quantity || tier.minQuantity, tier.minQuantity),
    tier.maxQuantity,
  )

  if (tier.enquireOnly && tier.id === 'interest') {
    return {
      lineItems: [
        {
          productId: tier.id,
          name: tier.name,
          description: tier.description,
          quantity: 1,
          unitPriceGbp: 0,
          totalPriceGbp: 0,
        },
      ],
      total: 0,
      deposit: 0,
      balanceDue: 0,
      enquireOnly: true,
    }
  }

  const unit = tier.unitPrice
  const total = unit * quantity
  const deposit = tier.enquireOnly ? 0 : Math.round(total * 0.5)
  const balanceDue = total - deposit

  return {
    lineItems: [
      {
        productId: tier.id,
        name: tier.name,
        description: tier.description,
        quantity,
        unitPriceGbp: unit,
        totalPriceGbp: total,
      },
    ],
    total,
    deposit,
    balanceDue,
    enquireOnly: tier.enquireOnly,
  }
}
