import { useEffect } from 'react';
import { useThemeStore, accentColors, gradientStyles } from '@/stores/themeStore';

function hexToHSL(hex: string): string {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

// Map accent keys to the CSS variable HSL values
const accentHSLMap: Record<string, string> = {
  cream: '22 88% 93%',
  amber: '36 99% 60%',
  orange: '16 99% 60%',
  cyan: '192 100% 50%',
  blue: '212 100% 50%',
};

const accentHSLMapLight: Record<string, string> = {
  cream: '22 50% 70%',
  amber: '36 99% 48%',
  orange: '16 99% 52%',
  cyan: '192 100% 42%',
  blue: '212 100% 42%',
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { accent, gradient, mode } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;

    // Apply mode
    if (mode === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }

    // Apply accent color to CSS variables
    const isLight = mode === 'light';
    const hsl = isLight ? (accentHSLMapLight[accent] || accentHSLMap[accent]) : accentHSLMap[accent];

    root.style.setProperty('--primary', hsl);
    root.style.setProperty('--accent', hsl);
    root.style.setProperty('--ring', hsl);
    root.style.setProperty('--sidebar-primary', hsl);
    root.style.setProperty('--sidebar-ring', hsl);

    // Set primary-foreground based on accent brightness
    const lightAccents = ['cream', 'amber'];
    const fgValue = lightAccents.includes(accent) ? '0 0% 4%' : '0 0% 100%';
    root.style.setProperty('--primary-foreground', fgValue);
    root.style.setProperty('--accent-foreground', isLight ? '0 0% 100%' : '0 0% 4%');

    // Apply gradient
    const grad = gradientStyles[gradient];
    const fromHSL = hexToHSL(grad.from);
    const toHSL = hexToHSL(grad.to);
    root.style.setProperty('--gradient-from', fromHSL);
    root.style.setProperty('--gradient-to', toHSL);

    // For light gradients, adjust background
    if (mode === 'light') {
      root.style.setProperty('--background', gradient === 'chalk' ? '0 0% 100%' : gradient === 'marble' ? '40 20% 98%' : '0 0% 100%');
    } else {
      const darkBgMap: Record<string, string> = {
        obsidian: '0 0% 4%',
        smoke: '0 0% 10%',
        aurora: '240 60% 5%',
        chalk: '0 0% 100%',
        marble: '40 20% 98%',
      };
      root.style.setProperty('--background', darkBgMap[gradient] || '0 0% 4%');

      // Also update card and secondary for aurora/smoke
      if (gradient === 'aurora') {
        root.style.setProperty('--card', '240 50% 8%');
        root.style.setProperty('--secondary', '240 40% 12%');
        root.style.setProperty('--muted', '240 30% 14%');
      } else if (gradient === 'smoke') {
        root.style.setProperty('--card', '0 0% 13%');
        root.style.setProperty('--secondary', '0 0% 16%');
        root.style.setProperty('--muted', '0 0% 18%');
      } else {
        root.style.setProperty('--card', '0 0% 7%');
        root.style.setProperty('--secondary', '0 0% 12%');
        root.style.setProperty('--muted', '0 0% 14%');
      }
    }

    // Persist to localStorage
    localStorage.setItem('azaman-theme', JSON.stringify({ accent, gradient, mode }));
  }, [accent, gradient, mode]);

  // Restore on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('azaman-theme');
      if (saved) {
        const { accent: a, gradient: g, mode: m } = JSON.parse(saved);
        const store = useThemeStore.getState();
        if (a) store.setAccent(a);
        if (g) store.setGradient(g);
        if (m) store.setMode(m);
      }
    } catch {
      // Silently ignore errors during theme initialization
    }
  }, []);

  return <>{children}</>;
};
