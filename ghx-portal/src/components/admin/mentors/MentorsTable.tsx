'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Search, Filter, User, Building, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MentorFormData } from './MentorForm';

export interface MentorTableData extends MentorFormData {
  id: string;
}

interface MentorsTableProps {
  mentors: MentorTableData[];
  onEdit: (mentor: MentorTableData) => void;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export const MentorsTable: React.FC<MentorsTableProps> = ({
  mentors,
  onEdit,
  onDelete,
  isLoading = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Get unique expertise options for filter
  const expertiseOptions = React.useMemo(() => {
    const allExpertise = mentors.flatMap(mentor => mentor.expertise);
    return ['all', ...Array.from(new Set(allExpertise))];
  }, [mentors]);

  // Filter mentors based on search and expertise
  const filteredMentors = React.useMemo(() => {
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

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this mentor? This action cannot be undone.')) {
      setDeletingId(id);
      try {
        await onDelete(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const formatExpertise = (expertise: string[]) => {
    return expertise.slice(0, 2).join(' • ') + (expertise.length > 2 ? ` +${expertise.length - 2} more` : '');
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Table Header with Search and Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search mentors by name, role, or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
          </div>

          {/* Expertise Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={selectedExpertise}
              onChange={(e) => setSelectedExpertise(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
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
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredMentors.length} of {mentors.length} mentors
          {searchTerm && ` matching "${searchTerm}"`}
          {selectedExpertise !== 'all' && ` in ${selectedExpertise}`}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mentor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expertise
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMentors.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center space-y-2">
                    <User className="h-12 w-12 text-gray-300" />
                    <p className="text-lg font-medium">No mentors found</p>
                    <p className="text-sm">
                      {searchTerm || selectedExpertise !== 'all' 
                        ? 'Try adjusting your search or filters'
                        : 'Get started by adding your first mentor'
                      }
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredMentors.map((mentor) => (
                <motion.tr
                  key={mentor.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  {/* Mentor Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-full object-cover"
                          src={mentor.photo}
                          alt={mentor.name}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            // Use a data URI fallback to prevent infinite loops
                            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiM2QjcyODAiLz4KPHN2ZyB4PSIxMiIgeT0iMTQiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAxMkMxNC4yMSAxMiAxNiAxMC4yMSAxNiA4UzE0LjIxIDQgMTIgNFM4IDUuNzkgOCA4UzkuNzkgMTIgMTJaTTEyIDE0QzkuMzMgMTQgNCAxNS4zNCA0IDE4VjIwSDIwVjE4QzIwIDE1LjM0IDE0LjY3IDE0IDEyIDE0WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo=';
                            target.onerror = null; // Prevent further error handling
                          }}
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{mentor.name}</div>
                        <div className="text-sm text-gray-500">
                          <a
                            href={mentor.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            View LinkedIn
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{mentor.role}</span>
                    </div>
                  </td>

                  {/* Company */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{mentor.company}</span>
                    </div>
                  </td>

                  {/* Expertise */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">
                      {formatExpertise(mentor.expertise)}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(mentor)}
                        className="text-blue-600 hover:text-blue-800 border-blue-200 hover:border-blue-300"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(mentor.id)}
                        disabled={deletingId === mentor.id}
                        className="text-red-600 hover:text-red-800 border-red-200 hover:border-red-300"
                      >
                        {deletingId === mentor.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-1"></div>
                        ) : (
                          <Trash2 className="h-4 w-4 mr-1" />
                        )}
                        {deletingId === mentor.id ? 'Deleting...' : 'Delete'}
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
