import { useRef } from 'react';
import { useIntersection } from '../hooks/useIntersection';
import { PROFILE } from '../data/profile';
import './About.css';

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const visible = useIntersection(ref, { threshold: 0.1 });

  return (
    <section ref={ref} id="about" className={`about section ${visible ? 'revealed' : ''}`} aria-label="About Abhishek">
      <div className="container">
        <div className="about__layout">

          {/* Left: Label + Index */}
          <div className="about__sidebar">
            <div className={`reveal ${visible ? 'revealed' : ''}`}>
              <p className="label tracking-widest about__section-label">About</p>
              <div className="about__index-wrap">
                <span className="about__index-num font-mono">§01</span>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="about__body">

            <div className={`reveal ${visible ? 'revealed' : ''} reveal-delay-1`}>
              <h2 className="about__headline">
                Engineering thoughtful software
                <br />
                <em>at the intersection of AI and practice.</em>
              </h2>
            </div>

            <div className={`about__paragraphs reveal ${visible ? 'revealed' : ''} reveal-delay-2`}>
              {PROFILE.bio.map((para, i) => (
                <p key={i} className="about__para">{para}</p>
              ))}
            </div>

            {/* Pull quote */}
            <blockquote className={`about__quote reveal ${visible ? 'revealed' : ''} reveal-delay-3`}>
              <p>"I learn through implementation."</p>
            </blockquote>

            {/* Fact strip */}
            <div className={`about__facts reveal ${visible ? 'revealed' : ''} reveal-delay-4`}>
              <div className="about__fact">
                <span className="about__fact-num font-serif">8.7</span>
                <span className="about__fact-label label">Current CGPA</span>
              </div>
              <div className="about__fact-sep" aria-hidden="true" />
              <div className="about__fact">
                <span className="about__fact-num font-serif">3+</span>
                <span className="about__fact-label label">National Hackathons</span>
              </div>
              <div className="about__fact-sep" aria-hidden="true" />
              <div className="about__fact">
                <span className="about__fact-num font-serif">5+</span>
                <span className="about__fact-label label">AI Projects Built</span>
              </div>
              <div className="about__fact-sep" aria-hidden="true" />
              <div className="about__fact">
                <span className="about__fact-num font-serif">2028</span>
                <span className="about__fact-label label">Expected Graduation</span>
              </div>
            </div>

            {/* Links */}
            <div className={`about__links reveal ${visible ? 'revealed' : ''} reveal-delay-5`}>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="about__link link-underline"
              >
                GitHub
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="about__link link-underline"
              >
                LinkedIn
              </a>
              <a href="#contact" className="about__link link-underline">
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
