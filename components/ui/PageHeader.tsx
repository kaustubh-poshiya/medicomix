import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: {
    icon?: LucideIcon;
    text: string;
  };
  variant?: 'primary' | 'dark' | 'gradient';
  backgroundImage?: string;
}

/**
 * Unified page header component for consistent styling across all pages.
 * Handles navbar spacing, background images, badges, and animations.
 * 
 * Variants:
 * - primary: Blue gradient (for patient-facing pages)
 * - dark: Dark slate with teal accent (for doctor-facing pages)
 * - gradient: Slate to blue gradient (for product pages)
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  variant = 'primary',
  backgroundImage,
}) => {
  const variantStyles = {
    primary: {
      container: 'bg-gradient-to-r from-blue-600 to-indigo-700',
      badge: 'bg-white/20 text-white border-white/30',
      title: 'text-white',
      subtitle: 'text-blue-100',
    },
    dark: {
      container: 'bg-gradient-to-r from-teal-900/90 to-slate-900/90',
      badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      title: 'text-white',
      subtitle: 'text-slate-300',
    },
    gradient: {
      container: 'bg-gradient-to-r from-slate-900 to-blue-900/80',
      badge: 'bg-white/20 text-white border-white/30',
      title: 'text-white',
      subtitle: 'text-slate-300',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className={cn('pt-32 pb-20 relative overflow-hidden', styles.container)}>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 z-10" />

      {/* Optional background image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          {badge && (
            <div
              className={cn(
                'inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-bold uppercase tracking-wider mb-6',
                styles.badge
              )}
            >
              {badge.icon && <badge.icon size={16} />}
              <span>{badge.text}</span>
            </div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className={cn(
              'text-4xl md:text-5xl font-bold mb-6 tracking-tight',
              styles.title
            )}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className={cn(
                'text-xl max-w-2xl mx-auto font-light leading-relaxed',
                styles.subtitle
              )}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
};
