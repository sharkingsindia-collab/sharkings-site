import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ServicePage from './components/ServicePage';
import ProjectPage from './components/ProjectPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  // Simple and robust hash-based SPA switcher
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/services') {
        setCurrentPage('services');
        window.scrollTo(0, 0);
      } else if (hash === '#/projects') {
        setCurrentPage('projects');
        window.scrollTo(0, 0);
      } else {
        setCurrentPage('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Trigger once on mount

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page) => {
    window.location.hash = page === 'landing' ? '#/' : `#/${page}`;
  };

  if (currentPage === 'services') {
    return <ServicePage onNavigate={navigateTo} />;
  }

  if (currentPage === 'projects') {
    return <ProjectPage onNavigate={navigateTo} />;
  }

  return <LandingPage onNavigate={navigateTo} />;
}
