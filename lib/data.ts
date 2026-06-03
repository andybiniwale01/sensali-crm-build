// Sensali Mock Data - Australian Properties

export interface Signal {
  label: string
  points: number
  detail: string
}

export interface Property {
  id: string
  rank: number
  address: string
  suburb: string
  postcode: string
  ownerName: string
  score: number
  signals: Signal[]
  status: 'HOT' | 'WARM' | 'COLD' | 'NOT_CALLED' | 'DNC'
  lastContact: string | null
  notes: string
  followUpDate: string | null
  pipelineStage: 'NEW_LEAD' | 'CONTACTED' | 'APPRAISAL_BOOKED' | 'LISTING_WON'
}

export interface Suburb {
  name: string
  postcode: string
  propertyCount: number
  isExclusive: boolean
}

export const mockSuburbs: Suburb[] = [
  { name: 'Karrinyup', postcode: '6018', propertyCount: 847, isExclusive: true },
  { name: 'Scarborough', postcode: '6019', propertyCount: 1243, isExclusive: true },
  { name: 'Doubleview', postcode: '6018', propertyCount: 652, isExclusive: true },
  { name: 'Innaloo', postcode: '6018', propertyCount: 521, isExclusive: false },
  { name: 'Trigg', postcode: '6029', propertyCount: 412, isExclusive: true },
]

export const mockProperties: Property[] = [
  {
    id: '1',
    rank: 1,
    address: '14 Doreen Street',
    suburb: 'Karrinyup',
    postcode: '6018',
    ownerName: 'Margaret & David Chen',
    score: 94,
    signals: [
      { label: 'Tenure 18.4 years', points: 30, detail: 'Long-term ownership indicates potential downsizer' },
      { label: 'High Equity 82%', points: 25, detail: 'Substantial equity built over time' },
      { label: 'Empty Nesters', points: 20, detail: 'Children have likely moved out' },
      { label: 'DA Nearby', points: 15, detail: 'Development application 200m away' },
    ],
    status: 'HOT',
    lastContact: '2024-01-15',
    notes: 'Very interested. Husband wants to move closer to golf course. Follow up next week.',
    followUpDate: '2024-01-22',
    pipelineStage: 'APPRAISAL_BOOKED',
  },
  {
    id: '2',
    rank: 2,
    address: '27 Dorian Road',
    suburb: 'Karrinyup',
    postcode: '6018',
    ownerName: 'John Patterson',
    score: 91,
    signals: [
      { label: 'Tenure 13.2 years', points: 25, detail: 'Significant period of ownership' },
      { label: 'High Equity 67%', points: 25, detail: 'Good equity position' },
      { label: 'Deceased Estate', points: 25, detail: 'Probate recently granted' },
      { label: 'Price Growth Area', points: 16, detail: 'Suburb up 12% this year' },
    ],
    status: 'WARM',
    lastContact: '2024-01-12',
    notes: 'Executor of estate. Needs 3 months to clear contents.',
    followUpDate: '2024-04-01',
    pipelineStage: 'CONTACTED',
  },
  {
    id: '3',
    rank: 3,
    address: '8/45 Pearson Way',
    suburb: 'Karrinyup',
    postcode: '6018',
    ownerName: 'Sandra Williams',
    score: 88,
    signals: [
      { label: 'Tenure 21.7 years', points: 30, detail: 'Very long-term owner' },
      { label: 'Recent Renovation', points: 20, detail: 'Major reno completed 6 months ago' },
      { label: 'Rental History', points: 18, detail: 'Previously rented, now vacant' },
      { label: 'High Equity 91%', points: 20, detail: 'Nearly paid off' },
    ],
    status: 'NOT_CALLED',
    lastContact: null,
    notes: '',
    followUpDate: null,
    pipelineStage: 'NEW_LEAD',
  },
  {
    id: '4',
    rank: 4,
    address: '156 North Beach Road',
    suburb: 'Karrinyup',
    postcode: '6018',
    ownerName: 'Michael & Jennifer Stone',
    score: 86,
    signals: [
      { label: 'Tenure 15.8 years', points: 28, detail: 'Long ownership period' },
      { label: 'Divorce Filing', points: 30, detail: 'Settlement may require sale' },
      { label: 'High Equity 74%', points: 22, detail: 'Significant equity to split' },
    ],
    status: 'WARM',
    lastContact: '2024-01-10',
    notes: 'Jennifer answered. Confirmed separation. Wants private sale.',
    followUpDate: '2024-01-25',
    pipelineStage: 'CONTACTED',
  },
  {
    id: '5',
    rank: 5,
    address: '3 Doreen Place',
    suburb: 'Karrinyup',
    postcode: '6018',
    ownerName: 'Robert Thompson',
    score: 84,
    signals: [
      { label: 'Tenure 22.3 years', points: 30, detail: 'Very established owner' },
      { label: 'Aged Care Search', points: 28, detail: 'Online activity detected' },
      { label: 'High Equity 95%', points: 20, detail: 'Property fully paid' },
    ],
    status: 'NOT_CALLED',
    lastContact: null,
    notes: '',
    followUpDate: null,
    pipelineStage: 'NEW_LEAD',
  },
  {
    id: '6',
    rank: 6,
    address: '89 Huntriss Road',
    suburb: 'Doubleview',
    postcode: '6018',
    ownerName: 'Paul & Mary Kennedy',
    score: 82,
    signals: [
      { label: 'Tenure 11.4 years', points: 22, detail: 'Moderate ownership period' },
      { label: 'School Zone Change', points: 20, detail: 'Kids likely finished school' },
      { label: 'Investment Property', points: 20, detail: 'Owned outright, tenant leaving' },
      { label: 'Price Growth Area', points: 16, detail: 'Strong recent growth' },
    ],
    status: 'COLD',
    lastContact: '2024-01-08',
    notes: 'Not interested right now. Check back in 6 months.',
    followUpDate: '2024-07-08',
    pipelineStage: 'CONTACTED',
  },
  {
    id: '7',
    rank: 7,
    address: '12 Waterloo Street',
    suburb: 'Scarborough',
    postcode: '6019',
    ownerName: 'Angela Morrison',
    score: 81,
    signals: [
      { label: 'Tenure 9.2 years', points: 18, detail: 'Good ownership period' },
      { label: 'Renovation Permits', points: 25, detail: 'Renovation complete, flip likely' },
      { label: 'High Equity 58%', points: 18, detail: 'Decent equity position' },
      { label: 'Multiple Properties', points: 20, detail: 'Owns 3 other properties' },
    ],
    status: 'HOT',
    lastContact: '2024-01-14',
    notes: 'Ready to list. Waiting on final quote from painter. Will call back Thursday.',
    followUpDate: '2024-01-18',
    pipelineStage: 'APPRAISAL_BOOKED',
  },
  {
    id: '8',
    rank: 8,
    address: '234 West Coast Highway',
    suburb: 'Scarborough',
    postcode: '6019',
    ownerName: 'Christopher Lee',
    score: 79,
    signals: [
      { label: 'Tenure 7.8 years', points: 15, detail: 'Moderate ownership' },
      { label: 'Job Relocation', points: 30, detail: 'LinkedIn shows new job in Sydney' },
      { label: 'High Equity 52%', points: 16, detail: 'Good equity built' },
      { label: 'DA Nearby', points: 15, detail: 'Apartment development next door' },
    ],
    status: 'NOT_CALLED',
    lastContact: null,
    notes: '',
    followUpDate: null,
    pipelineStage: 'NEW_LEAD',
  },
  {
    id: '9',
    rank: 9,
    address: '67 Francis Street',
    suburb: 'Trigg',
    postcode: '6029',
    ownerName: 'William & Diane Foster',
    score: 77,
    signals: [
      { label: 'Tenure 16.1 years', points: 28, detail: 'Long-term ownership' },
      { label: 'Empty Nesters', points: 20, detail: 'Large home, children moved' },
      { label: 'High Equity 79%', points: 22, detail: 'Significant equity' },
    ],
    status: 'WARM',
    lastContact: '2024-01-11',
    notes: 'Interested but wife wants to wait until after Easter. Good rapport.',
    followUpDate: '2024-04-15',
    pipelineStage: 'CONTACTED',
  },
  {
    id: '10',
    rank: 10,
    address: '45 Marmion Avenue',
    suburb: 'Trigg',
    postcode: '6029',
    ownerName: 'Patricia Green',
    score: 75,
    signals: [
      { label: 'Tenure 24.6 years', points: 30, detail: 'Very long ownership' },
      { label: 'Widow/Widower', points: 22, detail: 'Spouse passed 2 years ago' },
      { label: 'High Equity 100%', points: 20, detail: 'No mortgage' },
    ],
    status: 'NOT_CALLED',
    lastContact: null,
    notes: '',
    followUpDate: null,
    pipelineStage: 'NEW_LEAD',
  },
  {
    id: '11',
    rank: 11,
    address: '19 Doreen Court',
    suburb: 'Karrinyup',
    postcode: '6018',
    ownerName: 'Steven & Karen Brown',
    score: 74,
    signals: [
      { label: 'Tenure 10.3 years', points: 20, detail: 'Solid ownership period' },
      { label: 'School Zone Change', points: 20, detail: 'Kids finished high school' },
      { label: 'High Equity 63%', points: 18, detail: 'Good equity position' },
      { label: 'Price Growth Area', points: 16, detail: 'Area trending upward' },
    ],
    status: 'COLD',
    lastContact: '2024-01-05',
    notes: 'Not interested. Just did renovations.',
    followUpDate: null,
    pipelineStage: 'CONTACTED',
  },
  {
    id: '12',
    rank: 12,
    address: '78 Karrinyup Road',
    suburb: 'Karrinyup',
    postcode: '6018',
    ownerName: 'Grace Mitchell',
    score: 72,
    signals: [
      { label: 'Tenure 19.7 years', points: 30, detail: 'Long-term owner' },
      { label: 'Retirement Age', points: 22, detail: 'Owner is 68 years old' },
      { label: 'High Equity 88%', points: 20, detail: 'Nearly paid off' },
    ],
    status: 'NOT_CALLED',
    lastContact: null,
    notes: '',
    followUpDate: null,
    pipelineStage: 'NEW_LEAD',
  },
  {
    id: '13',
    rank: 13,
    address: '34 Reserve Street',
    suburb: 'Doubleview',
    postcode: '6018',
    ownerName: 'James & Helen White',
    score: 71,
    signals: [
      { label: 'Tenure 8.5 years', points: 17, detail: 'Moderate ownership' },
      { label: 'Investment Property', points: 20, detail: 'Currently vacant' },
      { label: 'Multiple Properties', points: 18, detail: 'Portfolio reduction likely' },
      { label: 'High Equity 55%', points: 16, detail: 'Decent equity' },
    ],
    status: 'WARM',
    lastContact: '2024-01-13',
    notes: 'Considering selling one investment property. This might be it.',
    followUpDate: '2024-01-28',
    pipelineStage: 'CONTACTED',
  },
  {
    id: '14',
    rank: 14,
    address: '5 Newborough Street',
    suburb: 'Scarborough',
    postcode: '6019',
    ownerName: 'Daniel Harper',
    score: 69,
    signals: [
      { label: 'Tenure 6.2 years', points: 12, detail: 'Short-medium ownership' },
      { label: 'Job Relocation', points: 30, detail: 'Transfer to Melbourne' },
      { label: 'High Equity 45%', points: 14, detail: 'Reasonable equity' },
    ],
    status: 'HOT',
    lastContact: '2024-01-16',
    notes: 'Needs to sell quickly. Transfer starts March 1. Urgent!',
    followUpDate: '2024-01-17',
    pipelineStage: 'LISTING_WON',
  },
  {
    id: '15',
    rank: 15,
    address: '112 Brighton Road',
    suburb: 'Scarborough',
    postcode: '6019',
    ownerName: 'Elizabeth Taylor',
    score: 68,
    signals: [
      { label: 'Tenure 14.3 years', points: 26, detail: 'Long ownership period' },
      { label: 'Aged Care Search', points: 25, detail: 'Family member searches detected' },
      { label: 'High Equity 76%', points: 18, detail: 'Strong equity' },
    ],
    status: 'NOT_CALLED',
    lastContact: null,
    notes: '',
    followUpDate: null,
    pipelineStage: 'NEW_LEAD',
  },
  {
    id: '16',
    rank: 16,
    address: '23 Gildercliffe Street',
    suburb: 'Scarborough',
    postcode: '6019',
    ownerName: 'Mark & Susan Clark',
    score: 66,
    signals: [
      { label: 'Tenure 12.1 years', points: 24, detail: 'Good ownership period' },
      { label: 'Empty Nesters', points: 20, detail: 'Kids at university' },
      { label: 'High Equity 61%', points: 17, detail: 'Solid equity' },
    ],
    status: 'COLD',
    lastContact: '2024-01-03',
    notes: 'Politely declined. Happy where they are.',
    followUpDate: null,
    pipelineStage: 'CONTACTED',
  },
  {
    id: '17',
    rank: 17,
    address: '91 Hale Road',
    suburb: 'Innaloo',
    postcode: '6018',
    ownerName: 'Richard & Janet Moore',
    score: 65,
    signals: [
      { label: 'Tenure 17.9 years', points: 29, detail: 'Very long ownership' },
      { label: 'Retirement Age', points: 20, detail: 'Both owners over 65' },
      { label: 'High Equity 84%', points: 19, detail: 'Nearly paid off' },
    ],
    status: 'NOT_CALLED',
    lastContact: null,
    notes: '',
    followUpDate: null,
    pipelineStage: 'NEW_LEAD',
  },
  {
    id: '18',
    rank: 18,
    address: '56 Ellen Street',
    suburb: 'Innaloo',
    postcode: '6018',
    ownerName: 'Andrew Wilson',
    score: 63,
    signals: [
      { label: 'Tenure 5.4 years', points: 11, detail: 'Shorter ownership' },
      { label: 'Divorce Filing', points: 30, detail: 'Settlement imminent' },
      { label: 'High Equity 38%', points: 12, detail: 'Moderate equity' },
    ],
    status: 'WARM',
    lastContact: '2024-01-09',
    notes: 'Going through divorce. Will need to sell. Lawyer handling.',
    followUpDate: '2024-02-15',
    pipelineStage: 'CONTACTED',
  },
  {
    id: '19',
    rank: 19,
    address: '7 Doreen Way',
    suburb: 'Karrinyup',
    postcode: '6018',
    ownerName: 'Barbara Anderson',
    score: 61,
    signals: [
      { label: 'Tenure 20.2 years', points: 30, detail: 'Very long-term owner' },
      { label: 'Widow/Widower', points: 18, detail: 'Husband passed last year' },
      { label: 'High Equity 92%', points: 19, detail: 'Almost fully paid' },
    ],
    status: 'DNC',
    lastContact: '2024-01-02',
    notes: 'Requested no more calls. Very upset.',
    followUpDate: null,
    pipelineStage: 'NEW_LEAD',
  },
  {
    id: '20',
    rank: 20,
    address: '148 Odin Road',
    suburb: 'Innaloo',
    postcode: '6018',
    ownerName: 'Thomas & Linda Davis',
    score: 59,
    signals: [
      { label: 'Tenure 9.8 years', points: 19, detail: 'Good ownership period' },
      { label: 'School Zone Change', points: 18, detail: 'Kids finishing school' },
      { label: 'High Equity 57%', points: 16, detail: 'Decent equity' },
    ],
    status: 'NOT_CALLED',
    lastContact: null,
    notes: '',
    followUpDate: null,
    pipelineStage: 'NEW_LEAD',
  },
]

export const currentAgent = {
  name: 'Sarah Mitchell',
  email: 'sarah.mitchell@remax.com.au',
  plan: 'Premium Agent',
  rpDataEmail: 'sarah.mitchell@remax.com.au',
  id4meConnected: true,
  weeklyDigest: true,
  signalAlerts: true,
}

export const recentListing = {
  address: '14 Karrinyup Road',
  contactedWeeksAgo: 6,
  estimatedCommission: 14000,
}

export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function getWeekOf(): string {
  const today = new Date()
  const monday = new Date(today)
  monday.setDate(today.getDate() - today.getDay() + 1)
  return monday.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function getLastUpdated(): string {
  return new Date().toLocaleTimeString('en-AU', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function generateWhyTheySell(signals: Signal[]): string {
  const topSignal = signals[0]
  const reasons: string[] = []
  
  signals.forEach(signal => {
    if (signal.label.includes('Tenure')) {
      reasons.push(`With over ${signal.label.split(' ')[1]} years of ownership, this property represents significant untapped equity.`)
    }
    if (signal.label.includes('Empty Nesters')) {
      reasons.push('The family home may now feel too large with children having moved out.')
    }
    if (signal.label.includes('Deceased') || signal.label.includes('Widow')) {
      reasons.push('Life circumstances suggest a transition period that often leads to property decisions.')
    }
    if (signal.label.includes('Divorce')) {
      reasons.push('Legal proceedings typically require asset division including real estate.')
    }
    if (signal.label.includes('Job Relocation')) {
      reasons.push('An interstate move creates urgency for a quick, professional sale.')
    }
    if (signal.label.includes('Aged Care')) {
      reasons.push('Health considerations may be driving a need for more suitable accommodation.')
    }
  })
  
  return reasons.slice(0, 2).join(' ') || 'Multiple indicators suggest this owner may be considering a sale in the near future.'
}

export function generateColdCallScript(ownerName: string, signals: Signal[]): string {
  const firstName = ownerName.split(' ')[0].replace('&', '').trim()
  const topSignal = signals[0]
  
  if (topSignal.label.includes('Tenure')) {
    return `"Hi ${firstName}, this is Sarah from Sensali Realty. I noticed you've been in your home on [street] for quite a while now — over ${topSignal.label.split(' ')[1]} years. I specialise in this area and have been seeing some incredible results for long-term owners. Have you ever thought about what your property might be worth today?"`
  }
  
  if (topSignal.label.includes('Empty Nesters')) {
    return `"Hi ${firstName}, this is Sarah from Sensali Realty. I work with a lot of families in the area who've found themselves with more space than they need these days. I'd love to share what opportunities are available for downsizers in the current market — would that be of interest?"`
  }
  
  if (topSignal.label.includes('Job Relocation')) {
    return `"Hi ${firstName}, this is Sarah from Sensali Realty. I understand you might be looking at some changes coming up. I specialise in helping people who need to sell within a timeframe — I can usually get a premium result even with tight deadlines. Is that something worth discussing?"`
  }
  
  return `"Hi ${firstName}, this is Sarah from Sensali Realty. I'm reaching out because your property has come up in my market analysis as a high-potential listing. I'd love to share some insights about what's happening in your area — do you have a few minutes?"`
}
