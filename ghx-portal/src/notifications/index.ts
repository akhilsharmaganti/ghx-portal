// Notification Services Index
// Export all notification services for easy importing

// Core services
export { 
  NotificationService, 
  notificationService,
  type NotificationRequest,
  type NotificationResult 
} from './core/notification.service';

// Domain-specific services
export { 
  ProgramNotificationService, 
  programNotificationService
} from './programs/program-notifications.service';

// TODO: Add other services as we build them
// export { MentorNotificationService, mentorNotificationService } from './mentors/mentor-notifications.service';
// export { CalendarNotificationService, calendarNotificationService } from './calendar/calendar-notifications.service';

// Re-export types for convenience
export type { NotificationRequest, NotificationResult } from './core/notification.service';
