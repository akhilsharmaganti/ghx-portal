import { PrismaClient } from '@prisma/client'

// =====================================================================
// Database Client Singleton
// =====================================================================

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// =====================================================================
// Database Connection Helper
// =====================================================================

export async function connectDatabase() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully')
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  }
}

export async function disconnectDatabase() {
  try {
    await prisma.$disconnect()
    console.log('✅ Database disconnected successfully')
  } catch (error) {
    console.error('❌ Database disconnection failed:', error)
  }
}

// =====================================================================
// Database Health Check
// =====================================================================

export async function checkDatabaseHealth() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return { status: 'healthy', timestamp: new Date() }
  } catch (error) {
    return { status: 'unhealthy', error: error instanceof Error ? error.message : 'Unknown error', timestamp: new Date() }
  }
}

// =====================================================================
// Transaction Helper
// =====================================================================

export async function withTransaction<T>(
  fn: (tx: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$extends'>) => Promise<T>
): Promise<T> {
  return await prisma.$transaction(fn)
}

// =====================================================================
// Error Handling Helper
// =====================================================================

export function handleDatabaseError(error: unknown): { message: string; code?: string } {
  if (error instanceof Error) {
    // Prisma specific errors
    if ('code' in error) {
      const prismaError = error as { code: string }
      switch (prismaError.code) {
        case 'P2002':
          return { message: 'A record with this unique field already exists', code: 'UNIQUE_CONSTRAINT_VIOLATION' }
        case 'P2003':
          return { message: 'Foreign key constraint violation', code: 'FOREIGN_KEY_VIOLATION' }
        case 'P2025':
          return { message: 'Record not found', code: 'RECORD_NOT_FOUND' }
        case 'P2027':
          return { message: 'Multiple records found when expecting one', code: 'MULTIPLE_RECORDS_FOUND' }
        default:
          return { message: error.message, code: prismaError.code }
      }
    }
    return { message: error.message }
  }
  return { message: 'An unknown database error occurred' }
}

// =====================================================================
// Database Utilities
// =====================================================================

export async function resetDatabase() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Cannot reset database in production environment')
  }
  
  try {
    await prisma.$executeRaw`DROP SCHEMA IF EXISTS public CASCADE`
    await prisma.$executeRaw`CREATE SCHEMA public`
    console.log('✅ Database reset successfully')
    return true
  } catch (error) {
    console.error('❌ Database reset failed:', error)
    return false
  }
}

export async function seedDatabase() {
  try {
    // Insert sample mentor categories
    const categories = await prisma.mentorCategory.createMany({
      data: [
        {
          name: 'Health Technology',
          description: 'Healthcare and medical technology innovations',
          icon: 'heart',
          color: '#FF6B6B'
        },
        {
          name: 'Artificial Intelligence',
          description: 'AI and machine learning applications',
          icon: 'brain',
          color: '#4ECDC4'
        },
        {
          name: 'Biotechnology',
          description: 'Biotech and life sciences',
          icon: 'dna',
          color: '#45B7D1'
        },
        {
          name: 'Digital Health',
          description: 'Digital health solutions and platforms',
          icon: 'monitor',
          color: '#96CEB4'
        },
        {
          name: 'Fintech',
          description: 'Financial technology and innovation',
          icon: 'dollar-sign',
          color: '#FFEAA7'
        }
      ]
    })

    // Insert subcategories
    const subcategories = await prisma.mentorCategory.createMany({
      data: [
        {
          name: 'Telemedicine',
          description: 'Remote healthcare delivery',
          icon: 'video',
          color: '#FF8E8E',
          parentCategoryId: 1
        },
        {
          name: 'Wearable Tech',
          description: 'Health monitoring devices',
          icon: 'watch',
          color: '#FFB3B3',
          parentCategoryId: 1
        },
        {
          name: 'Machine Learning',
          description: 'ML algorithms and applications',
          icon: 'cpu',
          color: '#7FDBDA',
          parentCategoryId: 2
        },
        {
          name: 'Computer Vision',
          description: 'Image and video processing',
          icon: 'eye',
          color: '#B8E6E5',
          parentCategoryId: 2
        }
      ]
    })

    console.log('✅ Database seeded successfully')
    return true
  } catch (error) {
    console.error('❌ Database seeding failed:', error)
    return false
  }
}

// =====================================================================
// Export Types
// =====================================================================

export type { PrismaClient }
export * from '@prisma/client'
