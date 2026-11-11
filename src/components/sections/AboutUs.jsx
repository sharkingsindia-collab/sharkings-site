import { useCallback, memo } from 'react';
import ScrollReveal from '../ScrollReveal';
import aboutShowroomImg from '../../assets/about-showroom.webp';

function AboutUs() {
  // Native reflow-free smooth scroll
  const smoothScrollTo = useCallback((selector) => {
    const elem = document.querySelector(selector);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      id="about"
      className="relative z-30 bg-[#fbf9f6] text-luxury-charcoal py-16 sm:py-24 px-4 sm:px-8 md:px-16 lg:px-24 border-t border-black/5 overflow-hidden"
    >
      {/* Background Watermark */}
      <div
        className="absolute font-display text-[16vw] text-[#710014]/[0.025] font-normal select-none pointer-events-none z-0 left-0 top-1/4 whitespace-nowrap"
      >
        EST. 2010 • SHARKINGS
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-10 md:space-y-12">

        {/* Section Header */}
        <ScrollReveal variant="up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="flex items-center justify-center gap-3">
              <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#710014] uppercase">
                ABOUT US
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-[54px] font-medium text-[#1a1a1a] tracking-tight leading-tight">
              Full-Service Interior Design <br /><span className="italic font-medium text-[#710014]">Since 2010</span>
            </h2>
          </div>
        </ScrollReveal>

       
        {/* 2-Column Split Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* LEFT COLUMN: Authentic Content */}
          <ScrollReveal variant="left" className="lg:col-span-7 space-y-6">

            <div className="space-y-4">
              <span className="px-3.5 py-1.5 rounded-md bg-[#710014]/10 text-[#710014] text-xs font-sans font-bold tracking-[0.14em] uppercase border border-[#710014]/20 inline-block">
                MADURAI • RAMANATHAPURAM • SOUTH TAMIL NADU • SOUTH INDIA
              </span>

              <p className="font-sans text-sm md:text-base text-[#262626] leading-relaxed font-normal">
                Established in 2010, <strong className="font-semibold text-[#1a1a1a]">Sharkings Interiors &amp; Exteriors</strong> is a full-service architectural interior firm with flagship experience centres in Madurai and Ramanathapuram. Backed by dedicated in-house design and factory-grade execution teams, we craft turnkey residential villas, custom modular kitchens, and commercial spaces across South Tamil Nadu and South India.
              </p>

              <div className="p-5 sm:p-6 rounded-xl bg-white border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#710014]" />
                  <span className="text-xs font-sans font-bold tracking-[0.14em] text-[#710014] uppercase">
                    OUR DESIGNERS PARTICIPATE IN
                  </span>
                </div>
                <p className="font-sans text-sm md:text-base text-[#333333] leading-relaxed font-normal">
                  Our designers successfully oversee projects from initial spatial concepts, furniture and decor curation, and construction documentation to budgeting, site coordination, and final handover with architectural precision.
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
                className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-[#710014] text-white text-xs font-sans font-bold tracking-[0.14em] uppercase hover:bg-[#580010] transition-all shadow-md text-center cursor-pointer touch-manipulation"
              >
                Visit Our Studios
              </a>

              <a
                href="#get-in-touch"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo('#get-in-touch');
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-white border border-black/20 text-[#1a1a1a] text-xs font-sans font-bold tracking-[0.14em] uppercase hover:border-[#710014] hover:text-[#710014] transition-all text-center cursor-pointer touch-manipulation"
              >
                Contact Us
              </a>
            </div>

          </ScrollReveal>

          {/* RIGHT COLUMN: Showcase Image */}
          <ScrollReveal variant="right" delay={100} className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.1)] border border-black/10 group">

              <img
                src={aboutShowroomImg}
                alt="Sharkings Interiors & Exteriors Experience Centre Showroom"
                width="576"
                height="1024"
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/5] object-cover object-[center_42%] group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

              {/* Floating Top Badge */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="bg-black/80 backdrop-blur-md text-[#e0be7a] border border-[#c5a059]/35 px-3.5 py-1.5 rounded-md text-xs font-sans font-bold tracking-[0.14em] uppercase shadow-lg">
                  ✦ SINCE 2010
                </span>
              </div>

              {/* Floating Bottom Info Box */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-white/95 backdrop-blur-md border border-black/10 text-luxury-charcoal shadow-xl space-y-0.5 pointer-events-none">
                <span className="text-xs font-sans font-bold tracking-[0.14em] text-[#710014] uppercase block">
                  RESIDENTIAL &amp; COMMERCIAL DESIGN
                </span>
                <h3 className="font-display text-lg sm:text-xl font-medium text-[#1a1a1a]">
                  Madurai &amp; Ramanathapuram
                </h3>
              </div>

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}

export default memo(AboutUs);

