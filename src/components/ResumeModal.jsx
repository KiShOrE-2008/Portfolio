import React, { useState, useEffect } from 'react';

const NETWORK_LOGS = [
    { text: '📡 Initializing secure socket connection to cdn.kishorekv.dev...', delay: 200 },
    { text: '🔐 TLS 1.3 Handshake completed. Cipher Suite: TLS_AES_256_GCM_SHA384', delay: 600 },
    { text: '⚡ Simulating network packet latency [RTT: 14ms, Jitter: 0.8ms]...', delay: 1100 },
    { text: '🔍 Performing payload integrity & PDF status query...', delay: 1700 },
    { text: '📄 Loading official PDF document payload...', delay: 2300 },
    { text: '✅ PDF rendering engine ready. Opening document...', delay: 2800 }
];

export default function ResumeModal({ isOpen, onClose }) {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentLogIdx, setCurrentLogIdx] = useState(0);

    useEffect(() => {
        if (!isOpen) {
            setIsLoading(true);
            setProgress(0);
            setCurrentLogIdx(0);
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

        // Progress bar simulation
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                const increment = Math.floor(Math.random() * 8) + 5;
                return Math.min(prev + increment, 100);
            });
        }, 110);

        // Log messages sequence
        const logTimeouts = NETWORK_LOGS.map((item, idx) => {
            return setTimeout(() => {
                setCurrentLogIdx(idx);
            }, item.delay);
        });

        // Finish loading after sequence completes
        const finishTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 3100);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
            clearInterval(progressInterval);
            logTimeouts.forEach(clearTimeout);
            clearTimeout(finishTimeout);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSkipLoading = () => {
        setProgress(100);
        setIsLoading(false);
    };

    const googleDrivePdfUrl = "https://drive.google.com/file/d/1LpFQf1ZFo2qCCrvEs9S6gC0UpxInKXOY/view?usp=sharing";
    const googleDrivePreviewUrl = "https://drive.google.com/file/d/1LpFQf1ZFo2qCCrvEs9S6gC0UpxInKXOY/preview";

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

                {/* Body Content: Loading Animation OR Embedded PDF Viewer */}
                {isLoading ? (
                    <div className="resume-loading-container">
                        <div className="network-loader-card glass-panel">
                            <div className="radar-spinner">
                                <div className="radar-sweep"></div>
                                <div className="radar-icon">📡</div>
                            </div>

                            <h3 className="loading-status-title">Simulating Network Packet Transmission</h3>
                            <p className="loading-status-desc">
                                Fetching encrypted PDF payload from Kishore's secure node. Simulating network latency &amp; TLS verification...
                            </p>

                            <div className="network-stats-grid">
                                <div className="net-stat-box">
                                    <span className="stat-lbl">LATENCY</span>
                                    <span className="stat-val cyan">14.2 ms</span>
                                </div>
                                <div className="net-stat-box">
                                    <span className="stat-lbl">PACKET LOSS</span>
                                    <span className="stat-val green">0.00%</span>
                                </div>
                                <div className="net-stat-box">
                                    <span className="stat-lbl">PROTOCOL</span>
                                    <span className="stat-val purple">TLS 1.3 / HTTP/3</span>
                                </div>
                                <div className="net-stat-box">
                                    <span className="stat-lbl">INTEGRITY</span>
                                    <span className="stat-val green">VERIFIED</span>
                                </div>
                            </div>

                            <div className="loader-progress-wrapper">
                                <div className="loader-progress-info">
                                    <span className="progress-label">Downloading PDF Payload...</span>
                                    <span className="progress-percent">{progress}%</span>
                                </div>
                                <div className="loader-progress-bar-bg">
                                    <div
                                        className="loader-progress-bar-fill"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="network-log-box">
                                <div className="log-line active">
                                    <span className="log-prefix">&gt;</span> {NETWORK_LOGS[currentLogIdx]?.text}
                                </div>
                            </div>

                            <button className="skip-loading-btn" onClick={handleSkipLoading}>
                                Skip Transmission &amp; Load PDF ⚡
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="pdf-embed-container">
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
