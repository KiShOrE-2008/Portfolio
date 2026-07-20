import React from 'react';
import TiltCard from './TiltCard';

const projectsData = [
    {
        id: 'projectPasswordChecker',
        icon: '🔑',
        badge: 'Security',
        title: 'Password Strength Checker',
        desc: 'Advanced password strength analysis system applying entropy algorithms, pattern checks, crack-time estimates, and secure client-side PBKDF2 hashing.',
        tags: ['Python', 'JavaScript', 'Cryptography'],
        link: 'https://github.com/KiShOrE-2008/Password_Checker',
        linkLabel: 'Code',
        linkId: 'linkProjPassCheck'
    },
    {
        id: 'projectRouterMonitor',
        icon: '🌐',
        badge: 'Networking',
        title: 'Router Monitoring Dashboard',
        desc: 'Network analytics platform providing bandwidth load tracking, router packet inspections, connection status, and real-time administrative alerts.',
        tags: ['Python', 'Traffic Analysis', 'Websockets'],
        link: 'https://github.com/KiShOrE-2008',
        linkLabel: 'Explore',
        linkId: 'linkProjRouter'
    },
    {
        id: 'projectWasteSegregation',
        icon: '♻️',
        badge: 'IoT',
        title: 'Smart Waste Segregation',
        desc: 'Automated sorting system using hardware sensors, moisture detectors, microcontrollers (Arduino), and servo actuators to segregate trash.',
        tags: ['Arduino', 'C / C++', 'IoT Hardware'],
        link: 'https://github.com/KiShOrE-2008',
        linkLabel: 'Explore',
        linkId: 'linkProjWaste'
    },
    {
        id: 'projectLinkWeb',
        icon: '🎛️',
        badge: 'Web UI',
        title: 'Portfolio Dashboard',
        desc: 'A modern, responsive link list profile directory featuring micro-interactions, custom themes, and glassmorphic designs.',
        tags: ['HTML5', 'CSS3', 'JavaScript'],
        link: 'https://github.com/KiShOrE-2008/Portfolio',
        linkLabel: 'Code',
        linkId: 'linkProjLinkweb'
    },
    {
        id: 'projectCarsWeb',
        icon: '🏎️',
        badge: 'Web UI',
        title: 'Cars Web Page',
        desc: 'A beautiful landing showcase for performance cars highlighting fluid responsive grids, smooth imagery animations, and model filters.',
        tags: ['HTML5', 'CSS3', 'Design'],
        link: 'https://github.com/KiShOrE-2008/cars',
        linkLabel: 'Code',
        linkId: 'linkProjCars'
    }
];

export default function Projects() {
    return (
        <>
            <div className="section-header">
                <h2 className="section-title">Projects Showcase</h2>
                <div className="section-divider"></div>
            </div>

            <div className="projects-grid">
                {projectsData.map((project) => (
                    <article key={project.id} className="project-card-wrapper">
                        <TiltCard className="project-card tilt-card" id={project.id}>
                            <div className="project-header">
                                <div className="project-icon-box">{project.icon}</div>
                                <span className="project-badge">{project.badge}</span>
                            </div>
                            <h3 className="project-card-title">{project.title}</h3>
                            <p className="project-card-description">{project.desc}</p>
                            <div className="project-tags">
                                {project.tags.map((tag, tIdx) => (
                                    <span key={tIdx} className="tag">{tag}</span>
                                ))}
                            </div>
                            <div className="project-links">
                                <a 
                                    href={project.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="project-link" 
                                    id={project.linkId}
                                >
                                    {project.linkLabel}{' '}
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path
                                            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                                        </path>
                                    </svg>
                                </a>
                            </div>
                        </TiltCard>
                    </article>
                ))}
            </div>
        </>
    );
}
