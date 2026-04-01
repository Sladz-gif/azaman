import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { BalanceCard } from '@/components/ui/BalanceCard';
import { AccentButton } from '@/components/ui/AccentButton';
import SendMoneyModal from '@/components/SendMoneyModal';
import { mockUser, mockTransactions, recentRecipients } from '@/data/mockData';
import { Bell, ArrowUp, ArrowDown, ArrowLeftRight, Plus, History, CreditCard, BookOpen, User, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TransactionRowProps {
  transaction: any;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
  const { colors } = useTheme();
  
  return (
    <div className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-white/5 transition-colors">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
          style={{
            backgroundColor: colors.card,
            border: `1px solid ${colors.border}`,
          }}
        >
          {transaction.emoji}
        </div>
        <div>
          <div className="font-medium text-sm">{transaction.name}</div>
          <div className="text-xs opacity-70">{transaction.date}</div>
          {transaction.note && (
            <div className="text-xs opacity-60 mt-1">{transaction.note}</div>
          )}
        </div>
      </div>
      <div
        className={`font-semibold text-sm ${transaction.type === 'in' ? 'text-green-400' : 'text-red-400'}`}
        style={{ fontFamily: 'Syne, sans-serif' }}
      >
        {transaction.type === 'in' ? '+' : '-'}GH₵{transaction.amount.toFixed(2)}
      </div>
    </div>
  );
};

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, label, onClick }) => {
  const { colors } = useTheme();
  
  return (
    <button
      className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl hover:bg-white/5 transition-colors w-full"
      onClick={onClick}
    >
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: colors.card,
          border: `1px solid ${colors.border}`,
        }}
      >
        {icon}
      </div>
      <span className="text-xs sm:text-sm opacity-80">{label}</span>
    </button>
  );
};

const HomePage: React.FC = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [showSendModal, setShowSendModal] = useState(false);

  const recentTxns = mockTransactions.slice(0, 4);

  return (
    <div
      className="min-h-screen pb-20"
      style={{
        backgroundColor: colors.background,
        color: colors.foreground,
      }}
    >
      {/* Header */}
      <div className="px-4 sm:px-6 pt-12 pb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
          <div className="flex-1">
            <div className="text-sm opacity-70">Good morning,</div>
            <div className="text-lg sm:text-xl font-semibold">{mockUser.name}</div>
            <div className="text-sm opacity-60 font-mono">@{mockUser.username}</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="relative p-2 rounded-lg hover:bg-white/5 transition-colors"
              style={{
                backgroundColor: colors.card,
                border: `1px solid ${colors.border}`,
              }}
            >
              <Bell size={20} />
              <div
                className="absolute top-1 right-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: colors.accent }}
              />
            </button>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
              style={{
                background: colors.gradient,
                color: 'white',
              }}
            >
              {mockUser.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <BalanceCard
          balance={mockUser.balance}
          username={mockUser.username}
          monthlyChange={mockUser.monthChange}
          savings={mockUser.savings}
          invested={mockUser.invested}
          spent={mockUser.spentThisMonth}
          className="mb-6"
        />

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <QuickAction
            icon={<ArrowUp size={20} />}
            label="Send"
            onClick={() => setShowSendModal(true)}
          />
          <QuickAction
            icon={<ArrowDown size={20} />}
            label="Receive"
            onClick={() => console.log('Receive clicked')}
          />
          <QuickAction
            icon={<ArrowLeftRight size={20} />}
            label="MoMo"
            onClick={() => console.log('MoMo clicked')}
          />
          <QuickAction
            icon={<Plus size={20} />}
            label="Top Up"
            onClick={() => console.log('Top Up clicked')}
          />
        </div>

        {/* Ad Banner */}
        <GlassCard className="mb-6 p-3">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs"
              style={{
                background: colors.gradient,
                color: 'white',
              }}
            >
              AD
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Night Market Special</div>
              <div className="text-xs opacity-70">Get 10% off with code AZAMAN10</div>
            </div>
          </div>
        </GlassCard>

        {/* Send Again */}
        <div className="mb-6">
          <div className="text-sm font-semibold mb-3">Send again</div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {recentRecipients.map((recipient, index) => (
              <button
                key={index}
                className="flex flex-col items-center gap-2 min-w-[60px]"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{
                    backgroundColor: colors.card,
                    border: `1px solid ${colors.border}`,
                    color: colors.foreground,
                  }}
                >
                  {recipient.initials}
                </div>
                <span className="text-xs opacity-80">{recipient.name}</span>
              </button>
            ))}
            <button
              className="flex flex-col items-center gap-2 min-w-[60px]"
              style={{
                backgroundColor: colors.card,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ color: colors.accent }}
              >
                <Plus size={20} />
              </div>
              <span className="text-xs">Add</span>
            </button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm font-semibold">Recent</div>
            <button
              className="text-xs"
              style={{ color: colors.accent }}
            >
              See all →
            </button>
          </div>
          <GlassCard>
            {recentTxns.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </GlassCard>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0">
        <GlassCard className="rounded-t-[28px] rounded-b-none border-t-0">
          <div className="flex justify-around py-3 sm:py-4">
            <button className="p-2 sm:p-3" style={{ color: colors.accent }}>
              <Home size={20} className="sm:hidden" />
              <Home size={24} className="hidden sm:block" />
            </button>
            <button className="p-2 sm:p-3 opacity-60">
              <CreditCard size={20} className="sm:hidden" />
              <CreditCard size={24} className="hidden sm:block" />
            </button>
            <button className="p-2 sm:p-3 opacity-60">
              <History size={20} className="sm:hidden" />
              <History size={24} className="hidden sm:block" />
            </button>
            <button className="p-2 sm:p-3 opacity-60">
              <BookOpen size={20} className="sm:hidden" />
              <BookOpen size={24} className="hidden sm:block" />
            </button>
            <button 
              className="p-2 sm:p-3 opacity-60"
              onClick={() => navigate('/profile')}
            >
              <User size={20} className="sm:hidden" />
              <User size={24} className="hidden sm:block" />
            </button>
          </div>
        </GlassCard>
      </div>

      {/* Send Money Modal */}
      <SendMoneyModal open={showSendModal} onClose={() => setShowSendModal(false)} />
    </div>
  );
};

export default HomePage;
