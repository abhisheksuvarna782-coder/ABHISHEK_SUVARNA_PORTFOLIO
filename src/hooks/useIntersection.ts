import { useState, useEffect, type RefObject } from 'react';

interface Options {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useIntersection(
  ref: RefObject<Element | null>,
  { threshold = 0.1, rootMargin = '0px', once = true }: Options = {}
): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, once]);

  return visible;
}
