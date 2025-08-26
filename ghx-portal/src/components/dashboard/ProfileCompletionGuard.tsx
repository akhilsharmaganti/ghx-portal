import React from 'react'
import { motion } from 'framer-motion'
import { Lock, CheckCircle, AlertCircle } from 'lucide-react'
import { useProfileCompletionDatabase } from '@/hooks/useProfileCompletionDatabase'

// =====================================================================
// Profile Completion Guard Component
// Blocks access to premium features until profile is 100% complete
// Following SOLID principles and UX best practices
// =====================================================================

interface ProfileCompletionGuardProps {
  children: React.ReactNode
  requiredCompletion?: number
  fallback?: React.ReactNode
}

export function ProfileCompletionGuard({ 
  children, 
  requiredCompletion = 100,
  fallback 
}: ProfileCompletionGuardProps) {
  const { overallCompletion, isLoadingTemplates, error } = useProfileCompletionDatabase()

  // =====================================================================
  // Loading State
  // =====================================================================
  if (isLoadingTemplates) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking profile completion...</p>
        </div>
      </div>
    )
  }

  // =====================================================================
  // Error State
  // =====================================================================
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Profile Check Failed</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  // =====================================================================
  // Access Granted - Profile Complete
  // =====================================================================
  if (overallCompletion >= requiredCompletion) {
    return <>{children}</>
  }

  // =====================================================================
  // TEMPORARY: Bypass profile completion for development
  // =====================================================================
  // TODO: Remove this bypass when profile completion is ready
  return <>{children}</>

  // =====================================================================
  // Access Blocked - Profile Incomplete
  // =====================================================================
  const missingPercentage = requiredCompletion - overallCompletion
  const completedForms = Math.floor(overallCompletion / 25) // Assuming 4 forms (25% each)
  const totalForms = 4

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 text-center"
    >
      {/* Lock Icon */}
      <div className="flex justify-center mb-6">
        <div className="bg-blue-100 rounded-full p-4">
          <Lock className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      {/* Main Message */}
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        Complete Your Profile to Unlock
      </h2>
      
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        To access mentors, programs, and calendar features, you need to complete your profile first.
      </p>

      {/* Progress Display */}
      <div className="bg-white rounded-lg p-4 mb-6 max-w-sm mx-auto">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Profile Completion</span>
          <span className="font-semibold">{overallCompletion}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${overallCompletion}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        
        <div className="text-xs text-gray-500 mt-2">
          {completedForms} of {totalForms} forms completed
        </div>
      </div>

      {/* Missing Forms Info */}
      <div className="bg-white rounded-lg p-4 mb-6 max-w-sm mx-auto">
        <h3 className="font-semibold text-gray-900 mb-2">Forms to Complete:</h3>
        <div className="space-y-2 text-sm">
          {overallCompletion < 25 && (
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
              Industry & Market Analysis
            </div>
          )}
          {overallCompletion < 50 && (
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
              Financial Information
            </div>
          )}
          {overallCompletion < 75 && (
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
              Clinical Studies
            </div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="space-y-3">
        <p className="text-sm text-gray-500">
          {missingPercentage}% more to unlock all features
        </p>
        
        <button
          onClick={() => {
            // Navigate to profile tab
            const profileTab = document.querySelector('[data-tab="profile"]')
            if (profileTab) {
              (profileTab as HTMLElement).click()
            }
          }}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Complete Profile Now
        </button>
      </div>

      {/* Custom Fallback */}
      {fallback && (
        <div className="mt-6 pt-6 border-t border-blue-200">
          {fallback}
        </div>
      )}
    </motion.div>
  )
}
