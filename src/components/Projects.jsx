import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
    {
        id: 'projectPasswordChecker',
        category: 'cybersecurity',
        categoryLabel: 'Cybersecurity',
        icon: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/authelia.webp',
        badge: 'Security Architecture',
        title: 'Password Strength Checker',
        subtitle: 'Cryptographic entropy engine & pattern weakness analyzer',
        desc: 'Advanced password analysis system applying entropy calculations, pattern matching, crack-time estimation, and PBKDF2 hashing.',
        highlights: [
            'Shannon Entropy calculation to measure randomness bits per character',
            'PBKDF2 key derivation & dictionary pattern weakness detection',
            'Brute-force crack time estimations across GPU cluster speeds',
            'Vulnerability mitigation recommendations for web app developers'
        ],
        tags: ['Python', 'JavaScript', 'Cryptography', 'Security Analysis'],
        link: 'https://github.com/KiShOrE-2008/Password_Checker',
        featured: true,
        codeSnippet: `def calc_entropy(pw):\n    chars = set(pw)\n    entropy = len(pw) * math.log2(len(chars))\n    return round(entropy, 2)`,
        accent: 'linear-gradient(135deg, rgba(0, 242, 143, 0.25), rgba(56, 189, 248, 0.25))'
    },
    {
        id: 'projectRouterMonitor',
        category: 'networking',
        categoryLabel: 'Networking',
        icon: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/cisco.webp',
        badge: 'Networking',
        title: 'Router Monitoring Dashboard',
        subtitle: 'Real-time bandwidth analytics & ICMP packet inspector',
        desc: 'Network analytics platform providing real-time bandwidth tracking, packet inspection, and admin alerts.',
        highlights: [
            'Live socket telemetry tracking interface bandwidth utilization',
            'Packet header inspection for anomaly & unauthorized IP detection',
            'Automated admin alerts on latency spikes & DDoS threshold triggers',
            'Interactive charts rendering historical traffic metrics'
        ],
        tags: ['Python', 'Traffic Analysis', 'Websockets', 'TCP/IP'],
        link: 'https://github.com/KiShOrE-2008',
        featured: false,
        codeSnippet: `const socket = new WebSocket('ws://router.local:8080');\nsocket.onmessage = (e) => parseTelemetry(e.data);`,
        accent: 'linear-gradient(135deg, rgba(57, 211, 83, 0.2), rgba(56, 189, 248, 0.2))'
    },
    {
        id: 'projectWasteSegregation',
        category: 'networking',
        categoryLabel: 'IoT & Hardware',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg',
        badge: 'IoT & Hardware',
        title: 'Smart Waste Segregation',
        subtitle: 'Microcontroller hardware system with automated sensor sorting',
        desc: 'Automated sorting system using hardware sensors, moisture detectors, microcontrollers (Arduino), and servo actuators.',
        highlights: [
            'Inductive & moisture sensor signal processing in C/C++',
            'Real-time servo actuator control loops for automated bin routing',
            'Low-power microcontroller firmware architecture',
            'Edge hardware telemetry via serial communication'
        ],
        tags: ['Arduino', 'C / C++', 'IoT Hardware', 'Sensors'],
        link: 'https://github.com/KiShOrE-2008',
        featured: false,
        codeSnippet: `void loop() {\n  int val = analogRead(MOISTURE_PIN);\n  if (val > THRESHOLD) rotateServo(90);\n}`,
        accent: 'linear-gradient(135deg, rgba(255, 159, 28, 0.2), rgba(239, 68, 68, 0.2))'
    },
    {
        id: 'projectLinkWeb',
        category: 'web',
        categoryLabel: 'Web Applications',
        icon: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/crowdsec.webp',
        badge: 'Web UI',
        title: 'Cybersecurity Portfolio Dashboard',
        subtitle: 'Glassmorphism portfolio directory with 3D physics lanyard card',
        desc: 'A modern, responsive link list profile directory featuring micro-interactions, custom themes, and glassmorphic designs.',
        highlights: [
            'Custom 360° rigid-body pendulum physics loop running at 120 FPS',
            'Glassmorphism design system built with CSS variables & backdrop filters',
            'Interactive command-line terminal widget (Ctrl + K)',
            'Dynamic GitHub activity heatmaps & real-time API sync'
        ],
        tags: ['React', 'JavaScript', 'Physics Engine', 'CSS3'],
        link: 'https://github.com/KiShOrE-2008/Portfolio',
        featured: true,
        codeSnippet: `const force = -k * Math.sin(rad) * 450 - damping * vel;\nvelocity += force * dt;\nrotation += velocity * dt;`,
        accent: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))'
    },
    {
        id: 'projectCarsWeb',
        category: 'web',
        categoryLabel: 'Web Applications',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
        badge: 'Web UI Showcase',
        title: 'Cars Showcase Page',
        subtitle: 'High-performance responsive landing showcase for luxury cars',
        desc: 'A landing showcase for performance cars highlighting fluid responsive grids and smooth imagery animations.',
        highlights: [
            'Responsive multi-column CSS grid & fluid typography scaling',
            'Hardware-accelerated CSS animations and parallax scroll dynamics',
            'Clean semantic HTML5 structure & accessibility compliance'
        ],
        tags: ['HTML5', 'CSS3', 'Design', 'Responsive UI'],
        link: 'https://github.com/KiShOrE-2008/cars',
        featured: false,
        codeSnippet: `@media (min-width: 1024px) {\n  .car-grid { grid-template-columns: repeat(3, 1fr); }\n}`,
        accent: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.2))'
    }
];

export default function Projects({ onSelectProject }) {
    const [activeTab, setActiveTab] = useState('all');
    const [layoutMode, setLayoutMode] = useState('deck'); // 'deck' | 'grid'
    const projectsRef = useRef(null);

    const filteredProjects = projectsData.filter((p) => {
        if (activeTab === 'all') return true;
        return p.category === activeTab;
    });

    useGSAP(() => {
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReducedMotion) return;

        gsap.fromTo('.cyber-project-card',
            { y: 35, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.65,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: projectsRef.current.querySelector('.cyber-projects-wrapper'),
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, { scope: projectsRef, dependencies: [activeTab, layoutMode] });

    return (
        <div ref={projectsRef} className="projects-section-inner" style={{ width: '100%' }}>
            <div className="section-header">
                <span className="section-technical-tag">07 // PROJECTS & ARCHITECTURE</span>
                <span className="section-eyebrow">HIGH-PERFORMANCE SYSTEM SHOWCASE</span>
                <h2 className="section-title">
                    Selected <span className="gradient-text">Works</span>
                </h2>
                <p className="section-subtitle">
                    A showcase of security systems, network tools, IoT hardware, and web engineering.
                </p>
                <div className="section-divider"></div>

                {/* Top Controls: Filter Pills & Layout Switcher */}
                <div className="projects-top-controls">
                    <div className="project-category-filters">
                        {[
                            { id: 'all', label: 'All Systems' },
                            { id: 'cybersecurity', label: '🛡️ Cybersecurity' },
                            { id: 'networking', label: '🌐 Networking & IoT' },
                            { id: 'web', label: '🎛️ Web Apps' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                className={`filter-pill-btn ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="layout-toggle-group">
                        <button
                            className={`layout-btn ${layoutMode === 'deck' ? 'active' : ''}`}
                            onClick={() => setLayoutMode('deck')}
                            title="Cyber Deck View"
                        >
                            ⚡ Deck View
                        </button>
                        <button
                            className={`layout-btn ${layoutMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setLayoutMode('grid')}
                            title="Matrix Grid View"
                        >
                            🔲 Grid View
                        </button>
                    </div>
                </div>
            </div>

            <div className={`cyber-projects-wrapper layout-${layoutMode}`}>
                {filteredProjects.map((project, idx) => (
                    <article
                        key={project.id}
                        className={`cyber-project-card glass-panel ${project.featured ? 'is-featured' : ''}`}
                        style={{ '--card-accent': project.accent }}
                        onClick={() => onSelectProject(project)}
                    >
                        {/* Corner Cyber Brackets */}
                        <span className="corner-bracket top-left"></span>
                        <span className="corner-bracket top-right"></span>
                        <span className="corner-bracket bottom-left"></span>
                        <span className="corner-bracket bottom-right"></span>

                        {/* Top Meta Line */}
                        <div className="card-top-meta">
                            <div className="card-tag-pill">
                                <span className="card-icon">
                                    <img src={project.icon} alt={project.title} width="22" height="22" style={{ objectFit: 'contain' }} />
                                </span>
                                <span className="card-badge">{project.badge}</span>
                            </div>
                            <div className="card-status-indicator">
                                <span className="status-pulse"></span>
                                <span className="status-text">SYS_OK</span>
                            </div>
                        </div>

                        {/* Card Main Header & Desc */}
                        <div className="card-main-content">
                            <h3 className="card-title">{project.title}</h3>
                            <p className="card-subtitle">{project.subtitle}</p>
                            <p className="card-desc">{project.desc}</p>

                            {/* Code Terminal Preview Block (for featured deck items) */}
                            {project.codeSnippet && layoutMode === 'deck' && (
                                <div className="card-code-preview">
                                    <div className="code-header">
                                        <span className="code-dot red"></span>
                                        <span className="code-dot yellow"></span>
                                        <span className="code-dot green"></span>
                                        <span className="code-filename">core_module.py</span>
                                    </div>
                                    <pre className="code-body">
                                        <code>{project.codeSnippet}</code>
                                    </pre>
                                </div>
                            )}
                        </div>

                        {/* Card Bottom Footer Actions */}
                        <div className="card-footer-bar">
                            <div className="tech-tags-group">
                                {project.tags.slice(0, 3).map((tag, tIdx) => (
                                    <span key={tIdx} className="cyber-tech-tag">{tag}</span>
                                ))}
                            </div>

                            <button className="cyber-inspect-btn">
                                <span>Inspect Code</span>
                                <span className="btn-glow-arrow">➔</span>
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
