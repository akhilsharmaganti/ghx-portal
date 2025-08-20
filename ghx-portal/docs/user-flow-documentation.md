# GHX Portal User Flow Documentation

## Overview
This document outlines the complete user flow for the GHX Innovation Exchange Portal. The portal is a comprehensive platform that connects startups, mentors, investors, and seekers in the healthcare innovation ecosystem. It features user authentication, registration, profile management, and will include future form-based workflows.

## Project Architecture Overview

### Technology Stack
- **Frontend**: Next.js 14 with React 18, TypeScript
- **Authentication**: Firebase Authentication
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context API + Zustand
- **Animations**: Framer Motion
- **File Handling**: Firebase Storage (planned)

### Data Architecture
- **Firebase**: User authentication, file storage
- **PostgreSQL**: Business logic, user profiles, application data
- **Integration**: Firebase UID links to PostgreSQL user records

## Phase 1: User Authentication & Registration

### 1. User Registration Flow

**Entry Point**: `/auth/signup`

**Flow**:
1. **Landing Page**: User sees Global HealthX branding and registration form
2. **Form Sections**: Single-page form with three main sections:
   - Personal Information
   - Company Information  
   - Additional Information
3. **Data Collection**: Comprehensive user data including:
   - Basic auth (email, password)
   - Personal details (name, designation, LinkedIn)
   - Company info (name, website, country, stage)
   - Additional data (pitch deck, referral source)
4. **Validation**: Client-side validation with real-time feedback
5. **Submission**: Data sent to Firebase for account creation
6. **Success**: User redirected to email verification

**Technical Implementation**:
- **Registration Form**: Single-page, scrollable form using reusable components
- **Form Components**: Modular UI components (FormField, PasswordField, FileUpload)
- **Validation**: Custom hooks for form validation and error handling
- **File Upload**: PDF pitch deck upload with size and type validation
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### 2. User Authentication Flow

**Entry Point**: `/auth/signin`

**Flow**:
1. **Sign In Form**: Email and password authentication
2. **Validation**: Real-time input validation
3. **Authentication**: Firebase authentication with error handling
4. **Success**: Redirect to user dashboard
5. **Error Handling**: User-friendly error messages with suggestions

**Technical Implementation**:
- **Error Handling**: Centralized Firebase error message mapping
- **User Experience**: Contextual error messages and helpful suggestions
- **Security**: Firebase security rules and authentication state management

### 3. Password Reset Flow

**Entry Point**: `/auth/forgot-password`

**Flow**:
1. **Reset Request**: User enters email address
2. **Email Sent**: Firebase sends password reset email
3. **User Action**: User clicks link in email
4. **Password Update**: User sets new password
5. **Success**: User can sign in with new password

## Phase 2: User Dashboard & Profile Management

### 1. User Dashboard

**Entry Point**: `/dashboard` (after authentication)

**Features**:
- **Welcome Section**: Personalized greeting and quick stats
- **Action Items**: Pending forms, notifications, reminders
- **Recent Activity**: Latest interactions and updates
- **Quick Actions**: Common tasks and shortcuts

**Technical Implementation**:
- **Protected Routes**: Authentication middleware for route protection
- **User Context**: Global user state management
- **Responsive Layout**: Mobile-optimized dashboard interface

### 2. Profile Management

**Entry Point**: `/dashboard/profile`

**Features**:
- **Profile View**: Display current user information
- **Profile Edit**: Update personal and company information
- **File Management**: Upload/update pitch deck and other documents
- **Privacy Settings**: Control information visibility

## Phase 3: Form-Based Workflows (Future Implementation)

### 1. Dynamic Form System

**Overview**: Multi-step form workflows for different user types

**Planned Forms**:
1. **Startup Profile Form** (Post-registration)
2. **Investment Application Form**
3. **Mentorship Request Form**
4. **Partnership Application Form**
5. **Innovation Challenge Submission Form**
6. **Final Profile Completion Form**

**Form Characteristics**:
- **Multi-step Process**: 4-6 forms in sequence
- **Progressive Disclosure**: Forms appear based on user progress
- **Constant Reminders**: Persistent notifications until completion
- **Editable Content**: Users can modify responses anytime

### 2. Form Delivery System

**Admin Control**:
- **Form Assignment**: Admins assign forms to specific users
- **Scheduling**: Set deadlines and reminder frequencies
- **Customization**: Tailor forms for different user segments

**User Experience**:
- **Notification System**: Email and in-app reminders
- **Progress Tracking**: Visual progress indicators
- **Form History**: Access to previously submitted forms

## Technical Architecture

### Component Structure

```
src/
├── app/                    # Next.js app router
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # User dashboard
│   └── admin/            # Admin interface (future)
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── layouts/          # Layout components
│   └── providers/        # Context providers
├── lib/                   # Core libraries
│   ├── firebase.ts       # Firebase configuration
│   ├── prisma.ts         # Database client
│   └── database.ts       # Database utilities
├── types/                 # TypeScript type definitions
├── config/                # Configuration files
├── hooks/                 # Custom React hooks
└── utils/                 # Utility functions
```

### Key Components

#### 1. FormField Component
- **Purpose**: Reusable form input component
- **Features**: Multiple input types (text, email, select, url)
- **Props**: Label, name, type, value, onChange, validation
- **Accessibility**: Proper ARIA labels and error handling

#### 2. PasswordField Component
- **Purpose**: Secure password input with show/hide toggle
- **Features**: Password strength indicator, confirmation field
- **Security**: Minimum length validation, strength requirements

#### 3. FileUpload Component
- **Purpose**: Handle file uploads with validation
- **Features**: File type checking, size validation, preview
- **Supported Types**: PDF, images, documents

#### 4. ErrorDisplay Component
- **Purpose**: Consistent error message display
- **Features**: Contextual suggestions, helpful tips
- **User Experience**: Clear, actionable error messages

### State Management

#### 1. Authentication Context
```typescript
interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signOut: () => Promise<void>
  refreshUser: () => void
}
```

#### 2. Form State Management
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

### Database Schema

#### 1. Users Table (PostgreSQL)
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firebase_uid TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  designation TEXT,
  linkedin_url TEXT,
  company_name TEXT,
  company_website TEXT,
  company_country TEXT,
  company_stage TEXT,
  pitch_deck_url TEXT,
  heard_from TEXT,
  user_type TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 2. Form Submissions Table (Future)
```sql
CREATE TABLE form_submissions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  form_type TEXT NOT NULL,
  form_data JSONB NOT NULL,
  status TEXT DEFAULT 'pending',
  submitted_at TIMESTAMP DEFAULT NOW(),
  reviewed_at TIMESTAMP,
  reviewer_id INTEGER REFERENCES users(id)
);
```

## SOLID Principles Implementation

### Single Responsibility Principle
- **FormField**: Handles only form input rendering and validation
- **PasswordField**: Manages password input and visibility
- **FileUpload**: Handles file selection and validation
- **ErrorDisplay**: Displays error messages and suggestions

### Open/Closed Principle
- **Component System**: New form field types can be added without modifying existing components
- **Validation Rules**: New validation rules can be added to the validation system
- **Form Types**: New form types can be added to the form system

### Liskov Substitution Principle
- **Form Components**: All form components implement the same base interface
- **Validation Hooks**: Different validation hooks can be substituted
- **Error Handlers**: Different error handlers can be used interchangeably

### Interface Segregation Principle
- **Form Props**: Components only receive props they need
- **Validation Interfaces**: Separate interfaces for different validation types
- **Error Interfaces**: Specific error interfaces for different error types

### Dependency Inversion Principle
- **Component Dependencies**: Components depend on interfaces, not concrete implementations
- **Hook Dependencies**: Custom hooks depend on abstract validation rules
- **Service Dependencies**: Services depend on abstract interfaces

## User Experience Design

### 1. Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Breakpoint System**: Consistent responsive breakpoints
- **Touch-Friendly**: Proper touch targets and spacing

### 2. Accessibility
- **ARIA Labels**: Proper accessibility attributes
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Screen reader friendly markup
- **Color Contrast**: WCAG compliant color schemes

### 3. Performance
- **Lazy Loading**: Components load on demand
- **Code Splitting**: Route-based code splitting
- **Image Optimization**: Next.js image optimization
- **Bundle Optimization**: Tree shaking and minification

## Security Implementation

### 1. Authentication Security
- **Firebase Auth**: Industry-standard authentication
- **JWT Tokens**: Secure token-based authentication
- **Password Requirements**: Strong password policies
- **Rate Limiting**: Protection against brute force attacks

### 2. Data Security
- **Input Validation**: Client and server-side validation
- **SQL Injection Protection**: Prisma ORM protection
- **File Upload Security**: File type and size validation
- **HTTPS**: Secure data transmission

### 3. Privacy Protection
- **Data Encryption**: Sensitive data encryption
- **User Consent**: Clear privacy policies
- **Data Access Control**: Role-based access control
- **Audit Logging**: Track data access and changes

## Future Enhancements

### 1. Advanced Features
- **Real-time Chat**: User-to-user communication
- **Video Conferencing**: Integrated meeting system
- **Document Collaboration**: Shared document editing
- **Analytics Dashboard**: User engagement metrics

### 2. Integration Capabilities
- **CRM Integration**: Connect with external CRM systems
- **Payment Processing**: Stripe integration for paid services
- **Email Marketing**: Mailchimp integration for campaigns
- **Social Media**: LinkedIn and Twitter integration

### 3. Mobile Application
- **React Native**: Cross-platform mobile app
- **Push Notifications**: Real-time mobile notifications
- **Offline Support**: Offline form completion
- **Biometric Auth**: Fingerprint and face recognition

## Testing Strategy

### 1. Unit Testing
- **Component Testing**: Test individual components
- **Hook Testing**: Test custom React hooks
- **Utility Testing**: Test utility functions
- **Type Testing**: TypeScript type checking

### 2. Integration Testing
- **API Testing**: Test API endpoints
- **Database Testing**: Test database operations
- **Authentication Testing**: Test auth flows
- **Form Testing**: Test form submission flows

### 3. End-to-End Testing
- **User Journey Testing**: Complete user workflows
- **Cross-browser Testing**: Multiple browser support
- **Mobile Testing**: Mobile device testing
- **Performance Testing**: Load and stress testing

## Deployment & DevOps

### 1. Environment Management
- **Development**: Local development environment
- **Staging**: Pre-production testing environment
- **Production**: Live production environment
- **Environment Variables**: Secure configuration management

### 2. CI/CD Pipeline
- **Automated Testing**: Run tests on every commit
- **Code Quality**: ESLint and Prettier checks
- **Build Process**: Automated build and deployment
- **Rollback Strategy**: Quick rollback capabilities

### 3. Monitoring & Analytics
- **Error Tracking**: Sentry integration for error monitoring
- **Performance Monitoring**: Core Web Vitals tracking
- **User Analytics**: User behavior and engagement metrics
- **Server Monitoring**: Server health and performance

## Conclusion

The GHX Portal provides a comprehensive platform for healthcare innovation ecosystem management. The current implementation focuses on user authentication and registration with a solid foundation for future form-based workflows. The architecture follows modern web development best practices, implements SOLID principles, and provides an excellent user experience across all devices.

The modular component system, comprehensive type safety, and scalable database design ensure that the platform can grow and evolve to meet the changing needs of the healthcare innovation community. The focus on user experience, security, and performance makes it a robust foundation for building a thriving innovation ecosystem.
