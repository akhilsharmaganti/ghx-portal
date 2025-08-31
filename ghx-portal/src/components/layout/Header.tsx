'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardStore } from '@/store/dashboardStore';
import { useAuth } from '@/contexts/AuthContext';
import { navigationConfig, iconMap } from '@/config/navigation';
import { cn } from '@/utils';
import { AppUser } from '@/types';
import { 
  Bell, 
  Search, 
  Settings, 
  LogOut, 
  User,
  ChevronDown,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

interface HeaderProps {
  className?: string;
  onMobileMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  className,
  onMobileMenuToggle 
}) => {
  const { currentUser: dashboardUser, sidebarCollapsed, activeTab, setActiveTab } = useDashboardStore();
  const { user: authUser, signOut } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Use Firebase auth user if available, otherwise fall back to dashboard store user
  const currentUser: AppUser | null = authUser || dashboardUser;

  // Helper function to get user display name safely
  const getUserDisplayName = (user: AppUser): string => {
    if ('displayName' in user && user.displayName) {
      return user.displayName;
    }
    if ('firstName' in user && 'lastName' in user) {
      return `${user.firstName} ${user.lastName}`;
    }
    return 'User';
  };

  // Helper function to get user initials safely
  const getUserInitials = (user: AppUser): string => {
    if ('displayName' in user && user.displayName) {
      return user.displayName.split(' ').map(n => n.charAt(0)).join('');
    }
    if ('firstName' in user && 'lastName' in user) {
      return `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`;
    }
    return 'U';
  };

  // Helper function to get user role safely
  const getUserRole = (user: AppUser): string => {
    if ('userType' in user && user.userType) {
      return user.userType;
    }
    if ('role' in user) {
      return user.role;
    }
    return 'user';
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId as any);
    // Close mobile nav on tab click
    setIsMobileNavOpen(false);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsNotificationsOpen(false);
  };

  const handleNotificationsToggle = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsUserMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleProfileClick = () => {
    // TODO: Navigate to profile
    console.log('Profile clicked');
    setIsUserMenuOpen(false);
  };

  const handleSettingsClick = () => {
    // TODO: Navigate to settings
    console.log('Settings clicked');
    setIsUserMenuOpen(false);
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <header className={cn(
      'sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm',
      'flex flex-col',
      className
    )}>
      {/* Top Bar - Logo, Search, Notifications, User */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileNav}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle mobile navigation"
          >
            {isMobileNavOpen ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GHX</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">Portal</span>
          </div>

          {/* Search Bar - Hidden on mobile, visible on tablet+ */}
          <div className="hidden sm:flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2 flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search programs, mentors, events..."
              className="bg-transparent border-none outline-none text-sm text-gray-900 placeholder-gray-500 flex-1"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={handleNotificationsToggle}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {/* Notification Badge */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {/* Sample Notifications */}
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900">
                              New program application received
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              2 hours ago
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          {currentUser && (
            <div className="relative">
              <button
                onClick={handleUserMenuToggle}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="User menu"
              >
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-sm">
                    {getUserInitials(currentUser)}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {getUserDisplayName(currentUser)}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {getUserRole(currentUser)}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>

              {/* User Menu Dropdown */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">
                        {getUserDisplayName(currentUser)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {currentUser.email}
                      </p>
                    </div>
                    
                    <div className="py-1">
                      <button
                        onClick={handleProfileClick}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </button>
                      
                      <button
                        onClick={handleSettingsClick}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-200 py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-error-600 hover:bg-error-50 transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Navigation Tabs - Hidden on mobile, visible on tablet+ */}
      <nav className="hidden md:flex items-center justify-end space-x-1 px-4 pb-3">
        {navigationConfig.map((tab) => {
          const IconComponent = iconMap[tab.icon as keyof typeof iconMap];
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              data-tab={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                isActive 
                  ? 'text-gray-900 border-b-2 border-blue-600' 
                  : 'text-gray-900 hover:text-gray-700'
              )}
              aria-label={tab.label}
            >
              <IconComponent 
                className={cn(
                  'w-4 h-4 flex-shrink-0',
                  isActive ? 'text-blue-600' : 'text-gray-500'
                )} 
              />
              <span className="text-sm font-medium whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={toggleMobileNav}
            />
            
            {/* Mobile Navigation Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 lg:hidden"
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">GHX</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">Portal</span>
                </div>
                <button
                  onClick={toggleMobileNav}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Close mobile navigation"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search programs, mentors, events..."
                    className="bg-transparent border-none outline-none text-sm text-gray-900 placeholder-gray-500 flex-1"
                  />
                </div>
              </div>

              {/* Mobile Navigation Tabs */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Navigation
                </h3>
                <nav className="space-y-1">
                  {navigationConfig.map((tab) => {
                    const IconComponent = iconMap[tab.icon as keyof typeof iconMap];
                    const isActive = activeTab === tab.id;
                    
                    return (
                      <button
                        key={tab.id}
                        data-tab={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={cn(
                          'w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200',
                          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                          isActive 
                            ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        )}
                        aria-label={tab.label}
                      >
                        <div className="flex items-center space-x-3">
                          <IconComponent 
                            className={cn(
                              'w-5 h-5 flex-shrink-0',
                              isActive ? 'text-blue-600' : 'text-gray-500'
                            )} 
                          />
                          <span className="text-sm font-medium">
                            {tab.label}
                          </span>
                        </div>
                        <ChevronRight className={cn(
                          'w-4 h-4 transition-transform duration-200',
                          isActive ? 'text-blue-600 rotate-90' : 'text-gray-400'
                        )} />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile User Info */}
              {currentUser && (
                <div className="p-4 border-t border-gray-200 mt-auto">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold text-sm">
                        {getUserInitials(currentUser)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {getUserDisplayName(currentUser)}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {getUserRole(currentUser)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <button
                      onClick={handleProfileClick}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    
                    <button
                      onClick={handleSettingsClick}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-error-600 hover:bg-error-50 rounded-lg transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
