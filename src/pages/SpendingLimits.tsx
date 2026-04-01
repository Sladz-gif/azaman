import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { AccentButton } from '@/components/ui/AccentButton';
import { ArrowLeft, Plus, Edit2, Trash2, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';

interface SpendingLimit {
  id: string;
  category: string;
  emoji: string;
  limit: number;
  spent: number;
  duration: 'month' | 'permanent';
  active: boolean;
}

const SpendingLimits: React.FC = () => {
  const { colors } = useTheme();
  const [limits, setLimits] = useState<SpendingLimit[]>([
    { id: '1', category: 'Food & Drink', emoji: '🍗', limit: 500, spent: 320, duration: 'month', active: true },
    { id: '2', category: 'Transport', emoji: '🚗', limit: 200, spent: 180, duration: 'month', active: true },
    { id: '3', category: 'Entertainment', emoji: '🎵', limit: 150, spent: 145, duration: 'month', active: true },
    { id: '4', category: 'Shopping', emoji: '🛍️', limit: 300, spent: 280, duration: 'permanent', active: true },
  ]);

  const [showAddLimit, setShowAddLimit] = useState(false);
  const [newLimit, setNewLimit] = useState<{ category: string; emoji: string; limit: number; duration: 'month' | 'permanent' }>({ 
    category: '', 
    emoji: '📦', 
    limit: 0, 
    duration: 'month' 
  });

  const categories = [
    { name: 'Food & Drink', emoji: '🍗' },
    { name: 'Transport', emoji: '🚗' },
    { name: 'Shopping', emoji: '🛍️' },
    { name: 'Entertainment', emoji: '🎵' },
    { name: 'Bills', emoji: '📱' },
    { name: 'Health', emoji: '🏥' },
    { name: 'Education', emoji: '📚' },
    { name: 'Other', emoji: '📦' },
  ];

  const getProgressColor = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 90) return '#FF3B3B';
    if (percentage >= 80) return '#FF6B00';
    return colors.accent;
  };

  const getProgressWidth = (spent: number, limit: number) => {
    return Math.min((spent / limit) * 100, 100);
  };

  const addLimit = () => {
    if (newLimit.category && newLimit.limit > 0) {
      setLimits([...limits, {
        id: Date.now().toString(),
        category: newLimit.category,
        emoji: newLimit.emoji,
        limit: newLimit.limit,
        spent: 0,
        duration: newLimit.duration,
        active: true,
      }]);
      setNewLimit({ category: '', emoji: '📦', limit: 0, duration: 'month' });
      setShowAddLimit(false);
    }
  };

  const deleteLimit = (id: string) => {
    setLimits(limits.filter(limit => limit.id !== id));
  };

  const toggleLimit = (id: string) => {
    setLimits(limits.map(limit => 
      limit.id === id ? { ...limit, active: !limit.active } : limit
    ));
  };

  return (
    <div
      className="min-h-screen pb-20"
      style={{
        backgroundColor: colors.background,
        color: colors.foreground,
      }}
    >
      {/* Header */}
      <div className="px-6 pt-12 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button 
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold flex-1" style={{ fontFamily: 'Syne, sans-serif' }}>
            Spending Limits
          </h1>
          <button 
            onClick={() => setShowAddLimit(true)}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            style={{ color: colors.accent }}
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Overview Card */}
        <GlassCard className="p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Monthly Overview</h2>
            <div className="flex items-center gap-1 text-xs opacity-70">
              <Calendar size={12} />
              <span>This month</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs opacity-70 mb-1">Total Limits</div>
              <div className="text-lg font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
                GH₵{limits.filter(l => l.duration === 'month').reduce((sum, l) => sum + l.limit, 0).toFixed(0)}
              </div>
            </div>
            <div>
              <div className="text-xs opacity-70 mb-1">Spent So Far</div>
              <div className="text-lg font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
                GH₵{limits.filter(l => l.duration === 'month').reduce((sum, l) => sum + l.spent, 0).toFixed(0)}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Limits List */}
        <div className="space-y-4">
          {limits.map((limit) => {
            const progressWidth = getProgressWidth(limit.spent, limit.limit);
            const progressColor = getProgressColor(limit.spent, limit.limit);
            const isOverLimit = limit.spent >= limit.limit;
            const isNearLimit = limit.spent >= limit.limit * 0.8;

            return (
              <GlassCard key={limit.id} className={`p-4 ${!limit.active ? 'opacity-60' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{limit.emoji}</div>
                    <div>
                      <div className="font-medium">{limit.category}</div>
                      <div className="text-xs opacity-70">
                        {limit.duration === 'month' ? 'Monthly' : 'Permanent'} limit
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toggleLimit(limit.id)}
                      className={`px-2 py-1 rounded-full text-xs transition-all ${
                        limit.active ? 'text-white' : ''
                      }`}
                      style={{
                        backgroundColor: limit.active ? colors.accent : colors.card,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      {limit.active ? 'Active' : 'Paused'}
                    </button>
                    <button 
                      onClick={() => deleteLimit(limit.id)}
                      className="p-1 rounded hover:bg-white/5 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>GH₵{limit.spent.toFixed(0)} spent</span>
                    <span>GH₵{limit.limit.toFixed(0)} limit</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" 
                       style={{ backgroundColor: colors.card }}>
                    <div 
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${progressWidth}%`,
                        backgroundColor: progressColor,
                      }}
                    />
                  </div>
                </div>

                {/* Warning */}
                {(isOverLimit || isNearLimit) && (
                  <div className={`flex items-center gap-2 text-xs p-2 rounded-lg ${
                    isOverLimit ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    <AlertTriangle size={12} />
                    <span>
                      {isOverLimit ? 'Limit exceeded!' : '80% of limit used'}
                    </span>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>

        {/* Add Limit Modal */}
        {showAddLimit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
               style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <GlassCard className="w-full max-w-md p-6">
              <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
                Add Spending Limit
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm opacity-70 mb-2 block">Category</label>
                  <div className="grid grid-cols-4 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => setNewLimit({ ...newLimit, category: cat.name, emoji: cat.emoji })}
                        className={`p-3 rounded-lg text-center transition-all ${
                          newLimit.category === cat.name ? 'text-white' : ''
                        }`}
                        style={{
                          backgroundColor: newLimit.category === cat.name ? colors.accent : colors.card,
                          border: `1px solid ${colors.border}`,
                        }}
                      >
                        <div className="text-lg mb-1">{cat.emoji}</div>
                        <div className="text-xs">{cat.name.split(' ')[0]}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm opacity-70 mb-2 block">Limit Amount (GH₵)</label>
                  <input
                    type="number"
                    value={newLimit.limit || ''}
                    onChange={(e) => setNewLimit({ ...newLimit, limit: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    className="w-full rounded-2xl py-3 px-4 text-sm outline-none transition-all"
                    style={{
                      backgroundColor: colors.card,
                      border: `1px solid ${colors.border}`,
                      color: colors.foreground,
                    }}
                  />
                </div>

                <div>
                  <label className="text-sm opacity-70 mb-2 block">Duration</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setNewLimit({ ...newLimit, duration: 'month' })}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        newLimit.duration === 'month' ? 'text-white' : ''
                      }`}
                      style={{
                        backgroundColor: newLimit.duration === 'month' ? colors.accent : colors.card,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setNewLimit({ ...newLimit, duration: 'permanent' })}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        newLimit.duration === 'permanent' ? 'text-white' : ''
                      }`}
                      style={{
                        backgroundColor: newLimit.duration === 'permanent' ? colors.accent : colors.card,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      Permanent
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <AccentButton 
                  onClick={addLimit}
                  disabled={!newLimit.category || newLimit.limit <= 0}
                  className="flex-1"
                >
                  Add Limit
                </AccentButton>
                <AccentButton 
                  variant="ghost"
                  onClick={() => setShowAddLimit(false)}
                  className="flex-1"
                >
                  Cancel
                </AccentButton>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpendingLimits;
