export const companyStages = [
  { value: 'BOOTSTRAPPED', label: 'Bootstrapped' },
  { value: 'ANGEL_SEED', label: 'Angel/Seed' },
  { value: 'PRE_SERIES_A', label: 'Pre-Series A' },
  { value: 'SERIES_A', label: 'Series A' },
  { value: 'SERIES_B_BEYOND', label: 'Series B & Beyond' },
] as const

export const fundingRanges = [
  { value: '0_250K', label: '$0 - $250K' },
  { value: '250K_1M', label: '$250K - $1M' },
  { value: '1M_3M', label: '$1M - $3M' },
  { value: '3M_5M', label: '$3M - $5M' },
  { value: '5M_PLUS', label: '$5M+' },
] as const

export const heardFromOptions = [
  { value: 'REFERRAL', label: 'Referral' },
  { value: 'ONLINE_SEARCH', label: 'Online search' },
  { value: 'SOCIAL_MEDIA', label: 'Social media' },
  { value: 'INDUSTRY_EVENT', label: 'Industry event/conference' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'OTHER', label: 'Other' },
] as const

export const userTypes = [
  { value: 'STARTUP', label: 'Startup' },
  { value: 'MENTOR', label: 'Mentor' },
  { value: 'INVESTOR', label: 'Investor' },
  { value: 'SEEKER', label: 'Seeker' },
] as const

export type CompanyStage = typeof companyStages[number]['value']
export type FundingRange = typeof fundingRanges[number]['value']
export type HeardFrom = typeof heardFromOptions[number]['value']
export type UserType = typeof userTypes[number]['value']
