'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Tag, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { getProgramById } from '@/data/programs';
import { Program } from '@/types/programs';

// Single Responsibility: Program detail page display and interaction
export default function ProgramDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [showProfileAlert, setShowProfileAlert] = useState(false);
  
  const programId = params.id as string;
  const program = getProgramById(programId);

  // Single Responsibility: Handle back navigation
  const handleBackClick = () => {
    router.back();
  };

  // Single Responsibility: Handle apply button click
  const handleApplyClick = () => {
    // TODO: In real app, check if user profile is complete
    // For now, always show the alert
    setShowProfileAlert(true);
  };

  // Single Responsibility: Navigate to profile
  const handleGoToProfile = () => {
    router.push('/dashboard?tab=profile');
  };

  // Single Responsibility: Format date display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
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

  if (!program) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Program Not Found</h1>
          <p className="text-gray-600 mb-4">The program you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={handleBackClick}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(program.status);
  const categoryColor = getCategoryColor(program.category);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Programs
          </button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{program.title}</h1>
              <p className="text-xl text-gray-600 max-w-3xl">{program.shortDescription}</p>
            </div>
            
            {/* Status and Category Badges */}
            <div className="flex flex-col gap-2">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusInfo.color}`}>
                {statusInfo.text}
              </span>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${categoryColor}`}>
                {program.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Program Image */}
            <div className="mb-8">
              <Image
                src={program.image}
                alt={`${program.title} program image`}
                width={800}
                height={400}
                className="w-full h-64 object-cover rounded-xl shadow-lg"
                priority
              />
            </div>

            {/* Program Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Program Description</h2>
              <p className="text-gray-700 leading-relaxed">{program.fullDescription}</p>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-3">
                {program.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What You&apos;ll Get</h2>
              <ul className="space-y-3">
                {program.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Apply Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Apply?</h3>
              
              {/* Program Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-3" />
                  <span className="text-sm">{program.duration}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3" />
                  <span className="text-sm">Starts {formatDate(program.startDate)}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-3" />
                  <span className="text-sm">{program.currentParticipants}/{program.maxParticipants} participants</span>
                </div>
                
                
              </div>

              {/* Apply Button */}
              <button
                onClick={handleApplyClick}
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 mb-4"
              >
                Apply Now
              </button>

              {/* Tags */}
              {program.tags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Profile Completion Alert Modal */}
      {showProfileAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-500 mr-3" />
              <h3 className="text-xl font-bold text-gray-900">Profile Incomplete</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              All your profile information must be complete to apply for this program. 
              Please fill your forms in the profile section properly first.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowProfileAlert(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGoToProfile}
                className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Go to Profile
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
