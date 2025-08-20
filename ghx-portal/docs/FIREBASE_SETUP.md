# 🔥 Firebase Authentication Setup Guide

## 🎯 **Overview**

This guide will help you set up Firebase Authentication for the GHX Innovation Exchange platform. Firebase provides secure, scalable authentication with features like email/password, social login, and password reset.

## 🚀 **Quick Start (5 Minutes)**

### **Step 1: Create Firebase Project**

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project" or select existing project
3. **Project name**: `ghx-portal` (or your preferred name)
4. **Google Analytics**: Enable (recommended)
5. Click "Create project"

### **Step 2: Enable Authentication**

1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get started"
3. Click "Sign-in method" tab
4. Enable "Email/Password" provider
5. Click "Save"

### **Step 3: Get Web App Configuration**

1. Click the gear icon (⚙️) next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps" section
4. Click "Add app" and select the web icon (</>)
5. **App nickname**: `ghx-portal-web`
6. Click "Register app"
7. Copy the configuration object

### **Step 4: Configure Environment Variables**

Create a `.env.local` file in your `ghx-portal` folder:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key-here"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123456789:web:abcdef123456"

# Database Configuration (if you have it)
DATABASE_URL="your-neon-connection-string"

# Next.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-random-secret"
```

## 🔧 **Advanced Configuration**

### **Email Templates**

1. In Firebase Console, go to Authentication > Templates
2. Customize email templates for:
   - Email verification
   - Password reset
   - Email change

### **User Management**

1. Go to Authentication > Users
2. View and manage user accounts
3. Set custom claims for user roles

### **Security Rules**

1. Go to Firestore Database > Rules
2. Configure security rules for user data access

## 📱 **Features Available**

### **Authentication Methods**
- ✅ **Email/Password**: Sign up, sign in, password reset
- ✅ **Email Verification**: Automatic verification emails
- ✅ **Password Reset**: Secure password recovery
- ✅ **User Profiles**: Display names and user types

### **User Types Supported**
- **STARTUP**: Startup founders and teams
- **MENTOR**: Industry experts and advisors
- **INVESTOR**: Investors and funding sources
- **SEEKER**: Innovation seekers and problem owners
- **ADMIN**: Platform administrators

### **Security Features**
- **Email Verification**: Required for account activation
- **Password Requirements**: Minimum 8 characters
- **Session Management**: Automatic token refresh
- **Protected Routes**: Role-based access control

## 🚨 **Troubleshooting**

### **Common Issues**

#### **1. "Firebase not initialized" Error**
- Check that all environment variables are set
- Ensure `.env.local` file is in the correct location
- Restart your development server

#### **2. Authentication Not Working**
- Verify Firebase project is active
- Check Authentication > Sign-in method is enabled
- Ensure email/password provider is configured

#### **3. Environment Variables Not Loading**
- Make sure file is named `.env.local` (not `.env`)
- Restart Next.js development server
- Check for typos in variable names

### **Error Codes**

| Code | Meaning | Solution |
|------|---------|----------|
| `auth/user-not-found` | User doesn't exist | Check email spelling |
| `auth/wrong-password` | Incorrect password | Verify password |
| `auth/email-already-in-use` | Email already registered | Use different email or sign in |
| `auth/weak-password` | Password too weak | Use stronger password |

## 📚 **Next Steps**

After Firebase setup:

1. **Test Authentication**:
   - Sign up with a new account
   - Verify email verification works
   - Test password reset functionality

2. **Configure Database**:
   - Set up Neon PostgreSQL database
   - Run database migrations
   - Seed initial data

3. **Build Features**:
   - Admin dashboard
   - User management
   - Program management

## 🆘 **Need Help?**

- **Firebase Docs**: [firebase.google.com/docs](https://firebase.google.com/docs)
- **Firebase Console**: [console.firebase.google.com](https://console.firebase.google.com)
- **GitHub Issues**: For code problems
- **Firebase Support**: For Firebase-specific issues

---

**🎉 Congratulations! Your Firebase authentication is now ready!**

**Next steps:**
1. Test the authentication flow
2. Set up your database
3. Build the admin dashboard
4. Implement user management features
