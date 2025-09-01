'use client';

import React, { useState } from 'react';

// Single Responsibility: Display and manage time slot selection
export interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
  isSelected: boolean;
}

export interface TimeSlotSelectorProps {
  slots: TimeSlot[];
  onSlotSelect: (slotId: string) => void;
  duration?: number; // in minutes
  className?: string;
}

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  slots,
  onSlotSelect,
  duration = 60,
  className = ''
}) => {
  // Handle slot selection
  const handleSlotClick = (slotId: string) => {
    onSlotSelect(slotId);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900">
        Select a Time (Duration {duration} min)
      </h3>
      
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
        {slots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => handleSlotClick(slot.id)}
            disabled={!slot.isAvailable}
            className={`
              px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
              ${slot.isSelected
                ? 'bg-blue-600 text-white shadow-md'
                : slot.isAvailable
                ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 cursor-pointer'
                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
};
