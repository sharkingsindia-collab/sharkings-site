import { useState, useEffect, useRef } from 'react';

const SPECIALTIES_DATA = [
  {
    id: 1,
    title: 'Custom Veneers',
    tag: 'ORGANIC CARPENTRY',
    image: '/images/service-furniture.png',
    description: 'Natural oak, teak, and solid walnut panels matching minimalist wood line aesthetics.'
  },
  {
    id: 2,
    title: 'Polished Brass',
    tag: 'METAL ARCHITECTURES',
    image: '/images/slide-dining.png',
    description: 'Custom hand-finished golden grips, cabinet trim profiles, and premium metallic accents.'
  },
  {
    id: 3,
    title: 'Sensory Lights',
    tag: 'AMBIENCE CONCEPTS',
    image: '/images/slide-bedroom.png',
    description: 'Low-glow uplighting arrays, twilight twilight dimming switches, and spotlight maps.'
  },
  {
    id: 4,
    title: 'Organic Marble',
    tag: 'SOLID STONE SLABS',
    image: '/images/service-commercial.png',
    description: 'Hand-selected Nero Marquina, Carrara marble, and tactile travertine slabs.'
  },
  {
    id: 5,
    title: 'Tactile Plasters',
    tag: 'EARTHY WALL FINISHES',
    image: '/images/slide-living.png',
    description: 'Hand-applied charcoal plasters, premium raw stucco coatings, and textured finishes.'
  },
  {
    id: 6,
    title: 'Plush Textiles',
    tag: 'ORGANIC FIBERS',
    image: '/images/service-residential.png',
    description: 'Bespoke high-grade velvet, raw linen upholstery, and premium sensory carpets.'
  }
];

export default function Specialties({ scrollY }) {
  const [activeIndex, setActiveIndex] = useState(2);
  const [specialtiesScrollProgress, setSpecialtiesScrollProgress] = useState(0.5);
  const [isDesktop, setIsDesktop] = useState(true);
  const sectionRef = useRef(null);

  // Resize listener for responsive 3D coordinates
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate local scroll progress specifically inside the specialties section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalDist = rect.height + viewportHeight;
      const scrolled = viewportHeight - rect.top;
      
      const prog = Math.min(Math.max(0, scrolled / totalDist), 1);
      setSpecialtiesScrollProgress(prog);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial run
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Y-axis ring rotation angles
  // Center is activeIndex. Scroll changes the global offset slightly
  const getCardTransform = (idx) => {
    const offset = idx - activeIndex;
    
    // Dynamic parallax rotation bound to section scroll position
    // As you scroll from top to bottom, the carousel swings by up to 60 degrees!
    const scrollParallaxOffset = (specialtiesScrollProgress - 0.5) * 65; 
    
    const baseAngle = offset * 32; // Spread angle
    const angle = baseAngle + scrollParallaxOffset;
    const rad = (angle * Math.PI) / 180;
    
    // Coordinate offsets (Desktop vs Mobile sizes)
    const tx = Math.sin(rad) * (isDesktop ? 340 : 180);
    const tz = Math.cos(rad) * (isDesktop ? 160 : 100) - (isDesktop ? 160 : 100);
    const ry = -angle; // Rotate facing the viewer

    return {
      transform: `perspective(1000px) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg)`,
      opacity: Math.abs(angle) > 90 ? 0 : 1 - Math.min(Math.abs(angle) * 0.008, 0.7),
      zIndex: 100 - Math.round(Math.abs(offset) * 10),
      pointerEvents: Math.abs(offset) === 0 ? 'auto' : 'auto'
    };
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative z-30 bg-[#0a0c10] text-luxury-cream py-28 px-6 md:px-16 lg:px-24 overflow-hidden border-t border-white/5"
    >
      {/* Decorative Grid Mesh Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '35px 35px'
        }}
      />
      {/* Abstract Glowing dust clouds */}
      <div className="absolute w-[350px] h-[350px] rounded-full bg-[#838f6f]/5 blur-[120px] -left-20 top-20 pointer-events-none" />
      <div className="absolute w-[350px] h-[350px] rounded-full bg-[#c5a059]/4 blur-[120px] -right-20 bottom-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.35em] text-[#838f6f] uppercase">
            DESIGN ESSENTIALS
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extralight text-luxury-cream leading-tight uppercase tracking-wider">
            Our Specialties
          </h2>
          <p className="font-sans text-xs md:text-sm text-luxury-cream/50 leading-relaxed font-light">
            Crafting luxury spaces with hand-selected tactile veneers, dimming lighting grids, and premium metals. Click cards or scroll the page to spin the curved specialty ring.
          </p>
        </div>

        {/* 3D Perspective Curved Container */}
        <div className="relative w-full h-[400px] md:h-[480px] flex items-center justify-center overflow-visible">
          
          {/* Ring Center Pointer anchor */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-[102%] h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/20 to-transparent" />
          </div>

          {/* Cards Deck */}
          <div className="relative w-full h-full flex items-center justify-center overflow-visible [transform-style:preserve-3d]">
            {SPECIALTIES_DATA.map((item, idx) => {
              const isActive = idx === activeIndex;
              
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  style={getCardTransform(idx)}
                  className={`absolute w-[220px] md:w-[280px] aspect-[3/4] bg-[#121622] rounded-3xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer select-none group [transform-style:preserve-3d] ${
                    isActive ? 'border-[#c5a059]/40 ring-1 ring-[#c5a059]/20 shadow-[#c5a059]/5' : 'hover:border-white/20'
                  }`}
                >
                  {/* Image background */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover opacity-35 group-hover:scale-110 group-hover:opacity-50 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-[#121622]/40 to-black/35 z-10" />
                  </div>

                  {/* Specialty Content details */}
                  <div className="absolute inset-0 z-20 p-5 flex flex-col justify-end space-y-4">
                    
                    <div className="space-y-1 transform translate-z-[30px]">
                      <span className="font-sans text-[8px] lg:text-[9px] font-bold tracking-[0.25em] text-[#c5a059] uppercase">
                        {item.tag}
                      </span>
                      <h3 className="font-display text-lg lg:text-xl font-light text-luxury-cream leading-tight group-hover:text-[#c5a059] transition-colors duration-300">
                        {item.title}
                      </h3>
                    </div>

                    <p className="font-sans text-[10px] lg:text-[11px] text-white/50 leading-relaxed font-light transform translate-z-[20px] group-hover:text-white/70 transition-colors duration-300">
                      {item.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between transform translate-z-[10px]">
                      <span className="font-display text-xs font-semibold text-white/20">0{idx + 1}</span>
                      <span className="w-1.5 h-1.5 bg-[#838f6f] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Ring Index Selector dots */}
        <div className="flex items-center gap-3">
          {SPECIALTIES_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Show specialty 0${idx + 1}`}
              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                idx === activeIndex 
                  ? 'border-[#c5a059] bg-[#c5a059]/10 scale-110' 
                  : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === activeIndex ? 'bg-[#c5a059] scale-100' : 'bg-transparent scale-0'
              }`} />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
