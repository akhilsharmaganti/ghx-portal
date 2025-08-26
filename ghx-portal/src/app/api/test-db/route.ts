import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Test program count
    const programCount = await prisma.program.count();
    console.log(`📊 Programs in database: ${programCount}`);
    
    // Test user count
    const userCount = await prisma.user.count();
    console.log(`👥 Users in database: ${userCount}`);
    
    // Test if we can create a minimal program (this will help identify the exact issue)
    try {
      const testProgram = await prisma.program.create({
        data: {
          name: 'Test Program',
          description: 'Test description',
          programType: 'WORKSHOP',
          programCategory: 'UPCOMING',
          status: 'DRAFT',
          visibility: 'PUBLIC',
          currentParticipants: 0,
          tags: ['test'],
          createdByAdminId: 4, // Use the admin user we just created
          mentorsRequired: false,
          fundingAvailable: false
        }
      });
      console.log(`✅ Test program created successfully with ID: ${testProgram.id}`);
      
      // Clean up the test program
      await prisma.program.delete({ where: { id: testProgram.id } });
      console.log('🧹 Test program cleaned up');
      
    } catch (createError) {
      console.error('❌ Error creating test program:', createError);
      return NextResponse.json({
        success: false,
        message: 'Database connection successful but program creation failed',
        error: createError instanceof Error ? createError.message : 'Unknown error',
        programCount,
        userCount,
        timestamp: new Date().toISOString()
      });
    }
    
    await prisma.$disconnect();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection and program creation test successful',
      programCount,
      userCount,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
    
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.error('❌ Error disconnecting from database:', disconnectError);
    }
    
    return NextResponse.json({
      success: false,
      message: 'Database test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
