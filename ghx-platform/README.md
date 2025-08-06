# GHX Innovation Exchange Platform

A comprehensive B2B marketplace platform designed to connect healthcare innovators with seekers (hospitals, investors, etc.) in the healthcare and life sciences ecosystem. Built with Next.js, TypeScript, Prisma, and PostgreSQL.

## 🎯 Project Overview

The GHX Innovation Exchange facilitates innovation discovery, validation, and market entry by providing:
- **User Management System** with role-based access control
- **Organization Management** for multi-user entities  
- **Program Enrollment** with admin approval workflows
- **Meeting Scheduling** and calendar integration
- **Notification System** for program updates

## 🏗️ Architecture & Design Principles

This project strictly follows **SOLID principles**:
- **Single Responsibility**: Each module has one clear purpose
- **Open/Closed**: Components are extensible without modification
- **Interface Segregation**: Separate interfaces for different concerns
- **Dependency Inversion**: Depends on abstractions, not concrete implementations

## 📁 Project Structure

```
ghx-platform/
├── prisma/
│   └── schema.prisma              # Database schema (PostgreSQL)
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── api/auth/             # Authentication API routes
│   │   │   ├── [...nextauth]/    # NextAuth.js handler
│   │   │   └── register/         # User registration endpoint
│   │   └── layout.tsx            # Root layout
│   ├── components/ui/            # Reusable UI components
│   │   ├── Button.tsx            # Reusable button component
│   │   ├── Input.tsx             # Reusable input component
│   │   └── Card.tsx              # Reusable card component
│   ├── lib/                      # Utility libraries
│   │   ├── auth.ts               # NextAuth configuration
│   │   └── prisma.ts             # Database connection
│   ├── services/                 # Business logic layer
│   │   └── authService.ts        # Authentication services
│   ├── types/                    # TypeScript type definitions
│   │   └── auth.ts               # Authentication types
│   └── generated/                # Auto-generated Prisma client
└── package.json                  # Dependencies and scripts
```

## 🗄️ Database Schema

The platform uses **PostgreSQL** with the following core tables:

### **Users Table**
- `user_id` (Primary Key)
- `email`, `password_hash`
- `first_name`, `last_name`
- `country`, `state_province`, `city`
- `address_details` (JSONB)
- `created_at`, `last_login_at`

### **Organizations Table**
- `organization_id` (Primary Key)
- `name`, `organization_type`
- `description`, `website_url`, `logo_url`
- Location and address fields
- `is_verified`, `created_at`, `deleted_at`

### **Role Management Tables**
- `User_Ecosystem_Roles` - Individual user roles (guest, mentor, investor)
- `User_Organization_Memberships` - Organization memberships
- `Organization_Applications` - Org creation requests
- `Individual_Role_Applications` - Role assignment requests

### **Program Management**
- `Forms` - Dynamic form structures (JSONB)
- `Cohorts` - Accelerator program cohorts
- `Startup_Details` - Startup-specific information

## 🚀 Features Implemented

### ✅ **Phase 1: Foundation (COMPLETED)**

#### **1. Project Setup**
- Next.js 14 with TypeScript
- Tailwind CSS for styling
- ESLint for code quality
- App Router architecture

#### **2. Database Setup**
- PostgreSQL database connection
- Prisma ORM with full schema
- Database migrations
- Prisma Studio integration (`http://localhost:5555`)

#### **3. Authentication System**
- NextAuth.js configuration
- Credentials provider setup
- User registration API endpoint
- Password hashing with bcryptjs
- TypeScript-compliant auth types

#### **4. Reusable UI Components**
- `<Input />` - Form input with validation
- `<Button />` - Multi-variant button component
- `<Card />` - Content container component
- All components follow SOLID principles

#### **5. Service Layer Architecture**
- `AuthService` - User registration and validation
- Proper error handling
- TypeScript compliance throughout

## 🛠️ Technologies Used

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Credentials provider
- **Security**: bcryptjs for password hashing
- **Development**: ESLint, Prisma Studio

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v18 or higher)
- **PostgreSQL** database running locally
- **npm** or **yarn** package manager

## ⚡ Quick Start

### 1. **Clone and Install**
```bash
# Navigate to the project directory
cd ghx-platform

# Install dependencies
npm install
```

### 2. **Database Setup**
```bash
# Make sure PostgreSQL is running on port 5432
# Update your database credentials in .env file

# Push schema to database
npx prisma db push

# Generate Prisma client
npx prisma generate
```

### 3. **Environment Configuration**
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/ghx_innovation_exchange"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. **Run the Application**
```bash
# Start the development server
npm run dev

# Open http://localhost:3000 in your browser
```

### 5. **View Database (Optional)**
```bash
# Launch Prisma Studio to view/edit database
npx prisma studio

# Open http://localhost:5555 in your browser
```

## 🎯 What's Next?

### **Phase 2: User Interface (PENDING)**
- [ ] Registration page with form validation
- [ ] Login page with NextAuth integration
- [ ] User dashboard with role display
- [ ] Protected routes middleware

### **Phase 3: Role Management (PENDING)**
- [ ] Admin approval workflow
- [ ] Role assignment system
- [ ] Organization creation and management

### **Phase 4: Advanced Features (PENDING)**
- [ ] Notification system
- [ ] Calendar integration
- [ ] Program enrollment workflow
- [ ] Meeting scheduling

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Database
npx prisma studio       # Open database GUI
npx prisma db push      # Push schema changes
npx prisma generate     # Generate Prisma client
npx prisma migrate dev  # Create and apply migration

# Code Quality
npm run lint            # Run ESLint
```

## 🏆 Key Achievements

1. **✅ Zero TypeScript Errors** - Full type safety throughout
2. **✅ SOLID Architecture** - Modular, maintainable codebase
3. **✅ Database Integration** - Complete schema with relationships
4. **✅ Authentication Foundation** - Secure user management system
5. **✅ Reusable Components** - DRY principle implementation

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

This project follows strict coding standards:
- **TypeScript** for type safety
- **SOLID principles** for architecture
- **Component reusability** to avoid code duplication
- **Comprehensive error handling**

---

**Status**: Phase 1 Complete ✅ | Ready for Phase 2 Development 🚀

**Last Updated**: January 2025