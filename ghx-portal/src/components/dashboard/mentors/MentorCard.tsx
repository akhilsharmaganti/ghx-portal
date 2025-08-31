'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

// Single Responsibility: Mentor card display and interaction
export interface MentorCardProps {
  id: string;
  name: string;
  role: string;
  company: string;
  photo: string;
  linkedinUrl: string;
  expertise: string[];
  description?: string;
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
  description,
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);

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

  // Single Responsibility: Handle session booking
  const handleBookSession = () => {
    // TODO: Implement session booking functionality
    console.log('Book session with:', name);
  };

  // Single Responsibility: Handle LinkedIn redirect
  const handleLinkedInClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (linkedinUrl) {
      window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Single Responsibility: Format expertise display
  const formatExpertise = (expertise: string[]) => {
    if (!expertise || !Array.isArray(expertise)) return [];
    return expertise.slice(0, 2); // Show only first 2 expertise areas
  };

  // Single Responsibility: Handle image load error
  const handleImageError = () => {
    setImageError(true);
  };

  // Generate a default description if none provided
  const mentorDescription = description || `${name} is a ${role.toLowerCase()} with extensive experience in ${expertise.slice(0, 2).join(' and ')}. They provide valuable guidance and mentorship to help startups accelerate their growth and achieve their goals.`;

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
      className={`
        bg-white rounded-xl shadow-lg border border-gray-100 
        overflow-hidden group hover:shadow-xl transition-all duration-300
        w-[300px] h-[434px] flex flex-col m-0 p-0
        ${className}
      `}
      role="article"
    >
      {/* Profile Photo Section - TOP with exact Figma dimensions */}
      <div className="relative w-full h-[176px] bg-gradient-to-br from-orange-50 to-orange-100 flex-shrink-0">
        <div className="absolute inset-0 flex items-center justify-center">
          {!imageError && photo ? (
            <Image
              src={photo}
              alt={`${name} profile photo`}
              width={300}
              height={176}
              className="w-full h-full object-cover"
              style={{ borderRadius: '12px' }}
              priority
              onError={handleImageError}
              onLoad={() => setImageError(false)}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-center p-4">
              <div>
                <div className="text-3xl sm:text-4xl mb-2">👤</div>
                <div className="text-xs sm:text-sm font-medium">{name}</div>
              </div>
            </div>
          )}
        </div>
        
        {/* LinkedIn Icon Overlay - Top Right */}
        <button
          onClick={handleLinkedInClick}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white p-1.5 rounded-full shadow-lg hover:bg-gray-50"
          aria-label={`View ${name}'s LinkedIn profile`}
        >
          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </button>
      </div>

      {/* Content Section - BOTTOM with compact spacing */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* Top Content */}
        <div>
          {/* Name */}
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
            {name}
          </h3>

          {/* Role */}
          <p className="text-sm font-semibold text-gray-700 mb-1">
            {role}
          </p>

          {/* Company */}
          <p className="text-xs text-gray-600 mb-3">
            {company}
          </p>

          {/* Expertise Tags */}
          {expertise.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1.5">
                {formatExpertise(expertise).map((exp, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                  >
                    {exp}
                  </span>
                ))}
                {expertise.length > 2 && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    +{expertise.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">
            {mentorDescription}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={handleBookSession}
            className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md text-xs"
          >
            <Calendar className="w-3 h-3" />
            <span>Book Session</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
