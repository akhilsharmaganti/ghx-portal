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
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
                     <div>
             <h1 className="text-2xl font-bold text-gray-900 mb-2">Programs</h1>
             <p className="text-sm text-gray-600">
               Discover and join innovative programs tailored for healthcare startups
             </p>
           </div>
          
          <div className="flex items-center space-x-3">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2 rounded-md transition-colors',
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                )}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2 rounded-md transition-colors',
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors',
                showFilters 
                  ? 'bg-primary-50 border-primary-200 text-primary-700' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              )}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Category Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-900">{stats.ongoing}</p>
                <p className="text-sm text-green-700">Ongoing Programs</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">{stats.openApplication}</p>
                <p className="text-sm text-blue-700">Open Applications</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-900">{stats.upcoming}</p>
                <p className="text-sm text-purple-700">Upcoming Programs</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-100 p-2 rounded-lg">
                <Users className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-700">Total Programs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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

      {/* Programs Grid */}
      <div className="space-y-8">
        {/* Ongoing Programs */}
        {groupedPrograms.ongoing.length > 0 && (
          <div>
                         <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
               <div className="w-2 h-6 bg-green-500 rounded-full mr-3"></div>
               Ongoing Programs
             </h2>
            <div className={cn(
              'grid gap-6',
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            )}>
              {groupedPrograms.ongoing.map((program) => (
                <ProgramCard
                  key={program.id}
                  {...program}
                  variant="ongoing"
                  onViewDetails={handleViewDetails}
                  onApply={handleApply}
                  onConnect={handleConnect}
                />
              ))}
            </div>
          </div>
        )}

        {/* Open Application Programs */}
        {groupedPrograms.openApplication.length > 0 && (
          <div>
                         <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
               <div className="w-2 h-6 bg-blue-500 rounded-full mr-3"></div>
               Open Applications
             </h2>
            <div className={cn(
              'grid gap-6',
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            )}>
              {groupedPrograms.openApplication.map((program) => (
                <ProgramCard
                  key={program.id}
                  {...program}
                  variant="open-application"
                  onViewDetails={handleViewDetails}
                  onApply={handleApply}
                  onConnect={handleConnect}
                />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Programs */}
        {groupedPrograms.upcoming.length > 0 && (
          <div>
                         <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
               <div className="w-2 h-6 bg-purple-500 rounded-full mr-3"></div>
               Upcoming Programs
             </h2>
            <div className={cn(
              'grid gap-6',
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            )}>
              {groupedPrograms.upcoming.map((program) => (
                <ProgramCard
                  key={program.id}
                  {...program}
                  variant="upcoming"
                  onViewDetails={handleViewDetails}
                  onApply={handleApply}
                  onConnect={handleConnect}
                />
              ))}
            </div>
          </div>
        )}

        {/* No Programs Found */}
        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No programs found</h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or filters
            </p>
          </div>
                 )}
       </div>

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
     </div>
   );
 };
