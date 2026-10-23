import { useEffect, type RefObject } from 'react';

interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
}

export function use3DTilt<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { maxTilt = 8, perspective = 1000, scale = 1.02 }: TiltOptions = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    el.style.transformStyle = 'preserve-3d';
    el.style.perspective = `${perspective}px`;
    el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease';

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width - 0.5) * 2;
      const normY = (y / rect.height - 0.5) * 2;

      const tiltX = -normY * maxTilt;
      const tiltY = normX * maxTilt;

      el.style.transform = `perspective(${perspective}px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
      el.style.setProperty('--mouse-x', `${(x / rect.width * 100).toFixed(1)}%`);
      el.style.setProperty('--mouse-y', `${(y / rect.height * 100).toFixed(1)}%`);
    };

    const handlePointerLeave = () => {
      el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      el.style.setProperty('--mouse-x', '50%');
      el.style.setProperty('--mouse-y', '50%');
    };

    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
      el.style.transform = '';
    };
  }, [ref, maxTilt, perspective, scale]);
}
