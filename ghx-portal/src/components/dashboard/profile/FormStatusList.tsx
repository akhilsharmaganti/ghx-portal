import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Lock, Clock, ChevronRight } from 'lucide-react'

// =====================================================================
// Form Status List Props - Flexible interface for different data sources
// =====================================================================

interface FormStatusData {
  id: string
  name: string
  description: string
  status: string
  progress: number
}

interface FormStatusListProps {
  forms: FormStatusData[]
  onFormClick: (formId: string) => void
}

// =====================================================================
// Form Status List Component
// Now flexible and reusable for different data structures
// =====================================================================

export function FormStatusList({ forms, onFormClick }: FormStatusListProps) {
  const getFormIcon = (form: FormStatusData) => {
    if (form.status === 'COMPLETED') {
      return <CheckCircle className="w-5 h-5 text-green-600" />
    }
    if (form.status === 'LOCKED') {
      return <Lock className="w-5 h-5 text-gray-400" />
    }
    if (form.status === 'IN_PROGRESS') {
      return <Clock className="w-5 h-5 text-blue-600" />
    }
    return <Clock className="w-5 h-5 text-gray-400" />
  }

  const getFormStatus = (form: FormStatusData) => {
    if (form.status === 'COMPLETED') {
      return { text: 'COMPLETED', color: 'text-green-600 bg-green-50' }
    }
    if (form.status === 'LOCKED') {
      return { text: 'LOCKED', color: 'text-gray-500 bg-gray-50' }
    }
    if (form.status === 'IN_PROGRESS') {
      return { text: 'IN PROGRESS', color: 'text-blue-600 bg-blue-50' }
    }
    if (form.status === 'NOT_STARTED') {
      return { text: 'NOT STARTED', color: 'text-gray-500 bg-gray-50' }
    }
    return { text: 'AVAILABLE', color: 'text-blue-600 bg-blue-50' }
  }

  const getFormAction = (form: FormStatusData) => {
    if (form.status === 'COMPLETED') {
      return 'Edit'
    }
    if (form.status === 'LOCKED') {
      return 'Complete previous form'
    }
    if (form.status === 'IN_PROGRESS') {
      return 'Continue'
    }
    if (form.status === 'NOT_STARTED') {
      return 'Start'
    }
    return 'Start'
  }

  const isFormClickable = (form: FormStatusData) => {
    return form.status !== 'LOCKED'
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Forms to Complete
      </h2>
      
      <div className="space-y-3">
        {forms.map((form, index) => {
          const status = getFormStatus(form)
          const action = getFormAction(form)
          const isClickable = isFormClickable(form)
          
          return (
            <motion.div
              key={form.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                flex items-center justify-between p-4 rounded-lg border transition-all
                ${isClickable 
                  ? 'border-gray-200 hover:border-primary-300 hover:shadow-sm cursor-pointer' 
                  : 'border-gray-100 bg-gray-50'
                }
              `}
              onClick={() => isClickable && onFormClick(form.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {getFormIcon(form)}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {form.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {form.description}
                  </p>
                  
                  {/* Progress indicator */}
                  {form.progress > 0 && form.progress < 100 && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{form.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${form.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${status.color}`}>
                  {status.text}
                </span>
                
                {isClickable && (
                  <div className="flex items-center text-primary-600 hover:text-primary-700">
                    <span className="text-sm font-medium mr-1">{action}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
