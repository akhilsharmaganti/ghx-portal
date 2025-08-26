// Core Notification Service - The Main Tap
// This service handles all types of notifications through a single interface

export interface NotificationRequest {
  type: string;
  recipients: 'all_users' | 'specific_users' | 'user_group';
  userIds?: number[]; // For specific users
  userGroup?: string; // For user groups
  content: {
    title: string;
    message: string;
    data?: Record<string, any>;
    icon?: string;
    action?: string;
  };
  delivery: 'push' | 'email' | 'in_app' | 'all';
  priority?: 'high' | 'normal' | 'low';
}

export interface NotificationResult {
  success: boolean;
  message: string;
  sentCount: number;
  errors?: string[];
}

export class NotificationService {
  private static instance: NotificationService;
  
  // Singleton pattern for consistent service usage
  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Main method - The Tap that handles everything
  async send(notification: NotificationRequest): Promise<NotificationResult> {
    try {
      console.log('🚰 NotificationService: Turning on the tap for:', notification.type);
      
      const { type, recipients, content, delivery, priority = 'normal' } = notification;
      
      // 1. Get target users
      const targetUsers = await this.getRecipients(recipients, notification.userIds, notification.userGroup);
      
      if (targetUsers.length === 0) {
        return {
          success: false,
          message: 'No recipients found',
          sentCount: 0
        };
      }

      console.log(`📨 Sending ${type} notification to ${targetUsers.length} users via ${delivery}`);

      // 2. Send through all delivery channels
      const results = await Promise.allSettled([
        delivery.includes('push') && this.sendPushNotifications(targetUsers, content, priority),
        delivery.includes('email') && this.sendEmailNotifications(targetUsers, content),
        delivery.includes('in_app') && this.sendInAppNotifications(targetUsers, content)
      ]);

      // 3. Process results
      const successCount = results.filter(result => 
        result.status === 'fulfilled' && result.value
      ).length;

      const errors = results
        .filter(result => result.status === 'rejected')
        .map(result => (result as PromiseRejectedResult).reason);

      console.log(`✅ Notification sent successfully to ${successCount} channels`);

      return {
        success: successCount > 0,
        message: `Notification sent via ${successCount} channels`,
        sentCount: targetUsers.length,
        errors: errors.length > 0 ? errors : undefined
      };

    } catch (error) {
      console.error('❌ NotificationService error:', error);
      return {
        success: false,
        message: `Failed to send notification: ${error instanceof Error ? error.message : 'Unknown error'}`,
        sentCount: 0,
        errors: [error instanceof Error ? error.message : 'Unknown error']
      };
    }
  }

  // Get recipients based on configuration
  private async getRecipients(
    recipients: string, 
    userIds?: number[], 
    userGroup?: string
  ): Promise<any[]> {
    try {
      if (recipients === 'all_users') {
        // For now, return mock data. Later integrate with your user database
        return [
          { id: 1, name: 'User 1', fcmToken: 'mock-fcm-token-1' },
          { id: 2, name: 'User 2', fcmToken: 'mock-fcm-token-2' },
          { id: 3, name: 'User 3', fcmToken: 'mock-fcm-token-3' }
        ];
      }
      
      if (recipients === 'specific_users' && userIds) {
        // Return specific users by IDs
        return userIds.map(id => ({
          id,
          name: `User ${id}`,
          fcmToken: `mock-fcm-token-${id}`
        }));
      }
      
      if (userGroup) {
        // Return users in specific group
        return [
          { id: 4, name: 'Group User 1', fcmToken: 'mock-fcm-token-4' },
          { id: 5, name: 'Group User 2', fcmToken: 'mock-fcm-token-5' }
        ];
      }

      return [];
    } catch (error) {
      console.error('Error getting recipients:', error);
      return [];
    }
  }

  // Send push notifications via FCM
  private async sendPushNotifications(users: any[], content: any, priority: string): Promise<boolean> {
    try {
      console.log('📱 Sending push notifications to', users.length, 'users');
      
      // Mock FCM sending for now
      for (const user of users) {
        console.log(`📱 Push notification to ${user.name}: ${content.title}`);
        // TODO: Integrate with Firebase FCM
      }
      
      return true;
    } catch (error) {
      console.error('Error sending push notifications:', error);
      return false;
    }
  }

  // Send email notifications
  private async sendEmailNotifications(users: any[], content: any): Promise<boolean> {
    try {
      console.log('📧 Sending email notifications to', users.length, 'users');
      
      // Mock email sending for now
      for (const user of users) {
        console.log(`📧 Email to ${user.name}: ${content.title}`);
        // TODO: Integrate with email service
      }
      
      return true;
    } catch (error) {
      console.error('Error sending email notifications:', error);
      return false;
    }
  }

  // Send in-app notifications
  private async sendInAppNotifications(users: any[], content: any): Promise<boolean> {
    try {
      console.log('🏠 Sending in-app notifications to', users.length, 'users');
      
      // Mock in-app notification for now
      for (const user of users) {
        console.log(`🏠 In-app notification to ${user.name}: ${content.title}`);
        // TODO: Store in database for in-app display
      }
      
      return true;
    } catch (error) {
      console.error('Error sending in-app notifications:', error);
      return false;
    }
  }

  // Utility method to check if service is working
  async healthCheck(): Promise<boolean> {
    try {
      console.log('🏥 NotificationService health check...');
      // TODO: Add actual health checks
      return true;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const notificationService = NotificationService.getInstance();
