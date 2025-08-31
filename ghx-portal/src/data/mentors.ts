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
    expertise: ['Clinical Research', 'HealthTech', 'Government Relations'],
    description: 'Dr. Raju M is a seasoned clinical research expert with over 20 years of experience in healthcare technology and government relations. He specializes in helping healthtech startups navigate regulatory requirements and establish partnerships with government institutions.'
  },
  {
    id: '2',
    name: 'Vedanarayanan',
    role: 'Marketing Advisor',
    company: 'Ex- Growth Marketer, Healthify',
    photo: '/mentor-images/ved.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/vedanarayanan',
    expertise: ['Digital Marketing', 'Healthcare Marketing', 'Growth Strategy'],
    description: 'Vedanarayanan is a marketing expert with a focus on digital marketing and brand strategy. He has helped numerous startups grow their online presence and has extensive experience in healthcare marketing from his time at Healthify.'
  },
  {
    id: '3',
    name: 'Addison Appu',
    role: 'Investor Readiness & GTM',
    company: 'Advisor - Managing Partner, Thinkuvate',
    photo: '/mentor-images/appu.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/addison-appu',
    expertise: ['Investor Relations', 'Go-to-Market', 'Strategy'],
    description: 'Addison Appu is a strategic advisor specializing in investor readiness and go-to-market strategies. As Managing Partner at Thinkuvate, he helps startups prepare for funding rounds and develop effective market entry strategies.'
  },
  {
    id: '4',
    name: 'Shruti Jain',
    role: 'Investor Readiness - Founder',
    company: 'Prosperify Advisors',
    photo: '/mentor-images/shruthi.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/shruti-jain',
    expertise: ['Investor Relations', 'Founder Coaching', 'Financial Advisory'],
    description: 'Shruti Jain is a founder coach and financial advisor who specializes in helping entrepreneurs prepare for investor meetings. She provides comprehensive guidance on financial planning, pitch deck creation, and investor relations.'
  },
  {
    id: '5',
    name: 'Zoheb Muhammad',
    role: 'Regulatory Advisor',
    company: 'Dr. Reddy\'s Laboratories',
    photo: '/mentor-images/joheb.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/zoheb-muhammad',
    expertise: ['Regulatory Affairs', 'Pharmaceuticals', 'Compliance'],
    description: 'Zoheb Muhammad is a regulatory affairs expert with extensive experience in pharmaceuticals and compliance. He helps healthtech startups understand and navigate complex regulatory requirements in the healthcare industry.'
  },
  {
    id: '6',
    name: 'Ajay Rungta',
    role: 'GTM Mentor - Ex-Founding Team',
    company: 'Practo',
    photo: '/mentor-images/ajay.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/ajay-rungta',
    expertise: ['Go-to-Market', 'Startup Growth', 'Healthcare'],
    description: 'Ajay Rungta is a go-to-market expert who was part of the founding team at Practo. He provides valuable insights on startup growth, healthcare market strategies, and building scalable business models.'
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
