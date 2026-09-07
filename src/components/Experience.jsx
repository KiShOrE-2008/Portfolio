import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TiltCard from './TiltCard';

gsap.registerPlugin(ScrollTrigger);

export default function Experience({ onOpenLightbox }) {
    const expRef = useRef(null);

    useGSAP(() => {
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReducedMotion) return;

        gsap.fromTo('.timeline-spine-line',
            { scaleY: 0, transformOrigin: 'top center' },
            {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: expRef.current.querySelector('.timeline-spine-wrapper'),
                    start: 'top 75%',
                    end: 'bottom 25%',
                    scrub: 1
                }
            }
        );

        gsap.fromTo('.timeline-node-card',
            { y: 35, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: expRef.current.querySelector('.timeline-spine-wrapper'),
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, { scope: expRef });

    return (
        <div ref={expRef} className="experience-section-inner" style={{ width: '100%' }}>
            <div className="section-header">
                <span className="section-eyebrow">CAREER & PRACTICAL EXPERIENCE</span>
                <h2 className="section-title">
                    Work Experience & <span className="gradient-text">Internships</span>
                </h2>
                <div className="section-divider"></div>
            </div>

            <div className="timeline-spine-wrapper">
                {/* Glowing Vertical Line Spine */}
                <div className="timeline-spine-line"></div>

                {/* UP Police Internship Node */}
                <div className="timeline-node-item">
                    <div className="timeline-spine-node">
                        <span className="node-glow-ring"></span>
                    </div>

                    <TiltCard
                        className="timeline-node-card glass-panel clickable-card"
                        onClick={() => onOpenLightbox(0)}
                    >
                        <div className="node-header">
                            <span className="node-period">June 2026</span>
                            <span className="node-badge">🔍 View 7-Photo Gallery</span>
                            <span className="node-location">Moradabad, India</span>
                        </div>

                        <h3 className="node-role">Cyber Security Student Intern</h3>
                        <div className="node-company">Uttar Pradesh Police ( "सुरक्षा आपकी, संकल्प हमारा" )</div>
                        
                        <p className="node-program-title">Amroha Police Cyber Security Internship Program (APCSIP-2026)</p>

                        <ul className="node-bullets">
                            <li>Completed the APCSIP-2026, gaining hands-on experience in cybersecurity, cybercrime investigation, digital forensics, and cyber awareness.</li>
                            <li>Learned about cybercrime investigation methodologies, digital security practices, and emerging cyber threats.</li>
                            <li>Collaborated with industry experts, law enforcement professionals, and peers during technical sessions and workshops.</li>
                        </ul>

                        <div className="node-tags-row">
                            <span className="exp-tag">Cybersecurity</span>
                            <span className="exp-tag">Digital Forensics</span>
                            <span className="exp-tag">Network Auditing</span>
                            <span className="exp-tag">Cyber Awareness</span>
                        </div>
                    </TiltCard>
                </div>
            </div>
        </div>
    );
}
