import { useState, useMemo, useCallback, useEffect, useRef, memo } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const SHOWROOMS_DATA = [
  {
    id: 'madurai',
    name: 'Madurai Experience Centre',
    tagline: 'Main Flagship Atelier & Spatial Gallery',
    badge: 'EXPERIENCE CENTRE',
    landmark: 'Landmark: TNHB Colony, Villapuram',
    address: 'Plot no, 3552, TNHB Colony, Villapuram, Madurai, Tamil Nadu 625001',
    phone: '+91 80980 90204',
    email: 'sharkingsindia@gmail.com',
    hours: 'Monday - Saturday: 10:00 AM to 8:30 PM (Sunday Closed)',
    status: 'OPEN NOW',
    mapUrl: 'https://maps.google.com/maps?q=3552,+TNHB+Colony,+Villapuram,+Madurai,+Tamil+Nadu+625001&t=&z=15&ie=UTF8&iwloc=&output=embed',
    directMapUrl: 'https://maps.google.com/?q=3552,+TNHB+Colony,+Villapuram,+Madurai,+Tamil+Nadu+625001',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop',
        caption: 'Modular Kitchen & Veneer Suite'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
        caption: 'Luxury Living Room Setup'
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop',
        caption: 'Tactile Material Wall & Hardware Gallery'
      }
    ],
    features: [
      '2,500 sq.ft. Full-Scale Spatial Mockups',
      '100+ Live Material & Veneer Swatches',
      'Dedicated Architectural Darkroom',
      '3D VR Virtual Spatial Walkthrough'
    ]
  },
  {
    id: 'ramanathapuram',
    name: 'Ramanathapuram Experience Centre',
    tagline: 'Coastal Design Studio & Material Atelier',
    badge: 'EXPERIENCE CENTRE',
    landmark: 'Landmark: Near New Bus Stand, Kenikarai Main Road',
    address: 'Bus Stop, 13/2993/26, Madurai - Rameswaram Hwy, Subbaiah Nagar, Ram Nagar, Ramanathapuram, Tamil Nadu 623501.',
    phone: '+91 80980 90204',
    email: 'sharkingsindia@gmail.com',
    hours: 'Monday - Saturday: 10:00 AM to 8:30 PM (Sunday Closed)',
    status: 'OPEN NOW',
    mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d779.1542875671499!2d78.8768028!3d9.3527655!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b019700371df4c9%3A0xea549e375bf9b0bf!2sSHARKINGS%20Interiors%20and%20Exteriors!5e1!3m2!1sen!2sin!4v1785915240249!5m2!1sen!2sin",
    directMapUrl: 'https://maps.app.goo.gl/KwVAnbyXtpeHbtpr8',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1000&auto=format&fit=crop',
        caption: 'Coastal Moisture-Resistant Wardrobes'
      },
      {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop',
        caption: 'Designer Consultation & Material Desk'
      },
      {
        url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop',
        caption: 'Teak & Brushed Brass Fittings Studio'
      }
    ],
    features: [
      'Specialized Coastal Weather-Proof Materials',
      'Smart Home Lighting & Automation Mockups',
      'Custom Solid Wood & Brass Hardware Studio',
      'Interactive 3D Planning Suite'
    ]
  }
];

function Showrooms({ showroomRef, isDesktop = true }) {
  useScrollReveal();
  const [activeLocationIdx, setActiveLocationIdx] = useState(0);
  const [activeMediaType, setActiveMediaType] = useState('map'); // 'map' or 'gallery'
  const [activeGalleryImgIdx, setActiveGalleryImgIdx] = useState(0);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBookingLocation, setSelectedBookingLocation] = useState('madurai');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const mapSentinelRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const watermarkRef = useRef(null);
  const rafRef = useRef(null);

  // Lazy-load Google Maps iframe only when section enters viewport
  useEffect(() => {
    const sentinel = mapSentinelRef.current || showroomRef?.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setMapVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '300px 0px 300px 0px' });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [showroomRef]);

  // Form state for booking modal
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: '11:00 AM',
    interests: ['Modular Kitchen']
  });

  const currentLocation = useMemo(() => SHOWROOMS_DATA[activeLocationIdx], [activeLocationIdx]);

  const handleBookingSubmit = useCallback((e) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setBookingModalOpen(false);
      setBookingForm({ name: '', phone: '', date: '', time: '11:00 AM', interests: ['Modular Kitchen'] });
    }, 2500);
  }, []);

  const handleTabSwitch = useCallback((idx) => {
    setActiveLocationIdx(idx);
    setActiveMediaType('map');
  }, []);

  const smoothScrollToContact = useCallback(() => {
    const contactSection = document.querySelector('#get-in-touch');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      ref={showroomRef}
      id="showrooms"
      className="relative w-full py-16 sm:py-28 bg-[#f8f7f3] text-luxury-charcoal overflow-hidden z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.05)]"
    >
      {/* Background Floating Watermark */}
      <div
        className="absolute font-display text-[18vw] text-[#710014]/[0.025] font-extralight select-none pointer-events-none z-0 left-0 top-1/4 whitespace-nowrap"
      >
        EXPERIENCE CENTRES
      </div>

      {/* Subtle burgundy & sage ambient lighting glows */}
      <div className="absolute top-1/3 -left-32 w-[600px] h-[600px] bg-[#710014]/[0.04] rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-0 w-[550px] h-[550px] bg-[#838f6f]/[0.04] rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-16 lg:px-24 relative z-10 space-y-12">

        {/* SECTION HEADER (Rich Light Theme with Royal Burgundy Accent) */}
        <div className="text-center max-w-3xl mx-auto space-y-4 reveal-3d-popup">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#710014]/30" />
            <span className="font-sans text-xs md:text-sm font-extrabold tracking-[0.35em] text-[#710014] uppercase">
              OUR STUDIOS
            </span>
            <span className="w-8 h-[1px] bg-[#710014]/30" />
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1a1a1a] tracking-tight">
            Visit Our <span className="italic font-normal text-[#710014]">Design Studios</span>
          </h2>

          <p className="font-sans text-sm md:text-base text-luxury-charcoal/75 leading-relaxed font-medium max-w-2xl mx-auto">
            Drop by our studio to check out real wood finishes, look at metal hardware in person, and chat with our designers over a cup of coffee to plan your space.
          </p>

          {/* LOCATION TABS SWITCHER (Royal Burgundy Pill Tabs) */}
          <div className="pt-6 flex items-center justify-center">
            <div className="p-1 rounded-none bg-white border border-black/10 shadow-lg inline-flex items-center gap-1.5 relative max-w-full">
              {SHOWROOMS_DATA.map((loc, idx) => {
                const isActive = activeLocationIdx === idx;
                return (
                  <button
                    key={loc.id}
                    onClick={() => handleTabSwitch(idx)}
                    className={`px-4 py-2.5 sm:px-8 sm:py-3 rounded-none text-[11px] sm:text-sm font-sans font-bold tracking-wider sm:tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 sm:gap-2.5 cursor-pointer relative touch-manipulation ${isActive
                      ? 'bg-[#710014] text-white shadow-md font-extrabold'
                      : 'text-luxury-charcoal/70 hover:text-[#710014]'
                      }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                    </svg>
                    <span>{loc.name.split(' ')[0].toUpperCase()}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* MAIN DISPLAY CONTAINER */}
        <div className="bg-white border border-black/10 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.06)] relative overflow-hidden reveal-3d-popup delay-100">

          {/* Subtle Top Burgundy Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#710014]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

            {/* LEFT COLUMN: Showroom Info Card */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">

              <div className="space-y-6">
                {/* Badge & Name */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#710014]/10 text-[#710014] text-[11px] font-sans font-extrabold tracking-widest uppercase border border-[#710014]/20">
                      {currentLocation.badge}
                    </span>
                    <span className="text-xs font-sans text-luxury-charcoal/60 font-semibold">
                      STUDIO LOCATION
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-normal text-luxury-charcoal">
                    {currentLocation.name}
                  </h3>
                </div>

                {/* Address & Specs List */}
                <div className="space-y-4 pt-2 border-t border-black/5">

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#710014]/10 text-[#710014] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-sans text-xs font-extrabold tracking-widest uppercase text-[#710014] block mb-0.5">ADDRESS</span>
                      <p className="font-sans text-sm text-luxury-charcoal/90 leading-relaxed font-medium">
                        {currentLocation.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#710014]/10 text-[#710014] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.828-1.015-5.144-3.331-6.159-6.159l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-sans text-xs font-extrabold tracking-widest uppercase text-[#710014] block mb-0.5">PHONE & INQUIRIES</span>
                      <p className="font-sans text-sm text-luxury-charcoal/90 leading-relaxed font-bold">
                        {currentLocation.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#710014]/10 text-[#710014] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-sans text-xs font-extrabold tracking-widest uppercase text-[#710014] block mb-0.5">VISITING HOURS</span>
                      <p className="font-sans text-sm text-luxury-charcoal/90 leading-relaxed font-medium">
                        {currentLocation.hours}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">

                <a
                  href={currentLocation.directMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-1/2 px-6 py-3.5 rounded-none border-2 border-[#710014] text-xs font-sans font-bold tracking-widest text-[#710014] bg-white hover:bg-[#710014] hover:text-white transition-all text-center flex items-center justify-center gap-2 group cursor-pointer shadow-sm touch-manipulation"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  <span>GET DIRECTIONS</span>
                </a>

                <button
                  onClick={smoothScrollToContact}
                  className="w-full sm:w-1/2 px-6 py-3.5 rounded-none bg-[#710014] text-white text-xs font-sans font-extrabold tracking-widest uppercase hover:bg-[#580010] transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-[#710014]/20 cursor-pointer touch-manipulation"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c.135.252.286.505.452.757.946 1.433 2.164 2.651 3.597 3.597.252.166.505.317.757.452l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                  </svg>
                  <span>Contact Us</span>
                </button>

              </div>

            </div>

            {/* RIGHT COLUMN: Map Frame & Clean Interactive Media Display */}
            <div className="lg:col-span-7 relative flex flex-col h-full min-h-[400px] lg:min-h-[460px]">

              {/* Top Right Floating Mode Switcher */}
              {/* <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
                {activeMediaType === 'gallery' ? (
                  <>
                    <button
                      onClick={() => setActiveMediaType('map')}
                      className="px-3.5 py-2 rounded-full bg-[#0f1118]/90 text-white border border-[#c5a059]/40 hover:border-[#c5a059] text-[10px] font-sans font-bold tracking-widest uppercase flex items-center gap-2 transition-all shadow-xl cursor-pointer touch-manipulation"
                    >
                      <svg className="w-3.5 h-3.5 text-[#c5a059]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                      </svg>
                      <span>Map View</span>
                    </button>

                    <button
                      onClick={() => {
                        setLightboxImg(currentLocation.images[activeGalleryImgIdx].url);
                        setLightboxOpen(true);
                      }}
                      className="w-8 h-8 rounded-full bg-[#0f1118]/90 text-[#c5a059] border border-[#c5a059]/40 hover:scale-105 flex items-center justify-center transition-all shadow-xl cursor-pointer touch-manipulation"
                      title="Fullscreen Photo"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25v-4.5m0 4.5h-4.5m4.5 0L15 15m-11.25 5.25h4.5m-4.5 0v-4.5m0 4.5L9 15" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setActiveMediaType('gallery')}
                    className="px-4 py-2 rounded-full bg-[#710014] text-white border border-[#8a1226] hover:bg-[#5c0010] text-[10px] font-sans font-bold tracking-widest uppercase flex items-center gap-2 transition-all shadow-xl cursor-pointer group touch-manipulation"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Showroom Photo</span>
                    <span className="text-[#c5a059] group-hover:translate-x-0.5 transition-transform">→</span>
                  </button>
                )}
              </div> */}

              {/* Map View / Gallery Container (Fills 100% Height & Width) */}
              <div className="w-full h-full min-h-[400px] lg:min-h-[460px] rounded-2xl overflow-hidden border border-black/10 relative bg-[#eae8e3] flex-1">
                {activeMediaType === 'map' ? (
                  <div ref={mapSentinelRef}>
                  {mapVisible ? (
                    <iframe
                      title={`${currentLocation.name} Map`}
                      src={currentLocation.mapUrl}
                      className="absolute inset-0 w-full h-full border-0 filter grayscale contrast-110 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                      loading="lazy"
                      decoding="async"
                      allowFullScreen
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#eae8e3]">
                      <span className="text-luxury-charcoal/40 text-xs tracking-widest uppercase">Loading Map...</span>
                    </div>
                  )}
                  </div>
                ) : (
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={currentLocation.images[activeGalleryImgIdx].url}
                      alt={currentLocation.images[activeGalleryImgIdx].caption}
                      width="1000"
                      height="667"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Gallery Image Caption & Back Button Bar */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
                      <div className="bg-[#0f1118]/85 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-white">
                        <span className="text-[9px] font-sans font-bold tracking-widest text-[#c5a059] uppercase block">
                          {currentLocation.name.split(' ')[0]} STUDIO
                        </span>
                        <p className="font-display text-xs text-white/90">
                          {currentLocation.images[activeGalleryImgIdx].caption}
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveMediaType('map')}
                        className="px-3.5 py-2 rounded-xl bg-white/90 hover:bg-white text-luxury-charcoal text-[10px] font-sans font-bold tracking-wider uppercase shadow-lg transition-all cursor-pointer flex items-center gap-1.5 touch-manipulation"
                      >
                        <span>← Back</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* BOOKING APPOINTMENT MODAL */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white border border-black/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 text-luxury-charcoal">

            {/* Close Button */}
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-luxury-charcoal cursor-pointer touch-manipulation"
            >
              ✕
            </button>

            {bookingSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#710014]/10 text-[#710014] border border-[#710014]/30 flex items-center justify-center mx-auto text-2xl animate-bounce">
                  ✓
                </div>
                <h3 className="font-display text-2xl font-light">VIP Reservation Confirmed!</h3>
                <p className="font-sans text-xs text-luxury-charcoal/70">
                  Our principal interior architect will reach out to confirm your private walkthrough at the {selectedBookingLocation === 'madurai' ? 'Madurai' : 'Ramanathapuram'} Experience Centre.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-5">
                <div>
                  <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-[#710014] uppercase block mb-1">
                    PRIVATE APPOINTMENT
                  </span>
                  <h3 className="font-display text-2xl font-light">Book VIP Showroom Tour</h3>
                  <p className="font-sans text-xs text-luxury-charcoal/60 font-light">
                    Select your location and time to get dedicated one-on-one spatial guidance.
                  </p>
                </div>

                {/* Location Picker */}
                <div className="grid grid-cols-2 gap-3">
                  {SHOWROOMS_DATA.map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setSelectedBookingLocation(loc.id)}
                      className={`p-3 rounded-2xl border text-xs font-sans text-left transition-all cursor-pointer touch-manipulation ${selectedBookingLocation === loc.id
                        ? 'border-[#710014] bg-[#710014]/10 text-[#710014] font-bold'
                        : 'border-black/10 bg-black/5 text-luxury-charcoal/60 hover:border-black/30'
                        }`}
                    >
                      <div className="font-bold">{loc.name.split(' ')[0]}</div>
                      <div className="text-[9px] text-black/40 uppercase">{loc.badge}</div>
                    </button>
                  ))}
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#f8f7f3] border border-black/10 text-xs font-sans text-luxury-charcoal focus:outline-none focus:border-[#710014]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#f8f7f3] border border-black/10 text-xs font-sans text-luxury-charcoal focus:outline-none focus:border-[#710014]"
                  />
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="date"
                    required
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#f8f7f3] border border-black/10 text-xs font-sans text-luxury-charcoal focus:outline-none focus:border-[#710014]"
                  />
                  <select
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#f8f7f3] border border-black/10 text-xs font-sans text-luxury-charcoal focus:outline-none focus:border-[#710014]"
                  >
                    <option value="10:30 AM">10:30 AM Slot</option>
                    <option value="02:00 PM">02:00 PM Slot</option>
                    <option value="05:00 PM">05:00 PM Slot</option>
                    <option value="07:00 PM">07:00 PM Slot</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#710014] text-white text-xs font-sans font-bold tracking-widest uppercase hover:bg-[#580010] transition-all shadow-lg shadow-[#710014]/20 cursor-pointer touch-manipulation"
                >
                  CONFIRM VIP RESERVATION
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {/* LIGHTBOX PHOTO MODAL */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/20">
            <img src={lightboxImg} alt="Enlarged showroom interior" className="w-full h-full object-contain" />
            <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center text-xl touch-manipulation">
              ✕
            </button>
          </div>
        </div>
      )}

    </section>
  );
}

export default memo(Showrooms);
