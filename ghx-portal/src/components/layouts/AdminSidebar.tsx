'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  Briefcase, 
  UserCheck, 
  Calendar, 
  FileText, 
  Settings, 
  BarChart3,
  Mail,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui';

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface AdminMenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: number;
}

const adminMenuItems: AdminMenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: BarChart3,
    href: '/admin'
  },
  {
    id: 'users',
    label: 'User Management',
    icon: Users,
    href: '/admin/users',
    badge: 12
  },
  {
    id: 'programs',
    label: 'Programs',
    icon: Briefcase,
    href: '/admin/programs'
  },
  {
    id: 'mentors',
    label: 'Mentors',
    icon: UserCheck,
    href: '/admin/mentors'
  },
  {
    id: 'calendar',
    label: 'Calendar',
    icon: Calendar,
    href: '/admin/calendar'
  },
  {
    id: 'forms',
    label: 'Forms',
    icon: FileText,
    href: '/admin/forms'
  },
  {
    id: 'emails',
    label: 'Email Templates',
    icon: Mail,
    href: '/admin/emails'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '/admin/settings'
  }
];

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`
      fixed left-0 top-16 h-full bg-white border-r border-gray-200 
      transition-all duration-300 z-10
      ${collapsed ? 'w-16' : 'w-64'}
      sm:relative sm:top-0
    `}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-lg font-semibold text-gray-900">
              Admin Menu
            </h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-1 hover:bg-gray-100"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-2">
        <ul className="space-y-1">
          {adminMenuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.id}>
                <Link href={item.href}>
                  <div className={`
                    flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}>
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="ml-3 flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
