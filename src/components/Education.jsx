import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const educationItems = [
    {
        icon: '🎓',
        degree: 'B.Tech in Information Technology',
        institution: 'Chennai Institute of Technology',
        period: 'Sep 2025 – May 2029',
        location: 'Chennai, India',
        badge: 'Ongoing Degree',
        desc: 'Specializing in software architectures, cybersecurity diagnostics, computer networks, and traffic analysis. Actively engaging in competitive programming and secure web applications.',
        highlights: ['Cybersecurity', 'Computer Networks', 'Software Engineering', 'Data Structures']
    },
    {
        icon: '🏫',
        degree: '12th Grade Higher Secondary (PCMCS)',
        institution: 'Shri Vidhya Mandhir',
        period: 'Apr 2024 – Mar 2025',
        location: 'Tamil Nadu, India',
        badge: '70% Honors',
        desc: 'Specialized in Physics, Chemistry, Mathematics, and Computer Science (PCMCS). Simultaneously completed an intensive 8-week certification in Data Science & AI at IIT Madras.',
        highlights: ['Physics & Computer Science', 'IIT Madras AI Certification', 'Photography & Multimedia']
    }
];

export default function Education() {
    const eduRef = useRef(null);

    useGSAP(() => {
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReducedMotion) return;

        gsap.fromTo('.edu-card-bento',
            { y: 35, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: eduRef.current.querySelector('.edu-grid'),
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, { scope: eduRef });

    return (
        <div ref={eduRef} className="education-section-inner" style={{ width: '100%' }}>
            <div className="section-header">
                <span className="section-technical-tag">03 // EDUCATION</span>
                <span className="section-eyebrow">ACADEMIC BACKGROUND</span>
                <h2 className="section-title">
                    Education & <span className="gradient-text">Journey</span>
                </h2>
                <p className="section-subtitle">
                    Building a strong theoretical foundation in computer systems, network protocols, and data science.
                </p>
                <div className="section-divider"></div>
            </div>

            <div className="edu-grid">
                {educationItems.map((item, idx) => (
                    <div key={idx} className="edu-card-bento glass-panel">
                        <div className="edu-card-header">
                            <div className="edu-icon-badge">{item.icon}</div>
                            <span className="edu-tag-pill">{item.badge}</span>
                        </div>

                        <div className="edu-meta-row">
                            <span className="edu-period">📅 {item.period}</span>
                            <span className="edu-location">📍 {item.location}</span>
                        </div>

                        <h3 className="edu-degree-title">{item.degree}</h3>
                        <div className="edu-institution-name">{item.institution}</div>
                        <p className="edu-desc-text">{item.desc}</p>

                        <div className="edu-highlights-tags">
                            {item.highlights.map((tag, tIdx) => (
                                <span key={tIdx} className="edu-tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
