// Database Interfaces
// Follows Interface Segregation Principle

import { 
  Notification, 
  CreateNotificationRequest, 
  UpdateNotificationRequest, 
  NotificationFilters, 
  NotificationStats 
} from '@/types/notification';

export interface INotificationRepository {
  create(data: CreateNotificationRequest): Promise<Notification>;
  findMany(filters: NotificationFilters): Promise<Notification[]>;
  findById(id: number): Promise<Notification | null>;
  update(id: number, data: UpdateNotificationRequest): Promise<Notification>;
  delete(id: number): Promise<void>;
  count(filters: NotificationFilters): Promise<number>;
}

export interface IUserRepository {
  findById(id: number): Promise<{ user_id: number; email: string; first_name: string; last_name: string } | null>;
  findByEmail(email: string): Promise<{ user_id: number; email: string; first_name: string; last_name: string } | null>;
}

export interface IDatabaseService {
  notifications: INotificationRepository;
  users: IUserRepository;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
} 