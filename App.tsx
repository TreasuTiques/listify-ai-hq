import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Navbar from './components/Navbar';

// Import Pages
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import BuilderPage from './pages/BuilderPage';
import StaleListingsPage from './pages/StaleListingsPage';
import SourcingPage from './pages/SourcingPage'; // ✅ IMPORT THE NEW PAGE
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  
  // Handle routing via Hash (e.g. #/dashboard)
  const [currentPath, setCurrentPath] = useState(window.location.hash.replace('#', '') || '/');

  useEffect(() => {
    // 1. Auth Listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // 2. Navigation Listener
    const handleHashChange = () => {
      const path = window.location.hash.replace('#', '') || '/';
      setCurrentPath(path);
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

  if (!session) {
    return <LoginPage />;
  }

  // 3. THE ROUTER SWITCHBOARD
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
         return <SourcingPage />; // ✅ THE NEW WIRE IS CONNECTED!
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
