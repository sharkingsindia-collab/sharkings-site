import { useState, useEffect, useRef, memo } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

// Project Assets from Billionaires & FacetoFace (referencing ProjectPage.jsx)
import b1 from '../../assets/Billionaires/sharking1.webp';
import b2 from '../../assets/Billionaires/sharking2.webp';
import b3 from '../../assets/Billionaires/sharking3.webp';
import f1 from '../../assets/FacetoFace/sharking1.webp';
import f3 from '../../assets/FacetoFace/sharking3.webp';
import f4 from '../../assets/FacetoFace/sharking4.webp';

// Core Service & Project Assets
import homeInteriorImg from '../../assets/home-interior.webp';
import modularKitchenImg from '../../assets/modular-kitchen.webp';
import officeInteriorImg from '../../assets/office-interior.webp';
import acpElevationImg from '../../assets/ACP-elevation.webp';
import turnkeyImg from '../../assets/turnkey.webp';
import wardrobeImg from '../../assets/wardrobe.webp';

const PROJECTS_DATA = [
  {
    id: 1,
    category: 'COMMERCIAL',
    branch: 'MADURAI BRANCH',
    image: b1,
    title: 'Billionaires Luxury Studio',
    description: 'A high-end salon and spa project designed and built in Madurai featuring custom lighted mirrors, smooth wall finishes, and comfortable styling stations.',
    tags: ['Luxury Salon', 'Madurai Studio', 'Lighted Mirrors', 'Gold Hardware'],
    architect: 'R. K. SIVANESH',
    sqft: '3,500 SQ. FT.',
    materials: [
      { name: 'Brushed Gold Brass', color: '#d4af37' },
      { name: 'Warm Oak Veneer', color: '#8a6543' },
      { name: 'Acoustic Slat Panel', color: '#2a2a2a' },
      { name: 'Calacatta Marble', color: '#eaeaea' }
    ]
  },
  {
    id: 2,
    category: 'COMMERCIAL',
    branch: 'RAMANATHAPURAM BRANCH',
    image: f1,
    title: 'Face to Face Wellness Lounge',
    description: 'A complete beauty and wellness studio completed in Ramanathapuram. Built with practical styling layouts, soft relaxing lighting, and clean finishes.',
    tags: ['Wellness Studio', 'Ramanathapuram', 'Relaxing Lighting', 'Clean Finishes'],
    architect: 'A. MEERA',
    sqft: '2,800 SQ. FT.',
    materials: [
      { name: 'Warm Sandstone', color: '#dcc6a8' },
      { name: 'Satin Brass', color: '#cfb53b' },
      { name: 'Obsidian Trim', color: '#111111' },
      { name: 'Smoked Mirror', color: '#333333' }
    ]
  },
  {
    id: 3,
    category: 'RESIDENTIAL',
    branch: 'MADURAI BRANCH',
    image: homeInteriorImg,
    title: 'The Signature Living Suite',
    description: 'A modern, high-contrast residential living space crafted with warm oak veneers, bespoke illumination, and premium Italian upholstery.',
    tags: ['Living Room', 'Earthy Tones', 'Warm Veneer', 'Bespoke Lighting'],
    architect: 'R. K. SIVANESH',
    sqft: '2,400 SQ. FT.',
    materials: [
      { name: 'Terracotta Plaster', color: '#c36241' },
      { name: 'Warm Oak Veneer', color: '#8a6543' },
      { name: 'Brushed Brass', color: '#d4af37' },
      { name: 'Linen Fiber', color: '#e3dfd5' }
    ]
  },
  {
    id: 4,
    category: 'MODULAR KITCHEN',
    branch: 'MADURAI BRANCH',
    image: modularKitchenImg,
    title: 'Minimalist Timber Kitchen',
    description: 'Precision-finished modular cabinetry accented with hand-polished golden grips, soft-close hardware, and integrated hidden storage.',
    tags: ['Kitchen', 'Veneers', 'Gold Grips', 'German Hardware'],
    architect: 'S. KARTHIK',
    sqft: '520 SQ. FT.',
    materials: [
      { name: 'Charcoal Oak', color: '#2a2a2a' },
      { name: 'Satin Brass', color: '#cfb53b' },
      { name: 'Calacatta Marble', color: '#eaeaea' },
      { name: 'Toughened Glass', color: '#7a8a99' }
    ]
  },
  {
    id: 5,
    category: 'RESIDENTIAL',
    branch: 'RAMANATHAPURAM BRANCH',
    image: wardrobeImg,
    title: 'The Serenity Bedroom & Wardrobe',
    description: 'An expansive master suite layout balancing organic wood textures, tinted glass wardrobe panels, and ambient backlighting for a calm retreat.',
    tags: ['Bedroom', 'Custom Wardrobe', 'Glass Panels', 'Calm Theme'],
    architect: 'A. MEERA',
    sqft: '1,850 SQ. FT.',
    materials: [
      { name: 'Raw Sandstone', color: '#dcc6a8' },
      { name: 'Bleached Linen', color: '#f5f3ef' },
      { name: 'Aged Gold', color: '#bfa15f' },
      { name: 'Obsidian Trim', color: '#111111' }
    ]
  },
  {
    id: 6,
    category: 'COMMERCIAL',
    branch: 'MADURAI BRANCH',
    image: b3,
    title: 'Billionaires VIP Styling Bay',
    description: 'Exclusive workstation bays crafted with polished marble countertops, recessed LED ambient backlighting, and custom leather seating.',
    tags: ['VIP Suite', 'Ambient Lighting', 'Marble Countertops', 'Commercial'],
    architect: 'R. K. SIVANESH',
    sqft: '1,800 SQ. FT.',
    materials: [
      { name: 'Nero Marquina', color: '#1e1e1e' },
      { name: 'Polished Gold', color: '#ffd700' },
      { name: 'Aged Bronze', color: '#8c6d46' },
      { name: 'Smoked Glass', color: '#333333' }
    ]
  },
  {
    id: 7,
    category: 'RENOVATION',
    branch: 'RAMANATHAPURAM BRANCH',
    image: acpElevationImg,
    title: 'Exterior Facade & ACP Revival',
    description: 'Transforming existing structural facades with modern weather-proof ACP cladding, linear outdoor lighting, and architectural paneling.',
    tags: ['ACP Cladding', 'Elevation Design', 'Structural Revival', 'Exterior'],
    architect: 'S. KARTHIK',
    sqft: '3,200 SQ. FT.',
    materials: [
      { name: 'Metallic Silver ACP', color: '#c0c0c0' },
      { name: 'Curved Stucco', color: '#eadecb' },
      { name: 'Charcoal Panels', color: '#222222' },
      { name: 'Gold Anodized', color: '#cda869' }
    ]
  },
  {
    id: 8,
    category: 'COMMERCIAL',
    branch: 'RAMANATHAPURAM BRANCH',
    image: f3,
    title: 'Face to Face Reception Lounge',
    description: 'Welcoming reception and styling lounge featuring soft ceiling cove illumination, marble islands, and custom branding displays.',
    tags: ['Reception Lounge', 'Cove Lighting', 'Styling Islands', 'Commercial'],
    architect: 'A. MEERA',
    sqft: '1,600 SQ. FT.',
    materials: [
      { name: 'White Marble', color: '#f5f5f5' },
      { name: 'Warm LED Cove', color: '#ffe4b5' },
      { name: 'Satin Brass', color: '#cfb53b' },
      { name: 'Obsidian Trim', color: '#111111' }
    ]
  },
  {
    id: 9,
    category: 'RENOVATION',
    branch: 'MADURAI BRANCH',
    image: turnkeyImg,
    title: 'The Coastal Villa Revival',
    description: 'Transforming older residential structures into modern quiet luxury homes with full turnkey execution, acoustic walls, and open architectural arches.',
    tags: ['Renovation', 'Turnkey Execution', 'Quiet Luxury', 'Architectural Arches'],
    architect: 'S. KARTHIK',
    sqft: '4,200 SQ. FT.',
    materials: [
      { name: 'Italian Marble', color: '#e8e6e1' },
      { name: 'Teak Wood Veneer', color: '#795548' },
      { name: 'Brushed Brass', color: '#d4af37' },
      { name: 'Velvet Trim', color: '#556b2f' }
    ]
  }
];

function ProjectCard({ project, onClick, cardStyle, isActive }) {
  const [tiltStyle, setTiltStyle] = useState({});
  const [imgStyle, setImgStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!isActive) return; // Only tilt the active focused center card
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotX = ((yc - y) / yc) * 3;
    const rotY = ((x - xc) / xc) * 3;

    setTiltStyle({
      transform: `${cardStyle.transform} rotateX(${rotX}deg) rotateY(${rotY}deg)`,
      transition: 'transform 0.1s ease-out',
      willChange: 'transform'
    });

    const transX = ((x - xc) / xc) * -8;
    const transY = ((yc - y) / yc) * -8;
    setImgStyle({
      transform: `scale(1.12) translate(${transX}px, ${transY}px)`,
      transition: 'transform 0.1s ease-out',
      willChange: 'transform'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({});
    setImgStyle({
      transform: `scale(1.05) translate(0px, 0px)`,
      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      willChange: 'transform'
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...cardStyle,
        ...tiltStyle
      }}
      className={`absolute w-[265px] md:w-[350px] aspect-[3/4] bg-[#121622] rounded-3xl border overflow-hidden shadow-2xl transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer select-none group [transform-style:preserve-3d] ${isActive
          ? 'border-[#c5a059]/40 ring-1 ring-[#c5a059]/20 shadow-[#c5a059]/5'
          : 'border-white/10 hover:border-white/20'
        }`}
    >
      {/* Image background with parallax */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <img
          src={project.image}
          alt={project.title}
          style={imgStyle}
          className="absolute inset-0 w-full h-full object-cover scale-[1.05] opacity-80 group-hover:scale-110 group-hover:opacity-95 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />

        {/* Branch tag */}
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-black/60 backdrop-blur-sm text-luxury-cream border border-white/10 px-3 py-1 rounded text-[7px] font-sans font-bold tracking-[0.2em] uppercase">
            {project.branch.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* Description Content */}
      <div className="absolute inset-0 z-20 p-5 flex flex-col justify-end space-y-4">
        <div className="space-y-1 transform translate-z-[30px]">
          <span className="font-sans text-[8px] lg:text-[9px] font-bold tracking-[0.25em] text-[#c5a059] uppercase">
            {project.category}
          </span>
          <h3 className="font-display text-base lg:text-lg font-light text-luxury-cream leading-tight group-hover:text-[#c5a059] transition-colors duration-300">
            {project.title}
          </h3>
        </div>

        <p className="font-sans text-[10px] lg:text-[11px] text-white/50 leading-relaxed font-light line-clamp-3 transform translate-z-[20px] group-hover:text-white/70 transition-colors duration-300">
          {project.description}
        </p>

        {/* Action helper */}
        <div className="pt-2 flex items-center justify-between transform translate-z-[10px]">
          {isActive ? (
            <span className="font-sans text-[7px] font-bold tracking-[0.2em] text-[#c5a059] uppercase">
              ✦ Click to view full image
            </span>
          ) : (
            <span className="font-sans text-[7px] font-bold tracking-[0.2em] text-white/20 uppercase">
              Click to center
            </span>
          )}
          <span className="w-1.5 h-1.5 bg-[#838f6f] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </div>
  );
}

function ProjectGlimpse({ onNavigate }) {
  useScrollReveal();
  const [activeCategory, setActiveCategory] = useState('RESIDENTIAL');
  const [isScanning, setIsScanning] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [specialtiesScrollProgress, setSpecialtiesScrollProgress] = useState(0.5);
  const [isDesktop, setIsDesktop] = useState(true);
  const sectionRef = useRef(null);

  const categories = ['ALL', 'RESIDENTIAL', 'MODULAR KITCHEN', 'COMMERCIAL', 'RENOVATION'];

  const filteredProjects = activeCategory === 'ALL'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === activeCategory);

  // Keyboard shortcut (Escape) & scroll lock for selected project lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  // Resize listener for responsive layout adjustments
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update active index to center of array when filtered list changes
  useEffect(() => {
    if (filteredProjects.length > 0) {
      setActiveIndex(Math.max(0, Math.floor((filteredProjects.length - 1) / 2)));
    } else {
      setActiveIndex(0);
    }
  }, [activeCategory]);

  // Section local scroll tracker for Y-axis rotation
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
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerScanFetch = () => {
    if (isScanning) return;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1400);
  };

  const getCardTransform = (idx) => {
    const offset = idx - activeIndex;
    const scrollParallaxOffset = (specialtiesScrollProgress - 0.5) * 45;

    // Spread projects based on length of filtered set
    const spreadAngle = filteredProjects.length <= 3 ? 42 : 32;
    const angle = (offset * spreadAngle) + scrollParallaxOffset;
    const rad = (angle * Math.PI) / 180;

    const tx = Math.sin(rad) * (isDesktop ? 330 : 155);
    const tz = Math.cos(rad) * (isDesktop ? 140 : 75) - (isDesktop ? 140 : 75);
    const ry = -angle;

    const scale = 1 - Math.min(Math.abs(offset) * 0.12, 0.24);

    return {
      transform: `perspective(1200px) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
      opacity: Math.abs(angle) > 85 ? 0 : 1 - Math.min(Math.abs(angle) * 0.009, 0.8),
      zIndex: 100 - Math.round(Math.abs(offset) * 10),
      pointerEvents: Math.abs(angle) > 85 ? 'none' : 'auto',
      filter: idx === activeIndex ? 'none' : 'blur(1.2px) brightness(0.4) contrast(0.95)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s, filter 0.5s',
      willChange: 'transform, opacity, filter'
    };
  };

  const handleCardClick = (project, idx) => {
    if (idx !== activeIndex) {
      setActiveIndex(idx);
    } else {
      setSelectedProject(project);
    }
  };

  return (
    <>
      <style>{`
        @keyframes scanLaser {
          0% { top: 0%; opacity: 1; }
          50% { top: 100%; opacity: 1; }
          100% { top: 0%; opacity: 0; }
        }
        .laser-line {
          animation: scanLaser 1.4s ease-in-out infinite;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="projects"
        className="relative z-30 bg-[#0a0c10] text-[#fbf9f6] py-10 px-6 md:px-16 lg:px-24 overflow-hidden border-t border-white/5"
      >
        {/* Grid lines background layout */}
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
        <div className="absolute w-[350px] h-[350px] rounded-full bg-[#838f6f]/5 blur-[120px] -left-20 top-20 pointer-events-none" />
        <div className="absolute w-[350px] h-[350px] rounded-full bg-[#c5a059]/4 blur-[120px] -right-20 bottom-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8 reveal-3d-popup">
            <div className="space-y-4 max-w-2xl">
              <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.35em] text-[#838f6f] uppercase">
                SIGNATURE SHOWCASE
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-extralight text-luxury-cream leading-tight uppercase tracking-wider">
                Our Masterpiece Portfolios
              </h2>
              <p className="font-sans text-xs md:text-sm text-white/50 leading-relaxed font-light">
                Explore custom spaces hand-engineered in Madurai and Ramanathapuram. Click cards or scroll the page to spin the curved 3D portfolio gallery.
              </p>
            </div>

            {/* Scan button */}
            <button
              onClick={triggerScanFetch}
              className="flex items-center gap-2 px-5 py-2.5 border border-white/10 hover:border-[#838f6f] bg-white/5 rounded-none font-sans text-[10px] font-semibold tracking-wider uppercase text-white/80 hover:text-white transition-colors shadow-sm self-start md:self-end"
            >
              <svg className={`w-3.5 h-3.5 text-[#838f6f] ${isScanning ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <span>Simulate Projects Fetch</span>
            </button>
          </div>

          {/* Filter row: Full-width row dedicated solely to filters */}
          <div className="flex justify-center border-b border-white/5">
            <div className="bg-white/5 border border-white/10 p-1 rounded-none flex flex-nowrap overflow-x-auto scrollbar-none gap-2 shadow-sm max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    triggerScanFetch();
                  }}
                  className={`px-5 py-2.5 rounded-none font-sans text-[9px] md:text-[10px] font-bold tracking-widest uppercase transition-all duration-300 flex-shrink-0 ${activeCategory === cat
                      ? 'bg-[#838f6f] text-white shadow-md'
                      : 'bg-transparent text-white/50 hover:text-white'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 3D Perspective Curved Container */}
          <div className="relative w-full h-[450px] md:h-[560px] flex items-center justify-center overflow-visible">

            {/* Ring Center horizontal alignment line */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="w-[102%] h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/20 to-transparent" />
            </div>

            {/* Laser Line Scanning visual effect overlay */}
            {isScanning && (
              <div
                className="absolute left-0 right-0 h-[2px] bg-[#c5a059] z-20 pointer-events-none laser-line"
                style={{
                  boxShadow: '0 0 14px 2.5px #c5a059',
                  top: '50%'
                }}
              />
            )}

            {/* Cards Deck */}
            <div className="relative w-full h-full flex items-center justify-center overflow-visible [transform-style:preserve-3d]">
              {filteredProjects.map((project, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <div
                    key={project.id}
                    className={`transition-all duration-500 transform ${isScanning ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'
                      }`}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none'
                    }}
                  >
                    <ProjectCard
                      project={project}
                      onClick={() => handleCardClick(project, idx)}
                      cardStyle={getCardTransform(idx)}
                      isActive={isActive}
                    />
                  </div>
                );
              })}
            </div>

          </div>

          {/* Indicator dots below ring */}
          <div className="flex justify-center items-center gap-3">
            {filteredProjects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Show project 0${idx + 1}`}
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer ${idx === activeIndex
                    ? 'border-[#c5a059] bg-[#c5a059]/10 scale-110'
                    : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                  }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-[#c5a059] scale-100' : 'bg-transparent scale-0'
                  }`} />
              </button>
            ))}
          </div>

          {/* Bottom Action CTA */}
          <div className="flex justify-center pt-6">
            <button
              onClick={() => onNavigate('projects')}
              className="relative px-9 py-3.5 bg-white text-luxury-charcoal font-sans text-[10px] uppercase tracking-[0.2em] font-semibold overflow-hidden group transition-all duration-300 shadow-[0_15px_30px_rgba(255,255,255,0.05)] rounded-full hover:shadow-[0_15px_35px_rgba(255,255,255,0.1)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Explore Entire Gallery</span>
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* Fullscreen High-Resolution Project Lightbox Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 md:p-10 transition-all duration-300 animate-fadeIn"
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 z-20">
            <div className="space-y-1">
              <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#c5a059] uppercase block">
                {selectedProject.category} • {selectedProject.branch}
              </span>
              <h3 className="font-display text-xl sm:text-3xl font-light text-luxury-cream uppercase tracking-wider">
                {selectedProject.title}
              </h3>
            </div>

            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Close Lightbox"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-white/10 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main Stage: Large Visible Image Display */}
          <div
            onClick={() => setSelectedProject(null)}
            className="relative flex-1 w-full my-4 flex items-center justify-center overflow-hidden rounded-2xl bg-[#0a0c10] border border-white/10 group cursor-pointer"
          >
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-full object-contain max-h-[75vh] md:max-h-[80vh] transition-transform duration-700 group-hover:scale-[1.02]"
            />

            {/* Gradient Overlay at bottom for readable text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

            {/* Floating Info Overlay */}
            <div className="absolute bottom-6 left-6 right-6 md:left-8 md:right-8 flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-none">
              <div className="max-w-3xl space-y-2 pointer-events-auto">
                <span className="font-sans text-[9px] font-bold tracking-[0.25em] text-[#838f6f] uppercase">
                  {selectedProject.category}
                </span>
                <p className="font-sans text-xs md:text-sm text-white/80 leading-relaxed font-light drop-shadow-md">
                  {selectedProject.description}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(null);
                  if (onNavigate) onNavigate('projects');
                }}
                className="px-6 py-3 bg-[#c5a059] text-black hover:bg-white transition-colors duration-300 font-sans text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg pointer-events-auto flex items-center gap-2 self-start md:self-end cursor-pointer"
              >
                <span>EXPLORE ALL PROJECTS</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Bottom Bar Footer hint */}
          <div className="flex items-center justify-between text-white/40 font-sans text-[9px] font-medium tracking-widest uppercase pt-1">
            <span>SHARKINGS INTERIORS & EXTERIORS • {selectedProject.branch}</span>
            <span>CLICK ANYWHERE TO CLOSE (ESC)</span>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(ProjectGlimpse);
