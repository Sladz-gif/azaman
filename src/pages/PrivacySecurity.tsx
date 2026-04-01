import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { AccentButton } from '@/components/ui/AccentButton';
import { ArrowLeft, Shield, Lock, Eye, EyeOff, Key, Smartphone, Mail, AlertTriangle, Check } from 'lucide-react';

const PrivacySecurity: React.FC = () => {
  const { colors } = useTheme();
  const [showPin, setShowPin] = useState(false);
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  const securitySettings = [
    {
      id: '1',
      name: 'Change PIN',
      description: 'Update your 4-digit transaction PIN',
      icon: <Key size={20} />,
      action: 'change_pin',
    },
    {
      id: '2',
      name: 'Two-Factor Authentication',
      description: 'Add an extra layer of security',
      icon: <Shield size={20} />,
      action: '2fa',
      enabled: twoFactorEnabled,
    },
    {
      id: '3',
      name: 'Biometric Login',
      description: 'Use fingerprint or face recognition',
      icon: <Smartphone size={20} />,
      action: 'biometric',
      enabled: biometricEnabled,
    },
    {
      id: '4',
      name: 'Show Balance',
      description: 'Display balance on home screen',
      icon: <Eye size={20} />,
      action: 'show_balance',
      enabled: showBalance,
    },
  ];

  const privacySettings = [
    {
      id: '1',
      name: 'Profile Visibility',
      description: 'Control who can see your profile',
      value: 'Everyone',
      options: ['Everyone', 'Contacts Only', 'Private'],
    },
    {
      id: '2',
      name: 'Transaction History',
      description: 'Who can see your transactions',
      value: 'Private',
      options: ['Everyone', 'Contacts Only', 'Private'],
    },
    {
      id: '3',
      name: 'Search Discovery',
      description: 'Appear in search results',
      value: 'Everyone',
      options: ['Everyone', 'Contacts Only', 'Private'],
    },
    {
      id: '4',
      name: 'Data Sharing',
      description: 'Share anonymous usage data',
      value: 'No',
      options: ['Yes', 'No'],
    },
  ];

  const toggleSetting = (action: string, enabled?: boolean) => {
    switch (action) {
      case '2fa':
        setTwoFactorEnabled(!twoFactorEnabled);
        break;
      case 'biometric':
        setBiometricEnabled(!biometricEnabled);
        break;
      case 'show_balance':
        setShowBalance(!showBalance);
        break;
      case 'change_pin':
        // Handle PIN change
        break;
    }
  };

  const handlePinChange = () => {
    if (newPin === confirmPin && newPin.length === 4) {
      // Handle PIN update
      setCurrentPin('');
      setNewPin('');
      setConfirmPin('');
    }
  };

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
            Privacy & Security
          </h1>
        </div>

        {/* Security Status */}
        <GlassCard className="p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.accent, color: 'white' }}
            >
              <Shield size={24} />
            </div>
            <div>
              <h2 className="font-semibold">Security Status</h2>
              <p className="text-sm opacity-70">Your account is well protected</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-xs opacity-70 mb-1">PIN</div>
              <div className="text-sm font-semibold text-green-400">Active</div>
            </div>
            <div>
              <div className="text-xs opacity-70 mb-1">2FA</div>
              <div className={`text-sm font-semibold ${twoFactorEnabled ? 'text-green-400' : 'text-orange-400'}`}>
                {twoFactorEnabled ? 'Active' : 'Off'}
              </div>
            </div>
            <div>
              <div className="text-xs opacity-70 mb-1">Last Login</div>
              <div className="text-sm font-semibold">2 hrs ago</div>
            </div>
          </div>
        </GlassCard>

        {/* Security Settings */}
        <div className="mb-8">
          <h2 className="font-semibold mb-4">Security</h2>
          <div className="space-y-3">
            {securitySettings.map((setting) => (
              <GlassCard key={setting.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: setting.enabled !== undefined && setting.enabled ? colors.accent : colors.card,
                        color: setting.enabled !== undefined && setting.enabled ? 'white' : colors.foreground,
                      }}
                    >
                      {setting.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{setting.name}</div>
                      <div className="text-xs opacity-70">{setting.description}</div>
                    </div>
                  </div>
                  {setting.enabled !== undefined ? (
                    <button
                      onClick={() => toggleSetting(setting.action)}
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
                        style={{ backgroundColor: 'white' }}
                      />
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleSetting(setting.action)}
                      className="text-sm opacity-70"
                      style={{ color: colors.accent }}
                    >
                      Change
                    </button>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="mb-8">
          <h2 className="font-semibold mb-4">Privacy</h2>
          <div className="space-y-3">
            {privacySettings.map((setting) => (
              <GlassCard key={setting.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{setting.name}</div>
                    <div className="text-xs opacity-70">{setting.description}</div>
                  </div>
                  <select
                    value={setting.value}
                    className="px-3 py-1 rounded-full text-sm outline-none"
                    style={{
                      backgroundColor: colors.card,
                      border: `1px solid ${colors.border}`,
                      color: colors.foreground,
                    }}
                  >
                    {setting.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Login Activity */}
        <div className="mb-8">
          <h2 className="font-semibold mb-4">Recent Activity</h2>
          <GlassCard className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b last:border-b-0" 
                   style={{ borderColor: colors.border }}>
                <div className="flex items-center gap-3">
                  <Smartphone size={16} className="opacity-60" />
                  <div>
                    <div className="text-sm">Mobile App - iPhone</div>
                    <div className="text-xs opacity-70">Accra, Ghana • 2 hours ago</div>
                  </div>
                </div>
                <div className="text-xs text-green-400">Current</div>
              </div>
              <div className="flex items-center justify-between py-2 border-b last:border-b-0" 
                   style={{ borderColor: colors.border }}>
                <div className="flex items-center gap-3">
                  <Smartphone size={16} className="opacity-60" />
                  <div>
                    <div className="text-sm">Mobile App - iPhone</div>
                    <div className="text-xs opacity-70">Accra, Ghana • Yesterday</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Smartphone size={16} className="opacity-60" />
                  <div>
                    <div className="text-sm">Web Browser</div>
                    <div className="text-xs opacity-70">Accra, Ghana • 2 days ago</div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Danger Zone */}
        <div>
          <h2 className="font-semibold mb-4 text-red-400">Danger Zone</h2>
          <GlassCard className="p-4 border border-red-500/20">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <AlertTriangle size={20} className="text-red-400" />
                <div>
                  <div className="font-medium text-sm">Account Deletion</div>
                  <div className="text-xs opacity-70">Permanently delete your account and data</div>
                </div>
              </div>
              <AccentButton 
                variant="ghost"
                className="w-full text-red-400"
                style={{ color: '#FF3B3B' }}
              >
                Delete Account
              </AccentButton>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* PIN Change Modal */}
      {showPin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
             style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <GlassCard className="w-full max-w-md p-6">
            <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              Change PIN
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm opacity-70 mb-2 block">Current PIN</label>
                <input
                  type="password"
                  value={currentPin}
                  onChange={(e) => setCurrentPin(e.target.value)}
                  placeholder="****"
                  maxLength={4}
                  className="w-full rounded-2xl py-3 px-4 text-sm outline-none transition-all"
                  style={{
                    backgroundColor: colors.card,
                    border: `1px solid ${colors.border}`,
                    color: colors.foreground,
                  }}
                />
              </div>

              <div>
                <label className="text-sm opacity-70 mb-2 block">New PIN</label>
                <input
                  type="password"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="****"
                  maxLength={4}
                  className="w-full rounded-2xl py-3 px-4 text-sm outline-none transition-all"
                  style={{
                    backgroundColor: colors.card,
                    border: `1px solid ${colors.border}`,
                    color: colors.foreground,
                  }}
                />
              </div>

              <div>
                <label className="text-sm opacity-70 mb-2 block">Confirm New PIN</label>
                <input
                  type="password"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  placeholder="****"
                  maxLength={4}
                  className="w-full rounded-2xl py-3 px-4 text-sm outline-none transition-all"
                  style={{
                    backgroundColor: colors.card,
                    border: `1px solid ${colors.border}`,
                    color: colors.foreground,
                  }}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <AccentButton 
                onClick={handlePinChange}
                disabled={!currentPin || !newPin || !confirmPin || newPin !== confirmPin}
                className="flex-1"
              >
                Update PIN
              </AccentButton>
              <AccentButton 
                variant="ghost"
                onClick={() => setShowPin(false)}
                className="flex-1"
              >
                Cancel
              </AccentButton>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default PrivacySecurity;
