'use client';

import React from 'react';
import { Search, X } from 'lucide-react';
import { ProgramSearchParams, ProgramCategory, ProgramStatus } from '@/types/programs';
import { Button } from '@/components/ui';

interface ProgramFiltersProps {
  searchParams: ProgramSearchParams;
  onSearchChange: (params: Partial<ProgramSearchParams>) => void;
}

export const ProgramFilters: React.FC<ProgramFiltersProps> = ({
  searchParams,
  onSearchChange
}) => {
  const handleClearFilters = () => {
    onSearchChange({
      search: '',
      category: '',
      status: '',
      programCategory: '',
      duration: ''
    });
  };

  const hasActiveFilters = Object.values(searchParams).some(value => value !== '');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filter Programs</h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Programs
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by title, description, or theme..."
              value={searchParams.search || ''}
              onChange={(e) => onSearchChange({ search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Program Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Program Category
          </label>
          <select
            value={searchParams.programCategory || ''}
            onChange={(e) => onSearchChange({ programCategory: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            <option value="ONGOING">Ongoing Programs</option>
            <option value="OPEN_APPLICATION">Open Applications</option>
            <option value="UPCOMING">Upcoming Programs</option>
          </select>
        </div>

        {/* Program Type Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Program Type
          </label>
          <select
            value={searchParams.category || ''}
            onChange={(e) => onSearchChange({ category: e.target.value as ProgramCategory | '' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="ACCELERATOR">Accelerator</option>
            <option value="INCUBATOR">Incubator</option>
            <option value="CHALLENGE">Challenge</option>
            <option value="WORKSHOP">Workshop</option>
            <option value="COMPETITION">Competition</option>
            <option value="MENTORSHIP">Mentorship</option>
            <option value="FUNDING">Funding</option>
            <option value="NETWORKING">Networking</option>
            <option value="EDUCATION">Education</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={searchParams.status || ''}
            onChange={(e) => onSearchChange({ status: e.target.value as ProgramStatus | '' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="COMPLETED">Completed</option>
            <option value="PAUSED">Paused</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration
          </label>
          <select
            value={searchParams.duration || ''}
            onChange={(e) => onSearchChange({ duration: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Durations</option>
            <option value="1-4 weeks">1-4 weeks</option>
            <option value="5-8 weeks">5-8 weeks</option>
            <option value="9-12 weeks">9-12 weeks</option>
            <option value="13+ weeks">13+ weeks</option>
            <option value="Ongoing">Ongoing</option>
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {Object.entries(searchParams).map(([key, value]) => {
              if (!value) return null;
              
              const getFilterLabel = (key: string, value: string) => {
                switch (key) {
                  case 'programCategory':
                    return `Category: ${value.replace('_', ' ')}`;
                  case 'category':
                    return `Type: ${value}`;
                  case 'status':
                    return `Status: ${value}`;
                  case 'duration':
                    return `Duration: ${value}`;
                  case 'search':
                    return `Search: "${value}"`;
                  default:
                    return `${key}: ${value}`;
                }
              };

              return (
                <div
                  key={key}
                  className="flex items-center space-x-2 bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm"
                >
                  <span>{getFilterLabel(key, value)}</span>
                  <button
                    onClick={() => onSearchChange({ [key]: '' })}
                    className="hover:bg-primary-100 rounded-full p-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
