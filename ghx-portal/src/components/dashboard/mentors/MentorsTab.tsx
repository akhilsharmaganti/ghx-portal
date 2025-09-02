'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Users } from 'lucide-react';
import { MentorsGrid } from './MentorsGrid';
import { MentorCardProps } from './MentorCard';

// Interface Segregation: Only define what this component needs
export interface MentorsTabProps {
  mentors: MentorCardProps[];
  className?: string;
}

// Single Responsibility: Main mentors tab content
export const MentorsTab: React.FC<MentorsTabProps> = ({
  mentors,
  className = ''
}) => {
  // Local state for search and filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string>('all');

  // Memoized filtered mentors (performance optimization)
  const filteredMentors = useMemo(() => {
    let filtered = mentors;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(mentor =>
        mentor.name.toLowerCase().includes(term) ||
        mentor.role.toLowerCase().includes(term) ||
        mentor.company.toLowerCase().includes(term) ||
        mentor.expertise.some(exp => exp.toLowerCase().includes(term))
      );
    }

    // Apply expertise filter
    if (selectedExpertise !== 'all') {
      filtered = filtered.filter(mentor =>
        mentor.expertise.includes(selectedExpertise)
      );
    }

    return filtered;
  }, [mentors, searchTerm, selectedExpertise]);

  // Get unique expertise options for filter
  const expertiseOptions = useMemo(() => {
    const allExpertise = mentors.flatMap(mentor => mentor.expertise);
    return ['all', ...Array.from(new Set(allExpertise))];
  }, [mentors]);

  // Single Responsibility: Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Single Responsibility: Handle expertise filter
  const handleExpertiseFilter = (expertise: string) => {
    setSelectedExpertise(expertise);
  };

  return (
    <div className="min-h-screen bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`space-y-8 p-6 lg:p-8 ${className}`}
      >
        {/* Header Section - Left Aligned, No Description */}
        <div className="text-left mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Mentors</h1>
        </div>

        {/* Search and Filter Section - Spanning full cards grid width */}
        <div className="flex justify-center w-full">
          <div className="flex items-center gap-4" style={{ width: 'calc(300px * 3 + 16px * 2)' }}>
            {/* Search Bar - Full width of cards grid */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search mentors"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
            </div>

            {/* Filter Icon - Right of search bar */}
            <div className="flex items-center">
              <button className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count - Subtle display */}
        {searchTerm || selectedExpertise !== 'all' ? (
          <div className="text-sm text-gray-500 text-center">
            Showing {filteredMentors.length} of {mentors.length} mentors
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedExpertise !== 'all' && ` in ${selectedExpertise}`}
          </div>
        ) : null}

        {/* Mentors Grid - Small gaps for better spacing */}
        <MentorsGrid
          mentors={filteredMentors}
          gridCols={{
            sm: 1,
            md: 2,
            lg: 3,
            xl: 3
          }}
          gap="gap-4"
        />
      </motion.div>
    </div>
  );
};
