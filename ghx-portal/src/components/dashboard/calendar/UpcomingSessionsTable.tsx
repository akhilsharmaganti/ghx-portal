'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar } from 'lucide-react';
import Image from 'next/image';

// Single Responsibility: Display upcoming sessions in a table format
export interface UpcomingSession {
  id: string;
  mentorName: string;
  mentorPhoto: string;
  specialisation: string;
  scheduledDate: string;
  scheduledTime: string;
  status: string;
}

export interface UpcomingSessionsTableProps {
  sessions: UpcomingSession[];
}

export const UpcomingSessionsTable: React.FC<UpcomingSessionsTableProps> = ({ sessions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Memoized filtered sessions
  const filteredSessions = useMemo(() => {
    let filtered = sessions;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(session =>
        session.mentorName.toLowerCase().includes(term) ||
        session.specialisation.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(session => session.status === selectedStatus);
    }

    return filtered;
  }, [sessions, searchTerm, selectedStatus]);

  // Single Responsibility: Handle session actions
  const handleReschedule = (sessionId: string) => {
    console.log('Reschedule session:', sessionId);
    // TODO: Implement reschedule functionality
  };

  const handleCancel = (sessionId: string) => {
    console.log('Cancel session:', sessionId);
    // TODO: Implement cancel functionality
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      {/* Header with Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h2>
        
        <div className="flex items-center gap-3 w-full lg:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          
          {/* Filter Icon */}
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Sessions Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profile
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mentor Name
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Specialisation
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Scheduled date and time
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredSessions.map((session) => (
              <tr key={session.id} className="hover:bg-gray-50 transition-colors">
                {/* Profile Avatar */}
                <td className="py-4 px-4">
                  <Image
                    src={session.mentorPhoto}
                    alt={`${session.mentorName} profile`}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                </td>
                
                {/* Mentor Name */}
                <td className="py-4 px-4">
                  <span className="text-sm font-medium text-gray-900">
                    {session.mentorName}
                  </span>
                </td>
                
                {/* Specialisation */}
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-600">
                    {session.specialisation}
                  </span>
                </td>
                
                {/* Scheduled Date and Time */}
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-900">
                    <div>{session.scheduledDate}</div>
                    <div className="text-gray-600">{session.scheduledTime}</div>
                  </div>
                </td>
                
                {/* Actions */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReschedule(session.id)}
                      className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                    >
                      RESCHEDULE
                    </button>
                    <button
                      onClick={() => handleCancel(session.id)}
                      className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                    >
                      CANCEL
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredSessions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
          <p className="text-gray-500">
            {searchTerm || selectedStatus !== 'all' 
              ? 'Try adjusting your search or filters.'
              : 'You have no upcoming sessions scheduled.'
            }
          </p>
        </div>
      )}
    </motion.div>
  );
};
