'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { 
  FormSchema, 
  FormComponent as FormComponentType, 
  FormCategory,
  FormBuilderMode 
} from '@/types/form-builder';
import { 
  COMPONENT_STYLES, 
  FORM_CATEGORIES, 
  DEFAULT_FORM_TEMPLATES,
  generateComponentId 
} from '@/config/form-builder-config';
import { ComponentPalette } from './ComponentPalette';
import { DragDropCanvas } from './DragDropCanvas';
import { FormComponent } from './FormComponent';

// =====================================================================
// INTERFACE DEFINITIONS
// =====================================================================

interface FormBuilderProps {
  initialForm?: FormSchema;
  mode?: FormBuilderMode;
  onSave?: (form: FormSchema) => void;
  onSend?: (form: FormSchema) => void;
  onCancel?: () => void;
  className?: string;
  disabled?: boolean;
}

// =====================================================================
// DEFAULT FORM TEMPLATE
// =====================================================================

const createDefaultForm = (): FormSchema => ({
  id: generateComponentId('form'),
  name: 'New Form',
  description: '',
  version: 1,
  components: [],
  settings: {
    allowSaveProgress: true,
    showProgressBar: true,
    submitButtonText: 'Submit',
    theme: 'light',
    layout: 'single-column'
  },
  metadata: {
    createdBy: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [],
    category: 'general',
    isTemplate: false
  }
});

// =====================================================================
// FORM BUILDER MAIN COMPONENT
// =====================================================================

export const FormBuilder: React.FC<FormBuilderProps> = ({
  initialForm,
  mode = 'create',
  onSave,
  onSend,
  onCancel,
  className = '',
  disabled = false
}) => {
  // =====================================================================
  // STATE MANAGEMENT
  // =====================================================================

  const [form, setForm] = useState<FormSchema>(initialForm || createDefaultForm());
  const [selectedComponent, setSelectedComponent] = useState<FormComponentType | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [formResponses, setFormResponses] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showPaletteMobile, setShowPaletteMobile] = useState(false);

  // =====================================================================
  // EVENT HANDLERS
  // =====================================================================

  const handleFormChange = useCallback((updatedForm: FormSchema) => {
    setForm(updatedForm);
  }, []);

  const handleComponentSelect = useCallback((component: FormComponentType | null) => {
    setSelectedComponent(component);
  }, []);

  const handleComponentAdd = useCallback((componentType: string) => {
    const newComponent: FormComponentType = {
      id: generateComponentId(componentType),
      type: componentType as any,
      label: `New ${componentType.replace('-', ' ')}`,
      placeholder: `Enter ${componentType.replace('-', ' ')}`,
      required: false,
      order: form.components.length + 1,
      ...(componentType === 'dropdown' && { options: [] }),
      ...(componentType === 'checkbox' && { options: [] }),
      ...(componentType === 'radio-buttons' && { options: [] })
    };

    const updatedForm = {
      ...form,
      components: [...form.components, newComponent]
    };

    setForm(updatedForm);
    setSelectedComponent(newComponent);
  }, [form]);

  const handleSave = useCallback(() => {
    if (onSave) {
      const updatedForm = {
        ...form,
        metadata: {
          ...form.metadata,
          updatedAt: new Date()
        }
      };
      onSave(updatedForm);
    }
  }, [form, onSave]);

  const handleSend = useCallback(() => {
    if (onSend) {
      onSend(form);
    }
  }, [form, onSend]);

  const handlePreviewToggle = useCallback(() => {
    setIsPreviewMode(!isPreviewMode);
  }, [isPreviewMode]);

  const handleTemplateSelect = useCallback((template: any) => {
    const newForm: FormSchema = {
      ...form,
      name: template.name,
      description: template.description,
      components: template.components.map((comp: any, index: number) => ({
        ...comp,
        id: generateComponentId(comp.type),
        order: index + 1
      }))
    };
    setForm(newForm);
    setShowTemplates(false);
  }, [form]);

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors: Record<string, string> = {};
    form.components.forEach(component => {
      if (component.required && !formResponses[component.id]) {
        errors[component.id] = `${component.label} is required`;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Form is valid, handle submission
    console.log('Form submitted:', formResponses);
    alert('Form submitted successfully!');
  }, [form, formResponses]);

  const handleResponseChange = useCallback((componentId: string, value: any) => {
    setFormResponses(prev => ({
      ...prev,
      [componentId]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[componentId]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[componentId];
        return newErrors;
      });
    }
  }, [formErrors]);

  // =====================================================================
  // AUTO-SAVE EFFECT
  // =====================================================================

  useEffect(() => {
    if (mode === 'create' || mode === 'edit') {
      const interval = setInterval(() => {
        // Auto-save logic here
        console.log('Auto-saving form...');
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }
  }, [mode]);

  // =====================================================================
  // RENDER METHODS
  // =====================================================================

  const renderToolbar = () => (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-0 z-30">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <h1 className="text-xl font-semibold text-gray-900">
            {mode === 'create' ? 'Create New Form' : 
             mode === 'edit' ? 'Edit Form' : 
             mode === 'template' ? 'Form Template' : 'Form Preview'}
          </h1>
          {mode !== 'preview' && (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Form Name"
                className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
              />
              <select
                value={form.metadata.category}
                onChange={(e) => setForm({
                  ...form,
                  metadata: { ...form.metadata, category: e.target.value as FormCategory }
                })}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
              >
                {FORM_CATEGORIES.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 justify-end">
          {mode !== 'preview' && (
            <>
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className={`${COMPONENT_STYLES.button} ${COMPONENT_STYLES.buttonSecondary}`}
              >
                📋 Templates
              </button>
              <button
                onClick={handlePreviewToggle}
                className={`${COMPONENT_STYLES.button} ${COMPONENT_STYLES.buttonSecondary}`}
              >
                👁️ {isPreviewMode ? 'Edit' : 'Preview'}
              </button>
            </>
          )}
          {onSave && (
            <button
              onClick={handleSave}
              className={`${COMPONENT_STYLES.button} ${COMPONENT_STYLES.buttonPrimary}`}
              disabled={disabled}
            >
              💾 Save
            </button>
          )}
          {onSend && (
            <button
              onClick={handleSend}
              className={`${COMPONENT_STYLES.button} ${COMPONENT_STYLES.buttonPrimary}`}
              disabled={disabled}
            >
              📤 Send
            </button>
          )}
          {onCancel && (
            <button
              onClick={onCancel}
              className={`${COMPONENT_STYLES.button} ${COMPONENT_STYLES.buttonSecondary}`}
            >
              ❌ Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Choose a Template</h2>
          <button
            onClick={() => setShowTemplates(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEFAULT_FORM_TEMPLATES.map((template) => (
            <div
              key={template.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-colors"
              onClick={() => handleTemplateSelect(template)}
            >
              <h3 className="font-medium text-gray-900 mb-2">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {template.components.length} components
                </span>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  {template.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreview = () => (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{form.name}</h2>
        {form.description && (
          <p className="text-gray-600 mb-6">{form.description}</p>
        )}
        
        <form onSubmit={handleFormSubmit} className="space-y-6">
          {form.components.map((component) => (
            <FormComponent
              key={component.id}
              component={component}
              value={formResponses[component.id]}
              onChange={(value) => handleResponseChange(component.id, value)}
              error={formErrors[component.id]}
            />
          ))}
          
          <div className="pt-4 border-t border-gray-200">
            <button
              type="submit"
              className={`${COMPONENT_STYLES.button} ${COMPONENT_STYLES.buttonPrimary} w-full`}
            >
              {form.settings.submitButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderBuilder = () => (
    <div className="flex flex-col sm:flex-row h-[calc(100vh-80px)]">
      {/* Mobile Palette Toggle */}
      <div className="sm:hidden flex justify-between items-center px-4 py-2 bg-white border-b border-gray-200 sticky top-0 z-20">
        <span className="font-semibold text-gray-900">Form Components</span>
        <button
          onClick={() => setShowPaletteMobile((v) => !v)}
          className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {showPaletteMobile ? 'Hide Palette' : 'Show Palette'}
        </button>
      </div>
      {/* Palette */}
      <div
        className={`
          ${showPaletteMobile ? 'block' : 'hidden'}
          sm:block
          w-full sm:w-80 max-w-full sm:max-w-xs
          bg-white border-r border-gray-200
          sm:h-auto h-[320px] sm:min-h-[calc(100vh-80px)]
          flex-shrink-0
          overflow-x-auto sm:overflow-x-visible
          shadow-sm z-10
        `}
        style={{ minWidth: 0 }}
      >
        <ComponentPalette
          onComponentClick={handleComponentAdd}
          disabled={disabled}
        />
      </div>
      {/* Canvas */}
      <div className="flex-1 p-2 sm:p-6 overflow-auto bg-gray-50">
        {/* Show a message if there are no components */}
        {form.components.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="text-6xl mb-4">🧩</div>
            <p className="text-lg font-medium">No components added yet</p>
            <p className="text-sm mt-2">Use the palette to add form fields</p>
          </div>
        ) : (
          <DragDropCanvas
            form={form}
            onFormChange={handleFormChange}
            onComponentSelect={handleComponentSelect}
            selectedComponentId={selectedComponent?.id}
            disabled={disabled}
          />
        )}
      </div>
    </div>
  );

  // =====================================================================
  // MAIN RENDER
  // =====================================================================

  return (
    <div className={`h-screen bg-gray-50 ${className}`}>
      {/* Toolbar */}
      {renderToolbar()}
      
      {/* Main Content */}
      {isPreviewMode ? renderPreview() : renderBuilder()}
      
      {/* Templates Modal */}
      {showTemplates && renderTemplates()}
    </div>
  );
}; 