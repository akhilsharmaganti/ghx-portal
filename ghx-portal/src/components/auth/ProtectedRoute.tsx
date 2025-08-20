'use client'

import React, { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useRequireAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import { Loader2, Shield, LogIn } from 'lucide-react'
import Link from 'next/link'

// =====================================================================
// Protected Route Props
// =====================================================================

interface ProtectedRouteProps {
  children: ReactNode
  requireAuth?: boolean
  allowedRoles?: string[]
  fallback?: ReactNode
}

// =====================================================================
// Protected Route Component
// =====================================================================

export function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  allowedRoles = [],
  fallback 
}: ProtectedRouteProps) {
  const router = useRouter()
  const { user, loading, requireAuth: needsAuth } = useRequireAuth()

  // =====================================================================
  // Loading State
  // =====================================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading...
          </h2>
          <p className="text-gray-600">
            Please wait while we verify your authentication
          </p>
        </motion.div>
      </div>
    )
  }

  // =====================================================================
  // Authentication Check
  // =====================================================================

  if (requireAuth && needsAuth) {
    // User is not authenticated, redirect to sign in
    if (typeof window !== 'undefined') {
      router.push('/auth/signin')
    }
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 text-center max-w-md"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Restricted
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be signed in to access this page.
          </p>
          <Link
            href="/auth/signin"
            className="inline-flex items-center bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Sign In
          </Link>
        </motion.div>
      </div>
    )
  }

  // =====================================================================
  // Role Check
  // =====================================================================

  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.userType || '')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 text-center max-w-md"
        >
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Insufficient Permissions
          </h1>
          <p className="text-gray-600 mb-6">
            You don&apos;t have the required role to access this page.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        </motion.div>
      </div>
    )
  }

  // =====================================================================
  // Custom Fallback
  // =====================================================================

  if (fallback) {
    return <>{fallback}</>
  }

  // =====================================================================
  // Render Protected Content
  // =====================================================================

  return <>{children}</>
}

// =====================================================================
// Admin Route Component
// =====================================================================

export function AdminRoute({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      {children}
    </ProtectedRoute>
  )
}

// =====================================================================
// Mentor Route Component
// =====================================================================

export function MentorRoute({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['ADMIN', 'MENTOR']}>
      {children}
    </ProtectedRoute>
  )
}

// =====================================================================
// Startup Route Component
// =====================================================================

export function StartupRoute({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['ADMIN', 'STARTUP']}>
      {children}
    </ProtectedRoute>
  )
}
