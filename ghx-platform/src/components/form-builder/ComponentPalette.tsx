'use client';

import React from 'react';
import { ComponentPaletteItem, FormComponentType } from '@/types/form-builder';
import { COMPONENT_PALETTE, COMPONENT_STYLES } from '@/config/form-builder-config';

// =====================================================================
// INTERFACE DEFINITIONS
// =====================================================================

interface ComponentPaletteProps {
  onDragStart?: (componentType: FormComponentType) => void;
  onComponentClick?: (componentType: FormComponentType) => void;
  className?: string;
  disabled?: boolean;
}

interface ComponentPaletteItemProps {
  item: ComponentPaletteItem;
  onDragStart?: (componentType: FormComponentType) => void;
  onClick?: (componentType: FormComponentType) => void;
  disabled?: boolean;
}

// =====================================================================
// COMPONENT PALETTE ITEM
// =====================================================================

const ComponentPaletteItemComponent: React.FC<ComponentPaletteItemProps> = ({
  item,
  onDragStart,
  onClick,
  disabled = false
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    if (disabled) return;
    
    e.dataTransfer.setData('application/json', JSON.stringify({
      type: 'component',
      componentType: item.type
    }));
    
    onDragStart?.(item.type);
  };

  const handleClick = () => {
    if (disabled) return;
    onClick?.(item.type);
  };

  return (
    <div
      draggable={!disabled}
      onDragStart={handleDragStart}
      onClick={handleClick}
      className={`
        ${COMPONENT_STYLES.component}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-grab hover:shadow-md active:cursor-grabbing'}
        transition-all duration-200
      `}
    >
      <div className="flex items-center space-x-3">
        <div className="text-2xl">{item.icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {item.label}
          </h3>
          <p className="text-xs text-gray-500 truncate">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

// =====================================================================
// COMPONENT PALETTE
// =====================================================================

export const ComponentPalette: React.FC<ComponentPaletteProps> = ({
  onDragStart,
  onComponentClick,
  className = '',
  disabled = false
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<'all' | 'basic' | 'advanced' | 'media'>('all');

  const categories = [
    { id: 'all', label: 'All Components', count: COMPONENT_PALETTE.length },
    { id: 'basic', label: 'Basic', count: COMPONENT_PALETTE.filter(c => c.category === 'basic').length },
    { id: 'advanced', label: 'Advanced', count: COMPONENT_PALETTE.filter(c => c.category === 'advanced').length },
    { id: 'media', label: 'Media', count: COMPONENT_PALETTE.filter(c => c.category === 'media').length }
  ];

  const filteredComponents = selectedCategory === 'all' 
    ? COMPONENT_PALETTE 
    : COMPONENT_PALETTE.filter(c => c.category === selectedCategory);

  return (
    <div
      className={`
        ${COMPONENT_STYLES.palette} ${className}
        w-full sm:w-80 max-w-full sm:max-w-xs
        bg-white border-r border-gray-200
        sm:h-auto h-[320px] sm:min-h-[calc(100vh-80px)]
        flex-shrink-0
        overflow-x-auto sm:overflow-x-visible
        shadow-sm z-10
      `}
      style={{ minWidth: 0 }}
    >
      {/* Header */}
      <div className="mb-4 px-2 pt-2">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Form Components
        </h2>
        <p className="text-sm text-gray-600">
          Drag components to the canvas to build your form
        </p>
      </div>

      {/* Category Tabs */}
      <div className="mb-4 px-2">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`
                flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors
                whitespace-nowrap
                ${selectedCategory === category.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'}
              `}
            >
              {category.label}
              <span className="ml-1 text-gray-400">({category.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Components List */}
      <div className="space-y-2 max-h-[calc(100vh-260px)] sm:max-h-[calc(100vh-200px)] overflow-y-auto px-2 pb-2">
        {filteredComponents.map((item) => (
          <ComponentPaletteItemComponent
            key={item.type}
            item={item}
            onDragStart={onDragStart}
            onClick={onComponentClick}
            disabled={disabled}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredComponents.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📝</div>
          <p className="text-sm text-gray-500">
            No components in this category
          </p>
        </div>
      )}

      {/* Help Text */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg mx-2">
        <p className="text-xs text-blue-700">
          💡 <strong>Tip:</strong> Drag components to the canvas or click to add them quickly.
        </p>
      </div>
    </div>
  );
};

// =====================================================================
// COMPONENT SEARCH (Optional Enhancement)
// =====================================================================

interface ComponentSearchProps {
  onSearch: (query: string) => void;
  className?: string;
}

export const ComponentSearch: React.FC<ComponentSearchProps> = ({
  onSearch,
  className = ''
}) => {
  const [query, setQuery] = React.useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search components..."
          value={query}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
}; 