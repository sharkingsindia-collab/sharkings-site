import { useEffect, useRef, useCallback, memo } from 'react';
import ScrollReveal from '../ScrollReveal';
import beforeKitchenImg from '../../assets/before-kitchen.webp';
import afterKitchenImg from '../../assets/after-kitchen.webp';

function BeforeAfter() {
  const isDraggingRef = useRef(false);
  const containerRef = useRef(null);
  const afterLayerRef = useRef(null);
  const dividerRef = useRef(null);
  const handleBtnRef = useRef(null);

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

  const handlePointerMove = useCallback(
    (clientX) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      updateDOMSlider(percentage);
    },
    [updateDOMSlider]
  );

  useEffect(() => {
    updateDOMSlider(50);
  }, [updateDOMSlider]);

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
    <section
      id="transformation"
      className="relative z-30 bg-[#f2efe8] text-luxury-charcoal py-16 sm:py-24 px-4 sm:px-8 md:px-16 lg:px-24 border-t border-black/10 overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute font-display text-[16vw] text-[#710014]/[0.025] font-normal select-none pointer-events-none z-0 left-0 top-1/3 whitespace-nowrap">
        LIVE TRANSFORMATION
      </div>

      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10 relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="flex items-center justify-center gap-3">
              <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#710014] uppercase">
                INTERACTIVE COMPARISON
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-[54px] font-medium text-[#1a1a1a] tracking-tight leading-tight">
              The Art of Sharkings{' '}
              <span className="italic font-medium text-[#710014]">Design</span>
            </h2>

            <p className="font-sans text-sm md:text-base text-[#333333] leading-relaxed font-normal max-w-2xl mx-auto">
              Drag the slider across the space to compare bare site conditions with our completed modular kitchen installation.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Comparison Card Container */}
        <ScrollReveal variant="scale" delay={100} className="space-y-4">
          <div
            ref={containerRef}
          onPointerDown={handlePointerDown}
          className="relative w-full aspect-[16/10] md:aspect-[16/9] lg:max-h-[580px] rounded-xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.08)] border border-black/15 select-none cursor-ew-resize bg-luxury-charcoal touch-pan-y"
        >
          {/* BEFORE Layer */}
          <div className="absolute inset-0 w-full h-full z-0 bg-luxury-charcoal">
            <img
              src={beforeKitchenImg}
              alt="Bare Kitchen Space Before Renovation"
              width="1024"
              height="576"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />
            <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 pointer-events-none">
              <span className="bg-[#121622]/95 text-white border border-white/25 px-3 py-1.5 rounded-md text-[11px] sm:text-xs font-sans font-bold tracking-[0.12em] uppercase shadow-md">
                BEFORE: BARE SITE
              </span>
            </div>
          </div>

          {/* AFTER Layer */}
          <div
            ref={afterLayerRef}
            className="absolute inset-0 w-full h-full z-10 bg-luxury-charcoal pointer-events-none will-change-[clip-path]"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          >
            <img
              src={afterKitchenImg}
              alt="Sharkings Modular Kitchen After Renovation"
              width="1024"
              height="576"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />
            <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-10 pointer-events-none">
              <span className="bg-[#710014] text-white border border-white/20 px-3 py-1.5 rounded-md text-[11px] sm:text-xs font-sans font-bold tracking-[0.12em] uppercase shadow-lg">
                AFTER: MODULAR KITCHEN
              </span>
            </div>
          </div>

          {/* Gold Divider Line */}
          <div
            ref={dividerRef}
            className="absolute top-0 bottom-0 w-[2.5px] bg-[#c5a059] z-20 pointer-events-none shadow-[0_0_10px_rgba(197,160,89,0.4)] will-change-[left]"
            style={{ left: '50%' }}
          />

          {/* Draggable Circle Handle */}
          <button
            type="button"
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

        {/* Drag Helper tip */}
        <div className="text-center">
          <p className="font-sans text-xs font-bold tracking-[0.16em] uppercase text-[#333333]">
            ← Drag gold handle to compare before &amp; after →
          </p>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default memo(BeforeAfter);
