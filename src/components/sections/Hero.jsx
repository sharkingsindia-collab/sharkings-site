import { memo, useCallback } from 'react';
import slogo from '../../assets/slogo.webp';

const localSlides = [
  {
    image: '/images/slide-living.webp',
    alt: 'Sharkings Interior luxury living room interior design studio in Madurai & Ramanathapuram',
    subtitle: 'LUXURY HOMES & RESIDENCES',
    title: 'Luxury Interior Design Studio',
    description: 'We design beautiful luxury homes and custom living spaces. From initial 3D concept to turnkey completion, Sharkings creates modern, comfortable, and elegant home interiors.',
    badge: '01 / LIVING ROOMS',
    imageSide: 'right', // Slide 1: Text Left, Image Right
    accentHex: '#c5a059'
  },
  {
    image: '/images/slide-dining.webp',
    alt: 'Modern luxury dining room and modular interior design by Sharkings Interior',
    subtitle: 'DINING & LIVING ROOM DESIGN',
    title: 'Custom Dining & Social Spaces',
    description: 'Transform your dining spaces with handcrafted furniture, warm ambient lighting, and bespoke decor tailored for family dinners and hosting guests.',
    badge: '02 / DINING SUITES',
    imageSide: 'left', // Slide 2: Image Left, Text Right (Alternating)
    accentHex: '#838F6F'
  },
  {
    image: '/images/slide-bedroom.webp',
    alt: 'Bespoke luxury master bedroom interior design by Sharkings Interior Madurai',
    subtitle: 'BEDROOM & MASTER SUITE DESIGN',
    title: 'Bespoke Bedroom & Master Suites',
    description: 'Create your dream master bedroom with custom acoustic wall paneling, integrated warm LED lighting, and luxury wardrobes designed for pure relaxation.',
    badge: '03 / MASTER BEDROOMS',
    imageSide: 'right', // Slide 3: Text Left, Image Right
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
          className={`absolute top-0 left-0 right-0 h-1/2 bg-luxury-charcoal border-b border-[#c5a059]/30 shadow-2xl transition-transform duration-350 ease-out transform-gpu ${
            loading ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#710014]/15 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Bottom Shutter Panel */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1/2 bg-luxury-charcoal border-t border-[#c5a059]/30 shadow-2xl transition-transform duration-350 ease-out transform-gpu ${
            loading ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#c5a059]/10 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Central Preloader Assembly */}
        <div
          className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center transition-opacity duration-250 ease-out px-4 ${
            loading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 200 200"
            >
              <circle
                cx="100"
                cy="100"
                r="90"
                className="stroke-[#c5a059]/20 fill-none"
                strokeWidth="2"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                className="stroke-[#c5a059] fill-none transition-all duration-200 ease-out"
                strokeWidth="3"
                strokeDasharray={2 * Math.PI * 90}
                strokeDashoffset={(2 * Math.PI * 90) - (progress / 100) * (2 * Math.PI * 90)}
                strokeLinecap="round"
              />
            </svg>

            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-luxury-cream border border-[#c5a059]/60 shadow-xl flex items-center justify-center p-4 z-10">
              <img
                src={slogo}
                alt="Sharkings Interior"
                width="140"
                height="40"
                loading="eager"
                decoding="async"
                className="h-12 sm:h-16 w-auto object-contain mix-blend-multiply"
              />
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2 text-center pt-4">
            <span className="font-serif text-[10px] sm:text-xs tracking-[0.45em] text-[#c5a059] uppercase">
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

      {/* HERO SECTION CONTAINER - 100VH VIEWPORT FIT */}
      <section
        id="hero"
        className="relative w-full h-screen min-h-[580px] max-h-[100dvh] text-[#fbf9f6] z-10 overflow-hidden flex flex-col justify-between pt-20 sm:pt-22 lg:pt-24 pb-3 sm:pb-4"
      >
        {/* Full-Screen Same-Image Backdrop (Clear, Light & Luminous) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          {localSlides.map((slide, idx) => {
            const isBackdropActive = idx === activeIndex;
            return (
              <div
                key={idx}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-out ${
                  isBackdropActive ? 'opacity-55' : 'opacity-0'
                }`}
              >
                <img
                  src={slide.image}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover object-center filter blur-[4px] transform scale-105"
                />
              </div>
            );
          })}

          {/* Elegant Scrim Gradient: Keeps text on the side 100% crisp while revealing the background room clearly */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.12),transparent_70%)]" />
        </div>

        {/* Main Content Area */}
        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-12 lg:px-16 z-10 flex-1 flex items-center min-h-0">
          <div className="w-full relative">
            {localSlides.map((slide, idx) => {
              const isActive = idx === activeIndex;
              const isImageOnLeft = slide.imageSide === 'left';

              return (
                <div
                  key={idx}
                  className={`transition-all duration-500 ease-out ${
                    isActive
                      ? 'opacity-100 pointer-events-auto relative z-10 scale-100'
                      : 'opacity-0 pointer-events-none absolute inset-0 z-0 scale-98'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-12 items-center w-full">
                    
                    {/* TEXT COLUMN (5 Columns on Desktop) */}
                    <div
                      className={`space-y-3 sm:space-y-4 lg:col-span-5 transition-all duration-500 delay-100 ${
                        isImageOnLeft ? 'lg:order-2 lg:pl-2' : 'lg:order-1 lg:pr-2'
                      } ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                    >
                      {/* Subtitle Pill */}
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-[1.5px] bg-[#c5a059]" />
                        <span className="font-sans text-[11px] sm:text-xs font-extrabold tracking-[0.25em] text-[#c5a059] uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                          {slide.subtitle}
                        </span>
                      </div>

                      {/* Main Headline */}
                      <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[46px] font-light text-white tracking-tight leading-[1.12] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        {slide.title}
                      </h1>

                      {/* Description */}
                      <p className="font-sans text-xs sm:text-sm md:text-base text-white/90 max-w-lg leading-relaxed font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                        {slide.description}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-1.5 sm:pt-2">
                        <a
                          href="/projects"
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate && onNavigate('projects');
                          }}
                          className="px-6 sm:px-7 py-3 bg-[#c5a059] text-[#141210] font-sans text-xs uppercase tracking-widest font-extrabold shadow-lg hover:bg-white hover:text-[#710014] transition-all duration-300 cursor-pointer text-center touch-manipulation"
                        >
                          View Our Projects
                        </a>

                        <a
                          href="#get-in-touch"
                          onClick={(e) => {
                            e.preventDefault();
                            smoothScrollToTarget('#get-in-touch');
                          }}
                          className="px-6 sm:px-7 py-3 text-white border border-white/40 hover:border-[#c5a059] hover:text-[#c5a059] font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer text-center touch-manipulation backdrop-blur-xs"
                        >
                          Contact Us
                        </a>
                      </div>

                      {/* Feature Bullet Points */}
                      <div className="grid grid-cols-2 gap-2.5 pt-2.5 border-t border-white/15 font-sans text-[11px] sm:text-xs text-white/85">
                        <div className="flex items-center gap-2">
                       
                         
                        </div>
                        <div className="flex items-center gap-2">
                         
                          
                        </div>
                      </div>
                    </div>

                    {/* ENLARGED ARCHITECTURAL HALF-CIRCLE IMAGE SHOWCASE (7 Columns on Desktop) */}
                    <div
                      className={`lg:col-span-7 flex justify-center transition-all duration-500 delay-150 ${
                        isImageOnLeft ? 'lg:order-1' : 'lg:order-2'
                      } ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                    >
                      <div className="relative w-full max-w-[520px] sm:max-w-[580px] lg:max-w-[620px] group">
                        
                        {/* Golden Halo Backlight Behind the Arch */}
                        <div className="absolute inset-0 bg-[#c5a059]/30 rounded-t-[240px] sm:rounded-t-[300px] lg:rounded-t-[340px] blur-2xl transform scale-105 pointer-events-none -z-10" />

                        {/* Grand Larger Half-Circle / Arch Window Portal (100% Bright, Vivid Image) */}
                        <div className="relative w-full h-[300px] sm:h-[360px] md:h-[400px] lg:h-[440px] xl:h-[480px] max-h-[54vh] rounded-t-[220px] sm:rounded-t-[280px] lg:rounded-t-[320px] rounded-b-2xl overflow-hidden border-2 border-[#c5a059]/70 shadow-[0_25px_60px_rgba(0,0,0,0.65)] bg-[#1e1a17]">
                          <img
                            src={slide.image}
                            alt={slide.alt || "Sharkings Interior - Bespoke Luxury Interior Design"}
                            width="1920"
                            height="1080"
                            loading={idx === 0 ? "eager" : "lazy"}
                            decoding="async"
                            fetchPriority={idx === 0 ? "high" : "low"}
                            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                          />

                          {/* Subtle Bottom Vignette inside the arch */}
                          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                          {/* Floating Category Badge inside Arch */}
                          <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between pointer-events-none">
                            <span className="px-3 py-1.5 bg-[#141210]/95 backdrop-blur-md border border-[#c5a059]/50 text-[#c5a059] font-sans text-[11px] sm:text-xs font-extrabold tracking-widest uppercase shadow-xl">
                              {slide.badge}
                            </span>
                            <span className="px-2.5 py-1 bg-black/70 backdrop-blur-sm text-white/90 font-sans text-[10px] font-bold tracking-wider">
                              MADURAI & RAMNAD
                            </span>
                          </div>
                        </div>

                        {/* Decorative Architectural Frame Accents */}
                        <div className="hidden sm:block absolute -bottom-3 -right-3 w-14 h-14 border-r-2 border-b-2 border-[#c5a059]/70 pointer-events-none" />
                        <div className="hidden sm:block absolute -top-3 -left-3 w-14 h-14 border-l-2 border-t-2 border-[#c5a059]/70 rounded-tl-3xl pointer-events-none" />
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM NAVIGATION & SLIDE CONTROLS (Compact & Fully Visible on Laptop) */}
        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-12 lg:px-16 z-20 pt-3 sm:pt-3.5 border-t border-white/20 flex items-center justify-between">
          
          {/* Slide Indicators */}
          <div className="flex items-center gap-4 sm:gap-6">
            {localSlides.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => selectSlide(idx)}
                className="group py-1.5 flex items-center gap-2 focus:outline-none cursor-pointer touch-manipulation"
              >
                <span className={`font-sans text-[11px] sm:text-xs font-bold tracking-widest transition-colors duration-200 ${
                  idx === activeIndex ? 'text-[#c5a059]' : 'text-white/50 group-hover:text-white/85'
                }`}>
                  0{idx + 1}
                </span>
                <div className="w-8 sm:w-14 h-[2px] bg-white/25 relative overflow-hidden">
                  {idx === activeIndex && (
                    <div
                      key={activeIndex}
                      className="absolute inset-0 bg-[#c5a059] animate-progress-bar"
                    />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Prev / Next Slide Arrows */}
          <div className="flex items-center gap-2.5">
            <div className="font-display text-xs tracking-widest text-[#c5a059] pr-1.5">
              <span className="font-bold">0{activeIndex + 1}</span>
              <span className="text-white/40 mx-1">/</span>
              <span className="text-white/60">0{localSlides.length}</span>
            </div>

            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="w-8 h-8 sm:w-9 sm:h-9 border border-white/30 text-white/90 hover:text-[#c5a059] hover:border-[#c5a059] hover:bg-white/10 transition-all duration-200 flex items-center justify-center cursor-pointer touch-manipulation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="w-8 h-8 sm:w-9 sm:h-9 border border-white/30 text-white/90 hover:text-[#c5a059] hover:border-[#c5a059] hover:bg-white/10 transition-all duration-200 flex items-center justify-center cursor-pointer touch-manipulation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

        </div>
      </section>
    </>
  );
}

export default memo(Hero);
