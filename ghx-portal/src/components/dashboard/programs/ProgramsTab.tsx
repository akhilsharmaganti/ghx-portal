'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid3X3, List, Calendar, Users, TrendingUp } from 'lucide-react';
import { ProgramCard } from './ProgramCard';
import { ProgramFilters } from './ProgramFilters';
import { ProgramDetailsModal } from './ProgramDetailsModal';
import { ProgramCardProps, ProgramSearchParams, EnhancedProgramCardProps, Program } from '@/types/programs';
import { cn } from '@/utils';

interface ProgramsTabProps {
  programs: Program[];
  isLoading?: boolean;
}

export const ProgramsTab: React.FC<ProgramsTabProps> = ({ programs, isLoading = false }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<EnhancedProgramCardProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Map Program to EnhancedProgramCardProps
  const mapProgramToEnhanced = (program: Program): EnhancedProgramCardProps => {
    // Determine variant based on program status and dates
    let variant: 'ongoing' | 'open-application' | 'upcoming' = 'upcoming';
    
    if (program.status === 'ACTIVE') {
      variant = 'ongoing';
    } else if (program.status === 'PUBLISHED') {
      variant = 'open-application';
    } else {
      variant = 'upcoming';
    }

    return {
      id: program.id,
      title: program.title,
      shortDescription: program.shortDescription,
      category: program.category,
      duration: program.duration,
      startDate: program.startDate,
      status: program.status,
      image: program.image,
      tags: program.tags || [],
      currentParticipants: program.currentParticipants || 0,
      maxParticipants: program.maxParticipants || 50,
      variant,
      theme: program.theme || '',
      whyJoinUs: program.whyJoinUs || '',
      hasTestimonials: false, // Default value
      hasTimeline: false, // Default value
      selectedStartupsCount: program.selectedStartups?.length || 0
    };
  };

  // Convert programs to enhanced format
  const enhancedPrograms = useMemo(() => programs.map(mapProgramToEnhanced), [programs]);
  const [searchParams, setSearchParams] = useState<ProgramSearchParams>({
    search: '',
    category: undefined,
    status: undefined,
    programCategory: undefined,
    duration: ''
  });

  // Map variant strings to database enum values
  const getVariantFromProgramCategory = (variant: string) => {
    switch (variant) {
      case 'ongoing':
        return 'ONGOING';
      case 'open-application':
        return 'OPEN_APPLICATION';
      case 'upcoming':
        return 'UPCOMING';
      default:
        return undefined;
    }
  };

  // Enhanced filtering logic
  const filteredPrograms = useMemo(() => {
    return enhancedPrograms.filter(program => {
      const matchesSearch = !searchParams.search || 
        program.title.toLowerCase().includes(searchParams.search.toLowerCase()) ||
        program.shortDescription.toLowerCase().includes(searchParams.search.toLowerCase()) ||
        program.theme?.toLowerCase().includes(searchParams.search.toLowerCase());

      const matchesCategory = !searchParams.category || 
        program.category === searchParams.category;

      const matchesStatus = !searchParams.status || 
        program.status === searchParams.status;

      const matchesProgramCategory = !searchParams.programCategory || 
        getVariantFromProgramCategory(program.variant) === searchParams.programCategory;

      const matchesDuration = !searchParams.duration || 
        program.duration === searchParams.duration;

      return matchesSearch && matchesCategory && matchesStatus && 
             matchesProgramCategory && matchesDuration;
    });
  }, [enhancedPrograms, searchParams]);

  // Group programs by category
  const groupedPrograms = useMemo(() => {
    const grouped = {
      ongoing: filteredPrograms.filter(p => p.variant === 'ongoing'),
      openApplication: filteredPrograms.filter(p => p.variant === 'open-application'),
      upcoming: filteredPrograms.filter(p => p.variant === 'upcoming')
    };

    return grouped;
  }, [filteredPrograms]);

  // Enhanced search params with program category
  const enhancedSearchParams = {
    ...searchParams,
    programCategory: searchParams.programCategory
  };

  const handleSearchChange = (newParams: Partial<ProgramSearchParams>) => {
    setSearchParams(prev => ({ ...prev, ...newParams }));
  };

  const handleViewDetails = (programId: string) => {
    const program = enhancedPrograms.find(p => p.id === programId);
    if (program) {
      setSelectedProgram(program);
      setIsModalOpen(true);
    }
  };

  const handleApply = (programId: string) => {
    // Handle program application
    console.log('Apply for program:', programId);
  };

  const handleConnect = (programId: string) => {
    // Handle admin connection request
    console.log('Connect for program:', programId);
  };

  const getCategoryStats = () => {
    return {
      ongoing: groupedPrograms.ongoing.length,
      openApplication: groupedPrograms.openApplication.length,
      upcoming: groupedPrograms.upcoming.length,
      total: filteredPrograms.length
    };
  };

  const stats = getCategoryStats();

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Programs</h1>
              <p className="text-sm text-gray-600">
                Discover and join innovative programs tailored for healthcare startups
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 p-6 lg:p-8"
    >
      {/* Header Section - Left Aligned, No Description */}
      <div className="text-left mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Programs</h1>
      </div>

      {/* Search and Filter Section - Spanning full cards grid width */}
      <div className="flex justify-center w-full">
        <div className="flex items-center gap-4" style={{ width: 'calc(300px * 3 + 16px * 2)' }}>
          {/* Search Bar - Full width of cards grid */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search programs"
              value={searchParams.search}
              onChange={(e) => handleSearchChange({ search: e.target.value })}
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
      {searchParams.search || searchParams.category ? (
        <div className="text-sm text-gray-500 text-center">
          Showing {filteredPrograms.length} of {programs.length} programs
          {searchParams.search && ` matching "${searchParams.search}"`}
          {searchParams.category && ` in ${searchParams.category}`}
        </div>
      ) : null}

      {/* Filters Section */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <ProgramFilters
              searchParams={enhancedSearchParams}
              onSearchChange={handleSearchChange}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Programs Grid - Clean layout like Mentors */}
      {filteredPrograms.length > 0 ? (
        <div className="flex flex-wrap justify-center items-start w-full gap-4">
          {filteredPrograms.map((program) => (
            <ProgramCard
              key={program.id}
              {...program}
              onViewDetails={handleViewDetails}
              onApply={handleApply}
              onConnect={handleConnect}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-base font-medium text-gray-900 mb-2">No programs found</h3>
          <p className="text-sm text-gray-500">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}

      {/* Program Details Modal */}
      <ProgramDetailsModal
        program={selectedProgram}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProgram(null);
        }}
        onApply={handleApply}
        onConnect={handleConnect}
      />
    </motion.div>
  );
};
