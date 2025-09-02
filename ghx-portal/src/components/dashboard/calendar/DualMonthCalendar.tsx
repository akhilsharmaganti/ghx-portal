'use client';

import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Single Responsibility: Display two months side by side
export interface DualMonthCalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate?: Date;
  availableDates?: Date[];
  className?: string;
}

export const DualMonthCalendar: React.FC<DualMonthCalendarProps> = ({
  onDateSelect,
  selectedDate = new Date(),
  availableDates = [],
  className = ''
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Calendar navigation
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentMonth);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentMonth(newDate);
  };

  // Generate calendar days for a specific month
  const generateCalendarDays = (month: Date) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
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

  // Get month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Generate months for display
  const months = useMemo(() => {
    const firstMonth = new Date(currentMonth);
    const secondMonth = new Date(currentMonth);
    secondMonth.setMonth(secondMonth.getMonth() + 1);
    
    return [
      { date: firstMonth, days: generateCalendarDays(firstMonth) },
      { date: secondMonth, days: generateCalendarDays(secondMonth) }
    ];
  }, [currentMonth]);

  // Check if date is available
  const isAvailable = (date: Date) => {
    return availableDates.some(availableDate => 
      availableDate.toDateString() === date.toDateString()
    );
  };

  // Check if date is selected
  const isSelected = (date: Date) => {
    return selectedDate && selectedDate.toDateString() === date.toDateString();
  };

  // Check if date is current month
  const isCurrentMonth = (date: Date, monthDate: Date) => {
    return date.getMonth() === monthDate.getMonth();
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (isAvailable(date)) {
      onDateSelect(date);
    }
  };

  return (
    <div className={`space-y-6 max-w-3xl mx-auto ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900">Select a Date</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {months.map((month, monthIndex) => (
          <div key={monthIndex} className="p-3">
            {/* Month Header */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              
              <h4 className="text-base font-medium text-gray-900">
                {monthNames[month.date.getMonth()]} {month.date.getFullYear()}
              </h4>
              
              <button
                onClick={() => navigateMonth('next')}
                className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-0.5">
              {/* Day headers */}
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-1.5">
                  {day}
                </div>
              ))}
              
              {/* Calendar days */}
              {month.days.map((date, index) => (
                <button
                  key={index}
                  onClick={() => handleDateSelect(date)}
                  disabled={!isAvailable(date)}
                  className={`
                    relative p-1.5 text-sm transition-all duration-200 min-h-[32px] flex items-center justify-center
                    ${isSelected(date)
                      ? 'bg-blue-500 text-white font-medium rounded-full w-8 h-8'
                      : isAvailable(date)
                      ? 'text-gray-900 hover:bg-gray-50 cursor-pointer border-b border-blue-300 rounded-none'
                      : isCurrentMonth(date, month.date)
                      ? 'text-gray-400 cursor-not-allowed rounded-none'
                      : 'text-gray-300 cursor-not-allowed rounded-none'
                    }
                  `}
                >
                  {date.getDate()}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
