import { useCallback, memo } from 'react';
import ScrollReveal from '../ScrollReveal';
import homeInteriorImg from '../../assets/home-interior.webp';
import modularKitchenImg from '../../assets/modular-kitchen.webp';
import officeInteriorImg from '../../assets/office-interior.webp';
import turnkeyImg from '../../assets/turnkey.webp';

const ATELIER_SERVICES = [
  {
    id: 'residential',
    label: 'RESIDENTIAL HOMES',
    tag: 'SHARKINGS RESIDENTIAL',
    chapter: '01',
    image: homeInteriorImg,
    concept: 'HOME INTERIORS',
    title: 'Complete Villa & Home Interiors',
    description:
      'We design complete living rooms, bedrooms, and dining halls tailored to your family lifestyle, built with marine-grade materials and custom finishes in Madurai and Ramanathapuram.',
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
    description:
      'Custom modular kitchen layouts built with water-resistant marine plywood and smooth soft-closing hardware engineered for long-lasting daily performance.',
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
    description:
      'Corporate and retail interior environments for offices, showrooms, and salons designed to maximize space efficiency and strengthen client trust.',
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
    description:
      'Single-point project execution from initial 3D spatial planning to in-house factory fabrication and final site handover.',
    features: [
      'Complete 3D Design & Space Planning',
      'In-House Factory Manufacturing',
      'Civil, Electrical & Lighting Setup',
      'On-Site Fitting & Quality Check'
    ]
  }
];

function CuratedAtelier({ activeTabIdx, setActiveTabIdx, onNavigate }) {
  const handlePrevTab = useCallback(() => {
    setActiveTabIdx((prev) => (prev - 1 + ATELIER_SERVICES.length) % ATELIER_SERVICES.length);
  }, [setActiveTabIdx]);

  const handleNextTab = useCallback(() => {
    setActiveTabIdx((prev) => (prev + 1) % ATELIER_SERVICES.length);
  }, [setActiveTabIdx]);

  const handleNavigateServices = useCallback(() => {
    if (onNavigate) onNavigate('services');
  }, [onNavigate]);

  const activeService = ATELIER_SERVICES[activeTabIdx] || ATELIER_SERVICES[0];

  return (
    <section
      id="curated-atelier"
      className="relative z-30 bg-[#fbf9f6] text-luxury-charcoal py-16 sm:py-24 px-4 sm:px-8 md:px-16 lg:px-24 border-t border-black/5 overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute font-display text-[16vw] text-[#710014]/[0.025] font-normal select-none pointer-events-none z-0 left-0 top-1/3 whitespace-nowrap">
        CURATED ARCHITECTURE
      </div>

      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="flex items-center justify-center gap-3">
              <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#710014] uppercase">
                WHAT WE DO
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-[54px] font-medium text-[#1a1a1a] tracking-tight leading-tight">
              Architectural Services &amp;{' '}
              <span className="italic font-medium text-[#710014]">Portfolio</span>
            </h2>

            <p className="font-sans text-sm md:text-base text-[#333333] leading-relaxed font-normal max-w-2xl mx-auto">
              From modern residential homes to commercial offices and modular kitchens, we deliver end-to-end interior architecture and factory installation across Tamil Nadu.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Card Board */}
        <ScrollReveal variant="scale" delay={100}>
          <div className="bg-white border border-black/10 rounded-xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.06)] grid grid-cols-1 lg:grid-cols-12 items-stretch relative">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#710014] to-transparent z-30" />

          {/* Left Side: Visual Showcase */}
          <div className="lg:col-span-5 relative bg-luxury-charcoal overflow-hidden aspect-[16/10] lg:aspect-auto w-full lg:h-full min-h-[260px]">
            <div className="absolute inset-0 w-full h-full">
              {ATELIER_SERVICES.map((tab, idx) => (
                <div
                  key={tab.id}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-200 ease-out ${
                    idx === activeTabIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={tab.image}
                    alt={tab.title}
                    width="600"
                    height="400"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-95 transition-transform duration-300 ease-out hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/35 z-20 pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Tag Capsule */}
            <div className="absolute top-4 left-4 lg:top-6 lg:left-6 z-30">
              <div className="bg-black/85 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-md">
                <span className="font-sans text-xs font-bold tracking-[0.14em] text-[#e0be7a] uppercase">
                  ✦ {activeService.tag}
                </span>
              </div>
            </div>

            {/* Chapter Display */}
            <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 z-30 space-y-1">
              <div className="font-display text-4xl lg:text-5xl font-medium text-[#e0be7a] leading-none">
                {activeService.chapter}
              </div>
              <div className="font-sans text-[11px] font-bold tracking-[0.2em] text-white/90 uppercase">
                FEATURED SERVICE
              </div>
            </div>
          </div>

          {/* Right Side: Tab Controls & Content */}
          <div className="lg:col-span-7 p-6 md:p-10 lg:p-12 flex flex-col justify-between space-y-6 lg:space-y-8">
            {/* Tab Selector Buttons */}
            <div className="flex items-center gap-2 pb-4 lg:pb-6 border-b border-black/10 overflow-x-auto scrollbar-none whitespace-nowrap flex-nowrap -mx-1 px-1">
              {ATELIER_SERVICES.map((tab, idx) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabIdx(idx)}
                  className={`px-4 py-2 rounded-md font-sans text-xs font-bold tracking-[0.1em] uppercase transition-all duration-200 flex-shrink-0 touch-manipulation cursor-pointer ${
                    idx === activeTabIdx
                      ? 'bg-[#710014] text-white shadow-sm'
                      : 'bg-[#f6f4ee] text-[#333333] border border-black/10 hover:border-[#710014] hover:text-[#710014]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Panel */}
            <div className="space-y-4 lg:space-y-5 flex-grow flex flex-col justify-center">
              <div className="font-sans text-xs font-bold tracking-[0.2em] text-[#4F5B3D] uppercase">
                {activeService.concept}
              </div>

              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-[#1a1a1a] tracking-tight">
                {activeService.title}
              </h3>

              <p className="font-sans text-sm lg:text-base text-[#333333] leading-relaxed font-normal">
                {activeService.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 pt-2">
                {activeService.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#4F5B3D]/12 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#4F5B3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="font-sans text-sm text-[#262626] font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="flex items-center justify-between pt-4 lg:pt-6 border-t border-black/10 gap-4">
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={handlePrevTab}
                  aria-label="Previous Service Tab"
                  className="w-9 h-9 rounded-md border border-black/20 flex items-center justify-center text-[#262626] hover:text-white hover:border-[#710014] hover:bg-[#710014] transition-all duration-200 cursor-pointer touch-manipulation"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleNextTab}
                  aria-label="Next Service Tab"
                  className="w-9 h-9 rounded-md border border-black/20 flex items-center justify-center text-[#262626] hover:text-white hover:border-[#710014] hover:bg-[#710014] transition-all duration-200 cursor-pointer touch-manipulation"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>

              <button
                type="button"
                onClick={handleNavigateServices}
                className="relative px-5 py-2.5 rounded-md bg-luxury-charcoal text-white font-sans text-xs uppercase tracking-[0.12em] font-bold hover:bg-[#710014] transition-colors duration-200 shadow-sm flex-shrink cursor-pointer touch-manipulation group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="hidden sm:inline">Explore All Services</span>
                  <span className="sm:hidden">Explore Services</span>
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default memo(CuratedAtelier);
