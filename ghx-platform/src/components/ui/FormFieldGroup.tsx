// Single Responsibility: Reusable form field group component
import React from 'react';

interface FormFieldGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const FormFieldGroup: React.FC<FormFieldGroupProps> = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      {children}
    </div>
  );
}; 