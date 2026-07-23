import React, { useState, useEffect } from 'react';
import NetworkBackground from './NetworkBackground';

export default function Preloader({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);
    const [statusText, setStatusText] = useState("Initializing portfolio modules...");

    useEffect(() => {
        const statuses = [
            "Initializing portfolio modules...",
            "Loading project directory...",
            "Assembling interface assets...",
            "Optimizing connections...",
            "Connection established"
        ];
        let statusIndex = 0;
        
        const statusInterval = setInterval(() => {
            statusIndex = (statusIndex + 1) % statuses.length;
            if (progress < 100) {
                setStatusText(statuses[statusIndex]);
            }
        }, 800);

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                const jump = Math.random() > 0.8 ? Math.floor(Math.random() * 12) + 4 : Math.floor(Math.random() * 3) + 1;
                const next = prev + jump;
                if (next >= 100) {
                    setStatusText("Access Granted");
                    clearInterval(progressInterval);
                    return 100;
                }
                return next;
            });
        }, 100);

        const shutdownTimer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
                onComplete();
            }, 800);
        }, 3400);

        return () => {
            clearInterval(progressInterval);
            clearInterval(statusInterval);
            clearTimeout(shutdownTimer);
        };
    }, [onComplete, progress]);

    return (
        <div className={`network-preloader-container ${fadeOut ? 'fade-out' : ''}`}>
            {/* Blast Wave transition element */}
            <div className="blast-wave"></div>

            {/* Mesh Background running behind the preloader content */}
            <div className="preloader-background">
                <NetworkBackground />
            </div>
            
            <div className="network-preloader-content">
                {/* Sleek Constellation Node Logo */}
                <div className="logo-wrapper">
                    <svg viewBox="0 0 150 150" className="node-logo-svg" aria-label="Kishore K V Monogram Logo">
                        <defs>
                            <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="var(--accent-blue)" />
                                <stop offset="50%" stopColor="var(--accent-purple)" />
                                <stop offset="100%" stopColor="var(--accent-green)" />
                            </linearGradient>
                            <filter id="logo-glow" x="-30%" y="-30%" width="160%" height="160%">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Connections (Interconnected Mesh Lines) */}
                        <g className="mesh-lines" stroke="url(#logo-grad)" strokeWidth="1.2" opacity="0.6" fill="none">
                            <line x1="75" y1="25" x2="125" y2="55" />
                            <line x1="125" y1="55" x2="125" y2="95" />
                            <line x1="125" y1="95" x2="75" y2="125" />
                            <line x1="75" y1="125" x2="25" y2="95" />
                            <line x1="25" y1="95" x2="25" y2="55" />
                            <line x1="25" y1="55" x2="75" y2="25" />
                            
                            {/* Inner lines connecting to center */}
                            <line x1="75" y1="75" x2="75" y2="25" className="inner-line-1" />
                            <line x1="75" y1="75" x2="125" y2="55" className="inner-line-2" />
                            <line x1="75" y1="75" x2="125" y2="95" className="inner-line-3" />
                            <line x1="75" y1="75" x2="75" y2="125" className="inner-line-4" />
                            <line x1="75" y1="75" x2="25" y2="95" className="inner-line-5" />
                            <line x1="75" y1="75" x2="25" y2="55" className="inner-line-6" />
                        </g>

                        {/* Node dots */}
                        <g fill="var(--bg-dark)" stroke="url(#logo-grad)" strokeWidth="1.5">
                            <circle cx="75" cy="25" r="4.5" className="node-pulse dot-1" />
                            <circle cx="125" cy="55" r="4.5" className="node-pulse dot-2" />
                            <circle cx="125" cy="95" r="4.5" className="node-pulse dot-3" />
                            <circle cx="75" cy="125" r="4.5" className="node-pulse dot-4" />
                            <circle cx="25" cy="95" r="4.5" className="node-pulse dot-5" />
                            <circle cx="25" cy="55" r="4.5" className="node-pulse dot-6" />
                        </g>

                        {/* Center glowing monogram node */}
                        <circle cx="75" cy="75" r="16" fill="url(#logo-grad)" filter="url(#logo-glow)" opacity="0.15" />
                        <circle cx="75" cy="75" r="12" fill="var(--bg-dark)" stroke="url(#logo-grad)" strokeWidth="1.5" />
                        
                        {/* Monogram Text */}
                        <text x="75" y="79" 
                              fill="url(#logo-grad)" 
                              fontFamily="var(--font-heading)" 
                              fontSize="11" 
                              fontWeight="bold" 
                              textAnchor="middle"
                              letterSpacing="-0.5"
                              filter="url(#logo-glow)">
                            K
                        </text>
                    </svg>
                </div>

                {/* Typography and sleek layout */}
                <div className="preloader-text-section">
                    <h2 className="preloader-brand">KISHORE K V</h2>
                    <p className="preloader-status">{statusText}</p>
                    
                    <div className="sleek-progress-container">
                        <div className="sleek-progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                    <span className="sleek-progress-pct">{progress}%</span>
                </div>
            </div>
        </div>
    );
}

