'use client';

import React from 'react';
import { MentorCard, MentorCardProps } from './MentorCard';

// Open/Closed Principle: Grid layout that can be extended without modification
export interface MentorsGridProps {
  mentors: MentorCardProps[];
  className?: string;
  gridCols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
}

// Reusable grid component with configurable layout
export const MentorsGrid: React.FC<MentorsGridProps> = ({
  mentors,
  className = '',
  gridCols = {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 3
  },
  gap = 'gap-0'
}) => {
  // Single Responsibility: Generate responsive flex classes
  const getFlexClasses = () => {
    const { sm = 1, md = 2, lg = 3, xl = 3 } = gridCols;
    
    return `
      flex flex-wrap
      justify-center
      items-start
      w-full
    `;
  };

  // Single Responsibility: Handle empty state
  if (!mentors || mentors.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div className="text-gray-500 text-xl font-medium mb-2">
          No mentors found
        </div>
        <p className="text-gray-400 text-sm">
          {mentors.length === 0 ? 'No mentors available at the moment.' : 'Try adjusting your search or filters.'}
        </p>
      </div>
    );
  }

  return (
    <div className={`${getFlexClasses()} ${className}`}>
      {mentors.map((mentor) => (
        <MentorCard
          key={mentor.id}
          {...mentor}
        />
      ))}
    </div>
  );
};
