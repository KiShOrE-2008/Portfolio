import React, { useState, useEffect } from 'react';

const NETWORK_LOGS = [
    { text: '📡 Initializing secure socket connection to cdn.kishorekv.dev...', delay: 200 },
    { text: '🔐 TLS 1.3 Handshake completed. Cipher Suite: TLS_AES_256_GCM_SHA384', delay: 600 },
    { text: '⚡ Simulating network packet latency [RTT: 14ms, Jitter: 0.8ms]...', delay: 1100 },
    { text: '🔍 Performing payload integrity & document status query...', delay: 1700 },
    { text: '📄 Querying latest CV revision status...', delay: 2300 },
    { text: '✅ Packet assembly complete. Displaying status report...', delay: 2800 }
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

    return (
        <div className="resume-modal-overlay" onClick={onClose}>
            <div className="resume-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="resume-modal-header">
                    <div className="resume-header-left">
                        <div className="resume-badge-pill">
                            <span className="live-dot"></span>
                            <span>CURRICULUM VITAE</span>
                        </div>
                        <h2 className="resume-modal-title">Kishore K V — Resume Status</h2>
                    </div>

                    <div className="resume-header-actions">
                        <a
                            href="mailto:kv.kishorevijay@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resume-action-btn primary"
                            title="Request resume via Email"
                        >
                            <span>Request via Email ✉</span>
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

                {/* Body Content: Network Delay Loading State OR Coming Soon View */}
                {isLoading ? (
                    <div className="resume-loading-container">
                        <div className="network-loader-card glass-panel">
                            {/* Animated Signal Radar / Terminal Icon */}
                            <div className="radar-spinner">
                                <div className="radar-sweep"></div>
                                <div className="radar-icon">📡</div>
                            </div>

                            <h3 className="loading-status-title">Simulating Network Packet Transmission</h3>
                            <p className="loading-status-desc">
                                Fetching encrypted resume payload from Kishore's secure CDN node. Simulating network latency &amp; TLS verification...
                            </p>

                            {/* Simulated Network Telemetry Stats Grid */}
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

                            {/* Progress Bar */}
                            <div className="loader-progress-wrapper">
                                <div className="loader-progress-info">
                                    <span className="progress-label">Downloading Payload...</span>
                                    <span className="progress-percent">{progress}%</span>
                                </div>
                                <div className="loader-progress-bar-bg">
                                    <div
                                        className="loader-progress-bar-fill"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Live Terminal Log Messages */}
                            <div className="network-log-box">
                                <div className="log-line active">
                                    <span className="log-prefix">&gt;</span> {NETWORK_LOGS[currentLogIdx]?.text}
                                </div>
                            </div>

                            <button className="skip-loading-btn" onClick={handleSkipLoading}>
                                Fast-Track Transmission ⚡
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="resume-coming-soon-container">
                        <div className="coming-soon-card glass-panel">
                            {/* Top Pulsing Cyber Badge */}
                            <div className="cs-status-badge">
                                <span className="cs-pulse-ring"></span>
                                <span>🚀 UNDER REVISION • UPDATING PORTFOLIO</span>
                            </div>

                            {/* Main Coming Soon Heading */}
                            <h1 className="cs-title">
                                Coming <span className="gradient-title-text">Soon...</span>
                            </h1>

                            <p className="cs-description">
                                Kishore's official resume is currently being updated with recent cybersecurity audit projects, networking accomplishments, and software developments.
                            </p>

                            {/* Profile Highlights Preview */}
                            <div className="cs-highlights-grid">
                                <div className="cs-hl-box">
                                    <span className="cs-hl-icon">🎓</span>
                                    <div>
                                        <div className="cs-hl-title">Education</div>
                                        <div className="cs-hl-sub">B.Tech IT @ CIT</div>
                                    </div>
                                </div>

                                <div className="cs-hl-box">
                                    <span className="cs-hl-icon">🛡️</span>
                                    <div>
                                        <div className="cs-hl-title">Specialization</div>
                                        <div className="cs-hl-sub">Cybersecurity &amp; Networks</div>
                                    </div>
                                </div>

                                <div className="cs-hl-box">
                                    <span className="cs-hl-icon">💻</span>
                                    <div>
                                        <div className="cs-hl-title">Projects</div>
                                        <div className="cs-hl-sub">6+ Security &amp; Web Apps</div>
                                    </div>
                                </div>

                                <div className="cs-hl-box">
                                    <span className="cs-hl-icon">🧩</span>
                                    <div>
                                        <div className="cs-hl-title">LeetCode</div>
                                        <div className="cs-hl-sub">250+ Solved</div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="cs-actions-row">
                                <a
                                    href="mailto:kv.kishorevijay@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="resume-action-btn primary"
                                >
                                    <span>Contact Kishore directly</span>
                                    <span className="btn-icon">✉</span>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/kishore-k-v-090491349/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="resume-action-btn secondary"
                                >
                                    <span>Connect on LinkedIn</span>
                                    <span className="btn-icon">↗</span>
                                </a>
                            </div>

                            {/* Footer Note */}
                            <div className="cs-footer-note">
                                💡 Need an immediate copy? Send an email to <a href="mailto:kv.kishorevijay@gmail.com" target="_blank" rel="noopener noreferrer">kv.kishorevijay@gmail.com</a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
