import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { Delete } from 'lucide-react';

interface NumericKeypadProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  className?: string;
}

export const NumericKeypad: React.FC<NumericKeypadProps> = ({
  value,
  onChange,
  maxLength = 10,
  className,
}) => {
  const { colors } = useTheme();
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const handleKeyPress = (key: string) => {
    if (pressedKey) return; // Prevent multiple rapid presses

    setPressedKey(key);
    setTimeout(() => setPressedKey(null), 80);

    if (key === 'backspace') {
      onChange(value.slice(0, -1));
    } else if (key === '000') {
      if (value.length + 3 <= maxLength) {
        onChange(value + '000');
      }
    } else {
      if (value.length < maxLength) {
        onChange(value + key);
      }
    }
  };

  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['000', '0', 'backspace'],
  ];

  return (
    <div className={cn('grid grid-cols-3 gap-3 p-4', className)}>
      {keys.map((row, rowIndex) =>
        row.map((key, keyIndex) => (
          <button
            key={`${rowIndex}-${keyIndex}`}
            className={cn(
              'rounded-full p-4 font-medium text-lg transition-all duration-80 transform',
              'backdrop-blur-sm border',
              key === pressedKey && 'scale-95'
            )}
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
              color: colors.foreground,
              ...(key === pressedKey && {
                backgroundColor: colors.accent,
                color: colors.accentForeground,
              }),
            }}
            onClick={() => handleKeyPress(key)}
          >
            {key === 'backspace' ? (
              <Delete size={24} />
            ) : (
              key
            )}
          </button>
        ))
      )}
    </div>
  );
};
