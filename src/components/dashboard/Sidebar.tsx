"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Settings,
  Layers,
  User,
  Moon,
  Sun,
} from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { NavItemProps } from '@/interfaces/Dashboard';

const Sidebar = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <motion.div
      initial={{ width: 256 }}
      animate={{ width: sidebarCollapsed ? 64 : 256 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={clsx(
        'relative flex flex-col',
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}
    >
      <motion.div
        className='flex items-center p-4 border-b border-gray-200 dark:border-gray-700'
        animate={{
          justifyContent: sidebarCollapsed ? 'center' : 'space-between',
        }}
      >
        {!sidebarCollapsed && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='font-bold text-lg'
          >
            <span className='text-blue-600 dark:text-blue-400'>Dev</span>Folio
          </motion.h1>
        )}
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
      </motion.div>

      <nav className='p-2 flex-1'>
        <motion.ul layout className='space-y-2'>
          <NavItem
            icon={<Layers />}
            label='Templates'
            collapsed={sidebarCollapsed}
            active
          />
          <NavItem
            icon={<User />}
            label='Profile'
            collapsed={sidebarCollapsed}
          />
          <NavItem
            icon={<Settings />}
            label='Settings'
            collapsed={sidebarCollapsed}
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
          {!sidebarCollapsed && (
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
  );
};



const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  collapsed,
  active,
}) => {
  return (
    <motion.li layout>
      <motion.a
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
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
