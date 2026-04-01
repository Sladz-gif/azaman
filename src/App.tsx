import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import Index from "./pages/Index";
import HomePage from "./pages/Home";
import Profile from "./pages/Profile";
import AppDashboard from "./pages/AppDashboard";
import NewsPage from "./pages/News";
import TransactionHistory from "./pages/TransactionHistory";
import SpendingLimits from "./pages/SpendingLimits";
import BudgetTemplates from "./pages/BudgetTemplates";
import Crowdfunding from "./pages/Crowdfunding";
import Investments from "./pages/Investments";
import Appearance from "./pages/Appearance";
import Notifications from "./pages/Notifications";
import PrivacySecurity from "./pages/PrivacySecurity";
import HelpSupport from "./pages/HelpSupport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppWrapper = () => {
  const { colors } = useTheme();
  
  return (
    <div style={{ backgroundColor: colors.background, color: colors.foreground, minHeight: '100vh' }}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/app" element={<AppDashboard />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/spending-limits" element={<SpendingLimits />} />
          <Route path="/budget-templates" element={<BudgetTemplates />} />
          <Route path="/crowdfunding" element={<Crowdfunding />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/appearance" element={<Appearance />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/privacy-security" element={<PrivacySecurity />} />
          <Route path="/help-support" element={<HelpSupport />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AppWrapper />
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
