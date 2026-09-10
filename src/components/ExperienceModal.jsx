import React, { useState, useEffect } from 'react';

export default function ExperienceModal({ exp, onClose, onOpenGallery }) {
    const [showCertPreview, setShowCertPreview] = useState(false);

    useEffect(() => {
        if (!exp) return;

        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (showCertPreview) {
                    setShowCertPreview(false);
                } else {
                    onClose();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [exp, onClose, showCertPreview]);

    if (!exp) return null;

    return (
        <div className="exp-modal-overlay" onClick={onClose}>
            <div className="exp-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="exp-modal-header">
                    <div className="exp-modal-header-left">
                        <div className="exp-badge-pill">
                            <span className="exp-live-dot"></span>
                            <span>{exp.programBadge || exp.program || 'INTERNSHIP OVERVIEW'}</span>
                        </div>
                        <h2 className="exp-modal-role">{exp.role}</h2>
                        <div className="exp-modal-company-title">{exp.companySub || exp.organization}</div>
                        <div className="exp-modal-meta-row">
                            <span className="exp-meta-org">🏢 {exp.organization}</span>
                            <span className="exp-meta-dot">•</span>
                            <span className="exp-meta-period">📅 {exp.period}</span>
                            <span className="exp-meta-dot">•</span>
                            <span className="exp-meta-loc">📍 {exp.location}</span>
                        </div>
                    </div>

                    <button className="exp-modal-close" onClick={onClose} aria-label="Close modal">
                        ✕
                    </button>
                </div>

                {/* Main Modal Body Scroll Container */}
                <div className="exp-modal-body">
                    {/* Front View Featured Certificate & Credential Showcase Banner */}
                    {exp.credential && (
                        <div className="exp-front-cert-showcase glass-card">
                            <div className="cert-showcase-header">
                                <div className="credential-badge-verified">
                                    <span className="shield-icon">🛡️</span> VERIFIED INTERNSHIP CREDENTIAL
                                </div>
                                <span className="cert-id-tag">ID: <code>{exp.credential.credentialId}</code></span>
                            </div>

                            <div className="cert-showcase-body">
                                {/* Certificate Thumbnail Frame */}
                                <div 
                                    className="cert-frame-wrapper"
                                    onClick={() => setShowCertPreview(true)}
                                    title="Click to view full screen certificate"
                                >
                                    <img 
                                        src={exp.credential.imageSrc || '/images/eduskills_certificate.png'} 
                                        alt={exp.credential.title} 
                                        className="cert-front-img"
                                    />
                                    <div className="cert-hover-overlay">
                                        <span className="zoom-icon">🔍</span>
                                        <span>Click to Zoom Certificate</span>
                                    </div>
                                </div>

                                {/* Credential Info Details */}
                                <div className="cert-showcase-info">
                                    <h3 className="cert-showcase-title">{exp.credential.title}</h3>
                                    <p className="cert-showcase-org">Issued by <strong>{exp.credential.issuer}</strong></p>
                                    
                                    <div className="cert-details-list">
                                        <div className="cert-detail-row">
                                            <span className="detail-lbl">Issued Date:</span>
                                            <span className="detail-val">{exp.credential.issueDate}</span>
                                        </div>
                                        <div className="cert-detail-row">
                                            <span className="detail-lbl">Credential ID:</span>
                                            <span className="detail-val code-val">{exp.credential.credentialId}</span>
                                        </div>
                                        <div className="cert-detail-row">
                                            <span className="detail-lbl">Status:</span>
                                            <span className="detail-val status-val">AUTHENTICATED & VERIFIED ✓</span>
                                        </div>
                                    </div>

                                    <button 
                                        className="exp-cert-view-btn primary full-width-btn"
                                        onClick={() => setShowCertPreview(true)}
                                    >
                                        <span className="btn-icon">🔍</span> Expand Full Certificate
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Photo Gallery Banner if available */}
                    {exp.hasGallery && (
                        <div 
                            className="exp-gallery-banner glass-card" 
                            onClick={() => {
                                onClose();
                                if (onOpenGallery) onOpenGallery(0);
                            }}
                        >
                            <div className="gallery-banner-left">
                                <span className="gallery-icon">📸</span>
                                <div>
                                    <h4 className="gallery-banner-title">On-Site Media & Event Gallery</h4>
                                    <p className="gallery-banner-sub">Explore 7 official photos from technical sessions & law-enforcement workshops</p>
                                </div>
                            </div>
                            <button className="exp-cert-view-btn primary">
                                Launch 7-Photo Gallery ↗
                            </button>
                        </div>
                    )}

                    {/* Summary Blockquote */}
                    <div className="exp-summary-quote-box">
                        <div className="quote-icon">“</div>
                        <p className="quote-text">{exp.fullSummary || exp.shortDesc}</p>
                    </div>

                    {/* What I Learned Section */}
                    {exp.whatILearned && exp.whatILearned.length > 0 && (
                        <div className="exp-section">
                            <h3 className="exp-section-title">
                                <span className="exp-title-icon">🧠</span> WHAT I LEARNED
                            </h3>
                            <div className="exp-learned-grid">
                                {exp.whatILearned.map((item, index) => (
                                    <div key={index} className="learned-card glass-card">
                                        <div className="learned-card-header">
                                            <span className="learned-bullet-icon">⚡</span>
                                            <h4 className="learned-topic-title">{item.title}</h4>
                                        </div>
                                        {item.desc && <p className="learned-topic-desc">{item.desc}</p>}
                                        {item.bullets && item.bullets.length > 0 && (
                                            <ul className="learned-topic-bullets">
                                                {item.bullets.map((b, bIdx) => (
                                                    <li key={bIdx}>
                                                        <span className="b-dot">•</span>
                                                        <span>{b}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Key Takeaway Section */}
                    {exp.keyTakeaway && (
                        <div className="exp-section">
                            <h3 className="exp-section-title">
                                <span className="exp-title-icon">💡</span> KEY TAKEAWAY
                            </h3>
                            <div className="exp-key-takeaway-box glass-card">
                                <p className="takeaway-text">“{exp.keyTakeaway}”</p>
                            </div>
                        </div>
                    )}

                    {/* Internship Structure Section */}
                    {exp.structure && exp.structure.length > 0 && (
                        <div className="exp-section">
                            <h3 className="exp-section-title">
                                <span className="exp-title-icon">⚙️</span> INTERNSHIP STRUCTURE
                            </h3>
                            <div className="exp-structure-box glass-card">
                                <div className="structure-header-tag">
                                    <span>{exp.structureTitle || 'Structured Program Overview'}</span>
                                </div>
                                <ul className="structure-list">
                                    {exp.structure.map((step, idx) => (
                                        <li key={idx} className="structure-item">
                                            <span className="item-check">✓</span>
                                            <span>{step}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Skills Developed Section */}
                    {exp.skillsDeveloped && exp.skillsDeveloped.length > 0 && (
                        <div className="exp-section">
                            <h3 className="exp-section-title">
                                <span className="exp-title-icon">🛠️</span> SKILLS & COMPETENCIES
                            </h3>
                            <div className="exp-skills-pills-row">
                                {exp.skillsDeveloped.map((skill, idx) => (
                                    <span key={idx} className="exp-skill-pill">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="exp-modal-footer">
                    <button className="exp-footer-btn secondary" onClick={onClose}>
                        Close Detail View
                    </button>
                </div>
            </div>

            {/* Inner Full Screen Certificate Zoom Lightbox Modal */}
            {showCertPreview && exp.credential && (
                <div className="cert-preview-overlay" onClick={() => setShowCertPreview(false)}>
                    <div className="cert-preview-dialog glass-panel" onClick={(e) => e.stopPropagation()}>
                        <div className="cert-preview-header">
                            <div>
                                <span className="cert-badge-tag">OFFICIAL CREDENTIAL VERIFICATION</span>
                                <h3 className="cert-preview-title">{exp.credential.title}</h3>
                            </div>
                            <button className="cert-preview-close" onClick={() => setShowCertPreview(false)}>
                                ✕
                            </button>
                        </div>
                        <div className="cert-preview-body">
                            <img 
                                src={exp.credential.imageSrc || '/images/eduskills_certificate.png'} 
                                alt={exp.credential.title} 
                                className="cert-document-img" 
                            />
                        </div>
                        <div className="cert-preview-footer">
                            <span className="cert-footer-text">
                                Verified Credential ID: <code>{exp.credential.credentialId}</code> • {exp.organization}
                            </span>
                            <button className="exp-footer-btn secondary" onClick={() => setShowCertPreview(false)}>
                                Close Verification
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
