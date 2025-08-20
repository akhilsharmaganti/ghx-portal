# 🗄️ GHX Platform Database Setup & Management

## 🎯 **Overview**

This document covers the complete database setup for the GHX Innovation Exchange platform, including:
- **Neon PostgreSQL** database setup
- **Prisma ORM** configuration
- **Database schema** management
- **Data seeding** and testing
- **Production deployment** considerations

## 🚀 **Quick Start (5 Minutes)**

### **1. Create Neon Database**
1. Go to [neon.tech](https://neon.tech) and sign up
2. Create project: `ghx-portal`
3. Copy connection string

### **2. Configure Environment**
```bash
# Create .env.local file
cp .env.example .env.local

# Edit .env.local with your Neon connection string
DATABASE_URL="postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/database"
```

### **3. Setup Database**
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed initial data
npm run db:seed
```

### **4. Verify Setup**
```bash
# Open Prisma Studio
npm run db:studio
```

## 📋 **Prerequisites**

- ✅ **Node.js 18+** installed
- ✅ **Git** for version control
- ✅ **Neon account** (free tier available)
- ✅ **Basic PostgreSQL knowledge**

## 🗄️ **Database Architecture**

### **Core Tables**
```
Users                    - User accounts and authentication
Organizations           - Company/startup profiles
Programs                - Accelerators, incubators, challenges
Program_Applications    - Enrollment tracking
Mentor_Categories      - Expertise classification
Mentors                - Mentor profiles and approval
Meetings               - Calendar and scheduling
User_Profiles          - Extended profile information
```

### **Key Features**
- 🔐 **BCNF compliant** (no redundancy)
- 🚀 **Performance optimized** with strategic indexes
- 🔄 **Automatic timestamps** and soft deletes
- 📊 **JSONB fields** for flexible data structures
- 🔗 **Proper foreign key relationships**

## 🎯 **Step-by-Step Setup**

### **Step 1: Neon Database Creation**

#### **1.1 Sign Up**
- Visit [neon.tech](https://neon.tech)
- Click "Sign Up" → Use GitHub
- Verify email address

#### **1.2 Create Project**
- Click "Create New Project"
- **Name**: `ghx-portal`
- **Region**: Choose closest to you
- **Database**: `ghx_portal_db`
- Click "Create Project"

#### **1.3 Get Connection String**
- In dashboard, click "Connection Details"
- Copy the connection string
- Format: `postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/database`

### **Step 2: Environment Configuration**

#### **2.1 Create .env.local**
```bash
# In ghx-portal folder
touch .env.local
```

#### **2.2 Add Configuration**
```env
# Database
DATABASE_URL="your-neon-connection-string"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-random-secret"

# Firebase (we'll set up later)
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
```

#### **2.3 Generate Secrets**
```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate JWT_SECRET
openssl rand -base64 32
```

### **Step 3: Database Schema Setup**

#### **3.1 Generate Prisma Client**
```bash
npm run db:generate
```

#### **3.2 Apply Schema to Database**
```bash
# Option 1: Using Prisma (Recommended)
npm run db:push

# Option 2: Using SQL file directly
psql "your-connection-string" -f schema_v6.sql
```

#### **3.3 Verify Schema**
```bash
# Open Prisma Studio
npm run db:studio
```

### **Step 4: Data Seeding**

#### **4.1 Run Setup Script**
```bash
npm run setup:db
```

#### **4.2 Verify Data**
Check Prisma Studio for:
- ✅ 5 Mentor Categories (Health Tech, AI, Biotech, etc.)
- ✅ 4 Subcategories (Telemedicine, ML, etc.)
- ✅ All tables created successfully

## 🔧 **Database Management**

### **Available Commands**

```bash
# Database Setup
npm run setup:db          # Complete setup and seeding
npm run db:seed           # Seed initial data only

# Prisma Management
npm run db:generate       # Generate Prisma client
npm run db:push          # Push schema changes
npm run db:studio        # Open database browser

# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run type-check       # TypeScript validation
```

### **Schema Modifications**

#### **Adding New Tables**
1. Update `schema_v6.sql`
2. Update `prisma/schema.prisma`
3. Run `npm run db:push`
4. Run `npm run db:generate`

#### **Modifying Existing Tables**
1. Update Prisma schema
2. Run `npm run db:push`
3. Run `npm run db:generate`

### **Data Management**

#### **Reset Database (Development Only)**
```bash
# ⚠️ WARNING: This deletes all data!
npm run db:reset
```

#### **Backup and Restore**
```bash
# Backup
pg_dump "your-connection-string" > backup.sql

# Restore
psql "your-connection-string" < backup.sql
```

## 🚨 **Troubleshooting**

### **Common Issues**

#### **1. Connection Failed**
```bash
# Check connection string format
# Ensure Neon project is active
# Verify network access
```

#### **2. Schema Push Failed**
```bash
# Check for syntax errors
# Verify database permissions
# Try: npm run db:reset (⚠️ deletes data)
```

#### **3. Prisma Client Issues**
```bash
# Delete generated files
rm -rf node_modules/.prisma

# Reinstall and regenerate
npm install
npm run db:generate
```

### **Error Codes**

| Code | Meaning | Solution |
|------|---------|----------|
| P2002 | Unique constraint violation | Check duplicate data |
| P2003 | Foreign key violation | Verify relationships |
| P2025 | Record not found | Check query conditions |
| P2027 | Multiple records found | Use findFirst instead of findUnique |

## 📊 **Database Monitoring**

### **Health Checks**
```bash
# Check database health
npm run setup:db
```

### **Performance Monitoring**
- Use Prisma Studio for query analysis
- Monitor Neon dashboard for usage
- Check query logs in development

## 🚀 **Production Deployment**

### **Environment Variables**
```env
# Production
DATABASE_URL="your-production-neon-url"
NODE_ENV="production"
NEXTAUTH_URL="https://yourdomain.com"
```

### **Database Scaling**
- **Neon Pro**: For higher traffic
- **Read Replicas**: For read-heavy workloads
- **Connection Pooling**: For multiple instances

### **Backup Strategy**
- **Automated Backups**: Neon provides daily backups
- **Point-in-time Recovery**: Available with Neon Pro
- **Manual Backups**: Before major deployments

## 📚 **Resources**

### **Documentation**
- [Prisma Docs](https://pris.ly) - ORM documentation
- [Neon Docs](https://neon.tech/docs) - Database hosting
- [PostgreSQL Docs](https://postgresql.org/docs) - SQL reference

### **Tools**
- **Prisma Studio**: Database browser
- **Neon Console**: Database management
- **pgAdmin**: Advanced PostgreSQL admin

### **Support**
- **GitHub Issues**: For code problems
- **Neon Support**: For database issues
- **Prisma Discord**: For ORM questions

## 🎉 **Success Checklist**

- ✅ Neon database created and connected
- ✅ Environment variables configured
- ✅ Prisma schema applied successfully
- ✅ Initial data seeded
- ✅ Prisma Studio accessible
- ✅ All tables visible and functional
- ✅ Development server running

---

**🚀 Your GHX platform database is now ready for development!**

**Next steps:**
1. Set up Firebase authentication
2. Build admin dashboard
3. Implement user authentication
4. Create program management features
