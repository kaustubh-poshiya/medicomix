import React from 'react';
import { cn } from '../../lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'alt' | 'dark';
  id?: string;
}

/**
 * Reusable section wrapper providing consistent spacing and backgrounds.
 * - background="white" (default): White background
 * - background="alt": Slate-50 background for alternating sections
 * - background="dark": Dark slate-900 background with white text
 */
export const Section: React.FC<SectionProps> = ({
  children,
  className,
  background = 'white',
  id,
}) => {
  return (
    <section
      id={id}
      className={cn(
        'py-16 md:py-32 relative',
        background === 'white' && 'bg-white',
        background === 'alt' && 'bg-slate-50',
        background === 'dark' && 'bg-slate-900 text-white',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </div>
    </section>
  );
};
