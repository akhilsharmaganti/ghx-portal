'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, User, MessageSquare } from 'lucide-react';
import { mentorAvailabilityData } from '@/data/calendar';
import { mentorData } from '@/data/mentors';

// Single Responsibility: Form for booking mentor sessions
interface BookingFormProps {
  selectedDate: Date | null;
  onClose: () => void;
  isMobile: boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  selectedDate,
  onClose,
  isMobile
}) => {
  const [formData, setFormData] = useState({
    mentorId: '',
    date: selectedDate || new Date(),
    timeSlot: '',
    duration: 60,
    type: 'MENTOR_SESSION' as const,
    notes: ''
  });

  const [availableMentors, setAvailableMentors] = useState<any[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get available mentors for selected date
  useEffect(() => {
    if (selectedDate) {
      const dayOfWeek = selectedDate.getDay();
      const available = mentorAvailabilityData.filter(
        avail => avail.dayOfWeek === dayOfWeek && avail.isActive
      );
      setAvailableMentors(available);
    }
  }, [selectedDate]);

  // Get available time slots when mentor is selected
  useEffect(() => {
    if (formData.mentorId && selectedDate) {
      const dayOfWeek = selectedDate.getDay();
      const mentorAvailability = mentorAvailabilityData.find(
        avail => avail.mentorId === formData.mentorId && avail.dayOfWeek === dayOfWeek
      );
      
      if (mentorAvailability) {
        const availableSlots = mentorAvailability.timeSlots.filter(slot => !slot.isBooked);
        setAvailableTimeSlots(availableSlots);
      }
    }
  }, [formData.mentorId, selectedDate]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Reset dependent fields
    if (field === 'mentorId') {
      setFormData(prev => ({ ...prev, timeSlot: '', duration: 60 }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement actual booking logic
      console.log('Booking session:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message and close form
      alert('Session booked successfully!');
      onClose();
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to book session. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMentorName = (mentorId: string) => {
    const mentor = mentorData.find(m => m.id === mentorId);
    return mentor ? mentor.name : 'Unknown Mentor';
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const durationOptions = [
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' },
    { value: 120, label: '2 hours' }
  ];

  const sessionTypes = [
    { value: 'MENTOR_SESSION', label: 'Mentor Session' },
    { value: 'CONSULTATION', label: 'Consultation' },
    { value: 'WORKSHOP', label: 'Workshop' }
  ];

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
              Book Mentor Session
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {selectedDate && (
          <p className="text-sm text-gray-600 mt-1">
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Mentor Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="inline w-4 h-4 mr-1" />
            Select Mentor
          </label>
          <select
            value={formData.mentorId}
            onChange={(e) => handleInputChange('mentorId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          >
            <option value="">Choose a mentor</option>
            {availableMentors.map((availability) => {
              const mentor = mentorData.find(m => m.id === availability.mentorId);
              return (
                <option key={availability.mentorId} value={availability.mentorId}>
                  {mentor ? mentor.name : 'Unknown Mentor'} - {availability.startTime} to {availability.endTime}
                </option>
              );
            })}
          </select>
          {availableMentors.length === 0 && (
            <p className="text-sm text-red-600 mt-1">
              No mentors available on this date. Please select a different date.
            </p>
          )}
        </div>

        {/* Time Slot Selection */}
        {formData.mentorId && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="inline w-4 h-4 mr-1" />
              Select Time Slot
            </label>
            <select
              value={formData.timeSlot}
              onChange={(e) => handleInputChange('timeSlot', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            >
              <option value="">Choose a time slot</option>
              {availableTimeSlots.map((slot) => (
                <option key={slot.id} value={slot.id}>
                  {formatTime(slot.startTime)} - {formatTime(slot.endTime)} ({slot.duration} min)
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Duration Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="inline w-4 h-4 mr-1" />
            Session Duration
          </label>
          <select
            value={formData.duration}
            onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          >
            {durationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Session Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MessageSquare className="inline w-4 h-4 mr-1" />
            Session Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          >
            {sessionTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MessageSquare className="inline w-4 h-4 mr-1" />
            Notes (Optional)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            rows={3}
            placeholder="What would you like to discuss in this session?"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={isSubmitting || !formData.mentorId || !formData.timeSlot}
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Booking...' : 'Book Session'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};
