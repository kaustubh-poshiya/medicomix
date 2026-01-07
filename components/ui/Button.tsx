import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}


/**
 * Reusable button component with consistent styling and variants.
 * 
 * Variants:
 * - primary: Blue for main CTAs (patients)
 * - secondary: Teal for secondary actions (doctors)
 * - outline: Bordered style for less prominent actions
 * - ghost: Minimal style for tertiary actions
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  loading = false,
  fullWidth = false,
  children,
  className,
  disabled,
  type = 'button',
  onClick,
}) => {
  const variants = {
    primary:
      'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40',
    secondary:
      'bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40',
    outline:
      'border-2 border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-900',
    ghost:
      'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />}
          {children}
          {Icon && iconPosition === 'right' && (
            <Icon
              size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18}
              className="group-hover:translate-x-1 transition-transform"
            />
          )}
        </>
      )}
    </motion.button>
  );
};
