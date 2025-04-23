import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { login, logout, register } from '../auth';

export const useLoginMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess: () => {
      router.push('/dashboard/home');
    },
  });
};

export const useRegisterMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ['register'],
    mutationFn: register,
    onSuccess: () => {
      router.push('/dashboard/home');
    },
  });
};

export const useLogoutMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: () => {
      router.push('/auth/login');
    },
  });
};
