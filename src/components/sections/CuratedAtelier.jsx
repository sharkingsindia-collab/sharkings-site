import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import homeInteriorImg from '../../assets/home-interior.webp';
import modularKitchenImg from '../../assets/modular-kitchen.webp';
import officeInteriorImg from '../../assets/office-interior.webp';
import turnkeyImg from '../../assets/turnkey.webp';

const localAtelierServices = [
  {
    id: 'residential',
    label: 'RESIDENTIAL HOMES',
    tag: 'SHARKINGS RESIDENTIAL',
    chapter: '01',
    image: homeInteriorImg,
    concept: 'HOME INTERIORS',
    title: 'Complete Villa & Home Interiors',
    description: 'We design complete living rooms, bedrooms, and dining halls tailored to your family lifestyle. Built with premium materials and custom finishes in Madurai & Ramanathapuram.',
    features: [
      'Custom Living Room & Dining Furniture',
      'Bedrooms & Custom Wardrobe Units',
      'Ambient Cove & False Ceiling Lighting',
      'Durable & Easy-Maintenance Finishes'
    ]
  },
  {
    id: 'modular',
    label: 'MODULAR KITCHEN',
    tag: 'SHARKINGS KITCHEN',
    chapter: '02',
    image: modularKitchenImg,
    concept: 'KITCHEN ARCHITECTURE',
    title: 'Modern Modular Kitchens',
    description: 'Custom modular kitchen layouts built with water-resistant marine plywood and smooth soft-closing drawers for long-lasting daily use.',
    features: [
      'Water-Resistant Marine Plywood Carcass',
      'Soft-Closing Drawers & Storage Cabinets',
      'Custom Countertops & Splashbacks',
      'Ergonomic Cooking & Cleaning Zones'
    ]
  },
  {
    id: 'commercial',
    label: 'COMMERCIAL SPACES',
    tag: 'SHARKINGS COMMERCIAL',
    chapter: '03',
    image: officeInteriorImg,
    concept: 'OFFICE & RETAIL',
    title: 'Office & Commercial Showrooms',
    description: 'Professional commercial interiors for offices, showrooms, and retail stores designed to improve space efficiency and welcome your customers.',
    features: [
      'Reception Desks & Display Racks',
      'Conference Rooms & Workstations',
      'ACP Exterior Facade & Signage',
      'Acoustic & Low-Glare Lighting'
    ]
  },
  {
    id: 'turnkey',
    label: 'TURNKEY & JOINERY',
    tag: 'SHARKINGS TURNKEY',
    chapter: '04',
    image: turnkeyImg,
    concept: 'END-TO-END EXECUTION',
    title: 'Turnkey Interior Projects',
    description: 'Full project management from initial 3D design to factory manufacturing and final site setup. We take care of everything from start to finish.',
    features: [
      'Complete 3D Design & Space Planning',
      'In-House Factory Manufacturing',
      'Civil, Electrical & Lighting Setup',
      'On-Site Fitting & Quality Check'
    ]
  }
];

export default function CuratedAtelier({ 
  activeTabIdx, 
  setActiveTabIdx, 
  onNavigate 
}) {
  const [scrollProgress, setScrollProgress] = useState(0.5);
  const sectionRef = useRef(null);
  useScrollReveal();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalDist = rect.height + viewportHeight;
      const scrolled = viewportHeight - rect.top;

      const prog = Math.min(Math.max(0, scrolled / totalDist), 1);
      setScrollProgress(prog);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative z-30 bg-[#fbf9f6] text-luxury-charcoal py-20 px-6 md:px-16 lg:px-24 border-t border-black/5 overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute font-display text-[16vw] text-[#710014]/[0.02] font-extralight select-none pointer-events-none z-0 left-0 top-1/3 whitespace-nowrap">
        CURATED ARCHITECTURE
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 reveal-3d-popup">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#710014]/30" />
            <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.35em] text-[#710014] uppercase">
              WHAT WE DO
            </span>
            <span className="w-8 h-[1px] bg-[#710014]/30" />
          </div>

          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a] tracking-tight">
            Architectural Services & <span className="italic font-normal text-[#710014]">Portfolio</span>
          </h2>

          <p className="font-sans text-xs md:text-sm text-luxury-charcoal/70 leading-relaxed font-light max-w-2xl mx-auto">
            From modern residential homes to commercial offices and modular kitchens, we deliver high-quality interior design and factory setup across Tamil Nadu.
          </p>
        </div>

        {/* Interactive Card Board */}
        <div className="bg-white border border-black/10 rounded-none overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.05)] grid grid-cols-1 lg:grid-cols-12 items-stretch reveal-3d-popup delay-100 relative">
          {/* Top Burgundy Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#710014] to-transparent z-30" />
          
          {/* Left Side: Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 relative bg-luxury-charcoal overflow-hidden aspect-[16/10] lg:aspect-auto w-full lg:h-full min-h-0">
            
            {/* Active Tab Image Panel */}
            <div className="absolute inset-0 w-full h-full">
              {localAtelierServices.map((tab, idx) => (
                <div 
                  key={tab.id}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                    idx === activeTabIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <img 
                    src={tab.image} 
                    alt={tab.title}
                    className="w-full h-full object-cover opacity-90 transition-transform duration-[1200ms] ease-out hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-20 pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Tag Capsule (Top Left) */}
            <div className="absolute top-4 left-4 lg:top-6 lg:left-6 z-30">
              <div className="bg-black/80 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-none">
                <span className="font-sans text-[8px] lg:text-[9px] font-bold tracking-[0.25em] text-[#c5a059] uppercase">
                  ✦ {localAtelierServices[activeTabIdx].tag}
                </span>
              </div>
            </div>

            {/* Chapter Display (Bottom Left) */}
            <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 z-30 space-y-0.5">
              <div className="font-display text-3xl lg:text-5xl font-extralight text-[#c5a059] leading-none">
                {localAtelierServices[activeTabIdx].chapter}
              </div>
              <div className="font-sans text-[7px] lg:text-[8px] font-bold tracking-[0.4em] text-white/50 uppercase">
                FEATURED SERVICE
              </div>
            </div>

          </div>

          {/* Right Side: Tab Controls & Content details (7 cols) */}
          <div className="lg:col-span-7 p-5 md:p-10 lg:p-12 flex flex-col justify-between space-y-6 lg:space-y-8">
            
            {/* Tab Selector Buttons */}
            <div className="flex items-center gap-2 pb-4 lg:pb-6 border-b border-black/5 overflow-x-auto scrollbar-none whitespace-nowrap flex-nowrap -mx-2 px-2">
              {localAtelierServices.map((tab, idx) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabIdx(idx)}
                  className={`px-4 py-2 rounded-none font-sans text-[9px] lg:text-[10px] font-bold tracking-widest uppercase transition-all duration-300 flex-shrink-0 ${
                    idx === activeTabIdx 
                      ? 'bg-[#710014] text-white shadow-md' 
                      : 'bg-transparent text-luxury-charcoal/50 border border-luxury-charcoal/10 hover:border-[#710014] hover:text-[#710014]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Panel */}
            <div className="space-y-4 lg:space-y-5 flex-grow flex flex-col justify-center">
              
              <div className="font-sans text-[9px] lg:text-[10px] font-bold tracking-[0.3em] text-luxury-sage uppercase">
                {localAtelierServices[activeTabIdx].concept}
              </div>

              <h3 className="font-display text-xl lg:text-3xl font-light text-luxury-charcoal tracking-wide uppercase">
                {localAtelierServices[activeTabIdx].title}
              </h3>

              <p className="font-sans text-xs lg:text-sm text-luxury-charcoal/75 leading-relaxed font-light">
                {localAtelierServices[activeTabIdx].description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5 pt-2">
                {localAtelierServices[activeTabIdx].features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-luxury-sage/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-luxury-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="font-sans text-xs text-luxury-charcoal/80 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom Controls Bar */}
            <div className="flex items-center justify-between pt-4 lg:pt-6 border-t border-luxury-charcoal/5 gap-4">
              
              <div className="flex items-center gap-2 flex-shrink-0">
                <button 
                  onClick={() => setActiveTabIdx((prev) => (prev - 1 + localAtelierServices.length) % localAtelierServices.length)}
                  className="w-9 h-9 rounded-full border border-luxury-charcoal/10 flex items-center justify-center text-luxury-charcoal/55 hover:text-luxury-charcoal hover:border-luxury-charcoal hover:bg-luxury-charcoal/5 transition-all duration-300"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button 
                  onClick={() => setActiveTabIdx((prev) => (prev + 1) % localAtelierServices.length)}
                  className="w-9 h-9 rounded-full border border-luxury-charcoal/10 flex items-center justify-center text-luxury-charcoal/55 hover:text-luxury-charcoal hover:border-luxury-charcoal hover:bg-luxury-charcoal/5 transition-all duration-300"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>

              <button 
                onClick={() => onNavigate('services')}
                className="relative px-5 py-2.5 bg-luxury-charcoal text-white font-sans text-[9px] lg:text-[10px] uppercase tracking-widest font-semibold overflow-hidden group transition-all duration-300 shadow-[0_5px_15px_rgba(22,22,22,0.1)] flex-shrink"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="hidden sm:inline">Explore All Services</span>
                  <span className="sm:hidden">Explore Services</span>
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
