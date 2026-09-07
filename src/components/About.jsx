import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const metricCards = [
    { value: '6+', label: 'Coding Projects', icon: '💻', highlight: 'Builds & Demos' },
    { value: '11', label: 'GitHub Followers', icon: '🐙', highlight: 'Open Source' },
    { value: '5', label: 'GitHub Stars', icon: '⭐', highlight: 'Community' },
    { value: '250+', label: 'LeetCode Solves', icon: '🧩', highlight: 'Algorithms' }
];

export default function About() {
    const aboutRef = useRef(null);

    useGSAP(() => {
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReducedMotion) return;

        gsap.fromTo('.section-header',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: aboutRef.current.querySelector('.section-header'),
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.about-text-panel',
            { x: -35, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: aboutRef.current.querySelector('.about-bento-grid'),
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.bento-metric-card',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: aboutRef.current.querySelector('.bento-stats-matrix'),
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, { scope: aboutRef });

    return (
        <div ref={aboutRef} className="about-section-inner" style={{ width: '100%' }}>
            <div className="section-header">
                <span className="section-eyebrow">ABOUT ME & PHILOSOPHY</span>
                <h2 className="section-title">
                    Passionate about <span className="gradient-text">Digital & Cyber Excellence</span>
                </h2>
                <div className="section-divider"></div>
            </div>

            <div className="about-bento-grid">
                {/* Text Content Panel */}
                <div className="about-text-panel glass-panel">
                    <h3>My Journey & Security Engineering Mindset</h3>
                    <p>
                        I'm currently pursuing a <strong>B.Tech in Information Technology</strong> at <strong>Chennai Institute of Technology</strong>. My passion lies in understanding how digital networks communicate, auditing security paradigms, and crafting resilient software.
                    </p>
                    <p>
                        Whether examining packet flows in Wireshark, implementing PBKDF2 hashing algorithms, or developing responsive web dashboards, I focus on building systems that are both highly functional and intrinsically secure.
                    </p>
                    <div className="about-highlights-row">
                        <div className="highlight-item">
                            <span className="hl-icon">🎓</span>
                            <div>
                                <strong>Education</strong>
                                <p>B.Tech IT, Chennai Institute of Technology</p>
                            </div>
                        </div>
                        <div className="highlight-item">
                            <span className="hl-icon">🎯</span>
                            <div>
                                <strong>Ultimate Goal</strong>
                                <p>Cybersecurity & Network Architecture Leadership</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2x2 Bento Metric Stat Matrix */}
                <div className="bento-stats-matrix">
                    {metricCards.map((card, idx) => (
                        <div key={idx} className="bento-metric-card glass-panel">
                            <div className="metric-header">
                                <span className="metric-icon">{card.icon}</span>
                                <span className="metric-tag">{card.highlight}</span>
                            </div>
                            <div className="metric-value gradient-text">{card.value}</div>
                            <div className="metric-label">{card.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
