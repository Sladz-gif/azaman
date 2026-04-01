import { Transaction, SavingsGoal, TicketEvent, NewsArticle, GameChapter, CrowdfundCampaign } from '@/types';

export const mockUser = {
  name: 'Kwame Asante',
  username: 'kwame.azaman',
  university: 'University of Ghana',
  balance: 4820.50,
  savings: 2150.00,
  invested: 800.00,
  spentThisMonth: 1230.75,
  monthChange: 2.4,
  accountType: 'personal' as const,
  pin: '1234',
  referralCode: 'KWAME2024',
  referralCount: 3,
  referralEarnings: 15,
  literacyScore: 3,
};

export const mockTransactions: Transaction[] = [
  { id: '1', name: 'Ama Serwaa', username: 'ama.serwaa', amount: 150, type: 'in', category: 'Transfer', emoji: '💰', date: '2 mins ago', note: 'Jollof money 🔥' },
  { id: '2', name: 'Night Market', username: 'nightmarket', amount: 45, type: 'out', category: 'Food & Drink', emoji: '🍗', date: '1 hour ago', note: 'Kelewele and grilled tilapia' },
  { id: '3', name: 'Kofi Mensah', username: 'kofi.m', amount: 200, type: 'out', category: 'Transfer', emoji: '↑', date: '3 hours ago', note: 'Group project contribution' },
  { id: '4', name: 'MTN MoMo', username: 'mtn', amount: 500, type: 'in', category: 'Top Up', emoji: '📱', date: 'Yesterday', note: 'Monthly top up' },
  { id: '5', name: 'Bolt Rides', username: 'bolt', amount: 28, type: 'out', category: 'Transport', emoji: '🚗', date: 'Yesterday', note: 'Legon to Osu' },
  { id: '6', name: 'Afua Darko', username: 'afua.d', amount: 75, type: 'in', category: 'Transfer', emoji: '💰', date: '2 days ago', note: 'Paid you back for data' },
];

export const mockSavingsGoals: SavingsGoal[] = [
  { id: '1', name: 'MacBook Pro', emoji: '💻', target: 15000, saved: 10200, frequency: 'daily', frequencyAmount: 50, locked: true, missesUsed: 1, maxMisses: 5, status: 'active' },
  { id: '2', name: 'Afro Nation Ticket', emoji: '🎵', target: 800, saved: 256, frequency: 'weekly', frequencyAmount: 100, locked: false, missesUsed: 0, maxMisses: 5, status: 'active' },
  { id: '3', name: 'Emergency Fund', emoji: '🛡️', target: 5000, saved: 3200, frequency: 'monthly', frequencyAmount: 500, locked: true, missesUsed: 2, maxMisses: 5, status: 'active' },
];

export const mockTickets: TicketEvent[] = [
  { id: '1', name: 'Afro Nation Ghana 2026', location: 'Marine Drive, Accra', date: 'Dec 28, 2026', price: 800, remaining: 234, status: 'live', description: 'The biggest Afrobeats festival returns to Accra. Three days of non-stop music with your favorite artists.' },
  { id: '2', name: 'Legon Hall Week', location: 'University of Ghana, Legon', date: 'Mar 15, 2026', price: 50, remaining: 1200, status: 'upcoming', description: 'Annual Legon Hall cultural week celebration with performances, food, and vibes.' },
  { id: '3', name: 'Detty Rave', location: 'Untamed Empire, Accra', date: 'Dec 22, 2026', price: 350, remaining: 0, status: 'sold-out', description: 'Ghana s biggest end of year party. Three stages, 50 artists, one night.' },
  { id: '4', name: 'TEDx University of Ghana', location: 'Great Hall, Legon', date: 'Apr 20, 2026', price: 120, remaining: 89, status: 'upcoming', description: 'Ideas worth spreading. Hear from Ghana s most innovative thinkers and doers.' },
];

export const mockArticles: NewsArticle[] = [
  { id: '1', title: 'Ghana Cedi Stabilizes After Central Bank Intervention', source: 'Citi Business News', category: 'Ghana Economy', readTime: 5, date: '2 hours ago', featured: true, summary: 'The Bank of Ghana stepped in this week to support the cedi, which has shown signs of recovery against the US dollar.', body: 'The Bank of Ghana announced new measures to stabilize the cedi this week, following months of gradual depreciation against major international currencies. The central bank increased its policy rate by 100 basis points and introduced new foreign exchange auction mechanisms.\n\nTraders at the Accra forex bureaus reported that the cedi gained 2.3% against the dollar in the past week, bringing some relief to importers and consumers alike. "We are seeing more confidence in the market," said Kofi Amoah, a senior forex dealer at a major bank in Accra.\n\nThe stabilization comes at a crucial time for businesses preparing for the festive season, when demand for foreign currency typically spikes.' },
  { id: '2', title: 'UG Student Launches Delivery App, Signs 200 Vendors in First Month', source: 'Startup Ghana', category: 'Startups', readTime: 4, date: '5 hours ago', summary: 'A final year computer science student at the University of Ghana has built a campus delivery platform that is already profitable.', body: 'Kwesi Boateng, a final-year computer science student at the University of Ghana, launched "CampusQ" just four weeks ago. The app connects campus food vendors with students who want delivery to their halls of residence.\n\n"I was tired of walking to Night Market in the rain," Kwesi told Startup Ghana. "So I built something that solves that problem for everyone."\n\nThe app has already onboarded 200 vendors and processes over 500 orders daily. Kwesi takes a 5% commission on each order, making the venture profitable from week two.' },
  { id: '3', title: 'How Susu Groups Are Going Digital in 2026', source: 'Joy Business', category: 'Finance', readTime: 6, date: '1 day ago', summary: 'Traditional rotating savings groups are finding new life through mobile apps, combining centuries old financial wisdom with modern technology.', body: 'Susu, the traditional rotating savings and credit system practiced across West Africa for centuries, is getting a digital makeover. Several Ghanaian fintech startups are building platforms that digitize the susu experience while keeping the communal trust that makes it work.\n\n"The beauty of susu is that it forces discipline," says Abena Osei, founder of SusuApp. "Our job is to keep that discipline but remove the risk of the collector running away with your money."\n\nDigital susu platforms now serve over 100,000 users across Ghana, with the average group size being 8 to 12 members contributing between GH₵ 50 and GH₵ 500 per cycle.' },
  { id: '4', title: 'GSE Composite Index Hits 5 Year High', source: 'Ghana Stock Exchange', category: 'Markets', readTime: 3, date: '1 day ago', summary: 'The Ghana Stock Exchange composite index reached its highest level in five years, driven by strong performance in the banking sector.', body: 'The Ghana Stock Exchange (GSE) Composite Index rose by 3.2% this week to reach 3,847 points, its highest level since 2021. The rally was led by strong gains in banking stocks, with GCB Bank and Ecobank Ghana both posting double digit weekly gains.' },
  { id: '5', title: 'NHIS Registration Goes Fully Digital for Students', source: 'GhanaWeb', category: 'Student Life', readTime: 4, date: '2 days ago', summary: 'Students can now register for the National Health Insurance Scheme entirely online, eliminating queues at district offices.', body: 'The National Health Insurance Authority has launched a fully digital registration process for students at accredited institutions. The new system allows students to register, renew, and check their NHIS status through a mobile app.' },
  { id: '6', title: '5 Side Hustles Every Legon Student Should Consider', source: 'Campus Hustle', category: 'Student Life', readTime: 7, date: '3 days ago', summary: 'From tutoring to content creation, here are five proven ways to earn while you study at the University of Ghana.', body: 'University life in Ghana comes with expenses that allowances alone cannot cover. Here are five side hustles that Legon students are using to boost their income without sacrificing their academics.\n\n1. Tutoring junior students in your best subjects\n2. Social media management for small businesses\n3. Printing and binding services from your hall room\n4. Food delivery within campus\n5. Content creation and campus influencing' },
  { id: '7', title: 'Mobile Money Transactions Hit GH₵ 2 Trillion in 2025', source: 'Bank of Ghana', category: 'Finance', readTime: 5, date: '4 days ago', summary: 'Ghana s mobile money ecosystem continues to grow at an unprecedented rate, with total transaction values exceeding GH₵ 2 trillion last year.', body: 'Data from the Bank of Ghana shows that mobile money transactions in the country reached GH₵ 2.1 trillion in 2025, representing a 28% increase over the previous year. The number of registered mobile money accounts now stands at 65 million.' },
  { id: '8', title: 'Young Ghanaian Entrepreneurs Win $100K at Africa Startup Awards', source: 'TechCabal', category: 'Startups', readTime: 4, date: '5 days ago', summary: 'A team of young Ghanaians took home the grand prize at this year s Africa Startup Awards for their agricultural supply chain solution.', body: 'FarmLink Ghana, a startup founded by three University of Ghana alumni, won the $100,000 grand prize at this year s Africa Startup Awards in Nairobi. The company connects smallholder farmers directly with market traders using a simple USSD and mobile app platform.' },
];

export const mockMarketData = [
  { label: 'GSE Composite', value: '3,847.21', change: '+3.2%', positive: true },
  { label: 'USD/GHS', value: '14.85', change: '-0.5%', positive: true },
  { label: 'GHS/NGN', value: '108.42', change: '+1.1%', positive: true },
  { label: 'Inflation', value: '21.3%', change: '-0.8%', positive: true },
];

export const businessEmpireChapters: GameChapter[] = [
  {
    id: 1,
    title: 'Choose Your Hustle',
    description: 'You have GH₵ 5,000 to start a business near Legon campus. What will you sell?',
    unlocked: true,
    choices: [
      { id: '1a', text: 'Open a food kiosk near Night Market', outcome: { cash: -2000, health: 80, reputation: 60, narrative: 'You set up a small food kiosk near Night Market. The location is prime but competition is fierce. You spent GH₵ 2,000 on equipment and your first stock of ingredients.' } },
      { id: '1b', text: 'Start a phone accessories shop at the mall', outcome: { cash: -3000, health: 70, reputation: 50, narrative: 'You rented a small space in Legon Mall and stocked up on phone cases, chargers, and earphones. The rent is high but foot traffic is steady. You spent GH₵ 3,000 getting started.' } },
      { id: '1c', text: 'Launch a fashion brand selling online', outcome: { cash: -1500, health: 90, reputation: 40, narrative: 'You started an online fashion brand, designing custom T-shirts and selling on Instagram. Low overhead but building a customer base takes time. You spent GH₵ 1,500 on your first batch.' } },
      { id: '1d', text: 'Open a printing and photocopy center', outcome: { cash: -2500, health: 85, reputation: 70, narrative: 'You bought a printer, photocopier, and binding machine, setting up near the Department of Computer Science. Students will always need to print. You spent GH₵ 2,500.' } },
    ],
  },
  {
    id: 2,
    title: 'The First Month',
    description: 'Your business is open. The first month brings surprises.',
    unlocked: true,
    choices: [
      { id: '2a', text: 'Invest in social media marketing', outcome: { cash: -300, health: 75, reputation: 80, narrative: 'You hired a campus influencer to promote your business. Orders spiked by 40% but you spent GH₵ 300 on the campaign. Your reputation on campus is growing.' } },
      { id: '2b', text: 'Keep prices low to attract more customers', outcome: { cash: 200, health: 70, reputation: 65, narrative: 'Your low prices attracted plenty of customers. You made GH₵ 200 profit but your margins are thin. Some friends say you are undervaluing your work.' } },
      { id: '2c', text: 'Focus on quality and charge premium prices', outcome: { cash: 500, health: 85, reputation: 75, narrative: 'You focused on delivering the best quality possible. Fewer customers came but each one spent more. You made GH₵ 500 profit and earned a reputation for excellence.' } },
      { id: '2d', text: 'Partner with another student business', outcome: { cash: 100, health: 80, reputation: 85, narrative: 'You partnered with a fellow student entrepreneur to cross promote. Both businesses benefited. You made GH₵ 100 profit but your network grew significantly.' } },
    ],
  },
];

export const mockCampaigns: CrowdfundCampaign[] = [
  { id: '1', title: 'Help Me Get a Laptop for Final Year', emoji: '💻', description: 'My laptop broke down right before my final year project deadline. I need GH₵ 3,000 to get a replacement so I can complete my thesis.', target: 3000, raised: 1850, daysLeft: 12, donorCount: 24, category: 'Education', creator: 'kwame.azaman', isOwned: true },
  { id: '2', title: 'Legon Food Bank Initiative', emoji: '🍲', description: 'We are collecting funds to set up a food bank that supports students who struggle to afford meals during the semester.', target: 10000, raised: 7200, daysLeft: 20, donorCount: 156, category: 'Emergency', creator: 'ama.food', isOwned: false },
  { id: '3', title: 'Campus Clean Up Drive Equipment', emoji: '🌱', description: 'Buying bins, gloves, and cleanup materials for a monthly campus beautification project at the University of Ghana.', target: 2000, raised: 450, daysLeft: 30, donorCount: 18, category: 'Project', creator: 'green.legon', isOwned: false },
];

export const recentRecipients = [
  { name: 'Ama S.', username: 'ama.serwaa', initials: 'AS' },
  { name: 'Kofi M.', username: 'kofi.m', initials: 'KM' },
  { name: 'Afua D.', username: 'afua.d', initials: 'AD' },
  { name: 'Yaw B.', username: 'yaw.b', initials: 'YB' },
  { name: 'Esi K.', username: 'esi.k', initials: 'EK' },
];

export const budgetTemplates = [
  { id: '1', name: 'Student Budget', emoji: '🎓', description: 'For allowances, part-time income, and campus expenses', categories: ['Rent', 'Food', 'Transport', 'Data/Airtime', 'Books', 'Entertainment', 'Savings'] },
  { id: '2', name: 'Campus Household', emoji: '🏠', description: 'Split costs with your roommates', categories: ['Rent', 'Utilities', 'Shared Food', 'Cleaning', 'Internet', 'Emergency Fund'] },
  { id: '3', name: 'Event Budget', emoji: '🎉', description: 'Plan your graduation, birthday, or hall week', categories: ['Venue', 'Food & Drinks', 'Decoration', 'Music/DJ', 'Outfits', 'Transport', 'Miscellaneous'] },
  { id: '4', name: 'Business Budget', emoji: '💼', description: 'Track revenue and expenses for your side hustle', categories: ['Revenue', 'Cost of Goods', 'Rent', 'Marketing', 'Staff', 'Transport', 'Profit'] },
  { id: '5', name: 'Custom', emoji: '📐', description: 'Start from scratch with your own categories', categories: [] },
];
