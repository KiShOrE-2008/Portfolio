import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef(null);

    useGSAP(() => {
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReducedMotion) return;

        gsap.fromTo('.footer-grid',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: footerRef.current.querySelector('.footer-grid'),
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.footer-bottom',
            { y: 15, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: footerRef.current.querySelector('.footer-bottom'),
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, { scope: footerRef });

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="footer" ref={footerRef}>
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Brand Section */}
                    <div className="footer-brand">
                        <a href="#hero" className="footer-logo">
                            <span className="logo-symbol">&lt;</span>Kishore<span className="logo-accent">.kv</span><span className="logo-symbol">/&gt;</span>
                        </a>
                        <p className="footer-bio">
                            B.Tech Information Technology student specializing in Cybersecurity, Networking, and Software Development. Dedicated to building secure, scalable, and robust digital solutions.
                        </p>
                        <div className="footer-socials">
                            <a href="https://github.com/KiShOrE-2008" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/in/kishore-k-v-090491349/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                                <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/linkedin.webp" alt="LinkedIn" width="20" height="20" style={{ objectFit: 'contain' }} />
                            </a>
                            <a href="mailto:kv.kishorevijay@gmail.com" className="social-icon-btn" aria-label="Email">
                                <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/gmail.webp" alt="Email" width="20" height="20" style={{ objectFit: 'contain' }} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links-col">
                        <h4>Navigation</h4>
                        <ul className="footer-links">
                            <li><a href="#hero">Home</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#education">Education</a></li>
                            <li><a href="#experience">Experience</a></li>
                        </ul>
                    </div>

                    <div className="footer-links-col">
                        <h4>Explore</h4>
                        <ul className="footer-links">
                            <li><a href="#skills">Skills</a></li>
                            <li><a href="#certifications">Certifications</a></li>
                            <li><a href="#projects">Projects</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact details & Action */}
                    <div className="footer-contact-info">
                        <h4>Get In Touch</h4>
                        <div className="footer-contact-details">
                            <p>📍 Chennai, Tamil Nadu, India</p>
                            <p><img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/gmail.webp" alt="Gmail" width="16" height="16" style={{ objectFit: 'contain', verticalAlign: 'middle', marginRight: '6px' }} /> <a href="mailto:kv.kishorevijay@gmail.com">kv.kishorevijay@gmail.com</a></p>
                        </div>
                        <button className="back-to-top-btn" onClick={handleScrollToTop} aria-label="Scroll to top">
                            Back to Top ↑
                        </button>
                    </div>
                </div>

                <div className="footer-divider"></div>

                <div className="footer-bottom">
                    <p className="copyright">&copy; {new Date().getFullYear()} Kishore K V. All rights reserved.</p>
                    <p className="footer-tech">Designed & Engineered with ❤️ and secure code principles.</p>
                </div>
            </div>
        </footer>
    );
}

