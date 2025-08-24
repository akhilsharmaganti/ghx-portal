'use client';

import React, { useState } from 'react';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { ClinicalStudiesFormData, BaseFormProps } from '@/types/profile';

interface ClinicalStudiesFormProps extends BaseFormProps {
  initialData?: ClinicalStudiesFormData;
}

export const ClinicalStudiesForm: React.FC<ClinicalStudiesFormProps> = ({ 
  initialData, 
  onCancel,
  onSubmit,
  isSubmitting = false,
  template
}) => {
  
  const [formData, setFormData] = useState<ClinicalStudiesFormData>({
    hasConductedClinicalTrials: initialData?.hasConductedClinicalTrials || '',
    cohortSize: initialData?.cohortSize || '',
    trialLocation: initialData?.trialLocation || '',
    trialTimeline: initialData?.trialTimeline || '',
    keyFindings: initialData?.keyFindings || '',
    regulatoryAlignment: initialData?.regulatoryAlignment || '',
    clinicalTrialPhase: initialData?.clinicalTrialPhase || '',
    publicationStatus: initialData?.publicationStatus || '',
    challenges: initialData?.challenges || '',
    thirdPartyValidation: initialData?.thirdPartyValidation || '',
    additionalTrialsPlanned: initialData?.additionalTrialsPlanned || '',
    additionalTrialsDetails: initialData?.additionalTrialsDetails || ''
  });

  const [errors, setErrors] = useState<Partial<ClinicalStudiesFormData>>({});

  // Form field options
  const yesNoOptions = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
  ];

  const regulatoryOptions = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
    { value: 'In Progress', label: 'In Progress' }
  ];

  const clinicalPhaseOptions = [
    { value: 'Preclinical', label: 'Preclinical' },
    { value: 'Phase I', label: 'Phase I' },
    { value: 'Phase II', label: 'Phase II' },
    { value: 'Phase III', label: 'Phase III' },
    { value: 'Post-Market Surveillance', label: 'Post-Market Surveillance' }
  ];

  const validationOptions = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
  ];

  const handleInputChange = (field: keyof ClinicalStudiesFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // If user changes the primary question to "No", clear all other fields
    if (field === 'hasConductedClinicalTrials' && value === 'No') {
      setFormData(prev => ({
        ...prev,
        cohortSize: '',
        trialLocation: '',
        trialTimeline: '',
        keyFindings: '',
        regulatoryAlignment: '',
        clinicalTrialPhase: '',
        publicationStatus: '',
        challenges: '',
        thirdPartyValidation: '',
        additionalTrialsPlanned: '',
        additionalTrialsDetails: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ClinicalStudiesFormData> = {};
    
    // Primary question is always required
    if (!formData.hasConductedClinicalTrials) {
      newErrors.hasConductedClinicalTrials = 'Required';
    }
    
    // If clinical trials were conducted, validate all other required fields
    if (formData.hasConductedClinicalTrials === 'Yes') {
      if (!formData.cohortSize) newErrors.cohortSize = 'Required';
      if (!formData.trialLocation) newErrors.trialLocation = 'Required';
      if (!formData.trialTimeline) newErrors.trialTimeline = 'Required';
      if (!formData.keyFindings) newErrors.keyFindings = 'Required';
      if (!formData.regulatoryAlignment) newErrors.regulatoryAlignment = 'Required';
      if (!formData.clinicalTrialPhase) newErrors.clinicalTrialPhase = 'Required';
      if (!formData.publicationStatus) newErrors.publicationStatus = 'Required';
      if (!formData.challenges) newErrors.challenges = 'Required';
      if (!formData.thirdPartyValidation) newErrors.thirdPartyValidation = 'Required';
      if (!formData.additionalTrialsPlanned) newErrors.additionalTrialsPlanned = 'Required';
      
      // If additional trials are planned, details are required
      if (formData.additionalTrialsPlanned === 'Yes' && !formData.additionalTrialsDetails) {
        newErrors.additionalTrialsDetails = 'Required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Submit form data to parent component
      onSubmit(formData);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const showTrialDetails = formData.hasConductedClinicalTrials === 'Yes';

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Section 4 - Clinical Trials
        </h2>
        <p className="text-gray-600">
          Please provide information about your clinical trials and research data.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Primary Question - Controls visibility of other fields */}
        <FormField
          name="hasConductedClinicalTrials"
          label="Have you conducted any clinical trials?"
          type="select"
          value={formData.hasConductedClinicalTrials}
          onChange={(e) => handleInputChange('hasConductedClinicalTrials', e.target.value)}
          options={yesNoOptions}
          required
          error={errors.hasConductedClinicalTrials}
        />

        {/* Conditional Fields - Only shown if clinical trials were conducted */}
        {showTrialDetails && (
          <>
            {/* Trial Details */}
            <FormField
              name="cohortSize"
              label="Size of the Cohort: How many participants were included?"
              type="text"
              value={formData.cohortSize}
              onChange={(e) => handleInputChange('cohortSize', e.target.value)}
              required
              error={errors.cohortSize}
              placeholder="e.g., 150 participants"
            />

            <FormField
              name="trialLocation"
              label="Trial Location: Where were the trials conducted? (e.g., country, institution)"
              type="text"
              value={formData.trialLocation}
              onChange={(e) => handleInputChange('trialLocation', e.target.value)}
              required
              error={errors.trialLocation}
              placeholder="e.g., United States, Johns Hopkins University"
            />

            <FormField
              name="trialTimeline"
              label="Timeline: When were the trials conducted? (Start and end dates)"
              type="text"
              value={formData.trialTimeline}
              onChange={(e) => handleInputChange('trialTimeline', e.target.value)}
              required
              error={errors.trialTimeline}
              placeholder="e.g., January 2023 - December 2023"
            />

            <FormField
              name="keyFindings"
              label="Key Findings: What were the main outcomes or results of the trials?"
              type="textarea"
              value={formData.keyFindings}
              onChange={(e) => handleInputChange('keyFindings', e.target.value)}
              required
              error={errors.keyFindings}
              rows={3}
              placeholder="Describe the main outcomes, efficacy results, safety data, etc."
            />

            {/* Regulatory and Compliance */}
            <FormField
              name="regulatoryAlignment"
              label="Were the clinical trials conducted in alignment with regulatory standards?"
              type="select"
              value={formData.regulatoryAlignment}
              onChange={(e) => handleInputChange('regulatoryAlignment', e.target.value)}
              options={regulatoryOptions}
              required
              error={errors.regulatoryAlignment}
            />

            <FormField
              name="clinicalTrialPhase"
              label="What phase of clinical trials has your product completed?"
              type="select"
              value={formData.clinicalTrialPhase}
              onChange={(e) => handleInputChange('clinicalTrialPhase', e.target.value)}
              options={clinicalPhaseOptions}
              required
              error={errors.clinicalTrialPhase}
            />

            <FormField
              name="publicationStatus"
              label="Have the results of your clinical trials been published or presented in any conferences or journals? If yes, please share links or references. If no, type N/A"
              type="textarea"
              value={formData.publicationStatus}
              onChange={(e) => handleInputChange('publicationStatus', e.target.value)}
              required
              error={errors.publicationStatus}
              rows={3}
              placeholder="e.g., Published in Journal of Medical Research, Presented at ASCO 2023, or N/A"
            />

            <FormField
              name="challenges"
              label="What challenges, if any, have you faced during clinical trials?"
              type="textarea"
              value={formData.challenges}
              onChange={(e) => handleInputChange('challenges', e.target.value)}
              required
              error={errors.challenges}
              rows={3}
              placeholder="Describe any challenges with recruitment, compliance, data collection, etc."
            />

            <FormField
              name="thirdPartyValidation"
              label="Are your clinical trial results validated by independent third parties?"
              type="select"
              value={formData.thirdPartyValidation}
              onChange={(e) => handleInputChange('thirdPartyValidation', e.target.value)}
              options={validationOptions}
              required
              error={errors.thirdPartyValidation}
            />

            {/* Future Plans */}
            <FormField
              name="additionalTrialsPlanned"
              label="Do you have plans for additional clinical trials?"
              type="select"
              value={formData.additionalTrialsPlanned}
              onChange={(e) => handleInputChange('additionalTrialsPlanned', e.target.value)}
              options={yesNoOptions}
              required
              error={errors.additionalTrialsPlanned}
            />

            {formData.additionalTrialsPlanned === 'Yes' && (
              <FormField
                name="additionalTrialsDetails"
                label="Please specify details, including cohort size, timeline, and objectives"
                type="textarea"
                value={formData.additionalTrialsDetails}
                onChange={(e) => handleInputChange('additionalTrialsDetails', e.target.value)}
                required
                error={errors.additionalTrialsDetails}
                rows={3}
                placeholder="Describe planned trials, expected cohort size, timeline, objectives, etc."
              />
            )}
          </>
        )}

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button type="submit">
            Next →
          </Button>
        </div>
      </form>
    </div>
  );
};
