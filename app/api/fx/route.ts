import { getGbpRates } from '@/lib/money'
import { NextResponse } from 'next/server'

export const revalidate = 86_400

export async function GET() {
  const snapshot = await getGbpRates()
  return NextResponse.json(snapshot)
}
