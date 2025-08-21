import { useState, useEffect, useCallback } from 'react';
import { adminStatsService, adminUserService } from '@/services/admin';
import { UserFilters } from '@/types/api';

// Single Responsibility: Admin data state management
interface AdminDataState {
  dashboardStats: any;
  userStats: any;
  users: any[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  loading: boolean;
  error: string | null;
}

// Single Responsibility: Admin data actions
interface AdminDataActions {
  fetchDashboardStats: () => Promise<void>;
  fetchUserStats: () => Promise<void>;
  fetchUsers: (filters: UserFilters) => Promise<void>;
  refreshData: () => Promise<void>;
  clearError: () => void;
}

// Single Responsibility: Admin data hook
export function useAdminData() {
  const [state, setState] = useState<AdminDataState>({
    dashboardStats: null,
    userStats: null,
    users: [],
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false
    },
    loading: false,
    error: null
  });

  // Single Responsibility: Set loading state
  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  // Single Responsibility: Set error state
  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error, loading: false }));
  }, []);

  // Single Responsibility: Fetch dashboard statistics
  const fetchDashboardStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const stats = await adminStatsService.getDashboardStats();
      
      setState(prev => ({
        ...prev,
        dashboardStats: stats,
        loading: false
      }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch dashboard stats');
    }
  }, [setLoading, setError]);

  // Single Responsibility: Fetch user statistics
  const fetchUserStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const stats = await adminStatsService.getUserStats();
      
      setState(prev => ({
        ...prev,
        userStats: stats,
        loading: false
      }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch user stats');
    }
  }, [setLoading, setError]);

  // Single Responsibility: Fetch users with filters
  const fetchUsers = useCallback(async (filters: UserFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await adminUserService.getUsers(filters);
      
      setState(prev => ({
        ...prev,
        users: response.data || [],
        pagination: response.pagination || {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false
        },
        loading: false
      }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch users');
    }
  }, [setLoading, setError]);

  // Single Responsibility: Refresh all data
  const refreshData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      await Promise.all([
        fetchDashboardStats(),
        fetchUserStats(),
        fetchUsers({ page: 1, limit: 10 })
      ]);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to refresh data');
    }
  }, [fetchDashboardStats, fetchUserStats, fetchUsers, setLoading, setError]);

  // Single Responsibility: Clear error state
  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  // Single Responsibility: Initialize data on mount
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const actions: AdminDataActions = {
    fetchDashboardStats,
    fetchUserStats,
    fetchUsers,
    refreshData,
    clearError
  };

  return {
    ...state,
    ...actions
  };
}
