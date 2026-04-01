import { create } from 'zustand';
import { mockUser, mockTransactions, mockSavingsGoals, mockTickets, mockCampaigns } from '@/data/mockData';
import type { Transaction, SavingsGoal, TicketEvent, CrowdfundCampaign } from '@/types';

interface AppState {
  user: typeof mockUser;
  transactions: Transaction[];
  savingsGoals: SavingsGoal[];
  tickets: TicketEvent[];
  campaigns: CrowdfundCampaign[];
  purchasedTickets: string[];
  isOnboarded: boolean;
  currentTab: string;

  setOnboarded: (v: boolean) => void;
  setCurrentTab: (tab: string) => void;
  sendMoney: (to: string, amount: number, note: string) => void;
  addSavingsGoal: (goal: SavingsGoal) => void;
  buyTicket: (ticketId: string) => void;
  addReaction: (txId: string, emoji: string) => void;
  supportCampaign: (campaignId: string, amount: number) => void;
  updateBalance: (amount: number) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: mockUser,
  transactions: mockTransactions,
  savingsGoals: mockSavingsGoals,
  tickets: mockTickets,
  campaigns: mockCampaigns,
  purchasedTickets: [],
  isOnboarded: false,
  currentTab: 'home',

  setOnboarded: (v) => set({ isOnboarded: v }),
  setCurrentTab: (tab) => set({ currentTab: tab }),

  sendMoney: (to, amount, note) => {
    const newTx: Transaction = {
      id: Date.now().toString(),
      name: to,
      username: to,
      amount,
      type: 'out',
      category: 'Transfer',
      emoji: '↑',
      date: 'Just now',
      note,
    };
    set((s) => ({
      transactions: [newTx, ...s.transactions],
      user: { ...s.user, balance: s.user.balance - amount },
    }));
  },

  addSavingsGoal: (goal) => set((s) => ({ savingsGoals: [...s.savingsGoals, goal] })),

  buyTicket: (ticketId) => {
    const ticket = get().tickets.find((t) => t.id === ticketId);
    if (!ticket || ticket.status === 'sold-out') return;
    set((s) => ({
      purchasedTickets: [...s.purchasedTickets, ticketId],
      user: { ...s.user, balance: s.user.balance - ticket.price },
      tickets: s.tickets.map((t) =>
        t.id === ticketId ? { ...t, remaining: t.remaining - 1 } : t
      ),
      transactions: [
        {
          id: Date.now().toString(),
          name: ticket.name,
          username: 'tickets',
          amount: ticket.price,
          type: 'out',
          category: 'Entertainment',
          emoji: '🎫',
          date: 'Just now',
          note: `Ticket for ${ticket.name}`,
        },
        ...s.transactions,
      ],
    }));
  },

  addReaction: (txId, emoji) =>
    set((s) => ({
      transactions: s.transactions.map((t) =>
        t.id === txId ? { ...t, reaction: emoji } : t
      ),
    })),

  supportCampaign: (campaignId, amount) => {
    set((s) => ({
      user: { ...s.user, balance: s.user.balance - amount },
      campaigns: s.campaigns.map((c) =>
        c.id === campaignId
          ? { ...c, raised: c.raised + amount, donorCount: c.donorCount + 1 }
          : c
      ),
      transactions: [
        {
          id: Date.now().toString(),
          name: `Campaign: ${s.campaigns.find((c) => c.id === campaignId)?.title || ''}`,
          username: 'crowdfund',
          amount,
          type: 'out',
          category: 'Transfer',
          emoji: '🤝',
          date: 'Just now',
          note: 'Crowdfunding support',
        },
        ...s.transactions,
      ],
    }));
  },

  updateBalance: (amount) =>
    set((s) => ({ user: { ...s.user, balance: s.user.balance + amount } })),
}));
