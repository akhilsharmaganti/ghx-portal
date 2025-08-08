// Main Services Index
// Central export point for all services

// Database services
export { 
  IDatabaseService, 
  INotificationRepository, 
  IUserRepository 
} from './database/database.interface';
export { MockDatabaseService } from './database/mock-database.service';

// Email services
export { 
  IEmailService, 
  EmailService 
} from './email/email.service';
export { 
  ITemplateService, 
  EmailTemplatesService 
} from './email/email-templates.service';
export { 
  INotificationEmailService, 
  NotificationEmailService 
} from './email/notification-email.service';
export { 
  emailService, 
  templateService, 
  notificationEmailService 
} from './email';

// Notification services
export { 
  INotificationService, 
  NotificationService 
} from './notifications/notification.service';
export { 
  notificationService, 
  mockDatabase 
} from './notifications';

// Form Builder services
export {
  IFormBuilderService,
  IFormTemplateService,
  IFormComponentService,
  IFormResponseService
} from './form-builder/form-builder.interface';
export {
  FormTemplateService,
  FormComponentService,
  FormResponseService,
  FormBuilderService
} from './form-builder';
export {
  formTemplateService,
  formComponentService,
  formResponseService,
  formBuilderService
} from './form-builder';

// Authentication services
export {
  IAuthService,
  IAuthConfigService
} from './auth/auth.interface';
export {
  AuthService,
  AuthConfigService
} from './auth';
export {
  authService,
  authConfigService
} from './auth';

// Default instances for easy use
export { notificationService as defaultNotificationService } from './notifications';
export { emailService as defaultEmailService } from './email';
export { formBuilderService as defaultFormBuilderService } from './form-builder';
export { authService as defaultAuthService } from './auth'; 