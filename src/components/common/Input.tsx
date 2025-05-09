'use client';

import clsx from 'clsx';
import { Eye, EyeOff } from 'lucide-react';
import { useTheme } from 'next-themes';
import { InputHTMLAttributes, JSX, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  Icon?: JSX.ElementType;
  label?: string;
  error?: string;
  iconSize?: number;
}

const Input = ({
  className,
  Icon,
  label,
  name,
  type,
  error,
  iconSize = 24,
  ...props
}: InputProps) => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputClassName = clsx(
    'w-full pl-10 pr-4 py-2.5 border transition-all duration-200 focus:outline-none focus:ring-4',
    theme === 'dark'
      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20'
      : 'bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20',
    error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20',
    className
  );

  const iconClassName = clsx(
    'absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors',
    theme === 'dark'
      ? 'text-gray-400 group-focus-within:text-blue-400'
      : 'text-gray-400 group-focus-within:text-blue-600',
    error
      ? 'text-red-500 group-focus-within:text-red-500'
      : 'text-gray-400 group-focus-within:text-blue-600'
  );

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          {label}
        </label>
      )}
      <div className='relative group'>
        {Icon && <Icon size={iconSize} className={iconClassName} />}
        <input
          {...props}
          type={type === 'password' && showPassword ? 'text' : type}
          id={name}
          name={name}
          className={inputClassName}
        />
        {type === 'password' && (
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className={clsx(
              'absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer transition-colors',
              theme === 'dark'
                ? 'group-focus-within:text-blue-400'
                : 'group-focus-within:text-blue-600',
              error
                ? 'text-red-500 group-focus-within:text-red-500'
                : 'text-gray-400 group-focus-within:text-blue-600'
            )}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>
      {error && (
        <p
          className={clsx(
            'mt-2 text-sm',
            theme === 'dark' ? 'text-red-400' : 'text-red-500'
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
