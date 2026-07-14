import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

const DATA_DIR = path.join(process.cwd(), '.data')
const LEADS_FILE = path.join(DATA_DIR, 'leads.json')

type Lead = {
  id: string
  kind: 'interest' | 'limited-edition' | 'board' | 'general'
  name: string
  email: string
  note?: string
  edition?: string
  createdAt: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<Lead>
    if (!body.email || !body.name || !body.kind) {
      return NextResponse.json({ error: 'name, email, and kind are required' }, { status: 400 })
    }

    const lead: Lead = {
      id: randomUUID(),
      kind: body.kind,
      name: String(body.name).trim(),
      email: String(body.email).trim().toLowerCase(),
      note: body.note ? String(body.note).trim() : undefined,
      edition: body.edition ? String(body.edition).trim() : undefined,
      createdAt: new Date().toISOString(),
    }

    let leads: Lead[] = []
    try {
      leads = JSON.parse(await fs.readFile(LEADS_FILE, 'utf8')) as Lead[]
    } catch {
      leads = []
    }
    leads.unshift(lead)
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8')

    return NextResponse.json({ ok: true, id: lead.id })
  } catch {
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
  }
}
