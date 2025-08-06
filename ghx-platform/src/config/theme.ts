// Single Responsibility: Theme configuration management
// Open/Closed: Easy to extend without modifying existing code
// Interface Segregation: Separate concerns for different styling aspects

export const theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      900: '#111827',
    },
    success: {
      500: '#10b981',
      600: '#059669',
    },
    error: {
      500: '#ef4444',
      600: '#dc2626',
    },
  },
  fonts: {
    primary: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
} as const;

// Utility functions for easy theme access
export const getColor = (colorPath: string) => {
  const path = colorPath.split('.');
  let value: any = theme.colors;
  
  for (const key of path) {
    value = value[key];
  }
  
  return value;
};

export const getSpacing = (size: keyof typeof theme.spacing) => {
  return theme.spacing[size];
};

export const getBorderRadius = (size: keyof typeof theme.borderRadius) => {
  return theme.borderRadius[size];
}; 