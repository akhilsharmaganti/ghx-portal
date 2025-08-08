// Email Templates Service
// Follows Open/Closed Principle - Easy to extend with new templates

import { NotificationTemplate, NotificationType, Priority } from '@/types/notification';

export interface ITemplateEngine {
  render(template: string, data: Record<string, any>): string;
}

export interface ITemplateService {
  getTemplate(type: NotificationType): NotificationTemplate;
  getPriorityPrefix(priority: Priority): string;
  renderTemplate(template: string, data: Record<string, any>): string;
}

// Simple template engine implementation
export class TemplateEngine implements ITemplateEngine {
  render(template: string, data: Record<string, any>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] || '';
    });
  }
}

// Email templates service
export class EmailTemplatesService implements ITemplateService {
  private readonly templateEngine: ITemplateEngine;
  private readonly templates: Record<NotificationType, NotificationTemplate>;
  private readonly priorityPrefixes: Record<Priority, string>;

  constructor() {
    this.templateEngine = new TemplateEngine();
    this.templates = this.initializeTemplates();
    this.priorityPrefixes = this.initializePriorityPrefixes();
  }

  getTemplate(type: NotificationType): NotificationTemplate {
    return this.templates[type];
  }

  getPriorityPrefix(priority: Priority): string {
    return this.priorityPrefixes[priority];
  }

  renderTemplate(template: string, data: Record<string, any>): string {
    return this.templateEngine.render(template, data);
  }

  private initializeTemplates(): Record<NotificationType, NotificationTemplate> {
    return {
      SYSTEM: {
        subject: 'GHX Platform Update',
        html: this.getSystemTemplate(),
        text: this.getSystemTextTemplate()
      },
      PROGRAM: {
        subject: 'New Program Opportunity',
        html: this.getProgramTemplate(),
        text: this.getProgramTextTemplate()
      },
      MEETING: {
        subject: 'Meeting Update',
        html: this.getMeetingTemplate(),
        text: this.getMeetingTextTemplate()
      },
      APPLICATION: {
        subject: 'Application Status Update',
        html: this.getApplicationTemplate(),
        text: this.getApplicationTextTemplate()
      },
      DEADLINE: {
        subject: 'Important Deadline Reminder',
        html: this.getDeadlineTemplate(),
        text: this.getDeadlineTextTemplate()
      },
      COLLABORATION: {
        subject: 'New Collaboration Opportunity',
        html: this.getCollaborationTemplate(),
        text: this.getCollaborationTextTemplate()
      }
    };
  }

  private initializePriorityPrefixes(): Record<Priority, string> {
    return {
      LOW: '',
      MEDIUM: '',
      HIGH: '🚨 ',
      URGENT: '🚨 URGENT: '
    };
  }

  // Template methods - Easy to extend
  private getSystemTemplate(): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1f2937; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">GHX Innovation Exchange</h1>
        </div>
        <div style="padding: 20px; background: #f9fafb;">
          <h2 style="color: #374151; margin-top: 0;">{{title}}</h2>
          <p style="color: #6b7280; line-height: 1.6;">{{message}}</p>
          {{#if actionUrl}}
          <div style="text-align: center; margin: 20px 0;">
            <a href="{{actionUrl}}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Details</a>
          </div>
          {{/if}}
        </div>
        <div style="background: #f3f4f6; padding: 15px; text-align: center; color: #6b7280; font-size: 14px;">
          <p>This is an automated message from GHX Innovation Exchange Platform</p>
        </div>
      </div>
    `;
  }

  private getSystemTextTemplate(): string {
    return `GHX Platform Update\n\n{{title}}\n\n{{message}}\n\n{{#if actionUrl}}View Details: {{actionUrl}}{{/if}}\n\nThis is an automated message from GHX Innovation Exchange Platform`;
  }

  private getProgramTemplate(): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #059669; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">GHX Innovation Exchange</h1>
        </div>
        <div style="padding: 20px; background: #f9fafb;">
          <h2 style="color: #374151; margin-top: 0;">{{title}}</h2>
          <p style="color: #6b7280; line-height: 1.6;">{{message}}</p>
          {{#if actionUrl}}
          <div style="text-align: center; margin: 20px 0;">
            <a href="{{actionUrl}}" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Learn More</a>
          </div>
          {{/if}}
        </div>
        <div style="background: #f3f4f6; padding: 15px; text-align: center; color: #6b7280; font-size: 14px;">
          <p>Don't miss out on this opportunity! Log in to your GHX dashboard for more details.</p>
        </div>
      </div>
    `;
  }

  private getProgramTextTemplate(): string {
    return `New Program Opportunity\n\n{{title}}\n\n{{message}}\n\n{{#if actionUrl}}Learn More: {{actionUrl}}{{/if}}\n\nDon't miss out on this opportunity! Log in to your GHX dashboard for more details.`;
  }

  private getMeetingTemplate(): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #7c3aed; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">GHX Innovation Exchange</h1>
        </div>
        <div style="padding: 20px; background: #f9fafb;">
          <h2 style="color: #374151; margin-top: 0;">{{title}}</h2>
          <p style="color: #6b7280; line-height: 1.6;">{{message}}</p>
          {{#if actionUrl}}
          <div style="text-align: center; margin: 20px 0;">
            <a href="{{actionUrl}}" style="background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Meeting</a>
          </div>
          {{/if}}
        </div>
        <div style="background: #f3f4f6; padding: 15px; text-align: center; color: #6b7280; font-size: 14px;">
          <p>Manage your meetings and schedule in your GHX dashboard.</p>
        </div>
      </div>
    `;
  }

  private getMeetingTextTemplate(): string {
    return `Meeting Update\n\n{{title}}\n\n{{message}}\n\n{{#if actionUrl}}View Meeting: {{actionUrl}}{{/if}}\n\nManage your meetings and schedule in your GHX dashboard.`;
  }

  private getApplicationTemplate(): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #dc2626; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">GHX Innovation Exchange</h1>
        </div>
        <div style="padding: 20px; background: #f9fafb;">
          <h2 style="color: #374151; margin-top: 0;">{{title}}</h2>
          <p style="color: #6b7280; line-height: 1.6;">{{message}}</p>
          {{#if actionUrl}}
          <div style="text-align: center; margin: 20px 0;">
            <a href="{{actionUrl}}" style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Application</a>
          </div>
          {{/if}}
        </div>
        <div style="background: #f3f4f6; padding: 15px; text-align: center; color: #6b7280; font-size: 14px;">
          <p>Track your application status in your GHX dashboard.</p>
        </div>
      </div>
    `;
  }

  private getApplicationTextTemplate(): string {
    return `Application Status Update\n\n{{title}}\n\n{{message}}\n\n{{#if actionUrl}}View Application: {{actionUrl}}{{/if}}\n\nTrack your application status in your GHX dashboard.`;
  }

  private getDeadlineTemplate(): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #ea580c; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">GHX Innovation Exchange</h1>
        </div>
        <div style="padding: 20px; background: #f9fafb;">
          <h2 style="color: #374151; margin-top: 0;">{{title}}</h2>
          <p style="color: #6b7280; line-height: 1.6;">{{message}}</p>
          {{#if actionUrl}}
          <div style="text-align: center; margin: 20px 0;">
            <a href="{{actionUrl}}" style="background: #ea580c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Take Action</a>
          </div>
          {{/if}}
        </div>
        <div style="background: #f3f4f6; padding: 15px; text-align: center; color: #6b7280; font-size: 14px;">
          <p>Don't miss this deadline! Complete your action in the GHX dashboard.</p>
        </div>
      </div>
    `;
  }

  private getDeadlineTextTemplate(): string {
    return `Important Deadline Reminder\n\n{{title}}\n\n{{message}}\n\n{{#if actionUrl}}Take Action: {{actionUrl}}{{/if}}\n\nDon't miss this deadline! Complete your action in the GHX dashboard.`;
  }

  private getCollaborationTemplate(): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0891b2; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">GHX Innovation Exchange</h1>
        </div>
        <div style="padding: 20px; background: #f9fafb;">
          <h2 style="color: #374151; margin-top: 0;">{{title}}</h2>
          <p style="color: #6b7280; line-height: 1.6;">{{message}}</p>
          {{#if actionUrl}}
          <div style="text-align: center; margin: 20px 0;">
            <a href="{{actionUrl}}" style="background: #0891b2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Connect Now</a>
          </div>
          {{/if}}
        </div>
        <div style="background: #f3f4f6; padding: 15px; text-align: center; color: #6b7280; font-size: 14px;">
          <p>Build your network and explore collaboration opportunities in the GHX platform.</p>
        </div>
      </div>
    `;
  }

  private getCollaborationTextTemplate(): string {
    return `New Collaboration Opportunity\n\n{{title}}\n\n{{message}}\n\n{{#if actionUrl}}Connect Now: {{actionUrl}}{{/if}}\n\nBuild your network and explore collaboration opportunities in the GHX platform.`;
  }
} 