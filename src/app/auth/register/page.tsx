'use client';

import RegisterForm from '@/components/auth/RegisterForm';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

const Register = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={clsx(
        'w-full max-w-md',
        theme === 'dark'
          ? 'bg-gray-800/50 backdrop-blur-xl'
          : 'bg-white/70 backdrop-blur-xl',
        'p-8 rounded-2xl shadow-xl'
      )}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className='text-center mb-8'
      >
        <h1
          className={clsx(
            'text-2xl font-bold mb-2',
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          )}
        >
          Join DevFolio
        </h1>
        <p
          className={clsx(theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}
        >
          Create an account to start building your portfolio.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className='w-full'
      >
        <RegisterForm />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={clsx(
          'mt-6 text-center',
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        )}
      >
        <p className='text-sm'>
          Already have an account?
          <button
            onClick={() => router.push('./login')}
            className={clsx(
              'ml-2 font-semibold',
              theme === 'dark'
                ? 'text-blue-400 hover:text-blue-300'
                : 'text-blue-600 hover:text-blue-700'
            )}
          >
            Sign In
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Register;
