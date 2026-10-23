import { useRef, useState, type ReactNode } from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { useIntersection } from '../hooks/useIntersection';
import { use3DTilt } from '../hooks/use3DTilt';
import { PROJECTS, FEATURED_PROJECTS, CATEGORY_LABELS, type ProjectCategory } from '../data/projects';
import ProjectDetail from '../components/projects/ProjectDetail';
import './Work.css';

const ALL_CATEGORIES: ProjectCategory[] = ['ai-ml', 'computer-vision', 'full-stack', 'security', 'data-cloud'];

// SVG thumbnails for each project — architectural representations
function ProjectThumbnail({ id }: { id: string }) {
  const configs: Record<string, ReactNode> = {
    deepshield: (
      <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="DeepShield visual representation">
        <rect width="400" height="260" fill="#EEEAE1"/>
        {/* Shield form */}
        <path d="M200 40 L280 80 L280 160 Q200 220 200 220 Q200 220 120 160 L120 80 Z" fill="none" stroke="#777C5B" strokeWidth="1.5"/>
        {/* Neural network nodes */}
        {[0,1,2,3,4].map(i => <circle key={i} cx={130 + i * 35} cy={120} r="4" fill="#777C5B" opacity={0.6}/>)}
        {[0,1,2].map(i => <circle key={i} cx={148 + i * 52} cy={150} r="4" fill="#A88A62" opacity={0.6}/>)}
        {/* Connections */}
        {[0,1,2,3].map(i => <line key={i} x1={130 + i * 35} y1={120} x2={148 + (i > 1 ? i - 1 : i) * 52} y2={150} stroke="#DCD8CE" strokeWidth="0.8"/>)}
        <circle cx="200" cy="170" r="6" fill="#777C5B" opacity={0.9}/>
        {/* Label */}
        <text x="20" y="240" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#9D9C95" letterSpacing="2">COMPUTER VISION · AI FORENSICS</text>
      </svg>
    ),
    'route-recover-ai': (
      <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="RouteRecover AI visual representation">
        <rect width="400" height="260" fill="#EEEAE1"/>
        {/* Route path */}
        <path d="M60 200 Q120 80 200 120 Q280 160 340 60" fill="none" stroke="#A88A62" strokeWidth="1.5" strokeDasharray="6 4"/>
        {/* Nodes */}
        {[[60,200],[200,120],[340,60]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r={i===1?8:6} fill={i===1?"#A88A62":"#777C5B"} opacity={0.8}/>
        ))}
        {/* Alternative routes */}
        <path d="M60 200 Q100 160 140 180 Q180 200 200 120" fill="none" stroke="#DCD8CE" strokeWidth="1" strokeDasharray="4 6"/>
        <text x="20" y="240" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#9D9C95" letterSpacing="2">AI TRAVEL · CONSTRAINT PLANNING</text>
      </svg>
    ),
    'cyberguard-x': (
      <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="CyberGuard X visual representation">
        <rect width="400" height="260" fill="#EEEAE1"/>
        {/* Classification boundary */}
        <ellipse cx="200" cy="130" rx="140" ry="90" fill="none" stroke="#DCD8CE" strokeWidth="1"/>
        {/* Spam points */}
        {[[140,90],[160,100],[130,120],[150,80]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="5" fill="#A88A62" opacity={0.7}/>)}
        {/* Legit points */}
        {[[250,150],[270,140],[260,170],[280,155]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="5" fill="#777C5B" opacity={0.7}/>)}
        {/* Decision boundary */}
        <line x1="200" y1="50" x2="200" y2="210" stroke="#B8B4AA" strokeWidth="1" strokeDasharray="4 4"/>
        <text x="20" y="240" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#9D9C95" letterSpacing="2">ML CLASSIFICATION · THREAT INTEL</text>
      </svg>
    ),
    healvision: (
      <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="HealVision visual representation">
        <rect width="400" height="260" fill="#EEEAE1"/>
        {/* Heartbeat line */}
        <polyline points="40,130 100,130 120,80 140,170 160,100 180,150 200,130 360,130" fill="none" stroke="#777C5B" strokeWidth="1.5"/>
        {/* Data circles */}
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

        <h3 className="project-card__name">{project.name}</h3>
        <p className="project-card__tagline">{project.tagline}</p>
        <p className="project-card__desc">{project.description.slice(0, 180)}…</p>

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
      <span className="project-number archive-row__num">{project.number}</span>
      <div className="archive-row__info">
        <span className="archive-row__name">{project.name}</span>
        <span className="archive-row__tagline">{project.tagline}</span>
      </div>
      <div className="archive-row__cats">
        {project.categories.slice(0,1).map(c => (
          <span key={c} className="tag">{CATEGORY_LABELS[c]}</span>
        ))}
      </div>
      <div className="archive-row__links" onClick={e => e.stopPropagation()}>
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
           className="btn btn-ghost" aria-label={`${project.name} GitHub`}>
          <Github size={14} aria-hidden="true" />
        </a>
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
             className="btn btn-ghost" aria-label={`${project.name} demo`}>
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Work() {
  const ref = useRef<HTMLElement>(null);
  const visible = useIntersection(ref, { threshold: 0.05 });
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'all'>('all');
  const [openProject, setOpenProject] = useState<string | null>(null);

  const filteredFeatured = FEATURED_PROJECTS.filter(
    p => activeFilter === 'all' || p.categories.includes(activeFilter as ProjectCategory)
  );

  const archiveProjects = PROJECTS.filter(p => !p.featured).filter(
    p => activeFilter === 'all' || p.categories.includes(activeFilter as ProjectCategory)
  );

  const openedProject = openProject ? PROJECTS.find(p => p.slug === openProject) : null;

  return (
    <>
      <section ref={ref} id="work" className="work section" aria-label="Selected projects">
        <div className="container">

          {/* Section header */}
          <div className={`work__header reveal ${visible ? 'revealed' : ''}`}>
            <div className="work__header-left">
              <p className="label tracking-widest work__section-label">Selected Work</p>
              <h2 className="work__headline">
                Projects built with
                <br />
                <em>purpose and precision.</em>
              </h2>
            </div>
            <p className="work__intro">
              A selection of AI and software projects — each one addressing a real problem,
              built with deliberate technology choices.
            </p>
          </div>

          {/* Filters */}
          <div
            className={`work__filters reveal ${visible ? 'revealed' : ''} reveal-delay-2`}
            role="group"
            aria-label="Filter projects by category"
          >
            <button
              className={`work__filter-btn ${activeFilter === 'all' ? 'work__filter-btn--active' : ''}`}
              onClick={() => setActiveFilter('all')}
              aria-pressed={activeFilter === 'all'}
            >
              All
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
                  onOpen={setOpenProject}
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
                  <ArchiveRow key={p.id} project={p} onOpen={setOpenProject} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Project detail overlay */}
      {openedProject && (
        <ProjectDetail
          project={openedProject}
          onClose={() => setOpenProject(null)}
        />
      )}
    </>
  );
}
