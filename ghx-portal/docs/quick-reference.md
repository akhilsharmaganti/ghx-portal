# GHX Portal Quick Reference Guide

## 🚀 Quick Start

### Development Setup
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build
```

### Environment Variables
```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/ghx_portal"
```

## 📁 Project Structure

```
ghx-portal/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── auth/              # Authentication pages
│   │   │   ├── signin/        # Sign in page
│   │   │   ├── signup/        # Registration page
│   │   │   └── forgot-password/ # Password reset
│   │   ├── dashboard/         # User dashboard
│   │   └── admin/             # Admin interface (future)
│   ├── components/            # Reusable components
│   │   ├── ui/                # Base UI components
│   │   │   ├── FormField.tsx  # Form input component
│   │   │   ├── PasswordField.tsx # Password input
│   │   │   ├── FileUpload.tsx # File upload component
│   │   │   ├── ErrorDisplay.tsx # Error message display
│   │   │   └── index.ts       # Component exports
│   │   ├── layouts/           # Layout components
│   │   └── providers/         # Context providers
│   ├── lib/                   # Core libraries
│   │   ├── firebase.ts        # Firebase configuration
│   │   ├── prisma.ts          # Database client
│   │   └── database.ts        # Database utilities
│   ├── types/                 # TypeScript types
│   │   └── registration.ts    # Registration form types
│   ├── config/                # Configuration files
│   │   └── form-options.ts    # Form options and enums
│   ├── hooks/                 # Custom React hooks
│   │   └── useFormValidation.ts # Form validation hook
│   └── utils/                 # Utility functions
├── prisma/                    # Database schema
│   └── schema.prisma          # Prisma schema file
├── public/                    # Static assets
│   └── logo/                  # Logo files
└── docs/                      # Documentation
    ├── user-flow-documentation.md # Complete user flow
    └── quick-reference.md     # This file
```

## 🔧 Key Components

### FormField Component
```typescript
<FormField
  label="Company Name"
  name="companyName"
  type="text"
  value={formData.companyName}
  onChange={handleInputChange}
  placeholder="Enter company name"
  required
  icon={Building}
/>
```

### PasswordField Component
```typescript
<PasswordField
  label="Password"
  name="password"
  value={formData.password}
  onChange={handleInputChange}
  placeholder="Create a password"
  required
  minLength={8}
/>
```

### FileUpload Component
```typescript
<FileUpload
  label="Pitch Deck"
  name="pitchDeck"
  file={formData.pitchDeck}
  onChange={handleFileChange}
  accept=".pdf"
  maxSizeMB={20}
  required
/>
```

## 🗄️ Database Operations

### Prisma Client Usage
```typescript
import { prisma } from '@/lib/database'

// Create user
const user = await prisma.user.create({
  data: {
    firebaseUid: 'firebase_uid_here',
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe'
  }
})

// Find user by Firebase UID
const user = await prisma.user.findUnique({
  where: { firebaseUid: 'firebase_uid_here' }
})
```

### Database Health Check
```typescript
import { checkDatabaseHealth } from '@/lib/database'

const health = await checkDatabaseHealth()
console.log(health.status) // 'healthy' or 'unhealthy'
```

## 🔐 Authentication

### Firebase Auth Usage
```typescript
import { signUp, signIn, signOutUser } from '@/lib/firebase'

// User registration
const user = await signUp({
  email: 'user@example.com',
  password: 'password123',
  firstName: 'John',
  lastName: 'Doe',
  userType: 'STARTUP'
})

// User sign in
const user = await signIn({
  email: 'user@example.com',
  password: 'password123'
})

// User sign out
await signOutUser()
```

### Auth Context Usage
```typescript
import { useAuth } from '@/contexts/AuthContext'

function MyComponent() {
  const { user, loading, signOut } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!user) return <div>Please sign in</div>
  
  return (
    <div>
      Welcome, {user.displayName}!
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
```

## 🎨 Styling

### Tailwind CSS Classes
```typescript
// Common button styles
className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"

// Form container styles
className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"

// Responsive grid
className="grid grid-cols-1 md:grid-cols-2 gap-4"
```

### Custom Colors (defined in tailwind.config.js)
```typescript
// Primary colors
bg-primary-50, bg-primary-100, bg-primary-600, bg-primary-700

// Gray colors
text-gray-600, text-gray-900, border-gray-200
```

## 📱 Responsive Design

### Breakpoints
```typescript
// Mobile first approach
className="w-full max-w-4xl"           // Mobile: full width
className="md:max-w-2xl"               // Tablet+: max width 2xl
className="lg:max-w-4xl"               // Desktop+: max width 4xl
```

### Grid Layouts
```typescript
// Single column on mobile, two columns on larger screens
className="grid grid-cols-1 md:grid-cols-2 gap-4"

// Responsive spacing
className="p-4 md:p-6 lg:p-8"
```

## 🚨 Error Handling

### Firebase Error Messages
```typescript
import { getFirebaseErrorMessage } from '@/lib/firebase'

try {
  await signIn(data)
} catch (error) {
  const message = getFirebaseErrorMessage(error)
  setError(message)
}
```

### Form Validation
```typescript
import { useFormValidation } from '@/hooks/useFormValidation'

const { errors, touched, validateField } = useFormValidation(formData, validationRules)

// Validate specific field
const fieldError = validateField('email', formData.email)
```

## 🔄 State Management

### Form State
```typescript
const [formData, setFormData] = useState<RegistrationFormData>(initialFormData)

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target
  setFormData(prev => ({ ...prev, [name]: value }))
  setError('') // Clear error when user types
}
```

### Loading States
```typescript
const [loading, setLoading] = useState(false)

// In submit handler
setLoading(true)
try {
  await submitForm()
} finally {
  setLoading(false)
}
```

## 📊 Type Definitions

### Registration Form Data
```typescript
interface RegistrationFormData {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  designation: string
  linkedinUrl: string
  companyName: string
  companyWebsite: string
  companyCountry: string
  companyStage: CompanyStage | ''
  pitchDeck: File | null
  heardFrom: HeardFrom | ''
  userType: UserType
}
```

### User Types
```typescript
type UserType = 'STARTUP' | 'MENTOR' | 'INVESTOR' | 'SEEKER'
type CompanyStage = 'IDEA' | 'MVP' | 'EARLY_TRACTION' | 'GROWTH' | 'SCALE' | 'ESTABLISHED'
type HeardFrom = 'SOCIAL_MEDIA' | 'SEARCH_ENGINE' | 'REFERRAL' | 'EVENT' | 'ARTICLE' | 'OTHER'
```

## 🧪 Testing

### Component Testing
```typescript
import { render, screen } from '@testing-library/react'
import { FormField } from '@/components/ui/FormField'

test('FormField renders correctly', () => {
  render(
    <FormField
      label="Test Label"
      name="test"
      type="text"
      value=""
      onChange={() => {}}
    />
  )
  
  expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
})
```

### Hook Testing
```typescript
import { renderHook } from '@testing-library/react'
import { useFormValidation } from '@/hooks/useFormValidation'

test('useFormValidation works correctly', () => {
  const { result } = renderHook(() => useFormValidation(initialData, rules))
  
  expect(result.current.errors).toEqual({})
})
```

## 🚀 Performance Tips

### Code Splitting
```typescript
// Lazy load components
const LazyComponent = dynamic(() => import('./LazyComponent'), {
  loading: () => <div>Loading...</div>
})
```

### Image Optimization
```typescript
import Image from 'next/image'

<Image
  src="/logo/logo.png"
  alt="Logo"
  width={64}
  height={64}
  priority
/>
```

### Bundle Optimization
```typescript
// Use dynamic imports for large libraries
const FramerMotion = dynamic(() => import('framer-motion'), {
  ssr: false
})
```

## 🔍 Debugging

### Development Tools
```typescript
// Console logging in development only
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data)
}

// Error boundaries for React errors
<ErrorBoundary fallback={<ErrorFallback />}>
  <Component />
</ErrorBoundary>
```

### Prisma Debug
```typescript
// Enable query logging in development
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})
```

## 📚 Additional Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Prisma Documentation**: https://www.prisma.io/docs
- **Firebase Documentation**: https://firebase.google.com/docs
- **Tailwind CSS Documentation**: https://tailwindcss.com/docs
- **TypeScript Documentation**: https://www.typescriptlang.org/docs

## 🆘 Common Issues & Solutions

### Issue: Prisma Client not generated
```bash
Solution: Run npx prisma generate
```

### Issue: Firebase config not loading
```bash
Solution: Check .env file and NEXT_PUBLIC_ prefix for client variables
```

### Issue: TypeScript errors in components
```bash
Solution: Run npm run type-check to identify issues
```

### Issue: Slow development compilation
```bash
Solution: Use npm run dev -- --turbo for faster compilation
```

---

**Last Updated**: August 2024  
**Version**: 1.0.0  
**Maintainer**: GHX Development Team
