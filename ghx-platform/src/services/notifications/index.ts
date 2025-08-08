// Notification Services Index
// Provides clean interface for all notification-related services

export { NotificationService, INotificationService } from './notification.service';

// Default instance for easy use
import { NotificationService } from './notification.service';
import { MockDatabaseService } from '../database/mock-database.service';
import { notificationEmailService } from '../email';

// Create default instance with mock database
const mockDatabase = new MockDatabaseService();
const notificationService = new NotificationService(mockDatabase, notificationEmailService);

export { notificationService, mockDatabase }; 