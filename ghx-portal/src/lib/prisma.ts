import { PrismaClient } from '@prisma/client'

// =====================================================================
// Prisma Client Configuration
// =====================================================================

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Only create Prisma client if we're not in build mode
const createPrismaClient = () => {
  if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
    // In production build without database, return a mock client
    return {} as PrismaClient;
  }
  
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Prevent multiple instances during development
if (process.env.NODE_ENV === 'development') {
  globalForPrisma.prisma = prisma
}
