// Test Notifications API
// This endpoint allows testing the notification system with demo data

import { NextRequest, NextResponse } from 'next/server';
import { notificationService, programNotificationService } from '@/notifications';

// GET /api/test-notifications - Test basic notification service
export async function GET() {
  try {
    console.log('🧪 Testing notification service...');
    
    // Test 1: Basic notification service health check
    const healthCheck = await notificationService.healthCheck();
    
    // Test 2: Send a test notification
    const testResult = await notificationService.send({
      type: 'test_notification',
      recipients: 'all_users',
      content: {
        title: '🧪 Test Notification',
        message: 'This is a test notification to verify the system is working!',
        data: { test: true, timestamp: new Date().toISOString() },
        icon: '🧪',
        action: 'TEST'
      },
      delivery: 'all',
      priority: 'normal'
    });

    return NextResponse.json({
      success: true,
      message: 'Notification service test completed',
      results: {
        healthCheck,
        testNotification: testResult
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Test notification error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// POST /api/test-notifications - Test specific notification types
export async function POST(request: NextRequest) {
  try {
    const { testType, programData } = await request.json();
    
    console.log('🧪 Testing specific notification type:', testType);
    
    let result;
    
    switch (testType) {
      case 'program_created':
        // Test program creation notification
        result = await programNotificationService.notifyProgramCreated({
          id: programData?.id || 999,
          name: programData?.name || 'Test HealthTech Program',
          category: programData?.category || 'ACCELERATOR',
          status: programData?.status || 'PUBLISHED',
          maxParticipants: programData?.maxParticipants || 50,
          currentParticipants: programData?.currentParticipants || 0
        });
        break;
        
      case 'program_updated':
        // Test program update notification
        result = await programNotificationService.notifyProgramUpdated(
          {
            id: programData?.id || 999,
            name: programData?.name || 'Test HealthTech Program',
            category: programData?.category || 'ACCELERATOR',
            status: programData?.status || 'ACTIVE'
          },
          programData?.changes || ['Updated requirements', 'Extended deadline']
        );
        break;
        
      case 'program_status_changed':
        // Test program status change notification
        result = await programNotificationService.notifyProgramStatusChanged(
          {
            id: programData?.id || 999,
            name: programData?.name || 'Test HealthTech Program',
            category: programData?.category || 'ACCELERATOR',
            status: programData?.status || 'PUBLISHED'
          },
          'DRAFT',
          'PUBLISHED'
        );
        break;
        
      case 'program_deadline':
        // Test program deadline notification
        result = await programNotificationService.notifyProgramDeadlineApproaching(
          {
            id: programData?.id || 999,
            name: programData?.name || 'Test HealthTech Program',
            category: programData?.category || 'ACCELERATOR',
            status: programData?.status || 'PUBLISHED'
          },
          programData?.daysLeft || 3
        );
        break;
        
      case 'custom':
        // Test custom notification
        result = await programNotificationService.sendCustomNotification(
          {
            id: programData?.id || 999,
            name: programData?.name || 'Test HealthTech Program',
            category: programData?.category || 'ACCELERATOR',
            status: programData?.status || 'PUBLISHED'
          },
          'custom_event',
          programData?.title || 'Custom Event',
          programData?.message || 'This is a custom notification message'
        );
        break;
        
      default:
        return NextResponse.json(
          { 
            success: false, 
            error: `Unknown test type: ${testType}`,
            timestamp: new Date().toISOString()
          },
          { status: 400 }
        );
    }
    
    return NextResponse.json({
      success: true,
      message: `Test notification '${testType}' sent successfully`,
      testType,
      result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Test notification error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
