import React, { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && project) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [project, onClose]);

    if (!project) return null;

    const isImageUrl = typeof project.icon === 'string' && (project.icon.startsWith('http') || project.icon.startsWith('/'));

    return (
        <div className="project-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="project-modal-content glass-panel editorial-modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Modal Close Button */}
                <button className="project-modal-close" onClick={onClose} aria-label="Close modal">
                    ✕
                </button>

                {/* Header */}
                <div className="project-modal-header">
                    <div className="project-modal-badge-row">
                        <span className="modal-icon">
                            {isImageUrl ? (
                                <img
                                    src={project.icon}
                                    alt={project.title}
                                    width="24"
                                    height="24"
                                    style={{ objectFit: 'contain' }}
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                            ) : (
                                project.icon || '🛡️'
                            )}
                        </span>
                        <span className="modal-badge">{project.badge}</span>
                        <span className="modal-category-tag">{project.categoryLabel}</span>
                    </div>
                    <h2 className="project-modal-title" id="modal-title">{project.title}</h2>
                    <p className="project-modal-subtitle">{project.subtitle || project.desc}</p>
                </div>

                {/* Architecture / Network Topology Section */}
                <div className="project-modal-section">
                    <h4 className="modal-section-title">
                        <span className="title-icon">📐</span> SYSTEM ARCHITECTURE OVERVIEW
                    </h4>
                    <div className="architecture-diagram-box">
                        <div className="diagram-nodes-row">
                            <div className="diagram-node">
                                <span className="node-icon">👤</span>
                                <span className="node-label">Client / Agent</span>
                            </div>
                            <span className="diagram-arrow">➔</span>
                            <div className="diagram-node active">
                                <span className="node-icon">🛡️</span>
                                <span className="node-label">{project.title} Engine</span>
                            </div>
                            <span className="diagram-arrow">➔</span>
                            <div className="diagram-node">
                                <span className="node-icon">💾</span>
                                <span className="node-label">Log & Telemetry</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technical Highlights & Vulnerability Mitigations */}
                <div className="project-modal-section">
                    <h4 className="modal-section-title">
                        <span className="title-icon">🔒</span> TECHNICAL HIGHLIGHTS & ARCHITECTURE
                    </h4>
                    <ul className="modal-highlights-list">
                        {project.highlights && project.highlights.map((item, idx) => (
                            <li key={idx} className="highlight-item">
                                <span className="item-bullet">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="project-modal-section">
                    <h4 className="modal-section-title">
                        <span className="title-icon">🛠️</span> TECHNOLOGIES & STACK
                    </h4>
                    <div className="project-modal-tags">
                        {project.tags.map((tag, idx) => (
                            <span key={idx} className="modal-tech-tag">{tag}</span>
                        ))}
                    </div>
                </div>

                {/* Footer Action CTAs */}
                <div className="project-modal-footer">
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-action-btn primary"
                    >
                        <span>View Repository</span>
                        <span className="btn-arrow">↗</span>
                    </a>
                    <button className="modal-action-btn secondary" onClick={onClose}>
                        Close Overview
                    </button>
                </div>
            </div>
        </div>
    );
}
