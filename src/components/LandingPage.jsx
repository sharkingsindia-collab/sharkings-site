import { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Hero from './sections/Hero';
import AboutUs from './sections/AboutUs';
import WhyUs from './sections/WhyUs';
import ServicesSlider from './sections/ServicesSlider';
import CuratedAtelier from './sections/CuratedAtelier';
import InteractiveStudio from './sections/InteractiveStudio';
import BeforeAfter from './sections/BeforeAfter';
import ProjectGlimpse from './sections/ProjectGlimpse';
import Testimonial from './sections/Testimonial';
import Showrooms from './sections/Showrooms';
import BookConsultation from './sections/BookConsultation';
import GetInTouch from './sections/GetInTouch';
import Footer from './sections/Footer';
import ReturnToHomeFAB from './sections/ReturnToHomeFAB';

let initialPreloadDone = false;

const LandingPage = ({ onNavigate }) => {
  const [loading, setLoading] = useState(!initialPreloadDone);
  const [progress, setProgress] = useState(initialPreloadDone ? 100 : 0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevActiveIndex, setPrevActiveIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [whyUsBgProgress, setWhyUsBgProgress] = useState(0);
  const [whyUsContentProgress, setWhyUsContentProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

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
  const consultationRef = useRef(null);
  const getInTouchRef = useRef(null);
  const [testimonialProgress, setTestimonialProgress] = useState(0);
  const [showroomProgress, setShowroomProgress] = useState(0);
  const [consultationProgress, setConsultationProgress] = useState(0);
  const [getInTouchProgress, setGetInTouchProgress] = useState(0);

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

  // Track window scroll for parallax effects, relative bounds, and services section pinning
  useEffect(() => {
    const handleScroll = () => {
      // 1. Hero scroll position
      const scrollPos = window.scrollY;
      setScrollY(scrollPos);

      // 2. Services section horizontal scroll progress calculation
      if (servicesRef.current) {
        const rect = servicesRef.current.getBoundingClientRect();
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;

        const scrolled = -rect.top;
        const totalScrollable = sectionHeight - viewportHeight;

        if (scrolled >= 0 && scrolled <= totalScrollable) {
          setScrollProgress(scrolled / totalScrollable);
        } else if (scrolled < 0) {
          setScrollProgress(0);
        } else {
          setScrollProgress(1);
        }
      }

      // 3. Why Us section 2-step scroll progress
      if (whyUsRef.current) {
        const rect = whyUsRef.current.getBoundingClientRect();
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;

        // Step 1: Cream BG pops up as section top enters viewport (rect.top: viewportHeight -> 0)
        const bgProg = Math.min(Math.max(0, (viewportHeight - rect.top) / viewportHeight), 1);
        setWhyUsBgProgress(bgProg);

        // Step 2: Every content pops up on next scroll inside pinned area (rect.top <= 0)
        const scrolled = -rect.top;
        const totalScrollable = sectionHeight - viewportHeight;
        let contentProg = 0;
        if (scrolled >= 0 && totalScrollable > 0) {
          contentProg = Math.min(Math.max(0, scrolled / (totalScrollable * 0.5)), 1);
        }
        setWhyUsContentProgress(contentProg);
      }


      // 4. Testimonial section relative scroll progress
      if (testimonialRef.current) {
        const rect = testimonialRef.current.getBoundingClientRect();
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;
        const scrolled = -rect.top;
        const totalScrollable = sectionHeight - viewportHeight;
        if (scrolled >= 0 && scrolled <= totalScrollable) {
          setTestimonialProgress(scrolled / totalScrollable);
        } else if (scrolled < 0) {
          setTestimonialProgress(0);
        } else {
          setTestimonialProgress(1);
        }
      }

      // 5. Showroom section relative scroll progress
      if (showroomRef.current) {
        const rect = showroomRef.current.getBoundingClientRect();
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;
        const scrolled = -rect.top + viewportHeight;
        if (sectionHeight > 0) {
          setShowroomProgress(Math.min(Math.max(0, scrolled / (sectionHeight + viewportHeight)), 1));
        }
      }

      // 6. Consultation section relative scroll progress
      if (consultationRef.current) {
        const rect = consultationRef.current.getBoundingClientRect();
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;
        const scrolled = -rect.top + viewportHeight;
        if (sectionHeight > 0) {
          setConsultationProgress(Math.min(Math.max(0, scrolled / (sectionHeight + viewportHeight)), 1));
        }
      }

      // 7. Get In Touch section relative scroll progress
      if (getInTouchRef.current) {
        const rect = getInTouchRef.current.getBoundingClientRect();
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;
        const scrolled = -rect.top;
        if (sectionHeight > viewportHeight) {
          setGetInTouchProgress(Math.min(Math.max(0, scrolled / (sectionHeight - viewportHeight)), 1));
        } else {
          setGetInTouchProgress(Math.min(Math.max(0, (-rect.top + viewportHeight) / (sectionHeight + viewportHeight)), 1));
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mouse move for a very minor, subtle ambient shift (6px max) to maintain premium feel
  const handleMouseMove = (e) => {
    const { clientWidth, clientHeight } = e.currentTarget;
    const x = (e.clientX / clientWidth - 0.5) * 6;
    const y = (e.clientY / clientHeight - 0.5) * 6;
    setMousePos({ x, y });
  };

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

  // Parallax Scroll calculations
  const heroOpacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.7));
  const heroTextY = scrollY * 0.2;
  const heroBgY = scrollY * 0.35;

  // Cinematic Framed Card Reveal Transition Calculations
  const frameProgress = typeof window !== 'undefined' ? Math.min(scrollY / window.innerHeight, 1) : 0;
  const heroScale = 1 - frameProgress * 0.08;
  const heroRadius = frameProgress * 24;
  const heroPadding = frameProgress * 16;

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
        heroPadding={heroPadding}
        heroRadius={heroRadius}
        heroScale={heroScale}
        heroBgY={heroBgY}
        heroTextY={heroTextY}
        heroOpacity={heroOpacity}
      />

      <WhyUs
        whyUsRef={whyUsRef}
        whyUsBgProgress={whyUsBgProgress}
        whyUsContentProgress={whyUsContentProgress}
      />

      <ServicesSlider
        servicesRef={servicesRef}
        scrollProgress={scrollProgress}
        onNavigate={onNavigate}
      />

      <CuratedAtelier
        activeTabIdx={activeTabIdx}
        setActiveTabIdx={setActiveTabIdx}
        onNavigate={onNavigate}
      />

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
        loading={loading}
      />

      <BeforeAfter />

      <ProjectGlimpse onNavigate={onNavigate} />

      <AboutUs onNavigate={onNavigate} />

      <Testimonial
        testimonialRef={testimonialRef}
        testimonialProgress={testimonialProgress}
        isDesktop={isDesktop}
      />

      <Showrooms
        showroomRef={showroomRef}
        scrollProgress={showroomProgress}
        isDesktop={isDesktop}
      />

      <BookConsultation
        consultationRef={consultationRef}
        scrollProgress={consultationProgress}
        isDesktop={isDesktop}
        onNavigate={onNavigate}
      />

      <GetInTouch
        getInTouchRef={getInTouchRef}
        scrollProgress={getInTouchProgress}
        isDesktop={isDesktop}
      />

      <Footer onNavigate={onNavigate} />

      <ReturnToHomeFAB />

    </div>
  );
};

export default LandingPage;