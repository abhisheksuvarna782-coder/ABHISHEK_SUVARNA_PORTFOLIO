import { useRef, useState, type ReactNode } from 'react';
import { ExternalLink, Github, ArrowUpRight, Trophy, Zap, ShieldCheck } from 'lucide-react';
import { useIntersection } from '../hooks/useIntersection';
import { use3DTilt } from '../hooks/use3DTilt';
import { PROJECTS, FEATURED_PROJECTS, CATEGORY_LABELS, type ProjectCategory } from '../data/projects';
import ProjectDetail from '../components/projects/ProjectDetail';
import './Work.css';

const ALL_CATEGORIES: ProjectCategory[] = ['ai-ml', 'computer-vision', 'full-stack', 'security', 'data-cloud'];

const ACHIEVEMENTS = [
  {
    icon: Trophy,
    title: 'Hack to Future 2026',
    host: 'NITK Surathkal — National Level',
    category: 'AI & Systems Innovation',
    detail: 'Finalist engineering predictive systems and real-time inference under 24-hour sprint pressure.',
    tag: 'National Finalist',
  },
  {
    icon: Zap,
    title: 'Sahyadri DevHost 2026',
    host: 'Synergia 26 (Team QuadCoders)',
    category: 'Constraint-Aware AI',
    detail: 'Engineered RouteRecover AI for Problem Statement 4.1, delivering automated disruption recovery.',
    tag: 'Problem 4.1 Innovator',
  },
  {
    icon: ShieldCheck,
    title: 'Oracle OCI Certified',
    host: 'Oracle Cloud Infrastructure',
    category: 'Cloud Architecture & Security',
    detail: 'Certified Foundations Associate in cloud infrastructure, enterprise security, and IAM.',
    tag: 'Certified Associate',
  },
  {
    icon: Trophy,
    title: 'NEXATHON 2025',
    host: 'Shree Devi Institute of Technology',
    category: 'Healthcare & ML',
    detail: 'Demonstrated HealVision health analytics platform in 24-hour national hackathon.',
    tag: 'National Hackathon',
  },
];

// SVG thumbnails for each project — architectural representations
function ProjectThumbnail({ id }: { id: string }) {
  const configs: Record<string, ReactNode> = {
    deepshield: (
      <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="DeepShield visual representation">
        <rect width="400" height="260" fill="#EEEAE1"/>
        <path d="M200 40 L280 80 L280 160 Q200 220 200 220 Q200 220 120 160 L120 80 Z" fill="none" stroke="#777C5B" strokeWidth="1.5"/>
        {[0,1,2,3,4].map(i => <circle key={i} cx={130 + i * 35} cy={120} r="4" fill="#777C5B" opacity={0.6}/>)}
        {[0,1,2].map(i => <circle key={i} cx={148 + i * 52} cy={150} r="4" fill="#A88A62" opacity={0.6}/>)}
        {[0,1,2,3].map(i => <line key={i} x1={130 + i * 35} y1={120} x2={148 + (i > 1 ? i - 1 : i) * 52} y2={150} stroke="#DCD8CE" strokeWidth="0.8"/>)}
        <circle cx="200" cy="170" r="6" fill="#777C5B" opacity={0.9}/>
        <text x="20" y="240" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#9D9C95" letterSpacing="2">COMPUTER VISION · AI FORENSICS</text>
      </svg>
    ),
    'route-recover-ai': (
      <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="RouteRecover AI visual representation">
        <rect width="400" height="260" fill="#EEEAE1"/>
        <path d="M60 200 Q120 80 200 120 Q280 160 340 60" fill="none" stroke="#A88A62" strokeWidth="1.5" strokeDasharray="6 4"/>
        {[[60,200],[200,120],[340,60]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r={i===1?8:6} fill={i===1?"#A88A62":"#777C5B"} opacity={0.8}/>
        ))}
        <path d="M60 200 Q100 160 140 180 Q180 200 200 120" fill="none" stroke="#DCD8CE" strokeWidth="1" strokeDasharray="4 6"/>
        <text x="20" y="240" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#9D9C95" letterSpacing="2">AI TRAVEL · CONSTRAINT PLANNING</text>
      </svg>
    ),
    'cyberguard-x': (
      <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="CyberGuard X visual representation">
        <rect width="400" height="260" fill="#EEEAE1"/>
        <ellipse cx="200" cy="130" rx="140" ry="90" fill="none" stroke="#DCD8CE" strokeWidth="1"/>
        {[[140,90],[160,100],[130,120],[150,80]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="5" fill="#A88A62" opacity={0.7}/>)}
        {[[250,150],[270,140],[260,170],[280,155]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="5" fill="#777C5B" opacity={0.7}/>)}
        <line x1="200" y1="50" x2="200" y2="210" stroke="#B8B4AA" strokeWidth="1" strokeDasharray="4 4"/>
        <text x="20" y="240" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#9D9C95" letterSpacing="2">ML CLASSIFICATION · THREAT INTEL</text>
      </svg>
    ),
    healvision: (
      <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="HealVision visual representation">
        <rect width="400" height="260" fill="#EEEAE1"/>
        <polyline points="40,130 100,130 120,80 140,170 160,100 180,150 200,130 360,130" fill="none" stroke="#777C5B" strokeWidth="1.5"/>
        {[80,160,240,320].map((x,i) => <circle key={i} cx={x} cy={130} r="3" fill="#A88A62" opacity={0.6}/>)}
        <text x="20" y="240" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#9D9C95" letterSpacing="2">AI HEALTH · ML ANALYTICS · HACKATHON</text>
      </svg>
    ),
  };

  return (
    <div className="project-thumb">
      {configs[id] || (
        <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label={`${id} visual`}>
          <rect width="400" height="260" fill="#EEEAE1"/>
          <circle cx="200" cy="120" r="60" fill="none" stroke="#DCD8CE" strokeWidth="1"/>
          <circle cx="200" cy="120" r="30" fill="#F0EDE4" stroke="#C8C4BA" strokeWidth="0.5"/>
        </svg>
      )}
    </div>
  );
}

function FeaturedProjectCard({ project, index, onOpen }: {
  project: typeof FEATURED_PROJECTS[0];
  index: number;
  onOpen: (slug: string) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const visible = useIntersection(ref, { threshold: 0.05 });
  use3DTilt(ref, { maxTilt: 5, perspective: 1100, scale: 1.015 });

  return (
    <article
      ref={ref}
      className={`project-card project-card--featured reveal ${visible ? 'revealed' : ''}`}
      style={{ '--reveal-delay': `${index * 80}ms` } as React.CSSProperties}
    >
      {/* Thumbnail */}
      <div className="project-card__thumb" onClick={() => onOpen(project.slug)} role="button" tabIndex={0}
           onKeyDown={e => e.key === 'Enter' && onOpen(project.slug)}
           aria-label={`View ${project.name} case study`}>
        <ProjectThumbnail id={project.id} />
        <div className="project-card__thumb-overlay">
          <span className="project-card__thumb-cta label">View case study</span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </div>
      </div>

      {/* Info */}
      <div className="project-card__info">
        <div className="project-card__header">
          <span className="project-number">{project.number}</span>
          <div className="project-card__cats">
            {project.categories.slice(0, 2).map(c => (
              <span key={c} className="tag">{CATEGORY_LABELS[c]}</span>
            ))}
          </div>
        </div>

        {project.award && (
          <div className="project-card__award">
            <Trophy size={13} aria-hidden="true" />
            <span>{project.award}</span>
          </div>
        )}

        <h3 className="project-card__name">{project.name}</h3>
        <p className="project-card__tagline">{project.tagline}</p>
        <p className="project-card__desc">{project.description.slice(0, 180)}…</p>

        {/* Live Metrics Strip */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="project-card__metrics">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="project-card__metric">
                <span className="project-card__metric-val font-mono">{m.value}</span>
                <span className="project-card__metric-lbl label">{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Stack */}
        <div className="project-card__stack">
          {project.stack.slice(0, 5).map(s => (
            <span key={s} className="tag">{s}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="project-card__actions">
          <button className="btn btn-primary project-card__detail-btn" onClick={() => onOpen(project.slug)}>
            Case study
          </button>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
             className="btn btn-ghost project-card__link" aria-label={`${project.name} source code`}>
            <Github size={16} aria-hidden="true" />
            Source
          </a>
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
               className="btn btn-ghost project-card__link" aria-label={`${project.name} live demo`}>
              <ExternalLink size={14} aria-hidden="true" />
              {project.demoLabel}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ArchiveRow({ project, onOpen }: {
  project: typeof PROJECTS[0];
  onOpen: (slug: string) => void;
}) {
  return (
    <div className="archive-row" onClick={() => onOpen(project.slug)} role="button" tabIndex={0}
         onKeyDown={e => e.key === 'Enter' && onOpen(project.slug)}
         aria-label={`View ${project.name}`}>
      <span className="archive-row__number font-mono">{project.number}</span>
      <div className="archive-row__main">
        <h4 className="archive-row__name">{project.name}</h4>
        <p className="archive-row__tagline">{project.tagline}</p>
      </div>
      <div className="archive-row__stack">
        {project.stack.slice(0, 3).map(s => (
          <span key={s} className="tag">{s}</span>
        ))}
      </div>
      <div className="archive-row__actions">
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
           className="archive-row__icon-btn" aria-label={`${project.name} GitHub`}
           onClick={e => e.stopPropagation()}>
          <Github size={16} aria-hidden="true" />
        </a>
        <ArrowUpRight size={16} className="archive-row__arrow" aria-hidden="true" />
      </div>
    </div>
  );
}

function AchievementCard({ achievement, index }: { achievement: typeof ACHIEVEMENTS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  use3DTilt(cardRef, { maxTilt: 6, perspective: 1000, scale: 1.02 });
  const Icon = achievement.icon;

  return (
    <div
      ref={cardRef}
      className="achievement-card"
      style={{ '--reveal-delay': `${index * 80}ms` } as React.CSSProperties}
    >
      <div className="achievement-card__glare" aria-hidden="true" />
      <div className="achievement-card__header">
        <div className="achievement-card__icon-box">
          <Icon size={18} aria-hidden="true" />
        </div>
        <span className="achievement-card__tag label font-mono">{achievement.tag}</span>
      </div>
      <h4 className="achievement-card__title">{achievement.title}</h4>
      <p className="achievement-card__host label">{achievement.host}</p>
      <p className="achievement-card__detail">{achievement.detail}</p>
    </div>
  );
}

export default function Work() {
  const ref = useRef<HTMLElement>(null);
  const visible = useIntersection(ref, { threshold: 0.05 });
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'all'>('all');
  const [openedSlug, setOpenSlug] = useState<string | null>(null);

  const openedProject = PROJECTS.find(p => p.slug === openedSlug);

  const filteredFeatured = activeFilter === 'all'
    ? FEATURED_PROJECTS
    : FEATURED_PROJECTS.filter(p => p.categories.includes(activeFilter));

  const archiveProjects = activeFilter === 'all'
    ? PROJECTS.filter(p => !p.featured)
    : PROJECTS.filter(p => !p.featured && p.categories.includes(activeFilter));

  return (
    <>
      <section ref={ref} id="work" className="work section" aria-label="Selected engineering work">
        <div className="container">

          {/* Section header */}
          <div className={`work__header reveal ${visible ? 'revealed' : ''}`}>
            <div>
              <p className="label tracking-widest work__section-label">Selected Work</p>
              <h2 className="work__headline">
                Systems built to solve
                <br />
                <em>real engineering problems.</em>
              </h2>
            </div>
            <p className="work__intro">
              Each project represents a distinct challenge in architecture,
              machine learning, or user experience. Explore the case studies
              for implementation details and design rationale.
            </p>
          </div>

          {/* Filters */}
          <div className="work__filters" role="group" aria-label="Filter projects by discipline">
            <button
              className={`work__filter-btn ${activeFilter === 'all' ? 'work__filter-btn--active' : ''}`}
              onClick={() => setActiveFilter('all')}
              aria-pressed={activeFilter === 'all'}
            >
              All Projects ({PROJECTS.length})
            </button>
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`work__filter-btn ${activeFilter === cat ? 'work__filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(cat)}
                aria-pressed={activeFilter === cat}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {/* Featured grid */}
          <div className="work__featured-grid">
            {filteredFeatured.length > 0 ? (
              filteredFeatured.map((project, i) => (
                <FeaturedProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onOpen={setOpenSlug}
                />
              ))
            ) : (
              <p className="work__empty label">No featured projects in this category.</p>
            )}
          </div>

          {/* Archive */}
          {archiveProjects.length > 0 && (
            <div className="work__archive">
              <h3 className="work__archive-title">
                <span className="label tracking-widest">Archive</span>
              </h3>
              <div className="work__archive-list" role="list">
                {archiveProjects.map(p => (
                  <ArchiveRow key={p.id} project={p} onOpen={setOpenSlug} />
                ))}
              </div>
            </div>
          )}

          {/* 3D Hackathon & Recognition Honors Showcase */}
          <div className="work__achievements-section">
            <div className="work__achievements-header">
              <p className="label tracking-widest">Honors & Milestones</p>
              <h3 className="work__achievements-title">
                Verified Hackathon & Industry Recognitions
              </h3>
            </div>
            <div className="work__achievements-grid">
              {ACHIEVEMENTS.map((ach, i) => (
                <AchievementCard key={ach.title} achievement={ach} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project detail overlay */}
      {openedProject && (
        <ProjectDetail
          project={openedProject}
          onClose={() => setOpenSlug(null)}
        />
      )}
    </>
  );
}
