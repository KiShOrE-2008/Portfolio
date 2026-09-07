import React, { useState, useEffect } from 'react';

export default function Navbar({ activeSection, theme, onToggleTheme }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => document.body.classList.remove('no-scroll');
    }, [isMenuOpen]);

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className={`floating-navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
            <div className="floating-nav-pill glass-panel">
                {/* Logo Badge */}
                <a href="#hero" className="pill-logo" onClick={handleLinkClick}>
                    <span className="logo-badge">KV</span>
                    <div className="logo-text">
                        <span className="name">Kishore K V</span>
                        <span className="subtext">PORTFOLIO</span>
                    </div>
                </a>

                {/* Center Links */}
                <nav className={`pill-nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <a
                        href="#hero"
                        className={`pill-link ${activeSection === 'hero' ? 'active' : ''}`}
                        onClick={handleLinkClick}
                    >
                        Home
                    </a>
                    <a
                        href="#about"
                        className={`pill-link ${activeSection === 'about' ? 'active' : ''}`}
                        onClick={handleLinkClick}
                    >
                        About
                    </a>
                    <a
                        href="#what-i-do"
                        className={`pill-link ${activeSection === 'what-i-do' ? 'active' : ''}`}
                        onClick={handleLinkClick}
                    >
                        Services
                    </a>
                    <a
                        href="#education"
                        className={`pill-link ${activeSection === 'education' ? 'active' : ''}`}
                        onClick={handleLinkClick}
                    >
                        Education
                    </a>
                    <a
                        href="#experience"
                        className={`pill-link ${activeSection === 'experience' ? 'active' : ''}`}
                        onClick={handleLinkClick}
                    >
                        Experience
                    </a>
                    <a
                        href="#projects"
                        className={`pill-link ${activeSection === 'projects' ? 'active' : ''}`}
                        onClick={handleLinkClick}
                    >
                        Projects
                    </a>
                    <a
                        href="#contact"
                        className={`pill-link ${activeSection === 'contact' ? 'active' : ''}`}
                        onClick={handleLinkClick}
                    >
                        Contact
                    </a>
                </nav>

                {/* Right Actions: Theme Toggle & Mobile Hamburger */}
                <div className="pill-actions">
                    <button
                        className="theme-toggle-btn"
                        onClick={onToggleTheme}
                        aria-label="Toggle Light/Dark Theme"
                        title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>

                    <button
                        className={`mobile-toggle-btn ${isMenuOpen ? 'open' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Mobile Menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </header>
    );
}
