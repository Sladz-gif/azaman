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
  gold: { hex: '#C9A84C', label: 'Gold' },
  ember: { hex: '#FF6B00', label: 'Ember' },
  neon: { hex: '#00FF88', label: 'Neon' },
  ice: { hex: '#38BDF8', label: 'Ice' },
  blush: { hex: '#FF4D8D', label: 'Blush' },
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
