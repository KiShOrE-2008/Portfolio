import React, { useState, useEffect } from 'react';

const NETWORK_LOGS = [
    { text: '📡 Initializing secure socket connection to cdn.kishorekv.dev...', delay: 200 },
    { text: '🔐 TLS 1.3 Handshake completed. Cipher Suite: TLS_AES_256_GCM_SHA384', delay: 600 },
    { text: '⚡ Simulating network packet latency [RTT: 14ms, Jitter: 0.8ms]...', delay: 1100 },
    { text: '🔍 Performing payload integrity & PDF status query...', delay: 1700 },
    { text: '📄 Loading official PDF document payload...', delay: 2300 },
    { text: '✅ PDF rendering engine ready. Opening document...', delay: 2800 }
];

let globalResumeLoadedOnce = false;

export default function ResumeModal({ isOpen, onClose }) {
    const [isLoading, setIsLoading] = useState(!globalResumeLoadedOnce);
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isOpen) {
            setStep(0);
            return;
        }

        document.body.style.overflow = 'hidden';

        // Keyboard escape handler
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        if (globalResumeLoadedOnce) {
            setIsLoading(false);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
                document.body.style.overflow = '';
            };
        }

        // Cinematic boot timeline
        setIsLoading(true);
        setStep(0);

        const t1 = setTimeout(() => setStep(1), 800);
        const t2 = setTimeout(() => setStep(2), 1600);
        const t3 = setTimeout(() => setStep(3), 2400);
        const t4 = setTimeout(() => {
            setIsLoading(false);
            globalResumeLoadedOnce = true;
        }, 2800);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSkipLoading = () => {
        globalResumeLoadedOnce = true;
        setIsLoading(false);
    };

    const googleDrivePdfUrl = "https://drive.google.com/file/d/1LpFQf1ZFo2qCCrvEs9S6gC0UpxInKXOY/view?usp=sharing";

    return (
        <div className="resume-modal-overlay" onClick={onClose}>
            <div className="resume-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="resume-modal-header">
                    <div className="resume-header-left">
                        <div className="resume-badge-pill">
                            <span className="live-dot"></span>
                            <span>OFFICIAL RESUME PDF</span>
                        </div>
                        <h2 className="resume-modal-title">KISHORE K V — Resume</h2>
                    </div>

                    {/* Header Actions */}
                    <div className="resume-header-actions">
                        <a
                            href={googleDrivePdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resume-action-btn primary"
                            title="Open in Google Drive"
                        >
                            <span>Google Drive ↗</span>
                        </a>
                        <button
                            className="resume-modal-close"
                            onClick={onClose}
                            aria-label="Close modal"
                            title="Close (Esc)"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Body Content: Cinematic Secure Document Retrieval Sequence OR Embedded PDF Viewer */}
                {isLoading ? (
                    <div className="resume-loading-container">
                        <div className="hud-cinematic-card glass-panel">
                            {/* HUD Tag */}
                            <div className="hud-badge-header">
                                <span className="hud-pulse-dot"></span>
                                <span>RESUME ACCESS</span>
                            </div>

                            {/* Center Icon & Stage */}
                            <div className="hud-icon-stage">
                                {step === 0 && (
                                    <div className="hud-node-circle cyan-pulse key-step-0">
                                        <span className="node-center-dot"></span>
                                    </div>
                                )}
                                {step === 1 && (
                                    <div className="hud-node-circle purple-pulse key-step-1">
                                        <svg className="node-file-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                            <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#06b6d4" fill="rgba(6,182,212,0.12)" />
                                            <path d="M14 2V8H20" stroke="#06b6d4" />
                                            <path d="M8 13H16" stroke="#06b6d4" strokeLinecap="round" />
                                            <path d="M8 17H13" stroke="#06b6d4" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                )}
                                {(step === 2 || step === 3) && (
                                    <div className="hud-node-circle green-pulse key-step-2">
                                        <svg className="node-check-svg" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Status Title */}
                            <div className="hud-status-wrapper">
                                <h3 className="hud-status-title">
                                    {step === 0 && "INITIALIZING"}
                                    {step === 1 && "CONNECTING TO DOCUMENT"}
                                    {step === 2 && "VERIFYING RESUME"}
                                    {step === 3 && "RESUME READY"}
                                </h3>

                                {/* Data Signal Line Animation */}
                                <div className="hud-signal-line-container">
                                    <div className="hud-signal-track"></div>
                                    <div className={`hud-signal-fill step-${step}`}></div>
                                    <div className={`hud-signal-dot step-${step}`}></div>
                                </div>

                                <p className="hud-status-subtext">
                                    {step === 0 && "ESTABLISHING SECURE CHANNEL"}
                                    {step === 1 && "DOCUMENT FOUND"}
                                    {step === 2 && "DOCUMENT VERIFIED"}
                                    {step === 3 && "OPENING DOCUMENT"}
                                </p>
                            </div>

                            {/* Minimalist Bottom Bar */}
                            <div className="hud-footer">
                                <button className="skip-hud-btn" onClick={handleSkipLoading}>
                                    Skip &rarr;
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="pdf-embed-container cinematic-reveal">
                        <iframe
                            src="/resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
                            className="resume-pdf-iframe"
                            title="Kishore K V Resume PDF Document"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
