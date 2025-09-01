'use client';

import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

// Single Responsibility: Navigation breadcrumb component
export interface BreadcrumbProps {
  items: {
    label: string;
    href?: string;
    onClick?: () => void;
  }[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronLeft className="w-4 h-4 text-gray-400 rotate-90" />
          )}
          
          {item.href ? (
            <Link
              href={item.href}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {item.label}
            </Link>
          ) : item.onClick ? (
            <button
              onClick={item.onClick}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
