'use client';

import React from 'react';
import { FormComponent as FormComponentType, FormResponseValue } from '@/types/form-builder';
import { COMPONENT_STYLES } from '@/config/form-builder-config';

// =====================================================================
// INTERFACE DEFINITIONS
// =====================================================================

interface FormComponentProps {
  component: FormComponentType;
  value?: FormResponseValue;
  onChange?: (value: FormResponseValue) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

// =====================================================================
// FORM COMPONENT RENDERER
// =====================================================================

export const FormComponent: React.FC<FormComponentProps> = ({
  component,
  value,
  onChange,
  error,
  disabled = false,
  className = ''
}) => {
  const handleChange = (newValue: FormResponseValue) => {
    if (onChange && !disabled) {
      onChange(newValue);
    }
  };

  const baseFieldClasses = `${COMPONENT_STYLES.field} ${error ? COMPONENT_STYLES.fieldError : ''} ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`;
  const baseLabelClasses = COMPONENT_STYLES.label;

  // Render different component types
  switch (component.type) {
    case 'text-field':
      return (
        <div className={`space-y-1 ${className}`}>
          <label htmlFor={component.id} className={baseLabelClasses}>
            {component.label}
            {component.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            id={component.id}
            type="text"
            value={value as string || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={component.placeholder}
            maxLength={component.maxLength}
            minLength={component.minLength}
            required={component.required}
            disabled={disabled}
            className={baseFieldClasses}
          />
          {error && <p className={COMPONENT_STYLES.error}>{error}</p>}
        </div>
      );

    case 'text-area':
      return (
        <div className={`space-y-1 ${className}`}>
          <label htmlFor={component.id} className={baseLabelClasses}>
            {component.label}
            {component.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <textarea
            id={component.id}
            value={value as string || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={component.placeholder}
            rows={component.rows || 3}
            maxLength={component.maxLength}
            minLength={component.minLength}
            required={component.required}
            disabled={disabled}
            className={`${baseFieldClasses} resize-vertical`}
          />
          {error && <p className={COMPONENT_STYLES.error}>{error}</p>}
        </div>
      );

    case 'email':
      return (
        <div className={`space-y-1 ${className}`}>
          <label htmlFor={component.id} className={baseLabelClasses}>
            {component.label}
            {component.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            id={component.id}
            type="email"
            value={value as string || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={component.placeholder}
            required={component.required}
            disabled={disabled}
            className={baseFieldClasses}
          />
          {error && <p className={COMPONENT_STYLES.error}>{error}</p>}
        </div>
      );

    case 'phone-number':
      return (
        <div className={`space-y-1 ${className}`}>
          <label htmlFor={component.id} className={baseLabelClasses}>
            {component.label}
            {component.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <div className="flex">
            <select
              disabled={disabled}
              className={`${baseFieldClasses} w-20 mr-2`}
              defaultValue={component.countryCode || '+1'}
            >
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+91">+91</option>
              <option value="+86">+86</option>
              <option value="+81">+81</option>
            </select>
            <input
              id={component.id}
              type="tel"
              value={value as string || ''}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={component.placeholder}
              required={component.required}
              disabled={disabled}
              className={`${baseFieldClasses} flex-1`}
            />
          </div>
          {error && <p className={COMPONENT_STYLES.error}>{error}</p>}
        </div>
      );

    case 'number':
      return (
        <div className={`space-y-1 ${className}`}>
          <label htmlFor={component.id} className={baseLabelClasses}>
            {component.label}
            {component.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            id={component.id}
            type="number"
            value={value as number || ''}
            onChange={(e) => handleChange(Number(e.target.value))}
            placeholder={component.placeholder}
            min={component.min}
            max={component.max}
            step={component.step}
            required={component.required}
            disabled={disabled}
            className={baseFieldClasses}
          />
          {error && <p className={COMPONENT_STYLES.error}>{error}</p>}
        </div>
      );

    case 'password':
      return (
        <div className={`space-y-1 ${className}`}>
          <label htmlFor={component.id} className={baseLabelClasses}>
            {component.label}
            {component.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            id={component.id}
            type="password"
            value={value as string || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={component.placeholder}
            minLength={component.minLength}
            maxLength={component.maxLength}
            required={component.required}
            disabled={disabled}
            className={baseFieldClasses}
          />
          {error && <p className={COMPONENT_STYLES.error}>{error}</p>}
        </div>
      );

    case 'url':
      return (
        <div className={`space-y-1 ${className}`}>
          <label htmlFor={component.id} className={baseLabelClasses}>
            {component.label}
            {component.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            id={component.id}
            type="url"
            value={value as string || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={component.placeholder}
            required={component.required}
            disabled={disabled}
            className={baseFieldClasses}
          />
          {error && <p className={COMPONENT_STYLES.error}>{error}</p>}
        </div>
      );

    case 'date-picker':
      return (
        <div className={`space-y-1 ${className}`}>
          <label htmlFor={component.id} className={baseLabelClasses}>
            {component.label}
            {component.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            id={component.id}
            type="date"
            value={value as string || ''}
            onChange={(e) => handleChange(e.target.value)}
            min={component.minDate}
            max={component.maxDate}
            required={component.required}
            disabled={disabled}
            className={baseFieldClasses}
          />
          {error && <p className={COMPONENT_STYLES.error}>{error}</p>}
        </div>
      );

    case 'dropdown':
      return (
        <div className={`space-y-1 ${className}`}>
          <label htmlFor={component.id} className={baseLabelClasses}>
            {component.label}
            {component.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <select
            id={component.id}
            value={component.multiple ? (Array.isArray(value) ? value : []) : (value as string || '')}
            onChange={(e) => {
              if (component.multiple) {
                // For multiple select, collect all selected options
                const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
                handleChange(selected);
              } else {
                handleChange(e.target.value);
              }
            }}
            required={component.required}
            disabled={disabled}
            multiple={component.multiple}
            className={baseFieldClasses + (component.multiple ? ' h-32' : '')}
          >
            {!component.multiple && (
              <option value="">{component.placeholder || 'Select an option'}</option>
            )}
            {component.options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          {error && <p className={COMPONENT_STYLES.error}>{error}</p>}
        </div>
      );

    case 'checkbox':
      return (
        <div className={`space-y-2 ${className}`}>
          <label className={baseLabelClasses}>
            {component.label}
            {component.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <div className="space-y-2">
            {component.options.map((option) => {
              const checked = Array.isArray(value) && (value as string[]).includes(option.value);
              return (
                <label key={option.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={checked}
                    onChange={(e) => {
                      const currentValues = Array.isArray(value) ? (value as string[]) : [];
                      let newValues;
                      if (e.target.checked) {
                        newValues = [...currentValues, option.value];
                      } else {
                        newValues = currentValues.filter(v => v !== option.value);
                      }
                      handleChange(newValues);
                    }}
                    disabled={disabled || option.disabled}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              );
            })}
          </div>
          {error && <p className={COMPONENT_STYLES.error}>{error}</p>}
        </div>
      );

    case 'radio-buttons':
      return (
        <div className={`space-y-2 ${className}`}>
          <label className={baseLabelClasses}>
            {component.label}
            {component.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <div className="space-y-2">
            {component.options.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={component.id}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => handleChange(e.target.value)}
                  disabled={disabled || option.disabled}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {error && <p className={COMPONENT_STYLES.error}>{error}</p>}
        </div>
      );

    case 'file-upload':
      return (
        <div className={`space-y-1 ${className}`}>
          <label htmlFor={component.id} className={baseLabelClasses}>
            {component.label}
            {component.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            id={component.id}
            type="file"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              handleChange(component.multiple ? files : files[0] || null);
            }}
            accept={component.acceptedTypes?.join(',')}
            multiple={component.multiple}
            required={component.required}
            disabled={disabled}
            className={`${baseFieldClasses} file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
          />
          {component.maxSize && (
            <p className="text-xs text-gray-500">
              Maximum file size: {component.maxSize}MB
            </p>
          )}
          {error && <p className={COMPONENT_STYLES.error}>{error}</p>}
        </div>
      );

    default:
      return (
        <div className={`space-y-1 ${className}`}>
          <p className="text-red-500">Unsupported component type: {(component as any).type}</p>
        </div>
      );
  }
}; 