import { useRef, useEffect, useCallback, memo } from 'react';

function ReturnToHomeFAB() {
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const progressCircleRef = useRef(null);
  const rafRef = useRef(null);
  const lastVisibleRef = useRef(false);
  const lastPercentRef = useRef(-1);
  const isHoveredRef = useRef(false);

  const radius = 22;
  const circumference = 2 * Math.PI * radius;

  const updateScroll = useCallback(() => {
    const currentScroll = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    // Visibility toggle
    const shouldBeVisible = currentScroll > 350;
    if (shouldBeVisible !== lastVisibleRef.current) {
      lastVisibleRef.current = shouldBeVisible;
      if (containerRef.current) {
        if (shouldBeVisible) {
          containerRef.current.classList.remove('opacity-0', 'translate-y-12', 'pointer-events-none');
          containerRef.current.classList.add('opacity-100', 'translate-y-0');
        } else {
          containerRef.current.classList.remove('opacity-100', 'translate-y-0');
          containerRef.current.classList.add('opacity-0', 'translate-y-12', 'pointer-events-none');
        }
      }
    }

    // Scroll progress ring
    if (maxScroll > 0 && progressCircleRef.current) {
      const percentage = Math.min(100, Math.max(0, (currentScroll / maxScroll) * 100));
      const rounded = Math.round(percentage);
      if (rounded !== lastPercentRef.current) {
        lastPercentRef.current = rounded;
        const offset = circumference - (percentage / 100) * circumference;
        progressCircleRef.current.setAttribute('stroke-dashoffset', offset);
      }
    }
  }, [circumference]);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        updateScroll();
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll(); // initial

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    if (tooltipRef.current) {
      tooltipRef.current.classList.remove('opacity-0', 'translate-x-2');
      tooltipRef.current.classList.add('opacity-100', 'translate-x-0');
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    if (tooltipRef.current) {
      tooltipRef.current.classList.remove('opacity-100', 'translate-x-0');
      tooltipRef.current.classList.add('opacity-0', 'translate-x-2');
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-8 right-8 z-[100] transition-all duration-500 ease-out flex items-center gap-3 opacity-0 translate-y-12 pointer-events-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Tooltip Badge on Hover */}
      <div 
        ref={tooltipRef}
        className="px-3 py-1.5 rounded-none bg-[#141210] border border-[#c5a059]/40 text-[#c5a059] font-sans text-[10px] font-bold tracking-widest uppercase shadow-xl transition-all duration-300 pointer-events-none whitespace-nowrap opacity-0 translate-x-2"
      >
        RETURN TO HOME
      </div>

      {/* Circular Progress + Floating Compass Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Return to Home Section"
        className="relative w-14 h-14 rounded-full bg-[#710014] border border-[#c5a059]/40 text-white shadow-[0_10px_30px_rgba(113,0,20,0.5)] flex items-center justify-center cursor-pointer group hover:scale-110 transition-transform duration-300 touch-manipulation"
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
            ref={progressCircleRef}
            cx="26"
            cy="26"
            r={radius}
            className="stroke-[#c5a059] fill-none"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
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

export default memo(ReturnToHomeFAB);
