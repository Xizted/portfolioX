'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useLogoutMutation } from '@/services/mutation/authMutation';
import { LogOut, User } from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';

const MenuOptions = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { mutateAsync: logoutMutation } = useLogoutMutation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    try {
      await logoutMutation();
      router.push('/auth/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className='flex items-center cursor-pointer'
        onClick={() => setShowUserMenu((prev) => !prev)}
      >
        <div
          className={`w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white`}
        >
          <User size={16} />
        </div>
      </motion.div>
      <AnimatePresence>
        {showUserMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={clsx(
              'absolute right-0 mt-2 w-48 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5',
              {
                'bg-gray-800': theme === 'dark',
                'bg-white': theme === 'light',
              }
            )}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={handleSignOut}
              className={clsx(
                'flex items-center w-full px-4 py-3 text-sm rounded-xl transition-colors',
                {
                  'text-red-400 hover:bg-gray-700': theme === 'dark',
                  'text-red-600 hover:bg-gray-50': theme === 'light',
                }
              )}
            >
              <LogOut size={16} className='mr-2' />
              Sign Out
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuOptions;
