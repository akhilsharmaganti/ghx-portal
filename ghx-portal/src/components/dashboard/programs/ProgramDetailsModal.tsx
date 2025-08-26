'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Clock, MapPin, Star, Play, Image as ImageIcon, ExternalLink, Mail, Phone, User, Building } from 'lucide-react';
import { EnhancedProgramCardProps } from '@/types/programs';
import { cn } from '@/utils';

interface ProgramDetailsModalProps {
  program: EnhancedProgramCardProps | null;
  isOpen: boolean;
  onClose: () => void;
  onApply?: (programId: string) => void;
  onConnect?: (programId: string) => void;
}

export const ProgramDetailsModal: React.FC<ProgramDetailsModalProps> = ({
  program,
  isOpen,
  onClose,
  onApply,
  onConnect
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'testimonials' | 'startups'>('overview');
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  if (!program) return null;

  const getVariantStyles = () => {
    switch (program.variant) {
      case 'ongoing':
        return {
          primary: 'from-green-500 to-emerald-600',
          secondary: 'from-green-50 to-emerald-50',
          accent: 'bg-green-100 text-green-800',
          button: 'bg-green-600 hover:bg-green-700'
        };
      case 'open-application':
        return {
          primary: 'from-blue-500 to-indigo-600',
          secondary: 'from-blue-50 to-indigo-50',
          accent: 'bg-blue-100 text-blue-800',
          button: 'bg-blue-600 hover:bg-blue-700'
        };
      case 'upcoming':
        return {
          primary: 'from-purple-500 to-violet-600',
          secondary: 'from-purple-50 to-violet-50',
          accent: 'bg-purple-100 text-purple-800',
          button: 'bg-purple-600 hover:bg-purple-700'
        };
      default:
        return {
          primary: 'from-gray-500 to-slate-600',
          secondary: 'from-gray-50 to-slate-50',
          accent: 'bg-gray-100 text-gray-800',
          button: 'bg-gray-600 hover:bg-gray-700'
        };
    }
  };

  const getVariantBadge = () => {
    switch (program.variant) {
      case 'ongoing':
        return 'Ongoing';
      case 'open-application':
        return 'Apply Now';
      case 'upcoming':
        return 'Coming Soon';
      default:
        return program.status;
    }
  };

  const styles = getVariantStyles();

  // Mock data for demonstration - replace with real data later
  const mockMedia = [
    { id: '1', type: 'image', url: program.image, altText: program.title, caption: 'Program Overview' },
    { id: '2', type: 'image', url: '/api/placeholder/400/300?text=Workshop+Session', altText: 'Workshop Session', caption: 'Interactive Workshop' },
    { id: '3', type: 'video', url: '/api/placeholder/400/300?text=Demo+Video', altText: 'Demo Video', caption: 'Program Demo' }
  ];

  const mockTimeline = [
    { id: '1', title: 'Application Deadline', description: 'Last date to submit applications', eventDate: '2025-09-15', eventType: 'milestone', isImportant: true },
    { id: '2', title: 'Program Start', description: 'Orientation and kickoff session', eventDate: '2025-10-01', eventType: 'milestone', isImportant: true },
    { id: '3', title: 'Mid-Program Review', description: 'Progress assessment and feedback', eventDate: '2025-11-01', eventType: 'check_in', isImportant: false },
    { id: '4', title: 'Demo Day', description: 'Final presentations and networking', eventDate: '2025-12-15', eventType: 'demo_day', isImportant: true }
  ];

  const mockTestimonials = [
    { id: '1', userName: 'Sarah Johnson', userRole: 'CEO', userCompany: 'HealthTech Solutions', content: 'This program transformed our approach to healthcare innovation. The mentorship and resources were invaluable.', rating: 5, cohortYear: '2024' },
    { id: '2', userName: 'Michael Chen', userRole: 'Founder', userCompany: 'MediCare AI', content: 'The connections we made and the knowledge gained helped us secure our first round of funding.', rating: 5, cohortYear: '2024' }
  ];

  const mockStartups = [
    { id: '1', name: 'HealthTech Solutions', logo: '/api/placeholder/100/100?text=HTS', description: 'AI-powered healthcare diagnostics', industry: 'Healthcare AI', stage: 'Series A' },
    { id: '2', name: 'MediCare AI', logo: '/api/placeholder/100/100?text=MAI', description: 'Personalized medicine platform', industry: 'Precision Medicine', stage: 'Seed' }
  ];

  const handleApply = () => {
    onApply?.(program.id);
    onClose();
  };

  const handleConnect = () => {
    onConnect?.(program.id);
    onClose();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

          {/* Modal */}
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl max-h-[85vh] overflow-hidden bg-white rounded-2xl shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Hero Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Program Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={cn('px-2 py-1 rounded-full text-xs font-medium', styles.accent)}>
                      {getVariantBadge()}
                    </span>
                    {program.theme && (
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                        {program.theme}
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-2xl font-bold mb-1">{program.title}</h1>
                  <p className="text-sm text-gray-200 max-w-2xl">{program.shortDescription}</p>
                </div>
              </div>

                            {/* Content Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-6 px-4">
                  {['overview', 'timeline', 'testimonials'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={cn(
                        'py-3 px-1 border-b-2 font-medium text-sm capitalize transition-colors',
                        activeTab === tab
                          ? (styles.primary.includes('green') ? 'border-green-500 text-green-600' :
                             styles.primary.includes('blue') ? 'border-blue-500 text-blue-600' :
                             styles.primary.includes('purple') ? 'border-purple-500 text-purple-600' :
                             'border-gray-500 text-gray-600')
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                  {program.variant === 'ongoing' && (
                    <button
                      onClick={() => setActiveTab('startups')}
                      className={cn(
                        'py-3 px-1 border-b-2 font-medium text-sm capitalize transition-colors',
                        activeTab === 'startups'
                          ? (styles.primary.includes('green') ? 'border-green-500 text-green-600' :
                             styles.primary.includes('blue') ? 'border-blue-500 text-blue-600' :
                             styles.primary.includes('purple') ? 'border-purple-500 text-purple-600' :
                             'border-gray-500 text-gray-600')
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      )}
                    >
                      Startups
                    </button>
                  )}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-4 max-h-80 overflow-y-auto">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <Clock className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                        <p className="text-lg font-bold text-gray-900">{program.duration}</p>
                        <p className="text-xs text-gray-600">Duration</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <Calendar className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                        <p className="text-lg font-bold text-gray-900">{formatDate(program.startDate)}</p>
                        <p className="text-xs text-gray-600">Start Date</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <Users className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                        <p className="text-lg font-bold text-gray-900">{program.currentParticipants}/{program.maxParticipants}</p>
                        <p className="text-xs text-gray-600">Participants</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <MapPin className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                        <p className="text-lg font-bold text-gray-900">{program.category}</p>
                        <p className="text-xs text-gray-600">Type</p>
                      </div>
                    </div>

                    {/* Why Join Us */}
                    {program.whyJoinUs && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                          <Star className="w-4 h-4 text-blue-600 mr-2" />
                          Why Join Us
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed">{program.whyJoinUs}</p>
                      </div>
                    )}

                    {/* Media Gallery */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Program Media</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {mockMedia.map((media, index) => (
                          <div
                            key={media.id}
                            className="relative group cursor-pointer"
                            onClick={() => setActiveMediaIndex(index)}
                          >
                            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                              {media.type === 'video' ? (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                  <Play className="w-6 h-6 text-gray-400" />
                                </div>
                              ) : (
                                <img
                                  src={media.url}
                                  alt={media.altText}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              )}
                            </div>
                            {media.caption && (
                              <p className="text-xs text-gray-600 mt-1 text-center">{media.caption}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    {program.tags.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {program.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'timeline' && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Program Timeline</h3>
                    {mockTimeline.map((event, index) => (
                      <div key={event.id} className="flex items-start space-x-4">
                        <div className={cn(
                          'w-3 h-3 rounded-full mt-2 flex-shrink-0',
                          event.isImportant ? 'bg-red-500' : 'bg-gray-400'
                        )} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900">{event.title}</h4>
                            <span className="text-sm text-gray-500">{formatDate(event.eventDate)}</span>
                          </div>
                          {event.description && (
                            <p className="text-gray-600 text-sm">{event.description}</p>
                          )}
                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full mt-2">
                            {event.eventType.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'testimonials' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">What Participants Say</h3>
                    {mockTestimonials.map((testimonial) => (
                      <div key={testimonial.id} className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {testimonial.userName.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-semibold text-gray-900 text-sm">{testimonial.userName}</h4>
                              {testimonial.userRole && (
                                <span className="text-gray-500 text-xs">• {testimonial.userRole}</span>
                              )}
                            </div>
                            {testimonial.userCompany && (
                              <p className="text-xs text-gray-600 mb-1">{testimonial.userCompany}</p>
                            )}
                            <p className="text-gray-700 text-sm mb-2">{testimonial.content}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={cn(
                                      'w-3 h-3',
                                      i < (testimonial.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    )}
                                  />
                                ))}
                              </div>
                              {testimonial.cohortYear && (
                                <span className="text-xs text-gray-500">Cohort {testimonial.cohortYear}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'startups' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Selected Startups</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockStartups.map((startup) => (
                        <div key={startup.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                          <div className="flex items-center space-x-3 mb-3">
                            <img
                              src={startup.logo}
                              alt={startup.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="font-semibold text-gray-900 text-sm">{startup.name}</h4>
                              <p className="text-xs text-gray-600">{startup.industry}</p>
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm mb-2">{startup.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {startup.stage}
                            </span>
                            <button className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center">
                              View Profile
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors text-sm">
                      <Mail className="w-4 h-4" />
                      <span>Contact Admin</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors text-sm">
                      <Phone className="w-4 h-4" />
                      <span>Call Support</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      Close
                    </button>
                    
                    {program.variant === 'open-application' && (
                      <button
                        onClick={handleApply}
                        className={cn(
                          'px-4 py-2 text-white rounded-lg transition-colors text-sm',
                          styles.button
                        )}
                      >
                        Apply Now
                      </button>
                    )}
                    
                    {program.variant === 'upcoming' && (
                      <button
                        onClick={handleConnect}
                        className={cn(
                          'px-4 py-2 text-white rounded-lg transition-colors text-sm',
                          styles.button
                        )}
                      >
                        Connect with Admin
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
