import { randomUUID } from 'crypto'
import { promises as fs } from 'fs'
import path from 'path'
import type { QuoteRecord, WizardState } from './types'
import { calculatePricing } from './pricing'

const DATA_DIR = path.join(process.cwd(), '.data')
const QUOTES_FILE = path.join(DATA_DIR, 'quotes.json')

async function ensureStore(): Promise<QuoteRecord[]> {
  try {
    const raw = await fs.readFile(QUOTES_FILE, 'utf8')
    return JSON.parse(raw) as QuoteRecord[]
  } catch {
    return []
  }
}

async function writeStore(quotes: QuoteRecord[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(QUOTES_FILE, JSON.stringify(quotes, null, 2), 'utf8')
}

export async function createQuote(input: {
  state: WizardState
  counselHandoff?: Record<string, unknown> | null
}): Promise<QuoteRecord> {
  const pricing = calculatePricing(input.state)
  const now = new Date().toISOString()
  const quote: QuoteRecord = {
    id: randomUUID(),
    status: 'quote',
    engagement: input.state.engagement,
    quantity: input.state.quantity,
    firstName: input.state.firstName.trim(),
    lastName: input.state.lastName.trim(),
    email: input.state.email.trim().toLowerCase(),
    phone: input.state.phone.trim(),
    company: input.state.company.trim(),
    city: input.state.city.trim(),
    region: input.state.region.trim(),
    notes: input.state.notes.trim(),
    totalGbp: pricing.total,
    depositGbp: pricing.deposit,
    balanceGbp: pricing.balanceDue,
    lineItems: pricing.lineItems,
    counselHandoff: input.counselHandoff ?? null,
    createdAt: now,
    updatedAt: now,
  }

  const quotes = await ensureStore()
  quotes.unshift(quote)
  await writeStore(quotes)

  // Best-effort ops notification — never blocks quote creation.
  const notifyTo = process.env.ORDER_NOTIFY_EMAIL || process.env.RESEND_TO
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey && notifyTo) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'Personal Centurion <orders@personal-centurion.com>',
          to: [notifyTo],
          subject: `New ${quote.engagement} quote — ${quote.firstName} ${quote.lastName}`,
          text: [
            `Quote ${quote.id}`,
            `Engagement: ${quote.engagement}`,
            `Qty: ${quote.quantity}`,
            `Email: ${quote.email}`,
            `Company: ${quote.company || '—'}`,
            `Total (pence): ${quote.totalGbp}`,
            `Deposit (pence): ${quote.depositGbp}`,
            `Notes: ${quote.notes || '—'}`,
          ].join('\n'),
        }),
      })
    } catch {
      // ignore mail failures
    }
  }

  return quote
}

export async function listQuotesByEmail(email: string): Promise<QuoteRecord[]> {
  const normalized = email.trim().toLowerCase()
  const quotes = await ensureStore()
  return quotes.filter((q) => q.email === normalized)
}

export async function getQuoteById(id: string): Promise<QuoteRecord | null> {
  const quotes = await ensureStore()
  return quotes.find((q) => q.id === id) ?? null
}

export async function listAllQuotes(): Promise<QuoteRecord[]> {
  return ensureStore()
}
