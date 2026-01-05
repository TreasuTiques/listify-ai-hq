
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

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(window.location.hash || '/');

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

  const renderContent = () => {
    switch (currentPath) {
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onNavigate={navigate} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;
