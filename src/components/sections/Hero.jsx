import { memo, useCallback, useRef } from 'react';

const localSlides = [
  {
    image: '/images/slide-living.webp',
    alt: 'Luxury living room interior design by Sharkings Interiors in Madurai and Ramanathapuram',
    subtitle: 'MADURAI • RAMANATHAPURAM • TAMIL NADU',
    title: 'Bespoke Residential & Commercial Interiors',
    description:
      'Full-service interior architecture, factory-finished modular kitchens, and turnkey execution from our flagship Madurai and Ramanathapuram studios across South India.',
    badge: '01 / LIVING SPACES',
    imageSide: 'right'
  },
  {
    image: '/images/slide-dining.webp',
    alt: 'Modern luxury dining room and modular interior design by Sharkings Interiors',
    subtitle: 'DINING & MODULAR LIVING SUITES',
    title: 'Custom Dining & Modular Living Spaces',
    description:
      'Transform dining halls with handcrafted furniture, warm architectural lighting, and bespoke finishes engineered for effortless everyday living.',
    badge: '02 / DINING SUITES',
    imageSide: 'left'
  },
  {
    image: '/images/slide-bedroom.webp',
    alt: 'Bespoke luxury master bedroom interior design by Sharkings Interiors',
    subtitle: 'BEDROOM & MASTER SUITE DESIGN',
    title: 'Bespoke Bedroom & Wardrobe Suites',
    description:
      'Tailored master suites combining acoustic wall paneling, integrated profile LED lighting, and precision-built sliding and walk-in wardrobes.',
    badge: '03 / MASTER BEDROOMS',
    imageSide: 'right'
  }
];

function Hero({
  onNavigate,
  activeIndex,
  handlePrev,
  handleNext,
  selectSlide,
  onPauseChange
}) {
  const touchStartXRef = useRef(null);

  const smoothScrollToTarget = useCallback((targetSelector) => {
    const elem = document.querySelector(targetSelector);
    if (!elem) return;
    elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleTouchStart = useCallback(
    (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartXRef.current = e.touches[0].clientX;
        if (onPauseChange) onPauseChange(true);
      }
    },
    [onPauseChange]
  );

  const handleTouchEnd = useCallback(
    (e) => {
      const startX = touchStartXRef.current;
      touchStartXRef.current = null;
      if (onPauseChange) onPauseChange(false);
      if (startX === null || !e.changedTouches || e.changedTouches.length === 0) return;
      const deltaX = startX - e.changedTouches[0].clientX;
      if (deltaX > 45 && handleNext) {
        handleNext();
      } else if (deltaX < -45 && handlePrev) {
        handlePrev();
      }
    },
    [handleNext, handlePrev, onPauseChange]
  );

  const currentSlide = localSlides[activeIndex] || localSlides[0];
  const isCurrentImageLeft = currentSlide.imageSide === 'left';

  return (
    <section
      id="hero"
      onMouseEnter={() => onPauseChange && onPauseChange(true)}
      onMouseLeave={() => onPauseChange && onPauseChange(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-[100dvh] lg:h-[100dvh] lg:min-h-[580px] text-[#fbf9f6] z-10 overflow-x-clip flex flex-col justify-between pt-24 sm:pt-26 lg:pt-24 pb-4 sm:pb-5"
    >
      {/* Full-Screen Atmospheric Room Backdrop */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {localSlides.map((slide, idx) => {
          const isBackdropActive = idx === activeIndex;
          return (
            <div
              key={slide.badge}
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

        {/* Directional Scrim: keeps text side deeply legible regardless of imageSide */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isCurrentImageLeft
              ? 'bg-gradient-to-l from-black/85 via-black/55 to-black/30'
              : 'bg-gradient-to-r from-black/85 via-black/55 to-black/30'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.10),transparent_70%)]" />
      </div>

      {/* Main Content Area */}
      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-12 lg:px-16 z-10 flex-1 flex items-center py-4 lg:py-0">
        <div className="w-full relative">
          {localSlides.map((slide, idx) => {
            const isActive = idx === activeIndex;
            const isImageOnLeft = slide.imageSide === 'left';

            return (
              <div
                key={slide.badge}
                aria-hidden={!isActive}
                className={`transition-all duration-500 ease-out ${
                  isActive
                    ? 'opacity-100 pointer-events-auto relative z-10 scale-100'
                    : 'opacity-0 pointer-events-none absolute inset-0 z-0 scale-[0.98]'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center w-full">
                  {/* TEXT COLUMN */}
                  <div
                    className={`space-y-4 sm:space-y-5 lg:col-span-5 transition-all duration-500 delay-100 ${
                      isImageOnLeft ? 'lg:order-2 lg:pl-2' : 'lg:order-1 lg:pr-2'
                    } ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-sans text-xs font-bold tracking-[0.18em] text-[#d6b36c] uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                        {slide.subtitle}
                      </span>
                    </div>

                    {idx === 0 ? (
                      <h1 className="font-display text-3xl sm:text-4xl lg:text-[44px] xl:text-[52px] font-medium text-white tracking-tight leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)]">
                        {slide.title}
                      </h1>
                    ) : (
                      <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] xl:text-[52px] font-medium text-white tracking-tight leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)]">
                        {slide.title}
                      </h2>
                    )}

                    <p className="font-sans text-sm sm:text-base text-white/90 max-w-lg leading-relaxed font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                      {slide.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <a
                        href="/projects"
                        onClick={(e) => {
                          e.preventDefault();
                          if (onNavigate) onNavigate('projects');
                        }}
                        className="px-6 sm:px-7 py-3 rounded-md bg-[#c5a059] text-[#141210] font-sans text-xs uppercase tracking-[0.14em] font-bold shadow-lg hover:bg-white hover:text-[#710014] transition-all duration-200 cursor-pointer text-center touch-manipulation"
                      >
                        View Our Projects
                      </a>

                      <a
                        href="#get-in-touch"
                        onClick={(e) => {
                          e.preventDefault();
                          smoothScrollToTarget('#get-in-touch');
                        }}
                        className="px-6 sm:px-7 py-3 rounded-md text-white border border-white/50 hover:border-[#c5a059] hover:text-[#c5a059] bg-black/25 font-sans text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-200 cursor-pointer text-center touch-manipulation backdrop-blur-xs"
                      >
                        Contact Us
                      </a>
                    </div>
                  </div>

                  {/* ARCHITECTURAL ARCH IMAGE SHOWCASE */}
                  <div
                    className={`lg:col-span-7 flex justify-center transition-all duration-500 delay-150 ${
                      isImageOnLeft ? 'lg:order-1' : 'lg:order-2'
                    } ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  >
                    <div className="relative w-full max-w-[520px] sm:max-w-[580px] lg:max-w-[620px] group">
                      {/* Soft Halo Backlight */}
                      <div className="absolute inset-0 bg-[#c5a059]/25 rounded-t-[240px] sm:rounded-t-[300px] lg:rounded-t-[340px] blur-2xl transform scale-105 pointer-events-none -z-10" />

                      {/* Arch Window Portal */}
                      <div className="relative w-full h-[270px] sm:h-[350px] md:h-[390px] lg:h-[400px] xl:h-[460px] rounded-t-[220px] sm:rounded-t-[280px] lg:rounded-t-[320px] rounded-b-xl overflow-hidden border-2 border-[#c5a059]/70 shadow-[0_25px_60px_rgba(0,0,0,0.65)] bg-[#1e1a17]">
                        <img
                          src={slide.image}
                          alt={slide.alt}
                          width="1920"
                          height="1080"
                          loading={idx === 0 ? 'eager' : 'lazy'}
                          decoding="async"
                          fetchPriority={idx === 0 ? 'high' : 'low'}
                          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

                        <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                          <span className="px-3 py-1.5 rounded-md bg-[#141210]/95 backdrop-blur-md border border-[#c5a059]/50 text-[#d6b36c] font-sans text-xs font-bold tracking-[0.14em] uppercase shadow-xl">
                            {slide.badge}
                          </span>
                          <span className="px-3 py-1.5 rounded-md bg-black/75 backdrop-blur-sm text-white font-sans text-[11px] font-semibold tracking-wider uppercase">
                            Madurai &amp; Ramnad
                          </span>
                        </div>
                      </div>

                      <div className="hidden sm:block absolute -top-3 -left-3 w-14 h-14 border-l-2 border-t-2 border-[#c5a059]/70 rounded-tl-3xl pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM SLIDE CONTROLS */}
      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-12 lg:px-16 z-20 pt-4 border-t border-white/20 flex items-center justify-between">
        {/* Slide Indicators */}
        <div className="flex items-center gap-4 sm:gap-6">
          {localSlides.map((slide, idx) => (
            <button
              key={slide.badge}
              type="button"
              onClick={() => selectSlide(idx)}
              aria-label={`View slide 0${idx + 1}`}
              className="group py-1.5 flex items-center gap-2 focus:outline-none cursor-pointer touch-manipulation"
            >
              <span
                className={`font-sans text-xs font-bold tracking-wider transition-colors duration-200 ${
                  idx === activeIndex ? 'text-[#d6b36c]' : 'text-white/75 group-hover:text-white'
                }`}
              >
                0{idx + 1}
              </span>
              <div className="w-8 sm:w-14 h-[2px] bg-white/30 relative overflow-hidden rounded-full">
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

        {/* Prev / Next Arrows */}
        <div className="flex items-center gap-2.5">
          <div className="font-sans text-xs tracking-wider text-[#d6b36c] pr-1.5">
            <span className="font-bold">0{activeIndex + 1}</span>
            <span className="text-white/60 mx-1">/</span>
            <span className="text-white/80">0{localSlides.length}</span>
          </div>

          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="w-9 h-9 rounded-md border border-white/35 text-white hover:text-[#141210] hover:border-[#c5a059] hover:bg-[#c5a059] transition-all duration-200 flex items-center justify-center cursor-pointer touch-manipulation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Slide"
            className="w-9 h-9 rounded-md border border-white/35 text-white hover:text-[#141210] hover:border-[#c5a059] hover:bg-[#c5a059] transition-all duration-200 flex items-center justify-center cursor-pointer touch-manipulation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
