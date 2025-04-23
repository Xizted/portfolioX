import api from '@/config/axios';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

export const login = (data: LoginForm) =>
  api.post('/auth/login', data).then((res) => res.data);

export const register = (data: RegisterForm) =>
  api.post('/auth/register', data).then((res) => res.data);

export const logout = () =>
  api.post('/auth/logout').then((res) => res.data);
