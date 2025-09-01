'use client';

import React, { useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { MentorProfilePanel } from '@/components/dashboard/calendar/MentorProfilePanel';
import { DualMonthCalendar } from '@/components/dashboard/calendar/DualMonthCalendar';
import { TimeSlotSelector, TimeSlot } from '@/components/dashboard/calendar/TimeSlotSelector';
import { ActionButtons, ActionButton } from '@/components/ui/ActionButtons';
import { getMentorById } from '@/data/mentors';
import { getFeaturedMentor } from '@/data/calendar';

// Single Responsibility: Session booking page with mentor profile and calendar
export default function SessionBookingPage() {
  const router = useRouter();
  const params = useParams();
  const mentorId = params.mentorId as string;

  // State management
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // Get mentor data based on URL parameter
  const mentor = useMemo(() => {
    const foundMentor = getMentorById(mentorId);
    if (!foundMentor) {
      // Fallback to featured mentor if mentor not found
      return getFeaturedMentor();
    }
    // Ensure description exists for MentorProfilePanel
    return {
      ...foundMentor,
      description: foundMentor.description || `${foundMentor.name} is a ${foundMentor.role.toLowerCase()} with extensive experience in ${foundMentor.expertise.slice(0, 2).join(' and ')}. They provide valuable guidance and mentorship to help startups accelerate their growth and achieve their goals.`
    };
  }, [mentorId]);

  // Handle case where no mentor is found
  if (!mentor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Mentor Not Found</h1>
          <p className="text-gray-600 mb-6">The mentor you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/dashboard?tab=mentors')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Mentors
          </button>
        </div>
      </div>
    );
  }

  // Generate dummy available dates (August 5, 9, 10, 11, 13)
  const availableDates = useMemo(() => {
    const dates = [
      new Date(2025, 7, 5),   // August 5
      new Date(2025, 7, 9),   // August 9
      new Date(2025, 7, 10),  // August 10
      new Date(2025, 7, 11),  // August 11
      new Date(2025, 7, 13),  // August 13
      new Date(2025, 8, 7),   // September 7
      new Date(2025, 8, 9),   // September 9
      new Date(2025, 8, 10),  // September 10
      new Date(2025, 8, 11),  // September 11
      new Date(2025, 8, 13),  // September 13
    ];
    return dates;
  }, []);

  // Generate time slots (9:00 AM to 5:30 PM, 60 min duration)
  const timeSlots = useMemo(() => {
    const slots: TimeSlot[] = [];
    const startHour = 9; // 9 AM
    const endHour = 17;  // 5 PM
    const endMinute = 30; // 5:30 PM

    for (let hour = startHour; hour <= endHour; hour++) {
      // Add full hour slot
      if (hour < endHour) {
        slots.push({
          id: `time-${hour}-00`,
          time: `${hour}:00 AM`,
          isAvailable: true,
          isSelected: selectedTimeSlot === `time-${hour}-00`
        });
      }

      // Add half hour slot (except for 5:30 PM)
      if (hour < endHour || (hour === endHour && endMinute === 30)) {
        const minute = hour === endHour ? endMinute : 30;
        const timeString = minute === 30 ? `${hour}:30 ${hour < 12 ? 'AM' : 'PM'}` : `${hour}:${minute} ${hour < 12 ? 'AM' : 'PM'}`;
        
        slots.push({
          id: `time-${hour}-${minute}`,
          time: timeString,
          isAvailable: true,
          isSelected: selectedTimeSlot === `time-${hour}-${minute}`
        });
      }
    }

    return slots;
  }, [selectedTimeSlot]);

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null); // Reset time selection when date changes
  };

  // Handle time slot selection
  const handleTimeSlotSelect = (slotId: string) => {
    setSelectedTimeSlot(slotId);
  };

  // Handle cancel
  const handleCancel = () => {
    router.push('/dashboard?tab=mentors');
  };

  // Handle confirm and schedule
  const handleConfirmAndSchedule = () => {
    if (!selectedDate || !selectedTimeSlot) {
      alert('Please select both a date and time slot');
      return;
    }

    // TODO: Implement actual session booking
    console.log('Booking session:', {
      mentorId,
      mentorName: mentor.name,
      date: selectedDate,
      timeSlot: selectedTimeSlot
    });

    // Redirect to calendar page
    router.push('/dashboard?tab=calendar');
  };

  // Action buttons
  const actionButtons: ActionButton[] = [
    {
      label: 'Cancel',
      onClick: handleCancel,
      variant: 'secondary'
    },
    {
      label: 'Confirm & Schedule',
      onClick: handleConfirmAndSchedule,
      variant: 'primary',
      disabled: !selectedDate || !selectedTimeSlot
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Book Session</h1>
            <p className="text-gray-600 mt-2">
              Schedule a session with {mentor.name}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Mentors', href: '/dashboard?tab=mentors' },
              { label: 'Book Session' }
            ]}
          />
        </div>

        {/* Mentor Profile Section - Top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <MentorProfilePanel mentor={mentor} />
        </motion.div>

        {/* Session Booking Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-8"
        >
          {/* Dual Month Calendar */}
          <DualMonthCalendar
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate || undefined}
            availableDates={availableDates}
          />

          {/* Time Slot Selection */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TimeSlotSelector
                slots={timeSlots}
                onSlotSelect={handleTimeSlotSelect}
                duration={60}
              />
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-8 border-t border-gray-200"
          >
            <ActionButtons buttons={actionButtons} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
