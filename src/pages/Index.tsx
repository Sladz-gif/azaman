import { motion } from 'framer-motion';
import { ArrowRight, Send, PiggyBank, Ticket, BookOpen, TrendingUp, Smartphone, Shield, Zap, Users, ChevronRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appMockup from '@/assets/app-mockup.png';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <span className="font-display font-extrabold text-xl text-primary tracking-tight">AZAMAN</span>
        <div className="hidden md:flex items-center gap-8 font-body text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#testimonials" className="hover:text-foreground transition-colors">Stories</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => navigate('/app')} className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Sign in</button>
          <button onClick={() => navigate('/app')} className="gradient-gold text-primary-foreground font-display font-bold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity">
            Get Started <ArrowRight className="inline w-4 h-4 ml-1" />
          </button>
        </div>
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden glass border-t border-border/50 p-4 space-y-3">
          <a href="#features" className="block py-2 text-sm text-muted-foreground" onClick={() => setOpen(false)}>Features</a>
          <a href="#how-it-works" className="block py-2 text-sm text-muted-foreground" onClick={() => setOpen(false)}>How It Works</a>
          <a href="#testimonials" className="block py-2 text-sm text-muted-foreground" onClick={() => setOpen(false)}>Stories</a>
          <button onClick={() => { setOpen(false); navigate('/app'); }} className="w-full gradient-gold text-primary-foreground font-display font-bold text-sm px-5 py-2.5 rounded-full mt-2">Get Started</button>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass-card px-4 py-2 text-xs font-body text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              Built for Legon. Made for everyone.
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-balance">
              Drop Aza, make a send{' '}
              <span className="gradient-text-gold">send you some coins</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">
              The fintech super-app for Ghanaian students. Send money, save smart, buy tickets, learn financial skills, and grow your hustle. All in one place.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate('/app')} className="gradient-gold text-primary-foreground font-display font-bold text-base px-8 py-4 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                Start Vibing <ArrowRight className="w-5 h-5" />
              </button>
              <a href="#features" className="glass-card font-display font-bold text-base px-8 py-4 rounded-full text-foreground hover:bg-secondary/50 transition-colors text-center">
                See Features
              </a>
            </motion.div>
            <motion.div variants={fadeUp} className="flex items-center gap-6 pt-2">
              <div className="flex -space-x-3">
                {['KA', 'AS', 'YB', 'EK'].map((initials, i) => (
                  <div key={i} className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-xs font-display font-bold text-primary-foreground border-2 border-background">
                    {initials}
                  </div>
                ))}
              </div>
              <div className="font-body text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">2,400+</span> students already on Azaman
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-8 bg-primary/20 rounded-full blur-[80px]" />
              <img src={appMockup} alt="Azaman app showing balance and quick actions" width={400} height={680} className="relative z-10 w-[280px] sm:w-[320px] lg:w-[400px] animate-float drop-shadow-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const features = [
  { icon: Send, title: 'Send and Receive', desc: 'Send money to anyone with their @username, phone number, or payment link. Zero stress, zero wahala.', color: 'text-gold' },
  { icon: PiggyBank, title: 'Smart Savings', desc: 'Set goals, automate daily or weekly saves, and lock funds so you cannot touch them. Your future self will thank you.', color: 'text-neon' },
  { icon: Ticket, title: 'Event Tickets', desc: 'Cop tickets for Afro Nation, hall weeks, and campus events. Save towards tickets you cannot afford yet.', color: 'text-ice' },
  { icon: BookOpen, title: 'Financial Literacy', desc: 'Learn budgeting, investing, and business skills through games and articles made for Ghana.', color: 'text-ember' },
  { icon: TrendingUp, title: 'Investments', desc: 'Start investing with as little as GH₵ 100. Treasury bills, fixed deposits, and more.', color: 'text-blush' },
  { icon: Users, title: 'Susu Groups', desc: 'Digital susu with your squad. Contribute, rotate, and keep everyone accountable. Just like the old days, but better.', color: 'text-gold' },
];

const Features = () => (
  <section id="features" className="py-24 lg:py-32 relative">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={stagger} className="text-center mb-16 lg:mb-20">
        <motion.p variants={fadeUp} className="font-display font-bold text-sm text-primary uppercase tracking-widest mb-4">Features</motion.p>
        <motion.h2 variants={fadeUp} className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-6 text-balance">
          Everything you need,<br />nothing you do not
        </motion.h2>
        <motion.p variants={fadeUp} className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
          From sending GH₵ 5 to your paddy to investing in treasury bills, Azaman handles your entire financial life.
        </motion.p>
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div key={i} variants={fadeUp} className="glass-card p-8 group hover:border-primary/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <f.icon className={`w-6 h-6 ${f.color}`} />
            </div>
            <h3 className="font-display font-bold text-lg mb-3">{f.title}</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

const steps = [
  { num: '01', title: 'Create your account', desc: 'Sign up with your phone number or email. Pick your @username. That is your payment handle.' },
  { num: '02', title: 'Add your vibe', desc: 'Choose your accent color and gradient. Make Azaman look like you. Gold, neon, ice, whatever fits your energy.' },
  { num: '03', title: 'Start moving money', desc: 'Send, receive, save, invest, and buy tickets. Everything works with your Azaman balance or MoMo.' },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 lg:py-32 bg-card/50">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
        <motion.p variants={fadeUp} className="font-display font-bold text-sm text-primary uppercase tracking-widest mb-4">How It Works</motion.p>
        <motion.h2 variants={fadeUp} className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-6">Three steps, no long talk</motion.h2>
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((s, i) => (
          <motion.div key={i} variants={fadeUp} className="relative text-center md:text-left">
            <span className="font-display font-extrabold text-6xl text-primary/20 block mb-4">{s.num}</span>
            <h3 className="font-display font-bold text-xl mb-3">{s.title}</h3>
            <p className="font-body text-muted-foreground leading-relaxed">{s.desc}</p>
            {i < 2 && <div className="hidden md:block absolute top-8 -right-4 text-primary/30"><ChevronRight className="w-8 h-8" /></div>}
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

const testimonials = [
  { name: 'Akosua Mensah', handle: '@akosua.m', role: 'Level 300, UG Legon', text: 'Azaman saved me when I needed to collect money for our group project. Everyone just sent it to my @username. No chasing people for MoMo numbers.' },
  { name: 'Kwesi Boateng', handle: '@kwesi.b', role: 'Business Owner, Legon', text: 'The business tools are mad. I track all my printing shop revenue, see which days are busiest, and even run small ads to students on campus.' },
  { name: 'Efua Aidoo', handle: '@efua.a', role: 'Level 200, UG Legon', text: 'The savings lock feature is why I can finally save money. I set it and forget it. By the time Afro Nation came, I had my full ticket money ready.' },
];

const Testimonials = () => (
  <section id="testimonials" className="py-24 lg:py-32">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
        <motion.p variants={fadeUp} className="font-display font-bold text-sm text-primary uppercase tracking-widest mb-4">Stories</motion.p>
        <motion.h2 variants={fadeUp} className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-6">Hear from the community</motion.h2>
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div key={i} variants={fadeUp} className="glass-card p-8 flex flex-col">
            <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1 mb-6">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-xs font-display font-bold text-primary-foreground">
                {t.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="font-display font-bold text-sm">{t.name}</p>
                <p className="font-mono text-xs text-muted-foreground">{t.handle} · {t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

const stats = [
  { value: '2,400+', label: 'Active Users' },
  { value: 'GH₵ 1.2M', label: 'Money Moved' },
  { value: '850+', label: 'Savings Goals Created' },
  { value: '99.9%', label: 'Uptime' },
];

const Stats = () => (
  <section className="py-24 lg:py-32 bg-card/50">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
        {stats.map((s, i) => (
          <motion.div key={i} variants={fadeUp} className="text-center">
            <span className="font-display font-extrabold text-3xl sm:text-4xl gradient-text-gold block mb-2">{s.value}</span>
            <span className="font-body text-sm text-muted-foreground">{s.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

const security = [
  { icon: Shield, title: 'Bank-Level Security', desc: 'Your money is protected with 256-bit encryption and secure PIN verification on every transaction.' },
  { icon: Smartphone, title: 'MoMo Integration', desc: 'Top up from MTN, Vodafone Cash, or AirtelTigo Money. Cash out anytime with transparent fees.' },
  { icon: Zap, title: 'Instant Transfers', desc: 'Send money in seconds. No waiting, no delays. Your paddy gets the cash before you even put your phone down.' },
];

const Security = () => (
  <section className="py-24 lg:py-32">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="font-display font-bold text-sm text-primary uppercase tracking-widest mb-4">Security and Speed</motion.p>
          <motion.h2 variants={fadeUp} className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-8 text-balance">
            Your money is safe. Your transfers are fast.
          </motion.h2>
          <div className="space-y-8">
            {security.map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-1">{s.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative hidden lg:flex justify-center"
        >
          <div className="glass-card p-8 max-w-sm w-full space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-sm">Transaction Complete</span>
              <span className="w-3 h-3 rounded-full bg-neon" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted-foreground">To</span>
                <span className="font-mono text-sm">@ama.serwaa</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted-foreground">Amount</span>
                <span className="font-display font-extrabold text-2xl text-primary">GH₵ 150.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted-foreground">Note</span>
                <span className="font-body text-sm">Jollof money 🔥</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted-foreground">Time</span>
                <span className="font-body text-sm">0.3 seconds</span>
              </div>
            </div>
            <div className="h-px bg-border" />
            <div className="text-center">
              <span className="font-body text-xs text-muted-foreground">Secured with PIN verification</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-3xl mx-auto">
          <motion.h2 variants={fadeUp} className="font-display font-extrabold text-3xl sm:text-4xl lg:text-6xl mb-6 text-balance">
            Ready to drop some aza?
          </motion.h2>
          <motion.p variants={fadeUp} className="font-body text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join thousands of students and businesses already using Azaman to manage their money, save smarter, and grow their hustle.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/app')} className="gradient-gold text-primary-foreground font-display font-bold text-lg px-10 py-4 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              Create Free Account <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
          <motion.p variants={fadeUp} className="font-body text-sm text-muted-foreground mt-6">Free forever. No hidden fees. No wahala.</motion.p>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="border-t border-border py-16">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2 md:col-span-1">
          <span className="font-display font-extrabold text-xl text-primary block mb-4">AZAMAN</span>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            The fintech super-app built for Ghanaian students. Your money, your vibe.
          </p>
        </div>
        <div>
          <h4 className="font-display font-bold text-sm mb-4">Product</h4>
          <ul className="space-y-2 font-body text-sm text-muted-foreground">
            <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Business</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold text-sm mb-4">Company</h4>
          <ul className="space-y-2 font-body text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Press</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold text-sm mb-4">Legal</h4>
          <ul className="space-y-2 font-body text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Cookies</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-body text-sm text-muted-foreground">&copy; 2026 Azaman. All rights reserved.</p>
        <p className="font-body text-xs text-muted-foreground">Built for Legon. Made for everyone. 🇬🇭</p>
      </div>
    </div>
  </footer>
);

const LandingPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <Hero />
    <Features />
    <HowItWorks />
    <Stats />
    <Testimonials />
    <Security />
    <CTASection />
    <Footer />
  </div>
);

export default LandingPage;
