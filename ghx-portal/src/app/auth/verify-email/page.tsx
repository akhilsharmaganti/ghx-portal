'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Mail, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || 'your email'
  const [resending, setResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)

  // =====================================================================
  // Resend Email Handler
  // =====================================================================

  const handleResendEmail = async () => {
    setResending(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setResendSuccess(true)
    setResending(false)
    
    // Reset success message after 3 seconds
    setTimeout(() => setResendSuccess(false), 3000)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Verify Your Email
          </h1>
          <p className="text-gray-600">
            We&apos;ve sent a verification link to your email address
          </p>
        </motion.div>

        {/* Verification Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 text-center"
        >
          {/* Email Icon */}
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-primary-600" />
          </div>

          {/* Instructions */}
          <div className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Check Your Inbox
            </h2>
            <p className="text-gray-600">
              We&apos;ve sent a verification email to:
            </p>
            <p className="text-primary-600 font-medium break-all">
              {email}
            </p>
            <p className="text-sm text-gray-500">
              Click the verification link in the email to activate your account.
            </p>
          </div>

          {/* Resend Email Section */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600 mb-4">
              Didn&apos;t receive the email?
            </p>
            
            {resendSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 mb-4"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">Verification email sent!</span>
              </motion.div>
            )}

            <button
              onClick={handleResendEmail}
              disabled={resending}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {resending ? (
                <span className="flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </span>
              ) : (
                'Resend Verification Email'
              )}
            </button>
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div variants={itemVariants} className="mt-6 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-2">
              Need Help?
            </h3>
            <p className="text-sm text-blue-700 mb-3">
              Check your spam folder or contact support if you continue to have issues.
            </p>
            <Link
              href="/support"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </motion.div>

        {/* Back to Sign In */}
        <motion.div variants={itemVariants} className="text-center mt-6">
          <Link
            href="/auth/signin"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            ← Back to Sign In
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
