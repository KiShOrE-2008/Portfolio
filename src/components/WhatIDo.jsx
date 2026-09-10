import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="none"/>
                <circle cx="12" cy="12" r="10" stroke="#22d3ee" strokeWidth="1.5"/>
                <path d="M9 9l6 6M15 9l-6 6" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="3" stroke="#a78bfa" strokeWidth="1.2"/>
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
            </svg>
        ),
        title: 'Ethical Hacking & Security',
        desc: 'Performing vulnerability assessments, implementing secure PBKDF2 cryptography algorithms, auditing security configurations, and threat prevention.',
        badge: 'Security Architecture'
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="6" width="20" height="12" rx="2" stroke="#22d3ee" strokeWidth="1.5"/>
                <path d="M2 10h20" stroke="#22d3ee" strokeWidth="1.2" opacity="0.5"/>
                <circle cx="5.5" cy="8" r="0.8" fill="#a78bfa"/>
                <circle cx="8" cy="8" r="0.8" fill="#22d3ee"/>
                <circle cx="10.5" cy="8" r="0.8" fill="#4ade80"/>
                <path d="M5 13h4M5 15.5h7M14 13h5M14 15.5h3" stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
                <path d="M5 13h4" stroke="#22d3ee" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
        ),
        title: 'Network Traffic Analysis',
        desc: 'Analyzing packet captures with Wireshark, monitoring router bandwidth, inspecting network protocols, and building real-time administrative dashboards.',
        badge: 'Networking'
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="#22d3ee" strokeWidth="1.2" opacity="0.3"/>
                <path d="M14.5 8.5C14.5 8.5 13 7 12 7s-2.5 1.5-2.5 1.5L12 12l2.5-3.5z" fill="#22d3ee" opacity="0.9"/>
                <path d="M9.5 8.5L7 12l2.5 3.5" stroke="#22d3ee" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M14.5 8.5L17 12l-2.5 3.5" stroke="#a78bfa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <circle cx="12" cy="12" r="2" fill="#22d3ee" opacity="0.9"/>
                <circle cx="12" cy="12" r="4.5" stroke="#22d3ee" strokeWidth="1" opacity="0.3"/>
            </svg>
        ),
        title: 'Software & Web Development',
        desc: 'Engineering fast, responsive React web applications with glassmorphic UIs, robust micro-interactions, clean state management, and modern UI/UX design systems.',
        badge: 'Full-Stack Web'
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                <rect x="7" y="14" width="10" height="7" rx="1" stroke="#22d3ee" strokeWidth="1.5"/>
                <rect x="9" y="11" width="6" height="4" rx="0.5" stroke="#a78bfa" strokeWidth="1.2"/>
                <circle cx="12" cy="7" r="3" stroke="#22d3ee" strokeWidth="1.5"/>
                <path d="M12 4V2M12 10v1.5" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
                <path d="M9 7H7M15 7h2" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
                <path d="M5 18h2M17 18h2" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
                <circle cx="12" cy="7" r="1" fill="#4ade80"/>
            </svg>
        ),
        title: 'Smart IoT Systems',
        desc: 'Architecting automated hardware systems with Arduino microcontrollers, sensors, moisture detectors, and servo actuators for real-world automation.',
        badge: 'IoT & Hardware'
    }
];


export default function WhatIDo() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReducedMotion) return;

        gsap.fromTo('.service-card',
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current.querySelector('.services-grid'),
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="what-i-do-section-inner" style={{ width: '100%' }}>
            <div className="section-header">
                <span className="section-technical-tag">02 // SERVICES</span>
                <span className="section-eyebrow">SERVICES & CORE CAPABILITIES</span>
                <h2 className="section-title">
                    What I <span className="gradient-text">Do</span>
                </h2>
                <p className="section-subtitle">
                    Delivering robust solutions covering ethical hacking, network analysis, web engineering, and smart IoT automation.
                </p>
                <div className="section-divider"></div>
            </div>

            <div className="services-grid">
                {servicesData.map((service, index) => (
                    <div key={index} className="service-card glass-panel">
                        <div className="service-card-top">
                            <span className="service-icon">
                                {service.icon}
                            </span>
                            <span className="service-badge">{service.badge}</span>
                        </div>
                        <h3 className="service-title">{service.title}</h3>
                        <p className="service-desc">{service.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
