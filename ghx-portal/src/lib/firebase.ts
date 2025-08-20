import { initializeApp, getApps, getApp } from 'firebase/app'
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  User as FirebaseUser,
  onAuthStateChanged,
  NextOrObserver,
  AuthError
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// =====================================================================
// Firebase Configuration
// =====================================================================

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)

// =====================================================================
// Error Handling Utilities
// =====================================================================

export function getFirebaseErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // Check if it's a Firebase Auth error
    if ('code' in error) {
      const authError = error as AuthError
      switch (authError.code) {
        // Sign In Errors
        case 'auth/invalid-credential':
          return 'Invalid email or password. Please check your credentials and try again.'
        case 'auth/user-not-found':
          return 'No account found with this email address. Please sign up first.'
        case 'auth/wrong-password':
          return 'Incorrect password. Please try again.'
        case 'auth/user-disabled':
          return 'This account has been disabled. Please contact support.'
        case 'auth/too-many-requests':
          return 'Too many failed attempts. Please try again later.'
        case 'auth/network-request-failed':
          return 'Network error. Please check your internet connection and try again.'
        
        // Sign Up Errors
        case 'auth/email-already-in-use':
          return 'An account with this email already exists. Please sign in instead.'
        case 'auth/invalid-email':
          return 'Please enter a valid email address.'
        case 'auth/weak-password':
          return 'Password is too weak. Please use at least 8 characters with a mix of letters, numbers, and symbols.'
        case 'auth/operation-not-allowed':
          return 'Email/password accounts are not enabled. Please contact support.'
        
        // Password Reset Errors
        case 'auth/user-mismatch':
          return 'The email address does not match the account you are trying to reset.'
        case 'auth/invalid-action-code':
          return 'The password reset link is invalid or has expired. Please request a new one.'
        case 'auth/expired-action-code':
          return 'The password reset link has expired. Please request a new one.'
        
        // Email Verification Errors
        case 'auth/invalid-verification-code':
          return 'The verification code is invalid. Please check your email and try again.'
        case 'auth/invalid-verification-id':
          return 'The verification link is invalid. Please check your email and try again.'
        
        // General Errors
        case 'auth/requires-recent-login':
          return 'This action requires recent authentication. Please sign in again.'
        case 'auth/account-exists-with-different-credential':
          return 'An account already exists with the same email but different sign-in credentials.'
        case 'auth/credential-already-in-use':
          return 'This credential is already associated with a different user account.'
        case 'auth/operation-not-allowed':
          return 'This operation is not allowed. Please contact support.'
        case 'auth/timeout':
          return 'The operation timed out. Please try again.'
        case 'auth/unavailable':
          return 'The service is currently unavailable. Please try again later.'
        
        // Default case for unknown Firebase errors
        default:
          return `Authentication error: ${authError.message}`
      }
    }
    
    // For non-Firebase errors, return the error message
    return error.message
  }
  
  // For unknown error types
  return 'An unexpected error occurred. Please try again.'
}

// =====================================================================
// Authentication Functions
// =====================================================================

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  emailVerified: boolean
  userType?: 'ADMIN' | 'STARTUP' | 'MENTOR' | 'INVESTOR' | 'SEEKER'
}

export interface SignUpData {
  email: string
  password: string
  firstName: string
  lastName: string
  userType: 'ADMIN' | 'STARTUP' | 'MENTOR' | 'INVESTOR' | 'SEEKER'
  // Additional fields for enhanced registration
  designation?: string
  linkedinUrl?: string
  companyName?: string
  companyWebsite?: string
  companyCountry?: string
  companyStage?: string
  pitchDeck?: File | null
  heardFrom?: string
}

export interface SignInData {
  email: string
  password: string
}

// Sign Up
export async function signUp(data: SignUpData): Promise<AuthUser> {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password)
    
    // Update profile with display name
    await updateProfile(user, {
      displayName: `${data.firstName} ${data.lastName}`,
    })

    // Send email verification
    await sendEmailVerification(user)

    // TODO: Store additional user data in Firestore
    // This would include: designation, linkedinUrl, companyName, companyWebsite, 
    // companyCountry, companyStage, pitchDeck, heardFrom
    // For now, we're just creating the authentication account

    // Convert to our AuthUser format
    const authUser: AuthUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      userType: data.userType,
    }

    return authUser
  } catch (error) {
    throw new Error(getFirebaseErrorMessage(error))
  }
}

// Sign In
export async function signIn(data: SignInData): Promise<AuthUser> {
  try {
    const { user } = await signInWithEmailAndPassword(auth, data.email, data.password)
    
    const authUser: AuthUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    }

    return authUser
  } catch (error) {
    throw new Error(getFirebaseErrorMessage(error))
  }
}

// Sign Out
export async function signOutUser(): Promise<void> {
  try {
    await signOut(auth)
  } catch (error) {
    throw new Error(`Sign out failed: ${getFirebaseErrorMessage(error)}`)
  }
}

// Password Reset
export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    throw new Error(`Password reset failed: ${getFirebaseErrorMessage(error)}`)
  }
}

// Get Current User
export function getCurrentUser(): FirebaseUser | null {
  return auth.currentUser
}

// Auth State Observer
export function onAuthStateChange(callback: NextOrObserver<FirebaseUser>) {
  return onAuthStateChanged(auth, callback)
}

// Convert Firebase User to AuthUser
export function convertFirebaseUser(firebaseUser: FirebaseUser): AuthUser {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    emailVerified: firebaseUser.emailVerified,
  }
}

export default app
