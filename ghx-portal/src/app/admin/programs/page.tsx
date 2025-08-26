'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { ProtectedAdminRoute } from '@/components/auth/ProtectedAdminRoute';
import { ProgramsTable, ProgramForm } from '@/components/admin/programs';
import { Button } from '@/components/ui';
import { Plus, Briefcase } from 'lucide-react';
import { Program } from '@/types/programs';
import { ProgramsService } from '@/services/admin/programs.service';
import { programNotificationService } from '@/notifications';

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleCreateProgram = () => {
    setEditingProgram(null);
    setIsFormOpen(true);
  };

  const handleEditProgram = (program: Program) => {
    setEditingProgram(program);
    setIsFormOpen(true);
  };

  const handleDeleteProgram = async (programId: string) => {
    if (confirm('Are you sure you want to delete this program?')) {
      try {
        await ProgramsService.deleteProgram(programId);
        setPrograms(prev => prev.filter(p => p.id !== programId));
      } catch (error) {
        console.error('Error deleting program:', error);
        alert('Failed to delete program. Please try again.');
      }
    }
  };

  const handleViewProgram = (program: Program) => {
    // For now, just log the program - could open a view modal
    console.log('Viewing program:', program);
  };

  // Load programs on component mount
  useEffect(() => {
    const loadPrograms = async () => {
      try {
        setIsLoading(true);
        // Initialize sample data if empty
        await ProgramsService.initializeSampleData();
        // Load all programs
        const allPrograms = await ProgramsService.getAllPrograms();
        setPrograms(allPrograms);
      } catch (error) {
        console.error('Error loading programs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPrograms();
  }, []);

  const handleSubmitProgram = async (programData: Partial<Program>) => {
    setIsSubmitting(true);
    
    try {
      if (editingProgram) {
        // Update existing program
        const updatedProgram = await ProgramsService.updateProgram(editingProgram.id, programData);
        setPrograms(prev => prev.map(p => p.id === editingProgram.id ? updatedProgram : p));
        
        // Send notification about program update
        try {
          await programNotificationService.notifyProgramUpdated(updatedProgram, [
            'Program information updated',
            'Check for new details'
          ]);
          console.log('✅ Program update notification sent successfully');
        } catch (notificationError) {
          console.warn('⚠️ Failed to send program update notification:', notificationError);
          // Don't fail the main operation if notification fails
        }
        
      } else {
        // Create new program
        const newProgram = await ProgramsService.createProgram(programData);
        setPrograms(prev => [...prev, newProgram]);
        
        // Send notification about new program
        try {
          await programNotificationService.notifyProgramCreated(newProgram);
          console.log('✅ Program creation notification sent successfully');
        } catch (notificationError) {
          console.warn('⚠️ Failed to send program creation notification:', notificationError);
          // Don't fail the main operation if notification fails
        }
      }
      
      setIsFormOpen(false);
      setEditingProgram(null);
    } catch (error) {
      console.error('Error saving program:', error);
      alert('Failed to save program. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Page Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Program Management
                </h1>
                <p className="text-sm text-gray-600">
                  Create and manage innovation programs
                </p>
              </div>
              
              <Button onClick={handleCreateProgram} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create Program</span>
              </Button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Loading Programs...
                </h3>
                <p className="text-gray-500">
                  Please wait while we fetch your programs
                </p>
              </div>
            </div>
          ) : (
            /* Programs Table */
            <ProgramsTable
              programs={programs}
              onEdit={handleEditProgram}
              onDelete={handleDeleteProgram}
              onView={handleViewProgram}
            />
          )}

          {/* Program Form Modal */}
          <ProgramForm
            program={editingProgram}
            isOpen={isFormOpen}
            onClose={() => {
              setIsFormOpen(false);
              setEditingProgram(null);
            }}
            onSubmit={handleSubmitProgram}
            isSubmitting={isSubmitting}
          />
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}
