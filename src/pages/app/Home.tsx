import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ArrowUpRight, ArrowDownLeft, Smartphone, Plus, ChevronRight } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { useThemeStore, gradientStyles } from '@/stores/themeStore';
import SendMoneyModal from '@/components/SendMoneyModal';
import ReceiveModal from '@/components/ReceiveModal';

const AppHome = () => {
  const { user, transactions, addReaction } = useAppStore();
  const { gradient } = useThemeStore();
  const grad = gradientStyles[gradient];
  const [showSend, setShowSend] = useState(false);
  const [showReceive, setShowReceive] = useState(false);
  const [showReactions, setShowReactions] = useState<string | null>(null);

  const quickActions = [
    { icon: ArrowUpRight, label: 'Send', action: () => setShowSend(true) },
    { icon: ArrowDownLeft, label: 'Receive', action: () => setShowReceive(true) },
    { icon: Smartphone, label: 'MoMo', action: () => {} },
    { icon: Plus, label: 'Top Up', action: () => {} },
  ];

  const reactionEmojis = ['🔥', '😂', '❤️', '💀', '🤝'];

  return (
    <div className="p-4 space-y-6 max-w-lg mx-auto">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-body text-sm text-muted-foreground">Good morning,</p>
          <p className="font-display font-bold text-lg">{user.name.split(' ')[0]}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background" />
          </button>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-xs font-display font-bold text-primary-foreground">
            {user.name.split(' ').map((n) => n[0]).join('')}
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${grad.from}, ${grad.to})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-1">
            <span className="font-body text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Total Balance</span>
            <span className="text-xs font-body text-cyan bg-cyan/10 px-2 py-0.5 rounded-full">+{user.monthChange}%</span>
          </div>
          <p className="font-display font-extrabold text-[38px] leading-tight">
            GH₵ {user.balance.toLocaleString('en-GH', { minimumFractionDigits: 2 })}
          </p>
          <p className="font-mono text-xs text-muted-foreground mt-1">@{user.username}</p>
          <div className="h-px bg-border/50 my-4" />
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="font-body text-[10px] text-muted-foreground uppercase">Savings</p>
              <p className="font-display font-bold text-sm text-cyan">GH₵ {user.savings.toLocaleString()}</p>
            </div>
            <div>
              <p className="font-body text-[10px] text-muted-foreground uppercase">Invested</p>
              <p className="font-display font-bold text-sm text-blue">GH₵ {user.invested.toLocaleString()}</p>
            </div>
            <div>
              <p className="font-body text-[10px] text-muted-foreground uppercase">Spent</p>
              <p className="font-display font-bold text-sm text-destructive">GH₵ {user.spentThisMonth.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3">
        {quickActions.map((action, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.92 }}
            onClick={action.action}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-[52px] h-[52px] rounded-2xl glass flex items-center justify-center hover:border-primary/30 transition-colors">
              <action.icon className="w-5 h-5" />
            </div>
            <span className="font-body text-[10px] text-muted-foreground">{action.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Ad Banner */}
      <div className="glass-card px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-xs font-display font-bold text-primary-foreground shrink-0">AD</div>
        <div className="flex-1 min-w-0">
          <p className="font-body text-xs font-medium truncate">MTN MoMo</p>
          <p className="font-body text-[10px] text-muted-foreground truncate">Send money free this December</p>
        </div>
        <span className="font-body text-[9px] text-muted-foreground glass px-2 py-0.5 rounded-full shrink-0">AD</span>
      </div>

      {/* Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-[15px]">Recent</h3>
          <button className="font-body text-xs text-primary flex items-center gap-1">
            See all <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-1">
          {transactions.slice(0, 5).map((tx) => (
            <div key={tx.id} className="relative">
              <button
                onClick={() => setShowReactions(showReactions === tx.id ? null : tx.id)}
                className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-secondary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-lg shrink-0">{tx.emoji}</div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-body text-sm font-medium truncate">{tx.name}</p>
                  <p className="font-body text-[11px] text-muted-foreground truncate">{tx.date} {tx.note && `· ${tx.note}`}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`font-display font-bold text-sm ${tx.type === 'in' ? 'text-cyan' : 'text-muted-foreground'}`}>
                    {tx.type === 'in' ? '+' : '-'}GH₵ {tx.amount}
                  </p>
                  {tx.reaction && <span className="text-sm">{tx.reaction}</span>}
                </div>
              </button>
              <AnimatePresence>
                {showReactions === tx.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex gap-2 px-3 pb-2"
                  >
                    {reactionEmojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => { addReaction(tx.id, emoji); setShowReactions(null); }}
                        className="text-lg hover:scale-125 transition-transform"
                      >
                        {emoji}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <SendMoneyModal open={showSend} onClose={() => setShowSend(false)} />
      <ReceiveModal open={showReceive} onClose={() => setShowReceive(false)} />
    </div>
  );
};

export default AppHome;
