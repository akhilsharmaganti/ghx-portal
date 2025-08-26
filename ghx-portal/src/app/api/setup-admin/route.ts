import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    console.log('🔍 Setting up default admin user...');
    
    // Check if admin user already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { userType: 'ADMIN' }
    });
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists:', existingAdmin.id);
      return NextResponse.json({
        success: true,
        message: 'Admin user already exists',
        adminId: existingAdmin.id,
        timestamp: new Date().toISOString()
      });
    }
    
    // Create default admin user
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@ghx.com',
        passwordHash: 'temp-hash-for-testing', // In production, this should be properly hashed
        firstName: 'Admin',
        lastName: 'User',
        userType: 'ADMIN',
        isActive: true,
        isVerified: true
      }
    });
    
    console.log('✅ Default admin user created with ID:', adminUser.id);
    
    return NextResponse.json({
      success: true,
      message: 'Default admin user created successfully',
      adminId: adminUser.id,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error setting up admin user:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Failed to create admin user',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
