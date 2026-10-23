import { useEffect, useRef, useState, Suspense, lazy } from 'react';
import './Hero.css';

const ThreeCanvas = lazy(() => import('../components/three/ThreeCanvas'));

// Static fallback for WebGL unavailable / reduced motion
function StaticFallback() {
  return (
    <div className="hero__3d-fallback" aria-hidden="true">
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="hero__svg-sculpture">
        <defs>
          <radialGradient id="rg1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4C9A8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#777C5B" stopOpacity="0.1" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="150" fill="none" stroke="#DCD8CE" strokeWidth="1" />
        <circle cx="200" cy="200" r="110" fill="none" stroke="#C8C4BA" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="70" fill="url(#rg1)" />
        {[...Array(20)].map((_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const r = 120 + Math.sin(i * 1.4) * 20;
          const x = 200 + Math.cos(angle) * r;
          const y = 200 + Math.sin(angle) * r;
          return <circle key={i} cx={x} cy={y} r="2" fill="#777C5B" opacity={0.6} />;
        })}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x1 = 200 + Math.cos(angle) * 70;
          const y1 = 200 + Math.sin(angle) * 70;
          const x2 = 200 + Math.cos(angle + Math.PI / 6) * 120;
          const y2 = 200 + Math.sin(angle + Math.PI / 6) * 120;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#A8A47A" strokeWidth="0.5" opacity={0.4} />;
        })}
      </svg>
    </div>
  );
}

interface HeroProps {
  onScrollProgress: (p: number) => void;
}

export default function Hero({ onScrollProgress }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [webglAvailable] = useState(() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  });
  const [isVisible, setIsVisible] = useState(false);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  // Scroll-driven progress
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const total = heroRef.current.offsetHeight + window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (total * 0.6)));
      setScrollProgress(progress);
      onScrollProgress(progress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScrollProgress]);

  // Mouse tracking (desktop only)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section ref={heroRef} className="hero" id="hero" aria-label="Introduction">
      {/* Scroll-linked 3D scene */}
      <div className="hero__canvas-wrap">
        {webglAvailable ? (
          <Suspense fallback={<StaticFallback />}>
            <ThreeCanvas
              scrollProgress={scrollProgress}
              mouseX={mouse.x}
              mouseY={mouse.y}
              className="hero__canvas"
            />
          </Suspense>
        ) : (
          <StaticFallback />
        )}
      </div>

      {/* Editorial content */}
      <div className="hero__content container">
        <div className={`hero__editorial ${isVisible ? 'hero__editorial--visible' : ''}`}>

          {/* Issue / index metadata */}
          <div className="hero__meta">
            <span className="label">Portfolio — 2024</span>
            <span className="hero__meta-dot" aria-hidden="true" />
            <span className="label">Kerala, India</span>
          </div>

          {/* Eyebrow */}
          <p className="hero__eyebrow label tracking-widest">
            Independently curious. Engineering-driven.
          </p>

          {/* Main headline */}
          <h1 className="hero__headline">
            Turning complex ideas
            <br />
            <em>into useful intelligence.</em>
          </h1>

          {/* Supporting text */}
          <p className="hero__sub">
            I'm Abhishek Suvarna, an AI&nbsp;&amp;&nbsp;ML engineering student
            building thoughtful software across machine learning,
            computer vision, and the web.
          </p>

          {/* Actions */}
          <div className="hero__actions">
            <a href="#work" className="btn btn-primary hero__cta-primary">
              Explore selected work
            </a>
            <a href="#contact" className="btn btn-secondary hero__cta-secondary">
              Get in touch
            </a>
          </div>

          {/* Discipline badge */}
          <div className="hero__discipline">
            <span className="tag">AI & ML</span>
            <span className="tag">Computer Vision</span>
            <span className="tag">Full Stack</span>
          </div>
        </div>

        {/* Scroll invitation */}
        <div className={`hero__scroll-hint ${isVisible ? 'hero__scroll-hint--visible' : ''}`} aria-hidden="true">
          <div className="hero__scroll-line" />
          <span className="label">Scroll</span>
        </div>
      </div>

      {/* 3D annotation — appears during scroll */}
      <div
        className="hero__annotation"
        style={{ opacity: Math.min(1, scrollProgress * 4) }}
        aria-hidden="true"
      >
        <span className="label">Signal → Intelligence</span>
      </div>
    </section>
  );
}
