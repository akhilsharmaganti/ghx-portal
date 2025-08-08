// Form Builder Service Interfaces
// Follows Interface Segregation Principle

import { 
  FormTemplate, 
  FormComponent, 
  FormResponse, 
  CreateFormRequest, 
  UpdateFormRequest,
  FormFilters 
} from '@/types/form-builder';

export interface IFormTemplateService {
  createTemplate(data: CreateFormRequest): Promise<FormTemplate>;
  getTemplates(filters?: FormFilters): Promise<FormTemplate[]>;
  getTemplateById(id: string): Promise<FormTemplate | null>;
  updateTemplate(id: string, data: UpdateFormRequest): Promise<FormTemplate>;
  deleteTemplate(id: string): Promise<void>;
  duplicateTemplate(id: string): Promise<FormTemplate>;
}

export interface IFormComponentService {
  getAvailableComponents(): FormComponent[];
  validateComponent(component: FormComponent): boolean;
  renderComponent(component: FormComponent, data?: any): string;
}

export interface IFormResponseService {
  submitResponse(formId: string, data: any): Promise<FormResponse>;
  getResponses(formId: string): Promise<FormResponse[]>;
  getResponseById(id: string): Promise<FormResponse | null>;
  updateResponse(id: string, data: any): Promise<FormResponse>;
  deleteResponse(id: string): Promise<void>;
}

export interface IFormBuilderService {
  templates: IFormTemplateService;
  components: IFormComponentService;
  responses: IFormResponseService;
  
  // Form delivery and management
  sendFormToUser(formId: string, userId: number): Promise<boolean>;
  getFormsForUser(userId: number): Promise<FormTemplate[]>;
  getFormStats(formId: string): Promise<{
    totalResponses: number;
    completionRate: number;
    averageTime: number;
  }>;
} 