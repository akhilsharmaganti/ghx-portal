'use client';

import React, { useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardTab } from '@/components/dashboard/DashboardTab';
import { MentorsTab } from '@/components/dashboard/mentors';
import { ProgramsTab } from '@/components/dashboard/programs';
import { Calendar } from '@/components/dashboard/calendar';
import { useDashboardStore } from '@/store/dashboardStore';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { User } from '@/types';
import { mentorData } from '@/data/mentors';
import { programCardData } from '@/data/programs';

// Mock user data for development
const mockUser: User = {
  id: '1',
  email: 'dan@startup.com',
  firstName: 'Dan',
  lastName: 'Johnson',
  role: 'STARTUP',
  avatar: undefined,
  organization: 'TechStart Inc.',
  isActive: true,
  createdAt: new Date('2024-01-01'),
  lastLoginAt: new Date(),
};

export default function DashboardPage() {
  const { 
    activeTab, 
    setCurrentUser, 
    setActiveTab 
  } = useDashboardStore();

  // Set mock user data on component mount
  useEffect(() => {
    setCurrentUser(mockUser);
    setActiveTab('dashboard');
  }, [setCurrentUser, setActiveTab]);

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'programs':
        return <ProgramsTab programs={programCardData} />;
                      case 'calendar':
                  return <Calendar />;
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile</h1>
              <p className="text-gray-600">Profile tab content will be implemented here.</p>
            </div>
          </div>
        );
      case 'mentors':
        return <MentorsTab mentors={mentorData} />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        {renderTabContent()}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
