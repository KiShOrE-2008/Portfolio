import React from 'react';
import TiltCard from './TiltCard';

const certsData = [
    {
        icon: '🐍',
        authority: 'Cisco Networking Academy',
        date: 'May 2026',
        title: 'Python Essentials 2',
        desc: 'Advanced object-oriented programming in Python, modules, packages, exception handling, string operations, and file I/O.',
        skills: ['Python', 'OOP'],
        verifyId: 'ID: 2a682...fdc2',
        verifyUrl: 'https://www.skillrack.com/cert/608096/FYR'
    },
    {
        icon: '🛡️',
        authority: 'Forage / Mastercard',
        date: 'May 2026',
        title: 'Cybersecurity Job Simulation',
        desc: 'Completed simulated tasks on security awareness, cryptography application, phishing analysis, and threat identification.',
        skills: ['Cybersecurity'],
        verifyId: 'ID: 2Edu7...8CiX',
        verifyUrl: 'https://www.skillrack.com/faces/resume.xhtml?id=553019&key=Kishore_k_v-2008'
    },
    {
        icon: '🎯',
        authority: 'HackerRank',
        date: 'Feb 2026',
        title: 'Python (Basic)',
        desc: 'Validated foundational knowledge of Python programming, including data structures, functional concepts, and basic algorithms.',
        skills: ['Python'],
        verifyId: 'Verified Credential',
        verifyUrl: 'https://www.skillrack.com/faces/resume.xhtml?id=553019&key=Kishore_k_v-2008'
    },
    {
        icon: '💻',
        authority: 'Hack & Fix',
        date: 'Jan 2026',
        title: 'Cybersecurity Career Starter (CCSC)',
        desc: 'Comprehensive training in security configurations, network auditing, cybersecurity fundamentals, and industry-standard security tools.',
        skills: ['Cybersecurity'],
        verifyId: 'Verified Credential',
        verifyUrl: 'https://www.skillrack.com/faces/resume.xhtml?id=553019&key=Kishore_k_v-2008'
    },
    {
        icon: '🔒',
        authority: 'Cisco',
        date: 'Dec 2025',
        title: 'Introduction to Cybersecurity',
        desc: 'Explored network security principles, threat mitigation, data privacy, and foundational security concepts across global communication networks.',
        skills: ['Cybersecurity'],
        verifyId: 'Verified Credential',
        verifyUrl: 'https://www.skillrack.com/faces/resume.xhtml?id=553019&key=Kishore_k_v-2008'
    },
    {
        icon: '⚙️',
        authority: 'Cisco',
        date: 'Jul 2025',
        title: 'Python Essentials 1',
        desc: 'Foundational programming basics in Python, covering variable operations, flow controls, loops, and custom functions.',
        skills: ['Python'],
        verifyId: 'Verified Credential',
        verifyUrl: 'https://www.skillrack.com/cert/608000/XYD'
    },
    {
        icon: '🎓',
        authority: 'IIT Madras',
        date: 'Oct 2024',
        title: 'Artificial Intelligence & Data Science',
        desc: 'Completed an 8-week certification course covering core algorithms in data processing, supervised learning, and AI application paradigms.',
        skills: ['Data Science', 'AI'],
        verifyId: 'Participation Cert',
        verifyUrl: 'https://www.skillrack.com/faces/resume.xhtml?id=553019&key=Kishore_k_v-2008'
    }
];

export default function Certifications() {
    return (
        <>
            <div className="section-header">
                <h2 className="section-title">Licenses & Certifications</h2>
                <div className="section-divider"></div>
            </div>

            <div className="certs-grid">
                {certsData.map((cert, index) => (
                    <article key={index} className="cert-card-wrapper">
                        <TiltCard className="cert-card tilt-card">
                            <div className="cert-header">
                                <div className="cert-brand">
                                    <span className="cert-icon">{cert.icon}</span>
                                    <span className="cert-authority">{cert.authority}</span>
                                </div>
                                <span className="cert-date">{cert.date}</span>
                            </div>
                            <h3 className="cert-title">{cert.title}</h3>
                            <p className="cert-desc">{cert.desc}</p>
                            <div className="cert-skills">
                                {cert.skills.map((skill, sIdx) => (
                                    <span key={sIdx} className="tag">{skill}</span>
                                ))}
                            </div>
                            <div className="cert-footer">
                                <span className={cert.verifyId.includes('ID:') ? 'cert-id' : 'cert-status'}>
                                    {cert.verifyId}
                                </span>
                                <a 
                                    href={cert.verifyUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="cert-link"
                                >
                                    Verify
                                </a>
                            </div>
                        </TiltCard>
                    </article>
                ))}
            </div>
        </>
    );
}
