import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import ScrollSection from './components/ScrollSection';
import Hero from './components/Hero';
import TechTicker from './components/TechTicker';
import About from './components/About';
import WhatIDo from './components/WhatIDo';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import CodingActivity from './components/CodingActivity';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingDock from './components/FloatingDock';
import LightboxModal from './components/LightboxModal';
import Preloader from './components/Preloader';
import NetworkBackground from './components/NetworkBackground';

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [theme, setTheme] = useState('dark');
    const [activeSection, setActiveSection] = useState('hero');
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const glowRef1 = useRef(null);

    // Apply theme data attribute to html element
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    // Scroll Progress Indicator Tracker
    useEffect(() => {
        const handleScrollProgress = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const currentProgress = (window.scrollY / totalHeight) * 100;
                setScrollProgress(currentProgress);
            }
        };

        window.addEventListener('scroll', handleScrollProgress);
        handleScrollProgress();
        return () => window.removeEventListener('scroll', handleScrollProgress);
    }, []);

    // Mouse Glow Follower effect
    useEffect(() => {
        if (!window.matchMedia('(hover: hover)').matches) return;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const glow = glowRef1.current;
            if (glow) {
                glow.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Active Section Scroll Spy
    useEffect(() => {
        const handleScroll = () => {
            const sectionsList = ['hero', 'about', 'what-i-do', 'education', 'experience', 'skills', 'certifications', 'projects', 'activity', 'contact'];
            let current = 'hero';

            for (const sectionId of sectionsList) {
                const el = document.getElementById(sectionId);
                if (el) {
                    const sectionTop = el.offsetTop;
                    if (window.scrollY >= (sectionTop - 250)) {
                        current = sectionId;
                    }
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleOpenLightbox = (index) => {
        setCurrentImgIndex(index);
        setIsLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseLightbox = () => {
        setIsLightboxOpen(false);
        document.body.style.overflow = '';
    };

    return (
        <div className={`app-container ${theme}-theme`}>
            {/* Top Scroll Progress Indicator */}
            <div
                className="top-scroll-progress-bar"
                style={{ width: `${scrollProgress}%` }}
                aria-hidden="true"
            ></div>

            {isLoading && (
                <Preloader onComplete={() => setIsLoading(false)} />
            )}

            {/* Background Dotted Grid & Ambient Glows */}
            <div className="dotted-bg-grid"></div>
            <NetworkBackground />
            <div className="radial-glow glow-1" id="radialGlow1" ref={glowRef1}></div>
            <div className="radial-glow glow-2" id="radialGlow2"></div>

            {/* Floating Glass Top Navbar */}
            <Navbar activeSection={activeSection} theme={theme} onToggleTheme={toggleTheme} />

            {/* Main Content Sections */}
            <main>
                <ScrollSection id="hero" className="hero-section">
                    <Hero />
                </ScrollSection>

                {/* Continuous Infinite Tech Marquee Ticker */}
                <TechTicker />

                <ScrollSection id="about" className="about-section">
                    <About />
                </ScrollSection>

                <ScrollSection id="what-i-do" className="services-section">
                    <WhatIDo />
                </ScrollSection>

                <ScrollSection id="education" className="education-section">
                    <Education />
                </ScrollSection>

                <ScrollSection id="experience" className="experience-section">
                    <Experience onOpenLightbox={handleOpenLightbox} />
                </ScrollSection>

                <ScrollSection id="skills" className="skills-section">
                    <Skills />
                </ScrollSection>

                <ScrollSection id="certifications" className="certifications-section">
                    <Certifications />
                </ScrollSection>

                <ScrollSection id="projects" className="projects-section">
                    <Projects />
                </ScrollSection>

                <ScrollSection id="activity" className="activity-section">
                    <CodingActivity />
                </ScrollSection>

                <ScrollSection id="contact" className="contact-section">
                    <Contact />
                </ScrollSection>
            </main>

            {/* Footer */}
            <Footer />

            {/* Floating Navigation Dock */}
            <FloatingDock activeSection={activeSection} />

            {/* Lightbox Modal */}
            <LightboxModal 
                isOpen={isLightboxOpen} 
                onClose={handleCloseLightbox} 
                currentImgIndex={currentImgIndex}
                setCurrentImgIndex={setCurrentImgIndex}
            />
        </div>
    );
}
