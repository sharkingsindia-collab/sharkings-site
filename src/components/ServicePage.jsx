import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

import turnkeyImg from '../assets/turnkey.webp';
import modularKitchenImg from '../assets/modular-kitchen.webp';
import containerInteriorImg from '../assets/container-interior.webp';
import containerCafeImg from '../assets/container-cafe.webp';
import containerHomesImg from '../assets/container-homes.webp';
import falseCeilingImg from '../assets/false-ceiling-work.webp';
import wardrobeImg from '../assets/wardrobe.webp';
import homeInteriorImg from '../assets/home-interior.webp';
import acpElevationImg from '../assets/ACP-elevation.webp';
import aluminiumPartitionImg from '../assets/aluminium-partition.webp';
import officeInteriorImg from '../assets/office-interior.webp';
import salonInteriorImg from '../assets/salon-interior.webp';

const SERVICES_CATALOG = [
  {
    id: 'turnkey',
    category: 'RESIDENTIAL & COMMERCIAL',
    categoryGroup: 'RESIDENTIAL',
    title: 'Turnkey Projects',
    badge: 'SHARKINGS STUDIO',
    description: 'We deliver complete turnkey interior projects from concept to completion, managing every detail efficiently. Our team handles design, materials, labor, and supervision to ensure seamless execution. We focus on timely delivery and adherence to budget. Each project reflects high-quality workmanship and modern design standards. Our turnkey solutions provide a hassle-free experience for clients.',
    image: turnkeyImg
  },
  {
    id: 'modular-kitchen',
    category: 'MODULAR KITCHENS',
    categoryGroup: 'MODULAR',
    title: 'Modular Kitchen',
    badge: 'SHARKINGS KITCHEN',
    description: 'We design and install modern modular kitchens that are both stylish and functional. Our layouts maximize space and provide smart storage solutions. We use high-quality materials and durable fittings for long-lasting performance. Each kitchen is customized to match the client’s taste and lifestyle. Our installations combine elegance, efficiency, and convenience.',
    image: modularKitchenImg
  },
  {
    id: 'container-interior',
    category: 'CONTAINER ARCHITECTURE',
    categoryGroup: 'CONTAINER',
    title: 'Container Interior',
    badge: 'SHARKINGS ECO',
    description: 'We transform containers into stylish and fully functional interior spaces. These can be used for offices, shops, homes, or cafes. Our services include customized layouts, proper insulation, lighting, and electrical work. Container interiors are cost-effective, modern, and quick to execute. We ensure durable and aesthetically pleasing results for every project.',  
    image: containerInteriorImg
  },
  {
    id: 'container-cafe',
    category: 'COMMERCIAL DESIGN',
    categoryGroup: 'CONTAINER',
    title: 'Container Cafe',
    badge: 'SHARKINGS STUDIO',
    image: containerCafeImg,
    description: 'We design attractive container cafés that combine modern aesthetics with practical layouts. Our team handles interiors, seating, lighting, and plumbing solutions. The structures are weather-resistant and built to last. Each cafe is designed to create a welcoming environment for customers. Ideal for startups and unique business ventures.',
  },
  {
    id: 'container-homes',
    category: 'MODULAR RESIDENCES',
    categoryGroup: 'CONTAINER',
    title: 'Container Homes',
    badge: 'SHARKINGS RESIDENCE',
    description: 'We create innovative container homes that are stylish, durable, and eco-friendly. Our designs include functional interiors with proper insulation and modern layouts. Kitchens and bathrooms are planned for comfort and efficiency. Container homes are affordable and customizable to client needs. Perfect for residential or vacation living spaces.',
    image: containerHomesImg
  },
  {
    id: 'false-ceiling',
    category: 'LIGHTING & CEILINGS',
    categoryGroup: 'SPECIALTY',
    title: 'False Ceiling Work',
    badge: 'CEILING WORK',
    description: 'We provide elegant false ceiling solutions that enhance the look and feel of interiors. Our services include gypsum and POP ceiling designs with integrated lighting. False ceilings conceal wiring and improve insulation. We offer modern patterns and durable finishes to suit any décor. Professional installation ensures lasting quality and aesthetics.',
    image: falseCeilingImg
  },
  {
    id: 'wardrobe',
    category: 'MODULAR STORAGE',
    categoryGroup: 'MODULAR',
    title: 'Wardrobe Suite',
    badge: 'MODULAR STORAGE',
    description: 'We design custom wardrobes that maximize storage while enhancing room aesthetics. Options include sliding or hinged doors with premium finishes. Smart compartments and durable fittings make organization easy. Each wardrobe is tailored to fit the client’s space perfectly. We focus on creating functional and stylish storage solutions.',
    image: wardrobeImg
  },
  {
    id: 'home-interior',
    category: 'PRIVATE RESIDENCES',
    categoryGroup: 'RESIDENTIAL',
    title: 'Home Interior',
    badge: 'FULL VILLA',
    description: 'We provide complete home interior solutions for a modern, comfortable, and elegant living space. Our services include furniture, lighting, ceiling design, and decor. We carefully plan layouts to optimize functionality and aesthetics. Each home is customized to reflect the client’s taste and lifestyle. Quality workmanship ensures a beautiful and durable finish.',
    image: homeInteriorImg
  },
  {
    id: 'acp-elevation',
    category: 'EXTERIOR FACADES',
    categoryGroup: 'SPECIALTY',
    title: 'ACP Elevation',
    badge: 'FACADE DESIGN',
    description: 'We design modern ACP (Aluminium Composite Panel) elevations to enhance the exterior of buildings. Our panels are durable, weather-resistant, and visually appealing. Customized colors, textures, and patterns are available to match the client’s style. We focus on quality installation and precise finishing. ACP elevation works add a premium look to any property.',
    image: acpElevationImg
  },
  {
    id: 'aluminium-partition',
    category: 'OFFICE SPACES',
    categoryGroup: 'COMMERCIAL',
    title: 'Aluminium Partition',
    badge: 'OFFICE LAYOUT',
    description: 'We install high-quality aluminium partitions for offices, commercial spaces, and interiors. Options include glass panels, solid panels, and customizable layouts. Our partitions are lightweight, durable, and professional in appearance. They help organize spaces efficiently while enhancing aesthetics. We provide precise installation for modern, functional interiors.',
    image: aluminiumPartitionImg
  },
  {
    id: 'office-interior',
    category: 'CORPORATE WORKSPACE',
    categoryGroup: 'COMMERCIAL',
    title: 'Office Interior',
    badge: 'CORPORATE STUDIO',
    description: 'We create modern and professional office interiors designed for comfort and productivity. Our services include workstations, cabins, conference rooms, lighting, and furniture solutions. We focus on efficient layouts and elegant designs. High-quality materials ensure durability and style. Complete turnkey solutions deliver a hassle-free office setup.',
    image: officeInteriorImg
  },
  {
    id: 'salon-interior',
    category: 'RETAIL & COMMERCIAL',
    categoryGroup: 'COMMERCIAL',
    title: 'Salon Interior',
    badge: 'COMMERCIAL ATELIER',
    description: 'We design stylish and functional salon interiors that create a luxurious experience for clients. Our services include reception areas, styling stations, lighting, and décor. Space is planned efficiently for both staff and clients. Durable finishes and modern designs ensure long-lasting aesthetics. We deliver complete interior solutions to make salons visually appealing and comfortable.',
    image: salonInteriorImg
  }
];

function ServicePage({ onNavigate }) {
  useScrollReveal();
  const [selectedServiceIdx, setSelectedServiceIdx] = useState(0);

  const activeService = useMemo(
    () => SERVICES_CATALOG[selectedServiceIdx] || SERVICES_CATALOG[0],
    [selectedServiceIdx]
  );

  const selectService = useCallback((globalIdx) => {
    setSelectedServiceIdx(globalIdx);
    if (window.innerWidth < 1024) {
      const stageEl = document.querySelector('#service-stage-target');
      if (stageEl) {
        stageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  const handleContactNavigate = useCallback(() => {
    onNavigate('landing');
    setTimeout(() => {
      const el = document.querySelector('#get-in-touch');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }, [onNavigate]);

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

      {/* Clean & Aesthetic Navbar */}
      <header className="w-full bg-[#f9f8f4]/90 backdrop-blur-md border-b border-[#e5e0d3] sticky top-0 z-50 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-5 sm:px-12 flex items-center justify-between">
          
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 font-sans text-xs font-bold tracking-[0.2em] text-[#1a1a1a] hover:text-[#710014] transition-colors uppercase cursor-pointer focus:outline-none group touch-manipulation"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform text-[#710014]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span>HOME</span>
          </button>

          {/* Clean Typography Brand Title */}
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
      <main className="max-w-7xl mx-auto px-5 sm:px-12 lg:px-16 py-8 sm:py-12 space-y-8 relative z-10">

        {/* Title Block */}
        <section className="space-y-3 border-b border-[#e5e0d3] pb-6">
          <span className="font-sans text-xs sm:text-sm font-extrabold tracking-[0.35em] text-[#710014] uppercase block">
            WHAT WE DO
          </span>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1a1a1a] leading-tight uppercase tracking-wider">
            Architectural Services
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#333333] leading-relaxed font-medium max-w-2xl">
            Explore our complete range of custom home interiors, modular kitchens, and commercial projects across Madurai and Ramanathapuram.
          </p>
        </section>

        {/* MOBILE INSTANT SELECTOR BAR (< lg) */}
        <section className="lg:hidden space-y-3 bg-white border border-[#e5e0d3] p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between font-sans text-xs font-bold text-[#710014]">
            <span className="uppercase tracking-wider">Tap Service to Inspect ({SERVICES_CATALOG.length})</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {SERVICES_CATALOG.map((service, idx) => {
              const isSelected = selectedServiceIdx === idx;
              return (
                <button
                  key={service.id}
                  onClick={() => selectService(idx)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-sans whitespace-nowrap transition-all cursor-pointer touch-manipulation ${
                    isSelected
                      ? 'bg-[#710014] text-white font-bold shadow-sm'
                      : 'bg-[#f6f4ee] text-[#333333] hover:bg-[#e5e0d3] font-medium'
                  }`}
                >
                  {service.title}
                </button>
              );
            })}
          </div>
        </section>

        {/* 2-Column Main Showcase Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Service List Panel (5 Cols) */}
          <div className="hidden lg:block lg:col-span-5 bg-white border border-[#e5e0d3] rounded-3xl p-5 shadow-sm space-y-4">
            
            <div className="border-b border-[#e5e0d3] pb-3 flex items-center justify-between">
              <span className="font-sans text-xs font-extrabold tracking-wider text-[#710014] uppercase">SERVICES CATALOG</span>
              <span className="font-sans text-[11px] text-[#777777] font-bold uppercase">SELECT TO INSPECT</span>
            </div>

            <div className="space-y-1 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
              {SERVICES_CATALOG.map((service, idx) => {
                const isSelected = selectedServiceIdx === idx;
                return (
                  <button
                    key={service.id}
                    onClick={() => selectService(idx)}
                    className={`w-full text-left py-3 px-4 transition-all duration-200 flex items-center justify-between group cursor-pointer border-b border-[#f0ece1] last:border-0 touch-manipulation ${
                      isSelected
                        ? 'bg-[#710014]/10 text-[#710014] font-bold border-l-4 border-l-[#710014] pl-5'
                        : 'text-[#333333] hover:bg-[#f6f4ee] hover:text-[#710014] font-medium'
                    }`}
                  >
                    <span className="font-sans text-sm tracking-wide">{service.title}</span>
                    <span className={`text-sm transition-transform duration-200 ${isSelected ? 'translate-x-1 font-bold' : 'opacity-40 group-hover:opacity-100 group-hover:translate-x-1'}`}>
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN / MOBILE ACTIVE STAGE: Active Card Showcase Stage (7 Cols) */}
          <div id="service-stage-target" className="lg:col-span-7 lg:sticky lg:top-24 scroll-mt-24">
            <div className="w-full bg-white border border-[#e5e0d3] rounded-3xl shadow-xl relative overflow-hidden flex flex-col">
              {/* Top Red Line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#710014] z-30" />

              {/* Showcase Image Area */}
              <div className="relative w-full h-56 sm:h-64 bg-[#eee9df] overflow-hidden group flex-shrink-0">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  width="800"
                  height="500"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge Overlay Top Left */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
                  <span className="px-3 py-1 bg-[#710014] text-white text-[11px] font-sans font-extrabold tracking-[0.2em] uppercase rounded shadow-md">
                    ✦ {activeService.badge}
                  </span>
                </div>
              </div>

              {/* Card Body Details */}
              <div className="p-5 sm:p-6 space-y-4 flex-grow">
                
                {/* Category & Title */}
                <div className="space-y-0.5 border-b border-[#e5e0d3] pb-3">
                  <span className="text-xs font-sans font-extrabold tracking-[0.25em] text-[#710014] uppercase">
                    {activeService.category}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-normal text-[#1a1a1a] uppercase tracking-wide">
                    {activeService.title}
                  </h2>
                </div>

                {/* Description */}
                <p className="font-sans text-sm sm:text-base text-[#333333] leading-relaxed font-medium">
                  {activeService.description}
                </p>

                {/* Action CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={handleContactNavigate}
                    className="w-full sm:w-1/2 py-3.5 px-6 bg-[#710014] text-white text-xs sm:text-sm font-sans font-extrabold tracking-widest uppercase hover:bg-[#580010] transition-all shadow-md cursor-pointer text-center rounded-none touch-manipulation"
                  >
                    CONTACT US
                  </button>

                  <a
                    href="tel:+918098090204"
                    className="w-full sm:w-1/2 py-3.5 px-6 bg-white border-2 border-[#710014] text-[#710014] text-xs sm:text-sm font-sans font-bold tracking-widest uppercase hover:bg-[#710014] hover:text-white transition-all cursor-pointer text-center rounded-none flex items-center justify-center gap-2 touch-manipulation"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c.135.252.286.505.452.757.946 1.433 2.164 2.651 3.597 3.597.252.166.505.317.757.452l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                    </svg>
                    <span>CALL US</span>
                  </a>
                </div>

              </div>
            </div>
          </div>

        </section>

      </main>

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

export default memo(ServicePage);