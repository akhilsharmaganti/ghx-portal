import React from 'react'
import { AlertCircle } from 'lucide-react'

interface ErrorDisplayProps {
  error: string
  className?: string
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, className = '' }) => {
  const getHelpfulSuggestion = (errorMessage: string) => {
    if (errorMessage.includes('already exists')) {
      return {
        title: 'Account exists',
        message: 'You already have an account with this email. Please sign in instead.'
      }
    }
    
    if (errorMessage.includes('Password is too weak')) {
      return {
        title: 'Password requirements',
        message: 'Use at least 8 characters with a mix of letters, numbers, and symbols for better security.'
      }
    }
    
    if (errorMessage.includes('valid email address')) {
      return {
        title: 'Email format',
        message: 'Please enter a valid email address (e.g., user@example.com).'
      }
    }
    
    return null
  }

  const suggestion = getHelpfulSuggestion(error)

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium mb-1">Registration Failed</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
      
      {suggestion && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>{suggestion.title}:</strong> {suggestion.message}
          </p>
        </div>
      )}
    </div>
  )
}
