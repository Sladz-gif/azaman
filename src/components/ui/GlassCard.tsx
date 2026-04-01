import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  accentBorder?: boolean;
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  className,
  accentBorder = false,
  children,
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <div
      className={cn(
        'rounded-[20px] backdrop-blur-xl border transition-all duration-200',
        accentBorder && 'border-2',
        className
      )}
      style={{
        backgroundColor: colors.card,
        borderColor: accentBorder ? colors.accent : colors.border,
        color: colors.cardForeground,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
