'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import {
  BUYER_SESSION_KEY,
  COUNSEL_HANDOFF_KEY,
  DEFAULT_WIZARD_STATE,
  WIZARD_DRAFT_KEY,
  type WizardState,
  type EngagementTier,
} from '@/lib/orders/types'
import type { CounselHandoff } from '@/lib/counsel/handoff'
import { loadBuyerProfile } from '@/lib/auth/buyer-profile'

const TOTAL_STEPS = 3

function clampStep(n: number) {
  return Math.min(Math.max(1, n), TOTAL_STEPS)
}

function detailsComplete(state: WizardState) {
  return Boolean(
    state.firstName.trim() &&
      state.lastName.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email),
  )
}

/** Step access: 1 always; 2 needs engagement; 3 needs engagement + contact details. */
export function canAccessWizardStep(target: number, state: WizardState): boolean {
  const n = clampStep(target)
  if (n <= 1) return true
  if (!state.engagement) return false
  if (n === 2) return true
  return detailsComplete(state)
}

interface WizardContextValue {
  step: number
  state: WizardState
  setState: (partial: Partial<WizardState>) => void
  next: () => void
  back: () => void
  goToStep: (n: number) => void
  canAccessStep: (n: number) => boolean
  totalSteps: number
  counselHandoff: CounselHandoff | null
  clearCounselHandoff: () => void
}

const WizardContext = createContext<WizardContextValue | null>(null)

export function WizardProvider({
  children,
  initialEngagement,
  resume,
}: {
  children: ReactNode
  initialEngagement?: EngagementTier
  resume?: boolean
}) {
  const [step, setStep] = useState(1)
  const [state, setStateInternal] = useState<WizardState>({
    ...DEFAULT_WIZARD_STATE,
    ...(initialEngagement ? { engagement: initialEngagement } : {}),
  })
  const [hydrated, setHydrated] = useState(false)
  const [counselHandoff, setCounselHandoff] = useState<CounselHandoff | null>(null)

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(WIZARD_DRAFT_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as {
          step?: number
          state?: Partial<WizardState>
        }
        if (parsed.state) {
          setStateInternal({
            ...DEFAULT_WIZARD_STATE,
            ...parsed.state,
            ...(initialEngagement ? { engagement: initialEngagement } : {}),
          })
        }
        if (parsed.step && !resume) setStep(clampStep(parsed.step))
        if (resume) {
          const merged = {
            ...DEFAULT_WIZARD_STATE,
            ...(parsed.state ?? {}),
            ...(initialEngagement ? { engagement: initialEngagement } : {}),
          }
          setStep(canAccessWizardStep(TOTAL_STEPS, merged) ? TOTAL_STEPS : 1)
        }
      }

      const handoffRaw = sessionStorage.getItem(COUNSEL_HANDOFF_KEY)
      if (handoffRaw) {
        const handoff = JSON.parse(handoffRaw) as CounselHandoff
        setCounselHandoff(handoff)
        if (handoff.engagement) {
          setStateInternal((s) => ({ ...s, engagement: handoff.engagement! }))
        }
        if (handoff.summary) {
          setStateInternal((s) => ({
            ...s,
            notes: s.notes || `Counsel context: ${handoff.summary}`,
          }))
        }
      }

      const email = localStorage.getItem(BUYER_SESSION_KEY)
      const profile = loadBuyerProfile(email)
      if (profile) {
        setStateInternal((s) => ({
          ...s,
          firstName: s.firstName || profile.firstName,
          lastName: s.lastName || profile.lastName,
          email: s.email || profile.email,
          phone: s.phone || profile.phone,
          company: s.company || profile.company,
        }))
      }
    } catch {
      // ignore corrupt draft
    }
    setHydrated(true)
  }, [initialEngagement, resume])

  useEffect(() => {
    if (!hydrated) return
    sessionStorage.setItem(WIZARD_DRAFT_KEY, JSON.stringify({ step, state }))
  }, [step, state, hydrated])

  const setState = useCallback((partial: Partial<WizardState>) => {
    setStateInternal((s) => ({ ...s, ...partial }))
  }, [])

  const clearCounselHandoff = useCallback(() => {
    sessionStorage.removeItem(COUNSEL_HANDOFF_KEY)
    setCounselHandoff(null)
  }, [])

  const canAccessStep = useCallback(
    (n: number) => canAccessWizardStep(n, state),
    [state],
  )

  const next = useCallback(() => {
    setStep((s) => {
      const target = clampStep(s + 1)
      return canAccessWizardStep(target, state) ? target : s
    })
  }, [state])

  const back = useCallback(() => setStep((s) => clampStep(s - 1)), [])

  const goToStep = useCallback(
    (n: number) => {
      const target = clampStep(n)
      if (target <= step || canAccessWizardStep(target, state)) {
        setStep(target)
      }
    },
    [state, step],
  )

  return (
    <WizardContext.Provider
      value={{
        step,
        state,
        setState,
        next,
        back,
        goToStep,
        canAccessStep,
        totalSteps: TOTAL_STEPS,
        counselHandoff,
        clearCounselHandoff,
      }}
    >
      {children}
    </WizardContext.Provider>
  )
}

export function useWizard() {
  const ctx = useContext(WizardContext)
  if (!ctx) throw new Error('useWizard must be used within WizardProvider')
  return ctx
}

export function clearWizardDraft() {
  sessionStorage.removeItem(WIZARD_DRAFT_KEY)
}
