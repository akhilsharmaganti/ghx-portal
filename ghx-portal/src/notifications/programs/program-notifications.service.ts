// Program Notification Service
// This service handles all program-related notifications using the main NotificationService

import { notificationService, NotificationRequest } from '../core/notification.service';
import { Program } from '@/types/programs';

export class ProgramNotificationService {
  private static instance: ProgramNotificationService;
  
  public static getInstance(): ProgramNotificationService {
    if (!ProgramNotificationService.instance) {
      ProgramNotificationService.instance = new ProgramNotificationService();
    }
    return ProgramNotificationService.instance;
  }

  // Notify all users when a new program is created
  async notifyProgramCreated(program: Program): Promise<void> {
    try {
      console.log('🎯 ProgramNotificationService: Notifying users about new program:', program.title);
      
      const notification: NotificationRequest = {
        type: 'program_created',
        recipients: 'all_users',
        content: {
          title: `🎯 New Program: ${program.title}`,
          message: `A new ${program.category} program is now available! ${program.title} is accepting applications.`,
          data: {
            programId: program.id,
            programName: program.title,
            category: program.category,
            action: 'VIEW_PROGRAM'
          },
          icon: '🎯',
          action: 'VIEW_PROGRAM'
        },
        delivery: 'all', // push + email + in_app
        priority: 'high'
      };

      const result = await notificationService.send(notification);
      
      if (result.success) {
        console.log(`✅ Program creation notification sent successfully to ${result.sentCount} users`);
      } else {
        console.error('❌ Failed to send program creation notification:', result.message);
      }
      
    } catch (error) {
      console.error('❌ Error in notifyProgramCreated:', error);
    }
  }

  // Notify users when a program is updated
  async notifyProgramUpdated(program: Program, changes: string[]): Promise<void> {
    try {
      console.log('📝 ProgramNotificationService: Notifying users about program updates:', program.title);
      
      const notification: NotificationRequest = {
        type: 'program_updated',
        recipients: 'all_users',
        content: {
          title: `📝 Program Updated: ${program.title}`,
          message: `${program.title} has been updated. Changes: ${changes.join(', ')}`,
          data: {
            programId: program.id,
            programName: program.title,
            changes: changes,
            action: 'VIEW_PROGRAM'
          },
          icon: '📝',
          action: 'VIEW_PROGRAM'
        },
        delivery: 'in_app', // Just in-app for updates
        priority: 'normal'
      };

      const result = await notificationService.send(notification);
      
      if (result.success) {
        console.log(`✅ Program update notification sent successfully to ${result.sentCount} users`);
      } else {
        console.error('❌ Failed to send program update notification:', result.message);
      }
      
    } catch (error) {
      console.error('❌ Error in notifyProgramUpdated:', error);
    }
  }

  // Notify users when program status changes
  async notifyProgramStatusChanged(program: Program, oldStatus: string, newStatus: string): Promise<void> {
    try {
      console.log(`🔄 ProgramNotificationService: Status changed from ${oldStatus} to ${newStatus}:`, program.title);
      
      const statusMessages = {
        'DRAFT': 'Program is now in draft mode',
        'PUBLISHED': 'Program is now published and accepting applications!',
        'ACTIVE': 'Program is now active and running!',
        'COMPLETED': 'Program has been completed',
        'ARCHIVED': 'Program has been archived'
      };

      const notification: NotificationRequest = {
        type: 'program_status_changed',
        recipients: 'all_users',
        content: {
          title: `🔄 Program Status: ${program.title}`,
          message: `${program.title} status changed to ${newStatus}. ${statusMessages[newStatus as keyof typeof statusMessages] || ''}`,
          data: {
            programId: program.id,
            programName: program.title,
            oldStatus: oldStatus,
            newStatus: newStatus,
            action: 'VIEW_PROGRAM'
          },
          icon: '🔄',
          action: 'VIEW_PROGRAM'
        },
        delivery: 'all',
        priority: newStatus === 'PUBLISHED' ? 'high' : 'normal'
      };

      const result = await notificationService.send(notification);
      
      if (result.success) {
        console.log(`✅ Program status change notification sent successfully to ${result.sentCount} users`);
      } else {
        console.error('❌ Failed to send program status change notification:', result.message);
      }
      
    } catch (error) {
      console.error('❌ Error in notifyProgramStatusChanged:', error);
    }
  }

  // Notify users when program deadline is approaching
  async notifyProgramDeadlineApproaching(program: Program, daysLeft: number): Promise<void> {
    try {
      console.log(`⏰ ProgramNotificationService: Deadline approaching in ${daysLeft} days:`, program.title);
      
      const notification: NotificationRequest = {
        type: 'program_deadline_approaching',
        recipients: 'all_users',
        content: {
          title: `⏰ Deadline Approaching: ${program.title}`,
          message: `Only ${daysLeft} day${daysLeft === 1 ? '' : 's'} left to apply for ${program.title}! Don't miss this opportunity.`,
          data: {
            programId: program.id,
            programName: program.title,
            daysLeft: daysLeft,
            action: 'APPLY_NOW'
          },
          icon: '⏰',
          action: 'APPLY_NOW'
        },
        delivery: 'all',
        priority: daysLeft <= 3 ? 'high' : 'normal'
      };

      const result = await notificationService.send(notification);
      
      if (result.success) {
        console.log(`✅ Program deadline notification sent successfully to ${result.sentCount} users`);
      } else {
        console.error('❌ Failed to send program deadline notification:', result.message);
      }
      
    } catch (error) {
      console.error('❌ Error in notifyProgramDeadlineApproaching:', error);
    }
  }

  // Notify users when program is full
  async notifyProgramFull(program: Program): Promise<void> {
    try {
      console.log('🚫 ProgramNotificationService: Program is full:', program.title);
      
      const notification: NotificationRequest = {
        type: 'program_full',
        recipients: 'all_users',
        content: {
          title: `🚫 Program Full: ${program.title}`,
          message: `${program.title} has reached its maximum capacity of ${program.maxParticipants} participants.`,
          data: {
            programId: program.id,
            programName: program.title,
            maxParticipants: program.maxParticipants,
            currentParticipants: program.currentParticipants,
            action: 'VIEW_PROGRAM'
          },
          icon: '🚫',
          action: 'VIEW_PROGRAM'
        },
        delivery: 'in_app',
        priority: 'normal'
      };

      const result = await notificationService.send(notification);
      
      if (result.success) {
        console.log(`✅ Program full notification sent successfully to ${result.sentCount} users`);
      } else {
        console.error('❌ Failed to send program full notification:', result.message);
      }
      
    } catch (error) {
      console.error('❌ Error in notifyProgramFull:', error);
    }
  }

  // Utility method to send custom program notifications
  async sendCustomNotification(
    program: Program, 
    type: string, 
    title: string, 
    message: string, 
    recipients: 'all_users' | 'specific_users' | 'user_group' = 'all_users',
    userIds?: number[]
  ): Promise<void> {
    try {
      console.log(`📢 ProgramNotificationService: Custom notification for ${program.title}:`, type);
      
      const notification: NotificationRequest = {
        type: `program_${type}`,
        recipients: recipients,
        userIds: userIds,
        content: {
          title: title,
          message: message,
          data: {
            programId: program.id,
            programName: program.title,
            action: 'VIEW_PROGRAM'
          },
          icon: '📢',
          action: 'VIEW_PROGRAM'
        },
        delivery: 'all',
        priority: 'normal'
      };

      const result = await notificationService.send(notification);
      
      if (result.success) {
        console.log(`✅ Custom program notification sent successfully to ${result.sentCount} users`);
      } else {
        console.error('❌ Failed to send custom program notification:', result.message);
      }
      
    } catch (error) {
      console.error('❌ Error in sendCustomNotification:', error);
    }
  }
}

// Export singleton instance
export const programNotificationService = ProgramNotificationService.getInstance();
