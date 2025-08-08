// Form Builder Types - Following SOLID Principles
// Single Responsibility: Each type has one clear purpose
// Open/Closed: Easy to extend with new component types
// Interface Segregation: Clean, focused interfaces

// =====================================================================
// FORM COMPONENT TYPES
// =====================================================================

export type FormComponentType = 
  | 'text-field'
  | 'text-area'
  | 'phone-number'
  | 'email'
  | 'date-picker'
  | 'dropdown'
  | 'checkbox'
  | 'radio-buttons'
  | 'file-upload'
  | 'number'
  | 'url'
  | 'password';

export interface FormComponentBase {
  id: string;
  type: FormComponentType;
  label: string;
  placeholder?: string;
  required: boolean;
  order: number;
  validation?: ValidationRules;
  styling?: ComponentStyling;
}

export interface TextFieldComponent extends FormComponentBase {
  type: 'text-field';
  maxLength?: number;
  minLength?: number;
}

export interface TextAreaComponent extends FormComponentBase {
  type: 'text-area';
  rows?: number;
  maxLength?: number;
  minLength?: number;
}

export interface PhoneNumberComponent extends FormComponentBase {
  type: 'phone-number';
  countryCode?: string;
}

export interface EmailComponent extends FormComponentBase {
  type: 'email';
}

export interface DatePickerComponent extends FormComponentBase {
  type: 'date-picker';
  minDate?: string;
  maxDate?: string;
}

export interface DropdownComponent extends FormComponentBase {
  type: 'dropdown';
  options: DropdownOption[];
  multiple?: boolean;
}

export interface CheckboxComponent extends FormComponentBase {
  type: 'checkbox';
  options: CheckboxOption[];
}

export interface RadioButtonsComponent extends FormComponentBase {
  type: 'radio-buttons';
  options: RadioOption[];
}

export interface FileUploadComponent extends FormComponentBase {
  type: 'file-upload';
  acceptedTypes?: string[];
  maxSize?: number; // in MB
  multiple?: boolean;
}

export interface NumberComponent extends FormComponentBase {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
}

export interface UrlComponent extends FormComponentBase {
  type: 'url';
}

export interface PasswordComponent extends FormComponentBase {
  type: 'password';
  minLength?: number;
  maxLength?: number;
}

// Union type for all form components
export type FormComponent = 
  | TextFieldComponent
  | TextAreaComponent
  | PhoneNumberComponent
  | EmailComponent
  | DatePickerComponent
  | DropdownComponent
  | CheckboxComponent
  | RadioButtonsComponent
  | FileUploadComponent
  | NumberComponent
  | UrlComponent
  | PasswordComponent;

// =====================================================================
// SUPPORTING TYPES
// =====================================================================

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  custom?: string; // Custom validation function name
}

export interface ComponentStyling {
  width?: 'full' | 'half' | 'third' | 'quarter';
  className?: string;
  customStyles?: Record<string, string>;
}

// =====================================================================
// FORM SCHEMA TYPES
// =====================================================================

export interface FormSchema {
  id: string;
  name: string;
  description?: string;
  version: number;
  components: FormComponent[];
  settings: FormSettings;
  metadata: FormMetadata;
}

export interface FormSettings {
  allowSaveProgress: boolean;
  showProgressBar: boolean;
  submitButtonText: string;
  theme: 'light' | 'dark' | 'auto';
  layout: 'single-column' | 'two-column' | 'responsive';
}

export interface FormMetadata {
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  category: string;
  isTemplate: boolean;
}

// =====================================================================
// FORM TEMPLATE TYPES
// =====================================================================

export interface FormTemplate {
  id: string;
  name: string;
  description: string;
  category: FormCategory;
  schema: FormSchema;
  previewImage?: string;
  usageCount: number;
  isPublic: boolean;
}

export type FormCategory = 
  | 'startup-application'
  | 'investor-profile'
  | 'mentor-application'
  | 'organization-creation'
  | 'program-enrollment'
  | 'general'
  | 'custom';

// =====================================================================
// FORM INSTANCE TYPES
// =====================================================================

export interface FormInstance {
  id: string;
  formId: string;
  userId: string;
  sentByAdminId: string;
  status: FormInstanceStatus;
  responses: FormResponses;
  sentAt: Date;
  completedAt?: Date;
  expiresAt?: Date;
}

export type FormInstanceStatus = 
  | 'sent'
  | 'in-progress'
  | 'completed'
  | 'expired'
  | 'cancelled';

export interface FormResponses {
  [componentId: string]: FormResponseValue;
}

export type FormResponseValue = 
  | string
  | number
  | boolean
  | string[]
  | File[]
  | File
  | null;

// =====================================================================
// FORM BUILDER STATE TYPES
// =====================================================================

export interface FormBuilderState {
  currentForm: FormSchema | null;
  selectedComponent: FormComponent | null;
  isPreviewMode: boolean;
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  history: FormBuilderHistory;
}

export interface FormBuilderHistory {
  past: FormSchema[];
  future: FormSchema[];
}

// =====================================================================
// DRAG AND DROP TYPES
// =====================================================================

export interface DragItem {
  type: 'component' | 'existing-component';
  component?: FormComponent;
  componentType?: FormComponentType;
  sourceIndex?: number;
}

export interface DropResult {
  destination?: {
    index: number;
    droppableId: string;
  };
  source: {
    index: number;
    droppableId: string;
  };
  type: string;
  reason: 'DROP' | 'CANCEL';
}

// =====================================================================
// API TYPES
// =====================================================================

export interface CreateFormRequest {
  name: string;
  description?: string;
  category: FormCategory;
  isTemplate: boolean;
}

export interface UpdateFormRequest {
  schema: FormSchema;
}

export interface SendFormRequest {
  formId: string;
  userId: string;
  expiresAt?: Date;
}

export interface FormResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// =====================================================================
// UTILITY TYPES
// =====================================================================

export type ComponentPaletteItem = {
  type: FormComponentType;
  label: string;
  description: string;
  icon: string;
  category: 'basic' | 'advanced' | 'media';
};

export type FormBuilderMode = 'create' | 'edit' | 'template' | 'preview';

export interface FormBuilderConfig {
  availableComponents: ComponentPaletteItem[];
  maxComponents: number;
  allowTemplates: boolean;
  allowCustomValidation: boolean;
  autoSave: boolean;
  autoSaveInterval: number; // in seconds
} 