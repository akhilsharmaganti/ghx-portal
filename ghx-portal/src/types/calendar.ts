// Single Responsibility: Define calendar-related types and interfaces

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: EventType;
  description?: string;
  location?: string;
  mentorId?: string;
  programId?: string;
  isBooked: boolean;
  color: string;
  extendedProps: {
    mentorName?: string;
    programTitle?: string;
    meetingLink?: string;
    status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
    notes?: string;
  };
}

export type EventType = 
  | 'PROGRAM_START'
  | 'PROGRAM_END'
  | 'MENTOR_SESSION'
  | 'WORKSHOP'
  | 'DEADLINE'
  | 'MEETING'
  | 'REMINDER';

export interface MentorAvailability {
  id: string;
  mentorId: string;
  mentorName: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // "09:00"
  endTime: string;   // "17:00"
  timeSlots: TimeSlot[];
  isActive: boolean;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  duration: number; // minutes
  isAvailable: boolean;
  isBooked: boolean;
  bookedBy?: string;
  meetingId?: string;
}

export interface Meeting {
  id: string;
  title: string;
  mentorId: string;
  mentorName: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  duration: number; // minutes
  type: 'MENTOR_SESSION' | 'CONSULTATION' | 'WORKSHOP';
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  meetingLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CalendarFilters {
  eventTypes: EventType[];
  mentors: string[];
  programs: string[];
  dateRange: {
    start: Date;
    end: Date;
  };
}

export interface BookingFormData {
  mentorId: string;
  date: Date;
  timeSlot: string;
  duration: number;
  type: 'MENTOR_SESSION' | 'CONSULTATION' | 'WORKSHOP';
  notes?: string;
}
