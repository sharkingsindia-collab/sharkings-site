import { useState, useMemo, useCallback, useEffect, useRef, memo } from 'react';
import ScrollReveal from '../ScrollReveal';

const SHOWROOMS_DATA = [
  {
    id: 'madurai',
    name: 'Madurai Office',
    tagline: 'Head Office & Spatial Gallery',
    badge: 'EXPERIENCE CENTRE',
    address: 'Plot no. 3552, TNHB Colony, Villapuram, Madurai, Tamil Nadu 625001',
    phone: '+91 80980 90204',
    hours: 'Monday - Saturday: 10:00 AM to 8:30 PM (Sunday Closed)',
    mapUrl: 'https://maps.google.com/maps?q=3552,+TNHB+Colony,+Villapuram,+Madurai,+Tamil+Nadu+625001&t=k&z=16&ie=UTF8&iwloc=&output=embed',
    directMapUrl: 'https://maps.google.com/?q=3552,+TNHB+Colony,+Villapuram,+Madurai,+Tamil+Nadu+625001&t=k'
  },
  {
    id: 'ramanathapuram',
    name: 'Ramanathapuram Showroom',
    tagline: 'Coastal Showroom & Material Atelier',
    badge: 'EXPERIENCE CENTRE',
    address: 'Bus Stop, 13/2993/26, Madurai - Rameswaram Hwy, Subbaiah Nagar, Ram Nagar, Ramanathapuram, Tamil Nadu 623501.',
    phone: '+91 80980 90204',
    hours: 'Monday - Saturday: 10:00 AM to 8:30 PM (Sunday Closed)',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d779.1542875671499!2d78.8768028!3d9.3527655!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b019700371df4c9%3A0xea549e375bf9b0bf!2sSHARKINGS%20Interiors%20and%20Exteriors!5e1!3m2!1sen!2sin!4v1785915240249!5m2!1sen!2sin',
    directMapUrl: 'https://maps.app.goo.gl/KwVAnbyXtpeHbtpr8'
  }
];

function Showrooms({ showroomRef }) {
  const [activeLocationIdx, setActiveLocationIdx] = useState(0);
  const [mapVisible, setMapVisible] = useState(false);
  const mapSentinelRef = useRef(null);

  // Lazy-load Google Maps iframe only when section enters viewport
  useEffect(() => {
    const sentinel = mapSentinelRef.current || showroomRef?.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px 300px 0px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [showroomRef]);

  const currentLocation = useMemo(() => SHOWROOMS_DATA[activeLocationIdx], [activeLocationIdx]);

  const handleTabSwitch = useCallback((idx) => {
    setActiveLocationIdx(idx);
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
      className="relative w-full py-16 sm:py-24 bg-[#f2efe8] text-luxury-charcoal overflow-hidden z-30 border-t border-black/5 shadow-[0_-20px_50px_rgba(0,0,0,0.04)]"
    >
      {/* Background Floating Watermark */}
      <div className="absolute font-display text-[16vw] text-[#710014]/[0.025] font-normal select-none pointer-events-none z-0 left-0 top-1/4 whitespace-nowrap">
        EXPERIENCE CENTRES
      </div>

      {/* Subtle burgundy & sage ambient lighting glows */}
      <div className="absolute top-1/3 -left-32 w-[600px] h-[600px] bg-[#710014]/[0.04] rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-0 w-[550px] h-[550px] bg-[#838f6f]/[0.04] rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-16 lg:px-24 relative z-10 space-y-10 sm:space-y-12">

        {/* SECTION HEADER */}
        <ScrollReveal variant="up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="flex items-center justify-center gap-3">
              <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#710014] uppercase">
                OUR BRANCHES
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-[54px] font-medium text-[#1a1a1a] tracking-tight leading-tight">
              Visit Our <span className="italic font-medium text-[#710014]">Branches</span>
            </h2>

            <p className="font-sans text-sm md:text-base text-[#333333] leading-relaxed font-normal max-w-2xl mx-auto">
              Drop by our showrooms in Madurai or Ramanathapuram to inspect real wood veneers, quartz countertops, and hardware fittings in person with our design team.
            </p>

            {/* LOCATION TABS SWITCHER */}
            <div className="pt-4 flex items-center justify-center">
              <div className="p-1.5 rounded-lg bg-white border border-black/15 shadow-md inline-flex items-center gap-1.5 relative max-w-full">
                {SHOWROOMS_DATA.map((loc, idx) => {
                  const isActive = activeLocationIdx === idx;
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => handleTabSwitch(idx)}
                      className={`px-4 py-2.5 sm:px-7 sm:py-3 rounded-md text-xs sm:text-sm font-sans font-bold tracking-[0.12em] uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer relative touch-manipulation ${
                        isActive
                          ? 'bg-[#710014] text-white shadow-sm'
                          : 'text-[#333333] hover:text-[#710014] hover:bg-[#f6f4ee]'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                      </svg>
                      <span>{loc.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* MAIN DISPLAY CONTAINER */}
        <ScrollReveal variant="scale" delay={100}>
          <div className="bg-white border border-black/10 rounded-xl p-6 sm:p-8 lg:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.06)] relative overflow-hidden">

          {/* Subtle Top Burgundy Line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#710014]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

            {/* LEFT COLUMN: Showroom Info Card */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">

              <div className="space-y-6">
                {/* Badge & Name */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-md bg-[#710014]/10 text-[#710014] text-xs font-sans font-bold tracking-[0.14em] uppercase border border-[#710014]/20">
                      {currentLocation.badge}
                    </span>
                    <span className="text-xs font-sans text-[#4a4a4a] font-semibold tracking-wider uppercase">
                      {currentLocation.tagline}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1a1a1a]">
                    {currentLocation.name}
                  </h3>
                </div>

                {/* Address & Specs List */}
                <div className="space-y-4 pt-3 border-t border-black/10">

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-md bg-[#710014]/10 text-[#710014] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-sans text-xs font-bold tracking-[0.14em] uppercase text-[#710014] block mb-0.5">ADDRESS</span>
                      <p className="font-sans text-sm text-[#262626] leading-relaxed font-normal">
                        {currentLocation.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-md bg-[#710014]/10 text-[#710014] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.828-1.015-5.144-3.331-6.159-6.159l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-sans text-xs font-bold tracking-[0.14em] uppercase text-[#710014] block mb-0.5">PHONE &amp; INQUIRIES</span>
                      <a href="tel:+918098090204" className="font-sans text-sm text-[#1a1a1a] hover:text-[#710014] leading-relaxed font-bold transition-colors">
                        {currentLocation.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-md bg-[#710014]/10 text-[#710014] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-sans text-xs font-bold tracking-[0.14em] uppercase text-[#710014] block mb-0.5">VISITING HOURS</span>
                      <p className="font-sans text-sm text-[#262626] leading-relaxed font-normal">
                        {currentLocation.hours}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3.5">

                <a
                  href={currentLocation.directMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-1/2 px-5 py-3.5 rounded-md border-2 border-[#710014] text-xs font-sans font-bold tracking-[0.12em] uppercase text-[#710014] bg-white hover:bg-[#710014] hover:text-white transition-all text-center flex items-center justify-center gap-2 group cursor-pointer shadow-sm touch-manipulation"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  <span>Get Directions</span>
                </a>

                <button
                  type="button"
                  onClick={smoothScrollToContact}
                  className="w-full sm:w-1/2 px-5 py-3.5 rounded-md bg-[#710014] text-white text-xs font-sans font-bold tracking-[0.12em] uppercase hover:bg-[#580010] transition-all text-center flex items-center justify-center gap-2 shadow-md cursor-pointer touch-manipulation"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c.135.252.286.505.452.757.946 1.433 2.164 2.651 3.597 3.597.252.166.505.317.757.452l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                  </svg>
                  <span>Contact Us</span>
                </button>

              </div>

            </div>

            {/* RIGHT COLUMN: Google Map Frame */}
            <div className="lg:col-span-7 relative flex flex-col h-full min-h-[380px] lg:min-h-[460px]">
              <div
                ref={mapSentinelRef}
                className="w-full h-full min-h-[360px] lg:min-h-[440px] rounded-xl overflow-hidden border border-black/15 relative bg-[#eae8e3] flex-1"
              >
                {mapVisible ? (
                  <iframe
                    title={`${currentLocation.name} Map`}
                    src={currentLocation.mapUrl}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#eae8e3]">
                    <span className="text-[#4a4a4a] font-sans text-xs font-semibold tracking-widest uppercase">
                      Loading Map...
                    </span>
                  </div>
                )}
              </div>
            </div>

          </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

export default memo(Showrooms);
