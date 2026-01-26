import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

// ✅ 1. IMPORT COMPONENTS
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// ✅ 2. IMPORT ALL PAGES (Based on your file list)
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import BuilderPage from './pages/BuilderPage';
import StaleListingsPage from './pages/StaleListingsPage'; // Listing Doctor
import SourcingPage from './pages/SourcingPage'; // Profit Scout Tool
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
import ProfitScoutPage from './pages/ProfitScoutPage'; // Likely the Marketing Page for Profit Scout

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
    window.scrollTo(0, 0); // Always scroll to top on navigation
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  // 🚪 LOGGED OUT STATE
  if (!session) {
    // 1. Auth Pages (No Navbar/Footer usually, or simple one)
    if (currentPath === '/login') return <LoginPage onNavigate={navigate} />;
    if (currentPath === '/signup') return <SignUpPage onNavigate={navigate} />;

    // 2. Landing Page (Has its own internal layout logic if using the one we built, 
    //    but standardizing imports means we can treat it uniquely)
    if (currentPath === '/') return <LandingPage onNavigate={navigate} />;

    // 3. Public Marketing Pages (Pricing, Contact, etc.)
    // We wrap these in the Public Navbar and Footer so they look consistent
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Pass isLanding={true} to show the Public links (Pricing, Platforms) instead of App links */}
        <Navbar session={null} onNavigate={navigate} isLanding={true} />
        
        <div className="flex-grow pt-20"> {/* pt-20 accounts for fixed navbar */}
          {(() => {
            switch (currentPath) {
              case '/pricing': return <PricingPage />;
              case '/analytics': return <AnalyticsPage />; // Public view of analytics
              case '/sourcing': return <ProfitScoutPage /> || <SourcingPage />; // Use Marketing page if available
              case '/doctor': return <StaleListingsPage />;
              case '/contact': return <ContactPage />;
              case '/privacy': return <PrivacyPage />;
              case '/terms': return <TermsPage />;
              case '/blog': return <BlogPage />;
              case '/vision': return <VisionPage />;
              case '/success': return <SuccessHub />;
              case '/partnerships': return <PartnersPage />;
              default: return <LandingPage onNavigate={navigate} />; // Fallback
            }
          })()}
        </div>

        <Footer onNavigate={navigate} />
      </div>
    );
  }

  // 🏠 LOGGED IN STATE (Dashboard & Tools)
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
         return <PricingPage />; // Allow viewing pricing while logged in
      default:
        return <DashboardPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Logged In Navbar (isLanding defaults to false) */}
      <Navbar session={session} onNavigate={navigate} />
      <div className="pt-20"> {/* Content padding for fixed navbar */}
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
