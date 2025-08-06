// Single Responsibility: Reusable loading overlay component
import React from 'react';
import { Card } from './Card';

interface LoadingOverlayProps {
  title: string;
  message: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ title, message }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600">{message}</p>
        </div>
      </Card>
    </div>
  );
}; 