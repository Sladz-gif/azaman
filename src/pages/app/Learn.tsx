import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, BookOpen, Check } from 'lucide-react';
import { businessEmpireChapters, mockArticles } from '@/data/mockData';

const articles = [
  { title: 'Budgeting 101: The 50/30/20 Rule for Ghana', emoji: '📊', readTime: 5, body: 'The 50/30/20 rule is a simple budgeting framework. Allocate 50% of your income to needs (rent, food, transport), 30% to wants (entertainment, new clothes), and 20% to savings and debt repayment.\n\nIn the Ghanaian context, this might look different. If you are a student at Legon getting GH₵ 1,000 monthly allowance:\n\nNeeds (GH₵ 500): Hostel fees contribution, food from Night Market, transport to campus.\n\nWants (GH₵ 300): Data bundles for social media, going out with friends, buying snacks.\n\nSavings (GH₵ 200): Setting aside for emergencies, saving towards a laptop, or investing in treasury bills.\n\nThe key is consistency. Even small amounts add up over a semester.' },
  { title: 'Starting a Lean Business in Ghana', emoji: '🚀', readTime: 7, body: 'Starting a business does not require millions. Many successful Ghanaian businesses started with less than GH₵ 500.\n\nStep 1: Find a problem people will pay to solve. Look around campus. What do students complain about? Printing? Delivery? Laundry?\n\nStep 2: Start small and test. Before investing big, test your idea. Sell to 10 people first.\n\nStep 3: Reinvest profits. Do not spend everything you earn. Put at least 40% back into the business.\n\nStep 4: Use social media. Instagram and WhatsApp are free marketing channels. Post consistently.\n\nStep 5: Keep records. Track every cedi coming in and going out. This is what separates businesses that grow from ones that collapse.' },
  { title: 'How to Read a Bank Statement', emoji: '🏦', readTime: 4, body: 'Your bank statement is a record of every transaction on your account. Understanding it helps you track spending and catch errors.\n\nKey columns: Date, Description, Debit (money out), Credit (money in), Balance.\n\nLook for: Recurring charges you forgot about. Fees you did not expect. Transactions you do not recognize.\n\nTip: Download your statement monthly. Compare it with your personal records. If something looks wrong, contact your bank immediately.' },
  { title: 'Susu Groups: Traditional Savings Explained', emoji: '🤝', readTime: 6, body: 'Susu is a traditional savings practice common across West Africa, especially in Ghana. In a susu group, members contribute a fixed amount regularly, and the total pot rotates to one member each cycle.\n\nExample: 10 friends each contribute GH₵ 100 weekly. Each week, one person takes the full GH₵ 1,000. After 10 weeks, everyone has received their pot once.\n\nBenefits: Forces savings discipline, provides access to lump sums, builds community trust.\n\nRisks: Members may default. The susu collector might disappear. No legal protection.\n\nDigital susu (like Azaman groups) solves these problems by automating contributions and tracking everything transparently.' },
  { title: 'Investing as a Student: Where to Start', emoji: '📈', readTime: 5, body: 'You do not need to be rich to start investing. In Ghana, you can begin with as little as GH₵ 100.\n\nTreasury Bills: Government backed, low risk. The 91 day T-bill is the most popular. You lend money to the government and earn interest.\n\nFixed Deposits: Banks offer higher interest rates if you lock your money for a fixed period.\n\nMutual Funds: Pool your money with other investors. A professional manages the fund for you.\n\nStart with what you can afford to lose. Learn as you go. The earlier you start, the more time your money has to grow.' },
];

const AppLearn = () => {
  const [view, setView] = useState<'main' | 'game' | 'article'>('main');
  const [currentChapter, setCurrentChapter] = useState(0);
  const [gameState, setGameState] = useState({ cash: 5000, health: 100, reputation: 50, chapter: 0, narrative: '', businessType: '' });
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [readArticles, setReadArticles] = useState<number[]>([]);

  const handleChoice = (choice: typeof businessEmpireChapters[0]['choices'][0]) => {
    setGameState((prev) => ({
      ...prev,
      cash: prev.cash + choice.outcome.cash,
      health: Math.max(0, Math.min(100, prev.health + choice.outcome.health - 100)),
      reputation: Math.max(0, Math.min(100, prev.reputation + choice.outcome.reputation - 50)),
      narrative: choice.outcome.narrative,
      chapter: prev.chapter + 1,
    }));
    setCurrentChapter((c) => c + 1);
  };

  const resetGame = () => {
    setGameState({ cash: 5000, health: 100, reputation: 50, chapter: 0, narrative: '', businessType: '' });
    setCurrentChapter(0);
    setView('main');
  };

  if (view === 'article' && selectedArticle !== null) {
    const article = articles[selectedArticle];
    return (
      <div className="p-4 max-w-lg mx-auto space-y-6">
        <button onClick={() => setView('main')} className="flex items-center gap-1 font-body text-sm text-muted-foreground">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-2">
          <span className="font-body text-xs text-muted-foreground glass px-2 py-0.5 rounded-full">{article.readTime} min read</span>
        </div>
        <h1 className="font-display font-extrabold text-2xl">{article.title}</h1>
        <div className="font-body text-sm text-muted-foreground leading-[1.7] whitespace-pre-line">{article.body}</div>
        <button
          onClick={() => { if (!readArticles.includes(selectedArticle)) setReadArticles([...readArticles, selectedArticle]); }}
          className={`w-full py-3 rounded-full font-display font-bold text-sm ${readArticles.includes(selectedArticle) ? 'glass text-neon' : 'gradient-gold text-primary-foreground'}`}
        >
          {readArticles.includes(selectedArticle) ? <><Check className="inline w-4 h-4 mr-1" /> Read</> : 'Mark as Read'}
        </button>
      </div>
    );
  }

  if (view === 'game') {
    const chapter = businessEmpireChapters[currentChapter];
    if (!chapter || currentChapter >= businessEmpireChapters.length) {
      return (
        <div className="p-4 max-w-lg mx-auto space-y-6 text-center">
          <h2 className="font-display font-extrabold text-2xl">Chapter Complete!</h2>
          <div className="glass-card p-6 space-y-3">
            <p className="font-body text-sm text-muted-foreground">{gameState.narrative}</p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div><p className="font-display font-bold text-lg text-primary">GH₵ {gameState.cash.toLocaleString()}</p><p className="font-body text-[10px] text-muted-foreground">Cash</p></div>
              <div><p className="font-display font-bold text-lg text-neon">{gameState.health}%</p><p className="font-body text-[10px] text-muted-foreground">Health</p></div>
              <div><p className="font-display font-bold text-lg text-ice">{gameState.reputation}</p><p className="font-body text-[10px] text-muted-foreground">Reputation</p></div>
            </div>
          </div>
          <p className="font-body text-sm text-muted-foreground">More chapters coming soon. Keep learning to unlock Chapter 3+.</p>
          <button onClick={resetGame} className="gradient-gold text-primary-foreground font-display font-bold py-3 px-8 rounded-full">Back to Learn</button>
        </div>
      );
    }

    return (
      <div className="p-4 max-w-lg mx-auto space-y-6">
        <button onClick={() => setView('main')} className="flex items-center gap-1 font-body text-sm text-muted-foreground">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center justify-between">
          <span className="font-body text-xs text-muted-foreground">Chapter {chapter.id} of 12</span>
          <div className="flex gap-4 text-xs font-body">
            <span>💰 GH₵ {gameState.cash.toLocaleString()}</span>
            <span>❤️ {gameState.health}%</span>
            <span>⭐ {gameState.reputation}</span>
          </div>
        </div>
        {gameState.narrative && (
          <div className="glass-card p-4">
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{gameState.narrative}</p>
          </div>
        )}
        <h2 className="font-display font-extrabold text-xl">{chapter.title}</h2>
        <p className="font-body text-sm text-muted-foreground">{chapter.description}</p>
        <div className="space-y-3">
          {chapter.choices.map((choice) => (
            <motion.button
              key={choice.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleChoice(choice)}
              className="w-full glass-card p-4 text-left font-body text-sm hover:border-primary/30 transition-colors"
            >
              {choice.text}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 max-w-lg mx-auto">
      {/* Games */}
      <div>
        <p className="font-display font-bold text-[11px] text-primary uppercase tracking-widest mb-3">Games</p>
        <div className="space-y-4">
          <motion.div whileTap={{ scale: 0.98 }} onClick={() => setView('game')} className="glass-card p-5 cursor-pointer hover:border-primary/30 transition-colors" style={{ background: 'linear-gradient(135deg, hsl(0 0% 4%), hsl(0 0% 12%))' }}>
            <span className="text-3xl block mb-3">🏪</span>
            <h3 className="font-display font-bold text-lg mb-1">Business Empire</h3>
            <p className="font-body text-xs text-muted-foreground mb-3">Start a kiosk in Legon. Survive 12 chapters of business decisions.</p>
            <div className="flex gap-2">
              <span className="font-body text-[10px] glass px-2 py-0.5 rounded-full">12 Chapters</span>
              <span className="font-body text-[10px] glass px-2 py-0.5 rounded-full">Branching Story</span>
            </div>
            <button className="mt-4 gradient-gold text-primary-foreground font-display font-bold text-sm py-2.5 px-6 rounded-full">Start Playing</button>
          </motion.div>

          <div className="glass-card p-5 opacity-70" style={{ background: 'linear-gradient(135deg, hsl(0 0% 4%), hsl(0 0% 12%))' }}>
            <span className="text-3xl block mb-3">📈</span>
            <h3 className="font-display font-bold text-lg mb-1">Market Minds</h3>
            <p className="font-body text-xs text-muted-foreground mb-3">Invest GH₵ 5,000 (virtual). React to live-simulated market events.</p>
            <div className="flex gap-2">
              <span className="font-body text-[10px] glass px-2 py-0.5 rounded-full">Strategy</span>
              <span className="font-body text-[10px] glass px-2 py-0.5 rounded-full">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div>
        <p className="font-display font-bold text-[11px] text-primary uppercase tracking-widest mb-3">Financial Literacy</p>
        <p className="font-body text-xs text-muted-foreground mb-4">{readArticles.length}/{articles.length} articles read</p>
        <div className="space-y-3">
          {articles.map((article, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setSelectedArticle(i); setView('article'); }}
              className="w-full glass-card p-4 flex items-center gap-3 text-left hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg shrink-0">{article.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-sm truncate">{article.title}</p>
                <p className="font-body text-[10px] text-muted-foreground">{article.readTime} min read</p>
              </div>
              {readArticles.includes(i) && <Check className="w-4 h-4 text-neon shrink-0" />}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppLearn;
