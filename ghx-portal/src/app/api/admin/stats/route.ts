import { NextRequest } from 'next/server';
import { ApiResponseBuilder, NextApiResponse, ApiErrorHandler, ErrorCode } from '@/lib/api-utils';
import { RouteGuard, AuthContextFactory } from '@/lib/auth/middleware';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// Single Responsibility: Admin statistics data
class AdminStatsService {
  static async getDashboardStats() {
    // TODO: Replace with actual database queries
    return {
      totalUsers: 1247,
      activeUsers: 892,
      newUsersThisMonth: 156,
      totalPrograms: 23,
      activePrograms: 18,
      totalMentors: 45,
      activeMentors: 38,
      upcomingEvents: 12,
      completedEvents: 89,
      userGrowth: {
        thisMonth: 12.5,
        lastMonth: 8.2,
        trend: 'up'
      },
      programEngagement: {
        averageParticipants: 34,
        completionRate: 78.5,
        satisfactionScore: 4.2
      }
    };
  }

  static async getUserStats() {
    return {
      userTypes: {
        innovators: 45,
        investors: 23,
        mentors: 12,
        admins: 3
      },
      statusDistribution: {
        active: 892,
        pending: 156,
        inactive: 199
      },
      registrationTrend: [
        { month: 'Jan', count: 89 },
        { month: 'Feb', count: 102 },
        { month: 'Mar', count: 156 },
        { month: 'Apr', count: 134 },
        { month: 'May', count: 167 },
        { month: 'Jun', count: 189 }
      ]
    };
  }
}

// Single Responsibility: Request handling
export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const authContext = await AuthContextFactory.createFromRequest(request);
    if (!authContext) {
      return NextApiResponse.sendError(
        new Response(),
        ApiErrorHandler.createError(ErrorCode.UNAUTHORIZED, 'Authentication required'),
        401
      );
    }

    // Admin permission check
    try {
      RouteGuard.requireAdmin(authContext);
    } catch (error) {
      return NextApiResponse.sendError(
        new Response(),
        ApiErrorHandler.createError(ErrorCode.FORBIDDEN, 'Admin access required'),
        403
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'dashboard';

    let stats;
    switch (type) {
      case 'dashboard':
        stats = await AdminStatsService.getDashboardStats();
        break;
      case 'users':
        stats = await AdminStatsService.getUserStats();
        break;
      default:
        return NextApiResponse.sendError(
          new Response(),
          ApiErrorHandler.createError(ErrorCode.VALIDATION_FAILED, 'Invalid stats type'),
          422
        );
    }

    // Return success response
    return NextApiResponse.send(
      new Response(),
      ApiResponseBuilder.success(stats, 'Stats retrieved successfully')
    );

  } catch (error) {
    console.error('Admin stats API error:', error);
    
    return NextApiResponse.sendError(
      new Response(),
      ApiErrorHandler.createError(
        ErrorCode.INTERNAL_ERROR,
        'Failed to retrieve admin statistics'
      ),
      500
    );
  }
}
