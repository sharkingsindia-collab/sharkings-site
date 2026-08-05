
import slogo from '../../assets/slogo.webp';

const localSlides = [
  {
    image: '/images/slide-living.png',
    alt: 'Sharkings Interior luxury living room interior design studio',
    subtitle: 'LUXURY HOMES & RESIDENCES',
    title: 'Luxury Interior Design Studio',
    description: 'We design beautiful luxury homes and custom living spaces. From initial idea to final setup, Sharkings Interior creates modern, comfortable, and elegant home interiors.',
    accent: 'text-luxury-red',
    borderAccent: 'border-luxury-red',
    glowColor: 'rgba(113, 0, 20, 0.12)',
    accentHex: '#710014'
  },
  {
    image: '/images/slide-dining.png',
    alt: 'Modern luxury dining room interior design by Sharkings Interior',
    subtitle: 'DINING & LIVING ROOM DESIGN',
    title: 'Custom Dining Room Interior Design',
    description: 'Transform your dining room with custom furniture, warm lighting, and stylish decor. Built for family meals and welcoming your guests.',
    accent: 'text-luxury-sage',
    borderAccent: 'border-luxury-sage',
    glowColor: 'rgba(131, 143, 111, 0.12)',
    accentHex: '#838F6F'
  },
  {
    image: '/images/slide-bedroom.png',
    alt: 'Bespoke luxury bedroom interior design by Sharkings Interior',
    subtitle: 'BEDROOM & MASTER SUITE DESIGN',
    title: 'Bespoke Bedroom & Master Suite Design',
    description: 'Create your dream master bedroom with custom wall paneling, soft ambient lighting, and luxury seating designed for pure relaxation.',
    accent: 'text-luxury-red',
    borderAccent: 'border-luxury-red',
    glowColor: 'rgba(113, 0, 20, 0.12)',
    accentHex: '#710014'
  }
];

export default function Hero({
  onNavigate,
  loading,
  progress,
  activeIndex,
  prevActiveIndex,
  mousePos,
  handleMouseMove,
  handlePrev,
  handleNext,
  selectSlide,
  heroPadding,
  heroRadius,
  heroScale,
  heroBgY,
  heroTextY,
  heroOpacity
}) {
  const smoothScrollToTarget = (targetSelector) => {
    const elem = document.querySelector(targetSelector);
    if (!elem) return;
    const bodyTop = document.body.getBoundingClientRect().top;
    const elemTop = elem.getBoundingClientRect().top;
    const targetY = elemTop - bodyTop;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Cinematic Kinetic Split-Curtain Preloader */}
      <div className="fixed inset-0 z-[999] pointer-events-none overflow-hidden">
        
        {/* Top Motorized Shutter Door Panel (Luxury Charcoal Base) */}
        <div
          className={`absolute top-0 left-0 right-0 h-1/2 bg-luxury-charcoal border-b border-luxury-sage/30 shadow-2xl transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
            loading ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-red/15 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Bottom Motorized Shutter Door Panel (Luxury Charcoal Base) */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1/2 bg-luxury-charcoal border-t border-luxury-sage/30 shadow-2xl transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
            loading ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-sage/10 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Central Kinetic Assembly */}
        <div
          className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center transition-all duration-700 ease-out px-4 ${
            loading ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'
          }`}
        >
          {/* Ambient Lighting Halos (Brand Palette) */}
          <div className="absolute w-[360px] h-[360px] bg-luxury-red/15 rounded-full blur-[100px] pointer-events-none animate-pulse" />
          <div className="absolute w-[280px] h-[280px] bg-luxury-sage/15 rounded-full blur-[80px] pointer-events-none" />

          {/* Kinetic Double-Ring System */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
            
            {/* Outer Counter-Spinning Dashed Ring (Luxury Sage) */}
            <div className="absolute inset-0 rounded-full border border-dashed border-luxury-sage/40 animate-[spin_16s_linear_infinite]" />

            {/* Inner Counter-Spinning Dotted Ring (Luxury Red) */}
            <div className="absolute inset-3 rounded-full border-2 border-dotted border-luxury-red/50 animate-[spin_10s_linear_infinite_reverse]" />

            {/* Real-time SVG Circular Progress Arc (Luxury Sage) */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 200 200"
            >
              <circle
                cx="100"
                cy="100"
                r="96"
                className="stroke-luxury-sage fill-none transition-all duration-300 ease-out drop-shadow-[0_0_10px_rgba(131,143,111,0.5)]"
                strokeWidth="2.5"
                strokeDasharray={2 * Math.PI * 96}
                strokeDashoffset={(2 * Math.PI * 96) - (progress / 100) * (2 * Math.PI * 96)}
                strokeLinecap="round"
              />
            </svg>

            {/* Central Circular Medallion (Luxury Cream Base + slogo) */}
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-luxury-cream border-2 border-luxury-sage/60 shadow-[0_0_45px_rgba(0,0,0,0.8)] flex items-center justify-center p-5 z-10 transition-transform duration-500 hover:scale-105">
              <img
                src={slogo}
                alt="Sharkings Interior"
                className="h-18 sm:h-22 w-auto object-contain mix-blend-multiply"
              />
            </div>

          </div>

          {/* Dynamic Status Typography & High-Tech Counter */}
          <div className="flex flex-col items-center space-y-2 text-center pt-6">
            <span className="font-serif text-[20px] sm:text-xs tracking-[0.45em] text-luxury-sage ">
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
      <div
        className="relative w-full h-screen min-h-[640px] bg-luxury-charcoal z-10 overflow-hidden"
        onMouseMove={handleMouseMove}
        style={{
          padding: `${heroPadding}px`,
          willChange: 'padding'
        }}
      >
        <div
          className="relative w-full h-full overflow-hidden bg-luxury-charcoal shadow-2xl transition-all duration-100 ease-out"
          style={{
            borderRadius: `${heroRadius}px`,
            transform: `scale(${heroScale})`,
            willChange: 'transform, border-radius'
          }}
        >
          {/* Dynamic Background Glows */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none transition-all duration-1000 animate-ambient-glow"
            style={{
              backgroundColor: localSlides[activeIndex].glowColor,
              left: `calc(15% + ${mousePos.x}px)`,
              top: `calc(20% + ${mousePos.y}px)`,
              zIndex: 1
            }}
          />

          {/* Sliding Images */}
          <div className="absolute inset-0 w-full h-full z-0">
            {localSlides.map((slide, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div
                  key={idx}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-[1500ms] ease-in-out ${isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/80 via-transparent to-black/20 z-20 pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(22,22,22,0.4)_95%)] z-20 pointer-events-none" />

                  <div
                    className={`w-full h-full overflow-hidden ${(idx === activeIndex || idx === prevActiveIndex) ? 'animate-ken-burns' : ''
                      }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.alt || "Sharkings Interior - Bespoke Luxury Interior Design"}
                      decoding="async"
                      fetchpriority={idx === 0 ? "high" : "low"}
                      className="w-full h-full object-cover"
                      style={{
                        transform: `translate(${mousePos.x * -0.2}px, calc(${mousePos.y * -0.2}px + ${heroBgY}px))`,
                        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />
                  </div>

                  <div
                    className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-24 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 z-30 transition-all"
                    style={{
                      transform: `translateY(${heroTextY}px)`,
                      opacity: isActive ? heroOpacity : 0
                    }}
                  >
                    <div className="max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-6">

                      <div
                        className={`transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px]'
                          }`}
                        style={{ transitionDelay: '0ms' }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-[1px] bg-luxury-sage" />
                          <span className="font-sans text-[10px] sm:text-xs font-bold tracking-[0.25em] text-luxury-sage uppercase">
                            {slide.subtitle}
                          </span>
                        </div>
                      </div>

                      <h1
                        className={`font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight leading-[1.1] text-luxury-cream transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px]'
                          }`}
                        style={{ transitionDelay: '150ms' }}
                      >
                        {slide.title}
                      </h1>

                      <p
                        className={`font-sans text-xs sm:text-sm text-luxury-cream/80 max-w-xl leading-relaxed font-light tracking-wide transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px]'
                          }`}
                        style={{ transitionDelay: '300ms' }}
                      >
                        {slide.description}
                      </p>

                      <div
                        className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4 sm:pt-6 transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px]'
                          }`}
                        style={{ transitionDelay: '450ms' }}
                      >
                        <a
                          href="#/projects"
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate && onNavigate('projects');
                          }}
                          className="relative px-6 sm:px-8 py-3.5 bg-luxury-cream text-luxury-charcoal font-sans text-xs uppercase tracking-widest font-semibold overflow-hidden group transition-all duration-300 cursor-pointer text-center"
                          style={{
                            boxShadow: isActive ? `0 10px 30px -15px ${slide.accentHex}` : 'none'
                          }}
                        >
                          <span className="relative z-10 transition-colors duration-500 group-hover:text-luxury-cream">
                            View Our Projects
                          </span>
                          <span className="absolute inset-0 bg-luxury-red -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                        </a>

                        <a
                          href="#book-consultation"
                          onClick={(e) => {
                            e.preventDefault();
                            smoothScrollToTarget('#book-consultation');
                          }}
                          className="relative px-6 sm:px-8 py-3.5 text-luxury-cream border border-luxury-cream/20 hover:border-luxury-cream font-sans text-xs uppercase tracking-widest font-medium overflow-hidden group transition-all duration-300 cursor-pointer text-center"
                        >
                          <span className="relative z-10">
                            Book Free Consultation
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
            style={{ opacity: heroOpacity }}
          >
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="w-12 h-12 rounded-none border border-luxury-cream/10 flex items-center justify-center text-luxury-cream/70 hover:text-luxury-cream hover:border-luxury-cream hover:bg-luxury-cream/5 transition-all duration-300 group cursor-pointer"
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
              className="w-12 h-12 rounded-none border border-luxury-cream/10 flex items-center justify-center text-luxury-cream/70 hover:text-luxury-cream hover:border-luxury-cream hover:bg-luxury-cream/5 transition-all duration-300 group cursor-pointer"
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

          {/* Indicators */}
          <div
            className="hidden md:flex absolute bottom-8 sm:bottom-10 left-6 sm:left-12 lg:left-24 z-30 items-center gap-6 transition-opacity duration-300"
            style={{ opacity: heroOpacity }}
          >
            {localSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => selectSlide(idx)}
                className="group py-4 flex flex-col items-start focus:outline-none cursor-pointer"
              >
                <span className={`font-sans text-[9px] tracking-widest transition-all duration-300 ${idx === activeIndex ? 'text-luxury-cream font-bold opacity-100' : 'text-luxury-cream/40 opacity-70 group-hover:text-luxury-cream/80'
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
            style={{ opacity: heroOpacity }}
          >
            <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-luxury-cream/30">
              Scroll Down
            </span>
            <div className="w-5 h-8 border border-luxury-cream/20 rounded-full flex justify-center py-1">
              <div className="w-1.5 h-1.5 bg-luxury-sage rounded-full animate-scroll-bounce" />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
