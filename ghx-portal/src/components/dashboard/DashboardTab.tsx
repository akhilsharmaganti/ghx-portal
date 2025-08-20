'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useDashboardStore } from '@/store/dashboardStore';
import { cn } from '@/utils';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  CheckCircle,
  Clock,
  Star,
  Rocket
} from 'lucide-react';

export const DashboardTab: React.FC = () => {
  const { currentUser, dashboardStats } = useDashboardStore();

  // Mock data for now - will be replaced with real data
  const mockStats = {
    totalPrograms: 12,
    activePrograms: 8,
    upcomingEvents: 5,
    pendingTasks: 3,
    recentActivities: [
      {
        id: '1',
        type: 'program' as const,
        title: 'Application submitted for Tech Accelerator 2024',
        description: 'Your application has been received and is under review.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        isRead: false,
      },
      {
        id: '2',
        type: 'meeting' as const,
        title: 'Mentor session scheduled with Dr. Sarah Johnson',
        description: 'Session scheduled for tomorrow at 2:00 PM.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        isRead: true,
      },
      {
        id: '3',
        type: 'notification' as const,
        title: 'New program available: Healthcare Innovation Challenge',
        description: 'Applications open for the upcoming challenge.',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        isRead: true,
      },
    ],
  };

  const stats = dashboardStats || mockStats;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {currentUser?.firstName || 'User'}! 👋
        </h1>
        <p className="text-primary-100">
          Here&apos;s what&apos;s happening with your innovation journey today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Total Programs */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Programs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPrograms}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </motion.div>

        {/* Active Programs */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Programs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activePrograms}</p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
              <p className="text-2xl font-bold text-gray-900">{stats.upcomingEvents}</p>
            </div>
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </motion.div>

        {/* Pending Tasks */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingTasks}</p>
            </div>
            <div className="w-12 h-12 bg-error-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-error-600" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Recent Activities */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl shadow-sm border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {stats.recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'flex items-start space-x-4 p-4 rounded-lg transition-colors duration-200',
                  activity.isRead ? 'bg-gray-50' : 'bg-primary-50'
                )}
              >
                <div className={cn(
                  'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                  activity.isRead ? 'bg-gray-400' : 'bg-primary-500'
                )} />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className={cn(
                      'text-sm font-medium',
                      activity.isRead ? 'text-gray-700' : 'text-gray-900'
                    )}>
                      {activity.title}
                    </h3>
                    {!activity.isRead && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatRelativeTime(activity.timestamp)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span className="capitalize">{activity.type}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View all activities
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Browse Programs</h3>
                <p className="text-sm text-gray-600">Find new opportunities</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-success-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Find Mentors</h3>
                <p className="text-sm text-gray-600">Connect with experts</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-warning-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Schedule Meeting</h3>
                <p className="text-sm text-gray-600">Book a session</p>
              </div>
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Helper function for relative time formatting
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
}
