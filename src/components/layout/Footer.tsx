import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import './Footer.css';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">

        <div className="footer__top">
          {/* 3D Dual-Face Monogram Token */}
          <div className="footer__brand">
            <div className="footer__token" tabIndex={0} role="img" aria-label="Abhishek Suvarna 3D Monogram Token">
              <div className="footer__token-inner">
                <span className="footer__token-front">AS</span>
                <span className="footer__token-back">✦</span>
              </div>
            </div>
            <p className="footer__name">Abhishek Suvarna</p>
            <p className="footer__tagline label">AI & ML Engineering Student · Kerala, India</p>
          </div>

          {/* Social links */}
          <div className="footer__socials" aria-label="Social links">
            <a
              href="https://github.com/abhisheksuvarna782-coder"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="GitHub profile"
            >
              <Github size={18} aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/abhishek-suvarna-1bb2b6335/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={18} aria-hidden="true" />
            </a>
            <a
              href="mailto:abhisheksuvarna782@gmail.com"
              className="footer__social-link"
              aria-label="Send email"
            >
              <Mail size={18} aria-hidden="true" />
            </a>
          </div>

          {/* Back to top */}
          <button
            className="footer__top-btn btn btn-secondary"
            onClick={scrollTop}
            aria-label="Back to top of page"
          >
            <ArrowUp size={16} aria-hidden="true" />
            Back to top
          </button>
        </div>

        <div className="divider footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copy label">
            © {CURRENT_YEAR} Abhishek Suvarna. Designed and built with care.
          </p>
          <p className="footer__closing label">
            Built to learn. Written to be read.
          </p>
        </div>
      </div>
    </footer>
  );
}
