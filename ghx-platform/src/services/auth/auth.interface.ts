// Authentication Service Interfaces
// Follows Interface Segregation Principle

import { RegisterFormData, AuthResponse } from '@/types/auth';

export interface IAuthService {
  registerUser(data: RegisterFormData): Promise<AuthResponse>;
  validateUser(email: string, password: string): Promise<AuthResponse>;
  updateLastLogin(userId: number): Promise<void>;
  changePassword(userId: number, oldPassword: string, newPassword: string): Promise<AuthResponse>;
  resetPassword(email: string): Promise<AuthResponse>;
}

export interface IAuthConfigService {
  getAuthOptions(): any; // NextAuth options
  validateEmail(email: string): boolean;
  validatePassword(password: string): { isValid: boolean; errors: string[] };
} 