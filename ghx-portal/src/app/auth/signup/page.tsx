'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signUp } from '@/lib/firebase'
import { SignUpData } from '@/lib/firebase'
import { CheckCircle, User, Building, Globe, MapPin } from 'lucide-react'

// Reusable Components
import { FormField, PasswordField, FileUpload, ErrorDisplay } from '@/components/ui'

// Types and Config
import { RegistrationFormData, initialFormData } from '@/types/registration'
import { companyStages, heardFromOptions, userTypes } from '@/config/form-options'

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // =====================================================================
  // Form Handlers
  // =====================================================================

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('') // Clear error when user types
  }

  const handleFileChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, pitchDeck: file }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Split the full name into first and last name
      const nameParts = formData.firstName.trim().split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''

      const signUpData: SignUpData = {
        email: formData.email,
        password: formData.password,
        firstName: firstName,
        lastName: lastName,
        userType: formData.userType,
      }
      
      await signUp(signUpData)
      setSuccess(true)
      
      // Redirect after a short delay to show success message
      setTimeout(() => {
        router.push('/auth/verify-email')
      }, 2000)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Sign up failed')
    } finally {
      setLoading(false)
    }
  }

  // =====================================================================
  // Animation Variants
  // =====================================================================

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // =====================================================================
  // Render
  // =====================================================================

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 text-center max-w-md"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Registration Successful!
          </h1>
          <p className="text-gray-600 mb-4">
            We&apos;ve sent a verification email to {formData.email}. Please check your inbox and verify your email address.
          </p>
          <div className="text-sm text-gray-500">
            Redirecting to verification page...
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/logo/GLOBAL HEALTHX.png" 
              alt="Global HealthX Logo" 
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Global HealthX
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Accelerating Innovation
          </p>
          <p className="text-gray-500">
            Join the innovation ecosystem and accelerate your startup journey
          </p>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <User className="w-6 h-6 mr-3 text-primary-600" />
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Name"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  icon={User}
                />
                
                <FormField
                  label="Designation"
                  name="designation"
                  type="text"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="e.g., CEO, Founder, Director"
                  required
                  icon={User}
                />
              </div>

              <FormField
                label="Professional Email ID"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                required
                icon={User}
              />

              <FormField
                label="LinkedIn Profile URL"
                name="linkedinUrl"
                type="url"
                value={formData.linkedinUrl}
                onChange={handleInputChange}
                placeholder="https://www.linkedin.com/in/yourprofile"
                required
                icon={User}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PasswordField
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password (min. 8 characters)"
                  required
                  minLength={8}
                />

                <PasswordField
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </motion.div>

            {/* Company Information Section */}
            <motion.div variants={itemVariants} className="space-y-6 pt-6 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="w-6 h-6 mr-3 text-primary-600" />
                Company Information
              </h2>
              
              <FormField
                label="Company Name"
                name="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Enter your company's registered name"
                required
                icon={Building}
              />

              <FormField
                label="Company Website"
                name="companyWebsite"
                type="url"
                value={formData.companyWebsite}
                onChange={handleInputChange}
                placeholder="https://www.yourcompany.com"
                required
                icon={Globe}
              />

              <FormField
                label="Company Country"
                name="companyCountry"
                type="text"
                value={formData.companyCountry}
                onChange={handleInputChange}
                placeholder="Country name"
                required
                icon={MapPin}
              />

              <FormField
                label="Company Stage"
                name="companyStage"
                type="select"
                value={formData.companyStage}
                onChange={handleInputChange}
                placeholder="Select company stage"
                required
                options={companyStages}
                icon={Building}
              />
            </motion.div>

            {/* Additional Information Section */}
            <motion.div variants={itemVariants} className="space-y-6 pt-6 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="w-6 h-6 mr-3 text-primary-600" />
                Additional Information
              </h2>
              
              <FileUpload
                label="Pitch Deck (PDF format)"
                name="pitchDeck"
                file={formData.pitchDeck}
                onChange={handleFileChange}
                accept=".pdf"
                maxSizeMB={20}
                required
              />

              <FormField
                label="How did you hear about us?"
                name="heardFrom"
                type="select"
                value={formData.heardFrom}
                onChange={handleInputChange}
                placeholder="Select an option"
                required
                options={heardFromOptions}
                icon={Building}
              />
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ErrorDisplay error={error} />
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </motion.div>

            {/* Links */}
            <motion.div variants={itemVariants} className="text-center pt-4">
              <div className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  href="/auth/signin"
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </div>
            </motion.div>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="text-center mt-6">
          <p className="text-sm text-gray-500">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="text-primary-600 hover:text-primary-700">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary-600 hover:text-primary-700">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
