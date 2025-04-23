'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { useEffect, useState } from 'react';

const DashboardLayout = ({
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
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      )}
    >
      <Sidebar />
      <motion.div layout className='flex-1 overflow-hidden'>
        <div className='flex flex-col h-screen'>
          <Header />
          <main className='flex-1 overflow-y-auto'>{children}</main>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardLayout;
