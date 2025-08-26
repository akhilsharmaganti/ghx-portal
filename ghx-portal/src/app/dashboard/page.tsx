'use client';

import React, { useEffect, useState } from 'react';
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
import { Program } from '@/types/programs';

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

  const [programs, setPrograms] = useState<Program[]>([]);
  const [mentors, setMentors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMentorsLoading, setIsMentorsLoading] = useState(true);

  // Set mock user data on component mount
  useEffect(() => {
    setCurrentUser(mockUser);
    setActiveTab('dashboard');
  }, [setCurrentUser, setActiveTab]);

  // Fetch programs from API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/admin/programs');
        if (response.ok) {
          const data = await response.json();
          setPrograms(data);
        } else {
          console.error('Failed to fetch programs:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // Fetch mentors from API
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setIsMentorsLoading(true);
        const response = await fetch('/api/admin/mentors');
        if (response.ok) {
          const data = await response.json();
          setMentors(data);
        } else {
          console.error('Failed to fetch mentors:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching mentors:', error);
      } finally {
        setIsMentorsLoading(false);
      }
    };

    fetchMentors();
  }, []);

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'programs':
        return (
          <ProfileCompletionGuard>
            <ProgramsTab programs={programs} isLoading={isLoading} />
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
            <MentorsTab mentors={mentors} />
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
