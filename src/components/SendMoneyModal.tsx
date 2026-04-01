import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { recentRecipients } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

interface Props {
  open: boolean;
  onClose: () => void;
}

const SendMoneyModal = ({ open, onClose }: Props) => {
  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const sendMoney = useAppStore((s) => s.sendMoney);
  const user = useAppStore((s) => s.user);

  const reset = () => { setStep(1); setRecipient(''); setAmount(''); setNote(''); setPin(''); setShowPin(false); };
  const handleClose = () => { reset(); onClose(); };

  const numericKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'];
  const emojiQuick = ['🔥', '🙏', '🎵', '💰', '🤝'];

  const handleKey = (key: string, target: 'amount' | 'pin') => {
    const setter = target === 'amount' ? setAmount : setPin;
    const value = target === 'amount' ? amount : pin;
    if (key === '⌫') { setter(value.slice(0, -1)); return; }
    if (target === 'pin' && value.length >= 4) return;
    if (target === 'amount' && key === '.' && value.includes('.')) return;
    setter(value + key);
  };

  const handleSend = () => {
    if (pin === '1234') {
      sendMoney(recipient, parseFloat(amount), note);
      toast({ title: 'Money sent!', description: `GH₵ ${amount} sent to @${recipient}` });
      handleClose();
    } else {
      toast({ title: 'Wrong PIN', description: 'Please try again', variant: 'destructive' });
      setPin('');
    }
  };

  const selectRecipient = (username: string) => {
    setRecipient(username);
    setStep(2);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-0 left-0 right-0 max-h-[90vh] glass rounded-t-[28px] overflow-hidden"
          >
            <div className="p-4">
              {/* Handle + Close */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-1 rounded-full bg-border mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
                <h3 className="font-display font-bold text-lg">
                  {showPin ? 'Enter PIN' : step === 1 ? 'Send Money' : step === 2 ? 'Enter Amount' : 'Confirm'}
                </h3>
                <button onClick={handleClose} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {showPin ? (
                <div className="space-y-6 pb-6">
                  <p className="font-body text-sm text-muted-foreground text-center">Enter your 4-digit PIN to confirm</p>
                  <div className="flex gap-3 justify-center">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className={`w-14 h-14 rounded-2xl glass flex items-center justify-center text-2xl font-display font-bold ${pin[i] ? 'border-primary' : ''}`}>
                        {pin[i] ? '•' : ''}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3 max-w-[280px] mx-auto">
                    {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((key) => (
                      <button
                        key={key}
                        onClick={() => key && handleKey(key, 'pin')}
                        disabled={!key}
                        className={`h-14 rounded-2xl font-display font-bold text-xl transition-all ${key ? 'glass hover:bg-secondary/50 active:scale-95' : ''}`}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleSend}
                    disabled={pin.length < 4}
                    className="w-full gradient-gold text-primary-foreground font-display font-bold py-4 rounded-full disabled:opacity-50 transition-opacity"
                  >
                    Confirm Send
                  </button>
                </div>
              ) : step === 1 ? (
                <div className="space-y-4 pb-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="@username, phone, or paste link"
                      className="w-full bg-secondary rounded-2xl py-3 pl-11 pr-4 font-body text-sm outline-none focus:ring-2 ring-primary/50"
                    />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted-foreground mb-3">Send again</p>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {recentRecipients.map((r) => (
                        <button key={r.username} onClick={() => selectRecipient(r.username)} className="flex flex-col items-center gap-1.5 shrink-0">
                          <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center text-xs font-display font-bold text-primary-foreground">{r.initials}</div>
                          <span className="font-body text-[10px] text-muted-foreground">{r.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  {recipient && (
                    <button onClick={() => setStep(2)} className="w-full gradient-gold text-primary-foreground font-display font-bold py-3.5 rounded-full">
                      Continue
                    </button>
                  )}
                </div>
              ) : step === 2 ? (
                <div className="space-y-4 pb-6">
                  <div className="text-center py-4">
                    <p className="font-body text-xs text-muted-foreground mb-2">Sending to @{recipient}</p>
                    <p className="font-display font-extrabold text-[44px]">
                      GH₵ {amount || '0'}
                    </p>
                    <p className="font-body text-xs text-muted-foreground mt-1">Balance: GH₵ {user.balance.toLocaleString('en-GH', { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 max-w-[280px] mx-auto">
                    {numericKeys.map((key) => (
                      <motion.button
                        key={key}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => handleKey(key, 'amount')}
                        className="h-14 rounded-2xl glass font-display font-bold text-xl hover:bg-secondary/50 transition-colors"
                      >
                        {key}
                      </motion.button>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > user.balance}
                    className="w-full gradient-gold text-primary-foreground font-display font-bold py-3.5 rounded-full disabled:opacity-50"
                  >
                    Continue
                  </button>
                </div>
              ) : (
                <div className="space-y-4 pb-6">
                  <input
                    value={note}
                    onChange={(e) => setNote(e.target.value.slice(0, 80))}
                    placeholder="Add a vibe... 🔥"
                    maxLength={80}
                    className="w-full bg-secondary rounded-2xl py-3 px-4 font-body text-sm outline-none focus:ring-2 ring-primary/50"
                  />
                  <div className="flex gap-2">
                    {emojiQuick.map((e) => (
                      <button key={e} onClick={() => setNote((n) => n + e)} className="text-xl hover:scale-110 transition-transform">{e}</button>
                    ))}
                  </div>
                  <div className="glass-card p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="font-body text-sm text-muted-foreground">To</span>
                      <span className="font-mono text-sm">@{recipient}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-body text-sm text-muted-foreground">Amount</span>
                      <span className="font-display font-bold">GH₵ {amount}</span>
                    </div>
                    {note && (
                      <div className="flex justify-between">
                        <span className="font-body text-sm text-muted-foreground">Note</span>
                        <span className="font-body text-sm">{note}</span>
                      </div>
                    )}
                    {parseFloat(amount) > 50 && (
                      <p className="font-body text-[10px] text-muted-foreground text-center pt-2">PIN required for amounts over GH₵ 50</p>
                    )}
                  </div>
                  <button
                    onClick={() => parseFloat(amount) > 50 ? setShowPin(true) : handleSend()}
                    className="w-full gradient-gold text-primary-foreground font-display font-bold py-4 rounded-full"
                  >
                    Send GH₵ {amount}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SendMoneyModal;
