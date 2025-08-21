// Admin User Types
export interface AdminUser {
  id: string;
  email: string;
  displayName: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'CONTENT_ADMIN' | 'USER_ADMIN';
  permissions: AdminPermission[];
  createdAt: Date;
  lastLoginAt: Date;
}

export interface AdminPermission {
  id: string;
  name: string;
  description: string;
  resource: 'users' | 'programs' | 'mentors' | 'calendar' | 'forms' | 'emails' | 'settings';
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
}

// Admin Dashboard Types
export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  newUsersThisWeek: number;
  activePrograms: number;
  totalMentors: number;
  upcomingEvents: number;
  userEngagementRate: number;
}

export interface AdminActivity {
  id: string;
  type: 'user' | 'program' | 'mentor' | 'calendar' | 'system';
  action: string;
  userId: string;
  userName: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

// Admin Quick Action Types
export interface AdminQuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  actionLabel: string;
  permissions: string[];
}

// Admin Chart Types
export interface AdminChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
  }[];
}

// Admin Filter Types
export interface AdminFilters {
  dateRange: '7d' | '30d' | '90d' | '1y';
  userRole?: string;
  programType?: string;
  mentorExpertise?: string;
  status?: 'active' | 'inactive' | 'pending';
}

// Admin Search Types
export interface AdminSearchParams {
  query: string;
  filters: AdminFilters;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
}

// Admin Notification Types
export interface AdminNotification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}
