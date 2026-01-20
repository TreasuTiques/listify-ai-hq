import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import BuilderPage from './pages/BuilderPage';
import PricingPage from './pages/PricingPage';
import SuccessHub from './pages/SuccessHub';
import PartnersPage from './pages/PartnersPage';
import BrandGuide from './pages/BrandGuide';
import VisionPage from './pages/VisionPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

// Auth Pages
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

// Dashboard Pages
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
// ✅ NEW: Analytics Page Import
import AnalyticsPage from './pages/AnalyticsPage';

// Chat Widget
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  // Initialize path from hash or default to '/'
  const [currentPath, setCurrentPath] = useState<string>(window.location.hash.replace('#', '') || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.replace('#', '') || '/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  // 1. AUTH LAYOUT: If Login or Signup, render full screen without Navbar/Footer
  if (currentPath === '/login') {
    return <LoginPage onNavigate={navigate} />;
  }
  if (currentPath === '/signup') {
    return <SignUpPage onNavigate={navigate} />;
  }

  // 2. MAIN LAYOUT: Helper function for the standard pages
  const renderContent = () => {
    switch (currentPath) {
      case '/dashboard': 
        return <DashboardPage onNavigate={navigate} />;
      case '/inventory':
        return <InventoryPage onNavigate={navigate} />;
      case '/analytics': // ✅ NEW: Registered Analytics Route
        return <AnalyticsPage />;
      case '/builder':
        return <BuilderPage />;
      case '/pricing':
        return <PricingPage />;
      case '/success':
        return <SuccessHub />;
      case '/partnerships':
        return <PartnersPage />;
      case '/brand':
        return <BrandGuide />;
      case '/vision':
        return <VisionPage onNavigate={navigate} />;
      case '/privacy':
        return <PrivacyPage />;
      case '/terms':
        return <TermsPage />;
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  // Standard Layout with Nav, Footer, and Chat
  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-900 bg-white">
      <Navbar onNavigate={navigate} />

      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer onNavigate={navigate} />

      {/* Chat agent lives globally on main pages */}
      <ChatWidget />
    </div>
  );
};

export default App;
