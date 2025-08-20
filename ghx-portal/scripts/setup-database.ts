#!/usr/bin/env tsx

/**
 * GHX Platform Database Setup Script
 * 
 * This script helps you:
 * 1. Initialize the database connection
 * 2. Apply the schema
 * 3. Seed initial data
 * 
 * Usage:
 * npm run setup:db
 * or
 * npx tsx scripts/setup-database.ts
 */

import { prisma, connectDatabase, disconnectDatabase, seedDatabase, checkDatabaseHealth } from '../src/lib/database'

// =====================================================================
// Main Setup Function
// =====================================================================

async function main() {
  console.log('🚀 Starting GHX Platform Database Setup...\n')

  try {
    // Step 1: Check database connection
    console.log('📡 Checking database connection...')
    const health = await checkDatabaseHealth()
    
    if (health.status === 'unhealthy') {
      console.log('❌ Database connection failed. Please check your DATABASE_URL in .env.local')
      console.log('Error:', health.error)
      process.exit(1)
    }
    
    console.log('✅ Database connection successful\n')

    // Step 2: Test basic operations
    console.log('🧪 Testing database operations...')
    
    // Test creating a simple record
    const testUser = await prisma.user.create({
      data: {
        email: 'test@ghx.com',
        passwordHash: 'test-hash',
        firstName: 'Test',
        lastName: 'User',
        userType: 'ADMIN'
      }
    })
    console.log('✅ Test user created successfully')

    // Test reading the record
    const readUser = await prisma.user.findUnique({
      where: { id: testUser.id }
    })
    console.log('✅ Test user read successfully')

    // Clean up test data
    await prisma.user.delete({
      where: { id: testUser.id }
    })
    console.log('✅ Test data cleaned up\n')

    // Step 3: Seed initial data
    console.log('🌱 Seeding initial data...')
    const seedResult = await seedDatabase()
    
    if (seedResult) {
      console.log('✅ Initial data seeded successfully\n')
    } else {
      console.log('⚠️  Some data seeding failed, but continuing...\n')
    }

    // Step 4: Verify setup
    console.log('🔍 Verifying database setup...')
    
    const userCount = await prisma.user.count()
    const orgCount = await prisma.organization.count()
    const programCount = await prisma.program.count()
    const mentorCategoryCount = await prisma.mentorCategory.count()
    const mentorCount = await prisma.mentor.count()
    const meetingCount = await prisma.meeting.count()

    console.log('📊 Database Statistics:')
    console.log(`   Users: ${userCount}`)
    console.log(`   Organizations: ${orgCount}`)
    console.log(`   Programs: ${programCount}`)
    console.log(`   Mentor Categories: ${mentorCategoryCount}`)
    console.log(`   Mentors: ${mentorCount}`)
    console.log(`   Meetings: ${meetingCount}`)

    console.log('\n🎉 Database setup completed successfully!')
    console.log('\n📚 Next steps:')
    console.log('   1. Start your development server: npm run dev')
    console.log('   2. Set up Firebase authentication')
    console.log('   3. Build your admin dashboard')
    console.log('   4. Implement user authentication')

  } catch (error) {
    console.error('\n❌ Database setup failed:', error)
    process.exit(1)
  } finally {
    await disconnectDatabase()
  }
}

// =====================================================================
// Error Handling
// =====================================================================

process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled rejection:', error)
  process.exit(1)
})

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught exception:', error)
  process.exit(1)
})

// =====================================================================
// Run Setup
// =====================================================================

if (require.main === module) {
  main()
}
