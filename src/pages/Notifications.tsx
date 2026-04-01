import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { AccentButton } from '@/components/ui/AccentButton';
import { ArrowLeft, Bell, BellOff, DollarSign, TrendingUp, AlertTriangle, Heart, Calendar } from 'lucide-react';

interface NotificationSetting {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  category: 'transactions' | 'savings' | 'investments' | 'social' | 'system';
}

const Notifications: React.FC = () => {
  const { colors } = useTheme();
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: '1',
      name: 'Money Received',
      description: 'When someone sends you money',
      icon: <DollarSign size={20} />,
      enabled: true,
      category: 'transactions',
    },
    {
      id: '2',
      name: 'Money Sent',
      description: 'When you send money to someone',
      icon: <DollarSign size={20} />,
      enabled: true,
      category: 'transactions',
    },
    {
      id: '3',
      name: 'Transaction Failed',
      description: 'When a transaction doesn\'t go through',
      icon: <AlertTriangle size={20} />,
      enabled: true,
      category: 'transactions',
    },
    {
      id: '4',
      name: 'Savings Goal Progress',
      description: 'Weekly updates on your savings goals',
      icon: <TrendingUp size={20} />,
      enabled: true,
      category: 'savings',
    },
    {
      id: '5',
      name: 'Goal Missed',
      description: 'When you miss a savings contribution',
      icon: <AlertTriangle size={20} />,
      enabled: true,
      category: 'savings',
    },
    {
      id: '6',
      name: 'Goal Completed',
      description: 'When you reach a savings goal',
      icon: <Heart size={20} />,
      enabled: true,
      category: 'savings',
    },
    {
      id: '7',
      name: 'Investment Returns',
      description: 'Monthly investment performance updates',
      icon: <TrendingUp size={20} />,
      enabled: false,
      category: 'investments',
    },
    {
      id: '8',
      name: 'New Investment Opportunities',
      description: 'When new investment options are available',
      icon: <DollarSign size={20} />,
      enabled: false,
      category: 'investments',
    },
    {
      id: '9',
      name: 'Reactions to Transactions',
      description: 'When someone reacts to your transactions',
      icon: <Heart size={20} />,
      enabled: true,
      category: 'social',
    },
    {
      id: '10',
      name: 'Campaign Updates',
      description: 'Updates from crowdfunding campaigns you support',
      icon: <Heart size={20} />,
      enabled: true,
      category: 'social',
    },
    {
      id: '11',
      name: 'Event Reminders',
      description: 'Reminders for upcoming events and tickets',
      icon: <Calendar size={20} />,
      enabled: true,
      category: 'social',
    },
    {
      id: '12',
      name: 'System Updates',
      description: 'Important app updates and announcements',
      icon: <Bell size={20} />,
      enabled: true,
      category: 'system',
    },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(setting => 
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  const toggleCategory = (category: string, enabled: boolean) => {
    setSettings(settings.map(setting => 
      setting.category === category ? { ...setting, enabled } : setting
    ));
  };

  const enabledCount = settings.filter(s => s.enabled).length;

  const categories = [
    { key: 'transactions', name: 'Transactions', icon: <DollarSign size={16} /> },
    { key: 'savings', name: 'Savings & Goals', icon: <TrendingUp size={16} /> },
    { key: 'investments', name: 'Investments', icon: <DollarSign size={16} /> },
    { key: 'social', name: 'Social', icon: <Heart size={16} /> },
    { key: 'system', name: 'System', icon: <Bell size={16} /> },
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
            Notifications
          </h1>
          <div className="text-sm opacity-70">
            {enabledCount} enabled
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mb-6">
          <AccentButton 
            className="flex-1 text-sm"
            onClick={() => toggleCategory('all', true)}
          >
            Enable All
          </AccentButton>
          <AccentButton 
            variant="ghost"
            className="flex-1 text-sm"
            onClick={() => toggleCategory('all', false)}
          >
            Disable All
          </AccentButton>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          {categories.map((category) => {
            const categorySettings = settings.filter(s => s.category === category.key);
            const categoryEnabled = categorySettings.some(s => s.enabled);

            return (
              <div key={category.key}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div style={{ color: colors.accent }}>
                      {category.icon}
                    </div>
                    <h2 className="font-semibold">{category.name}</h2>
                  </div>
                  <button
                    onClick={() => toggleCategory(category.key, !categoryEnabled)}
                    className={`px-3 py-1 rounded-full text-xs transition-all ${
                      categoryEnabled ? 'text-white' : ''
                    }`}
                    style={{
                      backgroundColor: categoryEnabled ? colors.accent : colors.card,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    {categoryEnabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                <div className="space-y-3">
                  {categorySettings.map((setting) => (
                    <GlassCard key={setting.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{
                              backgroundColor: setting.enabled ? colors.accent : colors.card,
                              color: setting.enabled ? 'white' : colors.foreground,
                            }}
                          >
                            {setting.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{setting.name}</div>
                            <div className="text-xs opacity-70">{setting.description}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleSetting(setting.id)}
                          className={`w-12 h-6 rounded-full transition-all relative ${
                            setting.enabled ? '' : ''
                          }`}
                          style={{
                            backgroundColor: setting.enabled ? colors.accent : colors.card,
                            border: `1px solid ${colors.border}`,
                          }}
                        >
                          <div 
                            className={`absolute top-1 w-4 h-4 rounded-full transition-all ${
                              setting.enabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                            style={{
                              backgroundColor: 'white',
                            }}
                          />
                        </button>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Notification Preferences */}
        <GlassCard className="p-4 mt-6">
          <h3 className="font-semibold mb-3">Quiet Hours</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Enable Quiet Hours</div>
                <div className="text-xs opacity-70">Silence notifications during specific times</div>
              </div>
              <button
                className={`w-12 h-6 rounded-full transition-all relative`}
                style={{
                  backgroundColor: colors.card,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div 
                  className="absolute top-1 left-1 w-4 h-4 rounded-full transition-all"
                  style={{ backgroundColor: 'white' }}
                />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs opacity-70 mb-1 block">From</label>
                <input
                  type="time"
                  defaultValue="22:00"
                  className="w-full rounded-lg py-2 px-3 text-sm outline-none"
                  style={{
                    backgroundColor: colors.background,
                    border: `1px solid ${colors.border}`,
                    color: colors.foreground,
                  }}
                />
              </div>
              <div>
                <label className="text-xs opacity-70 mb-1 block">To</label>
                <input
                  type="time"
                  defaultValue="08:00"
                  className="w-full rounded-lg py-2 px-3 text-sm outline-none"
                  style={{
                    backgroundColor: colors.background,
                    border: `1px solid ${colors.border}`,
                    color: colors.foreground,
                  }}
                />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Save Button */}
        <AccentButton className="w-full mt-6">
          Save Preferences
        </AccentButton>
      </div>
    </div>
  );
};

export default Notifications;
