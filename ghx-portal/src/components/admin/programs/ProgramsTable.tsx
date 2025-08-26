'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  Users,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/utils';
import { Program, ProgramCategory, ProgramStatus } from '@/types/programs';

interface ProgramsTableProps {
  programs: Program[];
  onEdit: (program: Program) => void;
  onDelete: (programId: string) => void;
  onView: (program: Program) => void;
}

interface FilterState {
  search: string;
  category: ProgramCategory | '';
  status: ProgramStatus | '';
  programCategory: 'ONGOING' | 'OPEN_APPLICATION' | 'UPCOMING' | '';
}

export const ProgramsTable: React.FC<ProgramsTableProps> = ({
  programs,
  onEdit,
  onDelete,
  onView
}) => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    status: '',
    programCategory: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPrograms, setSelectedPrograms] = useState<Set<string>>(new Set());

  // Filter programs based on search and filters
  const filteredPrograms = useMemo(() => {
    return programs.filter(program => {
      const matchesSearch = !filters.search || 
        program.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        program.shortDescription.toLowerCase().includes(filters.search.toLowerCase()) ||
        program.theme?.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCategory = !filters.category || 
        program.category === filters.category;

      const matchesStatus = !filters.status || 
        program.status === filters.status;

      const matchesProgramCategory = !filters.programCategory || 
        program.programCategory === filters.programCategory;

      return matchesSearch && matchesCategory && matchesStatus && matchesProgramCategory;
    });
  }, [programs, filters]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPrograms(new Set(filteredPrograms.map(p => p.id)));
    } else {
      setSelectedPrograms(new Set());
    }
  };

  const handleSelectProgram = (programId: string, checked: boolean) => {
    const newSelected = new Set(selectedPrograms);
    if (checked) {
      newSelected.add(programId);
    } else {
      newSelected.delete(programId);
    }
    setSelectedPrograms(newSelected);
  };

  const getStatusBadge = (status: ProgramStatus) => {
    const statusConfig = {
      DRAFT: { bg: 'bg-gray-100', text: 'text-gray-800', icon: ClockIcon },
      PUBLISHED: { bg: 'bg-blue-100', text: 'text-blue-800', icon: CheckCircle },
      ACTIVE: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      COMPLETED: { bg: 'bg-gray-100', text: 'text-gray-800', icon: CheckCircle },
      ARCHIVED: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle }
    };

    const config = statusConfig[status] || statusConfig.DRAFT;
    const Icon = config.icon;

    return (
      <span className={cn('inline-flex items-center px-2 py-1 rounded-full text-xs font-medium', config.bg, config.text)}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </span>
    );
  };

  const getProgramCategoryBadge = (category: string) => {
    const categoryConfig = {
      ONGOING: { bg: 'bg-green-100', text: 'text-green-800' },
      OPEN_APPLICATION: { bg: 'bg-blue-100', text: 'text-blue-800' },
      UPCOMING: { bg: 'bg-purple-100', text: 'text-purple-800' }
    };

    const config = categoryConfig[category as keyof typeof categoryConfig] || categoryConfig.UPCOMING;

    return (
      <span className={cn('inline-flex items-center px-2 py-1 rounded-full text-xs font-medium', config.bg, config.text)}>
        {category.replace('_', ' ')}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search programs..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'flex items-center space-x-2',
              showFilters && 'bg-blue-50 border-blue-200 text-blue-700'
            )}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </Button>

          {/* Bulk Actions */}
          {selectedPrograms.size > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {selectedPrograms.size} selected
              </span>
              <Button variant="outline" size="sm">
                Bulk Edit
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                Bulk Delete
              </Button>
            </div>
          )}
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value as ProgramCategory | '' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    <option value="MENTORSHIP">Mentorship</option>
                    <option value="ACCELERATOR">Accelerator</option>
                    <option value="WORKSHOP">Workshop</option>
                    <option value="FUNDING">Funding</option>
                    <option value="NETWORKING">Networking</option>
                    <option value="EDUCATION">Education</option>
                    <option value="COMPETITION">Competition</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as ProgramStatus | '' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Statuses</option>
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ACTIVE">Active</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>

                {/* Program Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program Type</label>
                  <select
                    value={filters.programCategory}
                    onChange={(e) => setFilters(prev => ({ ...prev, programCategory: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    <option value="ONGOING">Ongoing</option>
                    <option value="OPEN_APPLICATION">Open Application</option>
                    <option value="UPCOMING">Upcoming</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Programs Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedPrograms.size === filteredPrograms.length && filteredPrograms.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timeline
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participants
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPrograms.map((program) => (
                <tr key={program.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedPrograms.has(program.id)}
                      onChange={(e) => handleSelectProgram(program.id, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{program.title}</h4>
                        <p className="text-xs text-gray-500 line-clamp-1">{program.shortDescription}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {getProgramCategoryBadge(program.programCategory)}
                          {program.theme && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {program.theme}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-600 capitalize">{program.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(program.status)}
                  </td>
                                     <td className="px-4 py-3">
                     <div className="text-xs text-gray-600">
                       <div className="flex items-center space-x-1">
                         <Calendar className="w-3 h-3" />
                         <span>{formatDate(program.startDate)}</span>
                       </div>
                       <div className="flex items-center space-x-1 mt-1">
                         <Clock className="w-3 h-3" />
                         <span>{program.duration}</span>
                       </div>

                     </div>
                   </td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{program.currentParticipants}/{program.maxParticipants}</span>
                      </div>
                      <div className="mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full" 
                            style={{ width: `${(program.currentParticipants / program.maxParticipants) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onView(program)}
                        className="p-1 h-8 w-8"
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(program)}
                        className="p-1 h-8 w-8"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(program.id)}
                        className="p-1 h-8 w-8 text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No programs found
            </h3>
            <p className="text-gray-500">
              {filters.search || filters.category || filters.status || filters.programCategory
                ? 'Try adjusting your filters or search criteria'
                : 'Get started by creating your first program'
              }
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredPrograms.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPrograms.length}</span> of{' '}
              <span className="font-medium">{programs.length}</span> programs
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
