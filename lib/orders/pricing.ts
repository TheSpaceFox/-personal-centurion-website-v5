import { BETA_DISCOUNT_PENCE, isJuly2026BetaActive } from './beta'
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
  const betaFirstPersonal =
    tier.id === 'personal' && quantity >= 1 && isJuly2026BetaActive()

  if (betaFirstPersonal) {
    const betaUnit = Math.max(0, unit - BETA_DISCOUNT_PENCE)
    const lineItems =
      quantity === 1
        ? [
            {
              productId: tier.id,
              name: `${tier.name} · July 2026 Beta`,
              description: 'First Personal Centurion during July 2026 Beta — £750 off',
              quantity: 1,
              unitPriceGbp: betaUnit,
              totalPriceGbp: betaUnit,
            },
          ]
        : [
            {
              productId: `${tier.id}-beta`,
              name: `${tier.name} · July 2026 Beta`,
              description: 'First unit — £750 Beta discount',
              quantity: 1,
              unitPriceGbp: betaUnit,
              totalPriceGbp: betaUnit,
            },
            {
              productId: tier.id,
              name: tier.name,
              description: tier.description,
              quantity: quantity - 1,
              unitPriceGbp: unit,
              totalPriceGbp: unit * (quantity - 1),
            },
          ]
    const total = lineItems.reduce((sum, item) => sum + item.totalPriceGbp, 0)
    const deposit = tier.enquireOnly ? 0 : Math.round(total * 0.5)
    return {
      lineItems,
      total,
      deposit,
      balanceDue: total - deposit,
      enquireOnly: tier.enquireOnly,
    }
  }

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
