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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'group relative overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:shadow-lg',
        styles.card,
        className
      )}
    >
      {/* Media Section */}
      <div className="relative h-48 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <ImageIcon className="h-12 w-12 text-gray-400" />
          </div>
        )}
        
        {/* Badge */}
        <div className={cn(
          'absolute top-3 left-3 flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium',
          styles.badge
        )}>
          {getVariantIcon()}
          <span>{getVariantBadge()}</span>
        </div>

        {/* Theme Badge */}
        {theme && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
            {theme}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Title and Category */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 capitalize">{category}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 line-clamp-2">{shortDescription}</p>

        {/* Why Join Us (for open application and upcoming) */}
        {variant !== 'ongoing' && whyJoinUs && (
          <div className="bg-white/50 rounded-lg p-2">
            <p className="text-xs text-gray-600 font-medium mb-1">Why Join Us:</p>
            <p className="text-xs text-gray-700 line-clamp-2">{whyJoinUs}</p>
          </div>
        )}

        {/* Selected Startups (for ongoing programs) */}
        {variant === 'ongoing' && selectedStartupsCount > 0 && (
          <div className="bg-white/50 rounded-lg p-2">
            <p className="text-xs text-gray-600 font-medium mb-1">Selected Startups:</p>
            <p className="text-xs text-gray-700">{selectedStartupsCount} startups participating</p>
          </div>
        )}

        {/* Features */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{currentParticipants}/{maxParticipants}</span>
            </div>
          </div>
          
          {/* Additional Features */}
          <div className="flex items-center space-x-2">
            {hasTimeline && <Calendar className="w-3 h-3 text-blue-500" />}
            {hasTestimonials && <Star className="w-3 h-3 text-yellow-500" />}
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white/70 text-xs text-gray-600 rounded-full border"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 bg-white/70 text-xs text-gray-600 rounded-full border">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 pt-2">
          {/* View Details Button (All variants) */}
          <button
            onClick={() => onViewDetails?.(id)}
            className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View Details
          </button>

          {/* Variant-specific Actions */}
          {variant === 'open-application' && (
            <button
              onClick={() => onApply?.(id)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                styles.button
              )}
            >
              Apply Now
            </button>
          )}

          {variant === 'upcoming' && (
            <button
              onClick={() => onConnect?.(id)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                styles.button
              )}
            >
              Connect
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
