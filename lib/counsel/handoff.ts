import type { EngagementTier } from '@/lib/orders/types'

export interface CounselHandoff {
  ready: boolean
  engagement?: EngagementTier
  missions?: string[]
  roles?: string[]
  summary?: string
  exchangeCount?: number
  capturedAt: string
}

export function buildCounselHandoff(partial: Partial<CounselHandoff> & { ready?: boolean }): CounselHandoff {
  return {
    ready: Boolean(partial.ready),
    engagement: partial.engagement,
    missions: partial.missions,
    roles: partial.roles,
    summary: partial.summary,
    exchangeCount: partial.exchangeCount,
    capturedAt: partial.capturedAt || new Date().toISOString(),
  }
}
