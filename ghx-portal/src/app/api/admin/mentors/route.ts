import { NextRequest, NextResponse } from 'next/server';
import { MentorService } from '@/services/admin/mentors-api.service';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const mentorService = new MentorService();

// GET /api/admin/mentors - Get all mentors
export async function GET() {
  try {
    // Check if we're in build mode
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
      return NextResponse.json([]);
    }
    
    console.log('🔍 API: Received request to fetch all mentors');
    
    const mentors = await mentorService.getAllMentors();
    
    console.log('✅ API: Successfully fetched mentors:', mentors.length);
    return NextResponse.json(mentors);
  } catch (error) {
    console.error('❌ API: Error fetching mentors:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch mentors', 
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// POST /api/admin/mentors - Create new mentor
export async function POST(request: NextRequest) {
  try {
    // Check if we're in build mode
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 });
    }
    
    console.log('🔍 API: Received mentor creation request');
    
    const mentorData = await request.json();
    console.log('📝 API: Mentor data received:', mentorData);
    
    const mentor = await mentorService.createMentor(mentorData);
    
    console.log('✅ API: Mentor created successfully:', mentor.id);
    return NextResponse.json(mentor, { status: 201 });
  } catch (error) {
    console.error('❌ API: Error creating mentor:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create mentor', 
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
