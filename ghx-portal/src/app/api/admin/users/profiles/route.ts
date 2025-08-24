import { NextRequest, NextResponse } from 'next/server'
import { profileCompletionService } from '@/services/profile/profile-completion.service'

// =====================================================================
// Admin Users Profiles API Route
// Provides comprehensive profile completion data for admin review
// Following SOLID principles and REST API best practices
// =====================================================================

// =====================================================================
// GET: Retrieve all users' profile completion data
// =====================================================================

export async function GET() {
  try {
    // Mock admin check (replace with actual admin role check when available)
    const isAdmin = true // TODO: Implement proper admin role check
    
    if (!isAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized - Admin access required'
        },
        { status: 403 }
      )
    }

    // Fetch all profile completion data
    const profileCompletions = await profileCompletionService.getAllUsersProfileCompletion()
    const allFormResponses = await profileCompletionService.getAllFormResponses()

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalUsers: profileCompletions.length,
          totalFormResponses: allFormResponses.length,
          averageCompletion: profileCompletions.length > 0 
            ? Math.round(profileCompletions.reduce((sum, pc) => sum + pc.progressPercentage, 0) / profileCompletions.length)
            : 0
        },
        profileCompletions,
        formResponses: allFormResponses
      }
    })
  } catch (error) {
    console.error('Error fetching admin data:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch admin data'
      },
      { status: 500 }
    )
  }
}

// =====================================================================
// POST: Retrieve specific user's profile completion data
// =====================================================================

export async function POST(request: NextRequest) {
  try {
    // Mock admin check (replace with actual admin role check when available)
    const isAdmin = true // TODO: Implement proper admin role check
    
    if (!isAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized - Admin access required'
        },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { userId } = body

    if (!userId || typeof userId !== 'number') {
      return NextResponse.json(
        {
          success: false,
          error: 'Valid userId is required'
        },
        { status: 400 }
      )
    }

    // Fetch specific user's data
    const userProfileCompletions = await profileCompletionService.getUserProfileCompletion(userId)
    const userFormResponses = await profileCompletionService.getUserFormResponses(userId)
    const overallCompletion = await profileCompletionService.calculateOverallProfileCompletion(userId)

    return NextResponse.json({
      success: true,
      data: {
        userId,
        overallCompletion,
        profileCompletions: userProfileCompletions,
        formResponses: userFormResponses
      }
    })
  } catch (error) {
    console.error('Error fetching user data:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch user data'
      },
      { status: 500 }
    )
  }
}
