'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardStore } from '@/store/dashboardStore';
import { navigationConfig } from '@/config/navigation';
import { cn } from '@/utils';
import { ChevronLeft, ChevronRight, LayoutDashboard, Calendar, User, Users, Rocket } from 'lucide-react';

// Icon mapping for sidebar navigation
const iconMap = {
  LayoutDashboard,
  Rocket,
  Calendar,
  User,
  Users,
};

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { 
    activeTab, 
    sidebarCollapsed, 
    setActiveTab, 
    toggleSidebar,
    currentUser 
  } = useDashboardStore();

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId as any);
  };

  const sidebarVariants = {
    expanded: {
      width: '280px',
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    collapsed: {
      width: '80px',
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  };

  const contentVariants = {
    expanded: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2, delay: 0.1 }
    },
    collapsed: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 shadow-sm',
        'flex flex-col transition-all duration-300 ease-in-out',
        className
      )}
      variants={sidebarVariants}
      animate={sidebarCollapsed ? 'collapsed' : 'expanded'}
      initial="expanded"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <AnimatePresence mode="wait">
          {!sidebarCollapsed && (
            <motion.div
              key="logo"
              className="flex items-center space-x-2"
              variants={contentVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
            >
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GHX</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">Portal</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* User Info */}
      {currentUser && (
        <div className="p-4 border-b border-gray-200">
          <AnimatePresence mode="wait">
            {!sidebarCollapsed && (
              <motion.div
                key="user-info"
                className="flex items-center space-x-3"
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
              >
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-sm">
                    {currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {currentUser.firstName} {currentUser.lastName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {currentUser.role}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {sidebarCollapsed && (
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-semibold text-sm">
                  {currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationConfig.map((tab) => {
          const IconComponent = iconMap[tab.icon as keyof typeof iconMap];
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              data-tab={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                'w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200',
                'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                isActive 
                  ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600' 
                  : 'text-gray-700 hover:text-gray-900'
              )}
              aria-label={tab.label}
            >
              <IconComponent 
                className={cn(
                  'w-5 h-5 flex-shrink-0',
                  isActive ? 'text-primary-600' : 'text-gray-500'
                )} 
              />
              
              <AnimatePresence mode="wait">
                {!sidebarCollapsed && (
                  <motion.span
                    key={`label-${tab.id}`}
                    className="text-sm font-medium whitespace-nowrap"
                    variants={contentVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                  >
                    {tab.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <AnimatePresence mode="wait">
          {!sidebarCollapsed && (
            <motion.div
              key="footer"
              className="text-xs text-gray-500 text-center"
              variants={contentVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
            >
              GHX Innovation Exchange
              <br />
              v1.0.0
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};
