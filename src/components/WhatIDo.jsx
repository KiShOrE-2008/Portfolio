import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
    {
        icon: '🛡️',
        title: 'Ethical Hacking & Security',
        desc: 'Performing vulnerability assessments, implementing secure PBKDF2 cryptography algorithms, auditing security configurations, and threat prevention.',
        badge: 'Security Architecture'
    },
    {
        icon: '🌐',
        title: 'Network Traffic Analysis',
        desc: 'Analyzing packet captures with Wireshark, monitoring router bandwidth, inspecting network protocols, and building real-time administrative dashboards.',
        badge: 'Networking'
    },
    {
        icon: '💻',
        title: 'Software & Web Development',
        desc: 'Engineering fast, responsive React web applications with glassmorphic UIs, robust micro-interactions, clean state management, and modern UI/UX design systems.',
        badge: 'Full-Stack Web'
    },
    {
        icon: '🤖',
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
                            <span className="service-icon">{service.icon}</span>
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
