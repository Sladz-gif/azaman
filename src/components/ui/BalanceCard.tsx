import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

interface BalanceCardProps {
  balance: number;
  username: string;
  monthlyChange?: number;
  savings?: number;
  invested?: number;
  spent?: number;
  className?: string;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  username,
  monthlyChange = 0,
  savings = 0,
  invested = 0,
  spent = 0,
  className,
}) => {
  const { colors } = useTheme();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div
      className={cn(
        'rounded-[20px] p-4 sm:p-6 relative overflow-hidden',
        className
      )}
      style={{
        background: colors.gradient,
        color: colors.foreground,
      }}
    >
      {/* Glass overlay */}
      <div
        className="absolute inset-0 rounded-[20px]"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wider opacity-80 mb-1" style={{ color: colors.foreground }}>
              Total Balance
            </div>
            <div className="text-2xl sm:text-[38px] font-bold" style={{ fontFamily: 'Syne, sans-serif', color: colors.foreground }}>
              GH₵{balance.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-sm opacity-70 font-mono" style={{ color: colors.foreground }}>
              @{username}
            </div>
          </div>
          {monthlyChange !== 0 && (
            <div
              className={cn(
                'px-2 py-1 rounded-full text-xs font-medium self-start',
                monthlyChange > 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
              )}
            >
              {monthlyChange > 0 ? '+' : ''}{monthlyChange.toFixed(1)}%
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px my-4" style={{ backgroundColor: colors.border }} />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-xs opacity-70" style={{ color: colors.foreground }}>Savings</div>
            <div className="text-sm font-semibold text-green-300">
              GH₵{savings.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <div>
            <div className="text-xs opacity-70" style={{ color: colors.foreground }}>Invested</div>
            <div className="text-sm font-semibold text-blue-300">
              GH₵{invested.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <div>
            <div className="text-xs opacity-70" style={{ color: colors.foreground }}>Spent</div>
            <div className="text-sm font-semibold text-red-300">
              GH₵{spent.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
