import { useRef, useState, useCallback, Suspense, lazy } from 'react';
import { useIntersection } from '../hooks/useIntersection';
import { use3DTilt } from '../hooks/use3DTilt';
import { Mail, Github, Linkedin, Copy, Check, Sparkles } from 'lucide-react';
import { PROFILE } from '../data/profile';
import './Contact.css';

const ContactCanvas = lazy(() => import('../components/three/ContactCanvas'));

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref, { threshold: 0.1 });
  const [copied, setCopied] = useState(false);

  use3DTilt(cardRef, { maxTilt: 4, perspective: 1200, scale: 1.01 });

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      const input = document.createElement('input');
      input.value = PROFILE.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  }, []);

  return (
    <section ref={ref} id="contact" className={`contact section ${visible ? 'contact--revealed' : ''}`} aria-label="Contact Abhishek">
      <div className="container">
        <div className="contact__layout">
          {/* Left Column: Lead & 3D Interactive Beacon */}
          <div className="contact__lead">
            <p className="label tracking-widest contact__section-label">Contact & Inquiries</p>
            <h2 className="contact__headline">
              Have a problem
              <br />
              <em>worth solving?</em>
            </h2>
            <p className="contact__sub">
              I'm interested in opportunities to learn, collaborate, and
              build useful technology. Whether it's a hackathon, research,
              an internship, or an ambitious engineering idea — reach out.
            </p>

            {/* 3D Signal Beacon */}
            <div className="contact__beacon">
              <div className="contact__beacon-header">
                <span className="contact__beacon-pulse" aria-hidden="true" />
                <span className="label font-mono">3D Signal Node · Real-time Reactor</span>
              </div>
              <div className="contact__beacon-viewport">
                <Suspense fallback={<div className="contact__beacon-fallback" />}>
                  <ContactCanvas isPulsing={copied} />
                </Suspense>
              </div>
              <p className="contact__beacon-caption label">
                Hover or copy email to trigger signal resonance
              </p>
            </div>
          </div>

          {/* Right Column: 3D Interactive Action Card */}
          <div ref={cardRef} className="contact__card">
            <div className="contact__card-glare" aria-hidden="true" />

            <div className="contact__email-block">
              <div className="contact__email-header">
                <p className="label contact__email-label">Direct Communication</p>
                {copied && (
                  <span className="contact__copied-badge label">
                    <Sparkles size={12} aria-hidden="true" /> Address copied to clipboard
                  </span>
                )}
              </div>
              <a href={`mailto:${PROFILE.email}`} className="contact__email-link">
                {PROFILE.email}
              </a>
              <button
                className={`contact__copy-btn btn btn-secondary ${copied ? 'contact__copy-btn--copied' : ''}`}
                onClick={copyEmail}
                aria-label={copied ? 'Email address copied!' : 'Copy email address'}
              >
                {copied ? (
                  <>
                    <Check size={14} aria-hidden="true" />
                    Copied to clipboard
                  </>
                ) : (
                  <>
                    <Copy size={14} aria-hidden="true" />
                    Copy email address
                  </>
                )}
              </button>
            </div>

            <div className="divider" />

            {/* Social links */}
            <div className="contact__socials" role="list" aria-label="Social and professional links">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social-link"
                role="listitem"
              >
                <div className="contact__social-icon-box">
                  <Github size={20} aria-hidden="true" />
                </div>
                <div>
                  <p className="contact__social-name">GitHub</p>
                  <p className="contact__social-sub label font-mono">abhisheksuvarna782-coder</p>
                </div>
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social-link"
                role="listitem"
              >
                <div className="contact__social-icon-box">
                  <Linkedin size={20} aria-hidden="true" />
                </div>
                <div>
                  <p className="contact__social-name">LinkedIn</p>
                  <p className="contact__social-sub label font-mono">Abhishek Suvarna</p>
                </div>
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                className="contact__social-link"
                role="listitem"
              >
                <div className="contact__social-icon-box">
                  <Mail size={20} aria-hidden="true" />
                </div>
                <div>
                  <p className="contact__social-name">Email</p>
                  <p className="contact__social-sub label font-mono">{PROFILE.email}</p>
                </div>
              </a>
            </div>

            <div className="divider" />

            <div className="contact__meta">
              <span className="contact__meta-dot" aria-hidden="true" />
              <p className="contact__location label">
                Based in Kerala, India · Open to global remote collaboration
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth 3D Architectural Marquee Ribbon */}
      <div className="contact__marquee" aria-hidden="true">
        <div className="contact__marquee-track">
          <span className="contact__marquee-item">AI & MACHINE LEARNING</span>
          <span className="contact__marquee-sep">✦</span>
          <span className="contact__marquee-item">COMPUTER VISION SYSTEMS</span>
          <span className="contact__marquee-sep">✦</span>
          <span className="contact__marquee-item">HIGH PERFORMANCE FULL-STACK</span>
          <span className="contact__marquee-sep">✦</span>
          <span className="contact__marquee-item">ROBUST ARCHITECTURAL REASONING</span>
          <span className="contact__marquee-sep">✦</span>
          <span className="contact__marquee-item">LET’S BUILD SOMETHING MEANINGFUL</span>
          <span className="contact__marquee-sep">✦</span>
          <span className="contact__marquee-item">AI & MACHINE LEARNING</span>
          <span className="contact__marquee-sep">✦</span>
          <span className="contact__marquee-item">COMPUTER VISION SYSTEMS</span>
          <span className="contact__marquee-sep">✦</span>
          <span className="contact__marquee-item">HIGH PERFORMANCE FULL-STACK</span>
          <span className="contact__marquee-sep">✦</span>
          <span className="contact__marquee-item">ROBUST ARCHITECTURAL REASONING</span>
          <span className="contact__marquee-sep">✦</span>
        </div>
      </div>
    </section>
  );
}
