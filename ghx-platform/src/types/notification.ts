// Notification System Types
// These types match our Prisma schema for the notification system

export type NotificationType = 
  | 'SYSTEM'
  | 'PROGRAM'
  | 'MEETING'
  | 'APPLICATION'
  | 'DEADLINE'
  | 'COLLABORATION';

export type Priority = 
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'URGENT';

export interface Notification {
  notification_id: number;
  title: string;
  message: string;
  type: NotificationType;
  priority: Priority;
  read: boolean;
  email_sent: boolean;
  email_sent_at?: Date;
  scheduled_for?: Date;
  sent_at?: Date;
  recipient_id: number;
  sender_id?: number;
  action_url?: string;
  metadata?: Record<string, any>;
  created_at: Date;
  read_at?: Date;
  
  // Relations (when fetched with Prisma)
  recipient?: {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  sender?: {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export interface CreateNotificationRequest {
  title: string;
  message: string;
  type: NotificationType;
  priority?: Priority;
  recipient_id: number;
  sender_id?: number;
  action_url?: string;
  metadata?: Record<string, any>;
  scheduled_for?: Date;
}

export interface UpdateNotificationRequest {
  read?: boolean;
  read_at?: Date;
}

export interface NotificationFilters {
  recipient_id?: number;
  type?: NotificationType;
  priority?: Priority;
  read?: boolean;
  limit?: number;
  offset?: number;
}

export interface NotificationStats {
  total: number;
  unread: number;
  by_type: Record<NotificationType, number>;
  by_priority: Record<Priority, number>;
}

// Email notification types
export interface EmailNotificationData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface NotificationTemplate {
  subject: string;
  html: string;
  text: string;
}

// Admin notification management
export interface BulkNotificationRequest {
  title: string;
  message: string;
  type: NotificationType;
  priority?: Priority;
  recipient_ids: number[];
  sender_id?: number;
  action_url?: string;
  metadata?: Record<string, any>;
  scheduled_for?: Date;
}

export interface NotificationPreferences {
  user_id: number;
  email_notifications: boolean;
  in_app_notifications: boolean;
  notification_types: NotificationType[];
  quiet_hours_start?: string; // HH:mm format
  quiet_hours_end?: string;   // HH:mm format
} 