'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui';

interface AdminTab {
  id: string;
  label: string;
  href: string;
  badge?: number;
}

const adminTabs: AdminTab[] = [
  { id: 'overview', label: 'Overview', href: '/admin' },
  { id: 'users', label: 'Users', href: '/admin/users', badge: 12 },
  { id: 'programs', label: 'Programs', href: '/admin/programs' },
  { id: 'mentors', label: 'Mentors', href: '/admin/mentors' },
  { id: 'calendar', label: 'Calendar', href: '/admin/calendar' },
  { id: 'forms', label: 'Forms', href: '/admin/forms' },
  { id: 'emails', label: 'Emails', href: '/admin/emails' },
  { id: 'settings', label: 'Settings', href: '/admin/settings' }
];

export function AdminNavigation() {
  const pathname = usePathname();
  
  const tabs: AdminTab[] = [
    { id: 'dashboard', label: 'Dashboard', href: '/admin' },
    { id: 'users', label: 'Users', href: '/admin/users' },
    { id: 'programs', label: 'Programs', href: '/admin/programs' },
    { id: 'mentors', label: 'Mentors', href: '/admin/mentors' },
    { id: 'calendar', label: 'Calendar', href: '/admin/calendar' },
    { id: 'forms', label: 'Forms', href: '/admin/forms' },
    { id: 'emails', label: 'Emails', href: '/admin/emails' },
    { id: 'settings', label: 'Settings', href: '/admin/settings' }
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-3 sm:px-6">
      <div className="flex space-x-1 sm:space-x-2 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          
          return (
            <Link key={tab.id} href={tab.href}>
              <div className={`
                whitespace-nowrap px-3 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors
                ${isActive 
                  ? 'border-blue-500 text-blue-600 bg-blue-50' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}>
                {tab.label}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
