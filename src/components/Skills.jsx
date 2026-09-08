import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Category color theme tokens
const categoryColors = {
    languages: '#38bdf8',       // Cyan
    cyber: '#ff9f1c',           // Amber / Red-Orange
    web: '#39d353',             // Cyber Green
    cloud: '#a855f7',           // Purple
    tools: '#27c93f',           // Mint Green
};

// Dashboard icons CDN base
const iconCdn = 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/';
const deviconCdn = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';

const skillCategories = [
    {
        id: 'languages',
        label: 'Languages',
        count: 5,
        accentColor: categoryColors.languages,
        skills: [
            {
                name: 'Python',
                level: 'Proficient',
                dots: 4,
                color: '#3572A5',
                icon: `${deviconCdn}python/python-original.svg`
            },
            {
                name: 'C / C++',
                level: 'Intermediate',
                dots: 3,
                color: '#659AD2',
                icon: `${deviconCdn}cplusplus/cplusplus-original.svg`
            },
            {
                name: 'Java',
                level: 'Intermediate',
                dots: 3,
                color: '#E76F00',
                icon: `${deviconCdn}java/java-original.svg`
            },
            {
                name: 'JavaScript',
                level: 'Proficient',
                dots: 4,
                color: '#F7DF1E',
                icon: `${deviconCdn}javascript/javascript-original.svg`
            },
            {
                name: 'TypeScript',
                level: 'Intermediate',
                dots: 3,
                color: '#3178C6',
                icon: `${deviconCdn}typescript/typescript-original.svg`
            }
        ]
    },
    {
        id: 'cyber',
        label: 'Cybersecurity & Networking',
        count: 6,
        accentColor: categoryColors.cyber,
        skills: [
            {
                name: 'Network Traffic Analysis (Wireshark)',
                level: 'Proficient',
                dots: 4,
                color: '#1679A7',
                icon: `${iconCdn}wireshark.webp`
            },
            {
                name: 'Penetration Testing & Security Auditing',
                level: 'Intermediate',
                dots: 3,
                color: '#EF3F34',
                icon: `${iconCdn}kali-linux.webp`
            },
            {
                name: 'Digital Forensics & Investigation',
                level: 'Proficient',
                dots: 4,
                color: '#008080',
                icon: `${iconCdn}crowdsec.webp`
            },
            {
                name: 'TCP/IP & Routing Protocols',
                level: 'Proficient',
                dots: 4,
                color: '#38bdf8',
                icon: `${iconCdn}cisco.webp`
            },
            {
                name: 'Linux Security Auditing',
                level: 'Intermediate',
                dots: 3,
                color: '#fc6d26',
                icon: `${deviconCdn}linux/linux-original.svg`
            },
            {
                name: 'Vulnerability Assessment',
                level: 'Intermediate',
                dots: 3,
                color: '#FFA500',
                icon: `${iconCdn}authelia.webp`
            }
        ]
    },
    {
        id: 'web',
        label: 'Frontend & Web',
        count: 5,
        accentColor: categoryColors.web,
        skills: [
            {
                name: 'HTML5',
                level: 'Expert',
                dots: 5,
                color: '#e34c26',
                icon: `${deviconCdn}html5/html5-original.svg`
            },
            {
                name: 'CSS3',
                level: 'Expert',
                dots: 5,
                color: '#264de4',
                icon: `${deviconCdn}css3/css3-original.svg`
            },
            {
                name: 'React',
                level: 'Intermediate',
                dots: 3,
                color: '#61dafb',
                icon: `${deviconCdn}react/react-original.svg`
            },
            {
                name: 'Tailwind CSS',
                level: 'Proficient',
                dots: 4,
                color: '#38bdf8',
                icon: `${deviconCdn}tailwindcss/tailwindcss-original.svg`
            },
            {
                name: 'Node.js & Express.js',
                level: 'Intermediate',
                dots: 3,
                color: '#39d353',
                icon: `${deviconCdn}nodejs/nodejs-original.svg`
            }
        ]
    },
    {
        id: 'cloud',
        label: 'Cloud & Databases',
        count: 5,
        accentColor: categoryColors.cloud,
        skills: [
            {
                name: 'AWS — Cloud Essentials',
                level: 'Intermediate',
                dots: 3,
                color: '#ff9900',
                icon: `${iconCdn}aws.webp`
            },
            {
                name: 'Google Cloud Platform (GCP)',
                level: 'Basic',
                dots: 2,
                color: '#4285f4',
                icon: `${deviconCdn}googlecloud/googlecloud-original.svg`
            },
            {
                name: 'Firebase',
                level: 'Intermediate',
                dots: 3,
                color: '#039be5',
                icon: `${deviconCdn}firebase/firebase-plain.svg`
            },
            {
                name: 'MongoDB',
                level: 'Intermediate',
                dots: 3,
                color: '#4ea94b',
                icon: `${deviconCdn}mongodb/mongodb-original.svg`
            },
            {
                name: 'MySQL',
                level: 'Proficient',
                dots: 4,
                color: '#00758f',
                icon: `${deviconCdn}mysql/mysql-original.svg`
            }
        ]
    },
    {
        id: 'tools',
        label: 'Tools, Platforms & Hardware',
        count: 8,
        accentColor: categoryColors.tools,
        skills: [
            {
                name: 'Git & GitHub',
                level: 'Advanced',
                dots: 4,
                color: '#f05033',
                icon: `${deviconCdn}git/git-original.svg`
            },
            {
                name: 'Linux — Bash & CLI',
                level: 'Proficient',
                dots: 4,
                color: '#fc6d26',
                icon: `${deviconCdn}linux/linux-original.svg`
            },
            {
                name: 'Windows Terminal & PowerShell',
                level: 'Proficient',
                dots: 4,
                color: '#4d4d4d',
                icon: `${iconCdn}powershell.webp`
            },
            {
                name: 'Cisco Packet Tracer',
                level: 'Intermediate',
                dots: 3,
                color: '#38bdf8',
                icon: `${iconCdn}cisco.webp`
            },
            {
                name: 'Arduino & IoT Hardware',
                level: 'Intermediate',
                dots: 3,
                color: '#00979d',
                icon: `${deviconCdn}arduino/arduino-original.svg`
            },
            {
                name: 'Blender — 3D Modeling',
                level: 'Intermediate',
                dots: 3,
                color: '#f5792a',
                icon: `${deviconCdn}blender/blender-original.svg`
            },
            {
                name: 'Canva',
                level: 'Intermediate',
                dots: 3,
                color: '#00c4cc',
                icon: `${deviconCdn}canva/canva-original.svg`
            },
            {
                name: 'Adobe Creative Suite',
                level: 'Intermediate',
                dots: 3,
                color: '#ff0000',
                icon: `${iconCdn}adobe.webp`
            }
        ]
    }
];

export default function Skills() {
    const [activeTab, setActiveTab] = useState('languages');
    const skillsRef = useRef(null);

    const activeCategory = skillCategories.find((cat) => cat.id === activeTab);

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
                    trigger: skillsRef.current.querySelector('.section-header'),
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.skills-tabs-container',
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: skillsRef.current.querySelector('.skills-tabs-container'),
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.skill-card-box',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.05,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: skillsRef.current.querySelector('.skills-content'),
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.meter-dot.filled',
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                stagger: 0.04,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: skillsRef.current.querySelector('.skills-content'),
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, { scope: skillsRef, dependencies: [activeTab] });

    return (
        <div ref={skillsRef} className="skills-section-inner" style={{ width: '100%' }}>
            {/* Section Header */}
            <div className="section-header">
                <span className="section-technical-tag">05 // SKILLS &amp; TOOLKIT</span>
                <h2 className="section-title">
                    Technical <span className="gradient-text">Competencies</span>
                </h2>
                <p className="section-subtitle">
                    A practical toolkit spanning software development, cybersecurity, networking &amp; cloud architecture.
                </p>
                <div className="skills-summary-pills">
                    <span className="summary-pill"><strong className="accent">29</strong> Skills</span>
                    <span className="summary-pill"><strong className="accent">5</strong> Skill Domains</span>
                    <span className="summary-pill"><strong className="accent">3</strong> Areas Exploring</span>
                </div>
                <div className="section-divider"></div>
            </div>

            {/* Tabbed Skill Categories with Counters */}
            <div className="skills-tabs-container">
                <div className="skills-tabs">
                    {skillCategories.map((category) => (
                        <button
                            key={category.id}
                            className={`tab-btn ${activeTab === category.id ? 'active' : ''}`}
                            style={{ '--tab-accent': category.accentColor }}
                            onClick={() => setActiveTab(category.id)}
                        >
                            <span className="tab-label">{category.label}</span>
                            <span className="tab-count">{category.count}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Animated Skills Cards Grid */}
            <div className="skills-content">
                <div className="skills-flex-grid">
                    {activeCategory && activeCategory.skills.map((skill, index) => (
                        <div
                            key={`${activeCategory.id}-${index}`}
                            className="skill-card-box"
                            style={{
                                '--brand-color': skill.color,
                                '--category-accent': activeCategory.accentColor,
                                animationDelay: `${index * 60}ms`
                            }}
                        >
                            <div className="skill-card-header">
                                <div className="skill-icon-wrapper">
                                    <img
                                        src={skill.icon}
                                        alt={skill.name}
                                        width="26"
                                        height="26"
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                                <span className="skill-card-arrow">↗</span>
                            </div>

                            <div className="skill-card-body">
                                <h3 className="skill-card-name">{skill.name}</h3>
                                <span className="skill-card-level">{skill.level}</span>
                            </div>

                            {/* Segmented Dots Proficiency Indicator */}
                            <div className="skill-dots-meter" title={`Proficiency: ${skill.dots}/5`}>
                                {[1, 2, 3, 4, 5].map((dot) => (
                                    <span
                                        key={dot}
                                        className={`meter-dot ${dot <= skill.dots ? 'filled' : ''}`}
                                    ></span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
