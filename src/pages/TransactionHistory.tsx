import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { AccentButton } from '@/components/ui/AccentButton';
import { mockTransactions } from '@/data/mockData';
import { ArrowLeft, Download, Filter, Search, Calendar, ChevronDown } from 'lucide-react';

interface TransactionRowProps {
  transaction: any;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
  const { colors } = useTheme();
  
  return (
    <div className="flex items-center justify-between py-4 px-4 rounded-lg hover:bg-white/5 transition-colors border-b last:border-b-0" 
         style={{ borderColor: colors.border }}>
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
      <div className="text-right">
        <div
          className={`font-semibold text-sm ${transaction.type === 'in' ? 'text-green-400' : 'text-red-400'}`}
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {transaction.type === 'in' ? '+' : '-'}GH₵{transaction.amount.toFixed(2)}
        </div>
        <div className="text-xs opacity-60">{transaction.category}</div>
      </div>
    </div>
  );
};

const TransactionHistory: React.FC = () => {
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTransactions = mockTransactions.filter(tx => {
    const matchesSearch = tx.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.note?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || tx.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalIn = filteredTransactions
    .filter(tx => tx.type === 'in')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const totalOut = filteredTransactions
    .filter(tx => tx.type === 'out')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const netAmount = totalIn - totalOut;

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
            Transaction History
          </h1>
          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
            <Download size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search transactions..."
            className="w-full rounded-2xl py-3 pl-11 pr-4 text-sm outline-none transition-all"
            style={{
              backgroundColor: colors.card,
              border: `1px solid ${colors.border}`,
              color: colors.foreground,
            }}
          />
        </div>

        {/* Filter Dropdown */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all"
            style={{
              backgroundColor: colors.card,
              border: `1px solid ${colors.border}`,
            }}
          >
            <Filter size={16} />
            {filterType === 'all' ? 'All' : filterType === 'in' ? 'Income' : 'Expenses'}
            <ChevronDown size={16} />
          </button>
          
          {showFilters && (
            <div className="flex gap-2">
              <button
                onClick={() => { setFilterType('all'); setShowFilters(false); }}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  filterType === 'all' ? 'text-white' : ''
                }`}
                style={{
                  backgroundColor: filterType === 'all' ? colors.accent : colors.card,
                  border: `1px solid ${colors.border}`,
                }}
              >
                All
              </button>
              <button
                onClick={() => { setFilterType('in'); setShowFilters(false); }}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  filterType === 'in' ? 'text-white' : ''
                }`}
                style={{
                  backgroundColor: filterType === 'in' ? colors.accent : colors.card,
                  border: `1px solid ${colors.border}`,
                }}
              >
                Income
              </button>
              <button
                onClick={() => { setFilterType('out'); setShowFilters(false); }}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  filterType === 'out' ? 'text-white' : ''
                }`}
                style={{
                  backgroundColor: filterType === 'out' ? colors.accent : colors.card,
                  border: `1px solid ${colors.border}`,
                }}
              >
                Expenses
              </button>
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <GlassCard className="p-3 text-center">
            <div className="text-xs opacity-70 mb-1">Income</div>
            <div className="text-sm font-semibold text-green-400" style={{ fontFamily: 'Syne, sans-serif' }}>
              GH₵{totalIn.toFixed(2)}
            </div>
          </GlassCard>
          <GlassCard className="p-3 text-center">
            <div className="text-xs opacity-70 mb-1">Expenses</div>
            <div className="text-sm font-semibold text-red-400" style={{ fontFamily: 'Syne, sans-serif' }}>
              GH₵{totalOut.toFixed(2)}
            </div>
          </GlassCard>
          <GlassCard className="p-3 text-center">
            <div className="text-xs opacity-70 mb-1">Net</div>
            <div className={`text-sm font-semibold ${netAmount >= 0 ? 'text-green-400' : 'text-red-400'}`} 
                 style={{ fontFamily: 'Syne, sans-serif' }}>
              GH₵{netAmount.toFixed(2)}
            </div>
          </GlassCard>
        </div>

        {/* Transactions List */}
        <GlassCard>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <div className="text-center py-8 opacity-60">
              <div className="text-sm mb-2">No transactions found</div>
              <div className="text-xs">Try adjusting your search or filters</div>
            </div>
          )}
        </GlassCard>

        {/* Export Options */}
        <div className="mt-6">
          <AccentButton className="w-full">
            Export as PDF
          </AccentButton>
          <AccentButton variant="ghost" className="w-full mt-2">
            Export as CSV
          </AccentButton>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
