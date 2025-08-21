import { NextRequest } from 'next/server';
import { ApiResponseBuilder, NextApiResponse, ApiErrorHandler, ErrorCode } from '@/lib/api-utils';
import { RouteGuard, AuthContextFactory } from '@/lib/auth/middleware';
import { RequestValidator } from '@/lib/api-utils';
import { UserFilters } from '@/types/api';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// Single Responsibility: User data management
class UserService {
  private static mockUsers = [
    {
      id: '1',
      email: 'john.innovator@example.com',
      firstName: 'John',
      lastName: 'Smith',
      userType: 'innovator',
      company: 'TechStart Inc.',
      status: 'active',
      createdAt: '2024-01-15T10:30:00Z',
      lastActive: '2024-06-20T14:22:00Z',
      profile: {
        bio: 'Passionate about healthcare innovation',
        expertise: ['AI', 'Machine Learning', 'Healthcare'],
        location: 'San Francisco, CA'
      }
    },
    {
      id: '2',
      email: 'sarah.investor@example.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      userType: 'investor',
      company: 'HealthVentures Capital',
      status: 'active',
      createdAt: '2024-02-20T09:15:00Z',
      lastActive: '2024-06-19T16:45:00Z',
      profile: {
        bio: 'Healthcare investment specialist',
        expertise: ['Venture Capital', 'Healthcare', 'Biotech'],
        location: 'New York, NY'
      }
    },
    {
      id: '3',
      email: 'dr.mike@example.com',
      firstName: 'Mike',
      lastName: 'Chen',
      userType: 'mentor',
      company: 'Medical University',
      status: 'active',
      createdAt: '2024-01-10T11:00:00Z',
      lastActive: '2024-06-20T12:30:00Z',
      profile: {
        bio: 'Experienced healthcare professional',
        expertise: ['Clinical Research', 'Medical Devices', 'Regulatory'],
        location: 'Boston, MA'
      }
    }
  ];

  static async getUsers(filters: UserFilters) {
    let filteredUsers = [...this.mockUsers];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.company.toLowerCase().includes(searchTerm)
      );
    }

    // Apply status filter
    if (filters.status) {
      filteredUsers = filteredUsers.filter(user => user.status === filters.status);
    }

    // Apply user type filter
    if (filters.userType) {
      filteredUsers = filteredUsers.filter(user => user.userType === filters.userType);
    }

    // Apply company filter
    if (filters.company) {
      filteredUsers = filteredUsers.filter(user => 
        user.company.toLowerCase().includes(filters.company!.toLowerCase())
      );
    }

    // Apply date range filter
    if (filters.dateRange?.start || filters.dateRange?.end) {
      filteredUsers = filteredUsers.filter(user => {
        const userDate = new Date(user.createdAt);
        const startDate = filters.dateRange?.start ? new Date(filters.dateRange.start) : null;
        const endDate = filters.dateRange?.end ? new Date(filters.dateRange.end) : null;
        
        if (startDate && userDate < startDate) return false;
        if (endDate && userDate > endDate) return false;
        return true;
      });
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredUsers.sort((a, b) => {
        const aValue = a[filters.sortBy as keyof typeof a];
        const bValue = b[filters.sortBy as keyof typeof b];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return filters.sortOrder === 'desc' 
            ? bValue.localeCompare(aValue)
            : aValue.localeCompare(bValue);
        }
        
        if (aValue < bValue) return filters.sortOrder === 'desc' ? 1 : -1;
        if (aValue > bValue) return filters.sortOrder === 'desc' ? -1 : 1;
        return 0;
      });
    }

    return filteredUsers;
  }

  static async getUserById(id: string) {
    return this.mockUsers.find(user => user.id === id) || null;
  }

  static async updateUser(id: string, updates: Partial<typeof this.mockUsers[0]>) {
    const userIndex = this.mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    this.mockUsers[userIndex] = { ...this.mockUsers[userIndex], ...updates };
    return this.mockUsers[userIndex];
  }

  static async deleteUser(id: string) {
    const userIndex = this.mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) return false;

    this.mockUsers.splice(userIndex, 1);
    return true;
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
      RouteGuard.requirePermission(authContext, 'read:users');
    } catch (error) {
      return NextApiResponse.sendError(
        new Response(),
        ApiErrorHandler.createError(ErrorCode.FORBIDDEN, 'User read permission required'),
        403
      );
    }

    // Parse and validate query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') as any || undefined;
    const userType = searchParams.get('userType') as any || undefined;
    const company = searchParams.get('company') || undefined;
    const sortBy = searchParams.get('sortBy') || undefined;
    const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc';

    // Validate pagination
    const { page: validPage, limit: validLimit } = RequestValidator.validatePagination(page, limit);
    
    // Validate search query
    const validSearch = RequestValidator.validateSearchQuery(search);
    
    // Validate date range
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const dateRange = RequestValidator.validateDateRange(startDate || undefined, endDate || undefined);

    const filters: UserFilters = {
      page: validPage,
      limit: validLimit,
      search: validSearch,
      status,
      userType,
      company,
      sortBy,
      sortOrder,
      dateRange: dateRange || undefined
    };

    // Get users with filters
    const users = await UserService.getUsers(filters);
    
    // Apply pagination
    const startIndex = (validPage - 1) * validLimit;
    const endIndex = startIndex + validLimit;
    const paginatedUsers = users.slice(startIndex, endIndex);

    // Return paginated response
    return NextApiResponse.send(
      new Response(),
      ApiResponseBuilder.paginated(paginatedUsers, validPage, validLimit, users.length)
    );

  } catch (error) {
    console.error('Admin users API error:', error);
    
    return NextApiResponse.sendError(
      new Response(),
      ApiErrorHandler.createError(
        ErrorCode.INTERNAL_ERROR,
        'Failed to retrieve users'
      ),
      500
    );
  }
}

// Single Responsibility: User creation
export async function POST(request: NextRequest) {
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
      RouteGuard.requirePermission(authContext, 'write:users');
    } catch (error) {
      return NextApiResponse.sendError(
        new Response(),
        ApiErrorHandler.createError(ErrorCode.FORBIDDEN, 'User write permission required'),
        403
      );
    }

    // TODO: Implement user creation logic
    return NextApiResponse.send(
      new Response(),
      ApiResponseBuilder.success({ message: 'User creation endpoint - coming soon' })
    );

  } catch (error) {
    console.error('Admin users POST API error:', error);
    
    return NextApiResponse.sendError(
      new Response(),
      ApiErrorHandler.createError(
        ErrorCode.INTERNAL_ERROR,
        'Failed to create user'
      ),
      500
    );
  }
}
