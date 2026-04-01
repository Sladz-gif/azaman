export interface Transaction {
  id: string;
  name: string;
  username: string;
  amount: number;
  type: 'in' | 'out';
  category: string;
  emoji: string;
  date: string;
  note?: string;
  reaction?: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  emoji: string;
  target: number;
  saved: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  frequencyAmount: number;
  locked: boolean;
  missesUsed: number;
  maxMisses: number;
  status: 'active' | 'paused' | 'completed' | 'cancelled';
}

export interface TicketEvent {
  id: string;
  name: string;
  location: string;
  date: string;
  price: number;
  remaining: number;
  status: 'live' | 'upcoming' | 'sold-out';
  description: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  category: string;
  readTime: number;
  date: string;
  summary: string;
  body: string;
  featured?: boolean;
}

export interface GameChapter {
  id: number;
  title: string;
  description: string;
  choices: GameChoice[];
  unlocked: boolean;
}

export interface GameChoice {
  id: string;
  text: string;
  outcome: {
    cash: number;
    health: number;
    reputation: number;
    narrative: string;
  };
}

export interface CrowdfundCampaign {
  id: string;
  title: string;
  emoji: string;
  description: string;
  target: number;
  raised: number;
  daysLeft: number;
  donorCount: number;
  category: string;
  creator: string;
  isOwned: boolean;
}
