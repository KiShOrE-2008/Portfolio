import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import ScrollSection from './components/ScrollSection';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LightboxModal from './components/LightboxModal';

export default function App() {
    const [activeSection, setActiveSection] = useState('hero');
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const glowRef1 = useRef(null);

    // Mouse Glow Follower effect
    useEffect(() => {
        if (!window.matchMedia('(hover: hover)').matches) return;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const glow = glowRef1.current;
            if (glow) {
                glow.style.transform = `translate3d(${clientX - window.innerWidth / 2}px, ${clientY - window.innerHeight / 2}px, 0)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Active Section Scroll Spy
    useEffect(() => {
        const handleScroll = () => {
            const sectionsList = ['hero', 'about', 'education', 'experience', 'skills', 'certifications', 'projects', 'contact'];
            let current = 'hero';

            for (const sectionId of sectionsList) {
                const el = document.getElementById(sectionId);
                if (el) {
                    const sectionTop = el.offsetTop;
                    // Trigger activation 250px before passing the section top
                    if (window.scrollY >= (sectionTop - 250)) {
                        current = sectionId;
                    }
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        // Execute immediately to set initial position
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
        <div className="app-container">
            {/* Background elements */}
            <div className="background-animation"></div>
            <div className="radial-glow glow-1" id="radialGlow1" ref={glowRef1}></div>
            <div className="radial-glow glow-2" id="radialGlow2"></div>

            {/* Navigation Header */}
            <Navbar activeSection={activeSection} />

            {/* Main Sections */}
            <main>
                <ScrollSection id="hero" className="hero-section">
                    <Hero />
                </ScrollSection>

                <ScrollSection id="about" className="about-section">
                    <About />
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

                <ScrollSection id="contact" className="contact-section">
                    <Contact />
                </ScrollSection>
            </main>

            {/* Footer */}
            <Footer />

            {/* Image Modal Lightbox Carousel */}
            <LightboxModal 
                isOpen={isLightboxOpen} 
                onClose={handleCloseLightbox} 
                currentImgIndex={currentImgIndex}
                setCurrentImgIndex={setCurrentImgIndex}
            />
        </div>
    );
}
