import { useCallback, memo } from 'react';
import ScrollReveal from '../ScrollReveal';
import slogo from '../../assets/slogo.webp';

function Footer({ onNavigate }) {

  const smoothScrollToTarget = useCallback((targetSelector) => {
    const elem = document.querySelector(targetSelector);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);



  return (
    <footer className="relative w-full bg-[#38000a] text-[#f2f1ed] border-t border-[#c5a059]/30 z-30 pt-8 sm:pt-12 pb-6 sm:pb-8 overflow-x-clip">
      {/* Subtle Top Gold Glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent" />

      <ScrollReveal variant="up">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-16 lg:px-24 space-y-6 sm:space-y-10">

        {/* MAIN 3-COLUMN EDITORIAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* COLUMN 1: BRAND LOGO & CONTACT INFO (5 Cols) */}
          <div className="md:col-span-5 space-y-3 sm:space-y-5">

            {/* Minimal Brand Title */}
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) {
                    onNavigate('landing');
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#faf9f6] px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-[#c5a059]/40 shadow-sm flex items-center justify-center group hover:scale-[1.02] transition-transform touch-manipulation"
              >
                <img
                  src={slogo}
                  alt="Sharkings Interior Design"
                  width="80"
                  height="40"
                  loading="lazy"
                  decoding="async"
                  className="h-7 sm:h-10 w-auto object-contain mix-blend-multiply"
                />
              </a>
              <div>
                <h4 className="font-sans text-sm sm:text-base font-bold text-white tracking-wider uppercase leading-snug">
                  SHARKINGS INTERIORS &amp; EXTERIORS
                </h4>
              </div>
            </div>

            {/* Description - hidden on small mobile for compactness */}
            <p className="hidden sm:block font-sans text-xs sm:text-sm text-white/85 font-normal leading-relaxed max-w-sm">
              Since 2010, Sharkings Interiors &amp; Exteriors is a premier interior design firm with flagship branches in Madurai &amp; Ramanathapuram, executing turnkey residential and commercial projects across South Tamil Nadu and South India.
            </p>

            {/* Contact Details */}
            <div className="space-y-1.5 sm:space-y-2 font-sans text-xs sm:text-sm pt-1">
              <div className="flex items-center gap-2 text-white/90">
                <span className="text-[#e0be7a] font-semibold">Phone:</span>
                <a href="tel:+918098090204" className="text-[#e0be7a] hover:text-white font-bold transition-colors touch-manipulation">
                  +91 80980 90204
                </a>
              </div>

              <div className="flex items-center gap-2 text-white/90">
                <span className="text-[#e0be7a] font-semibold">Email:</span>
                <a href="mailto:sharkingsindia@gmail.com" className="text-white/90 hover:text-[#e0be7a] transition-colors touch-manipulation">
                  sharkingsindia@gmail.com
                </a>
              </div>
            </div>

          </div>

          {/* COLUMN 2: QUICK NAVIGATION (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-sans text-xs font-bold text-[#e0be7a] tracking-[0.2em] uppercase border-b border-[#c5a059]/25 pb-2">
              NAVIGATION
            </h4>

            <ul className="space-y-2.5 font-sans text-xs sm:text-sm font-normal text-white/90">
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToTarget('#about');
                  }}
                  className="hover:text-[#e0be7a] transition-colors flex items-center gap-1.5 touch-manipulation"
                >
                  <span className="text-[#e0be7a]">›</span> About Us
                </a>
              </li>
              <li>
                <a
                  href="#why-us"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToTarget('#why-us');
                  }}
                  className="hover:text-[#e0be7a] transition-colors flex items-center gap-1.5 touch-manipulation"
                >
                  <span className="text-[#e0be7a]">›</span> Why Us
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('services');
                    else window.history.pushState({ page: 'services' }, '', '/services');
                  }}
                  className="hover:text-[#e0be7a] transition-colors flex items-center gap-1.5 touch-manipulation"
                >
                  <span className="text-[#e0be7a]">›</span> Our Services
                </a>
              </li>
              <li>
                <a
                  href="#interactive-studio"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToTarget('#interactive-studio');
                  }}
                  className="hover:text-[#e0be7a] transition-colors hidden lg:flex items-center gap-1.5 touch-manipulation"
                >
                  <span className="text-[#e0be7a]">›</span> 3D Planner
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('projects');
                    else window.history.pushState({ page: 'projects' }, '', '/projects');
                  }}
                  className="hover:text-[#e0be7a] transition-colors flex items-center gap-1.5 touch-manipulation"
                >
                  <span className="text-[#e0be7a]">›</span> Our Projects
                </a>
              </li>
              <li>
                <a
                  href="#showrooms"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToTarget('#showrooms');
                  }}
                  className="hover:text-[#e0be7a] transition-colors flex items-center gap-1.5 touch-manipulation"
                >
                  <span className="text-[#e0be7a]">›</span> Branches
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToTarget('#testimonials');
                  }}
                  className="hover:text-[#e0be7a] transition-colors flex items-center gap-1.5 touch-manipulation"
                >
                  <span className="text-[#e0be7a]">›</span> Client Reviews
                </a>
              </li>
              <li>
                <a
                  href="#get-in-touch"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToTarget('#get-in-touch');
                  }}
                  className="hover:text-[#e0be7a] transition-colors flex items-center gap-1.5 touch-manipulation"
                >
                  <span className="text-[#e0be7a]">›</span> Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: BRANCH LOCATIONS (4 Cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-sans text-xs font-bold text-[#e0be7a] tracking-[0.2em] uppercase border-b border-[#c5a059]/25 pb-2">
              OUR BRANCHES
            </h4>

            <div className="space-y-5 font-sans">
              {/* Madurai */}
              <div className="space-y-1.5">
                <h5 className="font-sans text-sm md:text-base font-semibold tracking-wide text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#e0be7a]" /> Madurai Office
                </h5>
                <p className="text-xs sm:text-sm text-white/90 font-normal leading-relaxed pl-4">
                  Plot no. 3552, TNHB Colony, Villapuram, Madurai, Tamil Nadu 625001.
                </p>
              </div>

              {/* Ramanathapuram */}
              <div className="space-y-1.5 pt-3.5 border-t border-white/15">
                <h5 className="font-sans text-sm md:text-base font-semibold tracking-wide text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#e0be7a]" /> Ramanathapuram Showroom
                </h5>
                <p className="text-xs sm:text-sm text-white/90 font-normal leading-relaxed pl-4">
                  Bus Stop, 13/2993/26, Madurai - Rameswaram Hwy, Subbaiah Nagar, Ram Nagar,
                  Ramanathapuram, Tamil Nadu 623501.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* MINIMAL FOOTER SUB-BAR */}
        <div className="border-t border-[#c5a059]/25 pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 font-sans text-xs text-white/80 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Sharkings Interiors &amp; Exteriors. All Rights Reserved.
          </div>

          <div>
            Madurai &amp; Ramanathapuram • South Tamil Nadu • Tamil Nadu • South India
          </div>
        </div>

        </div>
      </ScrollReveal>
    </footer>
  );
}

export default memo(Footer);

