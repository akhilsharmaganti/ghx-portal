import { NextRequest, NextResponse } from 'next/server'
import { profileCompletionService } from '@/services/profile/profile-completion.service'

// =====================================================================
// Profile Forms API Route
// Handles form submissions and template retrieval
// Following SOLID principles and REST API best practices
// =====================================================================

// =====================================================================
// GET: Retrieve all active form templates
// =====================================================================

export async function GET() {
  try {
    const templates = await profileCompletionService.getActiveFormTemplates()
    
    return NextResponse.json({
      success: true,
      data: templates
    })
  } catch (error) {
    console.error('Error fetching templates:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch form templates'
      },
      { status: 500 }
    )
  }
}

// =====================================================================
// POST: Submit a form response
// =====================================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { templateId, fieldResponses } = body

    // Validate request data
    if (!templateId || !Array.isArray(fieldResponses)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request data. templateId and fieldResponses are required.'
        },
        { status: 400 }
      )
    }

    // Mock user ID (replace with actual auth when available)
    const mockUserId = 1

    // Submit form response
    const success = await profileCompletionService.submitFormResponse({
      templateId,
      fieldResponses
    }, mockUserId)

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to submit form response'
        },
        { status: 500 }
      )
    }

    // Update profile completion status
    await profileCompletionService.updateProfileCompletion({
      userId: mockUserId,
      templateId,
      completionStatus: 'COMPLETED',
      progressPercentage: 100
    })

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully'
    })
  } catch (error) {
    console.error('Error submitting form:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      },
      { status: 500 }
    )
  }
}
