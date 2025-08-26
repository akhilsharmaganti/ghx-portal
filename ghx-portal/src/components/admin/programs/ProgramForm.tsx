'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, FileText, Tag, ImageIcon, Calendar, Star, Building } from 'lucide-react';
import { Button } from '@/components/ui';
import { FormField } from '@/components/ui';
import { cn } from '@/utils';
import { Program, ProgramCategory, ProgramStatus } from '@/types/programs';

interface ProgramFormProps {
  program?: Program | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (program: Partial<Program>) => void;
  isSubmitting?: boolean;
}

const PROGRAM_CATEGORIES: string[] = [
  'ACCELERATOR', 'WORKSHOP', 'COMPETITION', 'MENTORSHIP', 
  'FUNDING', 'NETWORKING', 'EDUCATION'
];

const PROGRAM_STATUSES: ProgramStatus[] = [
  'DRAFT', 'PUBLISHED', 'ACTIVE', 'COMPLETED', 'ARCHIVED'
];

const PROGRAM_CATEGORIES_NEW: ('ONGOING' | 'OPEN_APPLICATION' | 'UPCOMING')[] = [
  'ONGOING', 'OPEN_APPLICATION', 'UPCOMING'
];

export const ProgramForm: React.FC<ProgramFormProps> = ({
  program,
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false
}) => {
  const [formData, setFormData] = useState<Partial<Program>>({
    title: '',
    shortDescription: '',
    fullDescription: '',
    category: 'WORKSHOP',
    programCategory: 'UPCOMING',
    duration: '',
    requirements: [],
    benefits: [],
    startDate: '',
    endDate: '',
    maxParticipants: 50,
    currentParticipants: 0,
    status: 'DRAFT',
    image: '',
    tags: [],
    theme: '',
    whyJoinUs: ''
  });

  const [activeTab, setActiveTab] = useState<'basic' | 'details'>('basic');
  const [newRequirement, setNewRequirement] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  const [newTag, setNewTag] = useState('');


  useEffect(() => {
    if (program) {
      setFormData(program);
    }
  }, [program]);

  const handleInputChange = (field: keyof Program, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...(prev.requirements || []), newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements?.filter((_, i) => i !== index) || []
    }));
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setFormData(prev => ({
        ...prev,
        benefits: [...(prev.benefits || []), newBenefit.trim()]
      }));
      setNewBenefit('');
    }
  };

  const removeBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits?.filter((_, i) => i !== index) || []
    }));
  };

  const addTag = () => {
    if (newTag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== index) || []
    }));
  };



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50"
      >
        <div className="flex min-h-screen items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {program ? 'Edit Program' : 'Create New Program'}
                </h2>
                <p className="text-sm text-gray-600">
                  {program ? 'Update program information' : 'Add a new innovation program'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-4">
                <button
                  onClick={() => setActiveTab('basic')}
                  className={cn(
                    'py-3 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2',
                    activeTab === 'basic'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )}
                >
                  <FileText className="w-4 h-4" />
                  <span>Basic Info</span>
                </button>
                                 <button
                   onClick={() => setActiveTab('details')}
                   className={cn(
                     'py-3 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2',
                     activeTab === 'details'
                       ? 'border-blue-500 text-blue-600'
                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                   )}
                 >
                   <Tag className="w-4 h-4" />
                   <span>Details</span>
                 </button>

              </nav>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-4 max-h-80 overflow-y-auto">
              <AnimatePresence mode="wait">
                {activeTab === 'basic' && (
                  <motion.div
                    key="basic"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        name="title"
                        type="text"
                        label="Program Title"
                        value={formData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        required
                        placeholder="Enter program title"
                      />
                      <FormField
                        name="theme"
                        type="text"
                        label="Theme"
                        value={formData.theme || ''}
                        onChange={(e) => handleInputChange('theme', e.target.value)}
                        placeholder="e.g., Healthcare, AI, Sustainability"
                      />
                    </div>

                    <FormField
                      name="shortDescription"
                      type="textarea"
                      label="Short Description"
                      value={formData.shortDescription || ''}
                      onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                      required
                      placeholder="Brief description for program cards"
                      rows={2}
                    />

                    <FormField
                      name="fullDescription"
                      type="textarea"
                      label="Full Description"
                      value={formData.fullDescription || ''}
                      onChange={(e) => handleInputChange('fullDescription', e.target.value)}
                      required
                      placeholder="Detailed program description"
                      rows={3}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                          value={formData.category || 'WORKSHOP'}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {PROGRAM_CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Program Type</label>
                        <select
                          value={formData.programCategory || 'UPCOMING'}
                          onChange={(e) => handleInputChange('programCategory', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {PROGRAM_CATEGORIES_NEW.map(cat => (
                            <option key={cat} value={cat}>{cat.replace('_', ' ')}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          value={formData.status || 'UPCOMING'}
                          onChange={(e) => handleInputChange('status', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {PROGRAM_STATUSES.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input
                          type="date"
                          value={formData.startDate || ''}
                          onChange={(e) => handleInputChange('startDate', e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input
                          type="date"
                          value={formData.endDate || ''}
                          onChange={(e) => handleInputChange('endDate', e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        name="duration"
                        type="text"
                        label="Duration"
                        value={formData.duration || ''}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        placeholder="e.g., 8 weeks, 3 months"
                        required
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
                        <input
                          type="number"
                          value={formData.maxParticipants || 50}
                          onChange={(e) => handleInputChange('maxParticipants', parseInt(e.target.value))}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Participants</label>
                        <input
                          type="number"
                          value={formData.currentParticipants || 0}
                          onChange={(e) => handleInputChange('currentParticipants', parseInt(e.target.value))}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <FormField
                      name="image"
                      type="url"
                      label="Program Image URL"
                      value={formData.image || ''}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </motion.div>
                )}

                {activeTab === 'details' && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <FormField
                      name="whyJoinUs"
                      type="textarea"
                      label="Why Join Us"
                      value={formData.whyJoinUs || ''}
                      onChange={(e) => handleInputChange('whyJoinUs', e.target.value)}
                      placeholder="Explain the benefits and value proposition"
                      rows={3}
                    />

                    {/* Requirements */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                      <div className="space-y-2">
                        {formData.requirements?.map((req, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <span className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                              {req}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeRequirement(index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={newRequirement}
                            onChange={(e) => setNewRequirement(e.target.value)}
                            placeholder="Add a requirement"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <Button type="button" onClick={addRequirement} variant="outline">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                      <div className="space-y-2">
                        {formData.benefits?.map((benefit, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <span className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                              {benefit}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeBenefit(index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={newBenefit}
                            onChange={(e) => setNewBenefit(e.target.value)}
                            placeholder="Add a benefit"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <Button type="button" onClick={addBenefit} variant="outline">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {formData.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(index)}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="Add a tag"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <Button type="button" onClick={addTag} variant="outline">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                                         </div>
                   </motion.div>
                 )}


               </AnimatePresence>
            </form>

            {/* Footer Actions */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {program ? 'Update program information' : 'Create a new innovation program'}
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : (program ? 'Update Program' : 'Create Program')}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
