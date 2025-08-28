'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, User, Plus, ChevronLeft, ChevronRight, MapPin, Video, Phone } from 'lucide-react';
import { CalendarEvent, SessionSchedule } from '@/types/calendar';
import { generateAllCalendarEvents } from '@/data/calendar';
import { EventDetailsPanel } from './EventDetailsPanel';
import { BookingForm } from './BookingForm';

// Single Responsibility: Main calendar component with KinderWatch-style layout
export const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);
  const [showEventPanel, setShowEventPanel] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Form state for session scheduling
  const [sessionForm, setSessionForm] = useState({
    time: '',
    duration: '',
    mentorId: '',
    notes: ''
  });

  // Generate calendar events
  const events = useMemo(() => generateAllCalendarEvents(), []);

  // Check if mobile on mount and resize
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const eventsOnDate = events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
    setSelectedEvents(eventsOnDate);
    setShowEventPanel(true);
    setShowBookingForm(false);
  };

  // Handle form input changes
  const handleFormChange = (field: string, value: string) => {
    setSessionForm(prev => ({ ...prev, [field]: value }));
  };

  // Handle booking button click
  const handleBookingClick = () => {
    setShowBookingForm(true);
    setShowEventPanel(false);
  };

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Session scheduled:', { ...sessionForm, date: selectedDate });
    // TODO: Implement actual session scheduling
    setShowBookingForm(false);
    setSessionForm({ time: '', duration: '', mentorId: '', notes: '' });
  };

  // Close panels
  const closePanels = () => {
    setShowEventPanel(false);
    setShowBookingForm(false);
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

  // Mock mentor data
  const mentors = [
    {
      id: 'mentor1',
      name: 'Dr. Sarah Johnson',
      role: 'Healthcare Innovation Specialist',
      company: 'HealthTech Solutions',
      expertise: ['Clinical Trials', 'Healthcare Innovation', 'Patient Care'],
      photo: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D9488&color=fff',
      linkedinUrl: 'https://linkedin.com/in/sarahjohnson'
    },
    {
      id: 'mentor2',
      name: 'Prof. Michael Chen',
      role: 'AI & Machine Learning Expert',
      company: 'TechCorp Labs',
      expertise: ['Artificial Intelligence', 'Machine Learning', 'Data Science'],
      photo: 'https://ui-avatars.com/api/?name=Michael+Chen&background=1E40AF&color=fff',
      linkedinUrl: 'https://linkedin.com/in/michaelchen'
    },
    {
      id: 'mentor3',
      name: 'Dr. Emily Rodriguez',
      role: 'Clinical Research Director',
      company: 'Medical Research Institute',
      expertise: ['Clinical Research', 'Drug Development', 'Regulatory Affairs'],
      photo: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=DC2626&color=fff',
      linkedinUrl: 'https://linkedin.com/in/emilyrodriguez'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
            <p className="text-gray-600 mt-2">
              Manage your schedule, book mentor sessions, and track program events
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleBookingClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Book Session
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Calendar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h2>
              
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
                      relative p-2 text-sm rounded-lg transition-all duration-200 min-h-[40px] flex items-center justify-center
                      ${isSelected(date) 
                        ? 'bg-primary-600 text-white font-medium shadow-md' 
                        : isToday(date)
                        ? 'bg-primary-100 text-primary-800 font-medium border-2 border-primary-300'
                        : isCurrentMonth(date)
                        ? 'text-gray-900 hover:bg-gray-100'
                        : 'text-gray-400'
                      }
                      ${hasEvents(date) && !isSelected(date) ? 'border-b-2 border-primary-300' : ''}
                    `}
                  >
                    {date.getDate()}
                    {hasEvents(date) && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="w-1 h-1 bg-primary-400 rounded-full"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button
                  onClick={() => handleDateSelect(new Date())}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  📅 Today
                </button>
                <button
                  onClick={() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    handleDateSelect(tomorrow);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  🚀 Tomorrow
                </button>
                <button
                  onClick={() => {
                    const nextWeek = new Date();
                    nextWeek.setDate(nextWeek.getDate() + 7);
                    handleDateSelect(nextWeek);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  📆 Next Week
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Form Inputs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Schedule Session</h2>
            
            {showEventPanel ? (
              <EventDetailsPanel
                date={selectedDate}
                events={selectedEvents}
                onClose={closePanels}
                onBookingClick={handleBookingClick}
                isMobile={isMobile}
              />
            ) : showBookingForm ? (
              <BookingForm
                selectedDate={selectedDate}
                onClose={closePanels}
                isMobile={isMobile}
              />
            ) : (
              /* Default Form Layout - Similar to KinderWatch */
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time
                  </label>
                  <div className="relative">
                    <select 
                      value={sessionForm.time}
                      onChange={(e) => handleFormChange('time', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    >
                      <option value="">Choose a time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Clock className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Duration Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Duration
                  </label>
                  <div className="relative">
                    <select 
                      value={sessionForm.duration}
                      onChange={(e) => handleFormChange('duration', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    >
                      <option value="">Choose duration</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="90">1.5 hours</option>
                      <option value="120">2 hours</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Clock className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Mentor Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Mentor
                  </label>
                  <div className="relative">
                    <select 
                      value={sessionForm.mentorId}
                      onChange={(e) => handleFormChange('mentorId', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    >
                      <option value="">Choose a mentor</option>
                      {mentors.map(mentor => (
                        <option key={mentor.id} value={mentor.id}>
                          {mentor.name} - {mentor.role}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Selected Mentor Details */}
                {sessionForm.mentorId && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    {(() => {
                      const mentor = mentors.find(m => m.id === sessionForm.mentorId);
                      if (!mentor) return null;
                      
                      return (
                        <div className="flex items-start space-x-3">
                          <img 
                            src={mentor.photo} 
                            alt={mentor.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{mentor.name}</h4>
                            <p className="text-sm text-gray-600">{mentor.role}</p>
                            <p className="text-sm text-gray-600">{mentor.company}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {mentor.expertise.slice(0, 3).map((skill, index) => (
                                <span 
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Recommendations */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mentor Recommendations
                  </label>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      Continue focus on functional communication and reducing escape behaviors. 
                      Schedule a 60-min 1:1 morning session for better attention.
                    </p>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={sessionForm.notes}
                    onChange={(e) => handleFormChange('notes', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Any specific topics or questions for this session..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closePanels}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
