import React, { useState } from 'react';

const skillCategories = [
    {
        id: 'languages',
        label: 'Languages',
        skills: [
            { name: 'Python', level: 'Proficient', color: '#3572A5' },
            { name: 'C / C++', level: 'Intermediate', color: '#f34b7d' },
            { name: 'Java', level: 'Intermediate', color: '#b07219' },
            { name: 'JavaScript', level: 'Proficient', color: '#f1e05a' }
        ]
    },
    {
        id: 'cyber',
        label: 'Cybersecurity & Networking',
        skills: [
            { name: 'Network Traffic Analysis (Wireshark)', level: 'Proficient', color: '#1679A7' },
            { name: 'Penetration Testing', level: 'Intermediate', color: '#EF3F34' },
            { name: 'Cyber Crime Investigation', level: 'Proficient', color: '#002D62' },
            { name: 'TCP/IP & Routing Protocols', level: 'Proficient', color: '#008080' },
            { name: 'Linux Security Auditing', level: 'Intermediate', color: '#fc6d26' },
            { name: 'Vulnerability Assessment', level: 'Intermediate', color: '#FFA500' },
            { name: 'Digital Forensics', level: 'Intermediate', color: '#8B0000' }
        ]
    },
    {
        id: 'web',
        label: 'Frontend & Web',
        skills: [
            { name: 'HTML5', level: 'Expert', color: '#e34c26' },
            { name: 'CSS3', level: 'Expert', color: '#563d7c' },
            { name: 'React', level: 'Intermediate', color: '#61dafb' },
            { name: 'TailwindCSS', level: 'Intermediate', color: '#38bdf8' },
            { name: 'Express.js', level: 'Basic', color: '#404d59' }
        ]
    },
    {
        id: 'cloud',
        label: 'Cloud & DB',
        skills: [
            { name: 'AWS', level: 'Basic', color: '#ff9900' },
            { name: 'Google Cloud', level: 'Basic', color: '#4285f4' },
            { name: 'Firebase', level: 'Intermediate', color: '#039be5' },
            { name: 'MongoDB', level: 'Intermediate', color: '#4ea94b' },
            { name: 'MySQL', level: 'Intermediate', color: '#4479a1' }
        ]
    },
    {
        id: 'tools',
        label: 'Tools & Design',
        skills: [
            { name: 'Git & GitHub', level: 'Advanced', color: '#f05033' },
            { name: 'Linux Basics', level: 'Intermediate', color: '#fc6d26' },
            { name: 'Windows Terminal', level: 'Proficient', color: '#4d4d4d' },
            { name: 'Arduino Hardware', level: 'Basic', color: '#00979d' },
            { name: 'Blender 3D', level: 'Intermediate', color: '#f5792a' },
            { name: 'Adobe Suite', level: 'Intermediate', color: '#ff0000' }
        ]
    }
];

export default function Skills() {
    const [activeTab, setActiveTab] = useState('languages');

    return (
        <>
            <div className="section-header">
                <h2 className="section-title">Technical Skills</h2>
                <div className="section-divider"></div>
            </div>

            {/* Tabbed Skill Categories */}
            <div className="skills-tabs">
                {skillCategories.map((category) => (
                    <button
                        key={category.id}
                        className={`tab-btn ${activeTab === category.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(category.id)}
                    >
                        {category.label}
                    </button>
                ))}
            </div>

            <div className="skills-content">
                {skillCategories.map((category) => (
                    <div
                        key={category.id}
                        className={`skills-grid ${activeTab === category.id ? 'active' : ''}`}
                        id={`skills${category.id.charAt(0).toUpperCase() + category.id.slice(1)}`}
                    >
                        {category.skills.map((skill, index) => (
                            <div
                                key={index}
                                className="skill-pill"
                                style={{ '--brand-color': skill.color }}
                            >
                                <span className="skill-name">{skill.name}</span>
                                <span className="skill-level">{skill.level}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}
