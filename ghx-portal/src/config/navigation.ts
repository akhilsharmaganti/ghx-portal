import { TabType, TabConfig } from '@/types';
import {
  LayoutDashboard,
  Calendar,
  User,
  Users,
  Rocket,
} from 'lucide-react';

// Navigation configuration for dashboard tabs
export const navigationConfig: TabConfig[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/dashboard',
    isActive: true,
    isVisible: true,
  },
  {
    id: 'programs',
    label: 'Programs',
    icon: 'Rocket',
    path: '/programs',
    isActive: false,
    isVisible: true,
  },
  {
    id: 'calendar',
    label: 'Calendar',
    icon: 'Calendar',
    path: '/calendar',
    isActive: false,
    isVisible: true,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: 'User',
    path: '/profile',
    isActive: false,
    isVisible: true,
  },
  {
    id: 'mentors',
    label: 'Mentors',
    icon: 'Users',
    path: '/mentors',
    isActive: false,
    isVisible: true,
  },
];

// Icon mapping for dynamic icon rendering
export const iconMap = {
  LayoutDashboard,
  Rocket,
  Calendar,
  User,
  Users,
};

// Get tab by ID
export function getTabById(id: TabType): TabConfig | undefined {
  return navigationConfig.find(tab => tab.id === id);
}

// Get active tab
export function getActiveTab(): TabConfig | undefined {
  return navigationConfig.find(tab => tab.isActive);
}

// Set active tab
export function setActiveTab(id: TabType): void {
  navigationConfig.forEach(tab => {
    tab.isActive = tab.id === id;
  });
}

// Get visible tabs
export function getVisibleTabs(): TabConfig[] {
  return navigationConfig.filter(tab => tab.isVisible);
}

// Check if tab is visible
export function isTabVisible(id: TabType): boolean {
  const tab = getTabById(id);
  return tab?.isVisible ?? false;
}

// Get tab path
export function getTabPath(id: TabType): string {
  const tab = getTabById(id);
  return tab?.path ?? '/dashboard';
}

// Get tab label
export function getTabLabel(id: TabType): string {
  const tab = getTabById(id);
  return tab?.label ?? 'Unknown';
}

// Get tab icon
export function getTabIcon(id: TabType): string {
  const tab = getTabById(id);
  return tab?.icon ?? 'LayoutDashboard';
}
