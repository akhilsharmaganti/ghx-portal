import { useState, useEffect, useCallback } from 'react'

// =====================================================================
// Profile Completion Database Hook
// Integrates frontend forms with normalized database structure via API routes
// Following SOLID principles and React best practices
// =====================================================================

// =====================================================================
// Types - Imported from service for consistency
// =====================================================================

export interface FormTemplateData {
  id: number
  name: string
  description: string | null
  version: number
  isActive: boolean
  sections: FormSectionData[]
}

export interface FormSectionData {
  id: number
  name: string
  description: string | null
  orderIndex: number
  isRequired: boolean
  fields: FormFieldData[]
}

export interface FormFieldData {
  id: number
  name: string
  label: string
  fieldType: string
  placeholder: string | null
  helpText: string | null
  isRequired: boolean
  validationRules: any
  options: any
  orderIndex: number
}

export interface ProfileCompletionData {
  userId: number
  templateId: number
  completionStatus: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
  progressPercentage: number
}

// =====================================================================
// API Client Functions
// =====================================================================

const API_BASE = '/api'

async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || `HTTP ${response.status}`)
  }

  return response.json()
}

// =====================================================================
// Hook Implementation
// =====================================================================

export function useProfileCompletionDatabase() {
  // =====================================================================
  // State Management
  // =====================================================================
  const [templates, setTemplates] = useState<FormTemplateData[]>([])
  const [profileCompletions, setProfileCompletions] = useState<ProfileCompletionData[]>([])
  const [overallCompletion, setOverallCompletion] = useState<number>(0)
  const [isLoadingTemplates, setIsLoadingTemplates] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // =====================================================================
  // Mock User ID (replace with actual auth when available)
  // =====================================================================
  const mockUserId = 1

  // =====================================================================
  // Data Fetching Functions
  // =====================================================================

  const fetchProfileData = useCallback(async () => {
    try {
      setIsLoadingTemplates(true)
      setError(null)
      
      const response = await apiRequest<{
        success: boolean
        data: {
          templates: FormTemplateData[]
          profileCompletions: ProfileCompletionData[]
          overallCompletion: number
        }
      }>(`/profile/data?userId=${mockUserId}`)

      if (response.success) {
        setTemplates(response.data.templates)
        setProfileCompletions(response.data.profileCompletions)
        setOverallCompletion(response.data.overallCompletion)
      } else {
        throw new Error('Failed to fetch profile data')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile data')
    } finally {
      setIsLoadingTemplates(false)
    }
  }, [])

  const refreshData = useCallback(async () => {
    await fetchProfileData()
  }, [fetchProfileData])

  // =====================================================================
  // Form Submission
  // =====================================================================

  const submitForm = useCallback(async (templateName: string, formData: any): Promise<boolean> => {
    try {
      setError(null)
      
      // Find the template by name
      const template = templates.find(t => t.name === templateName)
      if (!template) {
        throw new Error(`Template '${templateName}' not found`)
      }

      // Convert form data to normalized field responses
      const fieldResponses = Object.entries(formData).map(([key, value]) => {
        // Find the field by name
        const field = template.sections
          .flatMap(section => section.fields)
          .find(f => f.name === key)
        
        if (!field) {
          console.warn(`Field '${key}' not found in template`)
          return null
        }
        
        return {
          fieldId: field.id,
          value: String(value)
        }
      }).filter(Boolean) as { fieldId: number; value: string }[]

      if (fieldResponses.length === 0) {
        throw new Error('No valid fields found in form data')
      }

      // Submit form response via API
      const response = await apiRequest<{
        success: boolean
        message?: string
        error?: string
      }>('/profile/forms/submit', {
        method: 'POST',
        body: JSON.stringify({
          templateId: template.id,
          fieldResponses
        })
      })

      if (response.success) {
        // Refresh data to show updated progress
        await refreshData()
        return true
      } else {
        throw new Error(response.error || 'Failed to submit form')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit form')
      return false
    }
  }, [templates, refreshData])

  // =====================================================================
  // Utility Functions
  // =====================================================================

  const getTemplateByName = useCallback((name: string): FormTemplateData | undefined => {
    return templates.find(t => t.name === name)
  }, [templates])

  // =====================================================================
  // Effects
  // =====================================================================

  useEffect(() => {
    refreshData()
  }, [refreshData])

  // =====================================================================
  // Return Interface
  // =====================================================================

  return {
    // Data
    templates,
    profileCompletions,
    overallCompletion,
    
    // Loading States
    isLoadingTemplates,
    
    // Error Handling
    error,
    
    // Actions
    submitForm,
    refreshData,
    
    // Utilities
    getTemplateByName
  }
}
