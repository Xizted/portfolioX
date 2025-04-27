'use client';

import { Loader, Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Input from '../common/Input';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { useLoginMutation } from '@/services/mutation/authMutation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface LoginForm {
  email: string;
  password: string;
}

const resolver = yupResolver(
  Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })
);

const LoginForm = () => {
  const { theme } = useTheme();

  const { mutateAsync: loginMutation, isPending } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver,
    mode: 'all',
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await loginMutation(data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form className='space-y-5' onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label='Email'
        type='email'
        placeholder='Email'
        autoComplete='email'
        Icon={Mail}
        {...register('email')}
        error={errors.email?.message}
        className='rounded-xl'
      />
      <Input
        type='password'
        placeholder='Password'
        autoComplete='current-password'
        label='Password'
        Icon={Lock}
        {...register('password')}
        error={errors.password?.message}
        className='rounded-xl'
      />

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type='submit'
        disabled={isPending}
        className={clsx(
          'w-full py-2.5 px-4 rounded-xl text-white font-medium transition-all duration-200 shadow-lg shadow-blue-500/20 flex items-center justify-center',
          isPending
            ? 'bg-blue-600/70 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
        )}
      >
        {isPending ? (
          <Loader className='h-5 w-5 animate-spin' />
        ) : (
          <span className='flex items-center'>Sign In</span>
        )}
      </motion.button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='text-center'
      >
        <button
          type='button'
          className={`text-sm ${
            theme === 'dark'
              ? 'text-gray-400 hover:text-gray-300'
              : 'text-gray-600 hover:text-gray-800'
          } transition-colors`}
        >
          Forgot your password?
        </button>
      </motion.div>
    </form>
  );
};

export default LoginForm;
