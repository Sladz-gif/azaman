import { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { toast } from '@/hooks/use-toast';

const AppTickets = () => {
  const { tickets, purchasedTickets, buyTicket } = useAppStore();
  const [tab, setTab] = useState<'browse' | 'mine'>('browse');
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleBuy = (id: string) => {
    buyTicket(id);
    toast({ title: 'Ticket purchased!', description: 'Check "My Tickets" to view your QR code' });
  };

  return (
    <div className="p-4 space-y-6 max-w-lg mx-auto">
      <div className="flex gap-2">
        <button onClick={() => setTab('browse')} className={`flex-1 py-2.5 rounded-xl font-display font-bold text-sm ${tab === 'browse' ? 'bg-primary text-primary-foreground' : 'glass'}`}>Browse</button>
        <button onClick={() => setTab('mine')} className={`flex-1 py-2.5 rounded-xl font-display font-bold text-sm ${tab === 'mine' ? 'bg-primary text-primary-foreground' : 'glass'}`}>My Tickets ({purchasedTickets.length})</button>
      </div>

      {tab === 'browse' && tickets.some((t) => t.status === 'live') && (
        <div className="glass-card p-4 border-ice/50 animate-pulse-slow">
          <p className="font-body text-sm">
            <span className="text-ice font-bold">New drop:</span> {tickets.find((t) => t.status === 'live')?.name} · Tickets live · Save towards it now
          </p>
        </div>
      )}

      {tab === 'browse' ? (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card overflow-hidden"
              style={{ background: 'linear-gradient(135deg, hsl(0 0% 4%), hsl(0 0% 12%))' }}
            >
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-body font-bold uppercase px-2 py-0.5 rounded-full ${
                    ticket.status === 'live' ? 'bg-destructive/20 text-destructive' :
                    ticket.status === 'upcoming' ? 'bg-primary/20 text-primary' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {ticket.status === 'live' ? '🔴 LIVE' : ticket.status === 'upcoming' ? 'UPCOMING' : 'SOLD OUT'}
                  </span>
                  {ticket.remaining > 0 && <span className="font-body text-[10px] text-muted-foreground">{ticket.remaining} left</span>}
                </div>
                <h3 className="font-display font-extrabold text-lg">{ticket.name}</h3>
                <p className="font-body text-xs text-muted-foreground">{ticket.location} · {ticket.date}</p>
                <p className="font-body text-xs text-muted-foreground">{ticket.description}</p>
                <p className="font-display font-extrabold text-xl text-primary">GH₵ {ticket.price}</p>
                <div className="flex gap-3">
                  <button className="flex-1 glass py-2.5 rounded-xl font-display font-bold text-sm hover:bg-secondary/50 transition-colors">Save for it</button>
                  <button
                    onClick={() => handleBuy(ticket.id)}
                    disabled={ticket.status === 'sold-out' || purchasedTickets.includes(ticket.id)}
                    className="flex-1 gradient-gold text-primary-foreground py-2.5 rounded-xl font-display font-bold text-sm disabled:opacity-50"
                  >
                    {purchasedTickets.includes(ticket.id) ? 'Purchased' : 'Buy Now'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {purchasedTickets.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-body text-muted-foreground">No tickets yet. Browse events to get started.</p>
            </div>
          ) : (
            purchasedTickets.map((id) => {
              const ticket = tickets.find((t) => t.id === id);
              if (!ticket) return null;
              return (
                <motion.div key={id} layout className="glass-card p-5 space-y-3">
                  <h3 className="font-display font-bold text-sm">{ticket.name}</h3>
                  <p className="font-body text-xs text-muted-foreground">{ticket.date}</p>
                  <button onClick={() => setExpanded(expanded === id ? null : id)} className="w-full glass py-3 rounded-xl font-body text-sm flex items-center justify-center gap-2">
                    <QrCode className="w-4 h-4" /> {expanded === id ? 'Hide' : 'Show'} QR
                  </button>
                  {expanded === id && (
                    <div className="flex justify-center py-4">
                      <div className="w-40 h-40 bg-foreground rounded-xl flex items-center justify-center">
                        <div className="w-32 h-32 bg-background rounded-lg flex items-center justify-center">
                          <QrCode className="w-20 h-20 text-primary" />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default AppTickets;
