'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Monitor, Smartphone } from 'lucide-react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';
import MenuOptions from './MenuOptions';
import { ViewToggleButtonProps } from '@/interfaces/Dashboard';

const Header = () => {
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={clsx(
        'h-16 lex items-center justify-end px-4 sticky top-0 z-10 backdrop-blur-sm border-b',
        {
          'bg-gray-800/50 border-gray-700/50': theme === 'dark',
          'bg-white/50 border-gray-200/50': theme === 'light',
        }
      )}
    >
      <div className='flex items-center space-x-4'>
        <div className='flex space-x-2'>
          <ViewToggleButton
            active={viewMode === 'desktop'}
            onClick={() => setViewMode('desktop')}
            icon={<Monitor size={18} />}
          />
          <ViewToggleButton
            active={viewMode === 'mobile'}
            onClick={() => setViewMode('mobile')}
            icon={<Smartphone size={18} />}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={clsx('p-2 rounded-full transition-colors relative', {
            'hover:bg-gray-700': theme === 'dark',
            'hover:bg-gray-100': theme === 'light',
          })}
        >
          <Bell size={20} />
          <span className='absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full'></span>
        </motion.button>
        <div className='relative'>
          <MenuOptions />
        </div>
      </div>
    </motion.header>
  );
};

const ViewToggleButton: React.FC<ViewToggleButtonProps> = ({
  active,
  onClick,
  icon,
}) => {
  const { theme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={clsx('p-2 rounded-full transition-colors', {
        'bg-gray-700 text-white': active && theme === 'dark',
        'bg-gray-200 text-gray-800': active && theme === 'light',
        'text-gray-400 hover:bg-gray-700': !active && theme === 'dark',
        'text-gray-600 hover:bg-gray-100': !active && theme === 'light',
      })}
    >
      {icon}
    </motion.button>
  );
};

export default Header;
