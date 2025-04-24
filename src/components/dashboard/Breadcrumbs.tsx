'use client';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ChevronRight, Home, Layers } from 'lucide-react';
import { useTheme } from 'next-themes';

const Breadcrumbs = () => {
  const { theme } = useTheme();

  return (
    <div
      className={clsx(
        'px-6 py-4 border-b',
        theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'
      )}
    >
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className='flex items-center space-x-2'
      >
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href='/'
          className={clsx(
            'flex items-center',
            theme === 'dark'
              ? 'text-gray-400 hover:text-white'
              : 'text-gray-600 hover:text-gray-900',
            'transition-colors'
          )}
        >
          <Home size={16} />
          <span className='ml-1 text-sm'>Home</span>
        </motion.a>
        <ChevronRight
          size={14}
          className={clsx(theme === 'dark' ? 'text-gray-600' : 'text-gray-400')}
        />
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={clsx(
            'flex items-center',
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          )}
        >
          <Layers size={16} />
          <span className='ml-1 text-sm font-medium'>Templates</span>
        </motion.div>
      </motion.nav>
    </div>
  );
};

export default Breadcrumbs;
