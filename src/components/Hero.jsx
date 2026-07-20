import React, { useState, useEffect } from 'react';
import TiltCard from './TiltCard';

const textArray = [
    "B.Tech Information Technology Student",
    "Cybersecurity Enthusiast",
    "Networking & Traffic Analyst",
    "Smart IoT System builder"
];

export default function Hero() {
    const [typedText, setTypedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(100);

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
        <>
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
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path
                                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                            </path>
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/kishore-k-v-090491349/" target="_blank"
                        rel="noopener noreferrer" className="social-icon-btn" id="heroSocialLinkedin" title="LinkedIn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z">
                            </path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                    </a>
                    <a href="https://leetcode.com/u/Kishore2008/" target="_blank" rel="noopener noreferrer"
                        className="social-icon-btn" id="heroSocialLeetcode" title="LeetCode">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                    </a>
                    <a href="https://codolio.com/profile/Kishore2008" target="_blank" rel="noopener noreferrer"
                        className="social-icon-btn" id="heroSocialCodolio" title="Codolio">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                    </a>
                    <a href="https://www.skillrack.com/faces/resume.xhtml?id=553019&key=Kishore_k_v-2008"
                        target="_blank" rel="noopener noreferrer" className="social-icon-btn" id="heroSocialSkillrack"
                        title="SkillRack">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
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
        </>
    );
}
