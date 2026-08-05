import { useState, useEffect } from 'react';

export default function ReturnToHomeFAB() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // Show FAB after scrolling down past 350px
      if (currentScroll > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate total page scroll percentage
      if (maxScroll > 0) {
        const percentage = Math.min(100, Math.max(0, (currentScroll / maxScroll) * 100));
        setScrollPercentage(percentage);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference;

  return (
    <div 
      className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 ease-out flex items-center gap-3 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip Badge on Hover */}
      <div 
        className={`px-3 py-1.5 rounded-none bg-[#141210] border border-[#c5a059]/40 text-[#c5a059] font-sans text-[10px] font-bold tracking-widest uppercase shadow-xl transition-all duration-300 pointer-events-none whitespace-nowrap ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        RETURN TO HOME
      </div>

      {/* Circular Progress + Floating Compass Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Return to Home Section"
        className="relative w-14 h-14 rounded-full bg-[#710014] border border-[#c5a059]/40 text-white shadow-[0_10px_30px_rgba(113,0,20,0.5)] flex items-center justify-center cursor-pointer group hover:scale-110 transition-transform duration-300"
      >
        {/* SVG Circular Scroll Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 52 52">
          <circle
            cx="26"
            cy="26"
            r={radius}
            className="stroke-white/10 fill-none"
            strokeWidth="2.5"
          />
          <circle
            cx="26"
            cy="26"
            r={radius}
            className="stroke-[#c5a059] fill-none transition-all duration-150"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Inner Arrow Icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2.5} 
          stroke="currentColor" 
          className="w-5 h-5 text-[#c5a059] group-hover:-translate-y-1 transition-transform duration-300"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
        </svg>
      </button>
    </div>
  );
}
