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

        gsap.fromTo('.section-header',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: expRef.current.querySelector('.section-header'),
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.timeline-content',
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: expRef.current.querySelector('.timeline'),
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, { scope: expRef });

    return (
        <div ref={expRef} className="experience-container-inner" style={{ width: '100%' }}>
            <div className="section-header">
                <h2 className="section-title">Work Experience</h2>
                <div className="section-divider"></div>
            </div>

            <div className="timeline">
                {/* UP Police Internship */}
                <div className="timeline-item">
                    <TiltCard 
                        className="timeline-content tilt-card clickable-card"
                        onClick={() => onOpenLightbox(0)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="timeline-header">
                            <span className="time-period">June 2026</span>
                            <span className="view-cert-badge">🔍 View Gallery</span>
                            <span className="location">Moradabad, India</span>
                        </div>
                        <h3 className="role-title">Cyber Security Student Intern</h3>
                        <span className="company-name">Uttar Pradesh Police ( "सुरक्षा आपकी, संकल्प हमारा" )</span>
                        <div className="timeline-body">
                            <p className="internship-badge">Amroha Police Cyber Security Internship Program (APCSIP-2026)</p>
                            <ul className="experience-bullets">
                                <li>Completed the APCSIP-2026, gaining hands-on experience in cybersecurity, cybercrime investigation, digital forensics, and cyber awareness.</li>
                                <li>Learned about cybercrime investigation methodologies, digital security practices, and emerging cyber threats.</li>
                                <li>Collaborated with industry experts, law enforcement professionals, and peers during technical sessions and workshops.</li>
                            </ul>
                        </div>
                    </TiltCard>
                </div>
            </div>
        </div>
    );
}

