// Single Responsibility: Authentication business logic
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { RegisterFormData, AuthResponse } from '@/types/auth';

export class AuthService {
  // Single Responsibility: Handle user registration
  static async registerUser(data: RegisterFormData): Promise<AuthResponse> {
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
  static async validateUser(email: string, password: string): Promise<AuthResponse> {
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
      await prisma.users.update({
        where: { user_id: user.user_id },
        data: { last_login_at: new Date() }
      });

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
}