import { prisma } from '@/lib/prisma'

// =====================================================================
// Profile Completion Service
// Handles all database operations for form templates, responses, and completion tracking
// Following SOLID principles: Single Responsibility, Open/Closed, Interface Segregation
// =====================================================================

// =====================================================================
// Types and Interfaces
// =====================================================================

export interface FormTemplateData {
  id: number
  name: string
  description: string | null
  version: number
  isActive: boolean
  sections: FormSectionData[]
}

export interface FormSectionData {
  id: number
  name: string
  description: string | null
  orderIndex: number
  isRequired: boolean
  fields: FormFieldData[]
}

export interface FormFieldData {
  id: number
  name: string
  label: string
  fieldType: string
  placeholder: string | null
  helpText: string | null
  isRequired: boolean
  validationRules: any
  options: any
  orderIndex: number
}

export interface FormResponseData {
  templateId: number
  fieldResponses: FormFieldResponseData[]
}

export interface FormFieldResponseData {
  fieldId: number
  value: string
}

export interface ProfileCompletionData {
  userId: number
  templateId: number
  completionStatus: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
  progressPercentage: number
}

// =====================================================================
// Service Class
// =====================================================================

export class ProfileCompletionService {
  // =====================================================================
  // Form Template Operations
  // =====================================================================

  /**
   * Get all active form templates with their sections and fields
   */
  async getActiveFormTemplates(): Promise<FormTemplateData[]> {
    try {
      const templates = await prisma.formTemplate.findMany({
        where: { isActive: true },
        include: {
          sections: {
            orderBy: { orderIndex: 'asc' },
            include: {
              fields: {
                orderBy: { orderIndex: 'asc' }
              }
            }
          }
        }
      })

      return templates.map((template: any) => ({
        id: template.id,
        name: template.name,
        description: template.description,
        version: template.version,
        isActive: template.isActive,
        sections: template.sections.map((section: any) => ({
          id: section.id,
          name: section.name,
          description: section.description,
          orderIndex: section.orderIndex,
          isRequired: section.isRequired,
          fields: section.fields.map((field: any) => ({
            id: field.id,
            name: field.name,
            label: field.label,
            fieldType: field.fieldType,
            placeholder: field.placeholder,
            helpText: field.helpText,
            isRequired: field.isRequired,
            validationRules: field.validationRules,
            options: field.options,
            orderIndex: field.orderIndex
          }))
        }))
      }))
    } catch (error) {
      console.error('Error fetching form templates:', error)
      throw new Error('Failed to fetch form templates')
    }
  }

  /**
   * Get a specific form template by name
   */
  async getFormTemplateByName(name: string): Promise<FormTemplateData | null> {
    try {
      const template = await prisma.formTemplate.findFirst({
        where: { name, isActive: true },
        include: {
          sections: {
            orderBy: { orderIndex: 'asc' },
            include: {
              fields: {
                orderBy: { orderIndex: 'asc' }
              }
            }
          }
        }
      })

      if (!template) return null

      return {
        id: template.id,
        name: template.name,
        description: template.description,
        version: template.version,
        isActive: template.isActive,
        sections: template.sections.map((section: any) => ({
          id: section.id,
          name: section.name,
          description: section.description,
          orderIndex: section.orderIndex,
          isRequired: section.isRequired,
          fields: section.fields.map((field: any) => ({
            id: field.id,
            name: field.name,
            label: field.label,
            fieldType: field.fieldType,
            placeholder: field.placeholder,
            helpText: field.helpText,
            isRequired: field.isRequired,
            validationRules: field.validationRules,
            options: field.options,
            orderIndex: field.orderIndex
          }))
        }))
      }
    } catch (error) {
      console.error('Error fetching form template:', error)
      throw new Error('Failed to fetch form template')
    }
  }

  // =====================================================================
  // Form Response Operations
  // =====================================================================

  /**
   * Submit a form response and create individual field responses
   */
  async submitFormResponse(data: FormResponseData, userId: number = 1): Promise<boolean> {
    try {
      // Use transaction to ensure data consistency
      const result = await prisma.$transaction(async (tx: any) => {
        // Create main form response
        const formResponse = await tx.formResponse.create({
          data: {
            userId,
            templateId: data.templateId,
            submittedAt: new Date()
          }
        })

        // Create individual field responses
        for (const fieldResponse of data.fieldResponses) {
          await tx.formFieldResponse.create({
            data: {
              formResponseId: formResponse.id,
              fieldId: fieldResponse.fieldId,
              value: fieldResponse.value
            }
          })
        }

        return formResponse
      })

      return !!result
    } catch (error) {
      console.error('Error submitting form response:', error)
      throw new Error('Failed to submit form response')
    }
  }

  /**
   * Get all form responses for a specific user
   */
  async getUserFormResponses(userId: number = 1): Promise<any[]> {
    try {
      const responses = await prisma.formResponse.findMany({
        where: { userId },
        include: {
          template: true,
          fieldResponses: {
            include: {
              field: true
            }
          }
        },
        orderBy: { submittedAt: 'desc' }
      })

      return responses.map((response: any) => ({
        id: response.id,
        templateName: response.template.name,
        submittedAt: response.submittedAt,
        fields: response.fieldResponses.map((fr: any) => ({
          fieldName: fr.field.name,
          fieldLabel: fr.field.label,
          value: fr.value
        }))
      }))
    } catch (error) {
      console.error('Error fetching user form responses:', error)
      throw new Error('Failed to fetch user form responses')
    }
  }

  /**
   * Get all form responses for admin review
   */
  async getAllFormResponses(): Promise<any[]> {
    try {
      const responses = await prisma.formResponse.findMany({
        include: {
          user: true,
          template: true,
          fieldResponses: {
            include: {
              field: true
            }
          }
        },
        orderBy: { submittedAt: 'desc' }
      })

      return responses.map((response: any) => ({
        id: response.id,
        userName: response.user.name,
        userEmail: response.user.email,
        templateName: response.template.name,
        submittedAt: response.submittedAt,
        fields: response.fieldResponses.map((fr: any) => ({
          fieldName: fr.field.name,
          fieldLabel: fr.field.label,
          value: fr.value
        }))
      }))
    } catch (error) {
      console.error('Error fetching all form responses:', error)
      throw new Error('Failed to fetch form responses')
    }
  }

  // =====================================================================
  // Profile Completion Operations
  // =====================================================================

  /**
   * Get profile completion status for a specific user
   */
  async getUserProfileCompletion(userId: number = 1): Promise<ProfileCompletionData[]> {
    try {
      const completions = await prisma.profileCompletion.findMany({
        where: { userId },
        include: {
          template: true
        }
      })

      return completions.map((completion: any) => ({
        userId: completion.userId,
        templateId: completion.templateId,
        completionStatus: completion.completionStatus,
        progressPercentage: completion.progressPercentage
      }))
    } catch (error) {
      console.error('Error fetching user profile completion:', error)
      throw new Error('Failed to fetch profile completion')
    }
  }

  /**
   * Update or create profile completion status for a user
   */
  async updateProfileCompletion(data: ProfileCompletionData): Promise<boolean> {
    try {
      await prisma.profileCompletion.upsert({
        where: {
          userId_templateId: {
            userId: data.userId,
            templateId: data.templateId
          }
        },
        update: {
          completionStatus: data.completionStatus,
          progressPercentage: data.progressPercentage,
          lastUpdatedAt: new Date()
        },
        create: {
          userId: data.userId,
          templateId: data.templateId,
          completionStatus: data.completionStatus,
          progressPercentage: data.progressPercentage
        }
      })

      return true
    } catch (error) {
      console.error('Error updating profile completion:', error)
      throw new Error('Failed to update profile completion')
    }
  }

  /**
   * Calculate overall profile completion percentage for a user
   */
  async calculateOverallProfileCompletion(userId: number = 1): Promise<number> {
    try {
      const completions = await prisma.profileCompletion.findMany({
        where: { userId }
      })

      if (completions.length === 0) return 0

      const totalPercentage = completions.reduce((sum: any, completion: any) => {
        return sum + completion.progressPercentage
      }, 0)

      return Math.round(totalPercentage / completions.length)
    } catch (error) {
      console.error('Error calculating overall completion:', error)
      return 0
    }
  }

  /**
   * Get profile completion status for all users (admin)
   */
  async getAllUsersProfileCompletion(): Promise<any[]> {
    try {
      const completions = await prisma.profileCompletion.findMany({
        include: {
          user: true,
          template: true
        }
      })

      return completions.map((completion: any) => ({
        userId: completion.userId,
        userName: completion.user.name,
        userEmail: completion.user.email,
        templateName: completion.template.name,
        completionStatus: completion.completionStatus,
        progressPercentage: completion.progressPercentage,
        lastUpdatedAt: completion.lastUpdatedAt
      }))
    } catch (error) {
      console.error('Error fetching all users profile completion:', error)
      throw new Error('Failed to fetch users profile completion')
    }
  }
}

// =====================================================================
// Service Instance
// =====================================================================

export const profileCompletionService = new ProfileCompletionService()
