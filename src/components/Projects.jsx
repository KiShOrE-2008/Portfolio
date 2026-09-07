import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
    {
        id: 'projectPasswordChecker',
        icon: '🔑',
        badge: 'Security Architecture',
        title: 'Password Strength Checker',
        desc: 'Advanced password analysis system applying entropy calculations, pattern matching, crack-time estimation, and PBKDF2 hashing.',
        tags: ['Python', 'JavaScript', 'Cryptography'],
        link: 'https://github.com/KiShOrE-2008/Password_Checker',
        size: 'large', // bento grid spanning
        accent: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.15))'
    },
    {
        id: 'projectRouterMonitor',
        icon: '🌐',
        badge: 'Networking',
        title: 'Router Monitoring Dashboard',
        desc: 'Network analytics platform providing real-time bandwidth tracking, packet inspection, and admin alerts.',
        tags: ['Python', 'Traffic Analysis', 'Websockets'],
        link: 'https://github.com/KiShOrE-2008',
        size: 'medium',
        accent: 'linear-gradient(135deg, rgba(57, 211, 83, 0.15), rgba(56, 189, 248, 0.15))'
    },
    {
        id: 'projectWasteSegregation',
        icon: '♻️',
        badge: 'IoT & Hardware',
        title: 'Smart Waste Segregation',
        desc: 'Automated sorting system using hardware sensors, moisture detectors, microcontrollers (Arduino), and servo actuators.',
        tags: ['Arduino', 'C / C++', 'IoT Hardware'],
        link: 'https://github.com/KiShOrE-2008',
        size: 'medium',
        accent: 'linear-gradient(135deg, rgba(255, 159, 28, 0.15), rgba(239, 68, 68, 0.15))'
    },
    {
        id: 'projectLinkWeb',
        icon: '🎛️',
        badge: 'Web UI',
        title: 'Portfolio Dashboard',
        desc: 'A modern, responsive link list profile directory featuring micro-interactions, custom themes, and glassmorphic designs.',
        tags: ['HTML5', 'CSS3', 'JavaScript'],
        link: 'https://github.com/KiShOrE-2008/Portfolio',
        size: 'large',
        accent: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(59, 130, 246, 0.15))'
    },
    {
        id: 'projectCarsWeb',
        icon: '🏎️',
        badge: 'Web UI Showcase',
        title: 'Cars Showcase Page',
        desc: 'A landing showcase for performance cars highlighting fluid responsive grids and smooth imagery animations.',
        tags: ['HTML5', 'CSS3', 'Design'],
        link: 'https://github.com/KiShOrE-2008/cars',
        size: 'full',
        accent: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(139, 92, 246, 0.15))'
    }
];

export default function Projects() {
    const projectsRef = useRef(null);

    useGSAP(() => {
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReducedMotion) return;

        gsap.fromTo('.bento-project-card',
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: projectsRef.current.querySelector('.projects-bento-grid'),
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, { scope: projectsRef });

    return (
        <div ref={projectsRef} className="projects-section-inner" style={{ width: '100%' }}>
            <div className="section-header">
                <span className="section-eyebrow">FEATURED PORTFOLIO PROJECTS</span>
                <h2 className="section-title">
                    Selected <span className="gradient-text">Works</span>
                </h2>
                <p className="section-subtitle">
                    A showcase of security systems, network tools, IoT hardware, and web engineering.
                </p>
                <div className="section-divider"></div>
            </div>

            <div className="projects-bento-grid">
                {projectsData.map((project) => (
                    <article
                        key={project.id}
                        className={`bento-project-card glass-panel size-${project.size}`}
                        style={{ '--card-accent': project.accent }}
                    >
                        <div className="project-card-header">
                            <span className="project-icon">{project.icon}</span>
                            <span className="project-badge-pill">{project.badge}</span>
                        </div>

                        <div className="project-card-body">
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-desc">{project.desc}</p>
                        </div>

                        <div className="project-card-footer">
                            <div className="project-tags-list">
                                {project.tags.map((tag, tIdx) => (
                                    <span key={tIdx} className="tech-tag">{tag}</span>
                                ))}
                            </div>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-action-btn"
                                aria-label={`View ${project.title}`}
                            >
                                <span className="arrow">↗</span>
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
