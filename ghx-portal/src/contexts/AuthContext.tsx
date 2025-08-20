'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { 
  AuthUser, 
  onAuthStateChange, 
  convertFirebaseUser,
  signOutUser 
} from '@/lib/firebase'
import { User as FirebaseUser } from 'firebase/auth'

// =====================================================================
// Auth Context Types
// =====================================================================

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signOut: () => Promise<void>
  refreshUser: () => void
}

// =====================================================================
// Auth Context
// =====================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// =====================================================================
// Auth Provider Component
// =====================================================================

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  // =====================================================================
  // Auth State Management
  // =====================================================================

  useEffect(() => {
    const unsubscribe = onAuthStateChange((firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // User is signed in
        const authUser = convertFirebaseUser(firebaseUser)
        setUser(authUser)
      } else {
        // User is signed out
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // =====================================================================
  // Auth Actions
  // =====================================================================

  const signOut = async () => {
    try {
      await signOutUser()
      setUser(null)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const refreshUser = () => {
    // This will trigger the auth state change listener
    // and update the user state
  }

  // =====================================================================
  // Context Value
  // =====================================================================

  const value: AuthContextType = {
    user,
    loading,
    signOut,
    refreshUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// =====================================================================
// Auth Hook
// =====================================================================

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// =====================================================================
// Protected Route Hook
// =====================================================================

export function useRequireAuth() {
  const { user, loading } = useAuth()
  
  if (loading) {
    return { user: null, loading: true, requireAuth: false }
  }
  
  if (!user) {
    return { user: null, loading: false, requireAuth: true }
  }
  
  return { user, loading: false, requireAuth: false }
}
