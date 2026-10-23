import { useRef } from 'react';
import { useIntersection } from '../hooks/useIntersection';
import { PROFILE } from '../data/profile';
import './Journey.css';

type TimelineItem = {
  type: 'education' | 'certification' | 'hackathon' | 'workshop';
  year: string;
  title: string;
  subtitle: string;
  detail?: string;
};

const timeline: TimelineItem[] = [
  {
    type: 'education',
    year: '2023 –',
    title: 'Bachelor of Engineering (AI & ML)',
    subtitle: 'AJ Institute of Engineering and Technology, Mangalore',
    detail: 'Current CGPA: 8.7 — Semester progression: 8.32 → 9.05 → 8.65 → 8.7 → 8.8',
  },
  {
    type: 'hackathon',
    year: '2026',
    title: 'Hack to Future 2026',
    subtitle: 'National-Level Hackathon — NITK Surathkal',
  },
  {
    type: 'hackathon',
    year: '2026',
    title: 'Sahyadri DevHost 2026',
    subtitle: 'Synergia 26 — RouteRecover AI (Problem Statement 4.1)',
  },
  {
    type: 'certification',
    year: 'Oct 2025',
    title: 'Python Bootcamp',
    subtitle: 'LetsUpgrade — NSDC & ITM EduTech',
  },
  {
    type: 'certification',
    year: 'Sep 2025',
    title: 'Oracle Certified Foundations Associate',
    subtitle: 'Oracle Cloud Infrastructure',
  },
  {
    type: 'certification',
    year: 'Aug 2025',
    title: 'AINNOVATION 2025',
    subtitle: 'Microsoft Azure Learning Challenge',
  },
  {
    type: 'hackathon',
    year: '2025',
    title: 'NEXATHON 2025',
    subtitle: '24-Hour National Hackathon — Shree Devi Institute of Technology',
  },
  {
    type: 'hackathon',
    year: '2025',
    title: 'Empathy Encryption Hackathon',
    subtitle: 'Unsaid Talks Education Pvt. Ltd.',
  },
  {
    type: 'certification',
    year: '2025',
    title: 'Python Fundamentals & Mastering Python',
    subtitle: 'Infosys Springboard',
  },
  {
    type: 'workshop',
    year: '2025',
    title: 'Code for Bharat Gen AI Workshop',
    subtitle: 'Code for Bharat',
  },
  {
    type: 'workshop',
    year: '2025',
    title: 'Be10x AI Tools Workshop',
    subtitle: 'Be10x',
  },
  {
    type: 'workshop',
    year: '2025',
    title: 'Unicourt Workshop',
    subtitle: 'Unicourt, Mangalore — Hands-on',
  },
  {
    type: 'education',
    year: '2023',
    title: 'Pre-University Course (PCMB) — 88%',
    subtitle: 'Sarojini Madhusudan Kushe PU College',
  },
  {
    type: 'education',
    year: '2021',
    title: 'SSLC — 87%',
    subtitle: 'Bhagavathi English Medium School',
  },
];

const TYPE_LABELS: Record<TimelineItem['type'], string> = {
  education: 'Education',
  certification: 'Certification',
  hackathon: 'Hackathon',
  workshop: 'Workshop',
};

export default function Journey() {
  const ref = useRef<HTMLElement>(null);
  const visible = useIntersection(ref, { threshold: 0.05 });

  return (
    <section ref={ref} id="journey" className="journey section" aria-label="Education and technical journey">
      <div className="container">

        <div className={`journey__header reveal ${visible ? 'revealed' : ''}`}>
          <p className="label tracking-widest">Journey</p>
          <h2 className="journey__headline">
            The education, events, and
            <br />
            <em>milestones along the way.</em>
          </h2>
        </div>

        {/* Timeline */}
        <ol className="timeline" aria-label="Career and education timeline">
          {timeline.map((item, i) => (
            <li
              key={i}
              className={`timeline__item timeline__item--${item.type} reveal ${visible ? 'revealed' : ''}`}
              style={{ transitionDelay: `${Math.min(i * 60, 600)}ms` }}
            >
              <div className="timeline__marker" aria-hidden="true">
                <div className="timeline__dot" />
              </div>
              <div className="timeline__body">
                <div className="timeline__row">
                  <time className="timeline__year font-mono">{item.year}</time>
                  <span className={`timeline__type-badge label timeline__type-badge--${item.type}`}>
                    {TYPE_LABELS[item.type]}
                  </span>
                </div>
                <h3 className="timeline__title">{item.title}</h3>
                <p className="timeline__sub">{item.subtitle}</p>
                {item.detail && <p className="timeline__detail font-mono">{item.detail}</p>}
              </div>
            </li>
          ))}
        </ol>

        {/* Beyond the screen */}
        <div className={`journey__personal reveal ${visible ? 'revealed' : ''} reveal-delay-5`}>
          <div className="journey__personal-inner">
            <p className="label tracking-widest journey__personal-label">Beyond the Screen</p>
            <p className="journey__personal-text">
              When I'm not building or learning, you'll find me on a volleyball court
              or on the athletics track — both demand the same quality I bring to engineering:
              full attention, disciplined practice, and finishing what you started.
            </p>
            <div className="journey__langs">
              <p className="label">Languages</p>
              <div className="journey__lang-list">
                {PROFILE.languages.map((l, i) => (
                  <span key={i} className="journey__lang tag">{l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
