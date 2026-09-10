import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TiltCard from './TiltCard';

gsap.registerPlugin(ScrollTrigger);

export const apcsipExperienceData = {
    id: 'apcsip-2026',
    role: 'Cyber Security Student Intern',
    organization: 'Amroha Police · Uttar Pradesh Police · Shri Venkateshwara University, Gajraula',
    program: 'APCSIP-2026',
    programBadge: 'LAW ENFORCEMENT & INVESTIGATION INTERNSHIP',
    companySub: 'Amroha Police Cyber Security Internship Program (APCSIP-2026)',
    period: 'June 2026',
    location: 'Moradabad, India',
    shortDesc: 'Completed APCSIP-2026, gaining practical exposure to cybersecurity, cybercrime investigation, OSINT, digital forensics, malware analysis, threat intelligence, and cyber law.',
    fullSummary: 'Participated in the Amroha Police Cyber Security Internship Program (APCSIP-2026), a cybersecurity-focused program designed to provide students with practical exposure to cybercrime investigation, digital forensics, cyber law, threat intelligence, and digital safety.',
    hasGallery: true,
    galleryCount: 7,
    tags: [
        'Cybersecurity',
        'Digital Forensics',
        'OSINT',
        'Threat Intelligence',
        'Cyber Law'
    ],
    whatILearned: [
        {
            title: '🔎 OSINT & Cyber Intelligence',
            bullets: [
                'Open Source Intelligence (OSINT) methodologies',
                'Google Dorking and advanced search operators',
                'Reverse image search and digital footprint analysis',
                'HUMINT, SIGINT and threat profiling',
                'Cyber Threat Intelligence and MITRE ATT&CK'
            ]
        },
        {
            title: '🕵️ Digital & Mobile Forensics',
            bullets: [
                'Digital evidence handling and integrity',
                'Forensic imaging concepts including AD1 and E01',
                'Hashing and evidence verification',
                'Mobile forensic investigation workflows',
                'Exposure to tools including FTK, Oxygen Forensics, Magnet Axiom, Belkasoft, and Intella'
            ]
        },
        {
            title: '🦠 Malware & Attack Lifecycle',
            bullets: [
                'Android malware investigation',
                'Command & Control (C2) infrastructure',
                'Dropper applications and Malware-as-a-Service',
                'Indicators of Compromise (IoCs)',
                'Post-exploitation concepts, privilege escalation and persistence'
            ]
        },
        {
            title: '⚖️ Cyber Law & Compliance',
            bullets: [
                'Indian cyber law and ethical hacking boundaries',
                'IT Act and cybercrime regulations',
                'Digital Personal Data Protection Act (DPDPA), 2023',
                'GDPR fundamentals',
                'Cybersecurity compliance and incident response'
            ]
        },
        {
            title: '🤖 Emerging Technology Security',
            bullets: [
                'AI/ML and Generative AI in cybersecurity',
                'Deepfakes and misinformation',
                'Blockchain and smart-contract security',
                'Web3 security risks',
                'AI-powered cyber attacks and emerging threats'
            ]
        },
        {
            title: '🚨 Cybercrime & Fraud Investigation',
            bullets: [
                'Cybercrime reporting ecosystem',
                'I4C and National Cyber Crime Reporting Portal (NCRP)',
                'Financial and banking fraud investigation',
                'OTP, UPI and digital-payment scams',
                'Mule-account identification',
                'SIM-swap/eSIM fraud awareness',
                'Ransomware mitigation and digital safety'
            ]
        }
    ],
    keyTakeaway: 'This internship helped me understand cybersecurity beyond just tools and vulnerabilities — including cybercrime investigation, digital evidence, human behaviour, legal frameworks, threat intelligence, and emerging security risks.',
    skillsDeveloped: [
        'Cybersecurity',
        'Digital Forensics',
        'OSINT',
        'Threat Intelligence',
        'Malware Analysis',
        'Cyber Law',
        'Network Security',
        'Incident Response',
        'MITRE ATT&CK',
        'Blockchain Security',
        'AI Security'
    ],
    credential: {
        title: 'APCSIP-2026 Certificate of Completion',
        issuer: 'Amroha Police (Uttar Pradesh Police)',
        issueDate: 'June 2026',
        credentialId: 'APCSIP/2026/472',
        imageSrc: '/images/apcsip_certificate.png'
    }
};

export const eduSkillsExperienceData = {
    id: 'eduskills-ethical-hacking',
    role: 'Ethical Hacking Intern',
    organization: 'EduSkills Academy',
    program: 'AICTE–EduSkills Virtual Internship',
    programBadge: 'AICTE–EDUSKILLS VIRTUAL INTERNSHIP',
    companySub: 'AICTE–EduSkills Virtual Internship · 10 Weeks',
    period: 'Jan 2026 – Mar 2026',
    location: 'Remote',
    shortDesc: 'Completed a 10-week virtual internship in Ethical Hacking, gaining practical exposure to cybersecurity fundamentals, networking, Kali Linux, vulnerability assessment, and web application penetration testing.',
    fullSummary: 'Completed a structured 10-week internship focused on the fundamentals and practical applications of ethical hacking and cybersecurity.',
    tags: [
        'Ethical Hacking',
        'Cybersecurity',
        'Kali Linux',
        'Web Security',
        'Penetration Testing'
    ],
    whatILearned: [
        {
            title: 'Ethical Hacking Fundamentals',
            desc: 'Understanding ethical hacking concepts, methodologies, legal considerations, and security testing.'
        },
        {
            title: 'Cybersecurity & Human Security',
            desc: 'Studied security principles, threat types, social engineering, phishing, impersonation, and human-related security risks.'
        },
        {
            title: 'Malware',
            desc: 'Learned about different malware types, their behavior, impact, identification, and mitigation.'
        },
        {
            title: 'Networking & Secure Communication',
            desc: 'Covered networking fundamentals, protocols, IP addressing, device configuration, and secure communication concepts.'
        },
        {
            title: 'Kali Linux',
            desc: 'Worked with Kali Linux and its security-testing tools as part of practical cybersecurity exercises.'
        },
        {
            title: 'Web Application Security',
            desc: 'Performed basic vulnerability assessment and learned the fundamentals of web application penetration testing.'
        },
        {
            title: 'Capstone Project',
            desc: 'Applied the concepts learned throughout the internship in a cybersecurity-focused capstone project.'
        }
    ],
    structureTitle: '10-week structured program',
    structure: [
        'Weekly learning modules',
        'Weekly assessments',
        'Practical assignments',
        'Project documentation',
        'Capstone project',
        'Final assessment'
    ],
    skillsDeveloped: [
        'Ethical Hacking',
        'Cybersecurity',
        'Kali Linux',
        'Network Security',
        'Vulnerability Assessment',
        'Web Application Security',
        'Penetration Testing',
        'Social Engineering',
        'Malware',
        'Secure Communication'
    ],
    credential: {
        title: 'Ethical Hacking Internship Credential',
        issuer: 'EduSkills Academy',
        issueDate: 'March 30, 2026',
        credentialId: '2026-2986DE35C8',
        imageSrc: '/images/eduskills_certificate.png'
    }
};

export default function Experience({ onOpenLightbox, onSelectExperience }) {
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
                stagger: 0.2,
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
                <span className="section-technical-tag">04 // EXPERIENCE</span>
                <span className="section-eyebrow">CAREER & PRACTICAL EXPERIENCE</span>
                <h2 className="section-title">
                    Work Experience & <span className="gradient-text">Internships</span>
                </h2>
                <div className="section-divider"></div>
            </div>

            <div className="timeline-spine-wrapper">
                {/* Glowing Vertical Line Spine */}
                <div className="timeline-spine-line"></div>

                {/* EduSkills Ethical Hacking Internship Node */}
                <div className="timeline-node-item">
                    <div className="timeline-spine-node">
                        <span className="node-glow-ring"></span>
                    </div>

                    <TiltCard
                        className="timeline-node-card glass-panel clickable-card"
                        onClick={() => onSelectExperience && onSelectExperience(eduSkillsExperienceData)}
                    >
                        <div className="node-header">
                            <span className="node-period">Jan 2026 – Mar 2026</span>
                            <span className="node-badge detailed-badge">✨ Click for Detailed View & Credentials</span>
                            <span className="node-location">Remote</span>
                        </div>

                        <h3 className="node-role">Ethical Hacking Intern</h3>
                        <div className="node-company">EduSkills Academy</div>
                        
                        <p className="node-program-title">AICTE–EduSkills Virtual Internship</p>

                        <p className="node-short-desc">
                            Completed a 10-week virtual internship in Ethical Hacking, gaining practical exposure to cybersecurity fundamentals, networking, Kali Linux, vulnerability assessment, and web application penetration testing.
                        </p>

                        <div className="node-tags-row">
                            <span className="exp-tag">Ethical Hacking</span>
                            <span className="exp-tag">Cybersecurity</span>
                            <span className="exp-tag">Kali Linux</span>
                            <span className="exp-tag">Web Security</span>
                            <span className="exp-tag">Penetration Testing</span>
                        </div>
                    </TiltCard>
                </div>

                {/* UP Police / APCSIP-2026 Internship Node */}
                <div className="timeline-node-item">
                    <div className="timeline-spine-node">
                        <span className="node-glow-ring"></span>
                    </div>

                    <TiltCard
                        className="timeline-node-card glass-panel clickable-card"
                        onClick={() => onSelectExperience && onSelectExperience(apcsipExperienceData)}
                    >
                        <div className="node-header">
                            <span className="node-period">June 2026</span>
                            <span className="node-badge detailed-badge">✨ Click for Detailed View & 7-Photo Gallery</span>
                            <span className="node-location">Moradabad, India</span>
                        </div>

                        <h3 className="node-role">Cyber Security Student Intern</h3>
                        <div className="node-program-prominent">
                            Amroha Police Cyber Security Internship Program <strong>(APCSIP-2026)</strong>
                        </div>
                        <div className="node-company-sub">
                            Amroha Police · Uttar Pradesh Police · Shri Venkateshwara University
                        </div>

                        <p className="node-short-desc">
                            Completed APCSIP-2026, gaining practical exposure to cybersecurity, cybercrime investigation, OSINT, digital forensics, malware analysis, threat intelligence, and cyber law.
                        </p>

                        <div className="node-tags-row">
                            <span className="exp-tag">Cybersecurity</span>
                            <span className="exp-tag">Digital Forensics</span>
                            <span className="exp-tag">OSINT</span>
                            <span className="exp-tag">Threat Intelligence</span>
                            <span className="exp-tag">Cyber Law</span>
                        </div>
                    </TiltCard>
                </div>
            </div>
        </div>
    );
}
