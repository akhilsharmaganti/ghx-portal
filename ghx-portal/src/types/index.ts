// User and Authentication Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  organization?: string;
  isActive: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
}

// Firebase AuthUser type that's compatible with our User type
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  userType?: UserRole;
}

// Union type for user that can be either Firebase AuthUser or our User
export type AppUser = AuthUser | User;

export type UserRole = 'ADMIN' | 'STARTUP' | 'MENTOR' | 'INVESTOR' | 'SEEKER';

// Navigation Types
export type TabType = 'dashboard' | 'programs' | 'calendar' | 'profile' | 'mentors';

export interface TabConfig {
  id: TabType;
  label: string;
  icon: string;
  path: string;
  isActive: boolean;
  isVisible: boolean;
}

// Dashboard Types
export interface DashboardStats {
  totalPrograms: number;
  activePrograms: number;
  upcomingEvents: number;
  pendingTasks: number;
  recentActivities: Activity[];
}

export interface Activity {
  id: string;
  type: 'program' | 'meeting' | 'notification' | 'update';
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
}

// Program Types
export interface Program {
  id: string;
  name: string;
  description: string;
  type: ProgramType;
  status: ProgramStatus;
  startDate: Date;
  endDate: Date;
  maxParticipants: number;
  currentParticipants: number;
  requirements: string[];
  benefits: string[];
  applicationDeadline: Date;
  isActive: boolean;
  createdAt: Date;
}

export type ProgramType = 'accelerator' | 'incubator' | 'challenge' | 'workshop' | 'mentorship';
export type ProgramStatus = 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';

// Calendar Types
export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  type: EventType;
  startTime: Date;
  endTime: Date;
  location?: string;
  attendees: string[];
  organizer: string;
  isAllDay: boolean;
  reminderMinutes: number;
}

export type EventType = 'meeting' | 'workshop' | 'deadline' | 'milestone' | 'demo';

// Mentor Types
export interface Mentor {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  expertise: string[];
  experience: number;
  bio: string;
  availability: Availability[];
  rating: number;
  totalSessions: number;
  isAvailable: boolean;
  avatar?: string;
}

export interface Availability {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  timezone: string;
}

// Profile Types
export interface UserProfile {
  userId: string;
  bio: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  socialLinks: SocialLinks;
  preferences: UserPreferences;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  isCurrent: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  gpa?: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
}

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
}

export interface UserPreferences {
  notifications: NotificationPreferences;
  privacy: PrivacySettings;
  theme: 'light' | 'dark' | 'system';
  language: string;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  programUpdates: boolean;
  meetingReminders: boolean;
  mentorRequests: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'connections';
  showEmail: boolean;
  showPhone: boolean;
  showLocation: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'date' | 'file';
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation?: ValidationRule[];
}

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value: any;
  message: string;
}

// Utility Types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  key: string;
  value: any;
  operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan' | 'in';
}
