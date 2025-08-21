'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  UserCheck, 
  UserX, 
  Download, 
  Trash2, 
  MoreVertical 
} from 'lucide-react';
import { Button } from '@/components/ui';

interface AdminUserActionsProps {
  selectedCount: number;
  onAction: (action: string) => void;
}

export function AdminUserActions({ selectedCount, onAction }: AdminUserActionsProps) {
  const [showMoreActions, setShowMoreActions] = useState(false);

  const bulkActions = [
    {
      id: 'email',
      label: 'Send Email',
      icon: Mail,
      variant: 'outline' as const,
      action: 'send-email'
    },
    {
      id: 'activate',
      label: 'Activate Users',
      icon: UserCheck,
      variant: 'outline' as const,
      action: 'activate-users'
    },
    {
      id: 'deactivate',
      label: 'Deactivate Users',
      icon: UserX,
      variant: 'outline' as const,
      action: 'deactivate-users'
    },
    {
      id: 'export',
      label: 'Export Data',
      icon: Download,
      variant: 'outline' as const,
      action: 'export-data'
    }
  ];

  const dangerousActions = [
    {
      id: 'delete',
      label: 'Delete Users',
      icon: Trash2,
      variant: 'destructive' as const,
      action: 'delete-users'
    }
  ];

  const handleAction = (action: string) => {
    onAction(action);
    setShowMoreActions(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        {/* Selected Users Info */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {selectedCount} user{selectedCount !== 1 ? 's' : ''} selected
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            disabled={selectedCount === 0}
            className="flex items-center space-x-2"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Send Email</span>
            <span className="sm:hidden">Email</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            disabled={selectedCount === 0}
            className="flex items-center space-x-2"
          >
            <UserCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Activate</span>
            <span className="sm:hidden">Activate</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            disabled={selectedCount === 0}
            className="flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
            <span className="sm:hidden">Export</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            disabled={selectedCount === 0}
            className="flex items-center space-x-2"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Delete</span>
            <span className="sm:hidden">Delete</span>
          </Button>
          
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              disabled={selectedCount === 0}
              className="flex items-center space-x-2"
            >
              <MoreVertical className="h-4 w-4" />
              <span className="hidden sm:inline">More</span>
              <span className="sm:hidden">More</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
