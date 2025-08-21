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
    md: 1,
    lg: 2,
    xl: 3
  },
  gap = 'gap-6'
}) => {
  // Single Responsibility: Generate responsive grid classes
  const getGridClasses = () => {
    const { sm = 1, md = 2, lg = 3, xl = 3 } = gridCols;
    
    return `
      grid
      grid-cols-${sm}
      md:grid-cols-${md}
      lg:grid-cols-${lg}
      xl:grid-cols-${xl}
      ${gap}
    `;
  };

  // Single Responsibility: Handle empty state
  if (!mentors || mentors.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">
          No mentors available at the moment.
        </div>
        <p className="text-gray-400 text-sm mt-2">
          Check back later for new mentor profiles.
        </p>
      </div>
    );
  }

  return (
    <div className={`${getGridClasses()} ${className}`}>
      {mentors.map((mentor) => (
        <MentorCard
          key={mentor.id}
          {...mentor}
        />
      ))}
    </div>
  );
};
