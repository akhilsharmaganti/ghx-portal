import { MentorCardProps } from '@/components/dashboard/mentors';

// Single Responsibility: Centralized mentor data management
export const mentorData: MentorCardProps[] = [
  {
    id: '1',
    name: 'Dr. Raju M',
    role: 'Clinical & HealthTech Advisor',
    company: 'Government of India Mentor',
    photo: '/mentor-images/dr_raju.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/dr-raju-m',
    expertise: ['Clinical Research', 'HealthTech', 'Government Relations']
  },
  {
    id: '2',
    name: 'Vedanarayanan',
    role: 'Marketing Advisor',
    company: 'Ex- Growth Marketer, Healthify',
    photo: '/mentor-images/ved.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/vedanarayanan',
    expertise: ['', 'Digital Marketing', 'Healthcare Marketing']
  },
  {
    id: '3',
    name: 'Addison Appu',
    role: 'Investor Readiness & GTM',
    company: 'Advisor - Managing Partner, Thinkuvate',
    photo: '/mentor-images/appu.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/addison-appu',
    expertise: ['Investor Relations', 'Go-to-Market', 'Strategy']
  },
  {
    id: '4',
    name: 'Shruti Jain',
    role: 'Investor readiness - Founder',
    company: 'Prosperify Advisors',
    photo: '/mentor-images/shruthi.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/shruti-jain',
    expertise: ['Investor Relations', 'Founder Coaching', 'Financial Advisory']
  },
  {
    id: '5',
    name: 'Zoheb Muhammad',
    role: 'Regulatory Advisor',
    company: 'Dr. Reddy\'s Laboratories',
    photo: '/mentor-images/joheb.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/zoheb-muhammad',
    expertise: ['Regulatory Affairs', 'Pharmaceuticals', 'Compliance']
  },
  {
    id: '6',
    name: 'Ajay Rungta',
    role: 'GTM Mentor - Ex-Founding Team',
    company: 'Practo',
    photo: '/mentor-images/ajay.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/ajay-rungta',
    expertise: ['Go-to-Market', 'Startup Growth', 'Healthcare']
  }
];

// Utility function to get mentor by ID
export const getMentorById = (id: string): MentorCardProps | undefined => {
  return mentorData.find(mentor => mentor.id === id);
};

// Utility function to get mentors by expertise
export const getMentorsByExpertise = (expertise: string): MentorCardProps[] => {
  return mentorData.filter(mentor => 
    mentor.expertise.some(exp => 
      exp.toLowerCase().includes(expertise.toLowerCase())
    )
  );
};

// Utility function to get all unique expertise areas
export const getAllExpertise = (): string[] => {
  const allExpertise = mentorData.flatMap(mentor => mentor.expertise);
  return Array.from(new Set(allExpertise));
};
