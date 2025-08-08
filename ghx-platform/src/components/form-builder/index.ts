// Form Builder Components - Main Exports
// Following SOLID principles and Tailwind CSS reusability

export { FormBuilder } from './FormBuilder';
export { ComponentPalette } from './ComponentPalette';
export { DragDropCanvas } from './DragDropCanvas';
export { FormComponent } from './FormComponent';

// Re-export types for convenience
export type {
  FormSchema,
  FormComponent as FormComponentType,
  FormCategory,
  FormBuilderMode,
  FormInstance,
  FormTemplate,
  ComponentPaletteItem,
  FormBuilderConfig
} from '@/types/form-builder';

// Re-export configuration
export {
  COMPONENT_PALETTE,
  FORM_CATEGORIES,
  FORM_BUILDER_CONFIG,
  DEFAULT_FORM_TEMPLATES,
  COMPONENT_STYLES,
  VALIDATION_PATTERNS,
  generateComponentId,
  getComponentIcon,
  getComponentLabel
} from '@/config/form-builder-config'; 