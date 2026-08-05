import React, { useState, useEffect } from 'react';
import slogo from '../assets/slogo.webp';

export default function Navbar({ onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger smooth entrance animation on landing page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const sections = [
        { id: 'hero', selector: 'header, section:first-of-type' },
        { id: 'about', selector: '#about' },
        { id: 'why-us', selector: '#why-us' },
        { id: 'services', selector: '#services' },
        { id: 'interactive-studio', selector: '#interactive-studio' },
        { id: 'projects', selector: '#projects' },
        { id: 'testimonials', selector: '#testimonials' },
        { id: 'showrooms', selector: '#showrooms' },
        { id: 'get-in-touch', selector: '#get-in-touch' },
      ];

      const viewportMiddle = window.innerHeight * 0.35;
      let currentActive = 'hero';

      for (const section of sections) {
        const elem = document.querySelector(section.selector);
        if (elem) {
          const rect = elem.getBoundingClientRect();
          if (rect.top <= viewportMiddle && rect.bottom >= 0) {
            currentActive = section.id;
          }
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const smoothScrollTo = (targetSelector) => {
    setMobileMenuOpen(false);
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

  const navItems = [
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Why Us', href: '#why-us', id: 'why-us' },
    { label: 'Services', href: '#/services', isPage: true, pageTarget: 'services', id: 'services' },
    { label: '3D Studio', href: '#interactive-studio', id: 'interactive-studio' },
    { label: 'Projects', href: '#/projects', isPage: true, pageTarget: 'projects', id: 'projects' },
    { label: 'Showrooms', href: '#showrooms', id: 'showrooms' },
    { label: 'Reviews', href: '#testimonials', id: 'testimonials' }
  ];

  return (
    <>
      <header
        className={`w-full absolute z-50 py-3 sm:py-4 px-4 sm:px-8 bg-transparent transition-all duration-[1000ms] cubic-bezier(0.16,1,0.3,1) ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto rounded-xl bg-[#faf9f6]/85 backdrop-blur-xl border border-[#e5e0d3]/80 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.08)] ring-1 ring-white/60 px-5 sm:px-7 py-2 sm:py-2.5 flex items-center justify-between transition-all duration-300">
          
          {/* Minimalist Blended Logo (slogo.webp only) */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`group flex items-center focus:outline-none transition-all duration-700 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <img
              src={slogo}
              alt="Sharkings Interiors & Exteriors"
              className="h-7 sm:h-8 md:h-10 w-auto object-contain transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] mix-blend-multiply"
            />
          </a>

          {/* Desktop Navigation Links with Staggered Entrance */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.isPage) {
                      onNavigate && onNavigate(item.pageTarget);
                    } else {
                      smoothScrollTo(item.href);
                    }
                  }}
                  style={{ transitionDelay: `${400 + idx * 70}ms` }}
                  className={`relative py-1 font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] transition-all duration-700 ease-out group ${
                    isVisible ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
                  } ${
                    isActive ? 'text-[#710014]' : 'text-[#2c2c2c] hover:text-[#710014]'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#710014] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Action Controls: Contact CTA Button + Hamburger Menu */}
          <div className="flex items-center gap-3">
            <a
              href="#get-in-touch"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('#get-in-touch');
              }}
              style={{ transitionDelay: '900ms' }}
              className={`px-4.5 py-2 sm:px-5 sm:py-2 rounded bg-[#710014] text-white font-sans text-[10px] font-bold uppercase tracking-[0.22em] shadow-md hover:bg-[#580010] hover:shadow-lg hover:shadow-[#710014]/30 hover:scale-[1.02] transition-all duration-700 ease-out ${
                isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-3 opacity-0 scale-95'
              }`}
            >
              Contact Us
            </a>

            {/* Hamburger Button (Mobile / Tablet) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-1.5 rounded-lg text-[#1a1a1a] hover:bg-black/5 transition-colors focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </header>

      {/* Full Screen Mobile Drawer Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-white/98 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-10 pt-8 transition-all duration-500 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-6'
        }`}
      >
        {/* Drawer Top Header with Logo & Prominent Close (Exit) Button */}
        <div className="flex items-center justify-between pb-6 border-b border-[#e5e0d3]">
          <div className="flex items-center gap-2.5">
            <img
              src={slogo}
              alt="Sharkings Interiors & Exteriors"
              className="h-8 w-auto object-contain mix-blend-multiply"
            />
            <span className="font-display text-lg tracking-[0.25em] text-[#1a1a1a]">
              SHARKINGS
            </span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Navigation Menu"
            className="p-2 rounded-full bg-[#f9f8f4] text-[#1a1a1a] border border-[#e5e0d3] hover:bg-[#710014] hover:text-white transition-all cursor-pointer focus:outline-none flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Menu Nav Links */}
        <nav className="flex flex-col space-y-6 my-auto">
          {navItems.map((item, idx) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.isPage) {
                    setMobileMenuOpen(false);
                    onNavigate && onNavigate(item.pageTarget);
                  } else {
                    smoothScrollTo(item.href);
                  }
                }}
                className={`flex items-center justify-between font-display text-2xl sm:text-4xl font-light tracking-wider transition-all duration-300 py-1 group ${
                  isActive ? 'text-[#710014] font-normal' : 'text-[#1a1a1a] hover:text-[#710014]'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs font-sans font-semibold tracking-widest text-[#710014]/40 group-hover:text-[#710014]">
                  0{idx + 1}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Drawer Footer CTA & Location */}
        <div className="space-y-4 pt-6 border-t border-[#e5e0d3]">
          <a
            href="#book-consultation"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('#book-consultation');
            }}
            className="w-full py-3.5 bg-[#710014] text-white font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 group cursor-pointer hover:bg-[#580010] transition-colors shadow-md rounded"
          >
            <span>Book Free Consultation</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>

          <div className="flex items-center justify-between text-[10px] font-sans tracking-widest text-[#666666] uppercase">
            <span>Madurai & Ramanathapuram</span>
            <span>Est. 2018</span>
          </div>
        </div>
      </div>
    </>
  );
}
