import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Lock, Clock } from 'lucide-react'

// =====================================================================
// Profile Progress Bar Props
// =====================================================================

interface ProfileProgressBarProps {
  progress: number
  totalForms: number
  completedForms: number
}

// =====================================================================
// Profile Progress Bar Component
// =====================================================================

export function ProfileProgressBar({ progress, totalForms, completedForms }: ProfileProgressBarProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Profile Completion
        </h2>
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-gray-600">
            {completedForms} of {totalForms} forms completed
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Overall Progress
          </span>
          <span className="text-sm font-medium text-primary-600">
            {progress}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-primary-600">{progress}%</div>
          <div className="text-xs text-gray-500">Complete</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-600">{completedForms}</div>
          <div className="text-xs text-gray-500">Completed</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-400">{totalForms - completedForms}</div>
          <div className="text-xs text-gray-500">Remaining</div>
        </div>
      </div>
    </div>
  )
}
