'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={clsx(
        'min-h-screen flex',
        theme === 'dark'
          ? 'bg-gray-900'
          : 'bg-gradient-to-br from-blue-50 to-indigo-50'
      )}
    >
      <div className='hidden lg:flex lg:w-1/2 relative overflow-hidden'>
        <div
          className={clsx(
            'absolute inset-0',
            theme === 'dark'
              ? 'bg-gradient-to-br from-blue-600 to-purple-700'
              : 'bg-gradient-to-br from-blue-500 to-indigo-600'
          )}
        >
          <div className='absolute inset-0 bg-grid-white/[0.2] [mask-image:linear-gradient(0deg,transparent,black)]' />
        </div>
        <div className='relative flex flex-col justify-center items-center text-white p-12 z-10 w-full'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className='w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm mb-8'
          >
            <Code size={40} />
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='text-3xl font-bold mb-4 text-center'
          >
            DevFolio Generator
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className='text-lg text-center text-white/80'
          >
            Create stunning developer portfolios with just a few clicks
          </motion.p>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-6'>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
