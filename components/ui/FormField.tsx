import React from 'react';
import { cn } from '../../lib/utils';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  label: string;
  error?: string;
  as?: 'input' | 'textarea' | 'select';
  rows?: number;
  children?: React.ReactNode; // For select options
}

/**
 * Reusable form field component with label, input, and error states.
 * Includes proper accessibility attributes and consistent styling.
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  as = 'input',
  rows = 4,
  children,
  className,
  id,
  required,
  ...props
}) => {
  const fieldId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const baseInputStyles = cn(
    'w-full px-4 py-3 rounded-xl border transition-all duration-200',
    'border-slate-200 bg-white',
    'focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none',
    'placeholder:text-slate-400',
    error && 'border-red-500 focus:border-red-500 focus:ring-red-100',
    className
  );

  const renderInput = () => {
    switch (as) {
      case 'textarea':
        return (
          <textarea
            id={fieldId}
            rows={rows}
            className={cn(baseInputStyles, 'resize-none')}
            aria-describedby={error ? `${fieldId}-error` : undefined}
            aria-invalid={error ? 'true' : undefined}
            required={required}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        );

      case 'select':
        return (
          <select
            id={fieldId}
            className={cn(baseInputStyles, 'bg-white cursor-pointer')}
            aria-describedby={error ? `${fieldId}-error` : undefined}
            aria-invalid={error ? 'true' : undefined}
            required={required}
            {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {children}
          </select>
        );

      default:
        return (
          <input
            id={fieldId}
            className={baseInputStyles}
            aria-describedby={error ? `${fieldId}-error` : undefined}
            aria-invalid={error ? 'true' : undefined}
            required={required}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={fieldId}
        className="block text-sm font-medium text-slate-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>

      {renderInput()}

      {error && (
        <p
          id={`${fieldId}-error`}
          className="text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};
