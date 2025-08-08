// Form Component Service
// Handles component validation and rendering
// Follows Single Responsibility Principle

import { FormComponent, ComponentType } from '@/types/form-builder';
import { IFormComponentService } from './form-builder.interface';

export class FormComponentService implements IFormComponentService {
  private readonly availableComponents: FormComponent[] = [
    {
      id: 'text-field',
      type: 'text-field',
      label: 'Text Field',
      placeholder: 'Enter text...',
      required: false,
      validation: {
        minLength: 0,
        maxLength: 255,
        pattern: null
      },
      settings: {
        multiline: false,
        rows: 1
      }
    },
    {
      id: 'text-area',
      type: 'text-area',
      label: 'Text Area',
      placeholder: 'Enter text...',
      required: false,
      validation: {
        minLength: 0,
        maxLength: 1000,
        pattern: null
      },
      settings: {
        rows: 4
      }
    },
    {
      id: 'phone-number',
      type: 'phone-number',
      label: 'Phone Number',
      placeholder: 'Enter phone number...',
      required: false,
      validation: {
        pattern: /^[\+]?[1-9][\d]{0,15}$/
      },
      settings: {
        countryCode: '+1'
      }
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter email...',
      required: false,
      validation: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      },
      settings: {}
    },
    {
      id: 'number',
      type: 'number',
      label: 'Number',
      placeholder: 'Enter number...',
      required: false,
      validation: {
        min: null,
        max: null,
        step: 1
      },
      settings: {}
    },
    {
      id: 'select',
      type: 'select',
      label: 'Select',
      placeholder: 'Choose an option...',
      required: false,
      validation: {},
      settings: {
        options: [],
        multiple: false
      }
    },
    {
      id: 'checkbox',
      type: 'checkbox',
      label: 'Checkbox',
      placeholder: '',
      required: false,
      validation: {},
      settings: {
        options: []
      }
    },
    {
      id: 'radio',
      type: 'radio',
      label: 'Radio Buttons',
      placeholder: '',
      required: false,
      validation: {},
      settings: {
        options: []
      }
    },
    {
      id: 'date',
      type: 'date',
      label: 'Date',
      placeholder: 'Select date...',
      required: false,
      validation: {
        minDate: null,
        maxDate: null
      },
      settings: {}
    },
    {
      id: 'file-upload',
      type: 'file-upload',
      label: 'File Upload',
      placeholder: 'Choose file...',
      required: false,
      validation: {
        maxSize: 5242880, // 5MB
        allowedTypes: ['*']
      },
      settings: {
        multiple: false
      }
    }
  ];

  getAvailableComponents(): FormComponent[] {
    return this.availableComponents.map(component => ({ ...component }));
  }

  validateComponent(component: FormComponent): boolean {
    // Basic validation
    if (!component.id || !component.type || !component.label) {
      return false;
    }

    // Type-specific validation
    switch (component.type) {
      case 'text-field':
      case 'text-area':
        return this.validateTextComponent(component);
      case 'email':
        return this.validateEmailComponent(component);
      case 'phone-number':
        return this.validatePhoneComponent(component);
      case 'number':
        return this.validateNumberComponent(component);
      case 'select':
      case 'checkbox':
      case 'radio':
        return this.validateChoiceComponent(component);
      case 'date':
        return this.validateDateComponent(component);
      case 'file-upload':
        return this.validateFileComponent(component);
      default:
        return true;
    }
  }

  renderComponent(component: FormComponent, data?: any): string {
    // This would generate HTML for the component
    // For now, return a simple representation
    return `<div class="form-component" data-type="${component.type}" data-id="${component.id}">
      <label>${component.label}</label>
      <input type="${this.getInputType(component.type)}" placeholder="${component.placeholder}" />
    </div>`;
  }

  private validateTextComponent(component: FormComponent): boolean {
    const validation = component.validation;
    if (validation.minLength && validation.minLength < 0) return false;
    if (validation.maxLength && validation.maxLength < validation.minLength) return false;
    return true;
  }

  private validateEmailComponent(component: FormComponent): boolean {
    return component.validation.pattern instanceof RegExp;
  }

  private validatePhoneComponent(component: FormComponent): boolean {
    return component.validation.pattern instanceof RegExp;
  }

  private validateNumberComponent(component: FormComponent): boolean {
    const validation = component.validation;
    if (validation.min !== null && validation.max !== null && validation.min > validation.max) {
      return false;
    }
    return true;
  }

  private validateChoiceComponent(component: FormComponent): boolean {
    return Array.isArray(component.settings.options) && component.settings.options.length > 0;
  }

  private validateDateComponent(component: FormComponent): boolean {
    const validation = component.validation;
    if (validation.minDate && validation.maxDate && validation.minDate > validation.maxDate) {
      return false;
    }
    return true;
  }

  private validateFileComponent(component: FormComponent): boolean {
    const validation = component.validation;
    return validation.maxSize > 0 && Array.isArray(validation.allowedTypes);
  }

  private getInputType(componentType: ComponentType): string {
    switch (componentType) {
      case 'text-field':
      case 'text-area':
        return 'text';
      case 'email':
        return 'email';
      case 'phone-number':
        return 'tel';
      case 'number':
        return 'number';
      case 'date':
        return 'date';
      case 'file-upload':
        return 'file';
      default:
        return 'text';
    }
  }
} 