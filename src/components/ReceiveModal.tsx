import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Share2, QrCode, Link, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '@/stores/appStore';
import { toast } from '@/hooks/use-toast';

interface Props {
  open: boolean;
  onClose: () => void;
}

const ReceiveModal = ({ open, onClose }: Props) => {
  const [tab, setTab] = useState<'qr' | 'link' | 'momo'>('qr');
  const user = useAppStore((s) => s.user);

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied!', description: text });
  };

  const shareText = (text: string) => {
    if (navigator.share) {
      navigator.share({ text });
    } else {
      copyText(text);
    }
  };

  const tabs = [
    { id: 'qr' as const, icon: QrCode, label: 'QR Code' },
    { id: 'link' as const, icon: Link, label: 'Link' },
    { id: 'momo' as const, icon: Smartphone, label: 'MoMo' },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={onClose}>
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-0 left-0 right-0 glass rounded-t-[28px] p-4 pb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-lg">Receive Money</h3>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"><X className="w-4 h-4" /></button>
            </div>

            <div className="flex gap-2 mb-6">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-body text-sm transition-colors ${tab === t.id ? 'bg-primary text-primary-foreground' : 'glass'}`}
                >
                  <t.icon className="w-4 h-4" />
                  {t.label}
                </button>
              ))}
            </div>

            {tab === 'qr' && (
              <div className="text-center space-y-4">
                <div className="w-48 h-48 mx-auto bg-foreground rounded-2xl flex items-center justify-center">
                  <div className="w-40 h-40 bg-background rounded-xl flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-primary" />
                  </div>
                </div>
                <p className="font-mono text-sm text-muted-foreground">@{user.username}</p>
                <button onClick={() => shareText(`azaman.app/@${user.username}`)} className="gradient-gold text-primary-foreground font-display font-bold py-3 px-8 rounded-full">
                  <Share2 className="inline w-4 h-4 mr-2" />Share QR
                </button>
              </div>
            )}

            {tab === 'link' && (
              <div className="space-y-4">
                <div className="glass-card p-4 flex items-center gap-3">
                  <span className="font-mono text-sm flex-1 truncate">azaman.app/@{user.username}</span>
                  <button onClick={() => copyText(`azaman.app/@${user.username}`)} className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0"><Copy className="w-4 h-4" /></button>
                  <button onClick={() => shareText(`azaman.app/@${user.username}`)} className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0"><Share2 className="w-4 h-4" /></button>
                </div>
                <p className="font-body text-xs text-muted-foreground text-center">Anyone with this link can send you money</p>
              </div>
            )}

            {tab === 'momo' && (
              <div className="space-y-4">
                <div className="glass-card p-4 text-center space-y-2">
                  <p className="font-body text-sm text-muted-foreground">MoMo Number</p>
                  <p className="font-display font-bold text-2xl">024 XXX XXXX</p>
                  <p className="font-body text-xs text-muted-foreground">MTN Mobile Money</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => copyText('024XXXXXXX')} className="flex-1 glass-card py-3 font-display font-bold text-sm text-center">
                    <Copy className="inline w-4 h-4 mr-1" /> Copy
                  </button>
                  <button className="flex-1 gradient-gold text-primary-foreground py-3 rounded-2xl font-display font-bold text-sm">
                    <Smartphone className="inline w-4 h-4 mr-1" /> Open MoMo
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReceiveModal;
