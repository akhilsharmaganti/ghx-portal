// Single Responsibility: Define program-related types and interfaces

export interface Program {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string; // Changed to string to match Prisma schema
  programCategory: 'ONGOING' | 'OPEN_APPLICATION' | 'UPCOMING';
  duration: string;
  requirements: string[];
  benefits: string[];
  startDate: string;
  endDate: string;
  maxParticipants: number;
  currentParticipants: number;
  status: ProgramStatus;
  image: string;
  tags: string[];
  theme?: string;
  whyJoinUs?: string;
  selectedStartups?: any[]; // Changed to any[] to match Prisma JSON field
  createdAt: string;
  updatedAt: string;
}

export type ProgramCategory = 
  | 'ONGOING'
  | 'OPEN_APPLICATION'
  | 'UPCOMING';

export type ProgramStatus = 
  | 'DRAFT'
  | 'PUBLISHED'
  | 'ACTIVE'
  | 'COMPLETED'
  | 'ARCHIVED';

export interface ProgramCardProps {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  duration: string;
  startDate: string;
  status: ProgramStatus;
  image: string;
  tags: string[];
  currentParticipants: number;
  maxParticipants: number;
  className?: string;
}

// Enhanced program card props for the dashboard
export interface EnhancedProgramCardProps extends ProgramCardProps {
  variant: 'ongoing' | 'open-application' | 'upcoming';
  theme?: string;
  whyJoinUs?: string;
  hasTestimonials?: boolean;
  hasTimeline?: boolean;
  selectedStartupsCount?: number;
}

export interface ProgramFilters {
  search: string;
  category: string;
  status: ProgramStatus | '';
  duration: string;
}

export interface ProgramSearchParams {
  search?: string;
  category?: string;
  status?: ProgramStatus;
  programCategory?: 'ONGOING' | 'OPEN_APPLICATION' | 'UPCOMING';
  duration?: string;
}

// New interfaces for enhanced program features
export interface AdminContactInfo {
  email?: string;
  phone?: string;
  contactPerson?: string;
  responseTime?: string;
}

export interface SelectedStartup {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  stage: string;
}

export interface ProgramTimeline {
  id: string;
  title: string;
  description?: string;
  eventDate: string;
  eventType: 'demo_day' | 'milestone' | 'check_in' | 'other';
  isImportant: boolean;
  sortOrder: number;
}

export interface ProgramMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  altText?: string;
  caption?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface ProgramTestimonial {
  id: string;
  userName: string;
  userRole?: string;
  userCompany?: string;
  content: string;
  rating?: number;
  cohortYear?: string;
  isApproved: boolean;
  isFeatured: boolean;
}
