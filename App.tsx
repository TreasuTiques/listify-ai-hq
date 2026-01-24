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

// Dashboard & Utility Pages
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import AnalyticsPage from './pages/AnalyticsPage';
import StaleListingsPage from './pages/StaleListingsPage';

// ✅ UPDATED: Connected the real Profit Scout page!
import ProfitScoutPage from './pages/ProfitScoutPage'; 
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';

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
    window.scrollTo(0, 0); // Scroll to top on navigation
  };

  // 1. AUTH LAYOUT: Render full screen without Navbar/Footer
  if (currentPath === '/login') {
    return <LoginPage onNavigate={navigate} />;
  }
  if (currentPath === '/signup') {
    return <SignUpPage onNavigate={navigate} />;
  }

  // 2. MAIN LAYOUT: Helper function for the standard pages
  const renderContent = () => {
    switch (currentPath) {
      // Dashboard Suite
      case '/dashboard': 
        return <DashboardPage onNavigate={navigate} />;
      case '/inventory':
        return <InventoryPage onNavigate={navigate} />;
      case '/analytics':
        return <AnalyticsPage />;
      case '/health': 
        return <StaleListingsPage />;
      
      // Tools & Resources
      case '/builder':
        return <BuilderPage />;
      
      // 🕵️‍♂️ PROFIT SCOUT CONNECTION
      // The Navbar sends you to '/sourcing', so we render ProfitScoutPage here.
      case '/sourcing': 
        return <ProfitScoutPage />; 

      case '/pricing':
        return <PricingPage />;
      case '/blog':     
        return <BlogPage />;     
      case '/contact':  
        return <ContactPage />;  
      case '/success':
        return <SuccessHub />;
      
      // Footer & Info Pages
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
