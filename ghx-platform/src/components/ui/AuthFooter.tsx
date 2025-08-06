// Single Responsibility: Reusable authentication footer component
import React from 'react';

interface AuthFooterProps {
  text: string;
  linkText: string;
  linkHref: string;
}

export const AuthFooter: React.FC<AuthFooterProps> = ({ text, linkText, linkHref }) => {
  return (
    <div className="mt-6 text-center">
      <p className="text-gray-600">
        {text}{' '}
        <a href={linkHref} className="text-blue-600 hover:text-blue-500">
          {linkText}
        </a>
      </p>
    </div>
  );
}; 