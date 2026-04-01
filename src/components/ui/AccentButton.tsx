import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

interface AccentButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const AccentButton: React.FC<AccentButtonProps> = ({
  className,
  variant = 'solid',
  size = 'md',
  children,
  ...props
}) => {
  const { colors } = useTheme();

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const baseClasses = cn(
    'rounded-full font-medium transition-all duration-200 transform active:scale-95',
    sizeClasses[size],
    className
  );

  if (variant === 'ghost') {
    return (
      <button
        className={cn(
          baseClasses,
          'border backdrop-blur-sm'
        )}
        style={{
          backgroundColor: colors.card,
          borderColor: colors.accent,
          color: colors.accent,
        }}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={cn(
        baseClasses,
        'shadow-lg'
      )}
      style={{
        backgroundColor: colors.accent,
        color: 'white',
        border: 'none',
      }}
      {...props}
    >
      {children}
    </button>
  );
};
