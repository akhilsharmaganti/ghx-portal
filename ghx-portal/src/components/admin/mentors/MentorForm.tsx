'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Save, Edit } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';

// Interface matching the exact structure from mentors.ts
export interface MentorFormData {
  name: string;
  role: string;
  company: string;
  photo: string;
  linkedinUrl: string;
  expertise: string[];
}

interface MentorFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MentorFormData) => Promise<void>;
  editingMentor?: MentorFormData & { id: string };
  isSubmitting?: boolean;
}

// Predefined expertise options based on your current data
const EXPERTISE_OPTIONS = [
  'Clinical Research',
  'HealthTech',
  'Government Relations',
  'Digital Marketing',
  'Healthcare Marketing',
  'Investor Relations',
  'Go-to-Market',
  'Strategy',
  'Founder Coaching',
  'Financial Advisory',
  'Regulatory Affairs',
  'Pharmaceuticals',
  'Compliance',
  'Startup Growth',
  'Healthcare'
];

export const MentorForm: React.FC<MentorFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingMentor,
  isSubmitting = false
}) => {
  const [formData, setFormData] = useState<MentorFormData>({
    name: '',
    role: '',
    company: '',
    photo: '',
    linkedinUrl: '',
    expertise: []
  });

  const [newExpertise, setNewExpertise] = useState('');

  // Initialize form data when editing
  useEffect(() => {
    if (editingMentor) {
      setFormData({
        name: editingMentor.name,
        role: editingMentor.role,
        company: editingMentor.company,
        photo: editingMentor.photo,
        linkedinUrl: editingMentor.linkedinUrl,
        expertise: editingMentor.expertise
      });
    } else {
      setFormData({
        name: '',
        role: '',
        company: '',
        photo: '',
        linkedinUrl: '',
        expertise: []
      });
    }
  }, [editingMentor]);

  const handleInputChange = (field: keyof MentorFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addExpertise = () => {
    if (newExpertise.trim() && !formData.expertise.includes(newExpertise.trim())) {
      setFormData(prev => ({
        ...prev,
        expertise: [...prev.expertise, newExpertise.trim()]
      }));
      setNewExpertise('');
    }
  };

  const removeExpertise = (expertise: string) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.filter(exp => exp !== expertise)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const isFormValid = formData.name && formData.role && formData.company && formData.photo && formData.linkedinUrl && formData.expertise.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                {editingMentor ? (
                  <Edit className="h-6 w-6 text-blue-600" />
                ) : (
                  <UserPlus className="h-6 w-6 text-green-600" />
                )}
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingMentor ? 'Edit Mentor' : 'Add New Mentor'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Name */}
              <FormField
                label="Full Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Dr. Raju M"
                required
              />

              {/* Role */}
              <FormField
                label="Role/Title"
                name="role"
                type="text"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                placeholder="e.g., Clinical & HealthTech Advisor"
                required
              />

              {/* Company */}
              <FormField
                label="Company/Position"
                name="company"
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="e.g., Government of India Mentor"
                required
              />

              {/* Photo URL */}
              <FormField
                label="Photo URL"
                name="photo"
                type="text"
                value={formData.photo}
                onChange={(e) => handleInputChange('photo', e.target.value)}
                placeholder="e.g., https://ui-avatars.com/api/?name=Your+Name&size=150&background=4F46E5&color=FFFFFF"
                required
              />
              <p className="text-sm text-gray-500 -mt-2">
                Use a valid image URL or try: https://ui-avatars.com/api/?name=Your+Name&size=150&background=4F46E5&color=FFFFFF
              </p>

              {/* LinkedIn URL */}
              <FormField
                label="LinkedIn Profile URL"
                name="linkedinUrl"
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                placeholder="e.g., https://www.linkedin.com/in/dr-raju-m"
                required
              />

              {/* Expertise */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Expertise Areas *
                </label>
                
                {/* Current Expertise */}
                {formData.expertise.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.expertise.map((exp, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        {exp}
                        <button
                          type="button"
                          onClick={() => removeExpertise(exp)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Add New Expertise */}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newExpertise}
                    onChange={(e) => setNewExpertise(e.target.value)}
                    placeholder="Add expertise area..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExpertise())}
                  />
                  <Button
                    type="button"
                    onClick={addExpertise}
                    variant="outline"
                    disabled={!newExpertise.trim()}
                  >
                    Add
                  </Button>
                </div>

                {/* Predefined Options */}
                <div className="text-sm text-gray-600">
                  <p className="mb-2">Quick add from common areas:</p>
                  <div className="flex flex-wrap gap-2">
                    {EXPERTISE_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          if (!formData.expertise.includes(option)) {
                            handleInputChange('expertise', [...formData.expertise, option]);
                          }
                        }}
                        disabled={formData.expertise.includes(option)}
                        className={`px-2 py-1 text-xs rounded border transition-colors ${
                          formData.expertise.includes(option)
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="min-w-[120px]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Save className="h-4 w-4" />
                      <span>{editingMentor ? 'Update' : 'Create'} Mentor</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
