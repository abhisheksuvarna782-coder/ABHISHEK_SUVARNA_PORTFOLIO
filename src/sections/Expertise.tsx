import { useRef } from 'react';
import { useIntersection } from '../hooks/useIntersection';
import { PROFILE } from '../data/profile';
import './Expertise.css';

const SKILL_GROUPS = [
  {
    id: 'programming',
    label: '01 — Programming & Problem Solving',
    items: PROFILE.skills.programming,
    note: 'Core languages and CS fundamentals from coursework and projects.',
  },
  {
    id: 'ai',
    label: '02 — AI, Machine Learning & Computer Vision',
    items: PROFILE.skills.ai,
    note: 'Applied in DeepShield (ViT), CyberGuard X (sklearn), HealVision, and RouteRecover AI.',
  },
  {
    id: 'web',
    label: '03 — Backend & Web Development',
    items: PROFILE.skills.web,
    note: 'FastAPI and Flask used in production projects. React in DeepShield and Shazaam.',
  },
  {
    id: 'cloud',
    label: '04 — Cloud & Developer Tools',
    items: PROFILE.skills.cloud,
    note: 'Oracle OCI (certified), Microsoft Azure (certified). Projects deployed to Vercel and Railway.',
  },
];

export default function Expertise() {
  const ref = useRef<HTMLElement>(null);
  const visible = useIntersection(ref, { threshold: 0.08 });

  return (
    <section ref={ref} id="expertise" className="expertise section" aria-label="Skills and expertise">
      <div className="container">

        {/* Header */}
        <div className={`expertise__header reveal ${visible ? 'revealed' : ''}`}>
          <p className="label tracking-widest">Expertise</p>
          <h2 className="expertise__headline">
            A map of my technical capabilities,
            <br />
            <em>grounded in built projects.</em>
          </h2>
        </div>

        {/* Skill groups */}
        <div className="expertise__groups">
          {SKILL_GROUPS.map((group, i) => {
            const groupVisible = visible;
            return (
              <div
                key={group.id}
                className={`expertise__group reveal ${groupVisible ? 'revealed' : ''}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="expertise__group-header">
                  <span className="expertise__group-label label tracking-wide">{group.label}</span>
                  <p className="expertise__group-note">{group.note}</p>
                </div>
                <div className="expertise__items" role="list" aria-label={`${group.id} skills`}>
                  {group.items.map((item) => (
                    <span key={item} className="expertise__item tag" role="listitem">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications sub-section */}
        <div className={`expertise__certs reveal ${visible ? 'revealed' : ''} reveal-delay-4`}>
          <h3 className="expertise__certs-title label tracking-widest">Certifications</h3>
          <div className="expertise__certs-grid">
            {PROFILE.certifications.map((cert, i) => (
              <div key={i} className="expertise__cert-card">
                <p className="expertise__cert-name">{cert.name}</p>
                <p className="expertise__cert-issuer label">{cert.issuer}</p>
                <p className="expertise__cert-date font-mono text-xs">{cert.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
