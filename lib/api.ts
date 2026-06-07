import { supabase } from './supabase'
import type { Property, Suburb, Signal } from './data'

// ── Properties + scores + latest outcome ─────────────────────────────────────

export async function fetchProperties(suburb?: string): Promise<Property[]> {
  let query = supabase
    .from('properties')
    .select(`
      id, address, suburb, postcode, owner_name,
      tenure_years, owner_type, land_area, zoning,
      valuation_estimate, last_sale_price,
      scores ( score, signals ),
      outcomes ( status, notes, follow_up_date, created_at )
    `)

  if (suburb && suburb !== 'all') {
    query = query.eq('suburb', suburb)
  }

  const { data, error } = await query
  if (error) throw error

  return (data || [])
    .map((row: Record<string, unknown>) => mapRow(row))
    .filter((p): p is Property => p !== null)
    .sort((a, b) => b.score - a.score)
    .map((p, i) => ({ ...p, rank: i + 1 }))
}

export async function fetchSuburbs(): Promise<Suburb[]> {
  const { data, error } = await supabase
    .from('properties')
    .select('suburb, postcode')

  if (error) throw error

  const map = new Map<string, { count: number; postcode: string }>()
  for (const row of data || []) {
    const s = row.suburb as string
    if (!s) continue
    const existing = map.get(s)
    map.set(s, {
      count:    (existing?.count ?? 0) + 1,
      postcode: row.postcode as string || existing?.postcode || '',
    })
  }

  return Array.from(map.entries()).map(([name, { count, postcode }]) => ({
    name,
    postcode,
    propertyCount: count,
    isExclusive:   true,
  }))
}

export async function saveOutcome(
  propertyId: string,
  status: string,
  notes: string,
  followUpDate: string | null,
) {
  const { error } = await supabase.from('outcomes').insert({
    property_id:    propertyId,
    status,
    notes,
    follow_up_date: followUpDate || null,
  })
  if (error) throw error
}

// ── Row → Property mapping ───────────────────────────────────────────────────

function mapRow(row: Record<string, unknown>): Property | null {
  const scoreRows  = (row.scores  as Record<string, unknown>[] | null) || []
  const outcomeRows = (row.outcomes as Record<string, unknown>[] | null) || []

  const scoreRow = scoreRows[0] as { score: number; signals: unknown[] } | undefined

  // Pick the latest outcome by created_at
  const latestOutcome = outcomeRows
    .slice()
    .sort((a, b) =>
      new Date((b as { created_at: string }).created_at).getTime() -
      new Date((a as { created_at: string }).created_at).getTime()
    )[0] as { status: string; notes: string; follow_up_date: string | null; created_at: string } | undefined

  const score   = scoreRow?.score ?? 0
  const signals = mapSignals(scoreRow?.signals ?? [])

  const status = (latestOutcome?.status || 'NOT_CALLED') as Property['status']

  const pipelineStage: Property['pipelineStage'] =
    status === 'HOT'  ? 'APPRAISAL_BOOKED' :
    status === 'WARM' ? 'CONTACTED' :
    'NEW_LEAD'

  return {
    id:            row.id as string,
    rank:          0,
    address:       row.address as string,
    suburb:        row.suburb as string,
    postcode:      row.postcode as string || '',
    ownerName:     (row.owner_name as string) || 'Unknown Owner',
    score:         Math.round(score),
    signals,
    status,
    lastContact:   latestOutcome?.created_at
                     ? latestOutcome.created_at.slice(0, 10)
                     : null,
    notes:         latestOutcome?.notes || '',
    followUpDate:  latestOutcome?.follow_up_date || null,
    pipelineStage,
  }
}

function mapSignals(raw: unknown[]): Signal[] {
  if (!Array.isArray(raw)) return []
  return raw.map((s) => {
    const sig = s as { label?: string; points?: number; detail?: string }
    return {
      label:  sig.label  || '',
      points: sig.points || 0,
      detail: sig.detail || '',
    }
  })
}
