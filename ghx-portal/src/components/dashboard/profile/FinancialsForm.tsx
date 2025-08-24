'use client';

import React, { useState } from 'react';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { FinancialsFormData, BaseFormProps } from '@/types/profile';

interface FinancialsFormProps extends BaseFormProps {
  initialData?: FinancialsFormData;
}

export const FinancialsForm: React.FC<FinancialsFormProps> = ({ 
  initialData, 
  onCancel,
  onSubmit,
  isSubmitting = false,
  template
}) => {
  
  const [formData, setFormData] = useState<FinancialsFormData>({
    fullTimeEmployees: initialData?.fullTimeEmployees || '',
    annualRecurringRevenue: initialData?.annualRecurringRevenue || '',
    yearToDateRevenue: initialData?.yearToDateRevenue || '',
    isCurrentlyProfitable: initialData?.isCurrentlyProfitable || '',
    breakevenTimeline: initialData?.breakevenTimeline || '',
    hasRaisedFunds: initialData?.hasRaisedFunds || '',
    lastFundingDetails: initialData?.lastFundingDetails || '',
    estimatedRunway: initialData?.estimatedRunway || '',
    lookingToRaiseFunds: initialData?.lookingToRaiseFunds || '',
    fundingAmount: initialData?.fundingAmount || ''
  });

  const [errors, setErrors] = useState<Partial<FinancialsFormData>>({});

  // Form field options
  const employeeCountOptions = [
    { value: '1-10', label: '1-10' },
    { value: '11-24', label: '11-24' }, 
    { value: '26-50', label: '26-50' },
    { value: '51-100', label: '51-100' },
    { value: '101-200', label: '101-200' },
    { value: '200+', label: '200+' }
  ];

  const revenueOptions = [
    { value: '<$50K', label: '<$50K' },
    { value: '$50K-$200K', label: '$50K-$200K' },
    { value: '$200K-$500K', label: '$200K-$500K' },
    { value: '$500K-$1M', label: '$500K-$1M' },
    { value: '$1M-$5M', label: '$1M-$5M' },
    { value: '$5M+', label: '$5M+' }
  ];

  const yesNoOptions = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
  ];

  const runwayOptions = [
    { value: '<6 months', label: '<6 months' },
    { value: '6-12 months', label: '6-12 months' },
    { value: '12-18 months', label: '12-18 months' },
    { value: '18-24 months', label: '18-24 months' },
    { value: '24+ months', label: '24+ months' }
  ];

  const breakevenOptions = [
    { value: 'Q1 2024', label: 'Q1 2024' },
    { value: 'Q2 2024', label: 'Q2 2024' },
    { value: 'Q3 2024', label: 'Q3 2024' },
    { value: 'Q4 2024', label: 'Q4 2024' },
    { value: 'Q1 2025', label: 'Q1 2025' },
    { value: 'Q2 2025', label: 'Q2 2025' },
    { value: 'Q3 2025', label: 'Q3 2025' },
    { value: 'Q4 2025', label: 'Q4 2025' },
    { value: '6 months', label: '6 months' },
    { value: '12 months', label: '12 months' },
    { value: '18 months', label: '18 months' },
    { value: '24+ months', label: '24+ months' }
  ];

  const handleInputChange = (field: keyof FinancialsFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FinancialsFormData> = {};
    
    // Required fields validation
    if (!formData.fullTimeEmployees) newErrors.fullTimeEmployees = 'Required';
    if (!formData.annualRecurringRevenue) newErrors.annualRecurringRevenue = 'Required';
    if (!formData.yearToDateRevenue) newErrors.yearToDateRevenue = 'Required';
    if (!formData.isCurrentlyProfitable) newErrors.isCurrentlyProfitable = 'Required';
    if (!formData.breakevenTimeline) newErrors.breakevenTimeline = 'Required';
    if (!formData.lastFundingDetails) newErrors.lastFundingDetails = 'Required';
    if (!formData.estimatedRunway) newErrors.estimatedRunway = 'Required';

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

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Section 3 - Financials
        </h2>
        <p className="text-gray-600">
          Please provide detailed financial information about your company.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Size */}
        <FormField
          name="fullTimeEmployees"
          label="Including the founders, how many people are currently working full-time for your company?"
          type="select"
          value={formData.fullTimeEmployees}
          onChange={(e) => handleInputChange('fullTimeEmployees', e.target.value)}
          options={employeeCountOptions}
          required
          error={errors.fullTimeEmployees}
        />

        {/* Revenue Metrics */}
        <FormField
          name="annualRecurringRevenue"
          label="What is your company's ARR (Annual Recurring Revenue)?"
          type="select"
          value={formData.annualRecurringRevenue}
          onChange={(e) => handleInputChange('annualRecurringRevenue', e.target.value)}
          options={revenueOptions}
          required
          error={errors.annualRecurringRevenue}
        />

        <FormField
          name="yearToDateRevenue"
          label="What is your year-to-date revenue?"
          type="select"
          value={formData.yearToDateRevenue}
          onChange={(e) => handleInputChange('yearToDateRevenue', e.target.value)}
          options={revenueOptions}
          required
          error={errors.yearToDateRevenue}
        />

        {/* Financial Status */}
        <FormField
          name="isCurrentlyProfitable"
          label="Are you currently profitable?"
          type="select"
          value={formData.isCurrentlyProfitable}
          onChange={(e) => handleInputChange('isCurrentlyProfitable', e.target.value)}
          options={yesNoOptions}
          required
          error={errors.isCurrentlyProfitable}
        />

        <FormField
          name="breakevenTimeline"
          label="When do you expect to reach breakeven?"
          type="select"
          value={formData.breakevenTimeline}
          onChange={(e) => handleInputChange('breakevenTimeline', e.target.value)}
          options={breakevenOptions}
          required
          error={errors.breakevenTimeline}
        />

        {/* Funding Information */}
        <FormField
          name="hasRaisedFunds"
          label="Have you raised funds?"
          type="select"
          value={formData.hasRaisedFunds}
          onChange={(e) => handleInputChange('hasRaisedFunds', e.target.value)}
          options={yesNoOptions}
          error={errors.hasRaisedFunds}
        />

        <FormField
          name="lastFundingDetails"
          label="Last funding raised and at what valuation"
          type="textarea"
          value={formData.lastFundingDetails}
          onChange={(e) => handleInputChange('lastFundingDetails', e.target.value)}
          required
          error={errors.lastFundingDetails}
          rows={3}
          placeholder="e.g., $500K in Seed Round at $5M valuation in Q2 2024"
        />

        {/* Financial Projections */}
        <FormField
          name="estimatedRunway"
          label="What is your estimated runway?"
          type="select"
          value={formData.estimatedRunway}
          onChange={(e) => handleInputChange('estimatedRunway', e.target.value)}
          options={runwayOptions}
          required
          error={errors.estimatedRunway}
        />

        <FormField
          name="lookingToRaiseFunds"
          label="Are you looking to raise funds?"
          type="select"
          value={formData.lookingToRaiseFunds}
          onChange={(e) => handleInputChange('lookingToRaiseFunds', e.target.value)}
          options={yesNoOptions}
          error={errors.lookingToRaiseFunds}
        />

        {formData.lookingToRaiseFunds === 'Yes' && (
          <FormField
            name="fundingAmount"
            label="If yes, how much?"
            type="textarea"
            value={formData.fundingAmount}
            onChange={(e) => handleInputChange('fundingAmount', e.target.value)}
            error={errors.fundingAmount}
            rows={2}
            placeholder="e.g., $1M Series A, $2M bridge round"
          />
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
