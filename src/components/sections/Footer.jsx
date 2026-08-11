import { useState, useCallback, memo } from 'react';
import slogo from '../../assets/slogo.webp';

function Footer({ onNavigate }) {
  const [seoOpen, setSeoOpen] = useState(false);

  const smoothScrollToTarget = useCallback((targetSelector) => {
    const elem = document.querySelector(targetSelector);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const toggleSeoDirectory = useCallback(() => {
    setSeoOpen((prev) => !prev);
  }, []);

  return (
    <footer className="relative w-full bg-[#38000a] text-[#f2f1ed] border-t border-[#c5a059]/30 z-30 pt-8 sm:pt-12 pb-6 sm:pb-8">
      {/* Subtle Top Gold Glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent" />

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
                <h4 className="font-display text-sm sm:text-lg font-bold text-white tracking-wider uppercase leading-none">
                  SHARKINGS INTERIORS & EXTERIORS
                </h4>
                {/* <span className="text-[8px] sm:text-[9px] font-sans font-bold tracking-[0.25em] text-[#c5a059] uppercase block mt-1">
                  FULL-SERVICE INTERIOR DESIGN FIRM
                </span> */}
              </div>
            </div>

            {/* Description - hidden on small mobile for compactness */}
            <p className="hidden sm:block font-sans text-xs text-white/70 font-light leading-relaxed max-w-sm">
              Since 2010, Sharkings Interiors & Exteriors is a full-service interior design firm in Madurai & Ramanathapuram, specializing in both residential and commercial design.
            </p>

            {/* Contact Details */}
            <div className="space-y-1.5 sm:space-y-2 font-sans text-xs pt-1">
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-[#c5a059] font-bold">Phone:</span>
                <a href="tel:+918098090204" className="text-[#c5a059] hover:text-white font-bold transition-colors touch-manipulation">
                  +91 80980 90204
                </a>
              </div>

              <div className="flex items-center gap-2 text-white/80">
                <span className="text-[#c5a059] font-bold">Email:</span>
                <a href="mailto:sharkingsindia@gmail.com" className="text-white/80 hover:text-[#c5a059] transition-colors touch-manipulation">
                  sharkingsindia@gmail.com
                </a>
              </div>
            </div>

          </div>

          {/* COLUMN 2: QUICK NAVIGATION (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display text-xs font-bold text-[#c5a059] tracking-[0.2em] uppercase border-b border-[#c5a059]/20 pb-2">
              NAVIGATION
            </h4>

            <ul className="space-y-2.5 font-sans text-xs font-light text-white/80">
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToTarget('#about');
                  }}
                  className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5 touch-manipulation"
                >
                  <span className="text-[#c5a059]">›</span> About Us
                </a>
              </li>
              <li>
                <a
                  href="#why-us"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToTarget('#why-us');
                  }}
                  className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5 touch-manipulation"
                >
                  <span className="text-[#c5a059]">›</span> Why Us
                </a>
              </li>
              <li>
                <a
                  href="#/services"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('services');
                    else window.location.hash = '#/services';
                  }}
                  className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5 touch-manipulation"
                >
                  <span className="text-[#c5a059]">›</span> Our Services
                </a>
              </li>
              <li>
                <a
                  href="#interactive-studio"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToTarget('#interactive-studio');
                  }}
                  className="hover:text-[#c5a059] transition-colors hidden md:flex items-center gap-1.5 touch-manipulation"
                >
                  <span className="text-[#c5a059]">›</span> 3D Studio
                </a>
              </li>
              <li>
                <a
                  href="#/projects"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('projects');
                    else window.location.hash = '#/projects';
                  }}
                  className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5 touch-manipulation"
                >
                  <span className="text-[#c5a059]">›</span> Our Projects
                </a>
              </li>
              <li>
                <a
                  href="#showrooms"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToTarget('#showrooms');
                  }}
                  className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5 touch-manipulation"
                >
                  <span className="text-[#c5a059]">›</span> Design Studios
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToTarget('#testimonials');
                  }}
                  className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5 touch-manipulation"
                >
                  <span className="text-[#c5a059]">›</span> Client Reviews
                </a>
              </li>
              <li>
                <a
                  href="#get-in-touch"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToTarget('#get-in-touch');
                  }}
                  className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5 touch-manipulation"
                >
                  <span className="text-[#c5a059]">›</span> Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: STUDIO LOCATIONS (4 Cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-display text-xs font-bold text-[#c5a059] tracking-[0.2em] uppercase border-b border-[#c5a059]/20 pb-2">
              OUR DESIGN STUDIOS
            </h4>

            <div className="space-y-5 font-sans">
              {/* Madurai */}
              <div className="space-y-1.5">
                <h5 className="font-display text-sm md:text-base font-semibold tracking-wide text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c5a059]" /> Madurai Studio
                </h5>
                <p className="text-xs sm:text-sm text-white/85 font-light leading-relaxed pl-4">
                  Plot no. 3552, TNHB Colony, Madurai, Tamil Nadu 625001.
                </p>
              </div>

              {/* Ramanathapuram */}
              <div className="space-y-1.5 pt-3.5 border-t border-white/10">
                <h5 className="font-display text-sm md:text-base font-semibold tracking-wide text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c5a059]" /> Ramanathapuram Studio
                </h5>
                <p className="text-xs sm:text-sm text-white/85 font-light leading-relaxed pl-4">
                  Bus Stop, 13/2993/26, Madurai - Rameswaram Hwy, Subbaiah Nagar, Ram Nagar,
                  Ramanathapuram, Tamil Nadu 623501.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* SEO POPULAR SEARCH DIRECTORY */}
        {/* <div className="border-t border-[#c5a059]/20 pt-6 space-y-3 font-sans text-[11px] text-white/60">
          <div className="flex items-center justify-between cursor-pointer group touch-manipulation" onClick={toggleSeoDirectory}>
            <h5 className="font-display text-[11px] font-bold text-[#c5a059] tracking-[0.2em] uppercase flex items-center gap-2">
              <span>Popular Interior Searches — Madurai & Ramanathapuram (Ramnad)</span>
            </h5>
            <span className="text-[10px] text-[#c5a059] group-hover:underline">
              {seoOpen ? 'Hide Keyword Directory ▲' : 'Toggle Keyword Directory ▾'}
            </span>
          </div>

          {seoOpen && (
            <div className="space-y-3 pt-2 text-white/50 text-[10px] leading-relaxed">
              <div>
                <strong className="text-[#c5a059] block mb-1">MADURAI & TAMIL NADU INTERIOR SERVICES & LOCALITIES:</strong>
                Home Interior Designer in Madurai • Modular Kitchen Interior Designer • Professional Interior Designers • Best Interior Designer • Best Interior Designer in Villapuram Madurai • Best Interior Decorators in Villapuram • Madurai Interior Designer • Interior Designer in Salem • Interior Designer Works • Interior and Exterior Works in Madurai • Kitchen Interior Designer • Modular Kitchen Interior • Interior Designer in Sivagangai • Interior Designer in Dindigul • Interior Designer in Virudhunagar • Interior Designer in Theni • Interior Designer Cost in Madurai • Interior Designer Price in Madurai • Interior Designer Near Me Madurai • Top 10 Interior Designers in Madurai • Modular Kitchen Designers in Madurai • Living Room Interior Design Madurai • Bedroom Interior Design Madurai • False Ceiling Contractors Madurai • Wardrobe Design Madurai • ACP Elevation Madurai • Container Homes Madurai • Salon Interior Design Madurai • Office Interior Design Madurai • Turnkey Interior Designers Madurai • Villapuram Interior Designer • Anna Nagar Madurai Interior Designer • KK Nagar Madurai Interior Designer • SS Colony Interior Designer • Bypass Road Madurai • Kalavasal • Tallakulam • Pudur • Melur • Tirumangalam • Usilampatti.
              </div>

              <div>
                <strong className="text-[#c5a059] block mb-1">RAMANATHAPURAM (RAMNAD) INTERIOR SERVICES & LOCALITIES:</strong>
                Best Interior Designers in Ramanathapuram • Top Interior Designers in Ramnad • Modular Kitchen Ramanathapuram • Coastal Wardrobe Design Ramnad • Moisture Resistant Furniture Ramnad • False Ceiling Ramanathapuram • Subbaiah Nagar Ramnad • Ram Nagar Ramanathapuram • Kenikarai Ramnad • Rameswaram Interior Designer • Paramakudi Interior Designer • Kilakarai Interior Designer • Devipattinam • Mudukulathur • Kamuthi • Thiruvadanai • Sayalgudi • Mandapam • Erwadi • Rameswaram Road Ramnad.
              </div>

              <div>
                <strong className="text-[#c5a059] block mb-1">INTERIOR & EXTERIOR SPECIALIZATIONS:</strong>
                Acrylic Modular Kitchen • Marine Plywood Cabinets • Hettich & Blum Fitting • Sliding Wardrobe • Lacquered Glass Wardrobe • Gypsum False Ceiling • Profile Light Ceiling • Container Cafe Design • Commercial Office Partition • Aluminium & Glass Partition • ACP Sheet Cladding • Front Elevation Design • 3D Interior Spatial Walkthrough • Full House Renovation • 2BHK / 3BHK Interior Cost Estimate.
              </div>
            </div>
          )}
        </div> */}

        {/* MINIMAL FOOTER SUB-BAR */}
        <div className="border-t border-[#c5a059]/20 pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 font-sans text-[10px] sm:text-[11px] text-white/50 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Sharkings Interiors & Exteriors. All Rights Reserved.
          </div>

          <div>
            Madurai & Ramanathapuram • Full-Service Interior Firm
          </div>
        </div>

      </div>
    </footer>
  );
}

export default memo(Footer);

