import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook that uses IntersectionObserver to detect when an element
 * enters the viewport. Returns a ref and a boolean `isVisible`.
 * Once visible, it stays visible (no reverse).
 */
export function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node); // Once visible, stop observing
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}
