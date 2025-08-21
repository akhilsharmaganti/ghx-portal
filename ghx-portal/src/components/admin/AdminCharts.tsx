'use client';

import React from 'react';
import { TrendingUp, Users, Briefcase, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui';

export function AdminCharts() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
          User Registration Trends
        </h3>
        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
          View Details
        </Button>
      </div>
      
      <div className="h-48 sm:h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-2" />
          <p className="text-sm sm:text-base text-gray-500">Charts coming soon</p>
          <p className="text-xs text-gray-400">Integration with Chart.js or Recharts</p>
        </div>
      </div>
      
      <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="text-center">
          <p className="text-lg sm:text-xl font-bold text-gray-900">1,234</p>
          <p className="text-xs sm:text-sm text-gray-500">Total Users</p>
        </div>
        <div className="text-center">
          <p className="text-lg sm:text-xl font-bold text-green-600">+156</p>
          <p className="text-xs sm:text-sm text-gray-500">This Week</p>
        </div>
        <div className="text-center">
          <p className="text-lg sm:text-xl font-bold text-blue-600">+89</p>
          <p className="text-xs sm:text-sm text-gray-500">This Month</p>
        </div>
        <div className="text-center">
          <p className="text-lg sm:text-xl font-bold text-purple-600">12.5%</p>
          <p className="text-xs sm:text-sm text-gray-500">Growth Rate</p>
        </div>
      </div>
    </div>
  );
}
