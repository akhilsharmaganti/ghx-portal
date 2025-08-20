# 🚀 GHX Platform Database Setup Guide

## 📋 **Prerequisites**
- Node.js 18+ installed
- PostgreSQL knowledge (basic)
- Neon account (free)

## 🎯 **Step 1: Create Neon Database**

### **1.1 Sign Up for Neon**
1. Go to [neon.tech](https://neon.tech)
2. Click "Sign Up" and use GitHub
3. Verify your email

### **1.2 Create New Project**
1. Click "Create New Project"
2. **Project Name**: `ghx-portal`
3. **Region**: Choose closest to you
4. **Database Name**: `ghx_portal_db`
5. Click "Create Project"

### **1.3 Get Connection String**
1. In your project dashboard, click "Connection Details"
2. Copy the connection string that looks like:
   ```
   postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/database
   ```

## 🔧 **Step 2: Configure Environment**

### **2.1 Create .env.local File**
Create a file named `.env.local` in your `ghx-portal` folder:

```env
# Database Configuration
DATABASE_URL="your-neon-connection-string-here"

# Next.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret-key"

# Firebase Configuration (we'll set this up later)
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""
```

### **2.2 Generate Secret Keys**
```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate JWT_SECRET
openssl rand -base64 32
```

## 🗄️ **Step 3: Apply Database Schema**

### **3.1 Install Prisma CLI**
```bash
cd ghx-portal
npm install -g prisma
```

### **3.2 Initialize Prisma**
```bash
npx prisma init
```

### **3.3 Replace Prisma Schema**
Replace the generated `prisma/schema.prisma` with our comprehensive schema.

### **3.4 Generate Prisma Client**
```bash
npx prisma generate
```

### **3.5 Apply Schema to Database**
```bash
# Option 1: Using Prisma (Recommended)
npx prisma db push

# Option 2: Using SQL file directly
psql "your-neon-connection-string" -f schema_v6.sql
```

### **3.6 Verify Setup**
```bash
# Open Prisma Studio to view your database
npx prisma studio
```

## ✅ **Step 4: Verify Installation**

### **4.1 Check Database Tables**
In Prisma Studio, you should see:
- ✅ Users
- ✅ Organizations
- ✅ Programs
- ✅ Program_Applications
- ✅ Mentor_Categories
- ✅ Mentors
- ✅ Meetings
- ✅ User_Profiles
- ✅ Notifications
- ✅ Audit_Logs

### **4.2 Test Connection**
```bash
# Test database connection
npx prisma db pull
```

## 🚨 **Troubleshooting**

### **Common Issues:**

#### **1. Connection Failed**
- Check your connection string
- Ensure Neon project is active
- Verify network access

#### **2. Schema Push Failed**
- Check for syntax errors in schema
- Ensure database has proper permissions
- Try `npx prisma migrate reset` (⚠️ **WARNING**: This deletes all data!)

#### **3. Prisma Client Generation Failed**
- Delete `node_modules/.prisma` folder
- Run `npm install` again
- Run `npx prisma generate`

## 🔄 **Database Modifications**

### **Adding New Tables**
1. Update `schema_v6.sql`
2. Update `prisma/schema.prisma`
3. Run `npx prisma db push`
4. Run `npx prisma generate`

### **Modifying Existing Tables**
1. Update Prisma schema
2. Run `npx prisma db push`
3. Run `npx prisma generate`

## 📚 **Next Steps**

After successful database setup:

1. **Install Dependencies**: `npm install`
2. **Start Development**: `npm run dev`
3. **Set up Firebase** (for authentication)
4. **Build Admin Dashboard**
5. **Implement User Authentication**

## 🆘 **Need Help?**

- **Prisma Docs**: [pris.ly](https://pris.ly)
- **Neon Docs**: [neon.tech/docs](https://neon.tech/docs)
- **PostgreSQL Docs**: [postgresql.org/docs](https://postgresql.org/docs)

---

**🎉 Congratulations! Your database is now ready for the GHX platform!**
