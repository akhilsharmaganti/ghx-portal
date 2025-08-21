'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Briefcase, Calendar } from 'lucide-react';
import { ProgramsGrid } from './ProgramsGrid';
import { ProgramCardProps, ProgramCategory, ProgramStatus } from '@/types/programs';
import { getAllCategories, getAllStatuses } from '@/data/programs';

export interface ProgramsTabProps {
  programs: ProgramCardProps[];
  className?: string;
}

export const ProgramsTab: React.FC<ProgramsTabProps> = ({
  programs,
  className = ''
}) => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategory | ''>('');
  const [selectedStatus, setSelectedStatus] = useState<ProgramStatus | ''>('');
  const [selectedDuration, setSelectedDuration] = useState('');

  // Get filter options
  const categories = getAllCategories();
  const statuses = getAllStatuses();
  const durations = ['1-4 weeks', '5-8 weeks', '9-12 weeks', '13+ weeks', 'Ongoing'];

  // Filter programs based on search and filters
  const filteredPrograms = useMemo(() => {
    let filtered = programs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(program =>
        program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(program => program.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus) {
      filtered = filtered.filter(program => program.status === selectedStatus);
    }

    // Duration filter
    if (selectedDuration) {
      filtered = filtered.filter(program => {
        if (selectedDuration === 'Ongoing') {
          return program.duration.toLowerCase().includes('ongoing');
        }
        const weeks = parseInt(program.duration);
        if (isNaN(weeks)) return false;
        
        switch (selectedDuration) {
          case '1-4 weeks': return weeks >= 1 && weeks <= 4;
          case '5-8 weeks': return weeks >= 5 && weeks <= 8;
          case '9-12 weeks': return weeks >= 9 && weeks <= 12;
          case '13+ weeks': return weeks >= 13;
          default: return true;
        }
      });
    }

    return filtered;
  }, [programs, searchTerm, selectedCategory, selectedStatus, selectedDuration]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedStatus('');
    setSelectedDuration('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Available Programs
        </h2>
        <p className="text-gray-600">
          Discover and enroll in healthcare innovation programs tailored for entrepreneurs
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search programs by title, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="inline w-4 h-4 mr-1" />
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ProgramCategory | '')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="inline w-4 h-4 mr-1" />
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as ProgramStatus | '')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Duration Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Duration
            </label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Durations</option>
              {durations.map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters */}
        {(selectedCategory || selectedStatus || selectedDuration) && (
          <div className="mt-4 text-center">
            <button
              onClick={clearFilters}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Results Counter */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredPrograms.length} of {programs.length} programs
        </p>
      </div>

      {/* Programs Grid */}
      <ProgramsGrid programs={filteredPrograms} />
    </motion.div>
  );
};
