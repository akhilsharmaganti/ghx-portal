import { Program } from '@/types/programs';
import { prisma } from '@/lib/prisma';

// Single Responsibility: Handle program data transformation
export class ProgramDataTransformer {
  static transformPrismaToProgram(program: any): Program {
    return {
      id: program.id.toString(),
      title: program.name,
      shortDescription: program.shortDescription || '',
      fullDescription: program.description,
      category: program.category || 'WORKSHOP',
      programCategory: program.programCategory,
      duration: ProgramDataTransformer.calculateDuration(program.startDate, program.endDate),
      requirements: program.requirements as string[] || [],
      benefits: program.benefits as string[] || [],
      startDate: program.startDate?.toISOString().split('T')[0] || '',
      endDate: program.endDate?.toISOString().split('T')[0] || '',
      maxParticipants: program.maxParticipants || 50,
      currentParticipants: program.currentParticipants,
      status: program.status,
      image: program.logoUrl || program.bannerUrl || '/api/placeholder/400/300?text=Program',
      tags: program.tags || [],
      theme: program.theme || '',
      whyJoinUs: program.whyJoinUs || '',
      selectedStartups: program.selectedStartups as any[] || [],
      createdAt: program.createdAt.toISOString(),
      updatedAt: program.updatedAt.toISOString()
    };
  }

  static transformProgramToPrisma(programData: Partial<Program>): any {
    return {
      name: this.truncateString(programData.title || '', 255),
      description: programData.fullDescription || '',
      shortDescription: this.truncateString(programData.shortDescription || '', 500),
      programType: this.mapCategoryToProgramType(programData.category || 'WORKSHOP'),
      category: this.truncateString(programData.category || 'WORKSHOP', 100),
      programCategory: programData.programCategory || 'UPCOMING',
      status: 'DRAFT', // Always start as DRAFT per schema default
      startDate: programData.startDate ? new Date(programData.startDate) : null,
      endDate: programData.endDate ? new Date(programData.endDate) : null,
      maxParticipants: programData.maxParticipants || 50,
      currentParticipants: programData.currentParticipants || 0,
      requirements: programData.requirements || [],
      benefits: programData.benefits || [],
      tags: programData.tags || [],
      theme: this.truncateString(programData.theme || '', 100),
      whyJoinUs: programData.whyJoinUs || '',
      logoUrl: this.truncateString(programData.image || '', 255),
      // Note: createdByAdminId will be set by ProgramService
      selectedStartups: programData.selectedStartups || [],
      // Set required fields with defaults
      visibility: 'PUBLIC',
      mentorsRequired: false,
      fundingAvailable: false,
      // Note: timelines, media, testimonials are handled separately as relations
    };
  }

  private static calculateDuration(startDate: Date | null, endDate: Date | null): string {
    if (!startDate || !endDate) return 'TBD';
    
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) return `${diffDays} days`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks`;
    if (diffDays <= 365) return `${Math.ceil(diffDays / 30)} months`;
    return `${Math.ceil(diffDays / 365)} years`;
  }

  private static mapCategoryToProgramType(category: string): string {
    const mapping: { [key: string]: string } = {
      'ACCELERATOR': 'ACCELERATOR',
      'WORKSHOP': 'WORKSHOP',
      'COMPETITION': 'COMPETITION',
      'MENTORSHIP': 'WORKSHOP',
      'FUNDING': 'WORKSHOP',
      'NETWORKING': 'WORKSHOP',
      'EDUCATION': 'WORKSHOP'
    };
    return mapping[category] || 'WORKSHOP';
  }

  private static truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength - 3) + '...';
  }


}

// Single Responsibility: Handle program business logic
export class ProgramService {
  static async getAllPrograms(): Promise<Program[]> {
    try {
      console.log('🔍 Attempting to fetch programs from database...');
      
      // Test database connection first
      await prisma.$connect();
      console.log('✅ Database connection successful');
      
      const programs = await prisma.program.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' }
      });

      console.log(`📊 Found ${programs.length} programs in database`);
      return programs.map(ProgramDataTransformer.transformPrismaToProgram);
    } catch (error) {
      console.error('❌ Error fetching programs:', error);
      
      // Check if it's a database connection issue
      if (error instanceof Error) {
        if (error.message.includes('connect') || error.message.includes('timeout')) {
          throw new Error('Database connection failed. Please check your database configuration.');
        }
        if (error.message.includes('schema')) {
          throw new Error('Database schema mismatch. Please run database migrations.');
        }
      }
      
      throw new Error(`Failed to fetch programs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      await prisma.$disconnect();
    }
  }

  static async getProgramById(id: string): Promise<Program | null> {
    try {
      console.log(`🔍 Attempting to fetch program with ID: ${id}`);
      
      await prisma.$connect();
      
      const program = await prisma.program.findUnique({
        where: { id: parseInt(id), deletedAt: null }
      });

      if (program) {
        console.log(`✅ Found program: ${program.name}`);
        return ProgramDataTransformer.transformPrismaToProgram(program);
      } else {
        console.log(`❌ Program with ID ${id} not found`);
        return null;
      }
    } catch (error) {
      console.error(`❌ Error fetching program ${id}:`, error);
      throw new Error(`Failed to fetch program: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      await prisma.$disconnect();
    }
  }

  static async createProgram(programData: Partial<Program>): Promise<Program> {
    try {
      console.log('🔍 Attempting to create program:', programData.title);
      
      await prisma.$connect();
      
      // Get or create admin user ID
      const adminUserId = await this.getOrCreateAdminUserId();
      
      const prismaData = ProgramDataTransformer.transformProgramToPrisma(programData);
      // Add the admin user ID to the data
      prismaData.createdByAdminId = adminUserId;
      
      console.log('📝 Transformed data for Prisma:', prismaData);
      
      // Create the main program
      const program = await prisma.program.create({ data: prismaData });
      console.log(`✅ Program created successfully with ID: ${program.id}`);

      // Return the created program
      return await this.getProgramById(program.id.toString()) as Program;
    } catch (error) {
      console.error('❌ Error creating program:', error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('Unique constraint')) {
          throw new Error('A program with this title already exists.');
        }
        if (error.message.includes('Invalid value')) {
          throw new Error('Invalid data provided. Please check your input.');
        }
        if (error.message.includes('connect') || error.message.includes('timeout')) {
          throw new Error('Database connection failed. Please try again.');
        }
      }
      
      throw new Error(`Failed to create program: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      await prisma.$disconnect();
    }
  }

  static async updateProgram(id: string, programData: Partial<Program>): Promise<Program> {
    try {
      console.log(`🔍 Attempting to update program with ID: ${id}`);
      
      await prisma.$connect();
      
      const prismaData = ProgramDataTransformer.transformProgramToPrisma(programData);
      
      // Update the main program
      await prisma.program.update({
        where: { id: parseInt(id) },
        data: prismaData
      });

      console.log(`✅ Program ${id} updated successfully`);

      // Return the updated program
      return await this.getProgramById(id) as Program;
    } catch (error) {
      console.error(`❌ Error updating program ${id}:`, error);
      throw new Error(`Failed to update program: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      await prisma.$disconnect();
    }
  }

  static async deleteProgram(id: string): Promise<void> {
    try {
      console.log(`🔍 Attempting to delete program with ID: ${id}`);
      
      await prisma.$connect();
      
      await prisma.program.update({
        where: { id: parseInt(id) },
        data: { deletedAt: new Date() }
      });

      console.log(`✅ Program ${id} deleted successfully`);
    } catch (error) {
      console.error(`❌ Error deleting program ${id}:`, error);
      throw new Error(`Failed to delete program: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      await prisma.$disconnect();
    }
  }

  private static async getOrCreateAdminUserId(): Promise<number> {
    try {
      // Check if admin user exists
      const existingAdmin = await prisma.user.findFirst({
        where: { userType: 'ADMIN' }
      });
      
      if (existingAdmin) {
        console.log(`✅ Found existing admin user with ID: ${existingAdmin.id}`);
        return existingAdmin.id;
      }
      
      // Create default admin user if none exists
      console.log('🔍 No admin user found, creating default admin...');
      const adminUser = await prisma.user.create({
        data: {
          email: 'admin@ghx.com',
          passwordHash: 'temp-hash-for-testing',
          firstName: 'Admin',
          lastName: 'User',
          userType: 'ADMIN',
          isActive: true,
          isVerified: true
        }
      });
      
      console.log(`✅ Created default admin user with ID: ${adminUser.id}`);
      return adminUser.id;
    } catch (error) {
      console.error('❌ Error getting or creating admin user:', error);
      // Fallback to a default ID (this should not happen in normal operation)
      return 1;
    }
  }
}
