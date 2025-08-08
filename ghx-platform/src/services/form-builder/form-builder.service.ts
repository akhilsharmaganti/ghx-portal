// Form Builder Service
// Orchestrates all form operations
// Follows Dependency Inversion Principle

import { FormTemplate } from '@/types/form-builder';
import { 
  IFormBuilderService, 
  IFormTemplateService, 
  IFormComponentService, 
  IFormResponseService 
} from './form-builder.interface';
import { notificationService } from '../notifications';

export class FormBuilderService implements IFormBuilderService {
  constructor(
    public readonly templates: IFormTemplateService,
    public readonly components: IFormComponentService,
    public readonly responses: IFormResponseService
  ) {}

  async sendFormToUser(formId: string, userId: number): Promise<boolean> {
    try {
      // Get the form template
      const template = await this.templates.getTemplateById(formId);
      if (!template) {
        throw new Error('Form template not found');
      }

      // Send notification to user about the form
      await notificationService.createNotification({
        title: `New Form: ${template.title}`,
        message: template.description || 'You have been assigned a new form to complete.',
        type: 'APPLICATION',
        priority: 'MEDIUM',
        recipient_id: userId,
        action_url: `/forms/${formId}`,
        metadata: {
          formId,
          formTitle: template.title,
          formType: 'admin_assigned'
        }
      });

      return true;
    } catch (error) {
      console.error('Error sending form to user:', error);
      return false;
    }
  }

  async getFormsForUser(userId: number): Promise<FormTemplate[]> {
    // In a real implementation, you'd have a mapping of users to forms
    // For now, return all active forms
    const allTemplates = await this.templates.getTemplates({ is_active: true });
    
    // Filter forms that are relevant to the user
    // This could be based on user role, permissions, etc.
    return allTemplates.filter(template => {
      // Add your logic here to determine if user should see this form
      return true; // For now, return all forms
    });
  }

  async getFormStats(formId: string): Promise<{
    totalResponses: number;
    completionRate: number;
    averageTime: number;
  }> {
    try {
      // Get response statistics
      const responseStats = await this.responses.getResponseStats(formId);
      
      // Get form template for additional context
      const template = await this.templates.getTemplateById(formId);
      
      const completionRate = responseStats.total > 0 
        ? (responseStats.completed / responseStats.total) * 100 
        : 0;

      return {
        totalResponses: responseStats.total,
        completionRate: Math.round(completionRate * 100) / 100, // Round to 2 decimal places
        averageTime: Math.round(responseStats.averageTime * 100) / 100 // Round to 2 decimal places
      };
    } catch (error) {
      console.error('Error getting form stats:', error);
      return {
        totalResponses: 0,
        completionRate: 0,
        averageTime: 0
      };
    }
  }

  // Additional utility methods
  async validateFormTemplate(template: FormTemplate): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors: string[] = [];

    // Validate basic fields
    if (!template.title || template.title.trim().length === 0) {
      errors.push('Form title is required');
    }

    if (!template.components || template.components.length === 0) {
      errors.push('Form must have at least one component');
    }

    // Validate each component
    if (template.components) {
      for (let i = 0; i < template.components.length; i++) {
        const component = template.components[i];
        if (!this.components.validateComponent(component)) {
          errors.push(`Component ${i + 1} (${component.label}) is invalid`);
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  async duplicateFormWithResponses(formId: string): Promise<FormTemplate> {
    // Duplicate the template
    const duplicatedTemplate = await this.templates.duplicateTemplate(formId);
    
    // Note: In a real implementation, you might want to duplicate responses too
    // For now, we just duplicate the template
    
    return duplicatedTemplate;
  }
} 