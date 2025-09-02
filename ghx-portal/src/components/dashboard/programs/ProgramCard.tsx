'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, MapPin, Star, Play, Image as ImageIcon } from 'lucide-react';
import { ProgramCardProps, EnhancedProgramCardProps } from '@/types/programs';
import { cn } from '@/utils';

interface ProgramCardExtendedProps extends EnhancedProgramCardProps {
  onViewDetails?: (programId: string) => void;
  onApply?: (programId: string) => void;
  onConnect?: (programId: string) => void;
}

export const ProgramCard: React.FC<ProgramCardExtendedProps> = ({
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
  className,
  variant = 'upcoming',
  theme,
  whyJoinUs,
  hasTestimonials = false,
  hasTimeline = false,
  selectedStartupsCount = 0,
  onViewDetails,
  onApply,
  onConnect
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'ongoing':
        return {
          card: 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50',
          badge: 'bg-green-100 text-green-800',
          button: 'bg-green-600 hover:bg-green-700 text-white'
        };
      case 'open-application':
        return {
          card: 'border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50',
          badge: 'bg-blue-100 text-blue-800',
          button: 'bg-blue-600 hover:bg-blue-700 text-white'
        };
      case 'upcoming':
        return {
          card: 'border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50',
          badge: 'bg-purple-100 text-purple-800',
          button: 'bg-purple-600 hover:bg-purple-700 text-white'
        };
      default:
        return {
          card: 'border-gray-200 bg-white',
          badge: 'bg-gray-100 text-gray-800',
          button: 'bg-gray-600 hover:bg-gray-700 text-white'
        };
    }
  };

  const getVariantBadge = () => {
    switch (variant) {
      case 'ongoing':
        return 'Ongoing';
      case 'open-application':
        return 'Apply Now';
      case 'upcoming':
        return 'Coming Soon';
      default:
        return status;
    }
  };

  const getVariantIcon = () => {
    switch (variant) {
      case 'ongoing':
        return <Play className="w-4 h-4" />;
      case 'open-application':
        return <Calendar className="w-4 h-4" />;
      case 'upcoming':
        return <Clock className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const styles = getVariantStyles();

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300 w-[300px] min-h-[434px] flex flex-col m-0 p-0',
        className
      )}
      role="article"
    >
      {/* Program Image Section - TOP with exact dimensions like MentorCard */}
      <div className="relative w-full h-[176px] bg-gradient-to-br from-blue-50 to-indigo-100 flex-shrink-0">
        <div className="absolute inset-0 flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              style={{ borderRadius: '12px' }}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-center p-4">
              <div>
                <div className="text-3xl sm:text-4xl mb-2">🚀</div>
                <div className="text-sm sm:text-base font-medium">{title}</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Status Badge - Top Left */}
        <div className={cn(
          'absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium',
          styles.badge
        )}>
          {getVariantBadge()}
        </div>

        {/* Category Badge - Top Right */}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
          {category}
        </div>
      </div>

      {/* Content Section - BOTTOM with proper spacing like MentorCard */}
      <div className="p-4 flex-1 flex flex-col justify-between min-h-0">
        {/* Top Content */}
        <div className="flex-1 min-h-0">
          {/* Title */}
          <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
            {title}
          </h3>

          {/* Category */}
          <p className="text-sm font-semibold text-gray-700 mb-1">
            {category}
          </p>

          {/* Duration */}
          <p className="text-sm text-gray-600 mb-3">
            Duration: {duration}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1.5">
                {tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 2 && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    +{tags.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">
            {shortDescription}
          </p>

          {/* Participants Info */}
          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{currentParticipants}/{maxParticipants}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{duration}</span>
            </div>
          </div>
        </div>

        {/* Action Button - Always at bottom like MentorCard */}
        <div className="flex justify-end mt-4 flex-shrink-0">
          <button
            onClick={() => onViewDetails?.(id)}
            className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md text-xs"
          >
            <Calendar className="w-3 h-3" />
            <span>View Details</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
