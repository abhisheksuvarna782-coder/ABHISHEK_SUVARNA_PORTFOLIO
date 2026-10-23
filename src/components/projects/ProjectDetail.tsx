import { useEffect, useCallback } from 'react';
import { X, Github, ExternalLink, ArrowLeft } from 'lucide-react';
import { CATEGORY_LABELS, type Project } from '../../data/projects';
import './ProjectDetail.css';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  return (
    <div
      className="detail-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
    >
      <div className="detail-panel">
        {/* Close */}
        <button
          className="detail-close"
          onClick={onClose}
          aria-label="Close case study"
        >
          <X size={20} />
        </button>

        <div className="detail-content">
          {/* Back / nav */}
          <button className="detail-back btn btn-ghost" onClick={onClose}>
            <ArrowLeft size={16} aria-hidden="true" />
            Back to projects
          </button>

          {/* Header */}
          <header className="detail-header">
            <div className="detail-header__meta">
              <span className="project-number">{project.number}</span>
              <span className="label">{project.status.toUpperCase()}</span>
            </div>
            <h2 className="detail-title">{project.name}</h2>
            <p className="detail-tagline">{project.tagline}</p>

            {/* Category tags */}
            <div className="detail-cats">
              {project.categories.map(c => (
                <span key={c} className="tag">{CATEGORY_LABELS[c]}</span>
              ))}
            </div>
          </header>

          <div className="divider detail-divider" />

          {/* Stack */}
          <section className="detail-section" aria-label="Technology stack">
            <h3 className="detail-section__title label tracking-widest">Stack</h3>
            <div className="detail-stack">
              {project.stack.map(s => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </section>

          <div className="divider detail-divider" />

          {/* Description */}
          <section className="detail-section" aria-label="Project overview">
            <h3 className="detail-section__title label tracking-widest">Overview</h3>
            <p className="detail-text">{project.description}</p>
          </section>

          {project.context && (
            <>
              <div className="divider detail-divider" />
              <section className="detail-section" aria-label="Context and problem">
                <h3 className="detail-section__title label tracking-widest">Context & Problem</h3>
                <p className="detail-text">{project.context}</p>
              </section>
            </>
          )}

          {project.solution && (
            <>
              <div className="divider detail-divider" />
              <section className="detail-section" aria-label="Solution">
                <h3 className="detail-section__title label tracking-widest">Solution</h3>
                <p className="detail-text">{project.solution}</p>
              </section>
            </>
          )}

          {project.features && project.features.length > 0 && (
            <>
              <div className="divider detail-divider" />
              <section className="detail-section" aria-label="Key features">
                <h3 className="detail-section__title label tracking-widest">Key Features</h3>
                <ul className="detail-features" role="list">
                  {project.features.map((f, i) => (
                    <li key={i} className="detail-feature-item">{f}</li>
                  ))}
                </ul>
              </section>
            </>
          )}

          {project.architecture && (
            <>
              <div className="divider detail-divider" />
              <section className="detail-section" aria-label="Architecture">
                <h3 className="detail-section__title label tracking-widest">Architecture</h3>
                <p className="detail-text detail-text--mono">{project.architecture}</p>
              </section>
            </>
          )}

          {project.myRole && (
            <>
              <div className="divider detail-divider" />
              <section className="detail-section" aria-label="My role">
                <h3 className="detail-section__title label tracking-widest">My Role</h3>
                <p className="detail-text">{project.myRole}</p>
              </section>
            </>
          )}

          <div className="divider detail-divider" />

          {/* Links */}
          <section className="detail-section detail-links-section" aria-label="Project links">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary detail-link-btn"
            >
              <Github size={16} aria-hidden="true" />
              Source code
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary detail-link-btn"
              >
                <ExternalLink size={14} aria-hidden="true" />
                {project.demoLabel ?? 'Live demo'}
              </a>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
