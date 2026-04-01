import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ArrowLeft } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { NumericKeypad } from '@/components/ui/NumericKeypad';
import { AccentButton } from '@/components/ui/AccentButton';
import { recentRecipients, mockUser } from '@/data/mockData';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  onClose: () => void;
}

const SendMoneyModal = ({ open, onClose }: Props) => {
  const { colors } = useTheme();
  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<{
    username: string;
    name: string;
    avatar?: string;
  } | null>(null);

  const reset = () => { 
    setStep(1); 
    setRecipient(''); 
    setAmount(''); 
    setNote(''); 
    setPin(''); 
    setShowPin(false);
    setSelectedRecipient(null);
  };
  const handleClose = () => { reset(); onClose(); };

  const emojiQuick = ['🔥', '🙏', '🎵', '💰', '🤝'];

  const handleSend = () => {
    if (pin === '1234' || parseFloat(amount) <= 50) {
      toast.success(`GH₵ ${amount} sent to @${recipient}`);
      handleClose();
    } else {
      toast.error('Wrong PIN. Please try again');
      setPin('');
    }
  };

  const selectRecipient = (recipient: {
    username: string;
    name: string;
    avatar?: string;
  }) => {
    setSelectedRecipient(recipient);
    setRecipient(recipient.username);
    setStep(2);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full rounded-t-[28px] overflow-hidden"
            style={{
              backgroundColor: colors.background,
            }}
          >
            <div className="p-4 sm:p-6">
              {/* Handle + Close */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-1 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-3" 
                     style={{ backgroundColor: colors.border }} />
                {step > 1 && (
                  <button onClick={() => setStep(step - 1)} className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft size={20} />
                  </button>
                )}
                <h3 className="font-bold text-lg sm:text-xl flex-1 text-center px-8" 
                    style={{ fontFamily: 'Syne, sans-serif' }}>
                  {showPin ? 'Enter PIN' : step === 1 ? 'Send Money' : step === 2 ? 'Enter Amount' : 'Confirm'}
                </h3>
                <button onClick={handleClose} className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <X size={20} />
                </button>
              </div>

              {showPin ? (
                <div className="space-y-6 pb-6">
                  <p className="font-body text-sm text-muted-foreground text-center">Enter your 4-digit PIN to confirm</p>
                  <div className="flex gap-3 justify-center">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all`}
                           style={{
                             fontFamily: 'Syne, sans-serif',
                             backgroundColor: colors.card,
                             border: pin[i] ? `2px solid ${colors.accent}` : `1px solid ${colors.border}`,
                             color: colors.foreground,
                           }}>
                        {pin[i] ? '•' : ''}
                      </div>
                    ))}
                  </div>
                  <NumericKeypad value={pin} onChange={setPin} maxLength={4} className="max-w-[280px] mx-auto" />
                  <AccentButton onClick={handleSend} disabled={pin.length < 4} className="w-full">
                    Confirm Send
                  </AccentButton>
                </div>
              ) : step === 1 ? (
                <div className="space-y-4 pb-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
                    <input
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="@username, phone, or paste link"
                      className="w-full rounded-2xl py-3 pl-11 pr-4 text-sm outline-none transition-all"
                      style={{
                        backgroundColor: colors.card,
                        border: `1px solid ${colors.border}`,
                        color: colors.foreground,
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-xs opacity-70 mb-3">Send again</p>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {recentRecipients.map((r) => (
                        <button key={r.username} onClick={() => selectRecipient(r)} className="flex flex-col items-center gap-1.5 shrink-0">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold" 
                               style={{
                                 background: colors.gradient,
                                 color: 'white',
                                 fontFamily: 'Syne, sans-serif'
                               }}>
                            {r.initials}
                          </div>
                          <span className="text-xs opacity-80">{r.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  {recipient && (
                    <AccentButton onClick={() => setStep(2)} className="w-full">
                      Continue
                    </AccentButton>
                  )}
                </div>
              ) : step === 2 ? (
                <div className="space-y-4 pb-6">
                  <div className="text-center py-4">
                    <p className="text-xs opacity-70 mb-2">Sending to @{recipient}</p>
                    <p className="font-bold text-[44px]" 
                       style={{ fontFamily: 'Syne, sans-serif' }}>
                      GH₵ {amount || '0'}
                    </p>
                    <p className="text-xs opacity-70 mt-1">Balance: GH₵ {mockUser.balance.toLocaleString('en-GH', { minimumFractionDigits: 2 })}</p>
                  </div>
                  <NumericKeypad value={amount} onChange={setAmount} maxLength={10} className="max-w-[280px] mx-auto" />
                  <AccentButton 
                    onClick={() => setStep(3)} 
                    disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > mockUser.balance}
                    className="w-full"
                  >
                    Continue
                  </AccentButton>
                </div>
              ) : (
                <div className="space-y-4 pb-6">
                  <input
                    value={note}
                    onChange={(e) => setNote(e.target.value.slice(0, 80))}
                    placeholder="Add a vibe... 🔥"
                    maxLength={80}
                    className="w-full rounded-2xl py-3 px-4 text-sm outline-none transition-all"
                    style={{
                      backgroundColor: colors.card,
                      border: `1px solid ${colors.border}`,
                      color: colors.foreground,
                    }}
                  />
                  <div className="flex gap-2">
                    {emojiQuick.map((e) => (
                      <button key={e} onClick={() => setNote((n) => n + e)} className="text-xl hover:scale-110 transition-transform">{e}</button>
                    ))}
                  </div>
                  <GlassCard className="p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm opacity-70">To</span>
                      <span className="text-sm font-mono">@{recipient}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm opacity-70">Amount</span>
                      <span className="text-sm font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>GH₵ {amount}</span>
                    </div>
                    {note && (
                      <div className="flex justify-between">
                        <span className="text-sm opacity-70">Note</span>
                        <span className="text-sm">{note}</span>
                      </div>
                    )}
                    {parseFloat(amount) > 50 && (
                      <p className="text-xs opacity-70 text-center pt-2">PIN required for amounts over GH₵ 50</p>
                    )}
                  </GlassCard>
                  <AccentButton onClick={() => parseFloat(amount) > 50 ? setShowPin(true) : handleSend()} className="w-full">
                    Send GH₵ {amount}
                  </AccentButton>
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
