'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, User, ExternalLink, Video } from 'lucide-react';
import { CalendarEvent } from '@/types/calendar';

// Single Responsibility: Display event details for selected date
interface EventDetailsPanelProps {
  date: Date | null;
  events: CalendarEvent[];
  onClose: () => void;
  onBookingClick: () => void;
  isMobile: boolean;
}

export const EventDetailsPanel: React.FC<EventDetailsPanelProps> = ({
  date,
  events,
  onClose,
  onBookingClick,
  isMobile
}) => {
  if (!date) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'PROGRAM_START':
        return '🚀';
      case 'PROGRAM_END':
        return '🏁';
      case 'MENTOR_SESSION':
        return '👨‍🏫';
      case 'WORKSHOP':
        return '🔧';
      case 'DEADLINE':
        return '⏰';
      case 'MEETING':
        return '🤝';
      case 'REMINDER':
        return '📝';
      default:
        return '📅';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'PROGRAM_START':
        return 'Program Start';
      case 'PROGRAM_END':
        return 'Program End';
      case 'MENTOR_SESSION':
        return 'Mentor Session';
      case 'WORKSHOP':
        return 'Workshop';
      case 'DEADLINE':
        return 'Deadline';
      case 'MEETING':
        return 'Meeting';
      case 'REMINDER':
        return 'Reminder';
      default:
        return 'Event';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: isMobile ? 0 : 20, y: isMobile ? 20 : 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: isMobile ? 0 : 20, y: isMobile ? 20 : 0 }}
      transition={{ duration: 0.3 }}
      className={`
        bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden
        ${isMobile ? 'fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] overflow-y-auto' : 'sticky top-8'}
      `}
    >
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              {formatDate(date)}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {events.length > 0 && (
          <p className="text-sm text-gray-600 mt-1">
            {events.length} event{events.length !== 1 ? 's' : ''} on this date
          </p>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {events.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-4">📅</div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Events</h4>
            <p className="text-gray-600 mb-4">
              This date is free. Perfect time to book a mentor session!
            </p>
            <button
              onClick={onBookingClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Book Session
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                {/* Event Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{getEventIcon(event.type)}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {getEventTypeLabel(event.type)}
                      </span>
                    </div>
                  </div>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: event.color }}
                  />
                </div>

                {/* Event Details */}
                <div className="space-y-2 text-sm text-gray-600">
                  {/* Time */}
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    <span>
                      {formatTime(event.start)}
                      {event.end && event.end.getTime() !== event.start.getTime() && (
                        <> - {formatTime(event.end)}</>
                      )}
                    </span>
                  </div>

                  {/* Description */}
                  {event.description && (
                    <p className="text-gray-700">{event.description}</p>
                  )}

                  {/* Mentor Name */}
                  {event.extendedProps.mentorName && (
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      <span>Mentor: {event.extendedProps.mentorName}</span>
                    </div>
                  )}

                  {/* Program Title */}
                  {event.extendedProps.programTitle && (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span>Program: {event.extendedProps.programTitle}</span>
                    </div>
                  )}

                  {/* Meeting Link */}
                  {event.extendedProps.meetingLink && (
                    <div className="flex items-center">
                      <Video className="w-4 h-4 mr-2 text-gray-400" />
                      <a
                        href={event.extendedProps.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 flex items-center"
                      >
                        Join Meeting
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {event.isBooked && event.extendedProps.status === 'SCHEDULED' && (
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-md hover:bg-primary-50 transition-colors">
                        Reschedule
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors">
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Book Session Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={onBookingClick}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Book New Session
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
