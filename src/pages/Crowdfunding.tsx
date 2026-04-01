import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { AccentButton } from '@/components/ui/AccentButton';
import { NumericKeypad } from '@/components/ui/NumericKeypad';
import { mockCampaigns } from '@/data/mockData';
import { ArrowLeft, Plus, Heart, Share2, Users, Calendar, Target, TrendingUp } from 'lucide-react';
import { CrowdfundCampaign } from '@/types';

interface CampaignProps {
  campaign: CrowdfundCampaign;
  isOwned?: boolean;
}

const CampaignCard: React.FC<CampaignProps> = ({ campaign, isOwned = false }) => {
  const { colors } = useTheme();
  const progress = (campaign.raised / campaign.target) * 100;
  
  return (
    <GlassCard className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{campaign.emoji}</div>
          <div>
            <h3 className="font-semibold text-sm">{campaign.title}</h3>
            <p className="text-xs opacity-70">by @{campaign.creator}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs ${
          isOwned ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
        }`}>
          {isOwned ? 'Owned' : campaign.category}
        </div>
      </div>

      <p className="text-xs opacity-80 mb-4 line-clamp-2">{campaign.description}</p>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span>GH₵{campaign.raised.toLocaleString()} raised</span>
          <span>{campaign.donorCount} donors</span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden" 
             style={{ backgroundColor: colors.card }}>
          <div 
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${Math.min(progress, 100)}%`,
              backgroundColor: colors.accent,
            }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1 opacity-70">
          <span>{progress.toFixed(1)}% of goal</span>
          <span>{campaign.daysLeft} days left</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <AccentButton className="flex-1 text-sm">
          {isOwned ? 'Update Backers' : 'Support'}
        </AccentButton>
        <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
          <Share2 size={16} />
        </button>
      </div>
    </GlassCard>
  );
};

const Crowdfunding: React.FC = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'my' | 'discover'>('my');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<CrowdfundCampaign | null>(null);
  const [supportAmount, setSupportAmount] = useState('');
  const [supportNote, setSupportNote] = useState('');

  const [newCampaign, setNewCampaign] = useState<{
    title: string;
    description: string;
    target: number;
    category: 'Education' | 'Emergency' | 'Project' | 'Event' | 'Business' | 'Health' | 'Other';
    emoji: string;
  }>({
    title: '',
    description: '',
    target: 0,
    category: 'Education',
    emoji: '🎓',
  });

  const categories = [
    'Education', 'Emergency', 'Project', 'Event', 'Business', 'Health', 'Other'
  ];

  const emojis = ['🎓', '🏥', '🎵', '🎉', '💼', '🌱', '📚', '🏠', '🚗', '💡'];

  const handleSupport = (campaign: CrowdfundCampaign) => {
    setSelectedCampaign(campaign);
    setShowSupportModal(true);
  };

  const submitSupport = () => {
    if (parseFloat(supportAmount) > 0) {
      // Handle support logic here
      setShowSupportModal(false);
      setSupportAmount('');
      setSupportNote('');
    }
  };

  const createCampaign = () => {
    if (newCampaign.title && newCampaign.description && newCampaign.target > 0) {
      // Handle campaign creation here
      setShowCreateModal(false);
      setNewCampaign({
        title: '',
        description: '',
        target: 0,
        category: 'Education',
        emoji: '🎓',
      });
    }
  };

  const myCampaigns = mockCampaigns.filter(c => c.isOwned);
  const discoverCampaigns = mockCampaigns.filter(c => !c.isOwned);

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
            Crowdfunding
          </h1>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            style={{ color: colors.accent }}
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('my')}
            className={`flex-1 px-4 py-2 rounded-full text-sm transition-all ${
              activeTab === 'my' ? 'text-white' : ''
            }`}
            style={{
              backgroundColor: activeTab === 'my' ? colors.accent : colors.card,
              border: `1px solid ${colors.border}`,
            }}
          >
            My Campaigns
          </button>
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex-1 px-4 py-2 rounded-full text-sm transition-all ${
              activeTab === 'discover' ? 'text-white' : ''
            }`}
            style={{
              backgroundColor: activeTab === 'discover' ? colors.accent : colors.card,
              border: `1px solid ${colors.border}`,
            }}
          >
            Discover
          </button>
        </div>

        {/* Campaigns List */}
        <div className="space-y-4">
          {(activeTab === 'my' ? myCampaigns : discoverCampaigns).map((campaign) => (
            <CampaignCard 
              key={campaign.id} 
              campaign={campaign} 
              isOwned={campaign.isOwned}
            />
          ))}
        </div>

        {/* Empty State */}
        {((activeTab === 'my' ? myCampaigns : discoverCampaigns).length === 0) && (
          <div className="text-center py-12 opacity-60">
            <div className="text-4xl mb-4">
              {activeTab === 'my' ? '📝' : '🔍'}
            </div>
            <div className="text-lg font-semibold mb-2">
              {activeTab === 'my' ? 'No campaigns yet' : 'No campaigns found'}
            </div>
            <div className="text-sm mb-4">
              {activeTab === 'my' 
                ? 'Create your first campaign to get started'
                : 'Check back later for new campaigns'
              }
            </div>
            {activeTab === 'my' && (
              <AccentButton onClick={() => setShowCreateModal(true)}>
                Create Campaign
              </AccentButton>
            )}
          </div>
        )}
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
             style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <GlassCard className="w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              Create Campaign
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm opacity-70 mb-2 block">Campaign Title</label>
                <input
                  type="text"
                  value={newCampaign.title}
                  onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                  placeholder="Enter campaign title"
                  className="w-full rounded-2xl py-3 px-4 text-sm outline-none transition-all"
                  style={{
                    backgroundColor: colors.card,
                    border: `1px solid ${colors.border}`,
                    color: colors.foreground,
                  }}
                />
              </div>

              <div>
                <label className="text-sm opacity-70 mb-2 block">Description</label>
                <textarea
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                  placeholder="Describe your campaign..."
                  rows={4}
                  className="w-full rounded-2xl py-3 px-4 text-sm outline-none transition-all resize-none"
                  style={{
                    backgroundColor: colors.card,
                    border: `1px solid ${colors.border}`,
                    color: colors.foreground,
                  }}
                />
              </div>

              <div>
                <label className="text-sm opacity-70 mb-2 block">Target Amount (GH₵)</label>
                <input
                  type="number"
                  value={newCampaign.target || ''}
                  onChange={(e) => setNewCampaign({ ...newCampaign, target: parseFloat(e.target.value) || 0 })}
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
                <label className="text-sm opacity-70 mb-2 block">Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setNewCampaign({ ...newCampaign, category: cat as 'Education' | 'Emergency' | 'Project' | 'Event' | 'Business' | 'Health' | 'Other' })}
                      className={`px-3 py-2 rounded-full text-xs transition-all ${
                        newCampaign.category === cat ? 'text-white' : ''
                      }`}
                      style={{
                        backgroundColor: newCampaign.category === cat ? colors.accent : colors.card,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm opacity-70 mb-2 block">Emoji</label>
                <div className="grid grid-cols-5 gap-2">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setNewCampaign({ ...newCampaign, emoji })}
                      className={`p-3 rounded-lg text-xl transition-all ${
                        newCampaign.emoji === emoji ? 'text-white' : ''
                      }`}
                      style={{
                        backgroundColor: newCampaign.emoji === emoji ? colors.accent : colors.card,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <AccentButton 
                onClick={createCampaign}
                disabled={!newCampaign.title || !newCampaign.description || newCampaign.target <= 0}
                className="flex-1"
              >
                Create Campaign
              </AccentButton>
              <AccentButton 
                variant="ghost"
                onClick={() => setShowCreateModal(false)}
                className="flex-1"
              >
                Cancel
              </AccentButton>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Support Modal */}
      {showSupportModal && selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
             style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <GlassCard className="w-full max-w-md p-6">
            <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              Support Campaign
            </h3>
            
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">{selectedCampaign.emoji}</div>
                <div>
                  <div className="font-semibold">{selectedCampaign.title}</div>
                  <div className="text-xs opacity-70">@{selectedCampaign.creator}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm opacity-70 mb-2 block">Amount (GH₵)</label>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
                    GH₵ {supportAmount || '0'}
                  </div>
                </div>
                <NumericKeypad 
                  value={supportAmount} 
                  onChange={setSupportAmount} 
                  maxLength={8}
                />
              </div>

              <div>
                <label className="text-sm opacity-70 mb-2 block">Note (optional)</label>
                <textarea
                  value={supportNote}
                  onChange={(e) => setSupportNote(e.target.value)}
                  placeholder="Add a supportive message..."
                  rows={3}
                  className="w-full rounded-2xl py-3 px-4 text-sm outline-none transition-all resize-none"
                  style={{
                    backgroundColor: colors.card,
                    border: `1px solid ${colors.border}`,
                    color: colors.foreground,
                  }}
                />
              </div>

              <div className="text-xs opacity-60 text-center">
                2% platform fee will be deducted from your contribution
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <AccentButton 
                onClick={submitSupport}
                disabled={!supportAmount || parseFloat(supportAmount) <= 0}
                className="flex-1"
              >
                Support GH₵ {supportAmount || '0'}
              </AccentButton>
              <AccentButton 
                variant="ghost"
                onClick={() => setShowSupportModal(false)}
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

export default Crowdfunding;
