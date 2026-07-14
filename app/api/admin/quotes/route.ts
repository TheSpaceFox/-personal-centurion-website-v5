import { NextRequest, NextResponse } from 'next/server'
import { listAllQuotes } from '@/lib/orders/store'

export async function GET(request: NextRequest) {
  const expected = process.env.ADMIN_STAFF_TOKEN
  if (!expected) {
    return NextResponse.json(
      { error: 'ADMIN_STAFF_TOKEN is not configured' },
      { status: 503 },
    )
  }

  const auth = request.headers.get('authorization') || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  if (token !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const quotes = await listAllQuotes()
  return NextResponse.json({ quotes })
}
