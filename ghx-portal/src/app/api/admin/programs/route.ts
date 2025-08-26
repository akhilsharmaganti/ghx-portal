import { NextRequest, NextResponse } from 'next/server';
import { ProgramService } from '@/services/admin/programs-api.service';

// GET /api/admin/programs - Get all programs
export async function GET() {
  try {
    const programs = await ProgramService.getAllPrograms();
    return NextResponse.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch programs' },
      { status: 500 }
    );
  }
}

// POST /api/admin/programs - Create new program
export async function POST(request: NextRequest) {
  try {
    console.log('🔍 API: Received program creation request');
    const programData = await request.json();
    console.log('📝 API: Program data received:', JSON.stringify(programData, null, 2));
    
    const program = await ProgramService.createProgram(programData);
    console.log('✅ API: Program created successfully:', program.id);
    
    return NextResponse.json(
      { message: 'Program created successfully', id: program.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ API: Error creating program:', error);
    
    // Return more detailed error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('❌ API: Detailed error:', errorMessage);
    
    return NextResponse.json(
      { 
        error: 'Failed to create program',
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
