import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

// 1. IMPORT COMPONENTS
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// 2. IMPORT ALL PAGES
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import BuilderPage from './pages/BuilderPage';
import StaleListingsPage from './pages/StaleListingsPage'; // Listing Doctor
import SourcingPage from './pages/SourcingPage'; // ✅ The NEW Sourcing Tool
import AnalyticsPage from './pages/AnalyticsPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import BlogPage from './pages/BlogPage';
import VisionPage from './pages/VisionPage';
import SuccessHub from './pages/SuccessHub';
import PartnersPage from './pages/PartnersPage';
// import ProfitScoutPage from './pages/ProfitScoutPage'; // ❌ REMOVED: Replaced by Sourcing Tool

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.hash.replace('#', '') || '/');

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for navigation
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.replace('#', '') || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      subscription.unsubscribe();
    };
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    window.scrollTo(0, 0); 
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  // 🚪 LOGGED OUT STATE
  if (!session) {
    if (currentPath === '/login') return <LoginPage onNavigate={navigate} />;
    if (currentPath === '/signup') return <SignUpPage onNavigate={navigate} />;
    if (currentPath === '/') return <LandingPage onNavigate={navigate} />;

    // PUBLIC LAYOUT WRAPPER
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar session={null} onNavigate={navigate} isLanding={true} />
        
        <div className="flex-grow pt-20"> 
          {(() => {
            switch (currentPath) {
              // --- MARKETING / PUBLIC PAGES ---
              case '/pricing': return <PricingPage />;
              case '/analytics': return <AnalyticsPage />; 
              
              // ✅ SWAP: Now '/sourcing' goes directly to the tool!
              case '/sourcing': return <SourcingPage />;
              
              case '/doctor': return <StaleListingsPage />;
              case '/contact': return <ContactPage />;
              case '/privacy': return <PrivacyPage />;
              case '/terms': return <TermsPage />;
              case '/blog': return <BlogPage />;
              case '/vision': return <VisionPage />;
              case '/success': return <SuccessHub />;
              case '/partnerships': return <PartnersPage />;
              
              // --- HEADER/FOOTER LINKS ---
              case '/inventory': return <InventoryPage onNavigate={navigate} />;
              case '/builder': return <BuilderPage />; // "Listing Generator" link

              default: return <LandingPage onNavigate={navigate} />;
            }
          })()}
        </div>

        <Footer onNavigate={navigate} />
      </div>
    );
  }

  // 🏠 LOGGED IN STATE
  const renderContent = () => {
    switch (currentPath) {
      case '/':
      case '/dashboard':
        return <DashboardPage onNavigate={navigate} />;
      case '/inventory':
        return <InventoryPage onNavigate={navigate} />;
      case '/builder':
        return <BuilderPage />;
      case '/doctor':
         return <StaleListingsPage />;
      case '/sourcing': 
         return <SourcingPage />;
      case '/analytics': 
         return <AnalyticsPage />;
      case '/pricing':
         return <PricingPage />;
      default:
        return <DashboardPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar session={session} onNavigate={navigate} />
      <div className="pt-20">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
