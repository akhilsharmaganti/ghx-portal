// Form Builder Services Index
// Provides clean interface for all form builder services

export { 
  IFormBuilderService, 
  IFormTemplateService, 
  IFormComponentService, 
  IFormResponseService 
} from './form-builder.interface';

export { FormTemplateService } from './form-template.service';
export { FormComponentService } from './form-component.service';
export { FormResponseService } from './form-response.service';
export { FormBuilderService } from './form-builder.service';

// Default instances for easy use
import { FormTemplateService } from './form-template.service';
import { FormComponentService } from './form-component.service';
import { FormResponseService } from './form-response.service';
import { FormBuilderService } from './form-builder.service';

// Create default instances
const formTemplateService = new FormTemplateService();
const formComponentService = new FormComponentService();
const formResponseService = new FormResponseService();
const formBuilderService = new FormBuilderService(
  formTemplateService,
  formComponentService,
  formResponseService
);

export { 
  formTemplateService, 
  formComponentService, 
  formResponseService, 
  formBuilderService 
}; 