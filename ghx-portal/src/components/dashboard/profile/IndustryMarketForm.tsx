import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Building, Users, Target, Globe, FileText } from 'lucide-react'
import { FormField } from '@/components/ui'
import { IndustryMarketFormData, BaseFormProps } from '@/types/profile'

// =====================================================================
// Industry Market Form Props
// Extends BaseFormProps for consistency and reusability
// =====================================================================

interface IndustryMarketFormProps extends BaseFormProps {
  initialData?: IndustryMarketFormData
}

// =====================================================================
// Form Options
// =====================================================================

const healthcareDomains = [
  { value: 'DEVICES', label: 'Devices' },
  { value: 'SOFTWARE', label: 'Software' },
  { value: 'DIAGNOSTICS', label: 'Diagnostics' },
  { value: 'THERAPEUTICS', label: 'Therapeutics' },
  { value: 'DIGITAL_HEALTH', label: 'Digital Health' },
  { value: 'BIOTECHNOLOGY', label: 'Biotechnology' },
  { value: 'PHARMACEUTICALS', label: 'Pharmaceuticals' },
  { value: 'OTHER', label: 'Other' }
]

const businessModels = [
  { value: 'B2B', label: 'B2B' },
  { value: 'B2C', label: 'B2C' },
  { value: 'B2B2C', label: 'B2B2C' },
  { value: 'B2G', label: 'B2G' }
]

const customerTypes = [
  { value: 'PATIENT', label: 'Patient' },
  { value: 'INSURANCE', label: 'Insurance' },
  { value: 'HOSPITAL', label: 'Hospital' },
  { value: 'OTHER', label: 'Other' }
]

const countRanges = [
  { value: '0_PRE_REVENUE', label: '0 (pre-revenue)' },
  { value: '1_10', label: '1-10' },
  { value: '11_49', label: '11-49' },
  { value: '50_100', label: '50-100' },
  { value: '101_500', label: '101-500' },
  { value: '500_PLUS', label: '500+' },
  { value: 'OTHER', label: 'Other' }
]

const yesNoOptions = [
  { value: 'YES', label: 'Yes' },
  { value: 'NO', label: 'No' }
]

const partnerOptions = [
  { value: 'YES', label: 'Yes' },
  { value: 'NO', label: 'No' },
  { value: 'IN_PROGRESS', label: 'In-progress' }
]

const expansionTeamOptions = [
  { value: 'YES', label: 'Yes' },
  { value: 'NO_BUT_WANT_TO_HIRE', label: 'No, but we want to hire' },
  { value: 'NO', label: 'No' }
]

// =====================================================================
// Industry Market Form Component
// Now follows SOLID principles with BaseFormProps
// =====================================================================

export function IndustryMarketForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isSubmitting = false,
  template 
}: IndustryMarketFormProps) {
  const [formData, setFormData] = useState<IndustryMarketFormData>(
    initialData || {
      healthcareDomain: '',
      problemSolution: '',
      businessModel: '',
      payingCustomer: '',
      customerCount: '',
      userCount: '',
      indianMarketGoals: '',
      hasPartner: '',
      internationalMarkets: '',
      hasExpansionTeam: '',
      hasKeyOpinionLeaders: '',
      keyOpinionLeaders: ''
    }
  )

  const [errors, setErrors] = useState<Partial<IndustryMarketFormData>>({})

  // =====================================================================
  // Form Handlers
  // =====================================================================

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user types
    if (errors[name as keyof IndustryMarketFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<IndustryMarketFormData> = {}

    if (!formData.healthcareDomain) {
      newErrors.healthcareDomain = 'Healthcare domain is required'
    }
    if (!formData.problemSolution) {
      newErrors.problemSolution = 'Problem and solution description is required'
    }
    if (!formData.businessModel) {
      newErrors.businessModel = 'Business model is required'
    }
    if (!formData.payingCustomer) {
      newErrors.payingCustomer = 'Paying customer type is required'
    }
    if (!formData.customerCount) {
      newErrors.customerCount = 'Customer count is required'
    }
    if (!formData.userCount) {
      newErrors.userCount = 'User count is required'
    }
    if (!formData.indianMarketGoals) {
      newErrors.indianMarketGoals = 'Indian market goals are required'
    }
    if (!formData.hasPartner) {
      newErrors.hasPartner = 'Partner status is required'
    }
    if (!formData.internationalMarkets) {
      newErrors.internationalMarkets = 'International markets information is required'
    }
    if (!formData.hasExpansionTeam) {
      newErrors.hasExpansionTeam = 'Market expansion team status is required'
    }
    if (!formData.hasKeyOpinionLeaders) {
      newErrors.hasKeyOpinionLeaders = 'Key opinion leaders status is required'
    }
    if (formData.hasKeyOpinionLeaders === 'YES' && !formData.keyOpinionLeaders) {
      newErrors.keyOpinionLeaders = 'Key opinion leaders details are required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  // =====================================================================
  // Render
  // =====================================================================

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Section 2 - Industry and Market
        </h2>
        <p className="text-gray-600">
          Tell us about your healthcare domain and market presence
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Healthcare Domain */}
        <FormField
          label="In which domain of healthcare or life sciences do you operate?"
          name="healthcareDomain"
          type="select"
          value={formData.healthcareDomain}
          onChange={handleInputChange}
          placeholder="Select healthcare domain"
          required
          options={healthcareDomains}
          icon={Building}
          error={errors.healthcareDomain}
        />

        {/* Problem and Solution */}
        <FormField
          label="Briefly describe the problem you are solving and your solution to address the problem at scale."
          name="problemSolution"
          type="textarea"
          value={formData.problemSolution}
          onChange={handleInputChange}
          placeholder="Describe the problem and your solution..."
          required
          rows={4}
          icon={FileText}
          error={errors.problemSolution}
        />

        {/* Business Model */}
        <FormField
          label="What is your Business Model?"
          name="businessModel"
          type="select"
          value={formData.businessModel}
          onChange={handleInputChange}
          placeholder="Select business model"
          required
          options={businessModels}
          icon={Building}
          error={errors.businessModel}
        />

        {/* Paying Customer */}
        <FormField
          label="Who is your paying customer?"
          name="payingCustomer"
          type="select"
          value={formData.payingCustomer}
          onChange={handleInputChange}
          placeholder="Select customer type"
          required
          options={customerTypes}
          icon={Users}
          error={errors.payingCustomer}
        />

        {/* Customer Count */}
        <FormField
          label="How many paying customers does your company currently have?"
          name="customerCount"
          type="select"
          value={formData.customerCount}
          onChange={handleInputChange}
          placeholder="Select customer count range"
          required
          options={countRanges}
          icon={Users}
          error={errors.customerCount}
        />

        {/* User Count */}
        <FormField
          label="How many users does your company currently have?"
          name="userCount"
          type="select"
          value={formData.userCount}
          onChange={handleInputChange}
          placeholder="Select user count range"
          required
          options={countRanges}
          icon={Users}
          error={errors.userCount}
        />

        {/* Indian Market Goals */}
        <FormField
          label="Please describe your goals for the Indian market."
          name="indianMarketGoals"
          type="textarea"
          value={formData.indianMarketGoals}
          onChange={handleInputChange}
          placeholder="Describe your Indian market goals..."
          required
          rows={4}
          icon={Target}
          error={errors.indianMarketGoals}
        />

        {/* Partner Status */}
        <FormField
          label="Do you have a partner in the Indian market?"
          name="hasPartner"
          type="select"
          value={formData.hasPartner}
          onChange={handleInputChange}
          placeholder="Select partner status"
          required
          options={partnerOptions}
          icon={Users}
          error={errors.hasPartner}
        />

        {/* International Markets */}
        <FormField
          label="In which markets outside your home market are you currently active?"
          name="internationalMarkets"
          type="textarea"
          value={formData.internationalMarkets}
          onChange={handleInputChange}
          placeholder="Describe your international market presence..."
          required
          rows={3}
          icon={Globe}
          error={errors.internationalMarkets}
        />

        {/* Market Expansion Team */}
        <FormField
          label="Is there a team / team member dedicated for market expansion?"
          name="hasExpansionTeam"
          type="select"
          value={formData.hasExpansionTeam}
          onChange={handleInputChange}
          placeholder="Select expansion team status"
          required
          options={expansionTeamOptions}
          icon={Users}
          error={errors.hasExpansionTeam}
        />

        {/* Key Opinion Leaders */}
        <FormField
          label="Do you have key opinion leaders?"
          name="hasKeyOpinionLeaders"
          type="select"
          value={formData.hasKeyOpinionLeaders}
          onChange={handleInputChange}
          placeholder="Select KOL status"
          options={yesNoOptions}
          icon={Users}
          error={errors.hasKeyOpinionLeaders}
        />

        {/* Conditional KOL Details */}
        {formData.hasKeyOpinionLeaders === 'YES' && (
          <FormField
            label="If yes, who are your key opinion leaders?"
            name="keyOpinionLeaders"
            type="textarea"
            value={formData.keyOpinionLeaders}
            onChange={handleInputChange}
            placeholder="Describe your key opinion leaders..."
            required
            rows={3}
            icon={Users}
            error={errors.keyOpinionLeaders}
          />
        )}

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </motion.div>
  )
}
