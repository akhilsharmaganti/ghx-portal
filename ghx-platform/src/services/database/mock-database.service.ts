// Mock Database Service
// Implements database interfaces for development
// Follows Liskov Substitution Principle

import { 
  Notification, 
  CreateNotificationRequest, 
  UpdateNotificationRequest, 
  NotificationFilters 
} from '@/types/notification';
import { 
  INotificationRepository, 
  IUserRepository, 
  IDatabaseService 
} from './database.interface';

// Mock Notification Repository
class MockNotificationRepository implements INotificationRepository {
  private notifications: Notification[] = [];
  private nextId = 1;

  async create(data: CreateNotificationRequest): Promise<Notification> {
    const notification: Notification = {
      notification_id: this.nextId++,
      title: data.title,
      message: data.message,
      type: data.type,
      priority: data.priority || 'MEDIUM',
      read: false,
      email_sent: false,
      recipient_id: data.recipient_id,
      sender_id: data.sender_id,
      action_url: data.action_url,
      metadata: data.metadata,
      created_at: new Date(),
      scheduled_for: data.scheduled_for
    };

    this.notifications.push(notification);
    return notification;
  }

  async findMany(filters: NotificationFilters): Promise<Notification[]> {
    let filtered = [...this.notifications];
    
    if (filters.recipient_id) {
      filtered = filtered.filter(n => n.recipient_id === filters.recipient_id);
    }
    if (filters.type) {
      filtered = filtered.filter(n => n.type === filters.type);
    }
    if (filters.priority) {
      filtered = filtered.filter(n => n.priority === filters.priority);
    }
    if (filters.read !== undefined) {
      filtered = filtered.filter(n => n.read === filters.read);
    }

    // Sort by created_at desc
    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    // Apply pagination
    if (filters.limit) {
      filtered = filtered.slice(0, filters.limit);
    }
    if (filters.offset) {
      filtered = filtered.slice(filters.offset);
    }

    return filtered;
  }

  async findById(id: number): Promise<Notification | null> {
    return this.notifications.find(n => n.notification_id === id) || null;
  }

  async update(id: number, data: UpdateNotificationRequest): Promise<Notification> {
    const index = this.notifications.findIndex(n => n.notification_id === id);
    if (index === -1) {
      throw new Error('Notification not found');
    }

    this.notifications[index] = { ...this.notifications[index], ...data };
    return this.notifications[index];
  }

  async delete(id: number): Promise<void> {
    const index = this.notifications.findIndex(n => n.notification_id === id);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  }

  async count(filters: NotificationFilters): Promise<number> {
    const notifications = await this.findMany(filters);
    return notifications.length;
  }
}

// Mock User Repository
class MockUserRepository implements IUserRepository {
  private users = [
    { user_id: 1, email: 'admin@ghx.com', first_name: 'Admin', last_name: 'User' },
    { user_id: 2, email: 'user@example.com', first_name: 'John', last_name: 'Doe' },
    { user_id: 3, email: 'startup@example.com', first_name: 'Jane', last_name: 'Smith' }
  ];

  async findById(id: number): Promise<{ user_id: number; email: string; first_name: string; last_name: string } | null> {
    return this.users.find(u => u.user_id === id) || null;
  }

  async findByEmail(email: string): Promise<{ user_id: number; email: string; first_name: string; last_name: string } | null> {
    return this.users.find(u => u.email === email) || null;
  }
}

// Mock Database Service
export class MockDatabaseService implements IDatabaseService {
  public readonly notifications: INotificationRepository;
  public readonly users: IUserRepository;
  private connected = false;

  constructor() {
    this.notifications = new MockNotificationRepository();
    this.users = new MockUserRepository();
  }

  async connect(): Promise<void> {
    this.connected = true;
    console.log('Mock database connected');
  }

  async disconnect(): Promise<void> {
    this.connected = false;
    console.log('Mock database disconnected');
  }

  isConnected(): boolean {
    return this.connected;
  }
} 