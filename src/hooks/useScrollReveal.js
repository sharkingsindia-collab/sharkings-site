import { useEffect } from 'react';

export function useScrollReveal(options) {
  useEffect(() => {
    if (typeof window === 'undefined' || !document) return;

    try {
      const elements = document.querySelectorAll('.reveal-3d-popup');
      if (elements && elements.length > 0) {
        elements.forEach((el) => {
          if (el && el.classList) {
            el.classList.add('active');
          }
        });
      }
    } catch (err) {
      console.warn('Scroll reveal init error:', err);
    }
  }, []);
}
