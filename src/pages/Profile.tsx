import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { AccentButton } from '@/components/ui/AccentButton';
import { ArrowLeft, User, Settings, LogOut, ChevronRight, Star, Briefcase, CreditCard, QrCode, Share2 } from 'lucide-react';
import { mockUser } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();

  const profileSections = [
    {
      title: 'Account',
      items: [
        {
          id: 'transaction-history',
          label: 'Transaction History',
          icon: <CreditCard size={20} />,
          description: 'View and export your transactions',
        },
        {
          id: 'spending-limits',
          label: 'Spending Limits',
          icon: <Settings size={20} />,
          description: 'Set and manage your spending limits',
        },
        {
          id: 'budget-templates',
          label: 'Budget Templates',
          icon: <Briefcase size={20} />,
          description: 'Create and manage budgets',
        },
        {
          id: 'crowdfunding',
          label: 'Crowdfunding Campaigns',
          icon: <Star size={20} />,
          description: 'Manage your campaigns and donations',
        },
        {
          id: 'investments',
          label: 'Investments',
          icon: <Briefcase size={20} />,
          description: 'View your investment portfolio',
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          id: 'appearance',
          label: 'Appearance',
          icon: <Settings size={20} />,
          description: 'Customize themes and colors',
        },
        {
          id: 'notifications',
          label: 'Notifications',
          icon: <Settings size={20} />,
          description: 'Manage notification preferences',
        },
        {
          id: 'news',
          label: 'News',
          icon: <Briefcase size={20} />,
          description: 'Financial news and updates',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'privacy-security',
          label: 'Privacy & Security',
          icon: <Settings size={20} />,
          description: 'Manage your privacy and security',
        },
        {
          id: 'help-support',
          label: 'Help & Support',
          icon: <User size={20} />,
          description: 'Get help and contact support',
        },
      ],
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(`/${path}`);
  };

  return (
    <div
      className="min-h-screen pb-20"
      style={{
        backgroundColor: colors.background,
        color: colors.foreground,
      }}
    >
      <div className="px-4 sm:px-6 pt-12 pb-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => navigate('/home')}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold flex-1" style={{ fontFamily: 'Syne, sans-serif' }}>
            Profile
          </h1>
        </div>

        {/* Profile Info */}
        <GlassCard className="p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold"
              style={{
                background: colors.gradient,
                color: 'white',
              }}
            >
              {mockUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
                {mockUser.name}
              </h2>
              <p className="text-sm opacity-70">@{mockUser.username}</p>
              <p className="text-xs opacity-60">{mockUser.university}</p>
            </div>
          </div>

          {/* Account Type Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="px-3 py-1 rounded-full text-xs font-medium text-green-300 bg-green-500/20">
              Personal Account
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-medium text-yellow-300 bg-yellow-500/20">
              ✦ Business Account
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
                GH₵{mockUser.balance.toLocaleString()}
              </div>
              <div className="text-xs opacity-70">Balance</div>
            </div>
            <div>
              <div className="text-lg font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
                {mockUser.referralCount}
              </div>
              <div className="text-xs opacity-70">Referrals</div>
            </div>
            <div>
              <div className="text-lg font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
                GH₵{mockUser.referralEarnings}
              </div>
              <div className="text-xs opacity-70">Earned</div>
            </div>
          </div>
        </GlassCard>

        {/* Payment Links */}
        <GlassCard className="p-4 mb-6">
          <h3 className="font-semibold mb-3">Payment Links</h3>
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <User size={16} className="opacity-60" />
                <div>
                  <div className="text-sm font-medium">App Link</div>
                  <div className="text-xs opacity-70 font-mono">azaman.app/@{mockUser.username}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-1 rounded hover:bg-white/5 transition-colors">
                  <QrCode size={16} />
                </button>
                <button className="p-1 rounded hover:bg-white/5 transition-colors">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <CreditCard size={16} className="opacity-60" />
                <div>
                  <div className="text-sm font-medium">MoMo Link</div>
                  <div className="text-xs opacity-70 font-mono">{mockUser.username}.azaman</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-1 rounded hover:bg-white/5 transition-colors">
                  <QrCode size={16} />
                </button>
                <button className="p-1 rounded hover:bg-white/5 transition-colors">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Menu Sections */}
        {profileSections.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="font-semibold mb-3 opacity-70">{section.title}</h3>
            <div className="space-y-2">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className="w-full"
                >
                  <GlassCard className="p-4 hover:bg-white/5 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: colors.card,
                            border: `1px solid ${colors.border}`,
                          }}
                        >
                          {item.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-sm">{item.label}</div>
                          <div className="text-xs opacity-70">{item.description}</div>
                        </div>
                      </div>
                      <ChevronRight size={16} className="opacity-60" />
                    </div>
                  </GlassCard>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <AccentButton variant="ghost" className="w-full text-red-400" style={{ color: '#FF3B3B' }}>
          <LogOut size={16} className="mr-2" />
          Logout
        </AccentButton>
      </div>
    </div>
  );
};

export default Profile;
