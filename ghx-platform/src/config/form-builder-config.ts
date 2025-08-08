import { ComponentPaletteItem, FormBuilderConfig, FormCategory } from '@/types/form-builder';

// =====================================================================
// COMPONENT PALETTE CONFIGURATION
// =====================================================================

export const COMPONENT_PALETTE: ComponentPaletteItem[] = [
  // Basic Components
  {
    type: 'text-field',
    label: 'Text Field',
    description: 'Single line text input',
    icon: '📝',
    category: 'basic'
  },
  {
    type: 'text-area',
    label: 'Text Area',
    description: 'Multi-line text input',
    icon: '📄',
    category: 'basic'
  },
  {
    type: 'email',
    label: 'Email',
    description: 'Email address input',
    icon: '📧',
    category: 'basic'
  },
  {
    type: 'phone-number',
    label: 'Phone Number',
    description: 'Phone number with country code',
    icon: '📞',
    category: 'basic'
  },
  {
    type: 'number',
    label: 'Number',
    description: 'Numeric input field',
    icon: '🔢',
    category: 'basic'
  },
  {
    type: 'password',
    label: 'Password',
    description: 'Secure password input',
    icon: '🔒',
    category: 'basic'
  },
  {
    type: 'url',
    label: 'URL',
    description: 'Website URL input',
    icon: '🔗',
    category: 'basic'
  },
  
  // Advanced Components
  {
    type: 'date-picker',
    label: 'Date Picker',
    description: 'Date selection field',
    icon: '📅',
    category: 'advanced'
  },
  {
    type: 'dropdown',
    label: 'Dropdown',
    description: 'Single or multiple choice dropdown',
    icon: '📋',
    category: 'advanced'
  },
  {
    type: 'checkbox',
    label: 'Checkboxes',
    description: 'Multiple choice checkboxes',
    icon: '☑️',
    category: 'advanced'
  },
  {
    type: 'radio-buttons',
    label: 'Radio Buttons',
    description: 'Single choice radio buttons',
    icon: '🔘',
    category: 'advanced'
  },
  
  // Media Components
  {
    type: 'file-upload',
    label: 'File Upload',
    description: 'File upload field',
    icon: '📁',
    category: 'media'
  }
];

// =====================================================================
// FORM CATEGORIES
// =====================================================================

export const FORM_CATEGORIES: { value: FormCategory; label: string; description: string }[] = [
  {
    value: 'startup-application',
    label: 'Startup Application',
    description: 'Forms for startup registration and applications'
  },
  {
    value: 'investor-profile',
    label: 'Investor Profile',
    description: 'Forms for investor profile creation'
  },
  {
    value: 'mentor-application',
    label: 'Mentor Application',
    description: 'Forms for mentor applications'
  },
  {
    value: 'organization-creation',
    label: 'Organization Creation',
    description: 'Forms for organization registration'
  },
  {
    value: 'program-enrollment',
    label: 'Program Enrollment',
    description: 'Forms for program applications'
  },
  {
    value: 'general',
    label: 'General',
    description: 'General purpose forms'
  },
  {
    value: 'custom',
    label: 'Custom',
    description: 'Custom forms for specific needs'
  }
];

// =====================================================================
// FORM BUILDER CONFIGURATION
// =====================================================================

export const FORM_BUILDER_CONFIG: FormBuilderConfig = {
  availableComponents: COMPONENT_PALETTE,
  maxComponents: 50,
  allowTemplates: true,
  allowCustomValidation: true,
  autoSave: true,
  autoSaveInterval: 30 // 30 seconds
};

// =====================================================================
// DEFAULT FORM TEMPLATES
// =====================================================================

export const DEFAULT_FORM_TEMPLATES = [
  {
    id: 'startup-basic',
    name: 'Basic Startup Application',
    category: 'startup-application' as FormCategory,
    description: 'Standard startup application form with essential fields',
    components: [
      {
        id: 'company-name',
        type: 'text-field',
        label: 'Company Name',
        placeholder: 'Enter your company name',
        required: true,
        order: 1
      },
      {
        id: 'founder-name',
        type: 'text-field',
        label: 'Founder Name',
        placeholder: 'Enter founder name',
        required: true,
        order: 2
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'Enter your email',
        required: true,
        order: 3
      },
      {
        id: 'phone',
        type: 'phone-number',
        label: 'Phone Number',
        placeholder: 'Enter phone number',
        required: true,
        order: 4
      },
      {
        id: 'description',
        type: 'text-area',
        label: 'Company Description',
        placeholder: 'Describe your company and product',
        required: true,
        order: 5,
        rows: 4
      },
      {
        id: 'website',
        type: 'url',
        label: 'Website',
        placeholder: 'https://yourcompany.com',
        required: false,
        order: 6
      },
      {
        id: 'stage',
        type: 'dropdown',
        label: 'Development Stage',
        placeholder: 'Select development stage',
        required: true,
        order: 7,
        options: [
          { value: 'idea', label: 'Idea Stage' },
          { value: 'mvp', label: 'MVP Development' },
          { value: 'beta', label: 'Beta Testing' },
          { value: 'launched', label: 'Launched' },
          { value: 'scaling', label: 'Scaling' }
        ]
      }
    ]
  },
  {
    id: 'investor-profile',
    name: 'Investor Profile',
    category: 'investor-profile' as FormCategory,
    description: 'Comprehensive investor profile form',
    components: [
      {
        id: 'full-name',
        type: 'text-field',
        label: 'Full Name',
        placeholder: 'Enter your full name',
        required: true,
        order: 1
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'Enter your email',
        required: true,
        order: 2
      },
      {
        id: 'phone',
        type: 'phone-number',
        label: 'Phone Number',
        placeholder: 'Enter phone number',
        required: true,
        order: 3
      },
      {
        id: 'investment-focus',
        type: 'dropdown',
        label: 'Investment Focus',
        placeholder: 'Select investment focus areas',
        required: true,
        order: 4,
        multiple: true,
        options: [
          { value: 'healthcare', label: 'Healthcare' },
          { value: 'fintech', label: 'FinTech' },
          { value: 'ai-ml', label: 'AI/ML' },
          { value: 'biotech', label: 'Biotech' },
          { value: 'clean-energy', label: 'Clean Energy' },
          { value: 'edtech', label: 'EdTech' }
        ]
      },
      {
        id: 'investment-stage',
        type: 'radio-buttons',
        label: 'Preferred Investment Stage',
        required: true,
        order: 5,
        options: [
          { value: 'seed', label: 'Seed' },
          { value: 'series-a', label: 'Series A' },
          { value: 'series-b', label: 'Series B' },
          { value: 'series-c', label: 'Series C+' }
        ]
      },
      {
        id: 'investment-range',
        type: 'dropdown',
        label: 'Investment Range',
        placeholder: 'Select investment range',
        required: true,
        order: 6,
        options: [
          { value: '50k-100k', label: '$50K - $100K' },
          { value: '100k-500k', label: '$100K - $500K' },
          { value: '500k-1m', label: '$500K - $1M' },
          { value: '1m-5m', label: '$1M - $5M' },
          { value: '5m+', label: '$5M+' }
        ]
      },
      {
        id: 'experience',
        type: 'text-area',
        label: 'Investment Experience',
        placeholder: 'Describe your investment experience and track record',
        required: true,
        order: 7,
        rows: 4
      }
    ]
  }
];

// =====================================================================
// VALIDATION PATTERNS
// =====================================================================

export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-\(\)]+$/,
  url: /^https?:\/\/.+/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
};

// =====================================================================
// TAILWIND CSS CLASSES FOR COMPONENTS
// =====================================================================

export const COMPONENT_STYLES = {
  // Layout classes
  container: 'w-full max-w-4xl mx-auto p-6',
  canvas: 'min-h-[600px] bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4',
  palette: 'w-64 bg-white border-r border-gray-200 p-4',
  
  // Component classes
  component: 'bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow',
  componentSelected: 'bg-blue-50 border-blue-300 shadow-md',
  componentDragging: 'opacity-50',
  
  // Form field classes
  field: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
  fieldError: 'border-red-300 focus:ring-red-500',
  label: 'block text-sm font-medium text-gray-700 mb-1',
  error: 'text-red-600 text-sm mt-1',
  
  // Button classes
  button: 'px-4 py-2 rounded-md font-medium transition-colors',
  buttonPrimary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500',
  buttonSecondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500',
  buttonDanger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500',
  
  // Panel classes
  panel: 'bg-white border border-gray-200 rounded-lg shadow-sm',
  panelHeader: 'px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg',
  panelBody: 'p-4',
  panelFooter: 'px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg'
};

// =====================================================================
// UTILITY FUNCTIONS
// =====================================================================

export const generateComponentId = (type: string): string => {
  return `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const getComponentIcon = (type: string): string => {
  const component = COMPONENT_PALETTE.find(c => c.type === type);
  return component?.icon || '📝';
};

export const getComponentLabel = (type: string): string => {
  const component = COMPONENT_PALETTE.find(c => c.type === type);
  return component?.label || 'Unknown Component';
}; 