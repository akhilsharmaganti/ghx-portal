// Email Service - Core email sending functionality
// Follows Single Responsibility Principle

import { EmailNotificationData } from '@/types/notification';

export interface IEmailService {
  sendEmail(data: EmailNotificationData): Promise<boolean>;
  testConnection(): Promise<boolean>;
}

export class EmailService implements IEmailService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = process.env.RESEND_API_KEY || '';
    this.baseUrl = 'https://api.resend.com';
    
    if (!this.apiKey) {
      console.warn('RESEND_API_KEY not found. Email notifications will be disabled.');
    }
  }

  async sendEmail(data: EmailNotificationData): Promise<boolean> {
    if (!this.apiKey) {
      console.log('Email service disabled - no API key');
      return false;
    }

    try {
      const response = await fetch(`${this.baseUrl}/emails`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'GHX Platform <notifications@ghx-innovation.com>',
          to: data.to,
          subject: data.subject,
          html: data.html,
          text: data.text,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Failed to send email:', error);
        return false;
      }

      console.log(`Email sent successfully to ${data.to}`);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  async testConnection(): Promise<boolean> {
    if (!this.apiKey) {
      return false;
    }

    try {
      const response = await fetch(`${this.baseUrl}/domains`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Error testing email service:', error);
      return false;
    }
  }
} 