import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Lock, Unlock, Pause } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { toast } from '@/hooks/use-toast';
import type { SavingsGoal } from '@/types';

const AppSave = () => {
  const { savingsGoals, addSavingsGoal } = useAppStore();
  const [showNew, setShowNew] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: '', emoji: '🎯', target: '', frequency: 'daily' as 'daily' | 'weekly' | 'monthly', amount: '', locked: false });

  const totalSaved = savingsGoals.reduce((sum, g) => sum + g.saved, 0);

  const handleCreate = () => {
    if (!newGoal.name || !newGoal.target || !newGoal.amount) return;
    const goal: SavingsGoal = {
      id: Date.now().toString(),
      name: newGoal.name,
      emoji: newGoal.emoji,
      target: parseFloat(newGoal.target),
      saved: 0,
      frequency: newGoal.frequency,
      frequencyAmount: parseFloat(newGoal.amount),
      locked: newGoal.locked,
      missesUsed: 0,
      maxMisses: 5,
      status: 'active',
    };
    addSavingsGoal(goal);
    toast({ title: 'Goal created!', description: `${goal.name} is now active` });
    setShowNew(false);
    setNewGoal({ name: '', emoji: '🎯', target: '', frequency: 'daily', amount: '', locked: false });
  };

  const emojiOptions = ['🎯', '💻', '🎵', '✈️', '🏠', '🚗', '📱', '🎓', '🛡️', '💍'];

  return (
    <div className="p-4 space-y-6 max-w-lg mx-auto">
      <div>
        <p className="font-display font-extrabold text-[32px] text-neon">
          GH₵ {totalSaved.toLocaleString('en-GH', { minimumFractionDigits: 2 })}
        </p>
        <p className="font-body text-sm text-muted-foreground">across {savingsGoals.filter((g) => g.status === 'active').length} active goals</p>
      </div>

      <div className="space-y-4">
        {savingsGoals.map((goal) => {
          const progress = (goal.saved / goal.target) * 100;
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`glass-card p-5 space-y-3 ${goal.missesUsed >= 3 ? 'border-destructive/50' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{goal.emoji}</span>
                  <span className="font-display font-bold text-sm">{goal.name}</span>
                </div>
                <span className="flex items-center gap-1 text-[10px] font-body text-muted-foreground glass px-2 py-1 rounded-full">
                  {goal.locked ? <Lock className="w-3 h-3" /> : goal.status === 'paused' ? <Pause className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                  {goal.locked ? 'Locked' : goal.status === 'paused' ? 'Paused' : 'Flexible'}
                </span>
              </div>
              <p className="font-body text-[11px] text-muted-foreground capitalize">{goal.frequency} · GH₵ {goal.frequencyAmount}/{goal.frequency === 'daily' ? 'day' : goal.frequency === 'weekly' ? 'week' : 'month'}</p>
              <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="h-full rounded-full gradient-gold"
                />
              </div>
              <div className="flex justify-between">
                <span className="font-display font-bold text-sm text-primary">GH₵ {goal.saved.toLocaleString()}</span>
                <span className="font-body text-sm text-muted-foreground">GH₵ {goal.target.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-body text-[10px] text-muted-foreground">{goal.maxMisses} misses allowed · {goal.missesUsed} used</span>
                <div className="flex gap-0.5 ml-1">
                  {Array.from({ length: goal.maxMisses }).map((_, i) => (
                    <span key={i} className={`w-1.5 h-1.5 rounded-full ${i < goal.missesUsed ? 'bg-destructive' : 'bg-secondary'}`} />
                  ))}
                </div>
              </div>
              {goal.missesUsed >= 3 && goal.missesUsed < 5 && (
                <button className="w-full py-2 rounded-xl border border-destructive/50 text-destructive font-body text-xs font-medium">
                  Rescue this goal?
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      <button onClick={() => setShowNew(!showNew)} className="w-full gradient-gold text-primary-foreground font-display font-bold py-4 rounded-full flex items-center justify-center gap-2">
        <Plus className="w-5 h-5" /> New Goal
      </button>

      {showNew && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 space-y-4">
          <div className="flex gap-2 flex-wrap">
            {emojiOptions.map((e) => (
              <button key={e} onClick={() => setNewGoal({ ...newGoal, emoji: e })} className={`text-xl w-10 h-10 rounded-xl flex items-center justify-center ${newGoal.emoji === e ? 'bg-primary/20 ring-2 ring-primary' : 'glass'}`}>
                {e}
              </button>
            ))}
          </div>
          <input value={newGoal.name} onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })} placeholder="Goal name" className="w-full bg-secondary rounded-xl py-3 px-4 font-body text-sm outline-none" />
          <input value={newGoal.target} onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })} placeholder="Target amount (GH₵)" type="number" className="w-full bg-secondary rounded-xl py-3 px-4 font-body text-sm outline-none" />
          <div className="flex gap-2">
            {(['daily', 'weekly', 'monthly'] as const).map((f) => (
              <button key={f} onClick={() => setNewGoal({ ...newGoal, frequency: f })} className={`flex-1 py-2 rounded-xl font-body text-xs capitalize ${newGoal.frequency === f ? 'bg-primary text-primary-foreground' : 'glass'}`}>
                {f}
              </button>
            ))}
          </div>
          <input value={newGoal.amount} onChange={(e) => setNewGoal({ ...newGoal, amount: e.target.value })} placeholder="Amount per cycle (GH₵)" type="number" className="w-full bg-secondary rounded-xl py-3 px-4 font-body text-sm outline-none" />
          <button onClick={() => setNewGoal({ ...newGoal, locked: !newGoal.locked })} className={`w-full py-3 rounded-xl font-body text-sm flex items-center justify-center gap-2 ${newGoal.locked ? 'bg-primary text-primary-foreground' : 'glass'}`}>
            {newGoal.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            {newGoal.locked ? 'Locked (cannot withdraw early)' : 'Flexible (withdraw anytime)'}
          </button>
          <button onClick={handleCreate} className="w-full gradient-gold text-primary-foreground font-display font-bold py-3.5 rounded-full">Create Goal</button>
        </motion.div>
      )}
    </div>
  );
};

export default AppSave;
