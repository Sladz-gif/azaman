import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { AccentButton } from '@/components/ui/AccentButton';
import { NumericKeypad } from '@/components/ui/NumericKeypad';
import { ArrowLeft, TrendingUp, TrendingDown, Info, Shield, AlertTriangle, Star } from 'lucide-react';

interface Holding {
  id: string;
  name: string;
  icon: string;
  currentValue: number;
  investedAmount: number;
  return: number;
  returnPercentage: number;
  risk: 'Low' | 'Medium' | 'High';
}

interface InvestmentOption {
  id: string;
  name: string;
  type: string;
  risk: 'Low' | 'Medium' | 'High';
  expectedReturn: string;
  minimumInvestment: number;
  description: string;
  partner?: string;
  comingSoon?: boolean;
}

const Investments: React.FC = () => {
  const { colors } = useTheme();
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<InvestmentOption | null>(null);
  const [investAmount, setInvestAmount] = useState('');

  const holdings: Holding[] = [
    {
      id: '1',
      name: '91-Day Treasury Bill',
      icon: '🏛️',
      currentValue: 5200,
      investedAmount: 5000,
      return: 200,
      returnPercentage: 4.0,
      risk: 'Low',
    },
    {
      id: '2',
      name: 'Fixed Deposit',
      icon: '🏦',
      currentValue: 3150,
      investedAmount: 3000,
      return: 150,
      returnPercentage: 5.0,
      risk: 'Low',
    },
    {
      id: '3',
      name: 'Azaman Growth Fund',
      icon: '📈',
      currentValue: 2800,
      investedAmount: 2500,
      return: 300,
      returnPercentage: 12.0,
      risk: 'Medium',
    },
  ];

  const investmentOptions: InvestmentOption[] = [
    {
      id: '1',
      name: '91-Day Treasury Bill',
      type: 'Government Bond',
      risk: 'Low',
      expectedReturn: '15-18% p.a.',
      minimumInvestment: 100,
      description: 'Backed by the Bank of Ghana, these are the safest investment option with guaranteed returns.',
      partner: 'Bank of Ghana',
    },
    {
      id: '2',
      name: 'Fixed Deposit',
      type: 'Bank Deposit',
      risk: 'Low',
      expectedReturn: '10-15% p.a.',
      minimumInvestment: 500,
      description: 'Earn fixed interest rates by locking your money for a set period with partner banks.',
      partner: 'Partner Banks',
    },
    {
      id: '3',
      name: 'Azaman Growth Fund',
      type: 'Mutual Fund',
      risk: 'Medium',
      expectedReturn: '20-25% p.a.',
      minimumInvestment: 1000,
      description: 'Diversified portfolio of stocks and bonds managed by professional fund managers.',
      comingSoon: true,
    },
    {
      id: '4',
      name: 'AgriTech Investment',
      type: 'Agriculture',
      risk: 'High',
      expectedReturn: '25-35% p.a.',
      minimumInvestment: 2000,
      description: 'Invest in Ghanaian agricultural startups and farms with high growth potential.',
      comingSoon: true,
    },
    {
      id: '5',
      name: 'Real Estate Fund',
      type: 'Real Estate',
      risk: 'Medium',
      expectedReturn: '18-22% p.a.',
      minimumInvestment: 5000,
      description: 'Invest in commercial and residential properties across major Ghanaian cities.',
      comingSoon: true,
    },
  ];

  const totalInvested = holdings.reduce((sum, h) => sum + h.investedAmount, 0);
  const totalCurrent = holdings.reduce((sum, h) => sum + h.currentValue, 0);
  const totalReturn = totalCurrent - totalInvested;
  const totalReturnPercentage = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

  const getRiskColor = (risk: 'Low' | 'Medium' | 'High') => {
    switch (risk) {
      case 'Low': return '#10B981';
      case 'Medium': return '#F59E0B';
      case 'High': return '#EF4444';
      default: return colors.accent;
    }
  };

  const getRiskIcon = (risk: 'Low' | 'Medium' | 'High') => {
    switch (risk) {
      case 'Low': return <Shield size={16} />;
      case 'Medium': return <AlertTriangle size={16} />;
      case 'High': return <TrendingUp size={16} />;
      default: return <Info size={16} />;
    }
  };

  const handleInvest = (option: InvestmentOption) => {
    if (!option.comingSoon) {
      setSelectedOption(option);
      setShowInvestModal(true);
    }
  };

  const submitInvestment = () => {
    if (selectedOption && parseFloat(investAmount) >= selectedOption.minimumInvestment) {
      // Handle investment logic here
      setShowInvestModal(false);
      setInvestAmount('');
      setSelectedOption(null);
    }
  };

  return (
    <div
      className="min-h-screen pb-20"
      style={{
        backgroundColor: colors.background,
        color: colors.foreground,
      }}
    >
      <div className="px-6 pt-12 pb-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold flex-1" style={{ fontFamily: 'Syne, sans-serif' }}>
            Investments
          </h1>
        </div>

        {/* Portfolio Overview */}
        <GlassCard className="p-4 mb-6">
          <h2 className="font-semibold mb-4">Portfolio Overview</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-xs opacity-70 mb-1">Total Invested</div>
              <div className="text-lg font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
                GH₵{totalInvested.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-xs opacity-70 mb-1">Current Value</div>
              <div className="text-lg font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
                GH₵{totalCurrent.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: colors.border }}>
            <div>
              <div className="text-xs opacity-70 mb-1">Total Return</div>
              <div className={`text-lg font-semibold flex items-center gap-2 ${
                totalReturn >= 0 ? 'text-green-400' : 'text-red-400'
              }`} style={{ fontFamily: 'Syne, sans-serif' }}>
                {totalReturn >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                GH₵{Math.abs(totalReturn).toLocaleString()}
              </div>
            </div>
            <div className={`text-sm font-semibold ${
              totalReturnPercentage >= 0 ? 'text-green-400' : 'text-red-400'
            }`} style={{ fontFamily: 'Syne, sans-serif' }}>
              {totalReturnPercentage >= 0 ? '+' : ''}{totalReturnPercentage.toFixed(1)}%
            </div>
          </div>
        </GlassCard>

        {/* Holdings */}
        <div className="mb-6">
          <h2 className="font-semibold mb-4">Your Holdings</h2>
          <div className="space-y-3">
            {holdings.map((holding) => (
              <GlassCard key={holding.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{holding.icon}</div>
                    <div>
                      <div className="font-medium text-sm">{holding.name}</div>
                      <div className="flex items-center gap-2 text-xs opacity-70">
                        <div style={{ color: getRiskColor(holding.risk) }}>
                          {getRiskIcon(holding.risk)}
                        </div>
                        <span>{holding.risk} Risk</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>
                      GH₵{holding.currentValue.toLocaleString()}
                    </div>
                    <div className={`text-xs flex items-center gap-1 ${
                      holding.return >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {holding.return >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                      {holding.returnPercentage >= 0 ? '+' : ''}{holding.returnPercentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Investment Options */}
        <div>
          <h2 className="font-semibold mb-4">Available Investments</h2>
          <div className="space-y-4">
            {investmentOptions.map((option) => (
              <GlassCard key={option.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{option.name}</h3>
                      {option.comingSoon && (
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-500/20 text-gray-400">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <div className="text-xs opacity-70 mb-2">{option.type}</div>
                    <p className="text-xs opacity-80 line-clamp-2">{option.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <div className="text-xs opacity-70 mb-1">Expected Return</div>
                    <div className="text-sm font-semibold text-green-400">
                      {option.expectedReturn}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs opacity-70 mb-1">Min. Investment</div>
                    <div className="text-sm font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
                      GH₵{option.minimumInvestment.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div style={{ color: getRiskColor(option.risk) }}>
                      {getRiskIcon(option.risk)}
                    </div>
                    <span className="text-xs" style={{ color: getRiskColor(option.risk) }}>
                      {option.risk} Risk
                    </span>
                  </div>
                  {option.partner && (
                    <div className="text-xs opacity-60">
                      Partner: {option.partner}
                    </div>
                  )}
                </div>

                <AccentButton 
                  className="w-full mt-3"
                  disabled={option.comingSoon}
                  onClick={() => handleInvest(option)}
                >
                  {option.comingSoon ? 'Coming Soon' : 'Invest Now'}
                </AccentButton>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <GlassCard className="p-4 mt-6">
          <div className="flex items-start gap-3">
            <Info size={16} className="opacity-60 mt-0.5" />
            <div className="text-xs opacity-70 leading-relaxed">
              <strong>Disclaimer:</strong> Investments are subject to market risk. Azaman partners with licensed financial institutions to provide investment opportunities. Past performance does not guarantee future returns. Please invest wisely and consider your risk tolerance.
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Invest Modal */}
      {showInvestModal && selectedOption && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
             style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <GlassCard className="w-full max-w-md p-6">
            <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              Invest in {selectedOption.name}
            </h3>
            
            <div className="mb-4">
              <div className="text-sm opacity-70 mb-2">{selectedOption.type}</div>
              <div className="flex items-center gap-2 mb-2">
                <div style={{ color: getRiskColor(selectedOption.risk) }}>
                  {getRiskIcon(selectedOption.risk)}
                </div>
                <span className="text-sm" style={{ color: getRiskColor(selectedOption.risk) }}>
                  {selectedOption.risk} Risk • {selectedOption.expectedReturn} expected return
                </span>
              </div>
              <div className="text-xs opacity-60">
                Minimum investment: GH₵{selectedOption.minimumInvestment.toLocaleString()}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm opacity-70 mb-2 block">Investment Amount (GH₵)</label>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
                    GH₵ {investAmount || '0'}
                  </div>
                </div>
                <NumericKeypad 
                  value={investAmount} 
                  onChange={setInvestAmount} 
                  maxLength={8}
                />
              </div>

              {parseFloat(investAmount) > 0 && (
                <GlassCard className="p-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="opacity-70">Investment Amount</span>
                      <span style={{ fontFamily: 'Syne, sans-serif' }}>
                        GH₵{parseFloat(investAmount).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">Expected Annual Return</span>
                      <span className="text-green-400" style={{ fontFamily: 'Syne, sans-serif' }}>
                        {selectedOption.expectedReturn}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <AccentButton 
                onClick={submitInvestment}
                disabled={!investAmount || parseFloat(investAmount) < selectedOption.minimumInvestment}
                className="flex-1"
              >
                Invest GH₵ {investAmount || '0'}
              </AccentButton>
              <AccentButton 
                variant="ghost"
                onClick={() => setShowInvestModal(false)}
                className="flex-1"
              >
                Cancel
              </AccentButton>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default Investments;
