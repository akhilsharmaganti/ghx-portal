// Form Builder Service Tests
// Tests the form builder business logic

import { FormBuilderService } from '../form-builder/form-builder.service';
import { FormTemplateService } from '../form-builder/form-template.service';
import { FormComponentService } from '../form-builder/form-component.service';
import { FormResponseService } from '../form-builder/form-response.service';
import { notificationService } from '../notifications';

// Mock notification service
jest.mock('../notifications', () => ({
  notificationService: {
    createNotification: jest.fn(),
  },
}));

describe('FormBuilderService', () => {
  let formBuilderService: FormBuilderService;
  let formTemplateService: FormTemplateService;
  let formComponentService: FormComponentService;
  let formResponseService: FormResponseService;

  beforeEach(() => {
    formTemplateService = new FormTemplateService();
    formComponentService = new FormComponentService();
    formResponseService = new FormResponseService();
    formBuilderService = new FormBuilderService(
      formTemplateService,
      formComponentService,
      formResponseService
    );
    jest.clearAllMocks();
  });

  describe('form creation and management', () => {
    const mockFormData = {
      title: 'Test Form',
      description: 'A test form for validation',
      components: [
        {
          id: 'text-field-1',
          type: 'text-field',
          label: 'Name',
          placeholder: 'Enter your name',
          required: true,
          validation: {
            minLength: 2,
            maxLength: 50,
            pattern: null
          },
          settings: {
            multiline: false,
            rows: 1
          }
        }
      ],
      settings: {
        allowMultipleResponses: false,
        requireAuthentication: true,
        showProgressBar: true,
        theme: 'default'
      },
      created_by: 'admin'
    };

    it('should create a new form template', async () => {
      const template = await formTemplateService.createTemplate(mockFormData);

      expect(template.title).toBe(mockFormData.title);
      expect(template.description).toBe(mockFormData.description);
      expect(template.components).toHaveLength(1);
      expect(template.is_active).toBe(true);
      expect(template.version).toBe(1);
    });

    it('should validate form template correctly', async () => {
      const template = await formTemplateService.createTemplate(mockFormData);
      const validation = await formBuilderService.validateFormTemplate(template);

      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should detect invalid form template', async () => {
      const invalidTemplate = {
        ...mockFormData,
        title: '', // Invalid: empty title
        components: [] // Invalid: no components
      };

      const template = await formTemplateService.createTemplate(invalidTemplate);
      const validation = await formBuilderService.validateFormTemplate(template);

      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Form title is required');
      expect(validation.errors).toContain('Form must have at least one component');
    });

    it('should duplicate form template', async () => {
      const originalTemplate = await formTemplateService.createTemplate(mockFormData);
      const duplicatedTemplate = await formTemplateService.duplicateTemplate(originalTemplate.id);

      expect(duplicatedTemplate.title).toBe(`${originalTemplate.title} (Copy)`);
      expect(duplicatedTemplate.id).not.toBe(originalTemplate.id);
      expect(duplicatedTemplate.components).toHaveLength(originalTemplate.components.length);
      expect(duplicatedTemplate.version).toBe(1);
    });
  });

  describe('form components', () => {
    it('should get available components', () => {
      const components = formComponentService.getAvailableComponents();

      expect(components).toHaveLength(10); // We have 10 predefined components
      expect(components.some(c => c.type === 'text-field')).toBe(true);
      expect(components.some(c => c.type === 'email')).toBe(true);
      expect(components.some(c => c.type === 'phone-number')).toBe(true);
    });

    it('should validate components correctly', () => {
      const validComponent = {
        id: 'test-email',
        type: 'email',
        label: 'Email',
        placeholder: 'Enter email',
        required: false,
        validation: {
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        settings: {}
      };

      const isValid = formComponentService.validateComponent(validComponent);
      expect(isValid).toBe(true);
    });

    it('should detect invalid components', () => {
      const invalidComponent = {
        id: '', // Invalid: empty id
        type: 'email',
        label: '', // Invalid: empty label
        placeholder: 'Enter email',
        required: false,
        validation: {},
        settings: {}
      };

      const isValid = formComponentService.validateComponent(invalidComponent);
      expect(isValid).toBe(false);
    });
  });

  describe('form responses', () => {
    it('should submit form response', async () => {
      const mockFormData = {
        title: 'Test Form',
        description: 'Test form',
        components: [],
        created_by: 'admin'
      };

      const template = await formTemplateService.createTemplate(mockFormData);
      const responseData = {
        user_id: 1,
        responses: {
          'text-field-1': 'John Doe'
        },
        userAgent: 'Mozilla/5.0',
        ipAddress: '127.0.0.1',
        timeSpent: 30
      };

      const response = await formResponseService.submitResponse(template.id, responseData);

      expect(response.form_id).toBe(template.id);
      expect(response.user_id).toBe(1);
      expect(response.responses).toEqual(responseData.responses);
      expect(response.status).toBe('completed');
    });

    it('should get form statistics', async () => {
      const mockFormData = {
        title: 'Test Form',
        description: 'Test form',
        components: [],
        created_by: 'admin'
      };

      const template = await formTemplateService.createTemplate(mockFormData);

      // Submit multiple responses
      await formResponseService.submitResponse(template.id, {
        user_id: 1,
        responses: { 'field1': 'response1' }
      });

      await formResponseService.submitResponse(template.id, {
        user_id: 2,
        responses: { 'field1': 'response2' }
      });

      const stats = await formResponseService.getResponseStats(template.id);

      expect(stats.total).toBe(2);
      expect(stats.completed).toBe(2);
      expect(stats.inProgress).toBe(0);
    });
  });

  describe('form delivery', () => {
    it('should send form to user', async () => {
      const mockFormData = {
        title: 'Test Form',
        description: 'Test form',
        components: [],
        created_by: 'admin'
      };

      const template = await formTemplateService.createTemplate(mockFormData);
      const userId = 1;

      const result = await formBuilderService.sendFormToUser(template.id, userId);

      expect(result).toBe(true);
      expect(notificationService.createNotification).toHaveBeenCalledWith({
        title: `New Form: ${template.title}`,
        message: template.description,
        type: 'APPLICATION',
        priority: 'MEDIUM',
        recipient_id: userId,
        action_url: `/forms/${template.id}`,
        metadata: {
          formId: template.id,
          formTitle: template.title,
          formType: 'admin_assigned'
        }
      });
    });

    it('should get forms for user', async () => {
      const mockFormData = {
        title: 'Test Form',
        description: 'Test form',
        components: [],
        created_by: 'admin'
      };

      await formTemplateService.createTemplate(mockFormData);
      const userId = 1;

      const forms = await formBuilderService.getFormsForUser(userId);

      expect(forms).toHaveLength(1);
      expect(forms[0].title).toBe(mockFormData.title);
    });
  });

  describe('form statistics', () => {
    it('should get form stats', async () => {
      const mockFormData = {
        title: 'Test Form',
        description: 'Test form',
        components: [],
        created_by: 'admin'
      };

      const template = await formTemplateService.createTemplate(mockFormData);

      // Submit a response
      await formResponseService.submitResponse(template.id, {
        user_id: 1,
        responses: { 'field1': 'response1' },
        timeSpent: 30
      });

      const stats = await formBuilderService.getFormStats(template.id);

      expect(stats.totalResponses).toBe(1);
      expect(stats.completionRate).toBe(100);
      expect(stats.averageTime).toBe(30);
    });
  });
}); 