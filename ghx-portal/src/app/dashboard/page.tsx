'use client';

import React, { useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardTab } from '@/components/dashboard/DashboardTab';
import { MentorsTab } from '@/components/dashboard/mentors';
import { ProgramsTab } from '@/components/dashboard/programs';
import { Calendar } from '@/components/dashboard/calendar';
import { ProfileTab } from '@/components/dashboard/profile';
import { ProfileCompletionGuard } from '@/components/dashboard/ProfileCompletionGuard';
import { useDashboardStore } from '@/store/dashboardStore';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { User } from '@/types';
import { mentorData } from '@/data/mentors';
import { enhancedProgramCardData } from '@/data/programs';

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
        return (
          <ProfileCompletionGuard>
            <ProgramsTab programs={enhancedProgramCardData} />
          </ProfileCompletionGuard>
        );
      case 'calendar':
        return (
          <ProfileCompletionGuard>
            <Calendar />
          </ProfileCompletionGuard>
        );
      case 'profile':
        return <ProfileTab />;
      case 'mentors':
        return (
          <ProfileCompletionGuard>
            <MentorsTab mentors={mentorData} />
          </ProfileCompletionGuard>
        );
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
