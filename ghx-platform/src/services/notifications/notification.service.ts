// Notification Service
// Follows SOLID principles with dependency injection
// Single Responsibility: Only handles notification business logic

import { 
  Notification, 
  CreateNotificationRequest, 
  UpdateNotificationRequest, 
  NotificationFilters, 
  NotificationStats,
  BulkNotificationRequest,
  NotificationType,
  Priority
} from '@/types/notification';
import { IDatabaseService } from '../database/database.interface';
import { INotificationEmailService } from '../email/notification-email.service';

export interface INotificationService {
  createNotification(data: CreateNotificationRequest): Promise<Notification>;
  getNotifications(filters?: NotificationFilters): Promise<Notification[]>;
  getUnreadNotifications(userId: number): Promise<Notification[]>;
  markAsRead(notificationId: number): Promise<Notification>;
  markAllAsRead(userId: number): Promise<void>;
  getNotificationStats(userId: number): Promise<NotificationStats>;
  sendBulkNotifications(data: BulkNotificationRequest): Promise<Notification[]>;
  processScheduledNotifications(): Promise<number>;
  deleteNotification(notificationId: number): Promise<void>;
  getNotificationById(notificationId: number): Promise<Notification | null>;
}

export class NotificationService implements INotificationService {
  constructor(
    private readonly database: IDatabaseService,
    private readonly emailService: INotificationEmailService
  ) {}

  async createNotification(data: CreateNotificationRequest): Promise<Notification> {
    const notification = await this.database.notifications.create(data);

    // If no scheduled time, send email immediately
    if (!data.scheduled_for) {
      await this.sendNotificationEmail(notification);
    }

    return notification;
  }

  async getNotifications(filters: NotificationFilters = {}): Promise<Notification[]> {
    return this.database.notifications.findMany(filters);
  }

  async getUnreadNotifications(userId: number): Promise<Notification[]> {
    return this.getNotifications({
      recipient_id: userId,
      read: false,
      limit: 20
    });
  }

  async markAsRead(notificationId: number): Promise<Notification> {
    return this.database.notifications.update(notificationId, {
      read: true,
      read_at: new Date()
    });
  }

  async markAllAsRead(userId: number): Promise<void> {
    const unreadNotifications = await this.getUnreadNotifications(userId);
    
    for (const notification of unreadNotifications) {
      await this.markAsRead(notification.notification_id);
    }
  }

  async getNotificationStats(userId: number): Promise<NotificationStats> {
    const notifications = await this.getNotifications({ recipient_id: userId });
    
    const stats: NotificationStats = {
      total: notifications.length,
      unread: notifications.filter(n => !n.read).length,
      by_type: {
        SYSTEM: 0,
        PROGRAM: 0,
        MEETING: 0,
        APPLICATION: 0,
        DEADLINE: 0,
        COLLABORATION: 0
      },
      by_priority: {
        LOW: 0,
        MEDIUM: 0,
        HIGH: 0,
        URGENT: 0
      }
    };

    notifications.forEach(notification => {
      stats.by_type[notification.type]++;
      stats.by_priority[notification.priority]++;
    });

    return stats;
  }

  async sendBulkNotifications(data: BulkNotificationRequest): Promise<Notification[]> {
    const notifications: Notification[] = [];

    for (const recipientId of data.recipient_ids) {
      const notification = await this.createNotification({
        title: data.title,
        message: data.message,
        type: data.type,
        priority: data.priority,
        recipient_id: recipientId,
        sender_id: data.sender_id,
        action_url: data.action_url,
        metadata: data.metadata,
        scheduled_for: data.scheduled_for
      });

      notifications.push(notification);
    }

    return notifications;
  }

  async processScheduledNotifications(): Promise<number> {
    const now = new Date();
    
    // Get notifications that are scheduled for now or earlier and haven't been sent
    const scheduledNotifications = await this.database.notifications.findMany({
      // Note: In a real implementation, you'd need to add these filters to the interface
      // For now, we'll get all notifications and filter in memory
    });

    const toProcess = scheduledNotifications.filter(n => 
      n.scheduled_for && n.scheduled_for <= now && !n.email_sent
    );

    let processedCount = 0;

    for (const notification of toProcess) {
      const success = await this.sendNotificationEmail(notification);
      
      if (success) {
        await this.database.notifications.update(notification.notification_id, {
          email_sent: true,
          email_sent_at: new Date(),
          sent_at: new Date()
        } as any); // Type assertion needed for mock implementation
        processedCount++;
      }
    }

    return processedCount;
  }

  async deleteNotification(notificationId: number): Promise<void> {
    // In a real implementation, you might want to soft delete
    // For now, we'll just mark it as read
    await this.markAsRead(notificationId);
  }

  async getNotificationById(notificationId: number): Promise<Notification | null> {
    return this.database.notifications.findById(notificationId);
  }

  private async sendNotificationEmail(notification: Notification): Promise<boolean> {
    try {
      // Get user email
      const user = await this.database.users.findById(notification.recipient_id);

      if (!user?.email) {
        console.error(`No email found for user ${notification.recipient_id}`);
        return false;
      }

      // Send email
      const success = await this.emailService.sendNotification(
        user.email,
        notification.title,
        notification.message,
        notification.type,
        notification.priority,
        notification.action_url
      );

      return success;
    } catch (error) {
      console.error('Error sending notification email:', error);
      return false;
    }
  }
} 