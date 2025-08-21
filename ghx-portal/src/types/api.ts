// API Response Types - Following Interface Segregation Principle
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Error Types - Single Responsibility Principle
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
}

// HTTP Status Types
export type HttpStatus = 
  | 200 | 201 | 204
  | 400 | 401 | 403 | 404 | 409 | 422 | 429
  | 500 | 502 | 503;

// Request Types - Open/Closed Principle (extensible)
export interface BaseRequest {
  userId?: string;
  timestamp: string;
}

export interface PaginationRequest {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Filter Types - Interface Segregation
export interface UserFilters extends PaginationRequest {
  search?: string;
  status?: 'active' | 'inactive' | 'pending';
  userType?: 'innovator' | 'investor' | 'mentor' | 'admin';
  company?: string;
  dateRange?: {
    start?: string;
    end?: string;
  };
}

// Response Enums - Dependency Inversion Principle
export enum ResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  VALIDATION_ERROR = 'validation_error',
  AUTH_ERROR = 'auth_error',
  NOT_FOUND = 'not_found'
}

export enum ErrorCode {
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  RATE_LIMITED = 'RATE_LIMITED'
}
