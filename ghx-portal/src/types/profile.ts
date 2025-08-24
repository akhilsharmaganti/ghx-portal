// =====================================================================
// Profile Completion Types
// =====================================================================

export interface FormData {
  id: string
  title: string
  description: string
  isCompleted: boolean
  isLocked: boolean
  completionPercentage: number
  requiredFields: string[]
  completedFields: string[]
}

export interface ProfileProgress {
  totalForms: number
  completedForms: number
  currentForm: string
  overallProgress: number
  forms: FormData[]
}

// =====================================================================
// Base Form Interface - For all profile forms
// =====================================================================

export interface BaseFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  isSubmitting?: boolean
  template?: any // FormTemplate from Prisma
}

// =====================================================================
// Form Completion Status Types
// =====================================================================

export type ProfileCompletionStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'

export interface ProfileCompletionData {
  userId: number
  templateId: number
  completionStatus: ProfileCompletionStatus
  progressPercentage: number
}

// =====================================================================
// Form Response Types
// =====================================================================

export interface FormFieldResponse {
  fieldId: number
  value: string
}

export interface FormResponseData {
  templateId: number
  fieldResponses: FormFieldResponse[]
}

// =====================================================================
// Industry Market Form Types
// =====================================================================

export interface IndustryMarketFormData {
  healthcareDomain: string
  problemSolution: string
  businessModel: string
  payingCustomer: string
  customerCount: string
  userCount: string
  indianMarketGoals: string
  hasPartner: string
  internationalMarkets: string
  hasExpansionTeam: string
  hasKeyOpinionLeaders: string
  keyOpinionLeaders: string
}

// =====================================================================
// Financials Form Types
// =====================================================================

export interface FinancialsFormData {
  // Company size and structure
  fullTimeEmployees: string
  
  // Revenue metrics
  annualRecurringRevenue: string
  yearToDateRevenue: string
  
  // Financial status
  isCurrentlyProfitable: string
  breakevenTimeline: string
  
  // Funding information
  hasRaisedFunds: string
  lastFundingDetails: string
  
  // Financial projections
  estimatedRunway: string
  lookingToRaiseFunds: string
  fundingAmount: string
}

// =====================================================================
// Clinical Studies Form Types
// =====================================================================

export interface ClinicalStudiesFormData {
  // Primary question - controls visibility of other fields
  hasConductedClinicalTrials: string
  
  // Trial details (only shown if hasConductedClinicalTrials === 'Yes')
  cohortSize: string
  trialLocation: string
  trialTimeline: string
  keyFindings: string
  regulatoryAlignment: string
  clinicalTrialPhase: string
  publicationStatus: string
  challenges: string
  thirdPartyValidation: string
  additionalTrialsPlanned: string
  additionalTrialsDetails: string
}

export interface EndingFormData {
  // To be implemented
  commitments: string
  agreements: string
  final: string
}

export interface CompleteProfileData {
  basicRegistration: Record<string, any> // Form 1 data
  industryMarket: IndustryMarketFormData | null
  financials: FinancialsFormData | null
  clinicalStudies: ClinicalStudiesFormData | null
  ending: EndingFormData | null
}
