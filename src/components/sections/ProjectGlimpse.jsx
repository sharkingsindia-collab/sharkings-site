import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

// Real Billionaires Project Assets (Madurai)
import b1 from '../../assets/Billionaires/sharking1.webp';
import b2 from '../../assets/Billionaires/sharking2.webp';
import b3 from '../../assets/Billionaires/sharking3.webp';
import b4 from '../../assets/Billionaires/sharking4.webp';
import b5 from '../../assets/Billionaires/sharking5.webp';
import b6 from '../../assets/Billionaires/sharking6.webp';
import b7 from '../../assets/Billionaires/sharking7.webp';
import b8 from '../../assets/Billionaires/sharking8.webp';

// Real Face to Face Project Assets (Ramanathapuram)
import f1 from '../../assets/FacetoFace/sharking1.webp';
import f01 from '../../assets/FacetoFace/sharking01.webp';
import f3 from '../../assets/FacetoFace/sharking3.webp';
import f4 from '../../assets/FacetoFace/sharking4.webp';
import f5 from '../../assets/FacetoFace/sharking5.webp';
import f6 from '../../assets/FacetoFace/sharking6.webp';
import f07 from '../../assets/FacetoFace/sharking07.webp';
import f8 from '../../assets/FacetoFace/sharking8.webp';

// Real Home Decor Project Assets
import h1 from '../../assets/HomeDec/h1.webp';
import h2 from '../../assets/HomeDec/h2.webp';
import h3 from '../../assets/HomeDec/h3.webp';
import h4 from '../../assets/HomeDec/h4.webp';
import h5 from '../../assets/HomeDec/h5.webp';
import h6 from '../../assets/HomeDec/h6.webp';
import h7 from '../../assets/HomeDec/h7.webp';
import h8 from '../../assets/HomeDec/h8.webp';

// Real Sofa Decor Project Assets
import s1 from '../../assets/SofaDec/s1.webp';
import s2 from '../../assets/SofaDec/s2.webp';
import s3 from '../../assets/SofaDec/s3.webp';

// 100% Real Projects Catalog matching ProjectPage.jsx
const PROJECTS_DATA = [
  {
    id: 1,
    category: 'COMMERCIAL',
    branch: 'MADURAI BRANCH',
    image: b3,
    title: 'Billionaires VIP Styling Bay',
    description: 'Exclusive workstation bays crafted with polished marble countertops, recessed LED ambient backlighting, and custom leather seating in Madurai.',
    tags: ['VIP Suite', 'Ambient Lighting', 'Marble Countertops', 'Commercial'],
    architect: 'R. K. SIVANESH',
    sqft: '1,800 SQ. FT.',
    gallery: [b1, b2, b3, b4, b5, b6, b7, b8]
  },
  {
    id: 2,
    category: 'COMMERCIAL',
    branch: 'RAMANATHAPURAM BRANCH',
    image: f3,
    title: 'Face to Face Reception Lounge',
    description: 'Welcoming reception and styling lounge featuring soft ceiling cove illumination, marble islands, and custom branding displays in Ramanathapuram.',
    tags: ['Reception Lounge', 'Cove Lighting', 'Styling Islands', 'Commercial'],
    architect: 'A. MEERA',
    sqft: '1,600 SQ. FT.',
    gallery: [f1, f01, f3, f4, f5, f6, f07, f8]
  },
  {
    id: 3,
    category: 'RESIDENTIAL',
    branch: 'MADURAI & RAMNAD',
    image: h4,
    title: 'Home Decor & Living Suite',
    description: 'An elegant residential suite showcasing custom decorative wall fluting, curated living room furniture, and bespoke ambient LED lighting.',
    tags: ['Home Decor', 'Residential Living', 'Wall Fluting', 'Ambient Lighting'],
    architect: 'R. K. SIVANESH',
    sqft: '3,100 SQ. FT.',
    gallery: [h1, h2, h3, h4, h5, h6, h7, h8]
  },
  {
    id: 4,
    category: 'RESIDENTIAL',
    branch: 'MADURAI & RAMNAD',
    image: s1,
    title: 'Custom Sofa & Lounge Collection',
    description: 'Handcrafted luxury sofa and upholstery lounge suite featuring ergonomic seating, premium velvet finishes, and bespoke living room aesthetics.',
    tags: ['Sofa Decor', 'Custom Upholstery', 'Luxury Lounge', 'Living Room'],
    architect: 'A. MEERA',
    sqft: '2,200 SQ. FT.',
    gallery: [s1, s2, s3]
  },
  {
    id: 5,
    category: 'COMMERCIAL',
    branch: 'MADURAI BRANCH',
    image: b1,
    title: 'Billionaires Luxury Studio',
    description: 'A high-end salon and spa project designed and built in Madurai featuring custom lighted mirrors, smooth wall finishes, and comfortable styling stations.',
    tags: ['Luxury Salon', 'Madurai Studio', 'Lighted Mirrors', 'Gold Hardware'],
    architect: 'R. K. SIVANESH',
    sqft: '3,500 SQ. FT.',
    gallery: [b1, b2, b3, b4, b5, b6, b7, b8]
  },
  {
    id: 6,
    category: 'COMMERCIAL',
    branch: 'RAMANATHAPURAM BRANCH',
    image: f1,
    title: 'Face to Face Wellness Studio',
    description: 'A complete beauty and wellness studio completed in Ramanathapuram. Built with practical styling layouts, soft relaxing lighting, and clean finishes.',
    tags: ['Wellness Studio', 'Ramanathapuram', 'Relaxing Lighting', 'Clean Finishes'],
    architect: 'A. MEERA',
    sqft: '2,800 SQ. FT.',
    gallery: [f1, f01, f3, f4, f5, f6, f07, f8]
  },
  {
    id: 7,
    category: 'RESIDENTIAL',
    branch: 'MADURAI & RAMNAD',
    image: h1,
    title: 'Modern Wall Paneling & Fluting',
    description: 'High-contrast decorative wall fluting, integrated warm LED channels, and bespoke luxury console styling for family living halls.',
    tags: ['Wall Paneling', 'LED Channels', 'Console Decor', 'Living Room'],
    architect: 'R. K. SIVANESH',
    sqft: '2,400 SQ. FT.',
    gallery: [h1, h2, h3, h4, h5, h6, h7, h8]
  },
  {
    id: 8,
    category: 'RESIDENTIAL',
    branch: 'MADURAI & RAMNAD',
    image: s2,
    title: 'Ergonomic Sectional Living Lounge',
    description: 'Hand-tailored modular living room sofa suite designed with high-resilience foam, brass legs, and stain-resistant luxury fabrics.',
    tags: ['Sectional Sofa', 'Brass Legs', 'Living Room', 'Madurai & Ramnad'],
    architect: 'A. MEERA',
    sqft: '2,000 SQ. FT.',
    gallery: [s1, s2, s3]
  }
];

// Exact Previous 3D Perspective Card Component
const ProjectCard = memo(function ProjectCard({ project, onClick, cardStyle, isActive }) {
  return (
    <div
      onClick={onClick}
      style={cardStyle}
      className={`absolute w-[240px] sm:w-[300px] md:w-[340px] aspect-[3/4] bg-[#121622] rounded-2xl border overflow-hidden shadow-2xl transition-all duration-500 ease-out cursor-pointer select-none group touch-manipulation hover:-translate-y-1.5 ${
        isActive
          ? 'border-[#c5a059]/70 ring-1 ring-[#c5a059]/50 shadow-[0_20px_50px_rgba(0,0,0,0.7)]'
          : 'border-white/10 hover:border-white/30 opacity-75'
      }`}
    >
      {/* Image background showcase */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-black/50">
        <img
          src={project.image}
          alt={project.title}
          width="360"
          height="480"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-transform duration-500 ease-out pointer-events-none"
        />

        {/* Soft gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 z-10 pointer-events-none" />

        {/* Top Pill Bar (Exact Original Style) */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <span className="bg-black/60 backdrop-blur-md text-[#c5a059] border border-[#c5a059]/30 px-3.5 py-1.5 rounded-full text-[11px] font-sans font-extrabold tracking-[0.2em] uppercase shadow-sm">
            {project.category}
          </span>
        </div>
      </div>

      {/* Clean Minimalist Bottom Details Panel (Exact Original Style) */}
      <div className="absolute bottom-0 inset-x-0 z-20 p-6 flex flex-col justify-end space-y-3 pointer-events-none">

        {/* Project Subtitle & Architect */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[11px] font-sans font-semibold text-white/70 tracking-widest uppercase">
            <span>{project.sqft}</span>
            <span>•</span>
            <span>{project.architect}</span>
          </div>
          <h3 className="font-display text-xl md:text-2xl font-semibold text-luxury-cream leading-snug group-hover:text-[#c5a059] transition-colors duration-300">
            {project.title}
          </h3>
        </div>

        {/* Clean Action CTA Pill (Visible on Active Focused Card) */}
        <div className="pt-1 flex items-center justify-between border-t border-white/10">
          {isActive ? (
            <span className="inline-flex items-center gap-1.5 text-[12px] font-sans font-extrabold tracking-[0.18em] text-[#c5a059] uppercase group-hover:text-white transition-colors">
              <span>View Case Study</span>
              <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          ) : (
            <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-white/50 uppercase">
              Click to inspect
            </span>
          )}

          <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${isActive ? 'bg-[#c5a059] shadow-[0_0_8px_#c5a059]' : 'bg-white/20'}`} />
        </div>

      </div>
    </div>
  );
});

function ProjectGlimpse({ onNavigate }) {
  useScrollReveal();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeModalImgIdx, setActiveModalImgIdx] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  const categories = ['ALL', 'RESIDENTIAL', 'COMMERCIAL'];

  const filteredProjects = useMemo(() => {
    return activeCategory === 'ALL'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Keyboard shortcut (Escape & Arrows) & scroll lock for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') {
        setSelectedProject(null);
        document.body.style.overflow = '';
      } else if (e.key === 'ArrowRight') {
        setActiveModalImgIdx((prev) => (prev + 1) % selectedProject.gallery.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveModalImgIdx((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  // Resize listener for responsive 3D perspective adjustments
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset active index when category changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  // AUTOMATIC RIGHT-TO-LEFT CONTINUOUS LOOP TIMER (Advances every 2.8s)
  useEffect(() => {
    if (selectedProject || filteredProjects.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
    }, 2800);

    return () => clearInterval(timer);
  }, [selectedProject, filteredProjects.length]);

  // 3D Perspective Card Transform Calculation with Shortest Cyclic Distance for Infinite Right-to-Left Loop
  const getCardTransform = useCallback(
    (idx) => {
      const total = filteredProjects.length;
      let offset = idx - activeIndex;

      // Shortest cyclic wrap-around so cards cycle continuously in a 3D loop
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      const absOffset = Math.abs(offset);

      // X separation: 380px on desktop, 270px on mobile
      const stepX = isDesktop ? 380 : 270;
      const tx = offset * stepX;

      // Z depth pushback for curved 3D gallery effect
      const stepZ = isDesktop ? 120 : 70;
      const tz = -absOffset * stepZ;

      // Gentle Y-axis rotation toward center
      const maxRotY = 18;
      const ry = offset === 0 ? 0 : offset > 0 ? -maxRotY : maxRotY;

      // Scale reduction for distant cards
      const scale = 1 - Math.min(absOffset * 0.12, 0.3);

      // Opacity fade for far cards
      const opacity = absOffset > 2 ? 0 : absOffset === 0 ? 1 : absOffset === 1 ? 0.85 : 0.4;

      return {
        transform: `perspective(1200px) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
        opacity: opacity,
        zIndex: 100 - Math.round(absOffset * 10),
        pointerEvents: absOffset > 2 ? 'none' : 'auto',
        transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.75s ease-out',
        willChange: 'transform, opacity'
      };
    },
    [activeIndex, isDesktop, filteredProjects.length]
  );

  const handleCardClick = useCallback(
    (project, idx) => {
      if (idx !== activeIndex) {
        setActiveIndex(idx);
      } else {
        setSelectedProject(project);
        setActiveModalImgIdx(0);
        document.body.style.overflow = 'hidden';
      }
    },
    [activeIndex]
  );

  const closeProjectModal = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  }, []);

  const handleExploreAllClick = useCallback(() => {
    if (selectedProject) {
      document.body.style.overflow = '';
      setSelectedProject(null);
    }
    if (onNavigate) {
      onNavigate('projects');
    } else {
      window.history.pushState({ page: 'projects' }, '', '/projects');
    }
  }, [selectedProject, onNavigate]);

  return (
    <>
      <section
        id="projects"
        className="relative z-30 bg-[#0a0c10] text-[#fbf9f6] py-12 sm:py-16 px-4 sm:px-8 md:px-16 lg:px-24 overflow-hidden border-t border-white/5"
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

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8 reveal-3d-popup">
            <div className="space-y-4 max-w-2xl">
              <span className="font-sans text-xs md:text-sm font-extrabold tracking-[0.35em] text-[#838f6f] uppercase">
                SIGNATURE SHOWCASE
              </span>
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-medium text-luxury-cream leading-tight uppercase tracking-wider">
                Our Masterpiece Portfolios
              </h2>
              <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed font-medium">
                Explore custom spaces hand-engineered in Madurai and Ramanathapuram. Click cards to view full project showcases.
              </p>
            </div>

            <button
              onClick={handleExploreAllClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#c5a059] text-black font-sans text-xs font-extrabold tracking-widest uppercase hover:bg-white hover:text-[#710014] transition-all duration-300 shadow-md cursor-pointer self-start md:self-end touch-manipulation group flex-shrink-0"
            >
              <span>View All Projects</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>

          {/* Filter row */}
          <div className="flex justify-center border-b border-white/5 pt-4">
            <div className="bg-white/5 border border-white/10 p-1 rounded-none flex flex-nowrap overflow-x-auto scrollbar-none gap-2 shadow-sm max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-none font-sans text-xs sm:text-sm font-extrabold tracking-widest uppercase transition-all duration-200 flex-shrink-0 touch-manipulation cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#838f6f] text-white shadow-md'
                      : 'bg-transparent text-white/50 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 3D Perspective Curved Container Automatically Moving Right to Left in Loop */}
          <div className="relative w-full h-[450px] md:h-[560px] flex items-center justify-center overflow-visible my-2">

            {/* Center horizontal gold alignment line */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="w-[102%] h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/20 to-transparent" />
            </div>

            {/* 3D Cards Deck */}
            <div className="relative w-full h-full flex items-center justify-center overflow-visible [transform-style:preserve-3d]">
              {filteredProjects.map((project, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <div
                    key={project.id}
                    className="transition-all duration-300 transform"
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

            {/* Left & Right Interactive Navigation Chevrons */}
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)}
              aria-label="Previous Project"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#c5a059] hover:text-black text-white border border-white/15 flex items-center justify-center transition-all cursor-pointer shadow-xl z-30 touch-manipulation"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % filteredProjects.length)}
              aria-label="Next Project"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#c5a059] hover:text-black text-white border border-white/15 flex items-center justify-center transition-all cursor-pointer shadow-xl z-30 touch-manipulation"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

          </div>

          {/* Indicator dots below ring */}
          <div className="flex justify-center items-center gap-3">
            {filteredProjects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Show project 0${idx + 1}`}
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-all duration-200 cursor-pointer touch-manipulation ${
                  idx === activeIndex
                    ? 'border-[#c5a059] bg-[#c5a059]/10 scale-110'
                    : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    idx === activeIndex ? 'bg-[#c5a059] scale-100' : 'bg-transparent scale-0'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Bottom Action CTA */}
          <div className="flex justify-center pt-6">
            <button
              onClick={handleExploreAllClick}
              className="relative px-9 py-3.5 bg-white text-luxury-charcoal font-sans text-xs uppercase tracking-[0.2em] font-bold overflow-hidden group transition-all duration-300 shadow-[0_15px_30px_rgba(255,255,255,0.05)] rounded-full hover:shadow-[0_15px_35px_rgba(255,255,255,0.1)] touch-manipulation cursor-pointer"
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
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 md:p-10 transition-all duration-200">
          {/* Top Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 z-20">
            <div className="space-y-1">
              <span className="font-sans text-xs md:text-sm font-extrabold tracking-[0.3em] text-[#c5a059] uppercase block">
                {selectedProject.category} • {selectedProject.branch}
              </span>
              <h3 className="font-display text-2xl sm:text-4xl font-semibold text-luxury-cream uppercase tracking-wider">
                {selectedProject.title}
              </h3>
            </div>

            <button
              onClick={closeProjectModal}
              aria-label="Close Lightbox"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-white/10 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg touch-manipulation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main Stage: Large Visible Image Display with Gallery Carousel */}
          <div className="relative flex-1 w-full my-4 flex items-center justify-center overflow-hidden rounded-2xl bg-[#08090d] border border-white/10">
            <img
              src={selectedProject.gallery[activeModalImgIdx] || selectedProject.image}
              alt={`${selectedProject.title} ${activeModalImgIdx + 1}`}
              width="1200"
              height="800"
              decoding="async"
              className="w-full h-full object-contain max-h-[65vh] md:max-h-[72vh] transition-all duration-300"
            />

            {/* Navigation Arrows for Gallery */}
            {selectedProject.gallery.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalImgIdx((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
                  }}
                  aria-label="Previous Photo"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#c5a059] hover:text-black text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-xl z-20 touch-manipulation"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalImgIdx((prev) => (prev + 1) % selectedProject.gallery.length);
                  }}
                  aria-label="Next Photo"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#c5a059] hover:text-black text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-xl z-20 touch-manipulation"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </>
            )}

            {/* Gallery Thumbnail Preview Bar */}
            {selectedProject.gallery.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 max-w-[90%] overflow-x-auto z-20">
                {selectedProject.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveModalImgIdx(i)}
                    className={`w-12 h-9 rounded-md overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                      activeModalImgIdx === i ? 'border-[#c5a059] scale-105' : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Bar: Information & Direct Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/10 pt-4">
            <div className="space-y-1">
              <p className="font-sans text-xs sm:text-sm text-white/85 max-w-2xl leading-relaxed">
                {selectedProject.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedProject.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-sans font-semibold text-[#c5a059] bg-[#c5a059]/10 px-2.5 py-0.5 rounded border border-[#c5a059]/20">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleExploreAllClick}
              className="px-6 py-2.5 bg-[#c5a059] text-black hover:bg-white hover:text-[#710014] transition-all font-sans text-xs font-extrabold uppercase tracking-widest rounded-full shadow-lg flex items-center gap-2 flex-shrink-0 cursor-pointer touch-manipulation"
            >
              <span>Explore All On Projects Page</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(ProjectGlimpse);
