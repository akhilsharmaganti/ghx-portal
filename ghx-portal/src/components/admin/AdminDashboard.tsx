'use client';

import React, { useState, useEffect } from 'react';
import { AdminStats } from '@/components/admin/AdminStats';
import { AdminQuickActions } from '@/components/admin/AdminQuickActions';
import { AdminRecentActivity } from '@/components/admin/AdminRecentActivity';
import { AdminCharts } from '@/components/admin/AdminCharts';
import { LoadingSpinner } from '@/components/ui';

export function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Monitor platform activity, manage users, and control system settings
        </p>
      </div>

      {/* Quick Stats */}
      <AdminStats />

      {/* Quick Actions Grid */}
      <AdminQuickActions />

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <AdminCharts />
        <AdminRecentActivity />
      </div>
    </div>
  );
}
