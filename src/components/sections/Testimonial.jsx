import { useState, useEffect, useCallback, memo } from 'react';
import ScrollReveal from '../ScrollReveal';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: 'Jai Krishna',
    quote: 'Sharkings, one of the best interiors in Tamilnadu. Works are highly professional and the design and concepts are just amazing... As the result we could get outstanding interior design. Both my house and office interior and exterior done by sharkings...one word.. Thanks man🙏... I would strongly recommend Sharkings for your interior and exterior 😊',
    rating: 5,
    tag: 'Interior Design'
  },
  {
    id: 2,
    name: 'Abdul Kalam',
    quote: 'One of the best and professional working in Interior and Exterior in Tamilnadu. And also doing a lots of Container Projects.',
    rating: 4,
    tag: 'Interior Design'
  },
  {
    id: 3,
    name: 'Sarbu Deen',
    quote: 'Absolutely loved Sharking!!!!! The process was simple and the designers understood my vision and made it a reality. Communication was amazing. I’m now in the shopping stage and can’t wait until it’s all done.Thanks Mr.Sharukhan.',
    rating: 5,
    tag: 'Interior Design'
  }
];

const getInitials = (name) => {
  if (!name) return 'SI';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

function Testimonial({ testimonialRef }) {
  const [mobileActive, setMobileActive] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play for mobile dynamic carousel
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setMobileActive((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = useCallback((e) => {
    setIsPaused(true);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 40;
    const isRightSwipe = distance < -40;

    if (isLeftSwipe) {
      setMobileActive((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }
    if (isRightSwipe) {
      setMobileActive((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
    }

    setTouchStart(0);
    setTouchEnd(0);
    setIsPaused(false);
  }, [touchStart, touchEnd]);

  const prevSlide = useCallback(() => {
    setMobileActive((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  }, []);

  const nextSlide = useCallback(() => {
    setMobileActive((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  }, []);

  return (
    <section
      ref={testimonialRef}
      id="testimonials"
      className="relative w-full py-16 sm:py-24 bg-luxury-charcoal text-luxury-cream z-30 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 space-y-10 md:space-y-14">

        {/* Minimal Header */}
        <ScrollReveal variant="up">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="flex items-center justify-center gap-3">
              <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#b7c4a1] uppercase">
                CLIENT STORIES
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-medium text-luxury-cream tracking-tight leading-tight">
              Loved by Our Clients
            </h2>
            <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed font-normal">
              Verified client feedback from homeowners and business leaders across Madurai &amp; Ramanathapuram.
            </p>
          </div>
        </ScrollReveal>

        {/* DESKTOP VIEW: Clean 3-Column Minimal Cards */}
        <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {TESTIMONIALS_DATA.map((client, idx) => (
            <ScrollReveal key={client.id} variant="up" delay={idx * 100} className="flex">
              <div
                className="w-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/12 hover:border-[#c5a059]/45 p-7 lg:p-8 rounded-xl flex flex-col justify-between space-y-6 transition-all duration-300 group shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-amber-400" aria-label={`${client.rating} out of 5 stars`}>
                      {[...Array(client.rating)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>

                    <span className="text-xs font-sans font-bold tracking-[0.12em] text-[#e0be7a] uppercase border border-[#c5a059]/30 px-2.5 py-0.5 rounded-md bg-[#c5a059]/10">
                      {client.tag}
                    </span>
                  </div>

                  <p className="font-sans text-sm lg:text-base text-white/90 leading-relaxed font-normal">
                    &ldquo;{client.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-white/10">
                  <div className="w-11 h-11 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/45 flex items-center justify-center flex-shrink-0">
                    <span className="font-sans text-sm font-bold tracking-wider text-[#e0be7a]">
                      {getInitials(client.name)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-sans text-base font-semibold text-white group-hover:text-[#e0be7a] transition-colors">
                      {client.name}
                    </h3>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* MOBILE VIEW: Fully Dynamic Touch-Swipeable Sliding Carousel */}
        <ScrollReveal variant="scale" delay={80} className="block md:hidden">
          <div
            className="space-y-5"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >

          {/* Touch Slider Viewport */}
          <div
            className="w-full overflow-hidden relative cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out transform-gpu"
              style={{ transform: `translate3d(-${mobileActive * 100}%, 0, 0)` }}
            >
              {TESTIMONIALS_DATA.map((client) => (
                <div
                  key={client.id}
                  className="w-full flex-shrink-0 px-1"
                >
                  <div className="bg-white/[0.04] border border-[#c5a059]/35 p-6 rounded-xl space-y-5 shadow-xl">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 text-amber-400" aria-label={`${client.rating} out of 5 stars`}>
                        {[...Array(client.rating)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                          </svg>
                        ))}
                      </div>

                      <span className="text-xs font-sans font-bold tracking-[0.12em] text-[#e0be7a] uppercase border border-[#c5a059]/30 px-2.5 py-0.5 rounded-md bg-[#c5a059]/10">
                        {client.tag}
                      </span>
                    </div>

                    <p className="font-sans text-sm text-white/95 leading-relaxed font-normal">
                      &ldquo;{client.quote}&rdquo;
                    </p>

                    <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                      <div className="w-10 h-10 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/45 flex items-center justify-center flex-shrink-0">
                        <span className="font-sans text-sm font-bold tracking-wider text-[#e0be7a]">
                          {getInitials(client.name)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-sans text-base font-semibold text-white">
                          {client.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Dynamic Controls: Arrow Taps + Active Dots + Swipe Hint */}
          <div className="flex items-center justify-between px-2 pt-2">

            {/* Prev Button */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous Review"
              className="p-2.5 rounded-md border border-white/20 text-white/85 hover:text-[#141210] hover:bg-[#c5a059] hover:border-[#c5a059] focus:outline-none transition-colors touch-manipulation"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Active Indicator Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMobileActive(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer touch-manipulation ${mobileActive === idx
                    ? 'w-7 bg-[#c5a059]'
                    : 'w-2 bg-white/30'
                    }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next Review"
              className="p-2.5 rounded-md border border-white/20 text-white/85 hover:text-[#141210] hover:bg-[#c5a059] hover:border-[#c5a059] focus:outline-none transition-colors touch-manipulation"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          <p className="text-center font-sans text-xs font-medium tracking-wider text-white/75 uppercase">
            Swipe or use arrows to explore reviews
          </p>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

export default memo(Testimonial);
