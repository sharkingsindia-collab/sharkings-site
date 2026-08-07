import { useState, useEffect, useRef, memo } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import homeInteriorImg from '../../assets/home-interior.webp';

function AboutUs({ onNavigate }) {
  useScrollReveal();
  const sectionRef = useRef(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate relative scroll progress when section is in viewport
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const centerDistance = rect.top - (windowHeight / 2 - rect.height / 2);
        setParallaxOffset(centerDistance * 0.12);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-30 bg-[#fbf9f6] text-luxury-charcoal py-20 md:py-20 px-6 md:px-16 lg:px-24 border-t border-black/5 overflow-hidden"
    >
      {/* Parallax Background Watermark */}
      <div
        className="absolute font-display text-[16vw] text-[#710014]/[0.025] font-extralight select-none pointer-events-none z-0 left-0 top-1/4 whitespace-nowrap transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallaxOffset * 0.8}px)` }}
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
            className="lg:col-span-7 space-y-6 reveal-3d-popup delay-100 transition-transform duration-200 ease-out"
            style={{ transform: `translateY(${parallaxOffset * -0.15}px)` }}
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
                className="w-full sm:w-auto px-8 py-3.5 bg-[#710014] text-white text-xs font-sans font-extrabold tracking-widest uppercase hover:bg-[#580010] transition-all shadow-lg shadow-[#710014]/20 text-center cursor-pointer"
              >
                Visit Our Studios
              </a>

              <a
                href="#get-in-touch"
                className="w-full sm:w-auto px-8 py-3.5 bg-white border border-black/15 text-luxury-charcoal text-xs font-sans font-bold tracking-widest uppercase hover:border-[#710014] hover:text-[#710014] transition-all text-center cursor-pointer"
              >
                Contact Us
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Clean Parallax Showcase Image */}
          <div
            className="lg:col-span-5 relative reveal-3d-popup delay-200 transition-transform duration-200 ease-out"
            style={{ transform: `translateY(${parallaxOffset * 0.25}px)` }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.1)] border border-black/10 group">

              <img
                src={homeInteriorImg}
                alt="Sharkings Full Service Living Interior"
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                style={{ transform: `scale(1.08) translateY(${parallaxOffset * -0.12}px)` }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Floating Top Badge */}
              <div className="absolute top-5 left-5 z-10">
                <span className="bg-black/75 backdrop-blur-md text-[#c5a059] border border-[#c5a059]/30 px-3.5 py-1.5 rounded-lg text-[9px] font-sans font-bold tracking-[0.2em] uppercase shadow-lg">
                  ✦ SINCE 2010
                </span>
              </div>

              {/* Floating Bottom Info Box */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-black/10 text-luxury-charcoal shadow-xl space-y-0.5">
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
