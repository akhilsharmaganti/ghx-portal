import { NextRequest, NextResponse } from 'next/server'
import { profileCompletionService } from '@/services/profile/profile-completion.service'

// =====================================================================
// Profile Data API Route
// Provides all profile-related data to the frontend
// Following SOLID principles and REST API best practices
// =====================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = parseInt(searchParams.get('userId') || '1') // Mock user ID for now

    // Fetch all required data in parallel
    const [templates, profileCompletions, overallCompletion] = await Promise.all([
      profileCompletionService.getActiveFormTemplates(),
      profileCompletionService.getUserProfileCompletion(userId),
      profileCompletionService.calculateOverallProfileCompletion(userId)
    ])

    return NextResponse.json({
      success: true,
      data: {
        templates,
        profileCompletions,
        overallCompletion
      }
    })
  } catch (error) {
    console.error('Error fetching profile data:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch profile data'
      },
      { status: 500 }
    )
  }
}
