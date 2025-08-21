import { useState, useEffect, useCallback } from 'react';
import { AdminService } from '@/services/admin';
import { 
  AdminStats, 
  AdminActivity, 
  AdminNotification,
  AdminSearchParams 
} from '@/types/admin';

// Hook for admin dashboard statistics
export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await AdminService.getStats();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}

// Hook for admin activities
export function useAdminActivities(limit: number = 10) {
  const [activities, setActivities] = useState<AdminActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await AdminService.getRecentActivities(limit);
      setActivities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch activities');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return { activities, loading, error, refetch: fetchActivities };
}

// Hook for admin notifications
export function useAdminNotifications() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await AdminService.getNotifications();
      setNotifications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      await AdminService.markNotificationAsRead(notificationId);
      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId ? { ...n, read: true } : n
        )
      );
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return { 
    notifications, 
    loading, 
    error, 
    refetch: fetchNotifications,
    markAsRead 
  };
}

// Hook for admin search
export function useAdminSearch() {
  const [searchParams, setSearchParams] = useState<AdminSearchParams>({
    query: '',
    filters: { dateRange: '7d' },
    sortBy: 'timestamp',
    sortOrder: 'desc',
    page: 1,
    limit: 20
  });

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = useCallback(async (params: AdminSearchParams) => {
    try {
      setLoading(true);
      setError(null);
      const result = await AdminService.search(params);
      setSearchResults(result.results);
      setTotalResults(result.total);
      setTotalPages(result.totalPages);
      setSearchParams(params);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFilters = useCallback((newFilters: Partial<AdminSearchParams['filters']>) => {
    const updatedParams = {
      ...searchParams,
      filters: { ...searchParams.filters, ...newFilters },
      page: 1 // Reset to first page when filters change
    };
    performSearch(updatedParams);
  }, [searchParams, performSearch]);

  const goToPage = useCallback((page: number) => {
    const updatedParams = { ...searchParams, page };
    performSearch(updatedParams);
  }, [searchParams, performSearch]);

  return {
    searchParams,
    searchResults,
    totalResults,
    totalPages,
    loading,
    error,
    performSearch,
    updateFilters,
    goToPage
  };
}
