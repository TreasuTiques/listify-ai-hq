import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Navbar from './components/Navbar';

// ✅ IMPORT ALL YOUR PAGES
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import BuilderPage from './pages/BuilderPage';
import StaleListingsPage from './pages/StaleListingsPage';
import SourcingPage from './pages/SourcingPage';
import AnalyticsPage from './pages/AnalyticsPage'; // The missing link!
import LoginPage from './pages/LoginPage';

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

    // Listen for auth changes (Login/Logout)
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
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  // 🚪 1. LOGGED OUT STATE (Show Landing Page)
  if (!session) {
    if (currentPath === '/login' || currentPath === '/signup') {
      return <LoginPage />;
    }
    return <LandingPage onNavigate={navigate} />;
  }

  // 🏠 2. LOGGED IN STATE (Show Dashboard & Tools)
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
         return <AnalyticsPage />; // ✅ NOW IT IS WIRED UP!
      default:
        return <DashboardPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar session={session} onNavigate={navigate} />
      {renderContent()}
    </div>
  );
};

export default App;
