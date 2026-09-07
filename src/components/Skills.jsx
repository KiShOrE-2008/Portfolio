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

// Skill helper mapping with segmented dot levels (1-5) and SVG icons
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
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M11.927 0C6.136 0 6.502 2.505 6.502 2.505l.006 2.593h5.535v.78H4.329S0 5.37 0 11.234c0 5.864 3.754 5.654 3.754 5.654h2.247v-3.155s-.12-3.754 3.694-3.754h5.688s3.454.06 3.454-3.334V3.454S19.467 0 11.927 0zm-3.12 1.83a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zM12.073 24c5.79 0 5.424-2.505 5.424-2.505l-.006-2.593h-5.535v-.78h7.714S24 18.63 24 12.766c0-5.864-3.754-5.654-3.754-5.654h-2.247v3.155s.12 3.754-3.694 3.754h-5.688s-3.454-.06-3.454 3.334v3.312S4.533 24 12.073 24zm3.12-1.83a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z"/>
                    </svg>
                )
            },
            {
                name: 'C / C++',
                level: 'Intermediate',
                dots: 3,
                color: '#659AD2',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M22.38 5.75L12.44.02a.88.88 0 00-.88 0L1.62 5.75a.88.88 0 00-.44.76v11.46c0 .31.17.6.44.76l9.94 5.73c.27.15.61.15.88 0l9.94-5.73c.27-.16.44-.45.44-.76V6.51c0-.31-.17-.6-.44-.76zM12 16.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9z"/>
                    </svg>
                )
            },
            {
                name: 'Java',
                level: 'Intermediate',
                dots: 3,
                color: '#E76F00',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M8.851 18.56s-.917.534.654.714c1.902.217 4.284.148 6.27-.478 0 0 .452.312.802.506-2.585 1.07-6.666.974-9.176.166.714-.407 1.45-.908 1.45-.908zm-1.07-2.617s-1.185.69.45.856c2.115.215 5.594.159 7.747-.565 0 0 .332.327.607.498-2.879 1.152-7.859.974-10.428.093.852-.464 1.624-.882 1.624-.882zM12.01 0S8.93 3.513 11.238 6.945c.81 1.205 1.542 2.457 1.341 4.07-.348 2.806-2.645 4.093-2.645 4.093s2.179-.824 3.013-2.825c.983-2.357.348-4.887-.939-6.685-1.042-1.455-1.579-3.036-.008-5.598z"/>
                    </svg>
                )
            },
            {
                name: 'JavaScript',
                level: 'Proficient',
                dots: 4,
                color: '#F7DF1E',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M3 3h18v18H3V3zm11.5 13.5v-1.8c0-.6.4-1.2 1.2-1.2.6 0 1.2.6 1.2 1.2v.3h1.8v-.4c0-1.7-1.3-3-3-3s-3 1.3-3 3v2c0 1.7 1.3 3 3 3s3-1.3 3-3v-.3h-1.8v.3c0 .6-.6 1.2-1.2 1.2-.8 0-1.2-.6-1.2-1.2zm-6.2.2v-4.5h1.8v4.5c0 .6.4 1 1 1s1-.4 1-1v-4.5h1.8v4.5c0 1.7-1.3 3-3 3s-3-1.3-3-3z"/>
                    </svg>
                )
            },
            {
                name: 'TypeScript',
                level: 'Intermediate',
                dots: 3,
                color: '#3178C6',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm17.363 9.75c.612 0 1.154.037 1.627.111v2.113c-.486-.184-1.026-.276-1.62-.276-.708 0-1.246.166-1.614.498-.368.332-.552.812-.552 1.44 0 .504.137.915.411 1.233.274.318.736.634 1.386.948.87.417 1.517.842 1.94 1.275.423.433.635 1.01.635 1.73 0 1.018-.387 1.83-1.161 2.436-.774.606-1.875.909-3.303.909-.78 0-1.554-.09-2.322-.27v-2.22c.762.294 1.542.441 2.34.441.732 0 1.294-.162 1.686-.486.392-.324.588-.783.588-1.377 0-.528-.152-.945-.456-1.251-.304-.306-.802-.631-1.494-.975-.852-.42-1.481-.84-1.887-1.26-.406-.42-.609-.987-.609-1.701 0-.966.371-1.739 1.113-2.319.742-.58 1.764-.87 3.066-.87zm-7.08 0v2.16H9.006v9.765H6.558V11.91H4.155V9.75h7.253z"/>
                    </svg>
                )
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
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                    </svg>
                )
            },
            {
                name: 'Penetration Testing & Security Auditing',
                level: 'Intermediate',
                dots: 3,
                color: '#EF3F34',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                    </svg>
                )
            },
            {
                name: 'Digital Forensics & Investigation',
                level: 'Proficient',
                dots: 4,
                color: '#008080',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                )
            },
            {
                name: 'TCP/IP & Routing Protocols',
                level: 'Proficient',
                dots: 4,
                color: '#38bdf8',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                    </svg>
                )
            },
            {
                name: 'Linux Security Auditing',
                level: 'Intermediate',
                dots: 3,
                color: '#fc6d26',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                    </svg>
                )
            },
            {
                name: 'Vulnerability Assessment',
                level: 'Intermediate',
                dots: 3,
                color: '#FFA500',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                    </svg>
                )
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
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.625h11.232l.23-2.625H5.43l.696 7.875h9.704l-.364 4.088-3.496.95-3.497-.95-.231-2.588H5.617l.423 4.763L11.97 20.3l5.908-1.637.781-8.913H8.531z"/>
                    </svg>
                )
            },
            {
                name: 'CSS3',
                level: 'Expert',
                dots: 5,
                color: '#264de4',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.625h11.232l.23-2.625H5.43l.696 7.875h9.704l-.364 4.088-3.496.95-3.497-.95-.231-2.588H5.617l.423 4.763L11.97 20.3l5.908-1.637.781-8.913H8.531z"/>
                    </svg>
                )
            },
            {
                name: 'React',
                level: 'Intermediate',
                dots: 3,
                color: '#61dafb',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <circle cx="12" cy="12" r="2.2"/>
                        <g fill="none" stroke="currentColor" strokeWidth="1.2">
                            <ellipse cx="12" cy="12" rx="9" ry="3.5"/>
                            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)"/>
                            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)"/>
                        </g>
                    </svg>
                )
            },
            {
                name: 'Tailwind CSS',
                level: 'Proficient',
                dots: 4,
                color: '#38bdf8',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/>
                    </svg>
                )
            },
            {
                name: 'Node.js & Express.js',
                level: 'Intermediate',
                dots: 3,
                color: '#39d353',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                )
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
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
                    </svg>
                )
            },
            {
                name: 'Google Cloud Platform (GCP)',
                level: 'Basic',
                dots: 2,
                color: '#4285f4',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L18.6 8 12 11.2 5.4 8 12 4.8z"/>
                    </svg>
                )
            },
            {
                name: 'Firebase',
                level: 'Intermediate',
                dots: 3,
                color: '#039be5',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M3.89 15.67L6.8 2.05a.4.4 0 01.76-.07l2.45 4.71L3.89 15.67zm16.27.05L17.5 4.61a.4.4 0 00-.73-.08L14.2 9.42l5.96 6.3zM12 22l8.16-4.48L14.2 9.42 12 22z"/>
                    </svg>
                )
            },
            {
                name: 'MongoDB',
                level: 'Intermediate',
                dots: 3,
                color: '#4ea94b',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-3.31 0-6-2.69-6-6 0-2.97 2.16-5.43 5-5.91V18h2v-9.91c2.84.48 5 2.94 5 5.91 0 3.31-2.69 6-6 6z"/>
                    </svg>
                )
            },
            {
                name: 'MySQL',
                level: 'Proficient',
                dots: 4,
                color: '#00758f',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12 3C6.47 3 2 6.58 2 11c0 2.76 1.77 5.19 4.47 6.61-.17.65-.63 2.37-2.47 3.39 0 0 2.21.05 4.38-1.57C9.4 19.77 10.67 20 12 20c5.53 0 10-3.58 10-8s-4.47-8-10-8z"/>
                    </svg>
                )
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
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                )
            },
            {
                name: 'Linux — Bash & CLI',
                level: 'Proficient',
                dots: 4,
                color: '#fc6d26',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14.5l-4-4 1.41-1.41L11 13.67l6.59-6.59L19 8.5l-8 8.5z"/>
                    </svg>
                )
            },
            {
                name: 'Windows Terminal & PowerShell',
                level: 'Proficient',
                dots: 4,
                color: '#4d4d4d',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M2 4v16h20V4H2zm9 13H5v-2h6v2zm-6-4l4-3-4-3v6z"/>
                    </svg>
                )
            },
            {
                name: 'Cisco Packet Tracer',
                level: 'Intermediate',
                dots: 3,
                color: '#38bdf8', // Cyber networking cyan accent for Cisco Packet Tracer
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zm0 9L2 6v11l10 5 10-5V6l-10 5z"/>
                    </svg>
                )
            },
            {
                name: 'Arduino & IoT Hardware',
                level: 'Intermediate',
                dots: 3,
                color: '#00979d',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                )
            },
            {
                name: 'Blender — 3D Modeling',
                level: 'Intermediate',
                dots: 3,
                color: '#f5792a',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zm0 9L2 6v11l10 5 10-5V6l-10 5z"/>
                    </svg>
                )
            },
            {
                name: 'Canva',
                level: 'Intermediate',
                dots: 3,
                color: '#00c4cc',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 6a6 6 0 1 0 6 6 6.007 6.007 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4.005 4.005 0 0 1-4 4z"/>
                    </svg>
                )
            },
            {
                name: 'Adobe Creative Suite',
                level: 'Intermediate',
                dots: 3,
                color: '#ff0000',
                icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12 2L2 22h7.5l2.25-5.5h4.5L18.5 22H22L12 2zm-1.5 11L12 7.5l1.5 5.5h-3z"/>
                    </svg>
                )
            }
        ]
    }
];

export default function Skills() {
    const skillsRef = useRef(null);
    const [activeTab, setActiveTab] = useState('languages');

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
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.currently-exploring-card',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: skillsRef.current.querySelector('.currently-exploring-container'),
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, { scope: skillsRef, dependencies: [activeTab] });

    return (
        <div ref={skillsRef} className="skills-container-inner" style={{ width: '100%' }}>
            <div className="section-header">
                <h2 className="section-title">Technical Skills</h2>
                <p className="section-subtitle">
                    A practical toolkit spanning software development, cybersecurity, networking & cloud architecture.
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
                                    {skill.icon}
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

            {/* Currently Exploring Showcase Card */}
            <div className="currently-exploring-container">
                <div className="currently-exploring-card">
                    <div className="exploring-header">
                        <span className="exploring-pulse"></span>
                        <span className="exploring-title">CURRENTLY EXPLORING & ADVANCING</span>
                    </div>
                    <div className="exploring-tags">
                        <span className="exploring-tag">◉ Advanced Network Penetration Testing</span>
                        <span className="exploring-tag">◉ Cloud Security & Infrastructure as Code (Terraform)</span>
                        <span className="exploring-tag">◉ Web Application Security — OWASP</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

