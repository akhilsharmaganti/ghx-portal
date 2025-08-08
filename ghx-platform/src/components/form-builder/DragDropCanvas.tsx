'use client';

import React, { useState, useCallback } from 'react';
import { FormComponent as FormComponentType, FormSchema } from '@/types/form-builder';
import { COMPONENT_STYLES, generateComponentId, getComponentIcon } from '@/config/form-builder-config';
import { FormComponent } from './FormComponent';

// =====================================================================
// INTERFACE DEFINITIONS
// =====================================================================

interface DragDropCanvasProps {
  form: FormSchema;
  onFormChange: (form: FormSchema) => void;
  onComponentSelect?: (component: FormComponentType | null) => void;
  selectedComponentId?: string;
  className?: string;
  disabled?: boolean;
}

interface CanvasComponentProps {
  component: FormComponentType;
  index: number;
  isSelected: boolean;
  onSelect: (component: FormComponentType) => void;
  onUpdate: (component: FormComponentType) => void;
  onDelete: (componentId: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  disabled?: boolean;
}

// =====================================================================
// CANVAS COMPONENT
// =====================================================================

const CanvasComponent: React.FC<CanvasComponentProps> = ({
  component,
  index,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  disabled = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(component);

  const handleEdit = () => {
    if (disabled) return;
    setIsEditing(true);
    setEditData(component);
  };

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(component);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (disabled) return;
    if (confirm('Are you sure you want to delete this component?')) {
      onDelete(component.id);
    }
  };

  return (
    <div
      className={`
        ${COMPONENT_STYLES.component}
        ${isSelected ? COMPONENT_STYLES.componentSelected : ''}
        ${disabled ? 'opacity-75' : ''}
        transition-all duration-200
      `}
      onClick={() => onSelect(component)}
    >
      {/* Component Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getComponentIcon(component.type)}</span>
          <span className="text-sm font-medium text-gray-700">
            {component.label || 'Untitled Component'}
          </span>
          {component.required && (
            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
              Required
            </span>
          )}
        </div>
        
        {!disabled && (
          <div className="flex items-center space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp(index);
              }}
              disabled={index === 0}
              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
              title="Move Up"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown(index);
              }}
              disabled={index === 999} // Will be updated with actual max index
              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
              title="Move Down"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
              className="p-1 text-gray-400 hover:text-blue-600"
              title="Edit Component"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="p-1 text-gray-400 hover:text-red-600"
              title="Delete Component"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Component Preview or Edit */}
      {!isEditing ? (
        <div className="pointer-events-none">
          <FormComponent
            component={component}
            disabled={true}
          />
        </div>
      ) : (
        <div className="space-y-3">
          {/* Edit Form */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-700">Label</label>
              <input
                type="text"
                value={editData.label}
                onChange={(e) => setEditData({ ...editData, label: e.target.value })}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700">Placeholder</label>
              <input
                type="text"
                value={editData.placeholder || ''}
                onChange={(e) => setEditData({ ...editData, placeholder: e.target.value })}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Options Editor for checkbox, radio-buttons, dropdown */}
          {(editData.type === 'checkbox' || editData.type === 'radio-buttons' || editData.type === 'dropdown') && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700 block mb-1">
                Options
              </label>
              {(editData.options || []).map((option, idx) => (
                <div key={option.value} className="flex items-center space-x-2 mb-1">
                  <input
                    type="text"
                    value={option.label}
                    onChange={e => {
                      const newOptions = [...editData.options];
                      newOptions[idx] = { ...newOptions[idx], label: e.target.value };
                      setEditData({ ...editData, options: newOptions });
                    }}
                    className="px-2 py-1 text-sm border border-gray-300 rounded w-1/2"
                    placeholder="Label"
                  />
                  <input
                    type="text"
                    value={option.value}
                    onChange={e => {
                      const newOptions = [...editData.options];
                      newOptions[idx] = { ...newOptions[idx], value: e.target.value };
                      setEditData({ ...editData, options: newOptions });
                    }}
                    className="px-2 py-1 text-sm border border-gray-300 rounded w-1/3"
                    placeholder="Value"
                  />
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 text-xs"
                    onClick={() => {
                      const newOptions = [...editData.options];
                      newOptions.splice(idx, 1);
                      setEditData({ ...editData, options: newOptions });
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                onClick={() => {
                  const newOptions = [...(editData.options || [])];
                  newOptions.push({ label: 'Option', value: `option${newOptions.length + 1}` });
                  setEditData({ ...editData, options: newOptions });
                }}
              >
                + Add Option
              </button>
              {/* For dropdown, allow toggling multiple */}
              {editData.type === 'dropdown' && (
                <div className="mt-2 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={!!editData.multiple}
                    onChange={e => setEditData({ ...editData, multiple: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-xs text-gray-700">Allow multiple selection</span>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center space-x-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={editData.required}
                onChange={(e) => setEditData({ ...editData, required: e.target.checked })}
                className="mr-2"
              />
              <span className="text-xs text-gray-700">Required</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-xs bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// =====================================================================
// DRAG DROP CANVAS
// =====================================================================

export const DragDropCanvas: React.FC<DragDropCanvasProps> = ({
  form,
  onFormChange,
  onComponentSelect,
  selectedComponentId,
  className = '',
  disabled = false
}) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    if (disabled) return;

    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      
      if (data.type === 'component') {
        const newComponent: FormComponentType = {
          id: generateComponentId(data.componentType),
          type: data.componentType,
          label: `New ${data.componentType.replace('-', ' ')}`,
          placeholder: `Enter ${data.componentType.replace('-', ' ')}`,
          required: false,
          order: form.components.length + 1,
          ...(data.componentType === 'dropdown' && { options: [] }),
          ...(data.componentType === 'checkbox' && { options: [] }),
          ...(data.componentType === 'radio-buttons' && { options: [] })
        };

        const updatedForm = {
          ...form,
          components: [...form.components, newComponent]
        };

        onFormChange(updatedForm);
        onComponentSelect?.(newComponent);
      }
    } catch (error) {
      console.error('Error parsing drag data:', error);
    }
  }, [form, onFormChange, onComponentSelect, disabled]);

  const handleComponentSelect = useCallback((component: FormComponentType) => {
    onComponentSelect?.(component);
  }, [onComponentSelect]);

  const handleComponentUpdate = useCallback((updatedComponent: FormComponentType) => {
    const updatedComponents = form.components.map(comp =>
      comp.id === updatedComponent.id ? updatedComponent : comp
    );

    const updatedForm = {
      ...form,
      components: updatedComponents
    };

    onFormChange(updatedForm);
  }, [form, onFormChange]);

  const handleComponentDelete = useCallback((componentId: string) => {
    const updatedComponents = form.components
      .filter(comp => comp.id !== componentId)
      .map((comp, index) => ({ ...comp, order: index + 1 }));

    const updatedForm = {
      ...form,
      components: updatedComponents
    };

    onFormChange(updatedForm);
    onComponentSelect?.(null);
  }, [form, onFormChange, onComponentSelect]);

  const handleMoveComponent = useCallback((fromIndex: number, toIndex: number) => {
    const updatedComponents = [...form.components];
    const [movedComponent] = updatedComponents.splice(fromIndex, 1);
    updatedComponents.splice(toIndex, 0, movedComponent);

    // Update order
    updatedComponents.forEach((comp, index) => {
      comp.order = index + 1;
    });

    const updatedForm = {
      ...form,
      components: updatedComponents
    };

    onFormChange(updatedForm);
  }, [form, onFormChange]);

  const handleMoveUp = useCallback((index: number) => {
    if (index > 0) {
      handleMoveComponent(index, index - 1);
    }
  }, [handleMoveComponent]);

  const handleMoveDown = useCallback((index: number) => {
    if (index < form.components.length - 1) {
      handleMoveComponent(index, index + 1);
    }
  }, [handleMoveComponent, form.components.length]);

  return (
    <div
      className={`
        ${COMPONENT_STYLES.canvas}
        ${dragOver ? 'border-blue-400 bg-blue-50' : ''}
        ${className}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Form Canvas
        </h3>
        <p className="text-sm text-gray-600">
          {form.components.length === 0
            ? 'Drag components here to build your form'
            : `${form.components.length} component${form.components.length !== 1 ? 's' : ''} in form`
          }
        </p>
      </div>

      {/* Components */}
      <div className="space-y-4">
        {form.components.map((component, index) => (
          <CanvasComponent
            key={component.id}
            component={component}
            index={index}
            isSelected={selectedComponentId === component.id}
            onSelect={handleComponentSelect}
            onUpdate={handleComponentUpdate}
            onDelete={handleComponentDelete}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            disabled={disabled}
          />
        ))}
      </div>

      {/* Empty State */}
      {form.components.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Start Building Your Form
          </h3>
          <p className="text-gray-600 mb-4">
            Drag components from the palette to create your form
          </p>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
}; 