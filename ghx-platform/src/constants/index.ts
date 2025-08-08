// Application Constants
// Centralized constants for the entire application

// File upload constants
export const FILE_UPLOAD_CONSTANTS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  ALLOWED_DOCUMENT_TYPES: ['pdf', 'doc', 'docx', 'txt'],
  ALLOWED_ALL_TYPES: ['*']
} as const;

// Pagination constants
export const PAGINATION_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1
} as const;

// Validation constants
export const VALIDATION_CONSTANTS = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MIN_EMAIL_LENGTH: 5,
  MAX_EMAIL_LENGTH: 254,
  MIN_PHONE_LENGTH: 10,
  MAX_PHONE_LENGTH: 15
} as const;

// API constants
export const API_CONSTANTS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3
} as const;

// Theme constants
export const THEME_CONSTANTS = {
  PRIMARY_COLOR: '#3b82f6',
  SECONDARY_COLOR: '#64748b',
  SUCCESS_COLOR: '#10b981',
  WARNING_COLOR: '#f59e0b',
  ERROR_COLOR: '#ef4444',
  INFO_COLOR: '#06b6d4'
} as const;

// User roles
export const USER_ROLES = {
  GUEST: 'guest',
  STARTUP: 'startup',
  INVESTOR: 'investor',
  MENTOR: 'mentor',
  CRO: 'cro',
  HOSPITAL: 'hospital',
  ADMIN: 'admin'
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  SYSTEM: 'SYSTEM',
  PROGRAM: 'PROGRAM',
  MEETING: 'MEETING',
  APPLICATION: 'APPLICATION',
  DEADLINE: 'DEADLINE',
  COLLABORATION: 'COLLABORATION'
} as const;

// Form component types
export const FORM_COMPONENT_TYPES = {
  TEXT_FIELD: 'text-field',
  TEXT_AREA: 'text-area',
  EMAIL: 'email',
  PHONE_NUMBER: 'phone-number',
  NUMBER: 'number',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  DATE: 'date',
  FILE_UPLOAD: 'file-upload'
} as const;

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.'
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  SAVED: 'Changes saved successfully.',
  CREATED: 'Item created successfully.',
  UPDATED: 'Item updated successfully.',
  DELETED: 'Item deleted successfully.',
  SENT: 'Message sent successfully.'
} as const; 