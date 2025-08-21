import { ApiResponse, PaginatedResponse, UserFilters } from '@/types/api';

// Interface Segregation: Separate interfaces for different concerns
export interface IAdminStatsService {
  getDashboardStats(): Promise<any>;
  getUserStats(): Promise<any>;
}

export interface IAdminUserService {
  getUsers(filters: UserFilters): Promise<PaginatedResponse<any>>;
  getUserById(id: string): Promise<any>;
  updateUser(id: string, updates: any): Promise<any>;
  deleteUser(id: string): Promise<boolean>;
}

export interface IAdminApiClient {
  get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>>;
  post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>>;
  put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>>;
  delete<T>(endpoint: string): Promise<ApiResponse<T>>;
}

// Single Responsibility: HTTP client implementation
class AdminApiClient implements IAdminApiClient {
  private baseUrl: string;
  private authToken: string;

  constructor(baseUrl: string = '/api/admin', authToken?: string) {
    this.baseUrl = baseUrl;
    this.authToken = authToken || 'admin-token'; // Mock token for development
  }

  private async request<T>(
    method: string,
    endpoint: string,
    data?: any
  ): Promise<ApiResponse<T>> {
    try {
      let url = `${this.baseUrl}${endpoint}`;
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}`
        }
      };

      if (data && method !== 'GET') {
        options.body = JSON.stringify(data);
      }

      if (method === 'GET' && data) {
        const params = new URLSearchParams();
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, String(value));
          }
        });
        const queryString = params.toString();
        if (queryString) {
          url += `?${queryString}`;
        }
      }

      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `HTTP ${response.status}`);
      }

      return result;
    } catch (error) {
      console.error(`Admin API ${method} error:`, error);
      throw error;
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, params);
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data);
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data);
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint);
  }
}

// Single Responsibility: Admin statistics service
export class AdminStatsService implements IAdminStatsService {
  constructor(private apiClient: IAdminApiClient) {}

  async getDashboardStats(): Promise<any> {
    const response = await this.apiClient.get('/stats', { type: 'dashboard' });
    return response.data;
  }

  async getUserStats(): Promise<any> {
    const response = await this.apiClient.get('/stats', { type: 'users' });
    return response.data;
  }
}

// Single Responsibility: Admin user service
export class AdminUserService implements IAdminUserService {
  constructor(private apiClient: IAdminApiClient) {}

  async getUsers(filters: UserFilters): Promise<PaginatedResponse<any>> {
    const response = await this.apiClient.get('/users', filters);
    return response as PaginatedResponse<any>;
  }

  async getUserById(id: string): Promise<any> {
    const response = await this.apiClient.get(`/users/${id}`);
    return response.data;
  }

  async updateUser(id: string, updates: any): Promise<any> {
    const response = await this.apiClient.put(`/users/${id}`, updates);
    return response.data;
  }

  async deleteUser(id: string): Promise<boolean> {
    const response = await this.apiClient.delete(`/users/${id}`);
    return response.success;
  }
}

// Factory pattern for creating services
export class AdminServiceFactory {
  private static apiClient: IAdminApiClient;

  static getApiClient(): IAdminApiClient {
    if (!this.apiClient) {
      this.apiClient = new AdminApiClient();
    }
    return this.apiClient;
  }

  static getStatsService(): IAdminStatsService {
    return new AdminStatsService(this.getApiClient());
  }

  static getUserService(): IAdminUserService {
    return new AdminUserService(this.getApiClient());
  }
}

// Convenience exports
export const adminStatsService = AdminServiceFactory.getStatsService();
export const adminUserService = AdminServiceFactory.getUserService();
