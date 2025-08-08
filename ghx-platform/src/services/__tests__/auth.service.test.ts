// Authentication Service Tests
// Tests the core authentication business logic

import { AuthService } from '../auth/auth.service';
import { ValidationUtils } from '@/utils/validation';
import { VALIDATION_CONSTANTS } from '@/constants';

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    users: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    user_Ecosystem_Roles: {
      create: jest.fn(),
    },
  },
}));

import { prisma } from '@/lib/prisma';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    const mockUserData = {
      email: 'test@example.com',
      password: 'TestPassword123!',
      firstName: 'John',
      lastName: 'Doe'
    };

    it('should successfully register a new user', async () => {
      // Mock existing user check
      (prisma.users.findUnique as jest.Mock).mockResolvedValue(null);
      
      // Mock user creation
      (prisma.users.create as jest.Mock).mockResolvedValue({
        user_id: 1,
        email: mockUserData.email,
        first_name: mockUserData.firstName,
        last_name: mockUserData.lastName,
        created_at: new Date()
      });

      // Mock role assignment
      (prisma.user_Ecosystem_Roles.create as jest.Mock).mockResolvedValue({
        user_id: 1,
        role: 'guest',
        is_active: true
      });

      const result = await authService.registerUser(mockUserData);

      expect(result.success).toBe(true);
      expect(result.message).toBe('User registered successfully');
      expect(result.user).toEqual({
        id: '1',
        email: mockUserData.email,
        name: `${mockUserData.firstName} ${mockUserData.lastName}`
      });
    });

    it('should fail if user already exists', async () => {
      // Mock existing user
      (prisma.users.findUnique as jest.Mock).mockResolvedValue({
        user_id: 1,
        email: mockUserData.email
      });

      const result = await authService.registerUser(mockUserData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('User with this email already exists');
    });

    it('should handle database errors gracefully', async () => {
      (prisma.users.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'));

      const result = await authService.registerUser(mockUserData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('An error occurred during registration');
    });
  });

  describe('validateUser', () => {
    const mockCredentials = {
      email: 'test@example.com',
      password: 'TestPassword123!'
    };

    it('should successfully validate correct credentials', async () => {
      const mockUser = {
        user_id: 1,
        email: mockCredentials.email,
        first_name: 'John',
        last_name: 'Doe',
        password_hash: '$2a$12$hashedpassword'
      };

      (prisma.users.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prisma.users.update as jest.Mock).mockResolvedValue(mockUser);

      // Mock bcrypt compare to return true
      const bcrypt = require('bcryptjs');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await authService.validateUser(mockCredentials.email, mockCredentials.password);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Login successful');
      expect(result.user).toEqual({
        id: '1',
        email: mockCredentials.email,
        name: 'John Doe'
      });
    });

    it('should fail with invalid email', async () => {
      (prisma.users.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await authService.validateUser('invalid@example.com', 'password');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid credentials');
    });

    it('should fail with invalid password', async () => {
      const mockUser = {
        user_id: 1,
        email: mockCredentials.email,
        password_hash: '$2a$12$hashedpassword'
      };

      (prisma.users.findUnique as jest.Mock).mockResolvedValue(mockUser);

      // Mock bcrypt compare to return false
      const bcrypt = require('bcryptjs');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const result = await authService.validateUser(mockCredentials.email, 'wrongpassword');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid credentials');
    });
  });

  describe('changePassword', () => {
    it('should successfully change password with correct old password', async () => {
      const mockUser = {
        user_id: 1,
        password_hash: '$2a$12$oldhashedpassword'
      };

      (prisma.users.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prisma.users.update as jest.Mock).mockResolvedValue(mockUser);

      const bcrypt = require('bcryptjs');
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true); // Old password correct
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('$2a$12$newhashedpassword');

      const result = await authService.changePassword(1, 'oldpassword', 'newpassword');

      expect(result.success).toBe(true);
      expect(result.message).toBe('Password changed successfully');
    });

    it('should fail with incorrect old password', async () => {
      const mockUser = {
        user_id: 1,
        password_hash: '$2a$12$oldhashedpassword'
      };

      (prisma.users.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const bcrypt = require('bcryptjs');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false); // Old password incorrect

      const result = await authService.changePassword(1, 'wrongoldpassword', 'newpassword');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Current password is incorrect');
    });
  });
}); 