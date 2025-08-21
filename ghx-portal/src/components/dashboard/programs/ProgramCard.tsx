'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Users, Tag, ArrowRight } from 'lucide-react';
import { ProgramCardProps } from '@/types/programs';
import { useRouter } from 'next/navigation';

// Single Responsibility: Program card display and navigation
export const ProgramCard: React.FC<ProgramCardProps> = ({
  id,
  title,
  shortDescription,
  category,
  duration,
  startDate,
  status,
  image,
  tags,
  currentParticipants,
  maxParticipants,
  className = ''
}) => {
  const router = useRouter();

  // Single Responsibility: Handle program card click
  const handleCardClick = () => {
    router.push(`/dashboard/programs/${id}`);
  };

  // Single Responsibility: Format date display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Single Responsibility: Get status color and text
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return { color: 'bg-green-100 text-green-800', text: 'Active' };
      case 'UPCOMING':
        return { color: 'bg-blue-100 text-blue-800', text: 'Upcoming' };
      case 'COMPLETED':
        return { color: 'bg-gray-100 text-gray-800', text: 'Completed' };
      case 'PAUSED':
        return { color: 'bg-yellow-100 text-yellow-800', text: 'Paused' };
      case 'CANCELLED':
        return { color: 'bg-red-100 text-red-800', text: 'Cancelled' };
      default:
        return { color: 'bg-gray-100 text-gray-800', text: status };
    }
  };

  // Single Responsibility: Get category color
  const getCategoryColor = (category: string) => {
    const colors = {
      'ACCELERATOR': 'bg-purple-100 text-purple-800',
      'WORKSHOP': 'bg-blue-100 text-blue-800',
      'EDUCATION': 'bg-green-100 text-green-800',
      'COMPETITION': 'bg-orange-100 text-orange-800',
      'MENTORSHIP': 'bg-indigo-100 text-indigo-800',
      'FUNDING': 'bg-emerald-100 text-emerald-800',
      'NETWORKING': 'bg-pink-100 text-pink-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const statusInfo = getStatusInfo(status);
  const categoryColor = getCategoryColor(category);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={`
        bg-white rounded-xl shadow-lg border border-gray-100 
        cursor-pointer overflow-hidden group
        hover:shadow-xl transition-all duration-300
        ${className}
      `}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      {/* Program Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-primary-50 to-primary-100">
        <Image
          src={image}
          alt={`${title} program image`}
          width={400}
          height={300}
          className="w-full h-full object-cover"
          priority
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
            {statusInfo.text}
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
            {category}
          </span>
        </div>

        {/* Click Indicator */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-primary-600 text-white p-2 rounded-full shadow-lg">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2">
          {shortDescription}
        </p>

        {/* Program Details */}
        <div className="space-y-3 mb-4">
          {/* Duration */}
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{duration}</span>
          </div>

          {/* Start Date */}
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Starts {formatDate(startDate)}</span>
          </div>

          {/* Participants */}
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span>{currentParticipants}/{maxParticipants} participants</span>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Tag className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Click Indicator */}
        <div className="text-center pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 group-hover:text-primary-600 transition-colors duration-300">
            Click to view program details
          </p>
        </div>
      </div>
    </motion.div>
  );
};
