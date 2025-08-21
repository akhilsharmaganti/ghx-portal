import { ApiResponse, ApiError, ErrorCode, HttpStatus } from '@/types/api';

// Re-export ErrorCode for use in other files
export { ErrorCode } from '@/types/api';

// Single Responsibility: Response formatting
export class ApiResponseBuilder {
  static success<T>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString()
    };
  }

  static error(error: string, code?: ErrorCode): ApiResponse<never> {
    return {
      success: false,
      error,
      timestamp: new Date().toISOString()
    };
  }

  static paginated<T>(
    data: T[],
    page: number,
    limit: number,
    total: number
  ) {
    const totalPages = Math.ceil(total / limit);
    return {
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      },
      timestamp: new Date().toISOString()
    };
  }
}

// Single Responsibility: Error handling
export class ApiErrorHandler {
  static createError(code: ErrorCode, message: string, details?: Record<string, any>): ApiError {
    return {
      code,
      message,
      details,
      timestamp: new Date().toISOString()
    };
  }

  static getHttpStatus(errorCode: ErrorCode): HttpStatus {
    const statusMap: Record<ErrorCode, HttpStatus> = {
      [ErrorCode.VALIDATION_FAILED]: 422,
      [ErrorCode.UNAUTHORIZED]: 401,
      [ErrorCode.FORBIDDEN]: 403,
      [ErrorCode.NOT_FOUND]: 404,
      [ErrorCode.CONFLICT]: 409,
      [ErrorCode.RATE_LIMITED]: 429,
      [ErrorCode.INTERNAL_ERROR]: 500
    };
    return statusMap[errorCode] || 500;
  }
}

// Single Responsibility: Request validation
export class RequestValidator {
  static validatePagination(page?: number, limit?: number): { page: number; limit: number } {
    const validPage = Math.max(1, page || 1);
    const validLimit = Math.min(100, Math.max(1, limit || 10));
    return { page: validPage, limit: validLimit };
  }

  static validateSearchQuery(query?: string): string | undefined {
    if (!query) return undefined;
    return query.trim().length > 0 ? query.trim() : undefined;
  }

  static validateDateRange(start?: string, end?: string): { start?: string; end?: string } | null {
    if (!start && !end) return null;
    
    try {
      const startDate = start ? new Date(start) : null;
      const endDate = end ? new Date(end) : null;
      
      if (startDate && isNaN(startDate.getTime())) return null;
      if (endDate && isNaN(endDate.getTime())) return null;
      
      if (startDate && endDate && startDate > endDate) return null;
      
      return { start, end };
    } catch {
      return null;
    }
  }
}

// Single Responsibility: Response formatting for Next.js
export class NextApiResponse {
  static send<T>(res: Response, data: ApiResponse<T>, status: HttpStatus = 200): Response {
    return new Response(JSON.stringify(data), {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  }

  static sendError(res: Response, error: ApiError, status?: HttpStatus): Response {
    const httpStatus = status || ApiErrorHandler.getHttpStatus(error.code as ErrorCode);
    return this.send(res, ApiResponseBuilder.error(error.message, error.code as ErrorCode), httpStatus);
  }
}
