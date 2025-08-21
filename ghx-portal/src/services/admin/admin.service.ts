import { 
  AdminStats, 
  AdminActivity, 
  AdminUser, 
  AdminNotification,
  AdminSearchParams 
} from '@/types/admin';

// Mock data for development - replace with actual API calls
const mockStats: AdminStats = {
  totalUsers: 1234,
  activeUsers: 987,
  newUsersThisWeek: 156,
  activePrograms: 28,
  totalMentors: 156,
  upcomingEvents: 42,
  userEngagementRate: 89
};

const mockActivities: AdminActivity[] = [
  {
    id: '1',
    type: 'user',
    action: 'registered as a Startup',
    userId: 'user1',
    userName: 'Sarah Johnson',
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    metadata: { userType: 'STARTUP' }
  },
  {
    id: '2',
    type: 'program',
    action: 'applied to Clinical Trials Program',
    userId: 'user2',
    userName: 'Mike Chen',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    metadata: { programName: 'Clinical Trials Program' }
  },
  {
    id: '3',
    type: 'mentor',
    action: 'requested mentor assignment',
    userId: 'user3',
    userName: 'Emily Rodriguez',
    timestamp: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
    metadata: { mentorType: 'Clinical Expert' }
  }
];

const mockNotifications: AdminNotification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'High User Registration Rate',
    message: 'User registrations have increased by 25% this week',
    timestamp: new Date(),
    read: false,
    priority: 'medium'
  },
  {
    id: '2',
    type: 'info',
    title: 'New Program Application',
    message: '5 new applications received for Innovation Challenge',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: false,
    priority: 'low'
  }
];

export class AdminService {
  // Get admin dashboard statistics
  static async getStats(): Promise<AdminStats> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockStats;
  }

  // Get recent admin activities
  static async getRecentActivities(limit: number = 10): Promise<AdminActivity[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockActivities.slice(0, limit);
  }

  // Get admin notifications
  static async getNotifications(): Promise<AdminNotification[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockNotifications;
  }

  // Mark notification as read
  static async markNotificationAsRead(notificationId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const notification = mockNotifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  // Search admin data
  static async search(params: AdminSearchParams): Promise<{
    results: any[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Mock search implementation
    const mockResults = Array.from({ length: 20 }, (_, i) => ({
      id: `result-${i + 1}`,
      title: `Search Result ${i + 1}`,
      description: `This is a mock search result for testing purposes`,
      type: ['user', 'program', 'mentor'][i % 3],
      timestamp: new Date(Date.now() - i * 60 * 60 * 1000)
    }));

    const total = 100;
    const totalPages = Math.ceil(total / params.limit);
    
    return {
      results: mockResults,
      total,
      page: params.page,
      totalPages
    };
  }

  // Get admin users
  static async getAdminUsers(): Promise<AdminUser[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return [
      {
        id: 'admin1',
        email: 'superadmin@ghx.com',
        displayName: 'Super Admin',
        role: 'SUPER_ADMIN',
        permissions: [],
        createdAt: new Date('2024-01-01'),
        lastLoginAt: new Date()
      },
      {
        id: 'admin2',
        email: 'admin@ghx.com',
        displayName: 'Platform Admin',
        role: 'ADMIN',
        permissions: [],
        createdAt: new Date('2024-02-01'),
        lastLoginAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
      }
    ];
  }

  // Update admin user
  static async updateAdminUser(userId: string, updates: Partial<AdminUser>): Promise<AdminUser> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock update - in real implementation, this would update the database
    const user = await this.getAdminUsers().then(users => 
      users.find(u => u.id === userId)
    );
    
    if (!user) {
      throw new Error('Admin user not found');
    }
    
    return { ...user, ...updates };
  }

  // Delete admin user
  static async deleteAdminUser(userId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Mock delete - in real implementation, this would delete from database
    console.log(`Deleting admin user: ${userId}`);
  }
}
