import { create } from 'zustand';

interface ThemeState {
  accent: 'cream' | 'amber' | 'orange' | 'cyan' | 'blue';
  gradient: 'obsidian' | 'smoke' | 'aurora' | 'chalk' | 'marble';
  mode: 'dark' | 'light';
  setAccent: (accent: ThemeState['accent']) => void;
  setGradient: (gradient: ThemeState['gradient']) => void;
  setMode: (mode: ThemeState['mode']) => void;
}

export const accentColors = {
  cream: { hex: '#FCF5EF', label: 'Cream' },
  amber: { hex: '#FEA735', label: 'Amber' },
  orange: { hex: '#FE7235', label: 'Orange' },
  cyan: { hex: '#00C3FF', label: 'Cyan' },
  blue: { hex: '#0077FF', label: 'Blue' },
};

export const gradientStyles = {
  obsidian: { from: '#0A0A0A', to: '#1C1C1E', label: 'Obsidian' },
  smoke: { from: '#1A1A1A', to: '#3A3A3C', label: 'Smoke' },
  aurora: { from: '#05051A', to: '#0D0D2B', label: 'Aurora' },
  chalk: { from: '#FFFFFF', to: '#F0EDE8', label: 'Chalk' },
  marble: { from: '#FAFAF8', to: '#E8E4DC', label: 'Marble' },
};

export const useThemeStore = create<ThemeState>((set) => ({
  accent: 'gold',
  gradient: 'obsidian',
  mode: 'dark',
  setAccent: (accent) => set({ accent }),
  setGradient: (gradient) => set({ gradient }),
  setMode: (mode) => set({ mode }),
}));
