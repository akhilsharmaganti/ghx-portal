import { NextRequest } from 'next/server';
import { ApiErrorHandler, ErrorCode } from '@/lib/api-utils';

// Interface Segregation: Separate concerns for different auth levels
export interface AuthUser {
  id: string;
  email: string;
  role: 'user' | 'admin' | 'moderator';
  permissions: string[];
}

export interface AuthContext {
  user: AuthUser;
  isAuthenticated: boolean;
  isAdmin: boolean;
  hasPermission: (permission: string) => boolean;
}

// Single Responsibility: Authentication validation
export class AuthValidator {
  static async validateToken(token: string): Promise<AuthUser | null> {
    try {
      // TODO: Implement actual JWT validation
      // For now, return mock admin user
      if (token === 'admin-token') {
        return {
          id: 'admin-1',
          email: 'admin@ghx.com',
          role: 'admin',
          permissions: ['read:users', 'write:users', 'read:admin', 'write:admin']
        };
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  static extractToken(request: NextRequest): string | null {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7);
  }
}

// Single Responsibility: Permission checking
export class PermissionChecker {
  static hasPermission(user: AuthUser, permission: string): boolean {
    return user.permissions.includes(permission);
  }

  static hasRole(user: AuthUser, role: string): boolean {
    return user.role === role;
  }

  static isAdmin(user: AuthUser): boolean {
    return user.role === 'admin';
  }
}

// Single Responsibility: Route protection
export class RouteGuard {
  static async authenticate(request: NextRequest): Promise<AuthContext | null> {
    const token = AuthValidator.extractToken(request);
    if (!token) {
      return null;
    }

    const user = await AuthValidator.validateToken(token);
    if (!user) {
      return null;
    }

    return {
      user,
      isAuthenticated: true,
      isAdmin: PermissionChecker.isAdmin(user),
      hasPermission: (permission: string) => PermissionChecker.hasPermission(user, permission)
    };
  }

  static requireAuth(authContext: AuthContext | null): AuthContext {
    if (!authContext || !authContext.isAuthenticated) {
      throw new Error('Authentication required');
    }
    return authContext;
  }

  static requireAdmin(authContext: AuthContext | null): AuthContext {
    const user = this.requireAuth(authContext);
    if (!user.isAdmin) {
      throw new Error('Admin access required');
    }
    return user;
  }

  static requirePermission(authContext: AuthContext | null, permission: string): AuthContext {
    const user = this.requireAuth(authContext);
    if (!user.hasPermission(permission)) {
      throw new Error(`Permission '${permission}' required`);
    }
    return user;
  }
}

// Factory pattern for creating auth contexts
export class AuthContextFactory {
  static createFromRequest(request: NextRequest): Promise<AuthContext | null> {
    return RouteGuard.authenticate(request);
  }

  static createMockAdmin(): AuthContext {
    return {
      user: {
        id: 'admin-1',
        email: 'admin@ghx.com',
        role: 'admin',
        permissions: ['read:users', 'write:users', 'read:admin', 'write:admin']
      },
      isAuthenticated: true,
      isAdmin: true,
      hasPermission: (permission: string) => true
    };
  }
}
