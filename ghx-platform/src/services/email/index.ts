// Email Services Index
// Provides clean interface for all email-related services

export { EmailService, IEmailService } from './email.service';
export { EmailTemplatesService, ITemplateService, TemplateEngine, ITemplateEngine } from './email-templates.service';
export { NotificationEmailService, INotificationEmailService } from './notification-email.service';

// Default instances for easy use
import { EmailService } from './email.service';
import { EmailTemplatesService } from './email-templates.service';
import { NotificationEmailService } from './notification-email.service';

// Create default instances
const emailService = new EmailService();
const templateService = new EmailTemplatesService();
const notificationEmailService = new NotificationEmailService(emailService, templateService);

export { emailService, templateService, notificationEmailService }; 