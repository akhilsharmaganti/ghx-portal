'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  Briefcase, 
  UserCheck, 
  Calendar,
  FileText,
  Mail,
  Settings,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui';

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
  actionLabel: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  color, 
  actionLabel 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className={`p-2 sm:p-3 rounded-lg ${color}`}>
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="p-1 hover:bg-gray-100"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{description}</p>
      
      <Link href={href}>
        <Button className="w-full text-sm sm:text-base">
          {actionLabel}
        </Button>
      </Link>
    </div>
  );
};

export function AdminQuickActions() {
  const actions = [
    {
      title: 'User Management',
      description: 'Add, edit, and manage user accounts and roles',
      icon: Users,
      href: '/admin/users',
      color: 'bg-blue-500',
      actionLabel: 'Manage Users'
    },
    {
      title: 'Programs',
      description: 'Create and manage innovation programs',
      icon: Briefcase,
      href: '/admin/programs',
      color: 'bg-green-500',
      actionLabel: 'Manage Programs'
    },
    {
      title: 'Mentors',
      description: 'Add mentors and manage mentor assignments',
      icon: UserCheck,
      href: '/admin/mentors',
      color: 'bg-purple-500',
      actionLabel: 'Manage Mentors'
    },
    {
      title: 'Calendar',
      description: 'Schedule events and manage platform calendar',
      icon: Calendar,
      href: '/admin/calendar',
      color: 'bg-orange-500',
      actionLabel: 'Manage Calendar'
    },
    {
      title: 'Forms',
      description: 'Create dynamic forms for different user types',
      icon: FileText,
      href: '/admin/forms',
      color: 'bg-indigo-500',
      actionLabel: 'Manage Forms'
    },
    {
      title: 'Email Templates',
      description: 'Configure email notifications and templates',
      icon: Mail,
      href: '/admin/emails',
      color: 'bg-pink-500',
      actionLabel: 'Manage Emails'
    },
    {
      title: 'Settings',
      description: 'Configure platform settings and features',
      icon: Settings,
      href: '/admin/settings',
      color: 'bg-gray-500',
      actionLabel: 'Manage Settings'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {actions.map((action, index) => (
        <ActionCard key={index} {...action} />
      ))}
    </div>
  );
}
