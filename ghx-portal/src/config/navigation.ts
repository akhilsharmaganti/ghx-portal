import { TabType, TabConfig } from '@/types';

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
    id: 'mentors',
    label: 'Mentors',
    icon: 'Users',
    path: '/mentors',
    isActive: false,
    isVisible: true,
  },
];
