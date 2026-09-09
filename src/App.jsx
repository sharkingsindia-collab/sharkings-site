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
    const title = 'Interior Work & Design Services in Madurai | Ramanathapuram & South Tamil Nadu | Sharkings';
    const desc = 'Top interior work services in Madurai by Sharkings: Custom waterproof modular kitchens, turnkey residential interiors, false ceilings, wardrobe suites, ACP elevations, container homes, and commercial interior work in Madurai, Ramanathapuram, South Tamil Nadu, Tamil Nadu & South India.';
    const keywords = 'interior work madurai, interior work in madurai, modular kitchen Madurai, turnkey interiors Madurai, top interior designers in madurai services, best interior design in madurai, interior designer in madurai, modular kitchen Ramanathapuram, interior designers South Tamil Nadu, interior designers Tamil Nadu, interior designers south india, container homes Madurai, false ceiling Madurai, ACP elevation Ramanathapuram, wardrobe design Madurai, best interior services Tamil Nadu';
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
    const title = 'Interior Design Projects in Madurai | Top Interior Work Portfolio | Sharkings';
    const desc = 'Browse completed interior design projects and interior work by top interior designers in Madurai — Sharkings: Luxury salons, corporate offices, modular home decor, and bespoke sofa suites delivered across Madurai, Ramanathapuram, South Tamil Nadu, Tamil Nadu & South India. Real photos, 3D floorplans & design stories.';
    const keywords = 'interior design projects Madurai, interior work Madurai projects, top interior designers in madurai projects, best interior design in madurai portfolio, interior projects Ramanathapuram, interior projects South Tamil Nadu, salon interior Madurai, office interior Ramanathapuram, completed projects portfolio, home decor showcase Madurai, turnkey projects Tamil Nadu, interior designers south india projects';
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
    const title = 'Top Interior Designers in Madurai | Interior Work Madurai | Sharkings Interiors';
    const desc = 'Top interior designers in Madurai. Sharkings Interiors & Exteriors – best interior designer in Madurai & Ramanathapuram (Ramnad). Interior work Madurai: modular kitchens, home interiors, false ceiling, wardrobe & turnkey projects. Best interior design in Madurai serving South Tamil Nadu, Tamil Nadu & South India since 2010. ☎ +91 80980 90204.';
    const keywords = 'top interior designers in madurai, best interior designers in madurai, interior designers in madurai, interior designer in madurai, top interior designer in madurai, best interior designer in madurai, interior work madurai, best interior design in madurai, interior design in madurai, top 10 interior designers in madurai, best interior design company in madurai, home interior designer in madurai, modular kitchen madurai, interior work in madurai, interior designers in ramanathapuram, interior designers in ramnad, interior designers in south tamil nadu, interior designers in tamil nadu, interior designers in south india, turnkey interiors tamil nadu, sharkings interiors, sharkings interiors madurai';
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
