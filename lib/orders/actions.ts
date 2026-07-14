'use server'

import { createQuote, listQuotesByEmail, getQuoteById } from './store'
import { DEFAULT_WIZARD_STATE, type WizardState } from './types'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function submitQuoteAction(input: {
  state: WizardState
  counselHandoff?: Record<string, unknown> | null
}) {
  const state = { ...DEFAULT_WIZARD_STATE, ...input.state }
  if (!state.firstName.trim() || !state.lastName.trim()) {
    return { ok: false as const, error: 'Please provide your name.' }
  }
  if (!isValidEmail(state.email)) {
    return { ok: false as const, error: 'Please provide a valid email address.' }
  }

  const quote = await createQuote({
    state,
    counselHandoff: input.counselHandoff ?? null,
  })

  return {
    ok: true as const,
    quote: {
      id: quote.id,
      engagement: quote.engagement,
      status: quote.status,
      totalGbp: quote.totalGbp,
      depositGbp: quote.depositGbp,
      createdAt: quote.createdAt,
    },
  }
}

export async function fetchMyQuotesAction(email: string) {
  if (!isValidEmail(email)) {
    return { ok: false as const, error: 'Invalid email.', quotes: [] }
  }
  const quotes = await listQuotesByEmail(email)
  return { ok: true as const, quotes }
}

export async function fetchQuoteAction(id: string) {
  const quote = await getQuoteById(id)
  if (!quote) return { ok: false as const, quote: null }
  return { ok: true as const, quote }
}
