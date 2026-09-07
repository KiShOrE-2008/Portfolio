import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TiltCard from './TiltCard';

gsap.registerPlugin(ScrollTrigger);

const textArray = [
    "B.Tech Information Technology Student",
    "Cybersecurity Enthusiast",
    "Networking & Traffic Analyst",
    "Smart IoT System builder"
];

export default function Hero() {
    const heroRef = useRef(null);
    const [typedText, setTypedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(100);

    // GSAP Entrance Sequence & Scroll Parallax Exit
    useGSAP(() => {
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReducedMotion) return;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

        tl.fromTo('.hero-badge', 
            { y: -15, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.6 }
        )
        .fromTo('.hero-title', 
            { y: 35, opacity: 0, clipPath: 'inset(0 0 100% 0)' }, 
            { y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.8 },
            '-=0.4'
        )
        .fromTo(['.hero-subtitle', '.hero-description'], 
            { y: 25, opacity: 0 }, 
            { y: 0, opacity: 1, stagger: 0.15, duration: 0.7 },
            '-=0.4'
        )
        .fromTo('.hero-ctas .btn', 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, stagger: 0.12, duration: 0.6 },
            '-=0.3'
        )
        .fromTo('.hero-socials .social-icon-btn', 
            { scale: 0.8, opacity: 0 }, 
            { scale: 1, opacity: 1, stagger: 0.08, duration: 0.5 },
            '-=0.3'
        )
        .fromTo('.hero-visual-wrapper', 
            { y: 40, scale: 0.92, opacity: 0 }, 
            { y: 0, scale: 1, opacity: 1, duration: 0.9 },
            '-=0.8'
        );

        // ScrollTrigger Parallax & Exit
        gsap.to('.hero-content', {
            yPercent: -15,
            opacity: 0.35,
            scale: 0.97,
            ease: 'none',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom 20%',
                scrub: true
            }
        });

        gsap.to('.hero-visual-wrapper', {
            yPercent: -25,
            opacity: 0.3,
            scale: 0.95,
            ease: 'none',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom 20%',
                scrub: true
            }
        });
    }, { scope: heroRef });

    useEffect(() => {
        let timer;
        const currentString = textArray[loopNum % textArray.length];

        const handleTyping = () => {
            if (!isDeleting) {
                setTypedText(currentString.substring(0, typedText.length + 1));
                if (typedText === currentString) {
                    timer = setTimeout(() => setIsDeleting(true), 2000);
                    return;
                }
                setTypingSpeed(100);
            } else {
                setTypedText(currentString.substring(0, typedText.length - 1));
                if (typedText === '') {
                    setIsDeleting(false);
                    setLoopNum((prev) => prev + 1);
                    setTypingSpeed(500); // Pause before starting typing next word
                    return;
                }
                setTypingSpeed(50);
            }
        };

        timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [typedText, isDeleting, loopNum, typingSpeed]);

    return (
        <div ref={heroRef} className="hero-container-inner" style={{ width: '100%', display: 'contents' }}>
            <div className="hero-content">
                <div className="badge hero-badge">Welcome to my Space</div>
                <h1 className="hero-title">
                    Hi, I'm <span className="gradient-text">Kishore K V</span>
                </h1>
                <div className="hero-subtitle">
                    <span>{typedText}</span><span className="cursor">|</span>
                </div>
                <p className="hero-description">
                    A B.Tech Information Technology student at Chennai Institute of Technology. I specialize in building
                    secure software, exploring cybersecurity paradigms, and analyzing network architectures.
                </p>
                <div className="hero-ctas">
                    <a href="#projects" className="btn btn-primary" id="heroBtnWork">Explore Work</a>
                    <a href="#contact" className="btn btn-secondary" id="heroBtnContact">Get in Touch</a>
                </div>
                
                {/* Mini Social Ribbon */}
                <div className="hero-socials">
                    <a href="https://github.com/KiShOrE-2008" target="_blank" rel="noopener noreferrer"
                        className="social-icon-btn" id="heroSocialGithub" title="GitHub">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/kishore-k-v-090491349/" target="_blank"
                        rel="noopener noreferrer" className="social-icon-btn" id="heroSocialLinkedin" title="LinkedIn">
                        <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/linkedin.webp" alt="LinkedIn" width="22" height="22" style={{ objectFit: 'contain' }} />
                    </a>
                    <a href="https://leetcode.com/u/Kishore2008/" target="_blank" rel="noopener noreferrer"
                        className="social-icon-btn" id="heroSocialLeetcode" title="LeetCode">
                        <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/leetcode-dark.webp" alt="LeetCode" width="22" height="22" style={{ objectFit: 'contain' }} />
                    </a>
                    <a href="https://codolio.com/profile/Kishore2008" target="_blank" rel="noopener noreferrer"
                        className="social-icon-btn" id="heroSocialCodolio" title="Codolio">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                    </a>
                    <a href="https://www.skillrack.com/faces/resume.xhtml?id=553019&key=Kishore_k_v-2008"
                        target="_blank" rel="noopener noreferrer" className="social-icon-btn" id="heroSocialSkillrack"
                        title="SkillRack">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                    </a>
                </div>
            </div>
            
            {/* Glassmorphic floating profile visual element */}
            <div className="hero-visual-wrapper">
                <TiltCard className="hero-visual-card tilt-card" id="heroVisualCard">
                    <div className="visual-card-glow"></div>
                    <div className="avatar-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                strokeLinejoin="round" />
                            <path d="M20.59 22C20.59 18.13 16.746 15 12 15C7.254 15 3.41 18.13 3.41 22"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h3 className="visual-card-title">Kishore K V</h3>
                    <p className="visual-card-tag">IT Student & Developer</p>
                    <div className="visual-card-meta">
                        <div className="meta-item">
                            <span className="meta-label">Focus</span>
                            <span className="meta-value">Cybersecurity</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Location</span>
                            <span className="meta-value">Chennai, India</span>
                        </div>
                    </div>
                </TiltCard>
            </div>
        </div>
    );
}
