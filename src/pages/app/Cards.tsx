import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard, Plus, Eye, EyeOff, Lock, Unlock, Copy, Snowflake,
  ShoppingBag, Wifi, Globe, Shield, ArrowUpRight, ArrowDownLeft, MoreHorizontal, Check
} from 'lucide-react';
import { useAppStore } from '@/stores/appStore';

interface VirtualCard {
  id: string;
  name: string;
  last4: string;
  type: 'visa' | 'mastercard';
  balance: number;
  currency: string;
  color: 'orange' | 'cyan' | 'blue';
  frozen: boolean;
  expiresMonth: string;
  expiresYear: string;
  cvv: string;
  fullNumber: string;
}

const mockCards: VirtualCard[] = [
  {
    id: '1',
    name: 'Everyday Card',
    last4: '4829',
    type: 'visa',
    balance: 2450.00,
    currency: 'GH₵',
    color: 'orange',
    frozen: false,
    expiresMonth: '09',
    expiresYear: '28',
    cvv: '412',
    fullNumber: '4532 8901 2345 4829',
  },
  {
    id: '2',
    name: 'Online Shopping',
    last4: '7713',
    type: 'mastercard',
    balance: 850.50,
    currency: 'GH₵',
    color: 'cyan',
    frozen: false,
    expiresMonth: '03',
    expiresYear: '27',
    cvv: '889',
    fullNumber: '5412 7501 3344 7713',
  },
  {
    id: '3',
    name: 'Savings Card',
    last4: '0091',
    type: 'visa',
    balance: 5200.00,
    currency: 'GH₵',
    color: 'blue',
    frozen: true,
    expiresMonth: '12',
    expiresYear: '29',
    cvv: '230',
    fullNumber: '4111 2200 9988 0091',
  },
];

const recentTx = [
  { id: '1', merchant: 'Melcom Online', amount: -125.00, date: 'Today, 2:14 PM', icon: '🛒', type: 'out' as const },
  { id: '2', merchant: 'MTN MoMo Top Up', amount: -50.00, date: 'Today, 11:30 AM', icon: '📱', type: 'out' as const },
  { id: '3', merchant: '@ama.azaman', amount: 300.00, date: 'Yesterday', icon: '💸', type: 'in' as const },
  { id: '4', merchant: 'Bolt Rides', amount: -18.50, date: 'Yesterday', icon: '🚗', type: 'out' as const },
  { id: '5', merchant: 'Jumia Ghana', amount: -89.00, date: 'Mar 28', icon: '📦', type: 'out' as const },
];

const cardGradients = {
  orange: 'from-[hsl(16,99%,60%)] to-[hsl(36,99%,60%)]',
  cyan: 'from-[hsl(192,100%,50%)] to-[hsl(212,100%,50%)]',
  blue: 'from-[hsl(212,100%,50%)] to-[hsl(232,80%,45%)]',
};

const AppCards = () => {
  const [selectedCard, setSelectedCard] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [cards, setCards] = useState(mockCards);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCardName, setNewCardName] = useState('');
  const [newCardColor, setNewCardColor] = useState<'orange' | 'cyan' | 'blue'>('orange');

  const activeCard = cards[selectedCard];

  const toggleFreeze = () => {
    setCards(prev => prev.map((c, i) =>
      i === selectedCard ? { ...c, frozen: !c.frozen } : c
    ));
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ''));
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const createCard = () => {
    if (!newCardName.trim()) return;
    const newCard: VirtualCard = {
      id: String(Date.now()),
      name: newCardName,
      last4: String(Math.floor(1000 + Math.random() * 9000)),
      type: Math.random() > 0.5 ? 'visa' : 'mastercard',
      balance: 0,
      currency: 'GH₵',
      color: newCardColor,
      frozen: false,
      expiresMonth: '04',
      expiresYear: '30',
      cvv: String(Math.floor(100 + Math.random() * 900)),
      fullNumber: `${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
    };
    setCards(prev => [...prev, newCard]);
    setSelectedCard(cards.length);
    setShowCreateModal(false);
    setNewCardName('');
  };

  return (
    <div className="px-4 py-6 space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-extrabold text-xl text-foreground">Your Cards</h1>
          <p className="text-xs text-muted-foreground font-body mt-1">Manage your virtual cards for online and in-store payments</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary"
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Card Carousel */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedCard(idx)}
              className={`snap-center flex-shrink-0 w-[300px] sm:w-[340px] cursor-pointer`}
            >
              <div
                className={`relative rounded-2xl p-5 h-[190px] bg-gradient-to-br ${cardGradients[card.color]} overflow-hidden transition-all duration-300 ${
                  selectedCard === idx ? 'ring-2 ring-foreground/20 shadow-2xl' : 'opacity-70 scale-[0.97]'
                }`}
                style={{
                  animation: selectedCard === idx && !card.frozen ? 'afro-pulse 3s ease-in-out infinite' : 'none',
                }}
              >
                {/* Decorative rings */}
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full border border-white/10" style={{ animation: 'ring-pulse 3s ease-out infinite' }} />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border border-white/10" style={{ animation: 'ring-pulse 3s ease-out infinite 1.5s' }} />

                {/* Shimmer overlay */}
                {!card.frozen && (
                  <div
                    className="absolute inset-0 rounded-2xl opacity-20"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 4s ease-in-out infinite',
                    }}
                  />
                )}

                {/* Frozen overlay */}
                {card.frozen && (
                  <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center z-10">
                    <div className="flex items-center gap-2 glass-card px-4 py-2">
                      <Snowflake className="w-4 h-4 text-cyan" />
                      <span className="text-sm font-body font-medium text-white">Frozen</span>
                    </div>
                  </div>
                )}

                {/* Card Content */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white/70 text-[10px] uppercase tracking-widest font-body">{card.name}</p>
                      <Wifi className="w-5 h-5 text-white/50 mt-2 rotate-90" />
                    </div>
                    <span className="text-white/80 font-display font-extrabold text-xs">
                      {card.type === 'visa' ? 'VISA' : 'MC'}
                    </span>
                  </div>

                  <div>
                    <p className="text-white font-mono text-sm tracking-[3px] mb-3">
                      {showDetails && selectedCard === idx ? card.fullNumber : `•••• •••• •••• ${card.last4}`}
                    </p>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-white/50 text-[9px] uppercase tracking-wider font-body">Balance</p>
                        <p className="text-white font-display font-extrabold text-lg">{card.currency} {card.balance.toLocaleString('en-GH', { minimumFractionDigits: 2 })}</p>
                      </div>
                      <p className="text-white/60 text-xs font-mono">{card.expiresMonth}/{card.expiresYear}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add New Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: cards.length * 0.1 }}
            onClick={() => setShowCreateModal(true)}
            className="snap-center flex-shrink-0 w-[300px] sm:w-[340px] cursor-pointer"
          >
            <div className="rounded-2xl h-[190px] border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center gap-3 hover:border-primary/40 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center" style={{ animation: 'afro-glow 2.5s ease-in-out infinite' }}>
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <p className="text-muted-foreground text-sm font-body">Create new card</p>
            </div>
          </motion.div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-2">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCard(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                selectedCard === idx ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      {activeCard && (
        <motion.div
          key={activeCard.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-4 gap-3"
        >
          {[
            { icon: showDetails ? EyeOff : Eye, label: showDetails ? 'Hide' : 'Reveal', action: () => setShowDetails(!showDetails) },
            { icon: activeCard.frozen ? Unlock : Snowflake, label: activeCard.frozen ? 'Unfreeze' : 'Freeze', action: toggleFreeze },
            { icon: Copy, label: 'Copy No.', action: () => handleCopy(activeCard.fullNumber, 'number') },
            { icon: Shield, label: 'Security', action: () => {} },
          ].map((btn, i) => (
            <motion.button
              key={btn.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={btn.action}
              className="flex flex-col items-center gap-2 py-3 rounded-2xl glass-card hover:border-primary/30 transition-all"
              style={{ animation: `afro-bounce 2s ease-in-out ${i * 0.15}s infinite` }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <btn.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-[10px] text-muted-foreground font-body font-medium">
                {copied === 'number' && btn.label === 'Copy No.' ? 'Copied!' : btn.label}
              </span>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Card Details Reveal */}
      <AnimatePresence>
        {showDetails && activeCard && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="glass-card p-4 space-y-3">
              <h3 className="font-display font-bold text-sm text-foreground">Card Details</h3>
              {[
                { label: 'Card Number', value: activeCard.fullNumber, copyKey: 'number' },
                { label: 'Expiry', value: `${activeCard.expiresMonth}/${activeCard.expiresYear}`, copyKey: 'expiry' },
                { label: 'CVV', value: activeCard.cvv, copyKey: 'cvv' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-body">{item.label}</p>
                    <p className="text-sm font-mono text-foreground">{item.value}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(item.value, item.copyKey)}
                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
                  >
                    {copied === item.copyKey ? <Check className="w-3 h-3 text-cyan" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spending Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-sm text-foreground">This Month</h2>
          <span className="text-xs text-muted-foreground font-body">March 2026</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Spent', value: 'GH₵ 1,245', color: 'text-orange' },
            { label: 'Received', value: 'GH₵ 3,100', color: 'text-cyan' },
            { label: 'Limit Left', value: 'GH₵ 755', color: 'text-muted-foreground' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass-card p-3 text-center"
            >
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-body mb-1">{stat.label}</p>
              <p className={`font-display font-extrabold text-base ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-sm text-foreground">Recent Activity</h2>
          <button className="text-xs text-primary font-body font-medium">See all</button>
        </div>
        <div className="space-y-2">
          {recentTx.map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className="glass-card p-3 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
                {tx.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-body font-medium text-foreground truncate">{tx.merchant}</p>
                <p className="text-[10px] text-muted-foreground font-body">{tx.date}</p>
              </div>
              <div className="flex items-center gap-1">
                {tx.type === 'in' ? (
                  <ArrowDownLeft className="w-3 h-3 text-cyan" />
                ) : (
                  <ArrowUpRight className="w-3 h-3 text-orange" />
                )}
                <span className={`font-display font-bold text-sm ${tx.type === 'in' ? 'text-cyan' : 'text-foreground'}`}>
                  {tx.type === 'in' ? '+' : ''}{tx.amount < 0 ? '-' : ''}GH₵ {Math.abs(tx.amount).toFixed(2)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Create Card Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 px-4 pb-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md glass-card p-6 space-y-5 rounded-t-[28px] sm:rounded-2xl"
              style={{ animation: 'afro-pulse 4s ease-in-out infinite' }}
            >
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30 mx-auto sm:hidden" />
              <h2 className="font-display font-extrabold text-lg text-foreground text-center">Create Virtual Card</h2>

              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider font-body block mb-2">Card Name</label>
                <input
                  type="text"
                  value={newCardName}
                  onChange={(e) => setNewCardName(e.target.value)}
                  placeholder="e.g. Travel Fund, Shopping..."
                  className="w-full bg-secondary rounded-xl px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider font-body block mb-3">Card Color</label>
                <div className="flex gap-3">
                  {(['orange', 'cyan', 'blue'] as const).map(color => (
                    <button
                      key={color}
                      onClick={() => setNewCardColor(color)}
                      className={`flex-1 h-14 rounded-xl bg-gradient-to-br ${cardGradients[color]} transition-all ${
                        newCardColor === color ? 'ring-2 ring-foreground/30 scale-105' : 'opacity-60'
                      }`}
                      style={newCardColor === color ? { animation: 'afro-glow 2s ease-in-out infinite' } : {}}
                    />
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={createCard}
                disabled={!newCardName.trim()}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-amber font-display font-bold text-sm text-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Create Card
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppCards;
