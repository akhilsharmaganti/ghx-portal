'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { ProtectedAdminRoute } from '@/components/auth/ProtectedAdminRoute';
import { Button } from '@/components/ui';
import { MentorForm, MentorFormData } from '@/components/admin/mentors/MentorForm';
import { MentorsTable, MentorTableData } from '@/components/admin/mentors/MentorsTable';
import { Plus, Users } from 'lucide-react';

export default function AdminMentorsPage() {
  const [mentors, setMentors] = useState<MentorTableData[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMentor, setEditingMentor] = useState<MentorTableData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch mentors on component mount
  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/mentors');
      if (response.ok) {
        const data = await response.json();
        setMentors(data);
      } else {
        console.error('Failed to fetch mentors:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching mentors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitMentor = async (mentorData: MentorFormData) => {
    try {
      setIsSubmitting(true);
      
      if (editingMentor) {
        // Update existing mentor
        const response = await fetch(`/api/admin/mentors/${editingMentor.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mentorData)
        });

        if (response.ok) {
          const updatedMentor = await response.json();
          setMentors(prev => prev.map(m => 
            m.id === editingMentor.id ? { ...updatedMentor, id: m.id } : m
          ));
          console.log('✅ Mentor updated successfully');
        } else {
          throw new Error('Failed to update mentor');
        }
      } else {
        // Create new mentor
        const response = await fetch('/api/admin/mentors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mentorData)
        });

        if (response.ok) {
          const newMentor = await response.json();
          setMentors(prev => [{ ...newMentor, id: newMentor.id.toString() }, ...prev]);
          console.log('✅ Mentor created successfully');
        } else {
          throw new Error('Failed to create mentor');
        }
      }

      // Close form and reset state
      setIsFormOpen(false);
      setEditingMentor(null);
    } catch (error) {
      console.error('Error saving mentor:', error);
      alert('Failed to save mentor. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditMentor = (mentor: MentorTableData) => {
    setEditingMentor(mentor);
    setIsFormOpen(true);
  };

  const handleDeleteMentor = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/mentors/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setMentors(prev => prev.filter(m => m.id !== id));
        console.log('✅ Mentor deleted successfully');
      } else {
        throw new Error('Failed to delete mentor');
      }
    } catch (error) {
      console.error('Error deleting mentor:', error);
      alert('Failed to delete mentor. Please try again.');
    }
  };

  const openCreateForm = () => {
    setEditingMentor(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingMentor(null);
  };

  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Page Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Mentor Management
                  </h1>
                  <p className="text-gray-600">
                    Add, edit, and manage mentors for your programs
                  </p>
                </div>
              </div>
              
              <Button 
                onClick={openCreateForm}
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Mentor</span>
              </Button>
            </div>
          </div>

          {/* Mentors Table */}
          <MentorsTable
            mentors={mentors}
            onEdit={handleEditMentor}
            onDelete={handleDeleteMentor}
            isLoading={isLoading}
          />

          {/* Mentor Form Modal */}
          <MentorForm
            isOpen={isFormOpen}
            onClose={closeForm}
            onSubmit={handleSubmitMentor}
            editingMentor={editingMentor || undefined}
            isSubmitting={isSubmitting}
          />
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}
