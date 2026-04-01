import { Home, PiggyBank, Ticket, BookOpen, User } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import AppHome from './app/Home';
import AppSave from './app/Save';
import AppTickets from './app/Tickets';
import AppLearn from './app/Learn';
import AppProfile from './app/Profile';

const tabs = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'save', icon: PiggyBank, label: 'Save' },
  { id: 'tickets', icon: Ticket, label: 'Tickets' },
  { id: 'learn', icon: BookOpen, label: 'Learn' },
  { id: 'profile', icon: User, label: 'Profile' },
];

const tabComponents: Record<string, React.FC> = {
  home: AppHome,
  save: AppSave,
  tickets: AppTickets,
  learn: AppLearn,
  profile: AppProfile,
};

const AppDashboard = () => {
  const currentTab = useAppStore((s) => s.currentTab);
  const setCurrentTab = useAppStore((s) => s.setCurrentTab);
  const ActiveComponent = tabComponents[currentTab] || AppHome;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* App Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50 px-4 h-14 flex items-center justify-center">
        <span className="font-display font-extrabold text-lg text-primary tracking-tight">AZAMAN</span>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <ActiveComponent />
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 safe-area-bottom">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground/50 hover:text-muted-foreground'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-[10px] font-body font-medium">{tab.label}</span>
                {isActive && <div className="absolute top-0 w-8 h-0.5 rounded-full bg-primary" />}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default AppDashboard;
