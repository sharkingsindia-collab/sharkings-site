import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import ScrollReveal from './ScrollReveal';

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
import slogo from '../assets/slogo.webp';

const CATEGORY_FILTERS = ['ALL', 'RESIDENTIAL', 'MODULAR', 'COMMERCIAL', 'CONTAINER', 'SPECIALTY'];

const SERVICES_CATALOG = [
  {
    id: 'turnkey',
    category: 'RESIDENTIAL & COMMERCIAL',
    categoryGroup: 'RESIDENTIAL',
    title: 'Turnkey Projects',
    badge: 'SHARKINGS STUDIO',
    timeline: '45–60 Business Days',
    materials: 'BWP Plywood, HDHMR & German Hardware',
    idealFor: 'Villas, Residences & Flagship Retail',
    description: 'We deliver complete turnkey interior projects from concept to completion, managing every detail efficiently. Our team handles design, materials, labor, and supervision to ensure seamless execution. We focus on timely delivery and adherence to budget. Each project reflects high-quality workmanship and modern design standards. Our turnkey solutions provide a hassle-free experience for clients.',
    image: turnkeyImg
  },
  {
    id: 'modular-kitchen',
    category: 'MODULAR KITCHENS',
    categoryGroup: 'MODULAR',
    title: 'Modular Kitchen',
    badge: 'SHARKINGS KITCHEN',
    timeline: '30–40 Business Days',
    materials: 'BWP Marine Ply, Acrylic & Quartz',
    idealFor: 'Modern Homes & Gourmet Kitchens',
    description: 'We design and install modern modular kitchens that are both stylish and functional. Our layouts maximize space and provide smart storage solutions. We use high-quality materials and durable fittings for long-lasting performance. Each kitchen is customized to match the client’s taste and lifestyle. Our installations combine elegance, efficiency, and convenience.',
    image: modularKitchenImg
  },
  {
    id: 'container-interior',
    category: 'CONTAINER ARCHITECTURE',
    categoryGroup: 'CONTAINER',
    title: 'Container Interior',
    badge: 'SHARKINGS ECO',
    timeline: '25–35 Business Days',
    materials: 'Corten Steel, Rockwool & ACP Cladding',
    idealFor: 'Site Offices, Studios & Pop-Up Retail',
    description: 'We transform containers into stylish and fully functional interior spaces. These can be used for offices, shops, homes, or cafes. Our services include customized layouts, proper insulation, lighting, and electrical work. Container interiors are cost-effective, modern, and quick to execute. We ensure durable and aesthetically pleasing results for every project.',  
    image: containerInteriorImg
  },
  {
    id: 'container-cafe',
    category: 'COMMERCIAL DESIGN',
    categoryGroup: 'CONTAINER',
    title: 'Container Cafe',
    badge: 'SHARKINGS STUDIO',
    timeline: '30–40 Business Days',
    materials: 'Insulated Panels, WPC Deck & Custom Millwork',
    idealFor: 'Highway Cafes, Kiosks & Rooftops',
    image: containerCafeImg,
    description: 'We design attractive container cafés that combine modern aesthetics with practical layouts. Our team handles interiors, seating, lighting, and plumbing solutions. The structures are weather-resistant and built to last. Each cafe is designed to create a welcoming environment for customers. Ideal for startups and unique business ventures.',
  },
  {
    id: 'container-homes',
    category: 'MODULAR RESIDENCES',
    categoryGroup: 'CONTAINER',
    title: 'Container Homes',
    badge: 'SHARKINGS RESIDENCE',
    timeline: '40–55 Business Days',
    materials: 'Thermal Insulation, UPVC & Marine Boards',
    idealFor: 'Farmhouses & Coastal Retreats',
    description: 'We create innovative container homes that are stylish, durable, and eco-friendly. Our designs include functional interiors with proper insulation and modern layouts. Kitchens and bathrooms are planned for comfort and efficiency. Container homes are affordable and customizable to client needs. Perfect for residential or vacation living spaces.',
    image: containerHomesImg
  },
  {
    id: 'false-ceiling',
    category: 'LIGHTING & CEILINGS',
    categoryGroup: 'SPECIALTY',
    title: 'False Ceiling Work',
    badge: 'CEILING WORK',
    timeline: '10–18 Business Days',
    materials: 'Saint-Gobain Gypsum, GI Framing & Profiles',
    idealFor: 'Living Rooms, Lobbies & Offices',
    description: 'We provide elegant false ceiling solutions that enhance the look and feel of interiors. Our services include gypsum and POP ceiling designs with integrated lighting. False ceilings conceal wiring and improve insulation. We offer modern patterns and durable finishes to suit any décor. Professional installation ensures lasting quality and aesthetics.',
    image: falseCeilingImg
  },
  {
    id: 'wardrobe',
    category: 'MODULAR STORAGE',
    categoryGroup: 'MODULAR',
    title: 'Wardrobe Suite',
    badge: 'MODULAR STORAGE',
    timeline: '20–30 Business Days',
    materials: 'HDHMR, Lacquered Glass & Soft-Close Channels',
    idealFor: 'Master Suites & Walk-In Closets',
    description: 'We design custom wardrobes that maximize storage while enhancing room aesthetics. Options include sliding or hinged doors with premium finishes. Smart compartments and durable fittings make organization easy. Each wardrobe is tailored to fit the client’s space perfectly. We focus on creating functional and stylish storage solutions.',
    image: wardrobeImg
  },
  {
    id: 'home-interior',
    category: 'PRIVATE RESIDENCES',
    categoryGroup: 'RESIDENTIAL',
    title: 'Home Interior',
    badge: 'FULL VILLA',
    timeline: '45–60 Business Days',
    materials: 'Natural Veneers, Marble & Custom Joinery',
    idealFor: 'Independent Villas & Luxury Apartments',
    description: 'We provide complete home interior solutions for a modern, comfortable, and elegant living space. Our services include furniture, lighting, ceiling design, and decor. We carefully plan layouts to optimize functionality and aesthetics. Each home is customized to reflect the client’s taste and lifestyle. Quality workmanship ensures a beautiful and durable finish.',
    image: homeInteriorImg
  },
  {
    id: 'acp-elevation',
    category: 'EXTERIOR FACADES',
    categoryGroup: 'SPECIALTY',
    title: 'ACP Elevation',
    badge: 'FACADE DESIGN',
    timeline: '15–25 Business Days',
    materials: 'FR-Grade ACP, HPL Louvers & MS Subframe',
    idealFor: 'Commercial Fronts & Modern Residences',
    description: 'We design modern ACP (Aluminium Composite Panel) elevations to enhance the exterior of buildings. Our panels are durable, weather-resistant, and visually appealing. Customized colors, textures, and patterns are available to match the client’s style. We focus on quality installation and precise finishing. ACP elevation works add a premium look to any property.',
    image: acpElevationImg
  },
  {
    id: 'aluminium-partition',
    category: 'OFFICE SPACES',
    categoryGroup: 'COMMERCIAL',
    title: 'Aluminium Partition',
    badge: 'OFFICE LAYOUT',
    timeline: '7–15 Business Days',
    materials: 'Anodized Aluminium & Toughened Glass',
    idealFor: 'Corporate Cabins, Clinics & Showrooms',
    description: 'We install high-quality aluminium partitions for offices, commercial spaces, and interiors. Options include glass panels, solid panels, and customizable layouts. Our partitions are lightweight, durable, and professional in appearance. They help organize spaces efficiently while enhancing aesthetics. We provide precise installation for modern, functional interiors.',
    image: aluminiumPartitionImg
  },
  {
    id: 'office-interior',
    category: 'CORPORATE WORKSPACE',
    categoryGroup: 'COMMERCIAL',
    title: 'Office Interior',
    badge: 'CORPORATE STUDIO',
    timeline: '30–45 Business Days',
    materials: 'Acoustic Panels, Modular Desks & Task LEDs',
    idealFor: 'Corporate Offices, Studios & Clinics',
    description: 'We create modern and professional office interiors designed for comfort and productivity. Our services include workstations, cabins, conference rooms, lighting, and furniture solutions. We focus on efficient layouts and elegant designs. High-quality materials ensure durability and style. Complete turnkey solutions deliver a hassle-free office setup.',
    image: officeInteriorImg
  },
  {
    id: 'salon-interior',
    category: 'RETAIL & COMMERCIAL',
    categoryGroup: 'COMMERCIAL',
    title: 'Salon Interior',
    badge: 'COMMERCIAL ATELIER',
    timeline: '30–45 Business Days',
    materials: 'Backlit Mirrors, Marble Veneer & Wash Units',
    idealFor: 'Luxury Salons, Spas & Wellness Studios',
    description: 'We design stylish and functional salon interiors that create a luxurious experience for clients. Our services include reception areas, styling stations, lighting, and décor. Space is planned efficiently for both staff and clients. Durable finishes and modern designs ensure long-lasting aesthetics. We deliver complete interior solutions to make salons visually appealing and comfortable.',
    image: salonInteriorImg
  }
];

function ServicePage({ onNavigate }) {
  const [activeCategoryGroup, setActiveCategoryGroup] = useState('ALL');
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES_CATALOG[0].id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredServices = useMemo(() => {
    if (activeCategoryGroup === 'ALL') return SERVICES_CATALOG;
    return SERVICES_CATALOG.filter((service) => service.categoryGroup === activeCategoryGroup);
  }, [activeCategoryGroup]);

  const activeService = useMemo(
    () =>
      filteredServices.find((service) => service.id === selectedServiceId) ||
      filteredServices[0] ||
      SERVICES_CATALOG[0],
    [filteredServices, selectedServiceId]
  );

  const handleCategoryChange = useCallback((group) => {
    setActiveCategoryGroup(group);
    const nextList =
      group === 'ALL'
        ? SERVICES_CATALOG
        : SERVICES_CATALOG.filter((service) => service.categoryGroup === group);
    if (nextList.length > 0) {
      setSelectedServiceId(nextList[0].id);
    }
  }, []);

  const selectService = useCallback((serviceId) => {
    setSelectedServiceId(serviceId);
    if (window.innerWidth < 1024) {
      const stageEl = document.querySelector('#service-stage-target');
      if (stageEl) {
        stageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  const handleContactNavigate = useCallback(() => {
    onNavigate('landing', '#get-in-touch');
  }, [onNavigate]);

  return (
    <div className="min-h-screen bg-[#f9f8f4] text-[#1a1a1a] font-sans selection:bg-[#710014] selection:text-white relative overflow-x-clip">
      
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
      <header className="w-full bg-[#f9f8f4]/95 backdrop-blur-md border-b border-[#e5e0d3] sticky top-0 z-50 py-3.5 sm:py-4">
        <div className="max-w-7xl mx-auto px-5 sm:px-12 flex items-center justify-between">
          
          <button
            type="button"
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 font-sans text-xs font-bold tracking-[0.16em] text-[#1a1a1a] hover:text-[#710014] transition-colors uppercase cursor-pointer focus:outline-none group touch-manipulation"
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
            <span>Home</span>
          </button>

          {/* Brand Identity Logo */}
          <div className="flex items-center justify-center">
            <img
              src={slogo}
              alt="Sharkings Interiors & Exteriors"
              width="140"
              height="36"
              className="h-7 sm:h-8 md:h-9 w-auto object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => onNavigate('landing')}
            />
          </div>

          <button
            type="button"
            onClick={handleContactNavigate}
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-md bg-[#710014] text-white text-xs font-sans font-bold tracking-[0.12em] uppercase hover:bg-[#580010] transition-colors cursor-pointer shadow-sm touch-manipulation"
          >
            Contact Us
          </button>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-5 sm:px-12 lg:px-16 py-8 sm:py-12 space-y-8 relative z-10">

        {/* Title Block */}
        <ScrollReveal variant="up">
          <section className="space-y-3 border-b border-[#e5e0d3] pb-6">
            <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#710014] uppercase block">
              WHAT WE DO • MADURAI • RAMANATHAPURAM • SOUTH TAMIL NADU
            </span>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-[54px] font-medium text-[#1a1a1a] leading-tight tracking-tight">
              Interior &amp; Exterior Design Services
            </h1>

            <p className="font-sans text-sm sm:text-base text-[#333333] leading-relaxed font-normal max-w-3xl">
              Explore our turnkey range of custom home interiors, waterproof modular kitchens, false ceilings, wardrobe suites, ACP elevations, and corporate interiors executed across Madurai, Ramanathapuram, and South Tamil Nadu.
            </p>

            {/* Category Filter Pills */}
            <div className="pt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORY_FILTERS.map((group) => {
                const isActive = activeCategoryGroup === group;
                const count =
                  group === 'ALL'
                    ? SERVICES_CATALOG.length
                    : SERVICES_CATALOG.filter((s) => s.categoryGroup === group).length;
                return (
                  <button
                    key={group}
                    type="button"
                    onClick={() => handleCategoryChange(group)}
                    className={`px-4 py-2 rounded-md text-xs font-sans font-bold tracking-[0.12em] uppercase transition-all whitespace-nowrap cursor-pointer border touch-manipulation ${
                      isActive
                        ? 'bg-[#710014] text-white border-[#710014] shadow-sm'
                        : 'bg-white text-[#333333] border-[#e5e0d3] hover:border-[#710014]/50 hover:text-[#710014]'
                    }`}
                  >
                    {group} ({count})
                  </button>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        {/* MOBILE INSTANT SELECTOR BAR (< lg) */}
        <ScrollReveal variant="up" delay={60} className="lg:hidden">
          <section className="space-y-3 bg-white border border-[#e5e0d3] p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between font-sans text-xs font-bold text-[#710014]">
              <span className="uppercase tracking-wider">Tap Service to Inspect ({filteredServices.length})</span>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {filteredServices.map((service) => {
                const isSelected = activeService.id === service.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => selectService(service.id)}
                    className={`px-3.5 py-2 rounded-md text-xs font-sans whitespace-nowrap transition-all cursor-pointer touch-manipulation ${
                      isSelected
                        ? 'bg-[#710014] text-white font-bold shadow-sm'
                        : 'bg-[#f6f4ee] text-[#333333] hover:bg-[#e5e0d3] font-semibold'
                    }`}
                  >
                    {service.title}
                  </button>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        {/* 2-Column Main Showcase Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Service List Panel (5 Cols) */}
          <ScrollReveal variant="left" className="hidden lg:block lg:col-span-5">
            <div className="bg-white border border-[#e5e0d3] rounded-xl p-5 shadow-sm space-y-4">
            
            <div className="border-b border-[#e5e0d3] pb-3 flex items-center justify-between">
              <span className="font-sans text-xs font-bold tracking-[0.14em] text-[#710014] uppercase">
                Services Catalog ({filteredServices.length})
              </span>
              <span className="font-sans text-xs text-[#4a4a4a] font-semibold uppercase">Select to Inspect</span>
            </div>

            <div className="space-y-1 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
              {filteredServices.map((service) => {
                const isSelected = activeService.id === service.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => selectService(service.id)}
                    className={`w-full text-left py-3 px-4 rounded-md transition-all duration-200 flex items-center justify-between group cursor-pointer border-b border-[#f0ece1] last:border-0 touch-manipulation ${
                      isSelected
                        ? 'bg-[#710014]/10 text-[#710014] font-bold border-l-4 border-l-[#710014] pl-5'
                        : 'text-[#262626] hover:bg-[#f6f4ee] hover:text-[#710014] font-medium'
                    }`}
                  >
                    <span className="font-sans text-sm tracking-wide">{service.title}</span>
                    <span className={`text-sm transition-transform duration-200 ${isSelected ? 'translate-x-1 font-bold' : 'opacity-45 group-hover:opacity-100 group-hover:translate-x-1'}`}>
                      →
                    </span>
                  </button>
                );
              })}
            </div>
            </div>
          </ScrollReveal>

          {/* RIGHT COLUMN / MOBILE ACTIVE STAGE: Active Card Showcase Stage (7 Cols) */}
          <div id="service-stage-target" className="lg:col-span-7 lg:sticky lg:top-24 scroll-mt-24">
            <ScrollReveal variant="scale" delay={80}>
              <div
                key={activeService.id}
                className="w-full bg-white border border-[#e5e0d3] rounded-xl shadow-xl relative overflow-hidden flex flex-col animate-service-fade"
              >
              {/* Top Red Line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#710014] z-30" />

              {/* Showcase Image Area */}
              <div className="relative w-full h-56 sm:h-72 bg-[#eee9df] overflow-hidden group flex-shrink-0">
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
                  <span className="px-3 py-1 bg-[#710014] text-white text-xs font-sans font-bold tracking-[0.14em] uppercase rounded-md shadow-md">
                    ✦ {activeService.badge}
                  </span>
                </div>
              </div>

              {/* Card Body Details */}
              <div className="p-5 sm:p-7 space-y-4 flex-grow">
                
                {/* Category & Title */}
                <div className="space-y-1 border-b border-[#e5e0d3] pb-3">
                  <span className="text-xs font-sans font-bold tracking-[0.18em] text-[#710014] uppercase">
                    {activeService.category}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#1a1a1a] tracking-tight">
                    {activeService.title}
                  </h2>
                </div>

                {/* Description */}
                <p className="font-sans text-sm sm:text-base text-[#333333] leading-relaxed font-normal">
                  {activeService.description}
                </p>

                {/* Specification Metadata Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-lg bg-[#f9f8f4] border border-[#e5e0d3]">
                  <div className="space-y-0.5">
                    <span className="font-sans text-[11px] font-bold tracking-[0.14em] text-[#710014] uppercase block">
                      EST. TIMELINE
                    </span>
                    <span className="font-sans text-xs sm:text-sm font-semibold text-[#1a1a1a] block">
                      {activeService.timeline}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-sans text-[11px] font-bold tracking-[0.14em] text-[#710014] uppercase block">
                      CORE MATERIALS
                    </span>
                    <span className="font-sans text-xs sm:text-sm font-semibold text-[#1a1a1a] block">
                      {activeService.materials}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-sans text-[11px] font-bold tracking-[0.14em] text-[#710014] uppercase block">
                      IDEAL FOR
                    </span>
                    <span className="font-sans text-xs sm:text-sm font-semibold text-[#1a1a1a] block">
                      {activeService.idealFor}
                    </span>
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleContactNavigate}
                    className="w-full sm:w-1/2 py-3.5 px-6 rounded-md bg-[#710014] text-white text-xs sm:text-sm font-sans font-bold tracking-[0.14em] uppercase hover:bg-[#580010] transition-all shadow-md cursor-pointer text-center touch-manipulation"
                  >
                    Contact Us
                  </button>

                  <a
                    href="tel:+918098090204"
                    className="w-full sm:w-1/2 py-3.5 px-6 rounded-md bg-white border-2 border-[#710014] text-[#710014] text-xs sm:text-sm font-sans font-bold tracking-[0.14em] uppercase hover:bg-[#710014] hover:text-white transition-all cursor-pointer text-center flex items-center justify-center gap-2 touch-manipulation"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c.135.252.286.505.452.757.946 1.433 2.164 2.651 3.597 3.597.252.166.505.317.757.452l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                    </svg>
                    <span>Call Us</span>
                  </a>
                </div>

              </div>
              </div>
            </ScrollReveal>
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="w-full bg-[#38000a] text-white py-8 px-6 md:px-16 border-t border-white/15 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs font-bold tracking-wider text-[#e0be7a] uppercase">
              SHARKINGS INTERIORS &amp; EXTERIORS • MADURAI &amp; RAMANATHAPURAM
            </span>
          </div>

          <div className="font-sans text-xs text-white/80">
            © {new Date().getFullYear()} Sharkings Interiors &amp; Exteriors. All Rights Reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}

export default memo(ServicePage);