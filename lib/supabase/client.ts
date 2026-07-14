'use client'

import { createBrowserClient, type SupabaseClient } from '@supabase/ssr'
import { getSupabaseEnv } from './env'

let browserClient: SupabaseClient | null = null

export function createClient(): SupabaseClient | null {
  const env = getSupabaseEnv()
  if (!env) return null
  if (!browserClient) {
    browserClient = createBrowserClient(env.url, env.anonKey)
  }
  return browserClient
}
