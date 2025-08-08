// Notification Email Service
// Orchestrates email sending with templates
// Follows Dependency Inversion Principle

import { EmailNotificationData, NotificationType, Priority } from '@/types/notification';
import { IEmailService } from './email.service';
import { ITemplateService } from './email-templates.service';

export interface INotificationEmailService {
  sendNotification(
    to: string,
    title: string,
    message: string,
    type: NotificationType,
    priority?: Priority,
    actionUrl?: string
  ): Promise<boolean>;
  
  generateNotificationEmail(
    to: string,
    title: string,
    message: string,
    type: NotificationType,
    priority?: Priority,
    actionUrl?: string
  ): EmailNotificationData;
}

export class NotificationEmailService implements INotificationEmailService {
  constructor(
    private readonly emailService: IEmailService,
    private readonly templateService: ITemplateService
  ) {}

  async sendNotification(
    to: string,
    title: string,
    message: string,
    type: NotificationType,
    priority: Priority = 'MEDIUM',
    actionUrl?: string
  ): Promise<boolean> {
    const emailData = this.generateNotificationEmail(to, title, message, type, priority, actionUrl);
    return this.emailService.sendEmail(emailData);
  }

  generateNotificationEmail(
    to: string,
    title: string,
    message: string,
    type: NotificationType,
    priority: Priority = 'MEDIUM',
    actionUrl?: string
  ): EmailNotificationData {
    const template = this.templateService.getTemplate(type);
    const priorityPrefix = this.templateService.getPriorityPrefix(priority);
    
    const data = {
      title,
      message,
      actionUrl: actionUrl || ''
    };

    const subject = `${priorityPrefix}${template.subject}`;
    const html = this.templateService.renderTemplate(template.html, data);
    const text = this.templateService.renderTemplate(template.text, data);

    return {
      to,
      subject,
      html,
      text
    };
  }
} 