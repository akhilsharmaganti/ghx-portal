'use client';

import React from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { ProtectedAdminRoute } from '@/components/auth/ProtectedAdminRoute';

export default function AdminPage() {
  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}
