// Single Responsibility: User registration API endpoint
import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/authService';
import { RegisterFormData } from '@/types/auth';

export async function POST(request: NextRequest) {
  try {
    const body: RegisterFormData = await request.json();
    
    // Basic validation
    if (!body.email || !body.password || !body.firstName || !body.lastName) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    if (body.password !== body.confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'Passwords do not match' },
        { status: 400 }
      );
    }

    if (body.password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const result = await AuthService.registerUser(body);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}