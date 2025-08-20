import { CompanyStage, HeardFrom, UserType } from '@/config/form-options'

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
  
  // Additional Info
  pitchDeck: File | null
  heardFrom: HeardFrom | ''
  
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
  pitchDeck?: string
  heardFrom?: string
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
  pitchDeck: null,
  heardFrom: '',
  userType: 'STARTUP'
}
