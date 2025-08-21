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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`space-y-6 ${className}`}
    >
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-3">
            <Users className="w-6 h-6 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">MENTORS</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Connect with experienced professionals who can guide your startup journey. 
          Click on any mentor card to view their LinkedIn profile and connect.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search mentors by name, role, or expertise..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
          />
        </div>

        {/* Expertise Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={selectedExpertise}
            onChange={(e) => handleExpertiseFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
          >
            {expertiseOptions.map((expertise) => (
              <option key={expertise} value={expertise}>
                {expertise === 'all' ? 'All Expertise' : expertise}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredMentors.length} of {mentors.length} mentors
        {searchTerm && ` matching "${searchTerm}"`}
        {selectedExpertise !== 'all' && ` in ${selectedExpertise}`}
      </div>

      {/* Mentors Grid */}
      <MentorsGrid
        mentors={filteredMentors}
        gridCols={{
          sm: 1,
          md: 2,
          lg: 3,
          xl: 3
        }}
        gap="gap-6"
      />
    </motion.div>
  );
};
