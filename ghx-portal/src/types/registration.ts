import { CompanyStage, FundingRange, HeardFrom, UserType } from '@/config/form-options'

export interface RegistrationFormData {
  // Basic Auth Info
  email: string
  password: string
  confirmPassword: string
  
  // Personal Info
  firstName: string
  designation: string
  linkedinUrl: string
  
  // Company Info
  companyName: string
  companyWebsite: string
  companyCountry: string
  companyStage: CompanyStage | ''
  totalFundsRaised: FundingRange | ''
  
  // Additional Info
  pitchDeck: File | null
  heardFrom: HeardFrom | ''
  heardFromOther: string
  
  // User Type
  userType: UserType
}

export interface RegistrationFormErrors {
  email?: string
  password?: string
  confirmPassword?: string
  firstName?: string
  designation?: string
  linkedinUrl?: string
  companyName?: string
  companyWebsite?: string
  companyCountry?: string
  companyStage?: string
  totalFundsRaised?: string
  pitchDeck?: string
  heardFrom?: string
  heardFromOther?: string
  userType?: string
}

export const initialFormData: RegistrationFormData = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  designation: '',
  linkedinUrl: '',
  companyName: '',
  companyWebsite: '',
  companyCountry: '',
  companyStage: '',
  totalFundsRaised: '',
  pitchDeck: null,
  heardFrom: '',
  heardFromOther: '',
  userType: 'STARTUP'
}
