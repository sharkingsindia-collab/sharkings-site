import { useEffect, useRef, useCallback, memo } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import homeInteriorImg from '../../assets/home-interior.webp';

function AboutUs({ onNavigate }) {
  useScrollReveal();
  const sectionRef = useRef(null);
  const watermarkRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const imgRef = useRef(null);
  const rafRef = useRef(null);
  const lastOffsetRef = useRef(0);
  const sectionOffsetRef = useRef(0);

  // Cache element offset on mount & resize — 0 DOM property reads inside scroll loop
  const updateDimensions = useCallback(() => {
    if (sectionRef.current) {
      sectionOffsetRef.current = sectionRef.current.offsetTop;
    }
  }, []);

  const updateParallax = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const sectionTop = sectionOffsetRef.current;
    const scrolled = scrollY - sectionTop;

    if (scrolled >= -windowHeight && scrolled <= windowHeight) {
      const offset = scrolled * 0.08;

      if (Math.abs(offset - lastOffsetRef.current) < 0.2) return;
      lastOffsetRef.current = offset;

      if (watermarkRef.current) watermarkRef.current.style.transform = `translate3d(0, ${offset * 0.6}px, 0)`;
      if (leftColRef.current) leftColRef.current.style.transform = `translate3d(0, ${offset * -0.1}px, 0)`;
      if (rightColRef.current) rightColRef.current.style.transform = `translate3d(0, ${offset * 0.15}px, 0)`;
      if (imgRef.current) imgRef.current.style.transform = `scale(1.08) translate3d(0, ${offset * -0.08}px, 0)`;
    }
  }, []);

  useEffect(() => {
    updateDimensions();

    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        updateParallax();
      });
    };

    const handleResize = () => {
      updateDimensions();
      updateParallax();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    updateParallax();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateDimensions, updateParallax]);

  // Native reflow-free smooth scroll
  const smoothScrollTo = useCallback((selector) => {
    const elem = document.querySelector(selector);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-30 bg-[#fbf9f6] text-luxury-charcoal py-20 md:py-20 px-6 md:px-16 lg:px-24 border-t border-black/5 overflow-hidden"
    >
      {/* Parallax Background Watermark */}
      <div
        ref={watermarkRef}
        className="absolute font-display text-[16vw] text-[#710014]/[0.025] font-extralight select-none pointer-events-none z-0 left-0 top-1/4 whitespace-nowrap will-change-transform"
      >
        EST. 2010 • SHARKINGS
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12 md:space-y-5">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 reveal-3d-popup">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#710014]/30" />
            <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.35em] text-[#710014] uppercase">
              ABOUT US
            </span>
            <span className="w-8 h-[1px] bg-[#710014]/30" />
          </div>

          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a] tracking-tight">
            Full-Service Interior Design <br /><span className="italic font-normal text-[#710014]">Since 2010</span>
          </h2>
        </div>

        {/* 2-Column Split Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* LEFT COLUMN: Authentic Content */}
          <div
            ref={leftColRef}
            className="lg:col-span-7 space-y-6 reveal-3d-popup delay-100 will-change-transform"
          >

            <div className="space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-[#710014]/10 text-[#710014] text-[10px] font-sans font-bold tracking-widest uppercase border border-[#710014]/20 inline-block">
                MADURAI & RAMANATHAPURAM
              </span>

              <p className="font-sans text-xs md:text-sm lg:text-base text-luxury-charcoal/85 leading-relaxed font-light">
                Since 2010, <strong className="font-semibold text-luxury-charcoal">Sharkings Interiors & Exteriors</strong> is a full-service interior design firm in Madurai & Ramanathapuram, specializing in both residential and commercial design. We will have the experience to ensure that the project runs smoothly and gives you the best possible results, whether you need a simple refresh of furniture and paint colors, or a comprehensive whole-house renovation.
              </p>

              <div className="p-5 rounded-2xl bg-white border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#710014]" />
                  <span className="text-[10px] font-sans font-bold tracking-widest text-[#710014] uppercase">
                    OUR DESIGNERS PARTICIPATE IN
                  </span>
                </div>
                <p className="font-sans text-xs md:text-sm text-luxury-charcoal/80 leading-relaxed font-light">
                  Our designers successfully participate in projects from initial concepts, furniture and decorative item selections, decorative material selections, construction document production, budgeting, city submittals, and project coordination – always with precision, professionalism, attention to detail, exceptional customer service, and expert project management skills.
                </p>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="#showrooms"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo('#showrooms');
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#710014] text-white text-xs font-sans font-extrabold tracking-widest uppercase hover:bg-[#580010] transition-all shadow-lg shadow-[#710014]/20 text-center cursor-pointer touch-manipulation"
              >
                Visit Our Studios
              </a>

              <a
                href="#get-in-touch"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo('#get-in-touch');
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-white border border-black/15 text-luxury-charcoal text-xs font-sans font-bold tracking-widest uppercase hover:border-[#710014] hover:text-[#710014] transition-all text-center cursor-pointer touch-manipulation"
              >
                Contact Us
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Clean Parallax Showcase Image */}
          <div
            ref={rightColRef}
            className="lg:col-span-5 relative reveal-3d-popup delay-200 will-change-transform"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.1)] border border-black/10 group">

              <img
                src="/showrrom.png"
                alt="Sharkings Full Service Living Interior"
                width="600"
                height="750"
                loading="lazy"
                decoding="async"
                ref={imgRef}
                className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700 will-change-transform"
                style={{ transform: 'scale(1.08)' }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              {/* Floating Top Badge */}
              <div className="absolute top-5 left-5 z-10 pointer-events-none">
                <span className="bg-black/75 backdrop-blur-md text-[#c5a059] border border-[#c5a059]/30 px-3.5 py-1.5 rounded-lg text-[9px] font-sans font-bold tracking-[0.2em] uppercase shadow-lg">
                  ✦ SINCE 2010
                </span>
              </div>

              {/* Floating Bottom Info Box */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-black/10 text-luxury-charcoal shadow-xl space-y-0.5 pointer-events-none">
                <span className="text-[9px] font-sans font-bold tracking-widest text-[#710014] uppercase block">
                  RESIDENTIAL & COMMERCIAL DESIGN
                </span>
                <h4 className="font-display text-base font-light text-[#1a1a1a]">
                  Madurai & Ramanathapuram
                </h4>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default memo(AboutUs);

