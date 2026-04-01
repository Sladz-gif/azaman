import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { AccentButton } from '@/components/ui/AccentButton';
import { ArrowLeft, Search, MessageCircle, Mail, Phone, Book, HelpCircle, Send, ChevronDown, ChevronRight } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const HelpSupport: React.FC = () => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [contactMethod, setContactMethod] = useState<'chat' | 'email' | 'phone' | null>(null);
  const [message, setMessage] = useState('');

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'account', name: 'Account' },
    { id: 'transactions', name: 'Transactions' },
    { id: 'savings', name: 'Savings' },
    { id: 'investments', name: 'Investments' },
    { id: 'security', name: 'Security' },
  ];

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'How do I change my PIN?',
      answer: 'Go to Settings > Privacy & Security > Change PIN. You\'ll need to enter your current PIN and then create a new 4-digit PIN.',
      category: 'account',
    },
    {
      id: '2',
      question: 'What are the transaction limits?',
      answer: 'Daily transaction limit is GH₵ 5,000. For transactions over GH₵ 50, you\'ll need to enter your PIN. You can set custom spending limits in Settings > Spending Limits.',
      category: 'transactions',
    },
    {
      id: '3',
      question: 'How do savings goals work?',
      answer: 'Savings goals allow you to set aside money regularly. You can choose daily, weekly, or monthly contributions. If you miss 5 contributions, the goal will be cancelled and funds returned to your balance.',
      category: 'savings',
    },
    {
      id: '4',
      question: 'Is my money safe with Azaman?',
      answer: 'Yes, your funds are protected by bank-level security and encryption. We partner with licensed financial institutions for investments and follow regulatory requirements.',
      category: 'security',
    },
    {
      id: '5',
      question: 'How do I enable two-factor authentication?',
      answer: 'Go to Settings > Privacy & Security > Two-Factor Authentication. You can enable 2FA via SMS or authenticator app for extra security.',
      category: 'security',
    },
    {
      id: '6',
      question: 'What are the investment options?',
      answer: 'We offer Treasury Bills, Fixed Deposits, and the Azaman Growth Fund. Each has different risk levels and expected returns. Minimum investments start from GH₵ 100.',
      category: 'investments',
    },
    {
      id: '7',
      question: 'How do I report fraudulent activity?',
      answer: 'If you notice suspicious activity, immediately contact our support team through the app or email support@azaman.com. Also change your PIN and enable 2FA.',
      category: 'security',
    },
    {
      id: '8',
      question: 'Can I use Azaman outside Ghana?',
      answer: 'Currently, Azaman is focused on Ghanaian users. Some features may work internationally, but full functionality is available within Ghana.',
      category: 'account',
    },
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const quickActions = [
    {
      id: '1',
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: <MessageCircle size={20} />,
      action: 'chat',
      available: true,
    },
    {
      id: '2',
      title: 'Email Support',
      description: 'Send us an email',
      icon: <Mail size={20} />,
      action: 'email',
      available: true,
    },
    {
      id: '3',
      title: 'Call Support',
      description: 'Speak with a representative',
      icon: <Phone size={20} />,
      action: 'phone',
      available: true,
    },
    {
      id: '4',
      title: 'Help Center',
      description: 'Browse detailed guides',
      icon: <Book size={20} />,
      action: 'help_center',
      available: true,
    },
  ];

  const handleContact = (method: 'chat' | 'email' | 'phone') => {
    setContactMethod(method);
  };

  const sendMessage = () => {
    if (message.trim()) {
      // Handle message sending
      setMessage('');
      setContactMethod(null);
    }
  };

  if (contactMethod) {
    return (
      <div
        className="min-h-screen pb-20"
        style={{
          backgroundColor: colors.background,
          color: colors.foreground,
        }}
      >
        <div className="px-6 pt-12 pb-4">
          <div className="flex items-center gap-4 mb-6">
            <button 
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setContactMethod(null)}
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold flex-1" style={{ fontFamily: 'Syne, sans-serif' }}>
              {contactMethod === 'chat' ? 'Live Chat' : contactMethod === 'email' ? 'Email Support' : 'Call Support'}
            </h1>
          </div>

          <GlassCard className="p-6">
            {contactMethod === 'chat' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.accent, color: 'white' }}
                  >
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <div className="font-medium">Support Agent</div>
                    <div className="text-xs opacity-70">Online • Typically responds instantly</div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: colors.card }}>
                    <div className="text-sm">Hello! How can I help you today?</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 rounded-2xl py-3 px-4 text-sm outline-none transition-all"
                    style={{
                      backgroundColor: colors.background,
                      border: `1px solid ${colors.border}`,
                      color: colors.foreground,
                    }}
                  />
                  <button
                    onClick={sendMessage}
                    className="p-3 rounded-full"
                    style={{ backgroundColor: colors.accent, color: 'white' }}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            )}

            {contactMethod === 'email' && (
              <div>
                <div className="mb-4">
                  <label className="text-sm opacity-70 mb-2 block">Subject</label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="w-full rounded-2xl py-3 px-4 text-sm outline-none transition-all mb-4"
                    style={{
                      backgroundColor: colors.card,
                      border: `1px solid ${colors.border}`,
                      color: colors.foreground,
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label className="text-sm opacity-70 mb-2 block">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue in detail..."
                    rows={6}
                    className="w-full rounded-2xl py-3 px-4 text-sm outline-none transition-all resize-none"
                    style={{
                      backgroundColor: colors.card,
                      border: `1px solid ${colors.border}`,
                      color: colors.foreground,
                    }}
                  />
                </div>

                <div className="text-xs opacity-60 mb-4">
                  We'll respond within 24 hours at support@azaman.com
                </div>

                <AccentButton onClick={sendMessage} className="w-full">
                  Send Email
                </AccentButton>
              </div>
            )}

            {contactMethod === 'phone' && (
              <div className="text-center">
                <div className="mb-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: colors.accent, color: 'white' }}
                  >
                    <Phone size={32} />
                  </div>
                  <h3 className="font-semibold mb-2">Call Support</h3>
                  <p className="text-sm opacity-70 mb-4">
                    Our support team is available 24/7 to help you
                  </p>
                </div>

                <div className="space-y-3">
                  <GlassCard className="p-4">
                    <div className="font-medium">Ghana Support</div>
                    <div className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
                      +233 302 123 456
                    </div>
                    <div className="text-xs opacity-70">Available 24/7</div>
                  </GlassCard>

                  <GlassCard className="p-4">
                    <div className="font-medium">Emergency Support</div>
                    <div className="text-2xl font-bold text-red-400" style={{ fontFamily: 'Syne, sans-serif' }}>
                      +233 302 999 000
                    </div>
                    <div className="text-xs opacity-70">For fraud/security issues</div>
                  </GlassCard>
                </div>

                <AccentButton className="w-full mt-6">
                  Call Now
                </AccentButton>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    );
  }

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
            Help & Support
          </h1>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help..."
            className="w-full rounded-2xl py-3 pl-11 pr-4 text-sm outline-none transition-all"
            style={{
              backgroundColor: colors.card,
              border: `1px solid ${colors.border}`,
              color: colors.foreground,
            }}
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="font-semibold mb-4">How can we help?</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <GlassCard 
                key={action.id}
                className="p-4 cursor-pointer hover:bg-white/5 transition-all"
                onClick={() => action.action !== 'help_center' && handleContact(action.action as 'chat' | 'email' | 'phone')}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: colors.accent, color: 'white' }}
                >
                  {action.icon}
                </div>
                <h3 className="font-medium text-sm mb-1">{action.title}</h3>
                <p className="text-xs opacity-70">{action.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="mb-6">
          <h2 className="font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category.id ? 'text-white' : ''
                }`}
                style={{
                  backgroundColor: selectedCategory === category.id ? colors.accent : colors.card,
                  border: `1px solid ${colors.border}`,
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {filteredFAQs.map((faq) => (
            <GlassCard key={faq.id} className="overflow-hidden">
              <button
                className="w-full p-4 text-left"
                onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    {expandedFAQ === faq.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                </div>
              </button>
              {expandedFAQ === faq.id && (
                <div className="px-4 pb-4">
                  <div className="text-sm opacity-80 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              )}
            </GlassCard>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-12 opacity-60">
            <HelpCircle size={48} className="mx-auto mb-4" />
            <div className="text-lg font-semibold mb-2">No results found</div>
            <div className="text-sm mb-4">Try adjusting your search or contact support</div>
            <AccentButton onClick={() => setContactMethod('chat')}>
              Contact Support
            </AccentButton>
          </div>
        )}

        {/* Emergency Contact */}
        <GlassCard className="p-4 mt-8 border border-red-500/20">
          <div className="flex items-center gap-3">
            <Phone size={20} className="text-red-400" />
            <div>
              <div className="font-medium text-sm text-red-400">Emergency Support</div>
              <div className="text-xs opacity-70">For fraud or security issues: +233 302 999 000</div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default HelpSupport;
