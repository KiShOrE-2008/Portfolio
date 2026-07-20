import React, { useState, useEffect } from 'react';

export default function Navbar({ activeSection }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Toggle body scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isMenuOpen]);

    // Close menu when clicking outside (mobile layout)
    useEffect(() => {
        const handleOutsideClick = (e) => {
            const navMenu = document.getElementById('navMenu');
            const menuToggle = document.getElementById('menuToggle');
            if (isMenuOpen && navMenu && menuToggle && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, [isMenuOpen]);

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    const navLinks = [
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'education', label: 'Education' },
        { id: 'experience', label: 'Experience' },
        { id: 'skills', label: 'Skills' },
        { id: 'certifications', label: 'Certifications' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <header className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="mainNavbar">
            <div className="nav-container">
                <a href="#hero" className="nav-logo" id="navLogo" onClick={handleLinkClick}>
                    <span className="logo-symbol">&lt;</span>Kishore<span className="logo-accent">.kv</span><span className="logo-symbol">/&gt;</span>
                </a>
                
                <button 
                    className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} 
                    id="menuToggle" 
                    aria-label="Toggle Navigation Menu"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                
                <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`} id="navMenu">
                    {navLinks.map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                            id={`link${link.id.charAt(0).toUpperCase() + link.id.slice(1)}`}
                            onClick={handleLinkClick}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
}
