'use client';

import React, { useState, useEffect } from 'react';
import { 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  UserCheck,
  UserX,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface User {
  id: string;
  email: string;
  displayName: string;
  userType: string;
  companyName: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastLoginAt: string;
}

interface AdminUserTableProps {
  onUserSelection: (userIds: string[]) => void;
  selectedUsers: string[];
}

const mockUsers: User[] = [
  {
    id: '1',
    email: 'sarah.johnson@startup.com',
    displayName: 'Sarah Johnson',
    userType: 'STARTUP',
    companyName: 'HealthTech Innovations',
    status: 'active',
    createdAt: '2024-01-15',
    lastLoginAt: '2024-08-20'
  },
  {
    id: '2',
    email: 'mike.chen@company.com',
    displayName: 'Mike Chen',
    userType: 'INVESTOR',
    companyName: 'Venture Capital Partners',
    status: 'active',
    createdAt: '2024-02-01',
    lastLoginAt: '2024-08-19'
  },
  {
    id: '3',
    email: 'emily.rodriguez@mentor.com',
    displayName: 'Emily Rodriguez',
    userType: 'MENTOR',
    companyName: 'Clinical Excellence Group',
    status: 'active',
    createdAt: '2024-01-20',
    lastLoginAt: '2024-08-18'
  },
  {
    id: '4',
    email: 'david.kim@seeker.com',
    displayName: 'David Kim',
    userType: 'SEEKER',
    companyName: 'Research Institute',
    status: 'pending',
    createdAt: '2024-08-15',
    lastLoginAt: '2024-08-15'
  }
];

export function AdminUserTable({ onUserSelection, selectedUsers }: AdminUserTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchUsers = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(mockUsers);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUsers.length === users.length && users.length > 0) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedUsers, users]);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      onUserSelection(users.map(user => user.id));
    } else {
      onUserSelection([]);
    }
  };

  const handleUserSelect = (userId: string, checked: boolean) => {
    if (checked) {
      onUserSelection([...selectedUsers, userId]);
    } else {
      onUserSelection(selectedUsers.filter(id => id !== userId));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getUserTypeIcon = (userType: string) => {
    const iconClasses = {
      STARTUP: 'text-blue-600',
      INVESTOR: 'text-green-600',
      MENTOR: 'text-purple-600',
      SEEKER: 'text-orange-600'
    };
    
    return (
      <span className={`text-xs font-medium ${iconClasses[userType as keyof typeof iconClasses]}`}>
        {userType}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {loading ? (
        <div className="p-8 text-center">
          <LoadingSpinner />
          <p className="mt-2 text-gray-500">Loading users...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="hidden xl:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => handleUserSelect(user.id, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {user.displayName.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {user.displayName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-800">
                          {user.userType.charAt(0)}
                        </span>
                      </div>
                      <span className="ml-2 text-sm text-gray-900">{user.userType}</span>
                    </div>
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.companyName}
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : user.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="hidden xl:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(user.lastLoginAt)}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 hover:bg-gray-100"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 hover:bg-gray-100"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 hover:bg-gray-100"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
