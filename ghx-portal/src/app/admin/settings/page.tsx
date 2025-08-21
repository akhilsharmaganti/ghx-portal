'use client';

import React from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { ProtectedAdminRoute } from '@/components/auth/ProtectedAdminRoute';
import { Button } from '@/components/ui';
import { Settings } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Page Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Platform Settings
                </h1>
                <p className="text-gray-600">
                  Configure platform settings and features
                </p>
              </div>
              
              <Button variant="outline">
                Save Changes
              </Button>
            </div>
          </div>

          {/* Placeholder Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="text-center">
              <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Platform Settings Coming Soon
              </h3>
              <p className="text-gray-500 mb-6">
                This section will allow you to configure platform settings and features.
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
