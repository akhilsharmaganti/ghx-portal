import { PrismaClient } from '@prisma/client';

// Single Responsibility: Mentor business logic and data transformation
export class MentorService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Create a new mentor
  async createMentor(mentorData: any) {
    try {
      console.log('🔍 Attempting to create mentor:', mentorData.name);
      
      const prismaData = MentorDataTransformer.transformMentorToPrisma(mentorData);
      console.log('📝 Transformed data for Prisma:', prismaData);

      const mentor = await this.prisma.mentor.create({
        data: prismaData
      });

      console.log('✅ Mentor created successfully with ID:', mentor.id);
      return mentor;
    } catch (error) {
      console.error('❌ Error creating mentor:', error);
      throw new Error(`Failed to create mentor: ${error}`);
    }
  }

  // Get all mentors
  async getAllMentors() {
    try {
      console.log('🔍 Attempting to fetch all mentors from database...');
      
      const mentors = await this.prisma.mentor.findMany({
        orderBy: { createdAt: 'desc' }
      });

      console.log(`📊 Found ${mentors.length} mentors in database`);
      return mentors.map(mentor => MentorDataTransformer.transformPrismaToMentor(mentor));
    } catch (error) {
      console.error('❌ Error fetching mentors:', error);
      throw new Error(`Failed to fetch mentors: ${error}`);
    }
  }

  // Get mentor by ID
  async getMentorById(id: number) {
    try {
      console.log('🔍 Attempting to fetch mentor with ID:', id);
      
      const mentor = await this.prisma.mentor.findUnique({
        where: { id }
      });

      if (!mentor) {
        throw new Error('Mentor not found');
      }

      console.log('✅ Found mentor:', mentor.name);
      return MentorDataTransformer.transformPrismaToMentor(mentor);
    } catch (error) {
      console.error('❌ Error fetching mentor:', error);
      throw new Error(`Failed to fetch mentor: ${error}`);
    }
  }

  // Update mentor
  async updateMentor(id: number, mentorData: any) {
    try {
      console.log('🔍 Attempting to update mentor with ID:', id);
      
      const prismaData = MentorDataTransformer.transformMentorToPrisma(mentorData);
      console.log('📝 Transformed data for Prisma:', prismaData);

      const mentor = await this.prisma.mentor.update({
        where: { id },
        data: prismaData
      });

      console.log('✅ Mentor updated successfully:', mentor.name);
      return MentorDataTransformer.transformPrismaToMentor(mentor);
    } catch (error) {
      console.error('❌ Error updating mentor:', error);
      throw new Error(`Failed to update mentor: ${error}`);
    }
  }

  // Delete mentor
  async deleteMentor(id: number) {
    try {
      console.log('🔍 Attempting to delete mentor with ID:', id);
      
      const mentor = await this.prisma.mentor.delete({
        where: { id }
      });

      console.log('✅ Mentor deleted successfully:', mentor.name);
      return mentor;
    } catch (error) {
      console.error('❌ Error deleting mentor:', error);
      throw new Error(`Failed to delete mentor: ${error}`);
    }
  }
}

// Single Responsibility: Data transformation between frontend and Prisma
export class MentorDataTransformer {
  // Transform frontend mentor data to Prisma format
  static transformMentorToPrisma(mentorData: any) {
    return {
      name: mentorData.name,
      role: mentorData.role,
      company: mentorData.company,
      photo: mentorData.photo,
      linkedinUrl: mentorData.linkedinUrl,
      expertise: mentorData.expertise || []
    };
  }

  // Transform Prisma mentor data to frontend format
  static transformPrismaToMentor(mentor: any) {
    return {
      id: mentor.id.toString(), // Convert to string to match current format
      name: mentor.name,
      role: mentor.role,
      company: mentor.company,
      photo: mentor.photo,
      linkedinUrl: mentor.linkedinUrl,
      expertise: mentor.expertise || []
    };
  }
}
