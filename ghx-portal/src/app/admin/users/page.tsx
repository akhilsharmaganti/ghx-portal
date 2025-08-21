'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { ProtectedAdminRoute } from '@/components/auth/ProtectedAdminRoute';
import { AdminUserTable } from '@/components/admin/users/AdminUserTable';
import { AdminUserFilters } from '@/components/admin/users/AdminUserFilters';
import { AdminUserActions } from '@/components/admin/users/AdminUserActions';
import { Button } from '@/components/ui';
import { Plus, Download, Filter } from 'lucide-react';

export default function AdminUsersPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleUserSelection = (userIds: string[]) => {
    setSelectedUsers(userIds);
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing bulk action: ${action} on users:`, selectedUsers);
    // TODO: Implement bulk actions
  };

  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Page Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  User Management
                </h1>
                <p className="text-gray-600">
                  Manage user accounts, roles, and permissions
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
                
                <Button className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add User</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          {showFilters && (
            <AdminUserFilters />
          )}

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <AdminUserActions
              selectedCount={selectedUsers.length}
              onAction={handleBulkAction}
            />
          )}

          {/* User Table */}
          <AdminUserTable
            onUserSelection={handleUserSelection}
            selectedUsers={selectedUsers}
          />
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}
