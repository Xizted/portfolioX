'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import {
  ChevronLeft,
  Settings,
  Layers,
  User,
  Moon,
  Sun,
  Menu,
} from 'lucide-react';

import { NavItemProps } from '@/interfaces/Dashboard';
import { useUIStore } from '../providers/UIStore';
import useWindowResize from '@/hooks/useWindowResize';

const Sidebar = () => {
  const { theme, setTheme } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const sidebar = useUIStore((state) => state.sidebar);

  const isMobile = useWindowResize();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleOverlayClick = () => {
    sidebar.toggleSidebar();
  };

  useEffect(() => {
    if (!isMobile) {
      sidebar.toggleSidebar();
    }
  }, [isMobile]);

  return (
    <div
      className={clsx(
        'min-h-screen flex',
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      )}
    >
      <button
        className={clsx(
          'md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-lg',
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        )}
        onClick={() => sidebar.toggleSidebar()}
      >
        <Menu size={24} />
      </button>

      {sidebar.isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black/50 z-40 md:hidden'
          onClick={handleOverlayClick}
        />
      )}

      <motion.div
        initial={false}
        animate={{
          x: isMobile ? (sidebar.isOpen ? 0 : -256) : 0,
          width: isMobile ? 256 : sidebarCollapsed ? 64 : 256,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={clsx(
          'fixed md:sticky top-0 h-screen z-50 flex flex-col shadow-xl md:shadow-none',
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        )}
      >
        <motion.div
          className='flex items-center p-4 border-b border-gray-200 dark:border-gray-700'
          animate={{
            justifyContent:
              sidebarCollapsed && !isMobile ? 'center' : 'space-between',
          }}
        >
          {(!sidebarCollapsed || isMobile) && (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='font-bold text-lg'
            >
              <span className='text-blue-600 dark:text-blue-400'>Dev</span>Folio
            </motion.h1>
          )}
          {!isMobile && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
            >
              <ChevronLeft
                className={`h-5 w-5 transition-transform ${
                  sidebarCollapsed ? 'rotate-180' : ''
                }`}
              />
            </motion.button>
          )}
        </motion.div>

        <nav className='p-2 flex-1'>
          <motion.ul layout className='space-y-2'>
            <NavItem
              icon={<Layers />}
              label='Templates'
              collapsed={sidebarCollapsed && !isMobile}
              onClick={() => isMobile && sidebar.toggleSidebar()}
              active
            />
            <NavItem
              icon={<User />}
              label='Profile'
              collapsed={sidebarCollapsed && !isMobile}
              onClick={() => isMobile && sidebar.toggleSidebar()}
            />
            <NavItem
              icon={<Settings />}
              label='Settings'
              collapsed={sidebarCollapsed && !isMobile}
              onClick={() => isMobile && sidebar.toggleSidebar()}
            />
          </motion.ul>
        </nav>

        <motion.div
          layout
          className='p-4 border-t border-gray-200 dark:border-gray-700'
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className='flex items-center justify-center w-full p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
          >
            {theme === 'dark' ? (
              <Sun className='h-5 w-5' />
            ) : (
              <Moon className='h-5 w-5' />
            )}
            {(!sidebarCollapsed || isMobile) && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className='ml-2'
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </motion.span>
            )}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  collapsed,
  active,
  onClick,
}) => {
  return (
    <motion.li layout>
      <motion.a
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        href='#'
        className={`flex items-center p-2 rounded-md transition-colors
          ${
            active
              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          }
        `}
      >
        <motion.div layout className='h-5 w-5'>
          {icon}
        </motion.div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className='ml-3'
          >
            {label}
          </motion.span>
        )}
      </motion.a>
    </motion.li>
  );
};

export default Sidebar;
