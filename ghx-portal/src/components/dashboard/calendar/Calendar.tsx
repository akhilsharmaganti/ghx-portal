'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { CalendarEvent } from '@/types/calendar';
import { generateAllCalendarEvents, getUpcomingSessions, getFeaturedMentor } from '@/data/calendar';
import { MentorProfilePanel } from './MentorProfilePanel';
import { UpcomingSessionsTable, UpcomingSession } from './UpcomingSessionsTable';

// Single Responsibility: Main calendar component with InnovateHub-style layout
export const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);

  // Generate calendar events and get data
  const events = useMemo(() => generateAllCalendarEvents(), []);
  const upcomingSessions = useMemo(() => getUpcomingSessions(), []);
  const featuredMentor = useMemo(() => getFeaturedMentor(), []);

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const eventsOnDate = events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
    setSelectedEvents(eventsOnDate);
  };

  // Calendar navigation
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= lastDay || days.length < 42) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Check if date has events
  const hasEvents = (date: Date) => {
    return events.some(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Check if date is selected
  const isSelected = (date: Date) => {
    return selectedDate.toDateString() === date.toDateString();
  };

  // Check if date is current month
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === selectedDate.getMonth();
  };

  // Get selected date info
  const selectedDateInfo = {
    dayName: selectedDate.toLocaleDateString('en-US', { weekday: 'long' }),
    month: selectedDate.toLocaleDateString('en-US', { month: 'long' }),
    day: selectedDate.getDate(),
    year: selectedDate.getFullYear(),
    eventCount: selectedEvents.length
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Sessions</h1>
        </div>

        {/* Top Row: 2 Columns Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Calendar (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                
                <h3 className="text-lg font-medium text-gray-900">
                  {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                </h3>
                
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Day headers */}
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
                
                {/* Calendar days */}
                {calendarDays.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(date)}
                    className={`
                      relative p-2 text-sm transition-all duration-200 min-h-[40px] flex items-center justify-center
                      ${isSelected(date) 
                        ? 'bg-blue-500 text-white font-medium rounded-full w-8 h-8' 
                        : isToday(date)
                        ? 'bg-blue-100 text-blue-800 font-medium border-b border-blue-300 rounded-none'
                        : isCurrentMonth(date)
                        ? 'text-gray-900 hover:bg-gray-50 border-b border-blue-300 rounded-none'
                        : 'text-gray-400 rounded-none'
                      }
                    `}
                  >
                    {date.getDate()}
                    {hasEvents(date) && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Mentor Profile Only (2/3 width) */}
          <div className="lg:col-span-2">


              {/* Event Details Card */}
              {selectedEvents.length > 0 && (
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  {selectedEvents.map((event) => (
                    <div key={event.id} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="w-4 h-4 bg-gray-400 rounded"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <p className="text-xs text-gray-600">{event.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(event.start).toLocaleTimeString('en-US', { 
                              hour: 'numeric', 
                              minute: '2-digit',
                              hour12: true 
                            })}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="w-4 h-4" />
                            <span>Program: {event.extendedProps.programTitle || 'General'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                  ))}
                </div>
              )}

            {/* Mentor Profile Panel */}
            <MentorProfilePanel mentor={featuredMentor} />
          </div>
        </div>

        {/* Bottom Row: Full Width Upcoming Sessions */}
        <div className="w-full">
          <UpcomingSessionsTable sessions={upcomingSessions} />
        </div>
      </div>
    </div>
  );
};
