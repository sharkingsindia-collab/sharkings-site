import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import news1Img from '../../assets/news-1.webp';
import modularKitchenImg from '../../assets/modular-kitchen.webp';

function BeforeAfter() {
  useScrollReveal();
  const [sliderPos, setSliderPos] = useState(50);
  const isDraggingRef = useRef(false);
  const containerRef = useRef(null);
  const afterLayerRef = useRef(null);
  const dividerRef = useRef(null);
  const handleBtnRef = useRef(null);
  const rafIdRef = useRef(null);

  // Update slider position directly in DOM for 0ms drag latency
  const updateDOMSlider = useCallback((percentage) => {
    if (afterLayerRef.current) {
      afterLayerRef.current.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    }
    if (dividerRef.current) {
      dividerRef.current.style.left = `${percentage}%`;
    }
    if (handleBtnRef.current) {
      handleBtnRef.current.style.left = `${percentage}%`;
    }
  }, []);

  const handlePointerMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    updateDOMSlider(percentage);
  }, [updateDOMSlider]);

  // Smooth scroll-driven automated comparison reveal when entering viewport
  useEffect(() => {
    const handleScroll = () => {
      if (isDraggingRef.current || !containerRef.current) return;
      if (rafIdRef.current) return;

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const totalDist = rect.height + viewportHeight;
        const scrolled = viewportHeight - rect.top;

        if (scrolled >= 0 && scrolled <= totalDist) {
          const prog = Math.min(Math.max(0, scrolled / totalDist), 1);
          const percentage = 20 + prog * 60;
          updateDOMSlider(percentage);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateDOMSlider(50);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [updateDOMSlider]);

  // Global Pointer Events for smooth drag outside component bounds
  useEffect(() => {
    const onPointerMove = (e) => {
      if (!isDraggingRef.current) return;
      handlePointerMove(e.clientX);
    };

    const onPointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [handlePointerMove]);

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    handlePointerMove(e.clientX);
  };

  return (
    <section id="transformation" className="relative z-30 bg-[#fbf9f6] text-luxury-charcoal py-20 px-6 md:px-16 lg:px-24 border-t border-black/5 overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute font-display text-[16vw] text-[#710014]/[0.02] font-extralight select-none pointer-events-none z-0 left-0 top-1/3 whitespace-nowrap">
        LIVE TRANSFORMATION
      </div>

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 reveal-3d-popup">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#710014]/30" />
            <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.35em] text-[#710014] uppercase">
              INTERACTIVE COMPARISON
            </span>
            <span className="w-8 h-[1px] bg-[#710014]/30" />
          </div>

          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a] tracking-tight">
            The Art of Sharkings <span className="italic font-normal text-[#710014]">Design</span>
          </h2>

          <p className="font-sans text-xs md:text-sm text-luxury-charcoal/70 leading-relaxed font-light max-w-2xl mx-auto">
            Drag the slider to compare before-and-after layouts and see how a custom design completely changes the space.
          </p>
        </div>

        {/* Interactive Comparison Card Container */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          className="relative w-full aspect-[16/10] md:aspect-[16/9] lg:max-h-[580px] rounded-2xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.08)] border border-black/10 select-none cursor-ew-resize bg-luxury-charcoal reveal-3d-popup delay-100 touch-pan-y"
        >
          {/* BEFORE: Underneath Real Raw Site Layer */}
          <div className="absolute inset-0 w-full h-full z-0 bg-luxury-charcoal">
            <img
              src={news1Img}
              alt="Bare Site Frame Before Renovation"
              width="1200"
              height="675"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />
            {/* Tag (Right aligned) */}
            <div className="absolute top-6 right-6 z-10 pointer-events-none">
              <span className="bg-[#121622] text-white border border-white/20 px-3.5 py-1.5 rounded-lg text-[9px] font-sans font-bold tracking-[0.2em] uppercase shadow-md">
                BEFORE: BARE SITE FRAME
              </span>
            </div>
          </div>

          {/* AFTER: GPU Clip-Path Masked Finished Masterpiece Layer */}
          <div
            ref={afterLayerRef}
            className="absolute inset-0 w-full h-full z-10 bg-luxury-charcoal pointer-events-none will-change-[clip-path]"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          >
            <img
              src={modularKitchenImg}
              alt="Sharkings Modular Kitchen After Renovation"
              width="1200"
              height="675"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />
            {/* Tag (Left aligned) */}
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
              <span className="bg-luxury-sage text-luxury-cream border border-luxury-sage/30 px-3.5 py-1.5 rounded-lg text-[9px] font-sans font-bold tracking-[0.2em] uppercase shadow-lg">
                AFTER: SHARKINGS MODULAR KITCHEN
              </span>
            </div>
          </div>

          {/* Gold Divider Line */}
          <div
            ref={dividerRef}
            className="absolute top-0 bottom-0 w-[2.5px] bg-[#c5a059] z-20 pointer-events-none shadow-[0_0_10px_rgba(197,160,89,0.3)] will-change-[left]"
            style={{ left: '50%' }}
          />

          {/* Draggable Circle Gold Handle */}
          <button
            ref={handleBtnRef}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#121622] border-2 border-[#c5a059] text-[#c5a059] flex items-center justify-center z-30 shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:scale-110 active:scale-95 transition-transform duration-200 cursor-grab active:cursor-grabbing focus:outline-none touch-manipulation will-change-[left]"
            style={{ left: '50%' }}
            aria-label="Drag divider handle"
          >
            <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6L4.5 12l6 6M13.5 18l6-6-6-6" />
            </svg>
          </button>

        </div>

        {/* Drag Helper tip under card */}
        <div className="text-center">
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-luxury-charcoal/50">
            ← Drag gold handle to compare before & after →
          </p>
        </div>

      </div>
    </section>
  );
}

export default memo(BeforeAfter);

