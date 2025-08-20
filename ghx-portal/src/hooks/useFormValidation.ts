import { useState, useCallback } from 'react'

interface FormData {
  [key: string]: string | File | null
}

interface ValidationRules {
  [key: string]: {
    required?: boolean
    minLength?: number
    pattern?: RegExp
    custom?: (value: any) => boolean
  }
}

interface ValidationErrors {
  [key: string]: string
}

export const useFormValidation = (initialData: FormData, rules: ValidationRules) => {
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Set<string>>(new Set())

  const validateField = useCallback((name: string, value: any): string => {
    const rule = rules[name]
    if (!rule) return ''

    // Required validation
    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return 'This field is required'
    }

    // Min length validation
    if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
      return `Must be at least ${rule.minLength} characters`
    }

    // Pattern validation
    if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
      return 'Invalid format'
    }

    // Custom validation
    if (rule.custom && !rule.custom(value)) {
      return 'Invalid value'
    }

    return ''
  }, [rules])

  const validateForm = useCallback((data: FormData): boolean => {
    const newErrors: ValidationErrors = {}
    let isValid = true

    Object.keys(rules).forEach(fieldName => {
      const error = validateField(fieldName, data[fieldName])
      if (error) {
        newErrors[fieldName] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }, [rules, validateField])

  const markFieldAsTouched = useCallback((fieldName: string) => {
    setTouched(prev => new Set(prev).add(fieldName))
  }, [])

  const getFieldError = useCallback((fieldName: string): string => {
    return touched.has(fieldName) ? errors[fieldName] || '' : ''
  }, [errors, touched])

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  return {
    errors,
    touched,
    validateField,
    validateForm,
    markFieldAsTouched,
    getFieldError,
    clearErrors
  }
}
