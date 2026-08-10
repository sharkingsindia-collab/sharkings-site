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

  // Monitor viewport size for responsive layout styling (debounced)
  useEffect(() => {
    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsDesktop(window.innerWidth >= 1024);
      }, 200);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Trigger once on mount
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Preloading key visual assets for initial hero viewport — instant reveal
  useEffect(() => {
    if (initialPreloadDone) {
      setLoading(false);
      setProgress(100);
      return;
    }

    let isDone = false;

    const finishPreload = () => {
      if (isDone) return;
      isDone = true;
      initialPreloadDone = true;
      setProgress(100);
      setLoading(false);
    };

    // Safety fallback timeout: max 1.2s wait time on low-end networks
    const timeoutId = setTimeout(finishPreload, 1200);

    // Preload primary hero slide image
    const mainHeroImg = new Image();
    mainHeroImg.src = '/images/slide-living.png';

    const handleMainLoad = () => {
      clearTimeout(timeoutId);
      finishPreload();
    };

    mainHeroImg.onload = handleMainLoad;
    mainHeroImg.onerror = handleMainLoad;

    // Asynchronously cache secondary slides in background without blocking initial paint
    setTimeout(() => {
      ['/images/slide-dining.png', '/images/slide-bedroom.png'].forEach(url => {
        const img = new Image();
        img.src = url;
      });
    }, 400);

    return () => clearTimeout(timeoutId);
  }, []);

  // Auto slide interval (fast 3.5s rotation)
  useEffect(() => {
    if (loading) return;

    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          setPrevActiveIndex(prev);
          return (prev + 1) % 3; // 3 slides total
        });
      }, 3500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, loading]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => {
      setPrevActiveIndex(prev);
      return (prev - 1 + 3) % 3;
    });
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => {
      setPrevActiveIndex(prev);
      return (prev + 1) % 3;
    });
  }, []);

  const selectSlide = useCallback((index) => {
    setActiveIndex((prev) => {
      if (index === prev) return prev;
      setPrevActiveIndex(prev);
      return index;
    });
  }, []);

  return (
    <div className="relative w-full bg-luxury-charcoal text-luxury-cream">
      <Navbar onNavigate={onNavigate} />

      <Hero
        onNavigate={onNavigate}
        loading={loading}
        progress={progress}
        activeIndex={activeIndex}
        prevActiveIndex={prevActiveIndex}
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

      {/* 3D Studio completely isolated from mobile devices for zero WebGL overhead */}
      {isDesktop && (
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
      )}

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