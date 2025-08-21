'use client';

import React from 'react';
import { Clock, User, Briefcase, UserCheck, Calendar, UserPlus, FileText, Settings } from 'lucide-react';
import { Button } from '@/components/ui';

interface ActivityItem {
  id: string;
  type: 'user' | 'program' | 'mentor' | 'calendar' | 'system';
  action: string;
  user: string;
  timestamp: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const ActivityItem: React.FC<ActivityItem> = ({ 
  type, 
  action, 
  user, 
  timestamp, 
  icon: Icon, 
  color 
}) => (
  <div className="flex items-start space-x-3 py-3">
    <div className={`p-2 rounded-lg ${color}`}>
      <Icon className="h-4 w-4 text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-gray-900">
        <span className="font-medium">{user}</span> {action}
      </p>
      <div className="flex items-center mt-1">
        <Clock className="h-3 w-3 text-gray-400 mr-1" />
        <span className="text-xs text-gray-500">{timestamp}</span>
      </div>
    </div>
  </div>
);

export function AdminRecentActivity() {
  const activities = [
    {
      id: '1',
      type: 'user',
      action: 'registered as a Startup',
      userName: 'Sarah Johnson',
      time: '2 minutes ago',
      icon: UserPlus,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: '2',
      type: 'program',
      action: 'applied to Clinical Trials Program',
      userName: 'Mike Chen',
      time: '5 minutes ago',
      icon: FileText,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: '3',
      type: 'mentor',
      action: 'requested mentor assignment',
      userName: 'Emily Rodriguez',
      time: '12 minutes ago',
      icon: UserCheck,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: '4',
      type: 'system',
      action: 'platform maintenance completed',
      userName: 'System',
      time: '1 hour ago',
      icon: Settings,
      color: 'bg-gray-100 text-gray-600'
    },
    {
      id: '5',
      type: 'user',
      action: 'updated profile information',
      userName: 'David Kim',
      time: '2 hours ago',
      icon: User,
      color: 'bg-blue-100 text-blue-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
          Recent Activity
        </h3>
        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
          View All
        </Button>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          
          return (
            <div key={activity.id} className="flex items-start space-x-3 sm:space-x-4">
              <div className={`p-2 sm:p-2.5 rounded-lg ${activity.color} flex-shrink-0`}>
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base text-gray-900 font-medium">
                  {activity.userName}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  {activity.action}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full text-sm text-gray-600 hover:text-gray-800 font-medium py-2 hover:bg-gray-50 rounded-lg transition-colors">
          Load More Activity
        </button>
      </div>
    </div>
  );
}
