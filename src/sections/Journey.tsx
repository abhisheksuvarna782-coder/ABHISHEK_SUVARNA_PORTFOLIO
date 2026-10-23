import { useRef } from 'react';
import { useIntersection } from '../hooks/useIntersection';
import { use3DTilt } from '../hooks/use3DTilt';
import { PROFILE } from '../data/profile';
import './Journey.css';

type TimelineItem = {
  type: 'education' | 'certification' | 'hackathon' | 'workshop';
  year: string;
  title: string;
  subtitle: string;
  detail?: string;
  awardBadge?: string;
};

const timeline: TimelineItem[] = [
  {
    type: 'education',
    year: '2023 –',
    title: 'Bachelor of Engineering (AI & ML)',
    subtitle: 'AJ Institute of Engineering and Technology, Mangalore',
    detail: 'Current CGPA: 8.7 — Consistent Semester Progression: 8.32 → 9.05 → 8.65 → 8.7 → 8.8',
    awardBadge: 'Top 5% Academic Ranking',
  },
  {
    type: 'hackathon',
    year: '2026',
    title: 'Hack to Future 2026',
    subtitle: 'National-Level Hackathon — NITK Surathkal',
    detail: 'National Finalist engineering low-latency predictive pipelines in 24h sprint.',
    awardBadge: 'National Finalist',
  },
  {
    type: 'hackathon',
    year: '2026',
    title: 'Sahyadri DevHost 2026',
    subtitle: 'Synergia 26 — RouteRecover AI (Problem Statement 4.1)',
    detail: 'Engineered multi-modal recovery engine with Team QuadCoders.',
    awardBadge: 'Problem 4.1 Finalist',
  },
  {
    type: 'certification',
    year: 'Sep 2025',
    title: 'Oracle Certified Foundations Associate',
    subtitle: 'Oracle Cloud Infrastructure',
    detail: 'Enterprise cloud infrastructure, compute instances, IAM security & networking.',
    awardBadge: 'Oracle Certified',
  },
  {
    type: 'certification',
    year: 'Aug 2025',
    title: 'AINNOVATION 2025',
    subtitle: 'Microsoft Azure Learning Challenge',
    detail: 'Azure Cognitive Services, model deployment & intelligent agent workflows.',
    awardBadge: 'Azure Certified',
  },
  {
    type: 'certification',
    year: 'Oct 2025',
    title: 'Python Bootcamp',
    subtitle: 'LetsUpgrade — NSDC & ITM EduTech',
    detail: 'Advanced algorithms, OOP, data engineering, and backend architectures.',
  },
  {
    type: 'hackathon',
    year: '2025',
    title: 'NEXATHON 2025',
    subtitle: '24-Hour National Hackathon — Shree Devi Institute of Technology',
    detail: 'Built HealVision AI health analytics platform under hackathon time limit.',
    awardBadge: '24-Hour National Sprint',
  },
  {
    type: 'hackathon',
    year: '2025',
    title: 'Empathy Encryption Hackathon',
    subtitle: 'Unsaid Talks Education Pvt. Ltd.',
    detail: 'Secure data management and private client-side encryption models.',
  },
  {
    type: 'certification',
    year: '2025',
    title: 'Python Fundamentals & Mastering Python',
    subtitle: 'Infosys Springboard',
    detail: 'Core computational logic, data structures, and functional design patterns.',
  },
  {
    type: 'workshop',
    year: '2025',
    title: 'Code for Bharat Gen AI Workshop',
    subtitle: 'Code for Bharat — Generative AI & Foundation Models',
  },
  {
    type: 'workshop',
    year: '2025',
    title: 'Unicourt Hands-on Workshop',
    subtitle: 'Unicourt, Mangalore — Production Data Pipelines',
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

function TimelineCard({ item, visible, index }: { item: TimelineItem; visible: boolean; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  use3DTilt(cardRef, { maxTilt: 4, perspective: 800, scale: 1.01 });

  return (
    <li
      className={`timeline__item timeline__item--${item.type} reveal ${visible ? 'revealed' : ''}`}
      style={{ transitionDelay: `${Math.min(index * 50, 500)}ms` }}
    >
      <div className="timeline__marker" aria-hidden="true">
        <div className="timeline__dot" />
      </div>
      <div ref={cardRef} className="timeline__body timeline__body--3d">
        <div className="timeline__glare" aria-hidden="true" />
        <div className="timeline__row">
          <time className="timeline__year font-mono">{item.year}</time>
          <div className="timeline__badges">
            {item.awardBadge && (
              <span className="timeline__award-badge label font-mono">
                {item.awardBadge}
              </span>
            )}
            <span className={`timeline__type-badge label timeline__type-badge--${item.type}`}>
              {TYPE_LABELS[item.type]}
            </span>
          </div>
        </div>
        <h3 className="timeline__title">{item.title}</h3>
        <p className="timeline__sub">{item.subtitle}</p>
        {item.detail && <p className="timeline__detail font-mono">{item.detail}</p>}
      </div>
    </li>
  );
}

export default function Journey() {
  const ref = useRef<HTMLElement>(null);
  const visible = useIntersection(ref, { threshold: 0.05 });

  return (
    <section ref={ref} id="journey" className="journey section" aria-label="Education and technical journey">
      <div className="container">

        <div className={`journey__header reveal ${visible ? 'revealed' : ''}`}>
          <p className="label tracking-widest">Journey & Milestones</p>
          <h2 className="journey__headline">
            The education, events, and
            <br />
            <em>milestones along the way.</em>
          </h2>
        </div>

        {/* Timeline with 3D Interactive Cards */}
        <ol className="timeline" aria-label="Career and education timeline">
          {timeline.map((item, i) => (
            <TimelineCard key={i} item={item} visible={visible} index={i} />
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
