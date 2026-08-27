import { memo, useRef, useEffect, useCallback } from 'react';
import modularKitchenImg from '../../assets/modular-kitchen.webp';
import acpelvationImg from '../../assets/ACP-elevation.webp';
import falseCeilingImg from '../../assets/false-ceiling-work.webp';

const SERVICES_DATA = [
  {
    serviceNum: 'SERVICE 01',
    title: 'Modular Kitchen',
    description: 'We design and install modern modular kitchens that are both stylish and functional. Our layouts maximize space and provide smart storage solutions. We use high-quality materials and durable fittings for long-lasting performance. Each kitchen is customized to match the client\'s taste and lifestyle.',
    buttonText: 'Explore Kitchen Designs',
    image: modularKitchenImg,
    alt: 'Modern Modular Kitchen Design'
  },
  {
    serviceNum: 'SERVICE 02',
    title: 'ACP Elevation',
    description: 'We design modern ACP (Aluminium Composite Panel) elevations to enhance the exterior of buildings. Our panels are durable, weather-resistant, and visually appealing. Customized colors, textures, and patterns are available to match the client\'s style. We focus on quality installation and precise finishing. ACP elevation works add a premium look to any property.',
    buttonText: 'Explore Service',
    image: acpelvationImg,
    alt: 'ACP Elevation Design'
  },
  {
    serviceNum: 'SERVICE 03',
    title: 'False Ceiling Work',
    description: 'We provide elegant false ceiling solutions that enhance the look and feel of interiors. Our services include gypsum and POP ceiling designs with integrated lighting. False ceilings conceal wiring and improve insulation. We offer modern patterns and durable finishes to suit any décor. Professional installation ensures lasting quality and aesthetics.',
    buttonText: 'Explore Service',
    image: falseCeilingImg,
    alt: 'False Ceiling Design'
  }
];

const TOTAL_SLIDES = SERVICES_DATA.length + 1; // 3 services + 1 CTA

function ServicesSlider({ servicesRef, onNavigate }) {
  const slideRefs = useRef([]);
  const dotRefs = useRef([]);
  const labelRef = useRef(null);
  const progressBarRef = useRef(null);
  const rafIdRef = useRef(null);
  const lastActiveRef = useRef(-1);
  const dimensionsRef = useRef({ offsetTop: 0, totalScrollable: 1 });

  // Cache element dimensions — zero DOM reads during scroll
  const updateDimensions = useCallback(() => {
    if (servicesRef?.current) {
      const elem = servicesRef.current;
      dimensionsRef.current = {
        offsetTop: elem.offsetTop,
        totalScrollable: Math.max(elem.offsetHeight - window.innerHeight, 1)
      };
    }
  }, [servicesRef]);

  // Ultra-fast scroll handler: Direct DOM mutations, zero React re-renders
  const updateTransform = useCallback(() => {
    const { offsetTop, totalScrollable } = dimensionsRef.current;
    const scrolled = window.scrollY - offsetTop;

    let progress = 0;
    if (scrolled >= 0) {
      progress = Math.min(scrolled / totalScrollable, 1);
    }

    // Which slide is active based on scroll progress
    const activeIdx = Math.min(Math.floor(progress * TOTAL_SLIDES), TOTAL_SLIDES - 1);

    // Update progress bar via DOM (no state)
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${progress * 100}%`;
    }

    // Only update card visibility when active index changes
    if (activeIdx !== lastActiveRef.current) {
      const prevIdx = lastActiveRef.current;
      lastActiveRef.current = activeIdx;

      // Hide previous card
      if (prevIdx >= 0 && prevIdx < slideRefs.current.length && slideRefs.current[prevIdx]) {
        const prevEl = slideRefs.current[prevIdx];
        prevEl.style.opacity = '0';
        prevEl.style.transform = prevIdx < activeIdx
          ? 'translateY(-40px) scale(0.96)'
          : 'translateY(40px) scale(0.96)';
        prevEl.style.pointerEvents = 'none';
      }

      // Show active card
      if (activeIdx >= 0 && activeIdx < slideRefs.current.length && slideRefs.current[activeIdx]) {
        const activeEl = slideRefs.current[activeIdx];
        activeEl.style.opacity = '1';
        activeEl.style.transform = 'translateY(0px) scale(1)';
        activeEl.style.pointerEvents = 'auto';
      }

      // Update dot indicators
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        if (i === activeIdx) {
          dot.style.width = '10px';
          dot.style.height = '10px';
          dot.style.background = '#838F6F';
          dot.style.boxShadow = '0 0 8px rgba(131,143,111,0.6)';
        } else {
          dot.style.width = '6px';
          dot.style.height = '6px';
          dot.style.background = 'rgba(242,241,237,0.25)';
          dot.style.boxShadow = 'none';
        }
      });

      // Update vertical label
      if (labelRef.current) {
        labelRef.current.textContent = activeIdx < SERVICES_DATA.length
          ? SERVICES_DATA[activeIdx].serviceNum
          : 'ALL SERVICES';
      }
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    let isIntersecting = false;

    // Initialize: show first slide, hide others
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === 0) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0px) scale(1)';
        el.style.pointerEvents = 'auto';
      } else {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) scale(0.96)';
        el.style.pointerEvents = 'none';
      }
    });
    lastActiveRef.current = 0;

    const handleScroll = () => {
      if (!isIntersecting) return;
      if (rafIdRef.current) return;
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        updateTransform();
      });
    };

    const handleResize = () => {
      updateDimensions();
      if (isIntersecting) updateTransform();
    };

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      if (isIntersecting) {
        updateDimensions();
        updateTransform();
      }
    }, { rootMargin: '250px 0px 250px 0px' });

    if (servicesRef?.current) {
      observer.observe(servicesRef.current);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [servicesRef, updateDimensions, updateTransform]);

  const handleNavigateServices = useCallback(() => {
    onNavigate && onNavigate('services');
  }, [onNavigate]);

  return (
    <div
      ref={servicesRef}
      id="services"
      className="relative w-full h-[300vh] lg:h-[400vh] bg-luxury-charcoal z-30 shadow-[0_-20px_50px_rgba(22,22,22,0.15)] touch-pan-y"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center bg-luxury-charcoal">

        {/* Ambient Radial Gradient Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(113,0,20,0.12),transparent_70%)] pointer-events-none" />

        {/* Card Stack Container */}
        <div className="relative w-full h-full flex items-center justify-center">

          {/* Service Cards — stacked, CSS transitions handle smoothness */}
          {SERVICES_DATA.map((slide, idx) => (
            <div
              key={idx}
              ref={el => slideRefs.current[idx] = el}
              className="absolute inset-0 w-full h-full flex items-center px-6 md:px-16 lg:px-24"
              style={{
                transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'opacity, transform'
              }}
            >
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-12 items-center pt-12 sm:pt-0">

                {/* Text Description */}
                <div className="lg:col-span-5 space-y-2.5 sm:space-y-5 md:space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-luxury-sage" />
                    <span className="font-sans text-xs md:text-sm font-extrabold tracking-[0.35em] text-luxury-sage uppercase">
                      {slide.serviceNum}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-luxury-cream leading-tight">
                    {slide.title}
                  </h2>
                  <div className="w-16 h-[1px] bg-luxury-cream/20 hidden sm:block" />

                  <p className="font-sans text-xs sm:text-base md:text-lg text-[#d4d3cf] leading-relaxed font-medium line-clamp-4 sm:line-clamp-none">
                    {slide.description}
                  </p>

                  <div className="pt-1 sm:pt-2">
                    <button
                      onClick={handleNavigateServices}
                      className="inline-flex items-center gap-2 font-sans text-xs md:text-sm tracking-wider text-luxury-sage font-bold uppercase hover:text-luxury-cream transition-colors group cursor-pointer touch-manipulation"
                    >
                      <span>{slide.buttonText}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Framed Visual Showcase */}
                <div className="lg:col-span-7 flex justify-center">
                  <div className="relative group w-full lg:w-auto rounded-2xl overflow-hidden shadow-2xl">
                    <div className="relative overflow-hidden w-full lg:w-[45vw] h-[22vh] sm:h-[32vh] lg:h-[60vh] rounded-2xl border border-luxury-cream/10">
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        width="800"
                        height="600"
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover scale-[1.03] transform transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}

          {/* Slide 4: View Full Catalog CTA */}
          <div
            ref={el => slideRefs.current[SERVICES_DATA.length] = el}
            className="absolute inset-0 w-full h-full flex items-center px-6 md:px-16 lg:px-24"
            style={{
              opacity: 0,
              transform: 'translateY(40px) scale(0.96)',
              pointerEvents: 'none',
              transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'opacity, transform'
            }}
          >
            <div className="max-w-4xl mx-auto w-full text-center space-y-8">
              <div className="flex justify-center items-center gap-3">
                <span className="w-8 h-[1px] bg-luxury-sage" />
                <span className="font-sans text-[11px] md:text-xs font-bold tracking-[0.35em] text-luxury-sage uppercase">
                  OUR SERVICES
                </span>
                <span className="w-8 h-[1px] bg-luxury-sage" />
              </div>

              <h2 className="font-display text-3xl md:text-5xl lg:text-7xl font-extralight text-luxury-cream leading-tight tracking-wide">
                Custom Interior Design & Full Catalogs
              </h2>

              <p className="font-sans text-sm md:text-base text-[#d4d3cf] max-w-xl mx-auto leading-relaxed font-light">
                Browse our complete project catalog to see custom layouts, material options, finishes, and timelines for your home or office.
              </p>

              <div className="pt-4">
                <button
                  onClick={handleNavigateServices}
                  className="relative px-8 py-3.5 bg-luxury-cream text-luxury-charcoal font-sans text-xs uppercase tracking-widest font-semibold overflow-hidden group transition-all duration-300 shadow-[0_10px_30px_rgba(131,143,111,0.1)] hover:shadow-[0_10px_35px_rgba(131,143,111,0.2)] cursor-pointer touch-manipulation"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-luxury-cream">
                    Browse Services Catalog
                  </span>
                  <span className="absolute inset-0 bg-luxury-red -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Dot Indicators — right side */}
        <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-30">
          {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => (
            <div
              key={idx}
              ref={el => dotRefs.current[idx] = el}
              className="rounded-full transition-all duration-300"
              style={{
                width: idx === 0 ? '10px' : '6px',
                height: idx === 0 ? '10px' : '6px',
                background: idx === 0 ? '#838F6F' : 'rgba(242,241,237,0.25)',
                boxShadow: idx === 0 ? '0 0 8px rgba(131,143,111,0.6)' : 'none'
              }}
            />
          ))}
        </div>

        {/* Active Service Label (desktop only) */}
        <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
          <span
            ref={labelRef}
            className="font-sans text-[10px] font-bold tracking-[0.3em] text-luxury-sage/60 uppercase"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            SERVICE 01
          </span>
        </div>

        {/* Timeline Progress Bar */}
        <div className="absolute bottom-8 left-6 md:left-16 right-6 md:right-16 h-[1px] bg-luxury-cream/10 z-30">
          <div
            ref={progressBarRef}
            className="h-full bg-luxury-sage transform-gpu will-change-transform"
            style={{ width: '0%' }}
          />
        </div>

      </div>
    </div>
  );
}

export default memo(ServicesSlider);
