// Form Response Service
// Handles form response CRUD operations
// Follows Single Responsibility Principle

import { FormResponse } from '@/types/form-builder';
import { IFormResponseService } from './form-builder.interface';

export class FormResponseService implements IFormResponseService {
  private responses: FormResponse[] = [];
  private nextId = 1;

  async submitResponse(formId: string, data: any): Promise<FormResponse> {
    const response: FormResponse = {
      id: `response_${this.nextId++}`,
      form_id: formId,
      user_id: data.user_id || null,
      responses: data.responses || {},
      submitted_at: new Date(),
      completed_at: new Date(),
      status: 'completed',
      metadata: {
        userAgent: data.userAgent || '',
        ipAddress: data.ipAddress || '',
        timeSpent: data.timeSpent || 0
      }
    };

    this.responses.push(response);
    return response;
  }

  async getResponses(formId: string): Promise<FormResponse[]> {
    return this.responses
      .filter(r => r.form_id === formId)
      .sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime());
  }

  async getResponseById(id: string): Promise<FormResponse | null> {
    return this.responses.find(r => r.id === id) || null;
  }

  async updateResponse(id: string, data: any): Promise<FormResponse> {
    const index = this.responses.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Form response not found');
    }

    const response = this.responses[index];
    const updatedResponse: FormResponse = {
      ...response,
      responses: { ...response.responses, ...data.responses },
      completed_at: new Date(),
      status: data.status || response.status,
      metadata: { ...response.metadata, ...data.metadata }
    };

    this.responses[index] = updatedResponse;
    return updatedResponse;
  }

  async deleteResponse(id: string): Promise<void> {
    const index = this.responses.findIndex(r => r.id === id);
    if (index !== -1) {
      this.responses.splice(index, 1);
    }
  }

  // Additional helper methods
  async getResponseStats(formId: string): Promise<{
    total: number;
    completed: number;
    inProgress: number;
    averageTime: number;
  }> {
    const formResponses = await this.getResponses(formId);
    
    const total = formResponses.length;
    const completed = formResponses.filter(r => r.status === 'completed').length;
    const inProgress = formResponses.filter(r => r.status === 'in_progress').length;
    
    const completedResponses = formResponses.filter(r => r.status === 'completed');
    const averageTime = completedResponses.length > 0 
      ? completedResponses.reduce((sum, r) => sum + (r.metadata.timeSpent || 0), 0) / completedResponses.length
      : 0;

    return {
      total,
      completed,
      inProgress,
      averageTime
    };
  }

  async getResponsesByUser(userId: number): Promise<FormResponse[]> {
    return this.responses
      .filter(r => r.user_id === userId)
      .sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime());
  }
} 