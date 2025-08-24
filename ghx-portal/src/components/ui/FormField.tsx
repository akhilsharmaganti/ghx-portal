import React from 'react'
import { LucideIcon } from 'lucide-react'

interface FormFieldProps {
  label: string
  name: string
  type: 'text' | 'email' | 'password' | 'url' | 'select' | 'textarea'
  value: string
  onChange: (e: any) => void // More flexible to support both old and new handlers
  placeholder?: string
  required?: boolean
  icon?: LucideIcon
  options?: ReadonlyArray<{ readonly value: string; readonly label: string }>
  minLength?: number
  className?: string
  error?: string
  rows?: number
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  icon: Icon,
  options,
  minLength,
  className = '',
  error,
  rows = 3
}) => {
  const baseInputClasses = "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
  const selectClasses = "appearance-none bg-white"
  
  const inputClasses = type === 'select' 
    ? `${baseInputClasses} ${selectClasses} ${className}`
    : `${baseInputClasses} ${className}`

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        )}
        
        {type === 'select' ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={inputClasses}
          >
            <option value="">{placeholder || 'Select an option'}</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            rows={rows}
            className={inputClasses}
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            minLength={minLength}
            className={inputClasses}
            placeholder={placeholder}
          />
        )}
      </div>
      
      {/* Error Display */}
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
