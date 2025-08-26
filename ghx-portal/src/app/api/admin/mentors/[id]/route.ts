import { NextRequest, NextResponse } from 'next/server';
import { MentorService } from '@/services/admin/mentors-api.service';

const mentorService = new MentorService();

// GET /api/admin/mentors/[id] - Get mentor by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    console.log('🔍 API: Received request to fetch mentor with ID:', id);
    
    const mentor = await mentorService.getMentorById(id);
    
    console.log('✅ API: Successfully fetched mentor:', mentor.name);
    return NextResponse.json(mentor);
  } catch (error) {
    console.error('❌ API: Error fetching mentor:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch mentor', 
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// PUT /api/admin/mentors/[id] - Update mentor
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    console.log('🔍 API: Received request to update mentor with ID:', id);
    
    const mentorData = await request.json();
    console.log('📝 API: Mentor update data received:', mentorData);
    
    const mentor = await mentorService.updateMentor(id, mentorData);
    
    console.log('✅ API: Mentor updated successfully:', mentor.name);
    return NextResponse.json(mentor);
  } catch (error) {
    console.error('❌ API: Error updating mentor:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update mentor', 
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/mentors/[id] - Delete mentor
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    console.log('🔍 API: Received request to delete mentor with ID:', id);
    
    const mentor = await mentorService.deleteMentor(id);
    
    console.log('✅ API: Mentor deleted successfully:', mentor.name);
    return NextResponse.json({ message: 'Mentor deleted successfully' });
  } catch (error) {
    console.error('❌ API: Error deleting mentor:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete mentor', 
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
