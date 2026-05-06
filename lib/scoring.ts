// Jenkins Homebuyers — two-stage lead scoring.
// Stage 1 (contact captured) fires `LeadEarly` (track-only).
// Stage 2 (deep qualification) fires `Lead` (Meta optimization event)
//   with weighted value, OR `LeadLowIntent` if score is too low / soft-fail.

export type Stage1Data = {
  address: string
  state?: string
  county?: string
  city?: string
  isLegalOwner: string  // yes-owner | yes-family | no
  listedOnMarket: string  // not-listed | listed-realtor | listed-fsbo
  firstName: string
  lastName: string
  email: string
  phone: string
}

export type Stage2Data = {
  propertyType: string  // single-family | multi-family | condo-townhouse | mobile-home | land | other
  timeline: string  // asap | 30-days | 60-days | 90-days | flexible
  askingPrice: string  // under-150k | 150k-250k | 250k-350k | 350k-500k | over-500k | flexible
  condition: string  // distressed | poor | fair | good | excellent
  reason: string  // foreclosure | behind-payments | inherited | divorce | relocation | downsizing | repairs | tired-landlord | other
}

// Middle TN asking-price tiers
// Tuned for Davidson / Rutherford / Wilson / Sumner / Maury wholesale activity.
export const ASKING_PRICE_OPTIONS = [
  { id: 'under-150k', label: 'Under $150,000' },
  { id: '150k-250k', label: '$150,000 – $250,000' },
  { id: '250k-350k', label: '$250,000 – $350,000' },
  { id: '350k-500k', label: '$350,000 – $500,000' },
  { id: 'over-500k', label: 'Over $500,000' },
]

// --- Score weights ---
const SCORE_TIMELINE: Record<string, number> = {
  'asap': 5,
  '30-days': 4,
  '60-days': 3,
  '90-days': 2,
  'flexible': 1,
}

const SCORE_ASKING_PRICE: Record<string, number> = {
  'under-150k': 3,
  '150k-250k': 3,
  '250k-350k': 2,
  '350k-500k': 1,
  'over-500k': 0,
}

const SCORE_CONDITION: Record<string, number> = {
  'distressed': 3,
  'poor': 3,
  'fair': 2,
  'good': 1,
  'excellent': 0,
}

const SCORE_REASON: Record<string, number> = {
  'foreclosure': 3,
  'behind-payments': 3,
  'inherited': 3,
  'tired-landlord': 3,
  'divorce': 2,
  'relocation': 2,
  'repairs': 2,
  'downsizing': 1,
  'other': 1,
}

// --- Hard property filter (soft-fail = LeadLowIntent, no Meta optimization) ---
export function isPropertyTypeAccepted(propertyType: string): boolean {
  return propertyType === 'single-family' || propertyType === 'multi-family'
}

// --- Score calculator (0–14) ---
export function calculateLeadScore(d: Stage2Data): number {
  return (SCORE_TIMELINE[d.timeline] || 0)
       + (SCORE_ASKING_PRICE[d.askingPrice] || 0)
       + (SCORE_CONDITION[d.condition] || 0)
       + (SCORE_REASON[d.reason] || 0)
}

// --- Quality tier + Meta value mapping ---
export type LeadQuality = 'premium' | 'standard' | 'low' | 'soft-fail'

export function getLeadQuality(d: Stage2Data): LeadQuality {
  if (!isPropertyTypeAccepted(d.propertyType)) return 'soft-fail'
  const score = calculateLeadScore(d)
  if (score >= 9) return 'premium'
  if (score >= 6) return 'standard'
  if (score >= 3) return 'low'
  return 'soft-fail'
}

export function getMetaEventConfig(d: Stage2Data): {
  eventName: 'Lead' | 'LeadLowIntent'
  value: number
  quality: LeadQuality
  qualified: boolean
} {
  const quality = getLeadQuality(d)
  const score = calculateLeadScore(d)
  switch (quality) {
    case 'premium':  return { eventName: 'Lead',          value: 250, quality, qualified: true  }
    case 'standard': return { eventName: 'Lead',          value: 125, quality, qualified: true  }
    case 'low':      return { eventName: 'Lead',          value: 50,  quality, qualified: true  }
    case 'soft-fail':return { eventName: 'LeadLowIntent', value: 0,   quality, qualified: false }
  }
}

// Helper: deterministic event_id for Meta dedup (Pixel + CAPI must match)
export function makeEventId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}
