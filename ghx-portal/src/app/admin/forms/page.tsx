'use client';

import React from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { ProtectedAdminRoute } from '@/components/auth/ProtectedAdminRoute';
import { Button } from '@/components/ui';
import { Plus, FileText } from 'lucide-react';

export default function AdminFormsPage() {
  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Page Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Form Management
                </h1>
                <p className="text-gray-600">
                  Create and manage dynamic forms for different user types
                </p>
              </div>
              
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create Form</span>
              </Button>
            </div>
          </div>

          {/* Placeholder Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Form Management Coming Soon
              </h3>
              <p className="text-gray-500 mb-6">
                This section will allow you to create dynamic forms for different user types.
              </p>
              <Button variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}
