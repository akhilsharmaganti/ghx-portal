import { Program } from '@/types/programs';

export class ProgramsService {
  // Get all programs
  static async getAllPrograms(): Promise<Program[]> {
    try {
      const response = await fetch('/api/admin/programs');
      if (!response.ok) {
        throw new Error('Failed to fetch programs');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching programs:', error);
      return [];
    }
  }

  // Get program by ID
  static async getProgramById(id: string): Promise<Program | null> {
    try {
      const response = await fetch(`/api/admin/programs/${id}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to fetch program');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching program:', error);
      return null;
    }
  }

  // Create new program
  static async createProgram(programData: Partial<Program>): Promise<Program> {
    try {
      const response = await fetch('/api/admin/programs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(programData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Frontend: API response error:', errorData);
        throw new Error(errorData.details || errorData.error || 'Failed to create program');
      }

      const result = await response.json();
      
      // Fetch the created program to return it
      return await this.getProgramById(result.id.toString()) as Program;
    } catch (error) {
      console.error('Error creating program:', error);
      throw error;
    }
  }

  // Update existing program
  static async updateProgram(id: string, programData: Partial<Program>): Promise<Program> {
    try {
      const response = await fetch(`/api/admin/programs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(programData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update program');
      }

      // Fetch the updated program to return it
      return await this.getProgramById(id) as Program;
    } catch (error) {
      console.error('Error updating program:', error);
      throw error;
    }
  }

  // Delete program (soft delete)
  static async deleteProgram(id: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/admin/programs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete program');
      }

      return true;
    } catch (error) {
      console.error('Error deleting program:', error);
      throw error;
    }
  }

  // Search programs
  static async searchPrograms(query: string): Promise<Program[]> {
    try {
      // For now, we'll search client-side since we're fetching all programs
      // In production, you'd want a dedicated search endpoint
      const allPrograms = await this.getAllPrograms();
      const lowercaseQuery = query.toLowerCase();
      
      return allPrograms.filter(program => 
        program.title.toLowerCase().includes(lowercaseQuery) ||
        program.shortDescription.toLowerCase().includes(lowercaseQuery) ||
        program.theme?.toLowerCase().includes(lowercaseQuery) ||
        program.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
    } catch (error) {
      console.error('Error searching programs:', error);
      return [];
    }
  }

  // Get programs by category
  static async getProgramsByCategory(category: string): Promise<Program[]> {
    try {
      const allPrograms = await this.getAllPrograms();
      return allPrograms.filter(p => p.category === category);
    } catch (error) {
      console.error('Error fetching programs by category:', error);
      return [];
    }
  }

  // Get programs by status
  static async getProgramsByStatus(status: string): Promise<Program[]> {
    try {
      const allPrograms = await this.getAllPrograms();
      return allPrograms.filter(p => p.status === status);
    } catch (error) {
      console.error('Error fetching programs by status:', error);
      return [];
    }
  }

  // Initialize with sample data if empty
  static async initializeSampleData(): Promise<void> {
    try {
      const programs = await this.getAllPrograms();
      
      if (programs.length === 0) {
        console.log('📝 No programs found, but skipping automatic sample data creation for now');
        // Temporarily disabled: await this.createSamplePrograms();
      }
    } catch (error) {
      console.error('Error initializing sample data:', error);
    }
  }

  // Create sample programs
  private static async createSamplePrograms(): Promise<void> {
    const samplePrograms: Partial<Program>[] = [
      {
        title: 'Digital Marketing for Healthcare',
        shortDescription: '8-week workshop on healthcare marketing strategies',
        fullDescription: 'Comprehensive program covering digital marketing fundamentals, healthcare industry specifics, and practical implementation strategies.',
        category: 'WORKSHOP',
        programCategory: 'UPCOMING',
        status: 'DRAFT',
        startDate: '2025-01-15',
        endDate: '2025-03-15',
        maxParticipants: 30,
        currentParticipants: 0,
        requirements: ['Basic marketing knowledge', 'Healthcare industry interest'],
        benefits: ['Industry-specific skills', 'Networking opportunities', 'Practical experience'],
        tags: ['Marketing', 'Healthcare', 'Digital', 'Workshop'],
        theme: 'Digital Marketing',
        whyJoinUs: 'Join a community of healthcare professionals and marketing experts to learn cutting-edge digital strategies.',
        image: '/api/placeholder/400/300?text=Digital+Marketing',
        selectedStartups: []
      },
      {
        title: 'HealthTech Startup Accelerator',
        shortDescription: '12-week intensive program for healthcare startups',
        fullDescription: 'Accelerate your healthcare startup with mentorship, funding opportunities, and industry connections.',
        category: 'ACCELERATOR',
        programCategory: 'OPEN_APPLICATION',
        status: 'DRAFT',
        startDate: '2025-02-01',
        endDate: '2025-05-01',
        maxParticipants: 20,
        currentParticipants: 8,
        requirements: ['Healthcare startup', 'MVP ready', 'Team of 2+'],
        benefits: ['Seed funding', 'Mentorship', 'Industry partnerships'],
        tags: ['Startup', 'Healthcare', 'Funding', 'Mentorship'],
        theme: 'Healthcare Innovation',
        whyJoinUs: 'Transform your healthcare startup with expert guidance and industry connections.',
        image: '/api/placeholder/400/300?text=HealthTech+Accelerator',
        selectedStartups: []
      }
    ];

    for (const programData of samplePrograms) {
      try {
        await this.createProgram(programData);
      } catch (error) {
        console.error('Error creating sample program:', error);
      }
    }
  }
}
