# Azaman - The Fintech Super-App for Ghanaian Students

![Azaman Logo](https://via.placeholder.com/150x50/FF8C00/FFFFFF?text=AZAMAN)

> Drop Aza, make a send - send you some coins

Azaman is the comprehensive fintech super-app designed specifically for Ghanaian university students. Built for Legon, made for everyone.

## 🚀 Features

- **Money Transfer**: Send and receive money instantly with Ghana Cedi support
- **Smart Savings**: Set goals, track progress, and save automatically
- **Investments**: Access Treasury Bills, Fixed Deposits, and mutual funds
- **Ticket Booking**: Buy event tickets and manage reservations
- **Financial Learning**: Interactive Business Empire game to build financial skills
- **Crowdfunding**: Support and create funding campaigns
- **Budget Planning**: Smart budget templates and spending limits
- **News & Insights**: Ghana-focused financial news and market updates

## 🎨 Design System

- **Dark Theme**: Professional dark interface with orange accents
- **Glassmorphism**: Modern glass-like UI components
- **Responsive Design**: Optimized for mobile and desktop
- **Custom Theme System**: Switch between light/dark modes and accent colors
- **Typography**: Syne font for headings, DM Sans for body text

## 🛠 Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + CSS-in-JS
- **State Management**: React Context + Zustand
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Radix UI + shadcn/ui
- **Testing**: Vitest + Playwright

## 📱 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd azaman

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
# Build the application
npm run build

# Preview the build
npm run preview
```

## 🌐 Deployment

This project is optimized for Vercel deployment:

### Automatic Deployment

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the framework and build settings
3. Deploy with one click

### Manual Deployment

```bash
# Build and deploy
npm run deploy
```

### Environment Variables

No environment variables required for basic functionality.

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   └── SendMoneyModal.tsx
├── context/
│   └── ThemeContext.tsx # Theme management
├── data/
│   └── mockData.ts      # Mock data for development
├── pages/
│   ├── Home.tsx         # Main app interface
│   ├── Profile.tsx      # User profile and settings
│   ├── TransactionHistory.tsx
│   ├── SpendingLimits.tsx
│   ├── BudgetTemplates.tsx
│   ├── Crowdfunding.tsx
│   ├── Investments.tsx
│   ├── Appearance.tsx   # Theme customization
│   ├── Notifications.tsx
│   ├── PrivacySecurity.tsx
│   ├── HelpSupport.tsx
│   └── Index.tsx        # Landing page
└── lib/
    └── utils.ts
```

## 🎯 Key Features

### Theme System
- Dark/Light mode switching
- 5 accent colors (Orange, Ember, Neon, Ice, Blush)
- 9 gradient styles
- Persistent user preferences

### Financial Features
- Real-time transaction processing
- PIN-based security (4-digit)
- Spending limits and budget tracking
- Investment portfolio management
- Savings goal automation

### User Experience
- Glassmorphic UI components
- Smooth animations and transitions
- Custom numeric keypad for inputs
- Ghana-focused content and currency
- Mobile-first responsive design

## 🔧 Development

### Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run test      # Run tests
```

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Vitest for unit testing
- Playwright for E2E testing

## 📄 License

This project is proprietary and confidential.

## 🤝 Contributing

This is a private project. Please do not share or redistribute without permission.

## 📞 Support

For support or inquiries, please contact the development team.

---

**Built with ❤️ for Ghanaian students**
