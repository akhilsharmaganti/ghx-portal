// Single Responsibility: Define program-related types and interfaces

export interface Program {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ProgramCategory;
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
  mentorIds: string[];
  tags: string[];
  theme?: string;
  whyJoinUs?: string;
  adminContactInfo?: AdminContactInfo;
  selectedStartups?: SelectedStartup[];
  importantTimelines?: ProgramTimeline[];
  mediaAssets?: ProgramMedia[];
  testimonials?: ProgramTestimonial[];
  createdAt: string;
  updatedAt: string;
}

export type ProgramCategory = 
  | 'MENTORSHIP'
  | 'ACCELERATOR'
  | 'WORKSHOP'
  | 'FUNDING'
  | 'NETWORKING'
  | 'EDUCATION'
  | 'COMPETITION';

export type ProgramStatus = 
  | 'ACTIVE'
  | 'UPCOMING'
  | 'COMPLETED'
  | 'PAUSED'
  | 'CANCELLED';

export interface ProgramCardProps {
  id: string;
  title: string;
  shortDescription: string;
  category: ProgramCategory;
  duration: string;
  startDate: string;
  status: ProgramStatus;
  image: string;
  tags: string[];
  currentParticipants: number;
  maxParticipants: number;
  className?: string;
}

export interface ProgramFilters {
  search: string;
  category: ProgramCategory | '';
  status: ProgramStatus | '';
  duration: string;
}

export interface ProgramSearchParams {
  search?: string;
  category?: ProgramCategory;
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
