import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary' }) => {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded',
        variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
      )}
    >
      {children}
    </button>
  );
};

export default Button;
