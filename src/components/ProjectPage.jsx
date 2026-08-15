import { useState, useEffect, useCallback, memo } from 'react';

// Billionaires Project Assets
import b1 from '../assets/Billionaires/sharking1.webp';
import b2 from '../assets/Billionaires/sharking2.webp';
import b3 from '../assets/Billionaires/sharking3.webp';
import b4 from '../assets/Billionaires/sharking4.webp';
import b5 from '../assets/Billionaires/sharking5.webp';
import b6 from '../assets/Billionaires/sharking6.webp';
import b7 from '../assets/Billionaires/sharking7.webp';
import b8 from '../assets/Billionaires/sharking8.webp';

// Face to Face Project Assets
import f1 from '../assets/FacetoFace/sharking1.webp';
import f01 from '../assets/FacetoFace/sharking01.webp';
import f3 from '../assets/FacetoFace/sharking3.webp';
import f4 from '../assets/FacetoFace/sharking4.webp';
import f5 from '../assets/FacetoFace/sharking5.webp';
import f6 from '../assets/FacetoFace/sharking6.webp';
import f07 from '../assets/FacetoFace/sharking07.webp';
import f8 from '../assets/FacetoFace/sharking8.webp';

// Home Decor Project Assets
import h1 from '../assets/HomeDec/h1.jpg';
import h2 from '../assets/HomeDec/h2.jpg';
import h3 from '../assets/HomeDec/h3.jpg';
import h4 from '../assets/HomeDec/h4.jpg';
import h5 from '../assets/HomeDec/h5.jpg';
import h6 from '../assets/HomeDec/h6.jpg';
import h7 from '../assets/HomeDec/h7.jpg';
import h8 from '../assets/HomeDec/h8.jpg';
import h9 from '../assets/HomeDec/h9.jpg';
import h10 from '../assets/HomeDec/h10.jpg';
import h11 from '../assets/HomeDec/h11.jpg';
import h12 from '../assets/HomeDec/h12.jpg';
import h13 from '../assets/HomeDec/h13.jpg';
import h14 from '../assets/HomeDec/h14.jpg';
import h15 from '../assets/HomeDec/h15.jpg';
import h16 from '../assets/HomeDec/h16.jpg';

// Sofa Decor Project Assets
import s1 from '../assets/SofaDec/s1.jpg';
import s2 from '../assets/SofaDec/s2.jpg';
import s3 from '../assets/SofaDec/s3.jpg';

const PROJECTS_DATA = [
  {
    id: 'billionaires-project',
    title: 'Billionaires Project',
    category: 'LUXURY SALON & SPA',
    description: 'A high-end salon and spa project we designed and built in Madurai. Features custom lighted mirrors, smooth wall finishes, and comfortable styling stations tailored for a premium client experience.',
    coverImage: b1,
    gallery: [b1, b2, b3, b4, b5, b6, b7, b8]
  },
  {
    id: 'faceto-face-project',
    title: 'Face to Face Project',
    category: 'COMMERCIAL SALON ARCHITECTURE',
    description: 'A complete beauty and wellness studio completed in Ramanathapuram. Built with practical styling layouts, soft relaxing lighting, and clean finishes for a welcoming, calm space.',
    coverImage: f1,
    gallery: [f1, f01, f3, f4, f5, f6, f07, f8]
  },
  {
    id: 'home-decor-project',
    title: 'Home Decor & Interior Showcase',
    category: 'RESIDENTIAL DECOR & INTERIORS',
    description: 'A comprehensive home decor and bespoke interior project showcasing elegant residential spaces, custom wall accents, curated furniture styling, and luxury interior finishing.',
    coverImage: h4,
    gallery: [h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16]
  },
  {
    id: 'sofa-decor-project',
    title: 'Custom Sofa & Lounge Collection',
    category: 'LUXURY FURNITURE & SOFA DECOR',
    description: 'A handcrafted custom sofa and living lounge interior suite featuring premium upholstery, ergonomic sectional designs, and tailored living room aesthetics.',
    coverImage: s1,
    gallery: [s1, s2, s3]
  }
];

function ProjectPage({ onNavigate }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') {
        setSelectedProject(null);
        document.body.style.overflow = '';
      } else if (e.key === 'ArrowRight') {
        setActiveGalleryIndex((prev) => (prev + 1) % selectedProject.gallery.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveGalleryIndex((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const openProjectModal = useCallback((proj) => {
    setSelectedProject(proj);
    setActiveGalleryIndex(0);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeProjectModal = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  }, []);

  const handleContactNavigate = useCallback(() => {
    onNavigate('landing');
    setTimeout(() => {
      const el = document.querySelector('#get-in-touch');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }, [onNavigate]);

  const prevGalleryImg = useCallback(() => {
    if (!selectedProject) return;
    setActiveGalleryIndex((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
  }, [selectedProject]);

  const nextGalleryImg = useCallback(() => {
    if (!selectedProject) return;
    setActiveGalleryIndex((prev) => (prev + 1) % selectedProject.gallery.length);
  }, [selectedProject]);

  return (
    <div className="min-h-screen bg-[#f9f8f4] text-[#1a1a1a] font-sans selection:bg-[#710014] selection:text-white relative overflow-x-hidden">
      
      {/* Background Architectural Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000000 1px, transparent 1px),
            linear-gradient(to bottom, #000000 1px, transparent 1px)
          `,
          backgroundSize: '35px 35px'
        }}
      />

      {/* Clean Navbar Header */}
      <header className="w-full bg-[#f9f8f4]/90 backdrop-blur-md border-b border-[#e5e0d3] sticky top-0 z-50 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-5 sm:px-12 flex items-center justify-between">
          
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 font-sans text-xs font-bold tracking-[0.2em] text-[#1a1a1a] hover:text-[#710014] transition-colors uppercase cursor-pointer focus:outline-none group touch-manipulation"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform text-[#710014]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span>HOME</span>
          </button>

          {/* Clean Typography Title */}
          <div className="text-center">
            <span className="font-display text-sm sm:text-base tracking-[0.3em] font-light text-[#1a1a1a] uppercase">
              SHARKINGS <span className="text-[#710014] font-normal">INTERIORS & EXTERIORS</span>
            </span>
          </div>

          <button
            onClick={handleContactNavigate}
            className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#710014] text-white text-[10px] font-sans font-bold tracking-wider uppercase hover:bg-[#580010] transition-colors cursor-pointer shadow-sm touch-manipulation"
          >
            CONTACT US
          </button>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-5 sm:px-12 lg:px-16 py-8 sm:py-12 space-y-8 sm:space-y-10 relative z-10">
        
        {/* Title Block */}
        <div className="space-y-3 border-b border-[#e5e0d3] pb-6">
          <span className="font-sans text-[10px] sm:text-xs font-bold tracking-[0.35em] text-[#710014] uppercase block">
            SIGNATURE SHOWCASES
          </span>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light text-[#1a1a1a] leading-tight uppercase tracking-wider">
            Our Masterpieces
          </h1>

          <p className="font-sans text-xs sm:text-sm text-[#4a4a4a] leading-relaxed font-normal max-w-2xl">
            A showcase of signature residences and commercial spaces crafted across Madurai and Ramanathapuram. Select any project to explore the complete gallery and design story.
          </p>
        </div>

        {/* 2-COLUMN CLIENT PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PROJECTS_DATA.map((proj) => (
            <div
              key={proj.id}
              onClick={() => openProjectModal(proj)}
              className="bg-white border border-[#e5e0d3] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group cursor-pointer flex flex-col justify-between touch-manipulation"
            >
              <div className="space-y-4 p-5 sm:p-6">
                
                {/* Cover Image */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#eee9df]">
                  <img
                    src={proj.coverImage}
                    alt={proj.title}
                    width="800"
                    height="500"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-white text-[10px] font-sans font-bold tracking-widest px-3 py-1.5 uppercase rounded shadow flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-[#c5a059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{proj.gallery.length} PHOTOS</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <span className="text-[10px] font-sans font-bold tracking-widest text-[#710014] uppercase block">
                    {proj.category}
                  </span>

                  <h3 className="font-display text-2xl font-light text-[#1a1a1a] uppercase group-hover:text-[#710014] transition-colors">
                    {proj.title}
                  </h3>

                  <p className="font-sans text-xs text-[#555555] font-normal leading-relaxed">
                    {proj.description}
                  </p>
                </div>

              </div>

              {/* Card Footer Button */}
              <div className="px-5 sm:px-6 pb-6 pt-2">
                <button className="w-full py-3 bg-[#710014] text-white text-xs font-sans font-bold tracking-widest uppercase hover:bg-[#580010] transition-colors shadow-sm text-center cursor-pointer rounded-none touch-manipulation">
                  INSPECT PROJECT GALLERY →
                </button>
              </div>

            </div>
          ))}
        </div>

      </main>

      {/* Full-Screen Exhibition Split Showcase Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] bg-[#0a0c10]/95 backdrop-blur-3xl flex flex-col lg:flex-row overflow-hidden transition-all duration-500">

          {/* LEFT SIDEBAR / MOBILE TOP SHEET: Info Panel */}
          <div className="w-full lg:w-[35%] xl:w-[32%] bg-[#f9f8f4] border-b lg:border-b-0 lg:border-r border-[#e5e0d3] p-6 sm:p-10 flex flex-col justify-between overflow-y-auto z-10 text-[#1a1a1a] max-h-[50vh] lg:max-h-full">

            <div className="space-y-6 sm:space-y-8">
              {/* Back Button */}
              <button
                onClick={closeProjectModal}
                className="flex items-center gap-2 font-sans text-xs font-bold tracking-[0.2em] text-[#555555] hover:text-[#710014] transition-colors uppercase cursor-pointer focus:outline-none touch-manipulation"
              >
                <svg className="w-4 h-4 text-[#710014]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span>BACK TO PORTFOLIO</span>
              </button>

              {/* Info Details */}
              <div className="space-y-3 sm:space-y-4 pt-1">
                <span className="font-sans text-[10px] font-bold tracking-[0.35em] text-[#710014] uppercase block">
                  {selectedProject.category}
                </span>

                <h2 className="font-display text-2xl sm:text-4xl font-light text-[#1a1a1a] leading-tight uppercase tracking-wider">
                  {selectedProject.title}
                </h2>

                <p className="font-sans text-xs sm:text-sm text-[#555555] leading-relaxed font-normal pt-1">
                  {selectedProject.description}
                </p>

                {/* Thumbnail Strip */}
                {selectedProject.gallery.length > 1 && (
                  <div className="pt-4 border-t border-[#e5e0d3] space-y-2">
                    <span className="text-[10px] font-sans font-bold tracking-wider text-[#710014] uppercase block">
                      PROJECT GALLERY ({selectedProject.gallery.length} PHOTOS)
                    </span>
                    <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                      {selectedProject.gallery.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveGalleryIndex(idx)}
                          className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 touch-manipulation ${
                            activeGalleryIndex === idx ? 'border-[#710014] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={imgUrl}
                            alt={`Thumb ${idx + 1}`}
                            width="100"
                            height="70"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Footer Info */}
            <div className="hidden sm:flex items-center justify-between pt-6 border-t border-[#e5e0d3] font-sans text-[10px] tracking-widest text-[#777777] uppercase">
              <span>SHARKINGS INTERIORS & EXTERIORS</span>
              <span className="font-bold text-[#710014]">
                0{activeGalleryIndex + 1} / 0{selectedProject.gallery.length}
              </span>
            </div>

          </div>

          {/* RIGHT SIDE: Full Gallery Media Stage */}
          <div className="w-full lg:w-[65%] xl:w-[68%] h-[50vh] lg:h-full relative bg-black overflow-hidden flex items-center justify-center">

            {/* Gallery Image */}
            <img
              src={selectedProject.gallery[activeGalleryIndex]}
              alt={selectedProject.title}
              width="1200"
              height="800"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-all duration-500 ease-out"
            />

            {/* Close Button Top Right for Mobile */}
            <button
              onClick={closeProjectModal}
              aria-label="Close Modal"
              className="lg:hidden absolute top-4 right-4 w-9 h-9 rounded-full bg-black/80 text-white flex items-center justify-center backdrop-blur-md focus:outline-none touch-manipulation"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Arrows at Bottom Right */}
            <div className="absolute bottom-6 right-6 flex items-center gap-3 z-30">
              <button
                onClick={prevGalleryImg}
                aria-label="Previous Image"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:border-[#710014] hover:bg-[#710014] transition-all duration-300 cursor-pointer focus:outline-none touch-manipulation"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <button
                onClick={nextGalleryImg}
                aria-label="Next Image"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:border-[#710014] hover:bg-[#710014] transition-all duration-300 cursor-pointer focus:outline-none touch-manipulation"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Footer */}
      <footer className="w-full bg-[#38000a] text-white py-8 px-6 md:px-16 border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-xs tracking-widest text-[#c5a059] uppercase">
              SHARKINGS INTERIORS & EXTERIORS • MADURAI & RAMANATHAPURAM
            </span>
          </div>

          <div className="font-sans text-xs text-white/60">
            © {new Date().getFullYear()} Sharkings Interiors & Exteriors. All Rights Reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}

export default memo(ProjectPage);

