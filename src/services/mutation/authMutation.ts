import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { login, logout, register } from '../auth';
import { toast } from 'sonner';
import { useRef } from 'react';
import { isAxiosError } from 'axios';

export const useLoginMutation = () => {
  const toastId = useRef<string | number | undefined>(undefined);

  const router = useRouter();
  return useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess: () => {
      if (toastId.current) {
        toast.dismiss(toastId.current);
      }

      toast.success('Login successful!', {
        position: 'top-right',
      });
      router.push('/dashboard/home');
    },

    onMutate: () => {
      toastId.current = toast.loading('Logging in...', {
        position: 'top-right',
      });
    },

    onError: (error) => {
      const message = isAxiosError(error)
        ? error.response?.data.message
        : error.message;

      if (toastId.current) {
        toast.dismiss(toastId.current);
      }
      toast.error(message, { position: 'top-right' });
    },
  });
};

export const useRegisterMutation = () => {
  const toastId = useRef<string | number | undefined>(undefined);

  const router = useRouter();
  return useMutation({
    mutationKey: ['register'],
    mutationFn: register,
    onSuccess: () => {
      if (toastId.current) {
        toast.dismiss(toastId.current);
      }
      toast.success('Registration successful!', {
        position: 'top-right',
      });
      router.push('/dashboard/home');
    },
    onMutate: () => {
      toastId.current = toast.loading('Registering...', {
        position: 'top-right',
      });
    },

    onError: (error) => {
      const message = isAxiosError(error)
        ? error.response?.data.message
        : error.message;

      if (toastId.current) {
        toast.dismiss(toastId.current);
      }
      toast.error(message, { position: 'top-right' });
    },
  });
};

export const useLogoutMutation = () => {
  const toastId = useRef<string | number | undefined>(undefined);

  const router = useRouter();
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: () => {
      if (toastId.current) {
        toast.dismiss(toastId.current);
      }

      toast.success('Logout successful!', {
        position: 'top-right',
      });
      router.push('/auth/login');
    },

    onMutate: () => {
      toastId.current = toast.loading('Logging out...', {
        position: 'top-right',
      });
    },

    onError: (error) => {
      const message = isAxiosError(error)
        ? error.response?.data.message
        : error.message;

      if (toastId.current) {
        toast.dismiss(toastId.current);
      }
      toast.error(message, { position: 'top-right' });
    },
  });
};
