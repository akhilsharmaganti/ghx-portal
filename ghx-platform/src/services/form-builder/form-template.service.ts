// Form Template Service
// Handles form template CRUD operations
// Follows Single Responsibility Principle

import { 
  FormTemplate, 
  CreateFormRequest, 
  UpdateFormRequest, 
  FormFilters 
} from '@/types/form-builder';
import { IFormTemplateService } from './form-builder.interface';

export class FormTemplateService implements IFormTemplateService {
  private templates: FormTemplate[] = [];
  private nextId = 1;

  async createTemplate(data: CreateFormRequest): Promise<FormTemplate> {
    const template: FormTemplate = {
      id: `form_${this.nextId++}`,
      title: data.title,
      description: data.description,
      components: data.components || [],
      settings: data.settings || {
        allowMultipleResponses: false,
        requireAuthentication: true,
        showProgressBar: true,
        theme: 'default'
      },
      created_by: data.created_by,
      created_at: new Date(),
      updated_at: new Date(),
      is_active: true,
      version: 1
    };

    this.templates.push(template);
    return template;
  }

  async getTemplates(filters?: FormFilters): Promise<FormTemplate[]> {
    let filtered = [...this.templates];
    
    if (filters?.created_by) {
      filtered = filtered.filter(t => t.created_by === filters.created_by);
    }
    
    if (filters?.is_active !== undefined) {
      filtered = filtered.filter(t => t.is_active === filters.is_active);
    }
    
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(search) || 
        t.description.toLowerCase().includes(search)
      );
    }

    // Sort by updated_at desc
    filtered.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

    return filtered;
  }

  async getTemplateById(id: string): Promise<FormTemplate | null> {
    return this.templates.find(t => t.id === id) || null;
  }

  async updateTemplate(id: string, data: UpdateFormRequest): Promise<FormTemplate> {
    const index = this.templates.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Form template not found');
    }

    const template = this.templates[index];
    const updatedTemplate: FormTemplate = {
      ...template,
      ...data,
      updated_at: new Date(),
      version: template.version + 1
    };

    this.templates[index] = updatedTemplate;
    return updatedTemplate;
  }

  async deleteTemplate(id: string): Promise<void> {
    const index = this.templates.findIndex(t => t.id === id);
    if (index !== -1) {
      this.templates.splice(index, 1);
    }
  }

  async duplicateTemplate(id: string): Promise<FormTemplate> {
    const template = await this.getTemplateById(id);
    if (!template) {
      throw new Error('Form template not found');
    }

    const duplicatedTemplate: FormTemplate = {
      ...template,
      id: `form_${this.nextId++}`,
      title: `${template.title} (Copy)`,
      created_at: new Date(),
      updated_at: new Date(),
      version: 1
    };

    this.templates.push(duplicatedTemplate);
    return duplicatedTemplate;
  }
} 