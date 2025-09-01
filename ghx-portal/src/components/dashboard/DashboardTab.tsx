'use client';

import React from 'react';
import { useDashboardStore } from '@/store/dashboardStore';

export const DashboardTab: React.FC = () => {
  const { currentUser } = useDashboardStore();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome, {currentUser?.firstName || 'User'}!
        </h1>
      </div>
    </div>
  );
};

