import { CalendarEvent, MentorAvailability, Meeting } from '@/types/calendar';
import { programData } from './programs';
import { mentorData } from './mentors';

// Single Responsibility: Centralized calendar data management

// Generate calendar events from program data
export const generateProgramEvents = (): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  
  programData.forEach(program => {
    // Program start event
    events.push({
      id: `program-start-${program.id}`,
      title: `${program.title} - Starts`,
      start: new Date(program.startDate),
      end: new Date(program.startDate),
      type: 'PROGRAM_START',
      description: `Program begins today`,
      programId: program.id,
      isBooked: false,
      color: '#3B82F6', // Blue
      extendedProps: {
        programTitle: program.title,
        status: 'SCHEDULED'
      }
    });

    // Program end event
    if (program.endDate) {
      events.push({
        id: `program-end-${program.id}`,
        title: `${program.title} - Ends`,
        start: new Date(program.endDate),
        end: new Date(program.endDate),
        type: 'PROGRAM_END',
        description: `Program concludes today`,
        programId: program.id,
        isBooked: false,
        color: '#EF4444', // Red
        extendedProps: {
          programTitle: program.title,
          status: 'SCHEDULED'
        }
      });
    }
  });

  return events;
};

// Sample mentor availability data
export const mentorAvailabilityData: MentorAvailability[] = [
  {
    id: '1',
    mentorId: '1',
    mentorName: 'Dr. Raju M',
    dayOfWeek: 1, // Monday
    startTime: '09:00',
    endTime: '17:00',
    timeSlots: [
      { id: '1-1', startTime: '09:00', endTime: '09:30', duration: 30, isAvailable: true, isBooked: false },
      { id: '1-2', startTime: '09:30', endTime: '10:00', duration: 30, isAvailable: true, isBooked: false },
      { id: '1-3', startTime: '10:00', endTime: '11:00', duration: 60, isAvailable: true, isBooked: false },
      { id: '1-4', startTime: '11:00', endTime: '12:00', duration: 60, isAvailable: true, isBooked: false },
      { id: '1-5', startTime: '14:00', endTime: '15:00', duration: 60, isAvailable: true, isBooked: false },
      { id: '1-6', startTime: '15:00', endTime: '16:00', duration: 60, isAvailable: true, isBooked: false },
      { id: '1-7', startTime: '16:00', endTime: '17:00', duration: 60, isAvailable: true, isBooked: false }
    ],
    isActive: true
  },
  {
    id: '2',
    mentorId: '2',
    mentorName: 'Ajay Kumar',
    dayOfWeek: 2, // Tuesday
    startTime: '10:00',
    endTime: '18:00',
    timeSlots: [
      { id: '2-1', startTime: '10:00', endTime: '11:00', duration: 60, isAvailable: true, isBooked: false },
      { id: '2-2', startTime: '11:00', endTime: '12:00', duration: 60, isAvailable: true, isBooked: false },
      { id: '2-3', startTime: '14:00', endTime: '15:00', duration: 60, isAvailable: true, isBooked: false },
      { id: '2-4', startTime: '15:00', endTime: '16:00', duration: 60, isAvailable: true, isBooked: false },
      { id: '2-5', startTime: '16:00', endTime: '17:00', duration: 60, isAvailable: true, isBooked: false },
      { id: '2-6', startTime: '17:00', endTime: '18:00', duration: 60, isAvailable: true, isBooked: false }
    ],
    isActive: true
  },
  {
    id: '3',
    mentorId: '3',
    mentorName: 'Joheb Khan',
    dayOfWeek: 3, // Wednesday
    startTime: '09:00',
    endTime: '16:00',
    timeSlots: [
      { id: '3-1', startTime: '09:00', endTime: '10:00', duration: 60, isAvailable: true, isBooked: false },
      { id: '3-2', startTime: '10:00', endTime: '11:00', duration: 60, isAvailable: true, isBooked: false },
      { id: '3-3', startTime: '11:00', endTime: '12:00', duration: 60, isAvailable: true, isBooked: false },
      { id: '3-4', startTime: '13:00', endTime: '14:00', duration: 60, isAvailable: true, isBooked: false },
      { id: '3-5', startTime: '14:00', endTime: '15:00', duration: 60, isAvailable: true, isBooked: false },
      { id: '3-6', startTime: '15:00', endTime: '16:00', duration: 60, isAvailable: true, isBooked: false }
    ],
    isActive: true
  }
];

// Sample meetings data
export const meetingsData: Meeting[] = [
  {
    id: '1',
    title: 'Startup Strategy Session',
    mentorId: '1',
    mentorName: 'Dr. Raju M',
    userId: 'user1',
    startTime: new Date('2025-08-25T10:00:00'),
    endTime: new Date('2025-08-25T11:00:00'),
    duration: 60,
    type: 'MENTOR_SESSION',
    status: 'SCHEDULED',
    notes: 'Discussing go-to-market strategy for healthtech startup',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    createdAt: new Date('2025-08-20T09:00:00'),
    updatedAt: new Date('2025-08-20T09:00:00')
  },
  {
    id: '2',
    title: 'Pitch Deck Review',
    mentorId: '4',
    mentorName: 'Shruti Jain',
    userId: 'user2',
    startTime: new Date('2025-08-26T14:00:00'),
    endTime: new Date('2025-08-26T15:00:00'),
    duration: 60,
    type: 'CONSULTATION',
    status: 'SCHEDULED',
    notes: 'Reviewing investor pitch deck for healthcare startup',
    meetingLink: 'https://meet.google.com/xyz-uvwx-yz',
    createdAt: new Date('2025-08-21T10:00:00'),
    updatedAt: new Date('2025-08-21T10:00:00')
  }
];

// Generate all calendar events
export const generateAllCalendarEvents = (): CalendarEvent[] => {
  const programEvents = generateProgramEvents();
  const meetingEvents = meetingsData.map(meeting => ({
    id: `meeting-${meeting.id}`,
    title: meeting.title,
    start: meeting.startTime,
    end: meeting.endTime,
    type: 'MENTOR_SESSION' as const,
    description: meeting.notes,
    mentorId: meeting.mentorId,
    isBooked: true,
    color: '#10B981', // Green
    extendedProps: {
      mentorName: meeting.mentorName,
      meetingLink: meeting.meetingLink,
      status: meeting.status
    }
  }));

  return [...programEvents, ...meetingEvents];
};

// Utility functions
export const getEventsByDate = (date: Date, events: CalendarEvent[]): CalendarEvent[] => {
  return events.filter(event => {
    const eventDate = new Date(event.start);
    return eventDate.toDateString() === date.toDateString();
  });
};

export const getMentorAvailabilityByDate = (date: Date, availability: MentorAvailability[]): MentorAvailability[] => {
  const dayOfWeek = date.getDay();
  return availability.filter(avail => avail.dayOfWeek === dayOfWeek && avail.isActive);
};
