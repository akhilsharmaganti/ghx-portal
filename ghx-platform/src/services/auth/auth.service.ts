// Authentication Service
// Handles authentication business logic
// Follows Single Responsibility Principle

import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { RegisterFormData, AuthResponse } from '@/types/auth';
import { IAuthService } from './auth.interface';

export class AuthService implements IAuthService {
  // Single Responsibility: Handle user registration
  async registerUser(data: RegisterFormData): Promise<AuthResponse> {
    try {
      // Check if user already exists
      const existingUser = await prisma.users.findUnique({
        where: { email: data.email }
      });

      if (existingUser) {
        return {
          success: false,
          message: 'User with this email already exists'
        };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 12);

      // Create user with default guest role
      const user = await prisma.users.create({
        data: {
          email: data.email,
          password_hash: hashedPassword,
          first_name: data.firstName,
          last_name: data.lastName,
          created_at: new Date(),
        }
      });

      // Assign default guest role
      await prisma.user_Ecosystem_Roles.create({
        data: {
          user_id: user.user_id,
          role: 'guest',
          is_active: true
        }
      });

      return {
        success: true,
        message: 'User registered successfully',
        user: {
          id: user.user_id.toString(),
          email: user.email,
          name: `${user.first_name} ${user.last_name}`
        }
      };
    } catch (error: unknown) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'An error occurred during registration'
      };
    }
  }

  // Single Responsibility: Validate user credentials
  async validateUser(email: string, password: string): Promise<AuthResponse> {
    try {
      const user = await prisma.users.findUnique({
        where: { email }
      });

      if (!user) {
        return {
          success: false,
          message: 'Invalid credentials'
        };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password_hash);

      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Invalid credentials'
        };
      }

      // Update last login
      await this.updateLastLogin(user.user_id);

      return {
        success: true,
        message: 'Login successful',
        user: {
          id: user.user_id.toString(),
          email: user.email,
          name: `${user.first_name} ${user.last_name}`
        }
      };
    } catch (error: unknown) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'An error occurred during login'
      };
    }
  }

  // Single Responsibility: Update last login
  async updateLastLogin(userId: number): Promise<void> {
    try {
      await prisma.users.update({
        where: { user_id: userId },
        data: { last_login_at: new Date() }
      });
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  }

  // Single Responsibility: Change password
  async changePassword(userId: number, oldPassword: string, newPassword: string): Promise<AuthResponse> {
    try {
      const user = await prisma.users.findUnique({
        where: { user_id: userId }
      });

      if (!user) {
        return {
          success: false,
          message: 'User not found'
        };
      }

      // Verify old password
      const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password_hash);
      if (!isOldPasswordValid) {
        return {
          success: false,
          message: 'Current password is incorrect'
        };
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);

      // Update password
      await prisma.users.update({
        where: { user_id: userId },
        data: { password_hash: hashedNewPassword }
      });

      return {
        success: true,
        message: 'Password changed successfully'
      };
    } catch (error: unknown) {
      console.error('Password change error:', error);
      return {
        success: false,
        message: 'An error occurred while changing password'
      };
    }
  }

  // Single Responsibility: Reset password
  async resetPassword(email: string): Promise<AuthResponse> {
    try {
      const user = await prisma.users.findUnique({
        where: { email }
      });

      if (!user) {
        return {
          success: false,
          message: 'User not found'
        };
      }

      // Generate temporary password
      const tempPassword = Math.random().toString(36).slice(-8);
      const hashedTempPassword = await bcrypt.hash(tempPassword, 12);

      // Update password
      await prisma.users.update({
        where: { user_id: user.user_id },
        data: { password_hash: hashedTempPassword }
      });

      // TODO: Send email with temporary password
      // This would integrate with our notification service

      return {
        success: true,
        message: 'Password reset email sent'
      };
    } catch (error: unknown) {
      console.error('Password reset error:', error);
      return {
        success: false,
        message: 'An error occurred while resetting password'
      };
    }
  }
} 