
import { memo, useRef, useEffect, useCallback } from 'react';
import slogo from '../../assets/slogo.webp';

const localSlides = [
  {
    image: '/images/slide-living.webp',
    alt: 'Sharkings Interior luxury living room interior design studio in Madurai & Ramanathapuram',
    subtitle: 'LUXURY HOMES & RESIDENCES',
    title: 'Luxury Interior Design Studio',
    description: 'We design beautiful luxury homes and custom living spaces. From initial idea to final setup, Sharkings Interior creates modern, comfortable, and elegant home interiors.',
    accent: 'text-luxury-red',
    borderAccent: 'border-luxury-red',
    accentHex: '#710014'
  },
  {
    image: '/images/slide-dining.webp',
    alt: 'Modern luxury dining room and modular interior design by Sharkings Interior',
    subtitle: 'DINING & LIVING ROOM DESIGN',
    title: 'Custom Dining Room Interior Design',
    description: 'Transform your dining room with custom furniture, warm lighting, and stylish decor. Built for family meals and welcoming your guests.',
    accent: 'text-luxury-sage',
    borderAccent: 'border-luxury-sage',
    accentHex: '#838F6F'
  },
  {
    image: '/images/slide-bedroom.webp',
    alt: 'Bespoke luxury master bedroom interior design by Sharkings Interior Madurai',
    subtitle: 'BEDROOM & MASTER SUITE DESIGN',
    title: 'Bespoke Bedroom & Master Suite Design',
    description: 'Create your dream master bedroom with custom wall paneling, soft ambient lighting, and luxury seating designed for pure relaxation.',
    accent: 'text-luxury-red',
    borderAccent: 'border-luxury-red',
    accentHex: '#710014'
  }
];

function Hero({
  onNavigate,
  loading,
  progress,
  activeIndex,
  handlePrev,
  handleNext,
  selectSlide
}) {
  const smoothScrollToTarget = useCallback((targetSelector) => {
    const elem = document.querySelector(targetSelector);
    if (!elem) return;
    elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      {/* Kinetic Split-Curtain Preloader */}
      <div className={`fixed inset-0 z-[999] pointer-events-none overflow-hidden transition-opacity duration-300 ${
        loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        
        {/* Top Shutter Panel */}
        <div
          className={`absolute top-0 left-0 right-0 h-1/2 bg-luxury-charcoal border-b border-luxury-sage/30 shadow-2xl transition-transform duration-350 ease-out transform-gpu ${
            loading ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-red/15 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Bottom Shutter Panel */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1/2 bg-luxury-charcoal border-t border-luxury-sage/30 shadow-2xl transition-transform duration-350 ease-out transform-gpu ${
            loading ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-sage/10 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Central Preloader Assembly */}
        <div
          className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center transition-opacity duration-250 ease-out px-4 ${
            loading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Central Progress Ring */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
            
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 200 200"
            >
              <circle
                cx="100"
                cy="100"
                r="90"
                className="stroke-luxury-sage/20 fill-none"
                strokeWidth="2"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                className="stroke-luxury-sage fill-none transition-all duration-200 ease-out"
                strokeWidth="3"
                strokeDasharray={2 * Math.PI * 90}
                strokeDashoffset={(2 * Math.PI * 90) - (progress / 100) * (2 * Math.PI * 90)}
                strokeLinecap="round"
              />
            </svg>

            {/* Central Brand Medallion */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-luxury-cream border border-luxury-sage/60 shadow-xl flex items-center justify-center p-4 z-10">
              <img
                src={slogo}
                alt="Sharkings Interior"
                width="140"
                height="40"
                loading="eager"
                decoding="async"
                className="h-14 sm:h-18 w-auto object-contain mix-blend-multiply"
              />
            </div>

          </div>

          {/* Status Typography */}
          <div className="flex flex-col items-center space-y-2 text-center pt-5">
            <span className="font-serif text-[10px] sm:text-xs tracking-[0.45em] text-luxury-sage uppercase">
              {progress < 35
                ? 'LOADING HOME PORTFOLIO'
                : progress < 75
                ? 'PREPARING DESIGN FINISHES'
                : progress < 100
                ? 'SETTING UP LUXURY SPACES'
                : 'SHARKINGS INTERIORS & EXTERIORS'}
            </span>
          </div>

        </div>
      </div>

      {/* HERO SECTION CONTAINER */}
      <section
        id="hero"
        className="relative w-full h-screen min-h-[640px] bg-luxury-charcoal z-10 overflow-hidden"
      >
        <div
          className="relative w-full h-full overflow-hidden bg-luxury-charcoal shadow-2xl"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(113,0,20,0.18),transparent_70%)] pointer-events-none z-1" />

          {/* Sliding Images */}
          <div className="absolute inset-0 w-full h-full z-0">
            {localSlides.map((slide, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div
                  key={idx}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-200 ease-out ${
                    isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/80 via-transparent to-black/20 z-20 pointer-events-none" />

                  <div className="w-full h-full overflow-hidden">
                    <img
                      src={slide.image}
                      alt={slide.alt || "Sharkings Interior - Bespoke Luxury Interior Design"}
                      width="1920"
                      height="1080"
                      loading={idx === 0 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={idx === 0 ? "high" : "low"}
                      className={`w-full h-full object-cover transition-transform duration-300 ease-out ${
                        isActive ? 'scale-105' : 'scale-100'
                      }`}
                    />
                  </div>

                  <div
                    className="absolute inset-0 flex flex-col justify-center px-4 sm:px-12 lg:px-24 pt-20 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 z-30"
                  >
                    <div className="max-w-2xl lg:max-w-3xl space-y-3 sm:space-y-6">

                      <div
                        className={`transition-all duration-150 ease-out ${
                          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                        }`}
                        style={{ transitionDelay: '0ms' }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-[1px] bg-luxury-sage" />
                          <span className="font-sans text-xs sm:text-sm font-extrabold tracking-[0.25em] text-luxury-sage uppercase">
                            {slide.subtitle}
                          </span>
                        </div>
                      </div>

                      <h1
                        className={`font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-luxury-cream transition-all duration-150 ease-out ${
                          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                        }`}
                        style={{ transitionDelay: '0ms' }}
                      >
                        {slide.title}
                      </h1>

                      <p
                        className={`font-sans text-sm sm:text-base text-luxury-cream/90 max-w-xl leading-relaxed font-medium tracking-wide transition-all duration-150 ease-out ${
                          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                        }`}
                        style={{ transitionDelay: '0ms' }}
                      >
                        {slide.description}
                      </p>

                      <div
                        className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4 sm:pt-6 transition-all duration-150 ease-out ${
                          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                        }`}
                        style={{ transitionDelay: '0ms' }}
                      >
                        <a
                          href="/projects"
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate && onNavigate('projects');
                          }}
                          className="relative px-6 sm:px-8 py-3.5 bg-luxury-cream text-luxury-charcoal font-sans text-sm uppercase tracking-widest font-bold overflow-hidden group transition-all duration-300 cursor-pointer text-center touch-manipulation"
                          style={{
                            boxShadow: isActive ? `0 10px 30px -15px ${slide.accentHex}` : 'none'
                          }}
                        >
                          <span className="relative z-10 transition-colors duration-300 group-hover:text-luxury-cream">
                            View Our Projects
                          </span>
                          <span className="absolute inset-0 bg-luxury-red -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                        </a>

                        <a
                          href="#get-in-touch"
                          onClick={(e) => {
                            e.preventDefault();
                            smoothScrollToTarget('#get-in-touch');
                          }}
                          className="relative px-6 sm:px-8 py-3.5 text-luxury-cream border border-luxury-cream/20 hover:border-luxury-cream font-sans text-sm uppercase tracking-widest font-semibold overflow-hidden group transition-all duration-300 cursor-pointer text-center touch-manipulation"
                        >
                          <span className="relative z-10">
                            Contact Us
                          </span>
                        </a>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div
            className="absolute bottom-8 sm:bottom-10 right-6 sm:right-12 lg:right-24 z-30 flex items-center gap-4 transition-opacity duration-300"
          >
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="w-12 h-12 rounded-none border border-luxury-cream/10 flex items-center justify-center text-luxury-cream/70 hover:text-luxury-cream hover:border-luxury-cream hover:bg-luxury-cream/5 transition-all duration-200 group cursor-pointer touch-manipulation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <div className="flex items-center gap-2 px-2 font-display text-base tracking-widest text-luxury-cream">
              <span className="font-semibold">0{activeIndex + 1}</span>
              <span className="opacity-30">/</span>
              <span className="opacity-50">0{localSlides.length}</span>
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="w-12 h-12 rounded-none border border-luxury-cream/10 flex items-center justify-center text-luxury-cream/70 hover:text-luxury-cream hover:border-luxury-cream hover:bg-luxury-cream/5 transition-all duration-200 group cursor-pointer touch-manipulation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Slide Indicators */}
          <div
            className="hidden md:flex absolute bottom-8 sm:bottom-10 left-6 sm:left-12 lg:left-24 z-30 items-center gap-6 transition-opacity duration-300"
          >
            {localSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => selectSlide(idx)}
                className="group py-4 flex flex-col items-start focus:outline-none cursor-pointer touch-manipulation"
              >
                <span className={`font-sans text-[11px] font-semibold tracking-widest transition-all duration-200 ${
                  idx === activeIndex ? 'text-luxury-cream font-bold opacity-100' : 'text-luxury-cream/40 opacity-70 group-hover:text-luxury-cream/80'
                }`}>
                  0{idx + 1}
                </span>
                <div className="w-16 md:w-24 h-[1px] bg-luxury-cream/20 mt-1 relative overflow-hidden">
                  {idx === activeIndex && (
                    <div
                      key={activeIndex}
                      className="absolute left-0 top-0 h-full bg-luxury-sage animate-progress-bar"
                    />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Scroll Down Indicator */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden lg:flex flex-col items-center gap-2 transition-opacity duration-300"
          >
            <span className="font-sans text-[11px] font-medium tracking-[0.3em] uppercase text-luxury-cream/40">
              Scroll Down
            </span>
            <div className="w-5 h-8 border border-luxury-cream/20 rounded-full flex justify-center py-1">
              <div className="w-1.5 h-1.5 bg-luxury-sage rounded-full animate-scroll-bounce" />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default memo(Hero);

