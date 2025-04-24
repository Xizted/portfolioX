'use client';

import { Loader, Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Input from '../common/Input';
import clsx from 'clsx';
import { useRegisterMutation } from '@/services/mutation/authMutation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface RegisterForm {
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


const RegisterForm = () => {
  const { mutateAsync: registerMutation, isPending } = useRegisterMutation();

  const { register, handleSubmit, formState: {errors} } = useForm<RegisterForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver,
    mode: 'all',
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerMutation(data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
      <Input
        label='Email'
        type='email'
        placeholder='Email'
        required
        autoComplete='email'
        Icon={Mail}
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        type='password'
        placeholder='Password'
        required
        autoComplete='current-password'
        label='Password'
        Icon={Lock}
        {...register('password')}
        error={errors.password?.message}
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
          <span className='flex items-center'>Sign Up</span>
        )}
      </motion.button>
    </form>
  );
};

export default RegisterForm;
