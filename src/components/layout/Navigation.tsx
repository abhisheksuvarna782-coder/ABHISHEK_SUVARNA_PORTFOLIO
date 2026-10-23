import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import './Navigation.css';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Selected Work' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#journey', label: 'Journey' },
  { href: '#contact', label: 'Contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section detection
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMenuOpen(false);
  }, []);

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="nav__inner container">
          {/* Monogram */}
          <a
            href="#"
            className="nav__monogram"
            aria-label="Abhishek Suvarna — back to top"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <span className="nav__monogram-text">AS</span>
          </a>

          {/* Desktop links */}
          <ul className="nav__links" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`nav__link ${activeSection === href.slice(1) ? 'nav__link--active' : ''}`}
                  onClick={(e) => handleNavClick(e, href)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Mobile toggle */}
          <div className="nav__actions">
            <a
              href="#contact"
              className="nav__cta"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              Let's talk
            </a>
            <button
              className="nav__toggle"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`nav__mobile ${menuOpen ? 'nav__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Navigation menu"
      >
        <ul className="nav__mobile-links" role="list">
          {NAV_LINKS.map(({ href, label }, i) => (
            <li key={href} style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}>
              <a
                href={href}
                className="nav__mobile-link"
                tabIndex={menuOpen ? 0 : -1}
                onClick={(e) => handleNavClick(e, href)}
              >
                <span className="nav__mobile-num">{String(i + 1).padStart(2, '0')}</span>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav__mobile-footer">
          <a
            href="https://github.com/abhisheksuvarna782-coder"
            target="_blank"
            rel="noopener noreferrer"
            className="nav__mobile-social"
            tabIndex={menuOpen ? 0 : -1}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/abhishek-suvarna-1bb2b6335/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav__mobile-social"
            tabIndex={menuOpen ? 0 : -1}
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="nav__overlay"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
