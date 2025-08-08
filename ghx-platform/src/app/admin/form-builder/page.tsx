'use client';

import React, { useState } from 'react';
import { FormBuilder, FormSchema } from '@/components/form-builder';

// =====================================================================
// FORM BUILDER DEMO PAGE
// =====================================================================

export default function FormBuilderPage() {
  const [savedForms, setSavedForms] = useState<FormSchema[]>([]);
  const [currentForm, setCurrentForm] = useState<FormSchema | null>(null);

  const handleSaveForm = (form: FormSchema) => {
    console.log('Saving form:', form);
    
    // In a real app, this would save to the database
    const existingIndex = savedForms.findIndex(f => f.id === form.id);
    
    if (existingIndex >= 0) {
      // Update existing form
      const updatedForms = [...savedForms];
      updatedForms[existingIndex] = form;
      setSavedForms(updatedForms);
    } else {
      // Add new form
      setSavedForms([...savedForms, form]);
    }
    
    alert('Form saved successfully!');
  };

  const handleSendForm = (form: FormSchema) => {
    console.log('Sending form:', form);
    alert('Form sent to user! This would trigger the form delivery system.');
  };

  const handleCancel = () => {
    setCurrentForm(null);
  };

  const handleCreateNewForm = () => {
    setCurrentForm(null); // This will create a new form in the FormBuilder
  };

  const handleEditForm = (form: FormSchema) => {
    setCurrentForm(form);
  };

  const handleDeleteForm = (formId: string) => {
    if (confirm('Are you sure you want to delete this form?')) {
      setSavedForms(savedForms.filter(f => f.id !== formId));
    }
  };

  // If we're in form builder mode, show the FormBuilder SPA
  if (currentForm !== null || savedForms.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <FormBuilder
          initialForm={currentForm || undefined}
          mode={currentForm ? 'edit' : 'create'}
          onSave={handleSaveForm}
          onSend={handleSendForm}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  // Show forms list
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Form Builder</h1>
              <p className="text-gray-600 mt-1">
                Create and manage dynamic forms for user applications
              </p>
            </div>
            <button
              onClick={handleCreateNewForm}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              📝 Create New Form
            </button>
          </div>
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedForms.map((form) => (
            <div
              key={form.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {form.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {form.description || 'No description'}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      {form.metadata.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {form.components.length} components
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  Updated: {form.metadata.updatedAt.toLocaleDateString()}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditForm(form)}
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleSendForm(form)}
                    className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Send
                  </button>
                  <button
                    onClick={() => handleDeleteForm(form.id)}
                    className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {savedForms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Forms Created Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first form to get started with the form builder
            </p>
            <button
              onClick={handleCreateNewForm}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Your First Form
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 