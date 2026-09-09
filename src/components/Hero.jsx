import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import LanyardCard from './LanyardCard';

gsap.registerPlugin(ScrollTrigger);

const textArray = [
    "B.Tech Information Technology Student",
    "Cybersecurity Enthusiast",
    "Networking & Traffic Analyst",
    "Smart IoT System Builder"
];

export default function Hero({ onOpenResume }) {
    const heroRef = useRef(null);
    const [typedText, setTypedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(100);

    useGSAP(() => {
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReducedMotion) return;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

        tl.fromTo('.availability-pill', 
            { y: -15, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.6 }
        )
        .fromTo('.hero-title-main', 
            { y: 35, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8 },
            '-=0.4'
        )
        .fromTo(['.hero-subtitle', '.hero-description'], 
            { y: 25, opacity: 0 }, 
            { y: 0, opacity: 1, stagger: 0.15, duration: 0.7 },
            '-=0.4'
        )
        .fromTo('.hero-ctas-row .btn', 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, stagger: 0.12, duration: 0.6 },
            '-=0.3'
        )
        .fromTo('.hero-social-ribbon .social-icon-btn', 
            { scale: 0.8, opacity: 0 }, 
            { scale: 1, opacity: 1, stagger: 0.08, duration: 0.5 },
            '-=0.3'
        )
        .fromTo('.hero-lanyard-col', 
            { y: 40, scale: 0.92, opacity: 0 }, 
            { y: 0, scale: 1, opacity: 1, duration: 0.9 },
            '-=0.8'
        );

        // ScrollTrigger Parallax (y-axis movement only, avoiding opacity locks)
        gsap.to('.hero-left-col', {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        gsap.to('.hero-lanyard-col', {
            yPercent: -15,
            ease: 'none',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
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
                    setTypingSpeed(400);
                    return;
                }
                setTypingSpeed(50);
            }
        };

        timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [typedText, isDeleting, loopNum, typingSpeed]);

    return (
        <section ref={heroRef} className="hero-section-grid">
            {/* Left Content Column */}
            <div className="hero-left-col">
                <div className="availability-pill glass-panel">
                    <span className="pulse-green-dot"></span>
                    <span>Available for Security Audits & Software Dev</span>
                </div>

                <h1 className="hero-title-main">
                    Hi, I'm <br />
                    <span className="gradient-title-text">Kishore K V</span>
                </h1>

                <div className="hero-subtitle">
                    <span>{typedText}</span>
                    <span className="cursor-blink">|</span>
                </div>

                <p className="hero-description">
                    A B.Tech Information Technology student at Chennai Institute of Technology specializing in Cybersecurity, Networking, and Software Development. Dedicated to building secure, scalable, and robust digital solutions.
                </p>

                {/* Primary & Secondary Action CTAs */}
                <div className="hero-ctas-row">
                    <a href="#projects" className="btn btn-gradient-glow" id="heroBtnWork">
                        View Work <span className="btn-arrow">→</span>
                    </a>
                    <button 
                        type="button"
                        onClick={onOpenResume}
                        className="btn btn-glass-outline btn-resume-glow" 
                        id="heroBtnResume"
                        title="View / Download Resume (PDF) with Secure Telemetry"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        Resume <span className="btn-icon">↗</span>
                    </button>
                    <a href="https://github.com/KiShOrE-2008" target="_blank" rel="noopener noreferrer" className="btn btn-glass-outline" id="heroBtnGithub">
                        GitHub Profile <span className="btn-icon">↗</span>
                    </a>
                </div>

                {/* Social Icon Ribbon */}
                <div className="hero-social-ribbon">
                    <a href="https://github.com/KiShOrE-2008" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="GitHub">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/kishore-k-v-090491349/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="LinkedIn">
                        <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/linkedin.webp" alt="LinkedIn" width="20" height="20" style={{ objectFit: 'contain' }} />
                    </a>
                    <a href="mailto:kv.kishorevijay@gmail.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Email">
                        <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/gmail.webp" alt="Email" width="20" height="20" style={{ objectFit: 'contain' }} />
                    </a>
                    <a href="https://leetcode.com/u/Kishore2008/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="LeetCode">
                        <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/leetcode-dark.webp" alt="LeetCode" width="20" height="20" className="leetcode-icon-img" style={{ objectFit: 'contain' }} />
                    </a>
                    <a href="https://codolio.com/profile/Kishore2008" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Codolio">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                    </a>
                </div>
            </div>

            {/* Right Interactive Lanyard Badge Column */}
            <div className="hero-lanyard-col">
                <LanyardCard />
            </div>
        </section>
    );
}
