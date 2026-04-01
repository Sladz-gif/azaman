import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Share2, ChevronRight, LogOut, Palette, Bell, Shield, HelpCircle, FileText, TrendingUp, Users, CreditCard, Settings2, Newspaper } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { accentColors, gradientStyles, useThemeStore } from '@/stores/themeStore';

const AppProfile = () => {
  const { user } = useAppStore();
  const navigate = useNavigate();
  const [showAppearance, setShowAppearance] = useState(false);
  const { accent, setAccent, gradient, setGradient } = useThemeStore();

  const copyLink = () => {
    navigator.clipboard.writeText(`azaman.app/@${user.username}`);
    toast({ title: 'Copied!', description: `azaman.app/@${user.username}` });
  };

  const settingsItems = [
    { icon: FileText, label: 'Transaction History', action: () => toast({ title: 'Coming soon', description: 'Download PDF and CSV exports' }) },
    { icon: CreditCard, label: 'Spending Limits', action: () => toast({ title: 'Coming soon', description: 'Set limits per category' }) },
    { icon: Settings2, label: 'Budget Templates', action: () => toast({ title: 'Coming soon', description: '5 budget templates for every situation' }) },
    { icon: Users, label: 'Crowdfunding Campaigns', action: () => toast({ title: 'Coming soon', description: 'Create and manage campaigns' }) },
    { icon: TrendingUp, label: 'Investments', action: () => toast({ title: 'Coming soon', description: 'Treasury bills and fixed deposits' }) },
    { icon: Palette, label: 'Appearance', action: () => setShowAppearance(!showAppearance) },
    { icon: Bell, label: 'Notifications', action: () => toast({ title: 'Coming soon' }) },
    { icon: Newspaper, label: 'News', action: () => navigate('/news') },
    { icon: Shield, label: 'Privacy and Security', action: () => toast({ title: 'Coming soon' }) },
    { icon: HelpCircle, label: 'Help and Support', action: () => toast({ title: 'Coming soon' }) },
  ];

  return (
    <div className="p-4 space-y-6 max-w-lg mx-auto">
      {/* Avatar and Name */}
      <div className="text-center space-y-2">
        <div className="w-[72px] h-[72px] rounded-full gradient-gold flex items-center justify-center text-xl font-display font-bold text-primary-foreground mx-auto">
          {user.name.split(' ').map((n) => n[0]).join('')}
        </div>
        <h2 className="font-display font-extrabold text-lg">{user.name}</h2>
        <p className="font-mono text-sm text-muted-foreground">@{user.username}</p>
        <div className="flex gap-2 justify-center">
          <span className="font-body text-[10px] glass px-3 py-1 rounded-full text-neon">Personal</span>
          <span className="font-body text-[10px] glass px-3 py-1 rounded-full text-primary">✦ Business</span>
        </div>
      </div>

      {/* Payment Links */}
      <div className="glass-card p-4 space-y-3">
        <h3 className="font-display font-bold text-sm">Payment Links</h3>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs flex-1 truncate bg-secondary px-3 py-2 rounded-lg">azaman.app/@{user.username}</span>
          <button onClick={copyLink} className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0"><Copy className="w-4 h-4" /></button>
          <button onClick={copyLink} className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0"><Share2 className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Referral */}
      <div className="glass-card p-4 space-y-2">
        <h3 className="font-display font-bold text-sm">Referrals</h3>
        <div className="flex justify-between">
          <span className="font-body text-xs text-muted-foreground">Your code</span>
          <span className="font-mono text-xs text-primary">{user.referralCode}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-body text-xs text-muted-foreground">Friends referred</span>
          <span className="font-body text-xs">{user.referralCount}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-body text-xs text-muted-foreground">Total earned</span>
          <span className="font-display font-bold text-xs text-neon">GH₵ {user.referralEarnings}</span>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-1">
        {settingsItems.map((item, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.98 }}
            onClick={item.action}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/30 transition-colors"
          >
            <item.icon className="w-5 h-5 text-muted-foreground" />
            <span className="font-body text-sm flex-1 text-left">{item.label}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        ))}
      </div>

      {/* Appearance */}
      {showAppearance && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 space-y-4">
          <h3 className="font-display font-bold text-sm">Accent Color</h3>
          <div className="flex gap-3">
            {(Object.entries(accentColors) as [keyof typeof accentColors, typeof accentColors[keyof typeof accentColors]][]).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setAccent(key)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${accent === key ? 'border-foreground scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: val.hex }}
                title={val.label}
              />
            ))}
          </div>
          <h3 className="font-display font-bold text-sm">Gradient</h3>
          <div className="flex gap-2 flex-wrap">
            {(Object.entries(gradientStyles) as [keyof typeof gradientStyles, typeof gradientStyles[keyof typeof gradientStyles]][]).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setGradient(key)}
                className={`h-10 px-4 rounded-xl text-xs font-body border-2 transition-all ${gradient === key ? 'border-foreground' : 'border-transparent'}`}
                style={{ background: `linear-gradient(135deg, ${val.from}, ${val.to})`, color: key === 'chalk' || key === 'marble' ? '#0A0A0A' : '#F5F5F5' }}
              >
                {val.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Logout */}
      <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 p-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors">
        <LogOut className="w-5 h-5" />
        <span className="font-body text-sm">Logout</span>
      </button>
    </div>
  );
};

export default AppProfile;
