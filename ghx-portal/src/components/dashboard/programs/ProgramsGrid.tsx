'use client';

import React from 'react';
import { ProgramCard } from './ProgramCard';
import type { ProgramCardProps } from '@/types/programs';

// Open/Closed Principle: Grid layout that can be extended without modification
export interface ProgramsGridProps {
  programs: ProgramCardProps[];
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
export const ProgramsGrid: React.FC<ProgramsGridProps> = ({
  programs,
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
    const { sm = 1, md = 1, lg = 2, xl = 3 } = gridCols;
    
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
  if (!programs || programs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">
          No programs available at the moment.
        </div>
        <p className="text-gray-400 text-sm mt-2">
          Check back later for new program opportunities.
        </p>
      </div>
    );
  }

  return (
    <div className={`${getGridClasses()} ${className}`}>
      {programs.map((program) => (
        <ProgramCard
          key={program.id}
          {...program}
          variant="upcoming"
        />
      ))}
    </div>
  );
};
