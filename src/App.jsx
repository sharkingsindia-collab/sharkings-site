import { useState, useEffect, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import ServicePage from './components/ServicePage';
import ProjectPage from './components/ProjectPage';
import WhatsAppFAB from './components/sections/WhatsAppFAB';

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
  const metaTitle = document.querySelector('meta[name="title"]');
  const canonical = document.querySelector('link[rel="canonical"]');
  const alternateEn = document.querySelector('link[rel="alternate"][hreflang="en-IN"]');
  const alternateDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  const twitterDesc = document.querySelector('meta[name="twitter:description"]');

  if (page === 'services') {
    const title = 'Interior & Exterior Services | Madurai, Ramanathapuram & South Tamil Nadu | Sharkings';
    const desc = 'Explore full interior & exterior design services by Sharkings: Custom waterproof modular kitchens, turnkey residential interiors, false ceilings, wardrobe suites, ACP elevations, container homes, and commercial interiors in Madurai, Ramanathapuram, South Tamil Nadu and across Tamil Nadu.';
    const keywords = 'Sharkings services, modular kitchen Madurai, turnkey interiors Madurai, modular kitchen Ramanathapuram, interior designers South Tamil Nadu, interior designers Tamil Nadu, container homes Madurai, false ceiling Madurai, ACP elevation Ramanathapuram, wardrobe design Madurai, best interior services Tamil Nadu';
    const url = 'https://www.sharkingsinteriors.in/services';

    document.title = title;
    if (metaTitle) metaTitle.setAttribute('content', title);
    if (metaDescription) metaDescription.setAttribute('content', desc);
    if (metaKeywords) metaKeywords.setAttribute('content', keywords);
    if (canonical) canonical.setAttribute('href', url);
    if (alternateEn) alternateEn.setAttribute('href', url);
    if (alternateDefault) alternateDefault.setAttribute('href', url);
    if (ogUrl) ogUrl.setAttribute('content', url);
    if (ogTitle) ogTitle.setAttribute('content', title);
    if (ogDesc) ogDesc.setAttribute('content', desc);
    if (twitterTitle) twitterTitle.setAttribute('content', title);
    if (twitterDesc) twitterDesc.setAttribute('content', desc);
  } else if (page === 'projects') {
    const title = 'Completed Interior Design Projects | Madurai, Ramnad & South Tamil Nadu | Sharkings';
    const desc = 'Browse completed interior design showcases by Sharkings: Luxury salons, corporate offices, modular home decor, and bespoke sofa suites delivered across Madurai, Ramanathapuram, South Tamil Nadu and across Tamil Nadu. Real photos, 3D floorplans & design stories.';
    const keywords = 'Sharkings projects, interior design projects Madurai, interior design projects Ramanathapuram, interior projects South Tamil Nadu, salon interior Madurai, office interior Ramanathapuram, completed projects portfolio, home decor showcase Madurai, turnkey projects Tamil Nadu';
    const url = 'https://www.sharkingsinteriors.in/projects';

    document.title = title;
    if (metaTitle) metaTitle.setAttribute('content', title);
    if (metaDescription) metaDescription.setAttribute('content', desc);
    if (metaKeywords) metaKeywords.setAttribute('content', keywords);
    if (canonical) canonical.setAttribute('href', url);
    if (alternateEn) alternateEn.setAttribute('href', url);
    if (alternateDefault) alternateDefault.setAttribute('href', url);
    if (ogUrl) ogUrl.setAttribute('content', url);
    if (ogTitle) ogTitle.setAttribute('content', title);
    if (ogDesc) ogDesc.setAttribute('content', desc);
    if (twitterTitle) twitterTitle.setAttribute('content', title);
    if (twitterDesc) twitterDesc.setAttribute('content', desc);
  } else {
    const title = 'Best Interior Designers in Madurai & Ramanathapuram | South Tamil Nadu | Sharkings Interiors';
    const desc = 'Mobile: +91 80980 90204. Specializing in residential & commercial design. Sharkings Interiors & Exteriors is the #1 best interior design company in Madurai & Ramanathapuram (Ramnad), serving South Tamil Nadu (Sivagangai, Virudhunagar, Theni, Dindigul, Tirunelveli) and across Tamil Nadu since 2010. Modular kitchens, luxury home interiors, false ceiling, wardrobe & turnkey projects.';
    const keywords = 'best interior designers in madurai, interior designers in madurai, interior designers in ramanathapuram, interior designers in ramnad, interior designers in south tamil nadu, interior designers in tamil nadu, modular kitchen madurai, home interior designer in madurai, modular kitchen ramanathapuram, interior designers in sivagangai, interior designers in virudhunagar, interior designers in dindigul, interior designers in theni, interior designers in tirunelveli, turnkey interiors tamil nadu, sharkings interiors';
    const url = 'https://www.sharkingsinteriors.in/';

    document.title = title;
    if (metaTitle) metaTitle.setAttribute('content', title);
    if (metaDescription) metaDescription.setAttribute('content', desc);
    if (metaKeywords) metaKeywords.setAttribute('content', keywords);
    if (canonical) canonical.setAttribute('href', url);
    if (alternateEn) alternateEn.setAttribute('href', url);
    if (alternateDefault) alternateDefault.setAttribute('href', url);
    if (ogUrl) ogUrl.setAttribute('content', url);
    if (ogTitle) ogTitle.setAttribute('content', title);
    if (ogDesc) ogDesc.setAttribute('content', desc);
    if (twitterTitle) twitterTitle.setAttribute('content', title);
    if (twitterDesc) twitterDesc.setAttribute('content', desc);
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

  return (
    <>
      {currentPage === 'services' && <ServicePage onNavigate={navigateTo} />}
      {currentPage === 'projects' && <ProjectPage onNavigate={navigateTo} />}
      {currentPage !== 'services' && currentPage !== 'projects' && (
        <LandingPage onNavigate={navigateTo} />
      )}
      <WhatsAppFAB />
    </>
  );
}
