import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mentorsData = [
  {
    name: 'Dr. Raju M',
    role: 'Clinical & HealthTech Advisor',
    company: 'Government of India Mentor',
    photo: '/mentors/dr-raju-m.jpg',
    linkedinUrl: 'https://linkedin.com/in/dr-raju-m',
    expertise: ['Clinical Research', 'HealthTech', 'Government Relations', 'Healthcare Policy']
  },
  {
    name: 'Vedanarayanan',
    role: 'Marketing Advisor',
    company: 'Ex- Growth Marketer, Healthify',
    photo: '/mentors/vedanarayanan.jpg',
    linkedinUrl: 'https://linkedin.com/in/vedanarayanan',
    expertise: ['Digital Marketing', 'Growth Strategy', 'Healthcare Marketing', 'Brand Strategy']
  },
  {
    name: 'Shruti Jain',
    role: 'Investor Readiness Advisor',
    company: 'Founder Prosperify Advisors',
    photo: '/mentors/shruti-jain.jpg',
    linkedinUrl: 'https://linkedin.com/in/shruti-jain',
    expertise: ['Investor Relations', 'Fundraising', 'Financial Planning', 'Business Strategy']
  },
  {
    name: 'Addison Appu',
    role: 'Investor Readiness & GTM Advisor',
    company: 'Managing Partner, Thinkuvate',
    photo: '/mentors/addison-appu.jpg',
    linkedinUrl: 'https://linkedin.com/in/addison-appu',
    expertise: ['Go-to-Market', 'Investor Relations', 'Business Development', 'Strategic Planning']
  },
  {
    name: 'Zoheb Muhammad',
    role: 'Regulatory Advisor',
    company: 'Dr. Reddy\'s Laboratories',
    photo: '/mentors/zoheb-muhammad.jpg',
    linkedinUrl: 'https://linkedin.com/in/zoheb-muhammad',
    expertise: ['Regulatory Affairs', 'Pharmaceuticals', 'Compliance', 'Quality Assurance']
  },
  {
    name: 'Ajay Rungta',
    role: 'GTM Mentor',
    company: 'Ex- Founding Team, Practo',
    photo: '/mentors/ajay-rungta.jpg',
    linkedinUrl: 'https://linkedin.com/in/ajay-rungta',
    expertise: ['Go-to-Market', 'Healthcare Technology', 'Product Strategy', 'Business Development']
  }
];

async function seedMentors() {
  try {
    console.log('🌱 Starting mentors seed...');

    // Clear existing mentors
    await prisma.mentor.deleteMany({});
    console.log('🗑️  Cleared existing mentors');

    // Create new mentors
    for (const mentorData of mentorsData) {
      const mentor = await prisma.mentor.create({
        data: mentorData
      });
      console.log(`✅ Created mentor: ${mentor.name}`);
    }

    console.log('🎉 Mentors seed completed successfully!');
    console.log(`📊 Created ${mentorsData.length} mentors`);

  } catch (error) {
    console.error('❌ Error seeding mentors:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedMentors()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });



