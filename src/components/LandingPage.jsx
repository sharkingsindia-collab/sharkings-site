import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import Navbar from './Navbar';
import Hero from './sections/Hero';
import AboutUs from './sections/AboutUs';
import WhyUs from './sections/WhyUs';
import ServicesSlider from './sections/ServicesSlider';
import CuratedAtelier from './sections/CuratedAtelier';
import BeforeAfter from './sections/BeforeAfter';
import ProjectGlimpse from './sections/ProjectGlimpse';
import Testimonial from './sections/Testimonial';
import Showrooms from './sections/Showrooms';
import GetInTouch from './sections/GetInTouch';
import Footer from './sections/Footer';
import ReturnToHomeFAB from './sections/ReturnToHomeFAB';

// Lazy load Three.js heavy section - only loads on desktop (>= 1024px)
const InteractiveStudio = lazy(() => import('./sections/InteractiveStudio'));

const LandingPage = ({ onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );

  // 3D Studio state (Modular Kitchen)
  const [cabinetFinishIdx, setCabinetFinishIdx] = useState(0);
  const [countertopIdx, setCountertopIdx] = useState(0);
  const [kitchenLayout, setKitchenLayout] = useState('l-shaped');
  const [underCabinetLightOn, setUnderCabinetLightOn] = useState(true);
  const [studioAutoRotate, setStudioAutoRotate] = useState(false);

  // Curation tab state
  const [activeTabIdx, setActiveTabIdx] = useState(1);

  const timerRef = useRef(null);
  const whyUsRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialRef = useRef(null);
  const showroomRef = useRef(null);
  const getInTouchRef = useRef(null);

  // Monitor viewport size for desktop-only 3D Studio (debounced)
  useEffect(() => {
    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsDesktop(window.innerWidth >= 1024);
      }, 200);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Background-cache secondary hero slides without blocking initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      ['/images/slide-dining.webp', '/images/slide-bedroom.webp'].forEach((url) => {
        const img = new Image();
        img.src = url;
      });
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // Auto slide interval
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % 3);
      }, 3800);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + 3) % 3);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % 3);
  }, []);

  const selectSlide = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  return (
    <div className="relative w-full bg-luxury-charcoal text-luxury-cream">
      <Navbar onNavigate={onNavigate} />

      <Hero
        onNavigate={onNavigate}
        activeIndex={activeIndex}
        handlePrev={handlePrev}
        handleNext={handleNext}
        selectSlide={selectSlide}
        onPauseChange={setIsPaused}
      />

      <WhyUs whyUsRef={whyUsRef} />

      <ServicesSlider
        servicesRef={servicesRef}
        onNavigate={onNavigate}
      />

      <CuratedAtelier
        activeTabIdx={activeTabIdx}
        setActiveTabIdx={setActiveTabIdx}
        onNavigate={onNavigate}
      />

      {/* 3D Studio completely isolated from mobile & tablet devices for zero WebGL overhead */}
      {isDesktop && (
        <div className="hidden lg:block">
          <Suspense fallback={<div className="w-full h-96 bg-[#0f1117] flex items-center justify-center"><span className="text-white/60 text-xs tracking-widest uppercase">Loading 3D Studio...</span></div>}>
            <InteractiveStudio
              cabinetFinishIdx={cabinetFinishIdx}
              setCabinetFinishIdx={setCabinetFinishIdx}
              countertopIdx={countertopIdx}
              setCountertopIdx={setCountertopIdx}
              kitchenLayout={kitchenLayout}
              setKitchenLayout={setKitchenLayout}
              underCabinetLightOn={underCabinetLightOn}
              setUnderCabinetLightOn={setUnderCabinetLightOn}
              studioAutoRotate={studioAutoRotate}
              setStudioAutoRotate={setStudioAutoRotate}
            />
          </Suspense>
        </div>
      )}

      <BeforeAfter />

      <ProjectGlimpse onNavigate={onNavigate} />

      <AboutUs />

      <Testimonial testimonialRef={testimonialRef} />

      <Showrooms showroomRef={showroomRef} />

      <GetInTouch getInTouchRef={getInTouchRef} />

      <Footer onNavigate={onNavigate} />

      <ReturnToHomeFAB />
    </div>
  );
};

export default LandingPage;
