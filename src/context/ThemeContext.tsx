import React, { createContext, useContext, useState, useEffect } from 'react';

// Theme types based on the design system
export type AccentColor = 'ember' | 'neon' | 'gold' | 'ice' | 'blush';
export type GradientStyle = 'obsidian' | 'smoke' | 'aurora' | 'chalk' | 'marble' | 'golden' | 'sunset' | 'ocean' | 'forest';
export type ThemeMode = 'light' | 'dark';

export interface ThemeState {
  mode: ThemeMode;
  accent: AccentColor;
  gradient: GradientStyle;
}

interface ThemeContextType {
  theme: ThemeState;
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: AccentColor) => void;
  setGradient: (gradient: GradientStyle) => void;
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    accent: string;
    accentForeground: string;
    gradient: string;
  };
}

const defaultTheme: ThemeState = {
  mode: 'dark',
  accent: 'gold',
  gradient: 'obsidian', // Use obsidian gradient for dark theme
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Color definitions based on the design system
const accentColors = {
  ember: '#FF6B00',
  neon: '#00FF88',
  gold: '#FF8C00', // Orange from AZAMAN logo
  ice: '#38BDF8',
  blush: '#FF4D8D',
};

const gradients = {
  obsidian: 'linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)',
  smoke: 'linear-gradient(135deg, #1A1A1A 0%, #3A3A3C 100%)',
  aurora: 'linear-gradient(135deg, #05051A 0%, #0D0D2B 100%)',
  chalk: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)',
  marble: 'linear-gradient(135deg, #FAFAF8 0%, #E8E4DC 100%)',
  golden: 'linear-gradient(135deg, rgba(255, 140, 0, 0.2) 0%, rgba(255, 140, 0, 0.05) 100%)',
  sunset: 'linear-gradient(135deg, rgba(255, 107, 0, 0.2) 0%, rgba(255, 107, 0, 0.05) 100%)',
  ocean: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(56, 189, 248, 0.05) 100%)',
  forest: 'linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 255, 136, 0.05) 100%)',
};

const lightColors = {
  background: '#FFFFFF',
  foreground: '#1A1A1A',
  card: 'rgba(0, 0, 0, 0.04)',
  cardForeground: '#1A1A1A',
  muted: 'rgba(0, 0, 0, 0.08)',
  mutedForeground: 'rgba(26, 26, 26, 0.7)',
  border: 'rgba(0, 0, 0, 0.12)',
};

const darkColors = {
  background: '#231D19', // Dark brown from palette
  foreground: '#FFFFFF',
  card: 'rgba(255, 255, 255, 0.05)',
  cardForeground: '#FFFFFF',
  muted: 'rgba(255, 255, 255, 0.1)',
  mutedForeground: 'rgba(255, 255, 255, 0.6)',
  border: 'rgba(255, 255, 255, 0.15)',
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeState>(defaultTheme);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('azaman-theme');
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        setTheme({ ...defaultTheme, ...parsed });
      } catch (error) {
        console.error('Failed to parse theme from localStorage:', error);
      }
    }
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('azaman-theme', JSON.stringify(theme));
  }, [theme]);

  const setMode = (mode: ThemeMode) => {
    setTheme(prev => ({ ...prev, mode }));
  };

  const setAccent = (accent: AccentColor) => {
    setTheme(prev => ({ ...prev, accent }));
  };

  const setGradient = (gradient: GradientStyle) => {
    setTheme(prev => ({ ...prev, gradient }));
  };

  // Calculate current colors based on theme mode
  const baseColors = theme.mode === 'light' ? lightColors : darkColors;
  const currentAccent = accentColors[theme.accent];
  const currentGradient = gradients[theme.gradient];

  const colors = {
    ...baseColors,
    accent: currentAccent,
    accentForeground: theme.mode === 'light' ? '#FFFFFF' : '#0A0A0A',
    gradient: currentGradient,
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setMode,
        setAccent,
        setGradient,
        colors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
