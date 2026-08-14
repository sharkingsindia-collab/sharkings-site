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
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (page === 'services') {
        document.title = 'Our Services | Best Modular Kitchen, Home Interior & Turnkey Projects in Madurai & Ramanathapuram - Sharkings';
        if (metaDescription) {
          metaDescription.setAttribute('content', 'Explore our full interior & exterior design services — modular kitchens, turnkey projects, container homes & cafes, false ceiling, wardrobe design, ACP elevation, salon interiors, office interiors, and aluminium partitions. Best interior designers in Madurai & Ramanathapuram (Ramnad), Tamil Nadu.');
        }
        if (metaKeywords) {
          metaKeywords.setAttribute('content', 'Sharkings services, modular kitchen Madurai, turnkey interiors Madurai, container homes Madurai, false ceiling Madurai, ACP elevation Ramanathapuram, wardrobe design Madurai, salon interior Madurai, office interior Ramanathapuram, best interior services Tamil Nadu');
        }
      } else if (page === 'projects') {
        document.title = 'Completed Projects Portfolio | Luxury Salon, Office & Home Interior Projects - Sharkings Madurai & Ramanathapuram';
        if (metaDescription) {
          metaDescription.setAttribute('content', 'View our completed interior design projects — luxury salons, offices, homes, and commercial spaces in Madurai and Ramanathapuram. See real project photos and results by Sharkings Interiors & Exteriors.');
        }
        if (metaKeywords) {
          metaKeywords.setAttribute('content', 'Sharkings projects, interior design projects Madurai, salon interior Madurai, office interior Ramanathapuram, completed projects portfolio, interior design portfolio Tamil Nadu');
        }
      } else {
        document.title = 'Sharkings Interiors & Exteriors | Best Interior Designers in Madurai & Ramanathapuram | Modular Kitchen & Turnkey Interiors';
        if (metaDescription) {
          metaDescription.setAttribute('content', 'Mobile: +91 80980 90204. Specializing in both residential and commercial design. Sharkings Interiors & Exteriors is the top #1 interior design firm in Madurai & Ramanathapuram since 2010. We have the experience to ensure that your project runs smoothly and gives you the best results.');
        }
        if (metaKeywords) {
          metaKeywords.setAttribute('content', 'Sharkings, Sharkings Interiors, Sharkings Interior, Sharkings Interior Design, Sharkings Madurai, Sharkings Ramanathapuram, Sharkings Ramnad, best interior designer in Madurai, best interior designer in Ramanathapuram, modular kitchen Madurai, home interior design Ramanathapuram, turnkey interiors Tamil Nadu, home interior designer in Madurai, modular kitchen interior designer Madurai, professional interior designers Madurai, best interior decorators in Villapuram Madurai, interior and exterior works in Madurai, kitchen interior designer Madurai, interior designer in Sivagangai, interior designer in Dindigul, interior designer in Virudhunagar, interior designer in Theni, interior designer cost in Madurai, interior designer price in Madurai, interior designer near me Madurai');
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
