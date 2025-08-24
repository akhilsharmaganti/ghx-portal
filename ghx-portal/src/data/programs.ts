import { Program, ProgramCardProps } from '@/types/programs';

// Single Responsibility: Centralized program data management
export const programData: Program[] = [
  {
    id: '1',
    title: 'HealthTech Startup Accelerator',
    shortDescription: '12-week intensive program for early-stage healthtech startups',
    fullDescription: 'Our flagship HealthTech Startup Accelerator is designed to help early-stage healthtech companies scale rapidly. This comprehensive program combines mentorship, funding opportunities, and strategic guidance to accelerate your startup\'s growth.',
    category: 'ACCELERATOR',
    programCategory: 'UPCOMING',
    duration: '12 weeks',

    requirements: [
      'Early-stage healthtech startup',
      'Minimum viable product (MVP)',
      'Founding team of 2+ members',
      'Healthcare industry focus'
    ],
    benefits: [
      'Direct access to healthcare investors',
      'Mentorship from industry experts',
      'Workspace and resources',
      'Demo day presentation',
      'Potential funding opportunities'
    ],
    startDate: '2025-08-25',
    endDate: '2025-11-17',
    maxParticipants: 20,
    currentParticipants: 18,
    status: 'UPCOMING',
    image: '/api/placeholder/400/300?text=HealthTech+Accelerator',
    mentorIds: ['1', '3', '4'],
    tags: ['Startup', 'HealthTech', 'Funding', 'Mentorship'],
    createdAt: '2025-07-01',
    updatedAt: '2025-08-15'
  },
  {
    id: '2',
    title: 'Digital Marketing for Healthcare',
    shortDescription: '8-week workshop on healthcare marketing strategies',
    fullDescription: 'Learn the fundamentals of digital marketing specifically tailored for healthcare businesses. This workshop covers SEO, social media, content marketing, and compliance considerations for healthcare marketing.',
    category: 'WORKSHOP',
    programCategory: 'UPCOMING',
    duration: '8 weeks',

    requirements: [
      'Basic understanding of marketing',
      'Healthcare business or interest',
      'Commitment to attend sessions'
    ],
    benefits: [
      'Healthcare-specific marketing strategies',
      'Compliance guidelines',
      'Practical case studies',
      'Networking opportunities',
      'Certificate of completion'
    ],
    startDate: '2025-09-01',
    endDate: '2025-10-27',
    maxParticipants: 30,
    currentParticipants: 25,
    status: 'UPCOMING',
    image: '/api/placeholder/400/300?text=Digital+Marketing',
    mentorIds: ['2'],
    tags: ['Marketing', 'Healthcare', 'Digital', 'Workshop'],
    createdAt: '2025-07-15',
    updatedAt: '2025-08-10'
  },
  {
    id: '3',
    title: 'Regulatory Affairs Masterclass',
    shortDescription: 'Intensive training on healthcare regulations and compliance',
    fullDescription: 'Master the complex world of healthcare regulations with our comprehensive masterclass. Learn about FDA guidelines, international standards, and best practices for maintaining compliance.',
    category: 'EDUCATION',
    programCategory: 'ONGOING',
    duration: '6 weeks',

    requirements: [
      'Healthcare industry experience',
      'Basic understanding of regulations',
      'Professional background'
    ],
    benefits: [
      'Expert-led sessions',
      'Regulatory framework knowledge',
      'Case study analysis',
      'Compliance checklist',
      'Professional certification'
    ],
    startDate: '2025-08-18',
    endDate: '2025-09-29',
    maxParticipants: 25,
    currentParticipants: 22,
    status: 'ACTIVE',
    image: '/api/placeholder/400/300?text=Regulatory+Affairs',
    mentorIds: ['5'],
    tags: ['Regulatory', 'Compliance', 'Healthcare', 'Training'],
    createdAt: '2025-07-10',
    updatedAt: '2025-08-12'
  },
  {
    id: '4',
    title: 'Investor Pitch Deck Workshop',
    shortDescription: 'Learn to create compelling pitch decks for healthcare investors',
    fullDescription: 'Transform your startup pitch into an investor-winning presentation. This workshop teaches you how to structure your story, present data effectively, and handle investor questions.',
    category: 'WORKSHOP',
    programCategory: 'UPCOMING',
    duration: '4 weeks',

    requirements: [
      'Startup idea or business',
      'Basic business plan',
      'Willingness to practice'
    ],
    benefits: [
      'Pitch deck templates',
      'Investor feedback',
      'Presentation skills',
      'Q&A preparation',
      'Networking with investors'
    ],
    startDate: '2025-09-15',
    endDate: '2025-10-14',
    maxParticipants: 35,
    currentParticipants: 28,
    status: 'UPCOMING',
    image: '/api/placeholder/400/300?text=Pitch+Deck',
    mentorIds: ['4', '6'],
    tags: ['Pitch Deck', 'Investors', 'Startup', 'Presentation'],
    createdAt: '2025-07-20',
    updatedAt: '2025-08-08'
  },
  {
    id: '5',
    title: 'Healthcare Innovation Challenge',
    shortDescription: 'Competition for innovative healthcare solutions',
    fullDescription: 'Join our annual Healthcare Innovation Challenge and compete with other innovators to solve real healthcare problems. Winners receive funding, mentorship, and implementation support.',
    category: 'COMPETITION',
    programCategory: 'UPCOMING',
    duration: '16 weeks',

    requirements: [
      'Innovative healthcare solution',
      'Team of 2-5 members',
      'Solution prototype',
      'Problem validation'
    ],
    benefits: [
      'Prize money ($50,000 total)',
      'Mentorship program',
      'Implementation support',
      'Industry recognition',
      'Partnership opportunities'
    ],
    startDate: '2025-10-01',
    endDate: '2026-01-27',
    maxParticipants: 50,
    currentParticipants: 45,
    status: 'UPCOMING',
    image: '/api/placeholder/400/300?text=Innovation+Challenge',
    mentorIds: ['1', '3', '5'],
    tags: ['Innovation', 'Competition', 'Healthcare', 'Funding'],
    createdAt: '2025-08-01',
    updatedAt: '2025-08-01'
  },
  {
    id: '6',
    title: 'Mentor-Mentee Matching Program',
    shortDescription: 'Personalized mentorship program for healthcare entrepreneurs',
    fullDescription: 'Get matched with experienced healthcare mentors who can guide you through your entrepreneurial journey. This program provides personalized guidance and ongoing support.',
    category: 'MENTORSHIP',
    programCategory: 'ONGOING',
    duration: 'Ongoing',

    requirements: [
      'Healthcare business idea',
      'Commitment to growth',
      'Openness to feedback'
    ],
    benefits: [
      'Personalized mentor matching',
      'Regular 1-on-1 sessions',
      'Goal setting and tracking',
      'Progress monitoring',
      'Network expansion'
    ],
    startDate: '2025-08-01',
    endDate: '2025-12-31',
    maxParticipants: 100,
    currentParticipants: 78,
    status: 'ACTIVE',
    image: '/api/placeholder/400/300?text=Mentorship',
    mentorIds: ['1', '2', '3', '4', '5', '6'],
    tags: ['Mentorship', 'Personalized', 'Ongoing', 'Support'],
    createdAt: '2025-07-01',
    updatedAt: '2025-08-15'
  }
];

// Convert to ProgramCardProps for the main tab
export const programCardData: ProgramCardProps[] = programData.map(program => ({
  id: program.id,
  title: program.title,
  shortDescription: program.shortDescription,
  category: program.category,
  duration: program.duration,
  startDate: program.startDate,
  status: program.status,
  image: program.image,
  tags: program.tags,
  currentParticipants: program.currentParticipants,
  maxParticipants: program.maxParticipants
}));

// Enhanced program card data with new features
export interface EnhancedProgramCardData extends ProgramCardProps {
  variant: 'ongoing' | 'open-application' | 'upcoming';
  theme?: string;
  whyJoinUs?: string;
  hasTestimonials?: boolean;
  hasTimeline?: boolean;
  selectedStartupsCount?: number;
}

export const enhancedProgramCardData: EnhancedProgramCardData[] = [
  {
    id: '1',
    title: 'HealthTech Startup Accelerator',
    shortDescription: '12-week intensive program for early-stage healthtech startups',
    category: 'ACCELERATOR',
    duration: '12 weeks',
    startDate: '2025-08-25',
    status: 'UPCOMING',
    image: '/api/placeholder/400/300?text=HealthTech+Accelerator',
    tags: ['Startup', 'HealthTech', 'Funding', 'Mentorship'],
    currentParticipants: 18,
    maxParticipants: 20,
    variant: 'upcoming',
    theme: 'Healthcare Innovation',
    whyJoinUs: 'Join a community of healthcare innovators and get direct access to investors, mentors, and resources to scale your startup.',
    hasTestimonials: true,
    hasTimeline: true
  },
  {
    id: '2',
    title: 'Digital Marketing for Healthcare',
    shortDescription: '8-week workshop on healthcare marketing strategies',
    category: 'WORKSHOP',
    duration: '8 weeks',
    startDate: '2025-09-01',
    status: 'UPCOMING',
    image: '/api/placeholder/400/300?text=Digital+Marketing',
    tags: ['Marketing', 'Healthcare', 'Digital', 'Workshop'],
    currentParticipants: 25,
    maxParticipants: 30,
    variant: 'upcoming',
    theme: 'Digital Marketing',
    whyJoinUs: 'Learn healthcare-specific marketing strategies from industry experts and gain practical skills for your business.',
    hasTestimonials: false,
    hasTimeline: true
  },
  {
    id: '3',
    title: 'Regulatory Affairs Masterclass',
    shortDescription: 'Intensive training on healthcare regulations and compliance',
    category: 'EDUCATION',
    duration: '6 weeks',
    startDate: '2025-08-18',
    status: 'ACTIVE',
    image: '/api/placeholder/400/300?text=Regulatory+Affairs',
    tags: ['Regulatory', 'Compliance', 'Healthcare', 'Training'],
    currentParticipants: 22,
    maxParticipants: 25,
    variant: 'ongoing',
    theme: 'Regulatory Compliance',
    whyJoinUs: 'Master healthcare regulations and compliance with expert-led sessions and practical case studies.',
    hasTestimonials: true,
    hasTimeline: true,
    selectedStartupsCount: 5
  },
  {
    id: '4',
    title: 'Healthcare Innovation Challenge',
    shortDescription: 'Competition for innovative healthcare solutions',
    category: 'COMPETITION',
    duration: '10 weeks',
    startDate: '2025-10-01',
    status: 'UPCOMING',
    image: '/api/placeholder/400/300?text=Innovation+Challenge',
    tags: ['Innovation', 'Competition', 'Healthcare', 'Solutions'],
    currentParticipants: 0,
    maxParticipants: 50,
    variant: 'open-application',
    theme: 'Innovation',
    whyJoinUs: 'Compete with the best healthcare innovators and win funding, mentorship, and industry recognition.',
    hasTestimonials: true,
    hasTimeline: true
  },
  {
    id: '5',
    title: 'Mentor-Mentee Matching Program',
    shortDescription: 'Personalized mentorship program for healthcare entrepreneurs',
    category: 'MENTORSHIP',
    duration: 'Ongoing',
    startDate: '2025-08-01',
    status: 'ACTIVE',
    image: '/api/placeholder/400/300?text=Mentorship',
    tags: ['Mentorship', 'Healthcare', 'Entrepreneurship', 'Networking'],
    currentParticipants: 45,
    maxParticipants: 100,
    variant: 'ongoing',
    theme: 'Mentorship',
    whyJoinUs: 'Get personalized guidance from experienced healthcare mentors to accelerate your entrepreneurial journey.',
    hasTestimonials: true,
    hasTimeline: false,
    selectedStartupsCount: 8
  }
];

// Utility functions
export const getProgramById = (id: string): Program | undefined => {
  return programData.find(program => program.id === id);
};

export const getProgramsByCategory = (category: string): ProgramCardProps[] => {
  return programCardData.filter(program => 
    program.category.toLowerCase() === category.toLowerCase()
  );
};

export const getProgramsByStatus = (status: string): ProgramCardProps[] => {
  return programCardData.filter(program => 
    program.status.toLowerCase() === status.toLowerCase()
  );
};

export const getAllCategories = (): string[] => {
  return Array.from(new Set(programData.map(program => program.category)));
};

export const getAllStatuses = (): string[] => {
  return Array.from(new Set(programData.map(program => program.status)));
};
