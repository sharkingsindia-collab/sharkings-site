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

// Lazy load Three.js heavy section - only loads on desktop when visible
const InteractiveStudio = lazy(() => import('./sections/InteractiveStudio'));

let initialPreloadDone = false;

const LandingPage = ({ onNavigate }) => {
  const [loading, setLoading] = useState(!initialPreloadDone);
  const [progress, setProgress] = useState(initialPreloadDone ? 100 : 0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevActiveIndex, setPrevActiveIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [isDesktop, setIsDesktop] = useState(true);

  // 3D Studio state (Modular Kitchen)
  const [cabinetFinishIdx, setCabinetFinishIdx] = useState(0);
  const [countertopIdx, setCountertopIdx] = useState(0);
  const [kitchenLayout, setKitchenLayout] = useState('l-shaped');
  const [underCabinetLightOn, setUnderCabinetLightOn] = useState(true);
  const [studioAutoRotate, setStudioAutoRotate] = useState(false);
  const [wallColorIdx, setWallColorIdx] = useState(0);

  // Curation tab state
  const [activeTabIdx, setActiveTabIdx] = useState(1);

  const timerRef = useRef(null);
  const whyUsRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialRef = useRef(null);
  const showroomRef = useRef(null);
  const getInTouchRef = useRef(null);

  // Monitor viewport size for responsive layout styling
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Trigger once on mount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preloading images in JS (All 6 key visual assets)
  useEffect(() => {
    if (initialPreloadDone) {
      setLoading(false);
      setProgress(100);
      return;
    }

    let loadedCount = 0;
    const imageUrls = [
      '/images/slide-living.png',
      '/images/slide-dining.png',
      '/images/slide-bedroom.png',
      '/images/service-residential.png',
      '/images/service-commercial.png',
      '/images/service-furniture.png'
    ];

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;

      const handleLoad = () => {
        loadedCount++;
        const percent = Math.round((loadedCount / imageUrls.length) * 100);
        setProgress(percent);
        if (loadedCount === imageUrls.length) {
          setTimeout(() => {
            initialPreloadDone = true;
            setLoading(false);
          }, 800);
        }
      };

      img.onload = handleLoad;
      img.onerror = handleLoad;
    });
  }, []);

  // Auto slide interval
  useEffect(() => {
    if (loading) return;

    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          setPrevActiveIndex(prev);
          return (prev + 1) % 3; // 3 slides total
        });
      }, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, loading]);



  // Mouse move – only on desktop, subtle ambient shift
  const handleMouseMove = useCallback((e) => {
    if (!isDesktop) return;
    const { clientWidth, clientHeight } = e.currentTarget;
    const x = (e.clientX / clientWidth - 0.5) * 6;
    const y = (e.clientY / clientHeight - 0.5) * 6;
    setMousePos({ x, y });
  }, [isDesktop]);

  const handlePrev = () => {
    setPrevActiveIndex(activeIndex);
    setActiveIndex((prev) => (prev - 1 + 3) % 3);
  };

  const handleNext = () => {
    setPrevActiveIndex(activeIndex);
    setActiveIndex((prev) => (prev + 1) % 3);
  };

  const selectSlide = (index) => {
    if (index === activeIndex) return;
    setPrevActiveIndex(activeIndex);
    setActiveIndex(index);
  };

  return (
    <div className="relative w-full bg-luxury-charcoal text-luxury-cream">
      <Navbar onNavigate={onNavigate} />

      <Hero
        onNavigate={onNavigate}
        loading={loading}
        progress={progress}
        activeIndex={activeIndex}
        prevActiveIndex={prevActiveIndex}
        mousePos={mousePos}
        handleMouseMove={handleMouseMove}
        handlePrev={handlePrev}
        handleNext={handleNext}
        selectSlide={selectSlide}
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

      {/* 3D Studio hidden on mobile for performance, lazy-loaded on desktop */}
      <div className="hidden md:block">
        <Suspense fallback={<div className="w-full h-96 bg-[#0f1117] flex items-center justify-center"><span className="text-white/30 text-xs tracking-widest uppercase">Loading 3D Studio...</span></div>}>
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
            wallColorIdx={wallColorIdx}
            setWallColorIdx={setWallColorIdx}
            loading={loading}
          />
        </Suspense>
      </div>

      <BeforeAfter />

      <ProjectGlimpse onNavigate={onNavigate} />

      <AboutUs onNavigate={onNavigate} />

      <Testimonial testimonialRef={testimonialRef} />

      <Showrooms showroomRef={showroomRef} isDesktop={isDesktop} />

      <GetInTouch getInTouchRef={getInTouchRef} isDesktop={isDesktop} />

      <Footer onNavigate={onNavigate} />

      <ReturnToHomeFAB />

    </div>
  );
};

export default LandingPage;