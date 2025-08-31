import { CalendarEvent, Meeting, MentorAvailability, SessionSchedule } from '@/types/calendar';

// Mock data for calendar events
export const calendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'HealthTech Startup Accelerator - Ends',
    start: new Date(2025, 10, 17, 5, 30), // November 17, 2025, 5:30 AM
    end: new Date(2025, 10, 17, 6, 0),
    type: 'PROGRAM_END',
    description: 'Program concludes today',
    isBooked: true,
    color: '#EF4444',
    extendedProps: {
      mentorName: 'Program Coordinator',
      programTitle: 'HealthTech Startup Accelerator',
      status: 'SCHEDULED',
      notes: 'Final day of the accelerator program'
    }
  },
  {
    id: '2',
    title: 'Product Strategy Session',
    start: new Date(2025, 10, 5, 10, 0), // November 5, 2025, 10:00 AM
    end: new Date(2025, 10, 5, 10, 30),
    type: 'MENTOR_SESSION',
    description: 'Product strategy consultation',
    isBooked: true,
    color: '#3B82F6',
    extendedProps: {
      mentorName: 'Vedanarayanan',
      programTitle: 'Product Strategy',
      status: 'SCHEDULED',
      notes: 'Focus on go-to-market strategy'
    }
  },
  {
    id: '3',
    title: 'Marketing Workshop',
    start: new Date(2025, 10, 7, 14, 0), // November 7, 2025, 2:00 PM
    end: new Date(2025, 10, 7, 15, 0),
    type: 'WORKSHOP',
    description: 'Digital marketing strategies',
    isBooked: true,
    color: '#10B981',
    extendedProps: {
      mentorName: 'Marketing Expert',
      programTitle: 'Digital Marketing',
      status: 'SCHEDULED',
      notes: 'Social media and content marketing'
    }
  },
  {
    id: '4',
    title: 'Clinical Research Consultation',
    start: new Date(2025, 10, 9, 11, 0), // November 9, 2025, 11:00 AM
    end: new Date(2025, 10, 9, 11, 30),
    type: 'MENTOR_SESSION',
    description: 'Clinical trial guidance',
    isBooked: true,
    color: '#8B5CF6',
    extendedProps: {
      mentorName: 'Dr. Sarah Johnson',
      programTitle: 'Clinical Research',
      status: 'SCHEDULED',
      notes: 'Protocol development and regulatory compliance'
    }
  },
  {
    id: '5',
    title: 'AI Strategy Session',
    start: new Date(2025, 10, 10, 15, 0), // November 10, 2025, 3:00 PM
    end: new Date(2025, 10, 10, 15, 30),
    type: 'MENTOR_SESSION',
    description: 'AI implementation strategy',
    isBooked: true,
    color: '#F59E0B',
    extendedProps: {
      mentorName: 'Prof. Michael Chen',
      programTitle: 'AI Strategy',
      status: 'SCHEDULED',
      notes: 'Machine learning roadmap and tools'
    }
  },
  {
    id: '6',
    title: 'Funding Strategy Workshop',
    start: new Date(2025, 10, 11, 9, 0), // November 11, 2025, 9:00 AM
    end: new Date(2025, 10, 11, 10, 0),
    type: 'WORKSHOP',
    description: 'Investment and funding strategies',
    isBooked: true,
    color: '#EC4899',
    extendedProps: {
      mentorName: 'Investment Advisor',
      programTitle: 'Funding Strategy',
      status: 'SCHEDULED',
      notes: 'Pitch deck preparation and investor relations'
    }
  },
  {
    id: '7',
    title: 'Regulatory Compliance Session',
    start: new Date(2025, 10, 13, 13, 0), // November 13, 2025, 1:00 PM
    end: new Date(2025, 10, 13, 13, 30),
    type: 'MENTOR_SESSION',
    description: 'Healthcare regulatory guidance',
    isBooked: true,
    color: '#06B6D4',
    extendedProps: {
      mentorName: 'Dr. Emily Rodriguez',
      programTitle: 'Regulatory Affairs',
      status: 'SCHEDULED',
      notes: 'FDA compliance and documentation'
    }
  }
];

// Mock upcoming sessions data (easy to replace)
export const upcomingSessions = [
  {
    id: '1',
    mentorName: 'Ethan Harper',
    mentorPhoto: 'https://ui-avatars.com/api/?name=Ethan+Harper&background=0D9488&color=fff',
    specialisation: 'Product Strategy Expert',
    scheduledDate: '15 October, 2025',
    scheduledTime: '10:00 AM - 10:30 AM',
    status: 'SCHEDULED'
  },
  {
    id: '2',
    mentorName: 'Sophia Carter',
    mentorPhoto: 'https://ui-avatars.com/api/?name=Sophia+Carter&background=1E40AF&color=fff',
    specialisation: 'Product Strategy Expert',
    scheduledDate: '12 October, 2025',
    scheduledTime: '10:00 AM - 10:30 AM',
    status: 'SCHEDULED'
  },
  {
    id: '3',
    mentorName: 'Liam Foster',
    mentorPhoto: 'https://ui-avatars.com/api/?name=Liam+Foster&background=DC2626&color=fff',
    specialisation: 'Product Strategy Expert',
    scheduledDate: '5 October, 2025',
    scheduledTime: '10:00 AM - 10:30 AM',
    status: 'SCHEDULED'
  },
  {
    id: '4',
    mentorName: 'Olivia',
    mentorPhoto: 'https://ui-avatars.com/api/?name=Olivia&background=7C3AED&color=fff',
    specialisation: 'Product Strategy Expert',
    scheduledDate: '4 October, 2025',
    scheduledTime: '10:00 AM - 10:30 AM',
    status: 'SCHEDULED'
  },
  {
    id: '5',
    mentorName: 'Ethan Harper',
    mentorPhoto: 'https://ui-avatars.com/api/?name=Ethan+Harper&background=0D9488&color=fff',
    specialisation: 'Product Strategy Expert',
    scheduledDate: '3 October, 2025',
    scheduledTime: '10:00 AM - 10:30 AM',
    status: 'SCHEDULED'
  }
];

// Mock mentor availability data
export const mentorAvailabilityData: MentorAvailability[] = [
  {
    id: '1',
    mentorId: 'mentor1',
    mentorName: 'Dr. Sarah Johnson',
    dayOfWeek: 1, // Monday
    startTime: '09:00',
    endTime: '17:00',
    isActive: true,
    timeSlots: [
      { id: '1', startTime: '09:00', endTime: '09:30', duration: 30, isAvailable: true, isBooked: false },
      { id: '2', startTime: '10:00', endTime: '10:30', duration: 30, isAvailable: true, isBooked: false },
      { id: '3', startTime: '14:00', endTime: '14:30', duration: 30, isAvailable: true, isBooked: false }
    ]
  }
];

// Mock meetings data
export const meetingsData: Meeting[] = [
  {
    id: '1',
    title: 'Product Strategy Consultation',
    mentorId: 'mentor1',
    mentorName: 'Dr. Sarah Johnson',
    userId: 'user1',
    startTime: new Date(2025, 10, 5, 10, 0),
    endTime: new Date(2025, 10, 5, 10, 30),
    duration: 30,
    type: 'MENTOR_SESSION',
    status: 'SCHEDULED',
    notes: 'Product strategy and go-to-market planning',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock session schedules
export const sessionSchedules: SessionSchedule[] = [
  {
    id: '1',
    date: new Date(2025, 10, 5, 10, 0),
    time: '10:00',
    duration: 30,
    mentorId: 'mentor1',
    mentorName: 'Dr. Sarah Johnson',
    mentorRole: 'Healthcare Innovation Specialist',
    mentorCompany: 'HealthTech Solutions',
    mentorPhoto: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D9488&color=fff',
    mentorLinkedinUrl: 'https://linkedin.com/in/sarahjohnson',
    mentorExpertise: ['Clinical Trials', 'Healthcare Innovation', 'Patient Care'],
    status: 'SCHEDULED',
    notes: 'Product strategy consultation',
    recommendations: ['Focus on market validation', 'Develop clear value proposition'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Generate all calendar events for the calendar view
export const generateAllCalendarEvents = (): CalendarEvent[] => {
  return calendarEvents;
};

// Get upcoming sessions (easy to replace with API call)
export const getUpcomingSessions = () => {
  return upcomingSessions;
};

// Get featured mentor data (Vedanarayanan)
export const getFeaturedMentor = () => {
  return {
    id: 'vedanarayanan',
    name: 'Vedanarayanan',
    role: 'Marketing Advisor',
    company: 'Ex- Growth Marketer, Healthify',
    photo: 'https://ui-avatars.com/api/?name=Vedanarayanan&background=3B82F6&color=fff',
    linkedinUrl: 'https://linkedin.com/in/vedanarayanan',
    expertise: ['Clinical Research', 'HealthTech'],
    description: 'Vedanarayanan is a marketing advisor with extensive experience in Clinical Research and HealthTech. They provide valuable guidance and mentorship to help startups accelerate their growth and achieve their goals. With over 15+ years of experience in helping startups scale, Vedanarayanan has a proven track record of success. They specialize in various sectors including SaaS, e-commerce, and mobile applications. Their academic background includes a Ph.D. in Business Administration, and they are passionate about mentoring the next generation of entrepreneurs.'
  };
};
