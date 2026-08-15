import { useState, useEffect, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import ServicePage from './components/ServicePage';
import ProjectPage from './components/ProjectPage';

function getRouteFromLocation() {
  const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const hash = window.location.hash.toLowerCase();

  // Backward compatibility: seamlessly redirect legacy hash routes to clean paths
  if (hash === '#/services' || hash === '#services') {
    window.history.replaceState({ page: 'services' }, '', '/services');
    return 'services';
  }
  if (hash === '#/projects' || hash === '#projects') {
    window.history.replaceState({ page: 'projects' }, '', '/projects');
    return 'projects';
  }
  if (hash === '#/' || hash === '#') {
    window.history.replaceState({ page: 'landing' }, '', '/');
    return 'landing';
  }

  if (pathname === '/services') {
    return 'services';
  }
  if (pathname === '/projects') {
    return 'projects';
  }

  return 'landing';
}

function updateRouteMetadata(page) {
  const metaDescription = document.querySelector('meta[name="description"]');
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  const canonical = document.querySelector('link[rel="canonical"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');

  if (page === 'services') {
    document.title = 'Our Services | Best Modular Kitchen, Home Interior & Turnkey Projects in Madurai & Ramanathapuram - Sharkings';
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore our full interior & exterior design services — modular kitchens, turnkey projects, container homes & cafes, false ceiling, wardrobe design, ACP elevation, salon interiors, office interiors, and aluminium partitions. Best interior designers in Madurai & Ramanathapuram (Ramnad), Tamil Nadu.');
    }
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'Sharkings services, modular kitchen Madurai, turnkey interiors Madurai, container homes Madurai, false ceiling Madurai, ACP elevation Ramanathapuram, wardrobe design Madurai, salon interior Madurai, office interior Ramanathapuram, best interior services Tamil Nadu');
    }
    if (canonical) {
      canonical.setAttribute('href', 'https://www.sharkingsinteriors.in/services');
    }
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://www.sharkingsinteriors.in/services');
    }
  } else if (page === 'projects') {
    document.title = 'Completed Projects Portfolio | Luxury Salon, Office & Home Interior Projects - Sharkings Madurai & Ramanathapuram';
    if (metaDescription) {
      metaDescription.setAttribute('content', 'View our completed interior design projects — luxury salons, offices, homes, and commercial spaces in Madurai and Ramanathapuram. See real project photos and results by Sharkings Interiors & Exteriors.');
    }
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'Sharkings projects, interior design projects Madurai, salon interior Madurai, office interior Ramanathapuram, completed projects portfolio, interior design portfolio Tamil Nadu');
    }
    if (canonical) {
      canonical.setAttribute('href', 'https://www.sharkingsinteriors.in/projects');
    }
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://www.sharkingsinteriors.in/projects');
    }
  } else {
    document.title = 'Sharkings Interiors & Exteriors | Best Interior Designers in Madurai & Ramanathapuram | Modular Kitchen & Turnkey Interiors';
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Mobile: +91 80980 90204. Specializing in both residential and commercial design. Sharkings Interiors & Exteriors is the top #1 interior design firm in Madurai & Ramanathapuram since 2010. We have the experience to ensure that your project runs smoothly and gives you the best results.');
    }
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'Sharkings, Sharkings Interiors, Sharkings Interior, Sharkings Interior Design, Sharkings Madurai, Sharkings Ramanathapuram, Sharkings Ramnad, best interior designer in Madurai, best interior designer in Ramanathapuram, modular kitchen Madurai, home interior design Ramanathapuram, turnkey interiors Tamil Nadu, home interior designer in Madurai, modular kitchen interior designer Madurai, professional interior designers Madurai, best interior decorators in Villapuram Madurai, interior and exterior works in Madurai, kitchen interior designer Madurai, interior designer in Sivagangai, interior designer in Dindigul, interior designer in Virudhunagar, interior designer in Theni, interior designer cost in Madurai, interior designer price in Madurai, interior designer near me Madurai');
    }
    if (canonical) {
      canonical.setAttribute('href', 'https://www.sharkingsinteriors.in/');
    }
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://www.sharkingsinteriors.in/');
    }
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => getRouteFromLocation());

  // Listen for browser Back / Forward history transitions
  useEffect(() => {
    const handlePopState = () => {
      const page = getRouteFromLocation();
      setCurrentPage(page);
      updateRouteMetadata(page);
      window.scrollTo(0, 0);
    };

    // Synchronize metadata on initial mount
    const initialPage = getRouteFromLocation();
    updateRouteMetadata(initialPage);

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = useCallback((page, targetAnchor) => {
    const path = page === 'landing' ? '/' : `/${page}`;
    const currentPath = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
    const targetPath = path.toLowerCase().replace(/\/+$/, '') || '/';

    if (currentPath !== targetPath || window.location.hash) {
      window.history.pushState({ page }, '', path);
    }

    setCurrentPage(page);
    updateRouteMetadata(page);

    if (targetAnchor) {
      setTimeout(() => {
        const el = document.querySelector(targetAnchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  if (currentPage === 'services') {
    return <ServicePage onNavigate={navigateTo} />;
  }

  if (currentPage === 'projects') {
    return <ProjectPage onNavigate={navigateTo} />;
  }

  return <LandingPage onNavigate={navigateTo} />;
}
