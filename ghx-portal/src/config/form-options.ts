export const companyStages = [
  { value: 'IDEA', label: 'Idea Stage' },
  { value: 'MVP', label: 'MVP/Prototype' },
  { value: 'EARLY_TRACTION', label: 'Early Traction' },
  { value: 'GROWTH', label: 'Growth Stage' },
  { value: 'SCALE', label: 'Scale Up' },
  { value: 'ESTABLISHED', label: 'Established Business' },
] as const

export const heardFromOptions = [
  { value: 'SOCIAL_MEDIA', label: 'Social Media' },
  { value: 'SEARCH_ENGINE', label: 'Search Engine' },
  { value: 'REFERRAL', label: 'Referral' },
  { value: 'EVENT', label: 'Event/Conference' },
  { value: 'ARTICLE', label: 'Article/Blog' },
  { value: 'OTHER', label: 'Other' },
] as const

export const userTypes = [
  { value: 'STARTUP', label: 'Startup' },
  { value: 'MENTOR', label: 'Mentor' },
  { value: 'INVESTOR', label: 'Investor' },
  { value: 'SEEKER', label: 'Seeker' },
] as const

export type CompanyStage = typeof companyStages[number]['value']
export type HeardFrom = typeof heardFromOptions[number]['value']
export type UserType = typeof userTypes[number]['value']
