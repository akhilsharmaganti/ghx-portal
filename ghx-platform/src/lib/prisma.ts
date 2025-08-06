// Single Responsibility: Database connection management
import { PrismaClient } from '@/generated/prisma';

// Properly declare global type augmentation
declare global {
  var __globalPrisma: PrismaClient | undefined;
}

// Use explicit typing and proper global access
export const prisma: PrismaClient = 
  globalThis.__globalPrisma ?? 
  new PrismaClient({
    log: ['query'],
  });

// Cache the prisma instance in development to prevent multiple connections
if (process.env.NODE_ENV !== 'production') {
  globalThis.__globalPrisma = prisma;
}