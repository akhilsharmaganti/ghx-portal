'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
    
    // TODO: Add admin role check when Firebase custom claims are implemented
    // if (!loading && user && user.role !== 'ADMIN') {
    //   router.push('/dashboard');
    // }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  // TODO: Add proper admin role check
  // if (user.role !== 'ADMIN') {
  //   return null; // Will redirect in useEffect
  // }

  return <>{children}</>;
}
