import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ServicePage from './components/ServicePage';
import ProjectPage from './components/ProjectPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  // Simple and robust hash-based SPA switcher with dynamic SEO meta updates
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      let page = 'landing';
      if (hash === '#/services') {
        page = 'services';
      } else if (hash === '#/projects') {
        page = 'projects';
      }

      setCurrentPage(page);
      window.scrollTo(0, 0);

      // Update Page SEO Meta Tags dynamically
      const metaDescription = document.querySelector('meta[name="description"]');
      if (page === 'services') {
        document.title = 'Our Services | Modular Kitchens, Turnkey Interiors & ACP Elevation - Sharkings';
        if (metaDescription) {
          metaDescription.setAttribute('content', 'Explore full interior & exterior design services by Sharkings. Modular kitchens, turnkey projects, container architecture, false ceiling, and ACP elevation in Madurai & Ramanathapuram.');
        }
      } else if (page === 'projects') {
        document.title = 'Completed Projects Portfolio | Sharkings Interiors & Exteriors';
        if (metaDescription) {
          metaDescription.setAttribute('content', 'View our portfolio of luxury residential, commercial salon, office, and modular kitchen interior design projects executed in Madurai and Ramanathapuram.');
        }
      } else {
        document.title = 'Sharkings Interiors & Exteriors | Best Interior Designers in Madurai & Ramanathapuram';
        if (metaDescription) {
          metaDescription.setAttribute('content', 'Sharkings Interiors & Exteriors is the premier interior design firm in Madurai & Ramanathapuram. Specializing in luxury modular kitchens, home interiors, commercial spaces, ACP elevation, and turnkey renovations since 2010.');
        }
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
