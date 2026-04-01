import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Search, Bookmark, Share2, MessageCircle } from 'lucide-react';
import { mockArticles, mockMarketData } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const categories = ['All', 'Business', 'Finance', 'Ghana Economy', 'Startups', 'Student Life', 'Markets'];

const NewsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [comments, setComments] = useState<Record<string, string[]>>({});
  const [newComment, setNewComment] = useState('');
  const [bookmarked, setBookmarked] = useState<string[]>([]);

  const filtered = mockArticles.filter((a) => {
    const matchCat = selectedCategory === 'All' || a.category === selectedCategory;
    const matchSearch = !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.find((a) => a.featured) || filtered[0];
  const rest = filtered.filter((a) => a.id !== featured?.id);

  const article = selectedArticle ? mockArticles.find((a) => a.id === selectedArticle) : null;

  if (article) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 glass border-b border-border/50 px-4 h-14 flex items-center justify-between">
          <button onClick={() => setSelectedArticle(null)} className="flex items-center gap-1 font-body text-sm text-muted-foreground">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex gap-2">
            <button onClick={() => setBookmarked((b) => b.includes(article.id) ? b.filter((x) => x !== article.id) : [...b, article.id])}>
              <Bookmark className={`w-5 h-5 ${bookmarked.includes(article.id) ? 'fill-primary text-primary' : ''}`} />
            </button>
            <button onClick={() => navigator.share?.({ text: article.title })}><Share2 className="w-5 h-5" /></button>
          </div>
        </header>
        <div className="max-w-2xl mx-auto p-4 space-y-6">
          <div className="flex items-center gap-2">
            <span className="font-body text-xs glass px-2 py-0.5 rounded-full text-primary">{article.category}</span>
            <span className="font-body text-xs text-muted-foreground">{article.readTime} min read</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl leading-tight">{article.title}</h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center text-[10px] font-display font-bold text-primary-foreground">CN</div>
            <div>
              <p className="font-body text-xs font-medium">{article.source}</p>
              <p className="font-body text-[10px] text-muted-foreground">{article.date}</p>
            </div>
          </div>
          <div className="font-body text-sm text-muted-foreground leading-[1.7] whitespace-pre-line">{article.body}</div>

          {/* Comments */}
          <div className="space-y-4 border-t border-border pt-6">
            <h3 className="font-display font-bold text-sm flex items-center gap-2"><MessageCircle className="w-4 h-4" /> Comments</h3>
            <div className="flex gap-2">
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value.slice(0, 200))}
                placeholder="Share your thoughts..."
                maxLength={200}
                className="flex-1 bg-secondary rounded-xl py-2.5 px-4 font-body text-sm outline-none"
              />
              <button
                onClick={() => { if (newComment.trim()) { setComments((c) => ({ ...c, [article.id]: [...(c[article.id] || []), newComment] })); setNewComment(''); } }}
                className="gradient-gold text-primary-foreground font-display font-bold text-sm px-4 rounded-xl"
              >
                Post
              </button>
            </div>
            {(comments[article.id] || []).map((c, i) => (
              <div key={i} className="glass-card p-3">
                <p className="font-body text-xs">{c}</p>
              </div>
            ))}
          </div>

          {/* Related */}
          <div className="space-y-3 border-t border-border pt-6">
            <h3 className="font-display font-bold text-sm">Related Stories</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {mockArticles.filter((a) => a.id !== article.id).slice(0, 3).map((a) => (
                <button key={a.id} onClick={() => { setSelectedArticle(a.id); window.scrollTo(0, 0); }} className="glass-card p-3 min-w-[200px] text-left shrink-0">
                  <p className="font-body text-[10px] text-primary mb-1">{a.category}</p>
                  <p className="font-display font-bold text-xs line-clamp-2">{a.title}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 glass border-b border-border/50 px-4 h-14 flex items-center justify-between">
        <button onClick={() => navigate('/app')} className="flex items-center gap-1 font-body text-sm text-muted-foreground">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <span className="font-display font-extrabold text-lg">Azaman News</span>
        <button onClick={() => setShowSearch(!showSearch)}><Search className="w-5 h-5" /></button>
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {showSearch && (
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search news..." autoFocus className="w-full bg-secondary rounded-xl py-3 px-4 font-body text-sm outline-none" />
        )}

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`shrink-0 px-4 py-2 rounded-full font-body text-xs transition-colors ${selectedCategory === cat ? 'bg-primary text-primary-foreground' : 'glass'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Markets */}
        <div>
          <h3 className="font-display font-bold text-sm mb-3">Markets Today</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {mockMarketData.map((m, i) => (
              <div key={i} className="glass-card p-3 min-w-[140px] shrink-0">
                <p className="font-body text-[10px] text-muted-foreground">{m.label}</p>
                <p className="font-display font-bold text-sm">{m.value}</p>
                <p className={`font-body text-xs ${m.positive ? 'text-neon' : 'text-destructive'}`}>{m.change}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured */}
        {featured && (
          <motion.button
            onClick={() => setSelectedArticle(featured.id)}
            whileTap={{ scale: 0.98 }}
            className="w-full glass-card overflow-hidden text-left"
            style={{ background: 'linear-gradient(135deg, hsl(0 0% 4%), hsl(0 0% 12%))' }}
          >
            <div className="h-[200px] bg-gradient-to-br from-primary/20 to-transparent flex items-end p-5">
              <div>
                <span className="font-body text-[10px] glass px-2 py-0.5 rounded-full text-primary">{featured.category}</span>
                <h3 className="font-display font-bold text-lg mt-2">{featured.title}</h3>
                <p className="font-body text-xs text-muted-foreground mt-1">{featured.source} · {featured.date} · {featured.readTime} min</p>
              </div>
            </div>
          </motion.button>
        )}

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {rest.map((a) => (
            <motion.button key={a.id} onClick={() => setSelectedArticle(a.id)} whileTap={{ scale: 0.98 }} className="glass-card p-4 text-left hover:border-primary/30 transition-colors">
              <span className="font-body text-[10px] text-primary">{a.category}</span>
              <h4 className="font-display font-bold text-sm mt-1 line-clamp-2">{a.title}</h4>
              <p className="font-body text-[10px] text-muted-foreground mt-2">{a.source} · {a.date} · {a.readTime} min</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
