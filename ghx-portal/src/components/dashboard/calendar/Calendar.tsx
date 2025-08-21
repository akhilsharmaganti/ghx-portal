'use client';

import React, { useState, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Plus, Filter } from 'lucide-react';
import { CalendarEvent } from '@/types/calendar';
import { generateAllCalendarEvents } from '@/data/calendar';
import { EventDetailsPanel } from './EventDetailsPanel';
import { BookingForm } from './BookingForm';

// Single Responsibility: Main calendar component with FullCalendar integration
export const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);
  const [showEventPanel, setShowEventPanel] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Generate calendar events
  const events = useMemo(() => generateAllCalendarEvents(), []);

  // Check if mobile on mount and resize
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle date click
  const handleDateClick = (arg: any) => {
    const clickedDate = arg.date;
    const eventsOnDate = events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === clickedDate.toDateString();
    });

    setSelectedDate(clickedDate);
    setSelectedEvents(eventsOnDate);
    setShowEventPanel(true);
    setShowBookingForm(false);
  };

  // Handle event click
  const handleEventClick = (arg: any) => {
    const eventId = arg.event.id;
    const event = events.find(e => e.id === eventId);
    
    if (event) {
      setSelectedDate(new Date(event.start));
      setSelectedEvents([event]);
      setShowEventPanel(true);
      setShowBookingForm(false);
    }
  };

  // Handle booking button click
  const handleBookingClick = () => {
    setShowBookingForm(true);
    setShowEventPanel(false);
  };

  // Close panels
  const closePanels = () => {
    setShowEventPanel(false);
    setShowBookingForm(false);
    setSelectedDate(null);
    setSelectedEvents([]);
  };

  // Calendar options
  const calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    },
    events: events.map(event => ({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      backgroundColor: event.color,
      borderColor: event.color,
      textColor: '#ffffff',
      extendedProps: event.extendedProps
    })),
    dateClick: handleDateClick,
    eventClick: handleEventClick,
    height: 'auto',
    dayMaxEvents: true,
    moreLinkClick: 'popover',
    eventDisplay: 'block',
    dayCellContent: (arg: any) => {
      const date = arg.date;
      const eventsOnDate = events.filter(event => {
        const eventDate = new Date(event.start);
        return eventDate.toDateString() === date.toDateString();
      });

      if (eventsOnDate.length > 0) {
        return (
          <div className="flex flex-wrap gap-1 justify-center">
            {eventsOnDate.slice(0, 3).map((event, index) => (
              <div
                key={event.id}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: event.color }}
                title={event.title}
              />
            ))}
            {eventsOnDate.length > 3 && (
              <div className="text-xs text-gray-500">+{eventsOnDate.length - 3}</div>
            )}
          </div>
        );
      }
      return arg.dayNumberText;
    }
  };

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
            
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <FullCalendar {...calendarOptions} />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {showEventPanel && (
              <EventDetailsPanel
                date={selectedDate}
                events={selectedEvents}
                onClose={closePanels}
                onBookingClick={handleBookingClick}
                isMobile={isMobile}
              />
            )}

            {showBookingForm && (
              <BookingForm
                selectedDate={selectedDate}
                onClose={closePanels}
                isMobile={isMobile}
              />
            )}

            {/* Default sidebar content when no panel is open */}
            {!showEventPanel && !showBookingForm && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="text-center">
                  <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Calendar Overview
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Click on any date to see events or book a session with a mentor.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
