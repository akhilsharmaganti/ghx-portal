// Validation Utilities Tests
// Tests the validation utility functions

import { ValidationUtils } from '../validation';
import { VALIDATION_CONSTANTS } from '@/constants';

describe('ValidationUtils', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        '123@numbers.com'
      ];

      validEmails.forEach(email => {
        expect(ValidationUtils.isValidEmail(email)).toBe(true);
      });
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'user@',
        'user..name@example.com',
        'user@.com',
        ''
      ];

      invalidEmails.forEach(email => {
        expect(ValidationUtils.isValidEmail(email)).toBe(false);
      });
    });
  });

  describe('validatePassword', () => {
    it('should validate strong passwords', () => {
      const strongPassword = 'StrongPass123!';
      const result = ValidationUtils.validatePassword(strongPassword);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject weak passwords', () => {
      const weakPasswords = [
        'short', // Too short
        'nouppercase123!', // No uppercase
        'NOLOWERCASE123!', // No lowercase
        'NoNumbers!', // No numbers
        'NoSpecial123' // No special characters
      ];

      weakPasswords.forEach(password => {
        const result = ValidationUtils.validatePassword(password);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      });
    });

    it('should provide specific error messages', () => {
      const password = 'weak';
      const result = ValidationUtils.validatePassword(password);

      expect(result.errors).toContain('Password must be at least 8 characters long');
      expect(result.errors).toContain('Password must contain at least one uppercase letter');
      expect(result.errors).toContain('Password must contain at least one lowercase letter');
      expect(result.errors).toContain('Password must contain at least one number');
      expect(result.errors).toContain('Password must contain at least one special character');
    });
  });

  describe('isValidPhoneNumber', () => {
    it('should validate correct phone numbers', () => {
      const validPhones = [
        '+1234567890',
        '1234567890',
        '+44123456789',
        '123456789012345'
      ];

      validPhones.forEach(phone => {
        expect(ValidationUtils.isValidPhoneNumber(phone)).toBe(true);
      });
    });

    it('should reject invalid phone numbers', () => {
      const invalidPhones = [
        '123', // Too short
        'abcdefghij', // Letters
        '+0123456789', // Starts with +0
        '1234567890123456', // Too long
        ''
      ];

      invalidPhones.forEach(phone => {
        expect(ValidationUtils.isValidPhoneNumber(phone)).toBe(false);
      });
    });
  });

  describe('isValidUrl', () => {
    it('should validate correct URLs', () => {
      const validUrls = [
        'https://example.com',
        'http://www.example.org',
        'https://subdomain.example.co.uk/path?param=value',
        'ftp://files.example.com'
      ];

      validUrls.forEach(url => {
        expect(ValidationUtils.isValidUrl(url)).toBe(true);
      });
    });

    it('should reject invalid URLs', () => {
      const invalidUrls = [
        'not-a-url',
        'http://',
        'https://',
        'ftp://',
        'example.com', // Missing protocol
        ''
      ];

      invalidUrls.forEach(url => {
        expect(ValidationUtils.isValidUrl(url)).toBe(false);
      });
    });
  });

  describe('isValidDate', () => {
    it('should validate correct dates', () => {
      const validDates = [
        '2023-12-25',
        '2023/12/25',
        '12/25/2023',
        '2023-12-25T10:30:00Z'
      ];

      validDates.forEach(date => {
        expect(ValidationUtils.isValidDate(date)).toBe(true);
      });
    });

    it('should reject invalid dates', () => {
      const invalidDates = [
        '2023-13-45', // Invalid month/day
        'not-a-date',
        '2023-12-32', // Invalid day
        '2023-00-01', // Invalid month
        ''
      ];

      invalidDates.forEach(date => {
        expect(ValidationUtils.isValidDate(date)).toBe(false);
      });
    });
  });

  describe('isValidFileSize', () => {
    it('should validate file sizes within limits', () => {
      const maxSize = 1024 * 1024; // 1MB
      const validSizes = [0, 512 * 1024, maxSize];

      validSizes.forEach(size => {
        expect(ValidationUtils.isValidFileSize(size, maxSize)).toBe(true);
      });
    });

    it('should reject files exceeding size limit', () => {
      const maxSize = 1024 * 1024; // 1MB
      const invalidSize = 2 * 1024 * 1024; // 2MB

      expect(ValidationUtils.isValidFileSize(invalidSize, maxSize)).toBe(false);
    });
  });

  describe('isValidFileType', () => {
    it('should validate allowed file types', () => {
      const allowedTypes = ['jpg', 'png', 'pdf'];
      const validFiles = [
        'document.jpg',
        'image.png',
        'report.pdf'
      ];

      validFiles.forEach(file => {
        expect(ValidationUtils.isValidFileType(file, allowedTypes)).toBe(true);
      });
    });

    it('should reject disallowed file types', () => {
      const allowedTypes = ['jpg', 'png', 'pdf'];
      const invalidFiles = [
        'document.exe',
        'image.gif',
        'report.txt'
      ];

      invalidFiles.forEach(file => {
        expect(ValidationUtils.isValidFileType(file, allowedTypes)).toBe(false);
      });
    });

    it('should handle wildcard types', () => {
      const wildcardTypes = ['*'];
      const anyFile = 'document.xyz';

      expect(ValidationUtils.isValidFileType(anyFile, wildcardTypes)).toBe(true);
    });
  });

  describe('isRequired', () => {
    it('should validate required string values', () => {
      expect(ValidationUtils.isRequired('valid string')).toBe(true);
      expect(ValidationUtils.isRequired(' ')).toBe(false); // Only whitespace
      expect(ValidationUtils.isRequired('')).toBe(false);
    });

    it('should validate required array values', () => {
      expect(ValidationUtils.isRequired([1, 2, 3])).toBe(true);
      expect(ValidationUtils.isRequired([])).toBe(false);
    });

    it('should validate required other values', () => {
      expect(ValidationUtils.isRequired(0)).toBe(true);
      expect(ValidationUtils.isRequired(false)).toBe(true);
      expect(ValidationUtils.isRequired(null)).toBe(false);
      expect(ValidationUtils.isRequired(undefined)).toBe(false);
    });
  });

  describe('isValidLength', () => {
    it('should validate string lengths within range', () => {
      const testString = 'test';
      expect(ValidationUtils.isValidLength(testString, 2, 10)).toBe(true);
      expect(ValidationUtils.isValidLength(testString, 4, 4)).toBe(true);
    });

    it('should reject strings outside range', () => {
      const testString = 'test';
      expect(ValidationUtils.isValidLength(testString, 5, 10)).toBe(false); // Too short
      expect(ValidationUtils.isValidLength(testString, 1, 3)).toBe(false); // Too long
    });
  });

  describe('isValidNumberRange', () => {
    it('should validate numbers within range', () => {
      expect(ValidationUtils.isValidNumberRange(5, 1, 10)).toBe(true);
      expect(ValidationUtils.isValidNumberRange(1, 1, 10)).toBe(true);
      expect(ValidationUtils.isValidNumberRange(10, 1, 10)).toBe(true);
    });

    it('should reject numbers outside range', () => {
      expect(ValidationUtils.isValidNumberRange(0, 1, 10)).toBe(false);
      expect(ValidationUtils.isValidNumberRange(11, 1, 10)).toBe(false);
    });
  });
}); 