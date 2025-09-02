'use client';

import React from 'react';

// Single Responsibility: Display action buttons for forms
export interface ActionButton {
  label: string;
  onClick: () => void;
  variant: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

export interface ActionButtonsProps {
  buttons: ActionButton[];
  className?: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ buttons, className = '' }) => {
  const getButtonClasses = (variant: ActionButton['variant']) => {
    const baseClasses = 'px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`;
      case 'secondary':
        return `${baseClasses} bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`;
      case 'danger':
        return `${baseClasses} bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          disabled={button.disabled}
          className={getButtonClasses(button.variant)}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};




