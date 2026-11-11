import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  variant = 'up',
  delay = 0,
  className = ''
}) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(() => {
    if (typeof window === 'undefined') return true;
    return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
  });

  useEffect(() => {
    if (isRevealed) return;
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      const rafId = requestAnimationFrame(() => setIsRevealed(true));
      return () => cancelAnimationFrame(rafId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight * 0.96) {
            setIsRevealed(true);
            observer.disconnect();
            break;
          }
        }
      },
      {
        root: null,
        rootMargin: '20000px 200px -24px 200px',
        threshold: 0
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isRevealed]);

  const variantClass =
    variant === 'left'
      ? 'scroll-reveal--left'
      : variant === 'right'
        ? 'scroll-reveal--right'
        : variant === 'scale'
          ? 'scroll-reveal--scale'
          : 'scroll-reveal--up';

  const mergedStyle = delay > 0 ? { '--reveal-delay': `${delay}ms` } : undefined;

  return (
    <div
      ref={ref}
      style={mergedStyle}
      className={`scroll-reveal ${variantClass} ${isRevealed ? 'is-revealed' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

