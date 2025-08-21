// Single Responsibility: Define program-related types and interfaces

export interface Program {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ProgramCategory;
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
  duration?: string;
}
