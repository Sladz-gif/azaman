import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { AccentButton } from '@/components/ui/AccentButton';
import { ArrowLeft, Check, Sun, Moon } from 'lucide-react';

const Appearance: React.FC = () => {
  const { theme, setMode, setAccent, setGradient, colors } = useTheme();

  const accentColors = [
    { name: 'ember', value: '#FF6B00', label: 'Ember' },
    { name: 'neon', value: '#00FF88', label: 'Neon' },
    { name: 'gold', value: '#FF8C00', label: 'Orange' },
    { name: 'ice', value: '#38BDF8', label: 'Ice' },
    { name: 'blush', value: '#FF4D8D', label: 'Blush' },
  ];

  const gradients = [
    { name: 'obsidian', value: 'linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)', label: 'Obsidian' },
    { name: 'smoke', value: 'linear-gradient(135deg, #1A1A1A 0%, #3A3A3C 100%)', label: 'Smoke' },
    { name: 'aurora', value: 'linear-gradient(135deg, #05051A 0%, #0D0D2B 100%)', label: 'Aurora' },
    { name: 'chalk', value: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)', label: 'Chalk' },
    { name: 'marble', value: 'linear-gradient(135deg, #FAFAF8 0%, #E8E4DC 100%)', label: 'Marble' },
    { name: 'golden', value: 'linear-gradient(135deg, rgba(255, 140, 0, 0.2) 0%, rgba(255, 140, 0, 0.05) 100%)', label: 'Golden' },
    { name: 'sunset', value: 'linear-gradient(135deg, rgba(255, 107, 0, 0.2) 0%, rgba(255, 107, 0, 0.05) 100%)', label: 'Sunset' },
    { name: 'ocean', value: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(56, 189, 248, 0.05) 100%)', label: 'Ocean' },
    { name: 'forest', value: 'linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 255, 136, 0.05) 100%)', label: 'Forest' },
  ];

  return (
    <div
      className="min-h-screen pb-20"
      style={{
        backgroundColor: colors.background,
        color: colors.foreground,
      }}
    >
      <div className="px-6 pt-12 pb-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold flex-1" style={{ fontFamily: 'Syne, sans-serif' }}>
            Appearance
          </h1>
          <div className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: colors.card, color: colors.accent }}>
            {theme.mode === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </div>
        </div>

        {/* Theme Mode */}
        <div className="mb-8">
          <h2 className="font-semibold mb-4">Theme Mode</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMode('dark')}
              className={`p-4 rounded-2xl transition-all ${
                theme.mode === 'dark' ? 'ring-2 ring-offset-2' : ''
              }`}
              style={{
                backgroundColor: theme.mode === 'dark' ? colors.accent : colors.card,
                borderColor: theme.mode === 'dark' ? colors.accent : colors.border,
                outlineColor: theme.mode === 'dark' ? colors.accent : 'transparent',
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <Moon size={24} style={{ color: theme.mode === 'dark' ? 'white' : colors.foreground }} />
                <span className={`text-sm font-medium ${theme.mode === 'dark' ? 'text-white' : ''}`}>
                  Dark
                </span>
              </div>
            </button>
            <button
              onClick={() => setMode('light')}
              className={`p-4 rounded-2xl transition-all ${
                theme.mode === 'light' ? 'ring-2 ring-offset-2' : ''
              }`}
              style={{
                backgroundColor: theme.mode === 'light' ? colors.accent : colors.card,
                borderColor: theme.mode === 'light' ? colors.accent : colors.border,
                outlineColor: theme.mode === 'light' ? colors.accent : 'transparent',
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <Sun size={24} style={{ color: theme.mode === 'light' ? 'white' : colors.foreground }} />
                <span className={`text-sm font-medium ${theme.mode === 'light' ? 'text-white' : ''}`}>
                  Light
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Accent Color */}
        <div className="mb-8">
          <h2 className="font-semibold mb-4">Accent Color</h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {accentColors.map((accent) => (
              <button
                key={accent.name}
                onClick={() => setAccent(accent.name as any)}
                className={`relative p-3 sm:p-4 rounded-2xl transition-all ${
                  theme.accent === accent.name ? 'ring-2 ring-offset-2' : ''
                }`}
                style={{
                  backgroundColor: accent.value,
                  borderColor: theme.accent === accent.name ? accent.value : 'transparent',
                  outlineColor: accent.value,
                }}
              >
                <div className="w-full h-6 sm:h-8 rounded-full bg-white/20 flex items-center justify-center">
                  {theme.accent === accent.name && (
                    <>
                      <Check size={12} className="sm:hidden text-white" />
                      <Check size={16} className="hidden sm:block text-white" />
                    </>
                  )}
                </div>
                <div className="text-xs text-white mt-2 text-center font-medium">
                  {accent.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Gradient Style */}
        <div className="mb-8">
          <h2 className="font-semibold mb-4">Card Gradient</h2>
          <div className="space-y-3">
            {gradients.map((gradient) => (
              <button
                key={gradient.name}
                onClick={() => setGradient(gradient.name as any)}
                className={`relative w-full p-4 rounded-2xl transition-all ${
                  theme.gradient === gradient.name ? 'ring-2 ring-offset-2' : ''
                }`}
                style={{
                  background: gradient.value,
                  borderColor: theme.gradient === gradient.name ? colors.accent : 'transparent',
                  outlineColor: colors.accent,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: theme.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      {theme.gradient === gradient.name && (
                        <Check size={20} style={{ color: colors.accent }} />
                      )}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm" 
                           style={{ 
                             color: theme.mode === 'light' ? '#0A0A0A' : '#F5F5F5' 
                           }}>
                        {gradient.label}
                      </div>
                      <div className="text-xs opacity-70"
                           style={{ 
                             color: theme.mode === 'light' ? '#0A0A0A' : '#F5F5F5' 
                           }}>
                        {gradient.name}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs px-2 py-1 rounded-full"
                       style={{
                         backgroundColor: theme.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
                         color: theme.mode === 'light' ? '#0A0A0A' : '#F5F5F5',
                       backdropFilter: 'blur(10px)',
                       border: `1px solid ${theme.mode === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'}`,
                       }}>
                    {theme.gradient === gradient.name ? 'Selected' : 'Preview'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Preview Card */}
        <div className="mb-8">
          <h2 className="font-semibold mb-4">Preview</h2>
          <GlassCard className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs uppercase tracking-wider opacity-80 mb-1">
                  Total Balance
                </div>
                <div className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
                  GH₵ 4,820.50
                </div>
                <div className="text-sm opacity-70 font-mono">
                  @kwame.azaman
                </div>
              </div>
              <div className="px-2 py-1 rounded-full text-xs font-medium text-green-300">
                +2.4%
              </div>
            </div>
            <div className="h-px mb-3" style={{ backgroundColor: colors.border }} />
            <div className="grid grid-cols-3 gap-3">
              <div>
                <div className="text-xs opacity-70">Savings</div>
                <div className="text-sm font-semibold text-green-300">
                  GH₵ 2,150
                </div>
              </div>
              <div>
                <div className="text-xs opacity-70">Invested</div>
                <div className="text-sm font-semibold text-blue-300">
                  GH₵ 800
                </div>
              </div>
              <div>
                <div className="text-xs opacity-70">Spent</div>
                <div className="text-sm font-semibold text-red-300">
                  GH₵ 1,230
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <AccentButton className="w-full">
            Save Preferences
          </AccentButton>
          <AccentButton 
            variant="ghost" 
            className="w-full"
            onClick={() => {
              setMode('dark');
              setAccent('gold');
              setGradient('obsidian');
            }}
          >
            Reset to Default
          </AccentButton>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
