import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useProfileCompletionDatabase } from '@/hooks/useProfileCompletionDatabase'
import { ProfileProgressBar } from './ProfileProgressBar'
import { FormStatusList } from './FormStatusList'
import { IndustryMarketForm } from './IndustryMarketForm'
import { FinancialsForm } from './FinancialsForm'
import { ClinicalStudiesForm } from './ClinicalStudiesForm'
import { IndustryMarketFormData, FinancialsFormData, ClinicalStudiesFormData } from '@/types/profile'

// =====================================================================
// Profile Tab Component
// Now integrated with normalized database structure
// Following SOLID principles and modular architecture
// =====================================================================

export function ProfileTab() {
  // =====================================================================
  // Database Integration Hook
  // =====================================================================
  const {
    templates,
    isLoadingTemplates,
    error: dbError,
    profileCompletions,
    overallCompletion,
    submitForm,
    refreshData,
    getTemplateByName
  } = useProfileCompletionDatabase()

  // =====================================================================
  // Local State Management
  // =====================================================================
  const [activeForm, setActiveForm] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)

  // =====================================================================
  // Effects
  // =====================================================================

  useEffect(() => {
    // Refresh data when component mounts
    refreshData()
  }, [refreshData])

  // =====================================================================
  // Event Handlers
  // =====================================================================

  const handleFormClick = (formId: string) => {
    if (formId === 'basic-registration') {
      // Show basic registration data (read-only for now)
      setActiveForm(formId)
      setShowForm(false)
    } else if (formId === 'industry-market') {
      setActiveForm(formId)
      setShowForm(true)
    } else if (formId === 'financials') {
      setActiveForm(formId)
      setShowForm(true)
    } else if (formId === 'clinical-studies') {
      setActiveForm(formId)
      setShowForm(true)
    } else {
      // Other forms are locked
      setActiveForm(null)
      setShowForm(false)
    }
  }

  const handleFormSubmit = async (data: IndustryMarketFormData | FinancialsFormData | ClinicalStudiesFormData) => {
    if (!activeForm) return

    try {
      setIsSubmitting(true)
      setSubmitError(null)
      setSubmitSuccess(null)

      // Submit form to database
      const success = await submitForm(activeForm, data)
      
      if (success) {
        setSubmitSuccess(`Form submitted successfully!`)
        setShowForm(false)
        setActiveForm(null)
        
        // Refresh data to show updated progress
        await refreshData()
      } else {
        setSubmitError('Failed to submit form. Please try again.')
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setActiveForm(null)
    setSubmitError(null)
    setSubmitSuccess(null)
  }

  // =====================================================================
  // Utility Functions
  // =====================================================================

  const getFormCompletionStatus = (formName: string) => {
    const completion = profileCompletions.find(pc => {
      const template = getTemplateByName(formName)
      return template && pc.templateId === template.id
    })
    
    if (!completion) {
      return { status: 'NOT_STARTED', progress: 0 }
    }
    
    // Map completion status to our form status format
    let status = 'NOT_STARTED'
    if (completion.completionStatus === 'COMPLETED') {
      status = 'COMPLETED'
    } else if (completion.completionStatus === 'IN_PROGRESS') {
      status = 'IN_PROGRESS'
    }
    
    return { 
      status, 
      progress: completion.progressPercentage 
    }
  }

  const getFormTemplate = (formName: string) => {
    return getTemplateByName(formName)
  }

  // =====================================================================
  // Render Basic Registration Data
  // =====================================================================

  const renderBasicRegistrationData = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Registration</h3>
      <p className="text-gray-600">Your basic registration information is complete.</p>
    </motion.div>
  )

  // =====================================================================
  // Render Active Form
  // =====================================================================

  const renderActiveForm = () => {
    if (!activeForm || !showForm) return null

    const formProps = {
      onSubmit: handleFormSubmit,
      onCancel: handleFormCancel,
      isSubmitting,
      template: getFormTemplate(activeForm)
    }

    switch (activeForm) {
      case 'industry-market':
        return <IndustryMarketForm {...formProps} />
      case 'financials':
        return <FinancialsForm {...formProps} />
      case 'clinical-studies':
        return <ClinicalStudiesForm {...formProps} />
      default:
        return null
    }
  }

  // =====================================================================
  // Render Loading State
  // =====================================================================

  if (isLoadingTemplates) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile forms...</p>
        </div>
      </div>
    )
  }

  // =====================================================================
  // Render Error State
  // =====================================================================

  if (dbError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414-1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Database Error</h3>
            <p className="text-sm text-red-700 mt-1">{dbError}</p>
          </div>
        </div>
      </div>
    )
  }

  // =====================================================================
  // Main Render
  // =====================================================================

  return (
    <div className="space-y-6">
      {/* =====================================================================
          Profile Progress Section
          ===================================================================== */}
      <ProfileProgressBar 
        progress={overallCompletion} 
        totalForms={templates.length}
        completedForms={profileCompletions.filter(pc => pc.completionStatus === 'COMPLETED').length}
      />

      {/* =====================================================================
          Success/Error Messages
          ===================================================================== */}
      {submitSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-xl p-4"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">{submitSuccess}</p>
            </div>
          </div>
        </motion.div>
      )}

      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-xl p-4"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{submitError}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* =====================================================================
          Form Status List
          ===================================================================== */}
      <FormStatusList
        forms={[
          {
            id: 'basic-registration',
            name: 'Basic Registration',
            description: 'Your account information',
            status: 'COMPLETED',
            progress: 100
          },
          {
            id: 'industry-market',
            name: 'Industry & Market Analysis',
            description: 'Industry and market information',
            ...getFormCompletionStatus('industry-market')
          },
          {
            id: 'financials',
            name: 'Financial Information',
            description: 'Financial details and funding',
            ...getFormCompletionStatus('financials')
          },
          {
            id: 'clinical-studies',
            name: 'Clinical Studies',
            description: 'Research and clinical information',
            ...getFormCompletionStatus('clinical-studies')
          }
        ]}
        onFormClick={handleFormClick}
      />

      {/* =====================================================================
          Active Form Display
          ===================================================================== */}
      {activeForm === 'basic-registration' && renderBasicRegistrationData()}
      {renderActiveForm()}
    </div>
  )
}
