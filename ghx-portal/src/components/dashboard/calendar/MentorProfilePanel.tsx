'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

// Single Responsibility: Display mentor profile information
export interface MentorProfileProps {
  mentor: {
    id: string;
    name: string;
    role: string;
    company: string;
    photo: string;
    linkedinUrl: string;
    expertise: string[];
    description: string;
  };
}

export const MentorProfilePanel: React.FC<MentorProfileProps> = ({ mentor }) => {
  // Single Responsibility: Handle LinkedIn redirect
  const handleLinkedInClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mentor.linkedinUrl) {
      window.open(mentor.linkedinUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
    >
      {/* Mentor Avatar and Basic Info */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="relative">
          <Image
            src={mentor.photo}
            alt={`${mentor.name} profile photo`}
            width={80}
            height={80}
            className="w-20 h-20 rounded-full object-cover"
            priority
          />
          {/* LinkedIn Icon Overlay */}
          <button
            onClick={handleLinkedInClick}
            className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            aria-label={`View ${mentor.name}'s LinkedIn profile`}
          >
            <Linkedin className="w-3 h-3 text-blue-600" />
          </button>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{mentor.name}</h3>
          <p className="text-lg font-semibold text-gray-700 mb-2">{mentor.role}</p>
          <p className="text-sm text-gray-600 mb-3">{mentor.company}</p>
          
          {/* Expertise Tags */}
          <div className="flex flex-wrap gap-2">
            {mentor.expertise.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Description */}
      <div className="border-t pt-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          {mentor.description}
        </p>
      </div>
    </motion.div>
  );
};
