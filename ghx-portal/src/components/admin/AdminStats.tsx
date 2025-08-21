'use client';

import React from 'react';
import { 
  Users, 
  Briefcase, 
  UserCheck, 
  Calendar,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  color 
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs sm:text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{value}</p>
        <div className="flex items-center mt-2">
          {changeType === 'increase' ? (
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 mr-1" />
          )}
          <span className={`text-xs sm:text-sm font-medium ${
            changeType === 'increase' ? 'text-green-600' : 'text-red-600'
          }`}>
            {change}% from last month
          </span>
        </div>
      </div>
      <div className={`p-2 sm:p-3 rounded-lg ${color}`}>
        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      </div>
    </div>
  </div>
);

export function AdminStats() {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: 12.5,
      changeType: 'increase' as const,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Programs',
      value: '28',
      change: 8.2,
      changeType: 'increase' as const,
      icon: Briefcase,
      color: 'bg-green-500'
    },
    {
      title: 'Mentors',
      value: '156',
      change: 3.1,
      changeType: 'decrease' as const,
      icon: UserCheck,
      color: 'bg-purple-500'
    },
    {
      title: 'Upcoming Events',
      value: '42',
      change: 15.7,
      changeType: 'increase' as const,
      icon: Calendar,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
