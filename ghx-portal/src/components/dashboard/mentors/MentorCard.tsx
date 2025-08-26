'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';

// Single Responsibility: Mentor card display and interaction
export interface MentorCardProps {
  id: string;
  name: string;
  role: string;
  company: string;
  photo: string;
  linkedinUrl: string;
  expertise: string[];
  className?: string;
}

// Reusable component with clear interface
export const MentorCard: React.FC<MentorCardProps> = ({
  name,
  role,
  company,
  photo,
  linkedinUrl,
  expertise,
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);

  // Debug logging to help identify data issues
  console.log('MentorCard received data:', { name, role, company, photo, linkedinUrl, expertise });

  // Safety checks for required data
  if (!name || !role || !company) {
    console.warn('MentorCard: Missing required data:', { name, role, company });
    return (
      <div className="bg-gray-100 rounded-xl p-6 text-center text-gray-500">
        <div className="text-2xl mb-2">⚠️</div>
        <div>Incomplete mentor data</div>
      </div>
    );
  }

  // Single Responsibility: Handle LinkedIn redirect
  const handleCardClick = () => {
    if (linkedinUrl) {
      window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Single Responsibility: Format expertise display
  const formatExpertise = (expertise: string[]) => {
    if (!expertise || !Array.isArray(expertise)) return 'No expertise listed';
    return expertise.slice(0, 2).join(' • ');
  };

  // Single Responsibility: Handle image load error
  const handleImageError = () => {
    setImageError(true);
  };

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
      {/* Profile Photo Section */}
      <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          {!imageError && photo ? (
            <Image
              src={photo}
              alt={`${name} profile photo`}
              width={200}
              height={250}
              className="w-full h-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[240px] object-cover rounded-lg shadow-lg"
              priority
              onError={handleImageError}
              onLoad={() => setImageError(false)}
            />
          ) : (
            <div className="w-full h-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[240px] bg-gray-200 rounded-lg shadow-lg flex items-center justify-center text-gray-500 text-center p-4">
              <div>
                <div className="text-4xl mb-2">👤</div>
                <div className="text-sm">{name}</div>
              </div>
            </div>
          )}
        </div>
        
        {/* LinkedIn Icon Overlay */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-primary-600 text-white p-2 rounded-full shadow-lg">
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Name and Premium Badge */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
            {name}
          </h3>
          
          <div className="flex items-center space-x-1 bg-gradient-to-r from-primary-500 to-primary-600 px-3 py-1 rounded-full shadow-sm">
            <Star className="w-4 h-4 text-white fill-current" />
            <span className="text-sm font-medium text-white">
              Premium
            </span>
          </div>
        </div>

        {/* Role */}
        <p className="text-lg font-semibold text-gray-700 mb-2">
          {role}
        </p>

        {/* Company */}
        <p className="text-gray-600 mb-3">
          {company}
        </p>

        {/* Expertise */}
        {expertise.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Expertise</p>
            <p className="text-sm font-medium text-gray-700">
              {formatExpertise(expertise)}
              {expertise.length > 2 && (
                <span className="text-gray-500"> +{expertise.length - 2} more</span>
              )}
            </p>
          </div>
        )}

        {/* Click Indicator */}
        <div className="text-center pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 group-hover:text-primary-600 transition-colors duration-300">
            Click to view LinkedIn profile
          </p>
        </div>
      </div>
    </motion.div>
  );
};
