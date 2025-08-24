import { create } from 'zustand'
import { ProfileProgress, FormData, IndustryMarketFormData, FinancialsFormData, ClinicalStudiesFormData } from '@/types/profile'

// =====================================================================
// Profile Completion Store
// =====================================================================

interface ProfileCompletionState {
  // State
  progress: ProfileProgress
  currentFormData: IndustryMarketFormData | FinancialsFormData | ClinicalStudiesFormData | null
  
  // Actions
  initializeProgress: () => void
  updateFormCompletion: (formId: string, isCompleted: boolean) => void
  updateFormData: (formId: string, data: any) => void
  unlockNextForm: (currentFormId: string) => void
  calculateOverallProgress: () => number
}

// =====================================================================
// Initial Form Data
// =====================================================================

const initialForms: FormData[] = [
  {
    id: 'basic-registration',
    title: 'Basic Registration',
    description: 'Personal and company information',
    isCompleted: true,
    isLocked: false,
    completionPercentage: 100,
    requiredFields: ['email', 'firstName', 'companyName'],
    completedFields: ['email', 'firstName', 'companyName']
  },
  {
    id: 'industry-market',
    title: 'Industry & Market',
    description: 'Healthcare domain and business details',
    isCompleted: false,
    isLocked: false,
    completionPercentage: 0,
    requiredFields: ['healthcareDomain', 'problemSolution', 'businessModel'],
    completedFields: []
  },
  {
    id: 'financials',
    title: 'Financials',
    description: 'Revenue, funding, and projections',
    isCompleted: false,
    isLocked: true,
    completionPercentage: 0,
    requiredFields: ['fullTimeEmployees', 'annualRecurringRevenue', 'yearToDateRevenue', 'isCurrentlyProfitable', 'breakevenTimeline', 'lastFundingDetails', 'estimatedRunway'],
    completedFields: []
  },
  {
    id: 'clinical-studies',
    title: 'Clinical Studies',
    description: 'Research data and regulatory status',
    isCompleted: false,
    isLocked: true,
    completionPercentage: 0,
    requiredFields: ['hasConductedClinicalTrials', 'cohortSize', 'trialLocation', 'trialTimeline', 'keyFindings', 'regulatoryAlignment', 'clinicalTrialPhase', 'publicationStatus', 'challenges', 'thirdPartyValidation', 'additionalTrialsPlanned'],
    completedFields: []
  },
  {
    id: 'ending',
    title: 'Ending',
    description: 'Final commitments and agreements',
    isCompleted: false,
    isLocked: true,
    completionPercentage: 0,
    requiredFields: ['commitments', 'agreements'],
    completedFields: []
  }
]

// =====================================================================
// Store Implementation
// =====================================================================

export const useProfileCompletionStore = create<ProfileCompletionState>((set, get) => ({
  // Initial State
  progress: {
    totalForms: initialForms.length,
    completedForms: 1, // Form 1 is completed
    currentForm: 'industry-market',
    overallProgress: 20, // 1 out of 5 forms = 20%
    forms: initialForms
  },
  currentFormData: null,

  // Actions
  initializeProgress: () => {
    set((state) => ({
      progress: {
        ...state.progress,
        forms: initialForms,
        completedForms: 1,
        overallProgress: 20
      }
    }))
  },

  updateFormCompletion: (formId: string, isCompleted: boolean) => {
    set((state) => {
      const updatedForms = state.progress.forms.map(form => 
        form.id === formId 
          ? { ...form, isCompleted, completionPercentage: isCompleted ? 100 : 0 }
          : form
      )

      const completedForms = updatedForms.filter(form => form.isCompleted).length
      const overallProgress = Math.round((completedForms / state.progress.totalForms) * 100)

      return {
        progress: {
          ...state.progress,
          forms: updatedForms,
          completedForms,
          overallProgress
        }
      }
    })

    // Unlock next form if current one is completed
    if (isCompleted) {
      get().unlockNextForm(formId)
    }
  },

  updateFormData: (formId: string, data: any) => {
    if (formId === 'industry-market') {
      set({ currentFormData: data })
    } else if (formId === 'financials') {
      set({ currentFormData: data })
    } else if (formId === 'clinical-studies') {
      set({ currentFormData: data })
    }
    // Add other form data handling as needed
  },

  unlockNextForm: (currentFormId: string) => {
    const formOrder = ['basic-registration', 'industry-market', 'financials', 'clinical-studies', 'ending']
    const currentIndex = formOrder.indexOf(currentFormId)
    const nextFormId = formOrder[currentIndex + 1]

    if (nextFormId) {
      set((state) => ({
        progress: {
          ...state.progress,
          forms: state.progress.forms.map(form => 
            form.id === nextFormId 
              ? { ...form, isLocked: false }
              : form
          ),
          currentForm: nextFormId
        }
      }))
    }
  },

  calculateOverallProgress: () => {
    const state = get()
    return state.progress.overallProgress
  }
}))
