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
import StaleListingsPage from './pages/StaleListingsPage'; 
import SourcingPage from './pages/SourcingPage'; 
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
import AboutPage from './pages/AboutPage';
import AdminDashboard from './pages/AdminDashboard'; // ✅ ADDED ADMIN IMPORT

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.hash.replace('#', '') || '/');

  // 🌑 GLOBAL DARK MODE STATE
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    const handleHashChange = () => {
      setCurrentPath(window.location.hash.replace('#', '') || '/');
    };
    window.addEventListener('hashchange', handleHashChange);

    // 🌑 Initialize Theme
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      subscription.unsubscribe();
    };
  }, []);

  // 🌑 Toggle Function
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const navigate = (path: string) => {
    window.location.hash = path;
    window.scrollTo(0, 0); 
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 dark:text-white">Loading...</div>;

  // 🚪 LOGGED OUT STATE
  if (!session) {
    if (currentPath === '/login') return <LoginPage onNavigate={navigate} />;
    if (currentPath === '/signup') return <SignUpPage onNavigate={navigate} />;
    
    // Check for Admin even when logged out (The AdminDashboard file itself will handle the email check)
    if (currentPath === '/admin') return <AdminDashboard />;

    if (currentPath === '/doctor') return (
       <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 flex flex-col">
          <Navbar session={null} onNavigate={navigate} isLanding={false} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          <div className="flex-grow pt-20"><StaleListingsPage isGuest={true} onNavigate={navigate} /></div>
          <Footer onNavigate={navigate} />
       </div>
    );

    if (currentPath === '/') return (
       <div className="min-h-screen transition-colors duration-300 flex flex-col">
          <Navbar session={null} onNavigate={navigate} isLanding={true} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          <div className="flex-grow pt-20"><LandingPage onNavigate={navigate} /></div>
          <Footer onNavigate={navigate} />
       </div>
    );

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 flex flex-col">
        <Navbar session={null} onNavigate={navigate} isLanding={true} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        
        <div className="flex-grow pt-20"> 
          {(() => {
            switch (currentPath) {
              case '/pricing': return <PricingPage />;
              case '/analytics': return <AnalyticsPage />; 
              case '/sourcing': return <SourcingPage />;
              case '/contact': return <ContactPage />;
              case '/privacy': return <PrivacyPage />;
              case '/terms': return <TermsPage />;
              case '/blog': return <BlogPage />;
              case '/vision': return <VisionPage />;
              case '/success': return <SuccessHub />;
              case '/partnerships': return <PartnersPage />;
              case '/about': return <AboutPage />;
              case '/inventory': return <InventoryPage onNavigate={navigate} />;
              case '/builder': return <BuilderPage />; 
              case '/admin': return <AdminDashboard />; // ✅ ADDED ADMIN CASE
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
      case '/dashboard': return <DashboardPage onNavigate={navigate} />;
      case '/inventory': return <InventoryPage onNavigate={navigate} />;
      case '/builder': return <BuilderPage />;
      case '/doctor': return <StaleListingsPage />;
      case '/sourcing': return <SourcingPage />;
      case '/analytics': return <AnalyticsPage />;
      case '/pricing': return <PricingPage />;
      case '/about': return <AboutPage />;
      case '/admin': return <AdminDashboard />; // ✅ ADDED ADMIN CASE
      default: return <DashboardPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar session={session} onNavigate={navigate} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="pt-20">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
