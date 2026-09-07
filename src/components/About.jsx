import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TiltCard from './TiltCard';

gsap.registerPlugin(ScrollTrigger);

function AnimatedStat({ value, label, suffix = "+" }) {
    const [count, setCount] = useState(0);
    const statRef = useRef(null);

    useEffect(() => {
        let start = 0;
        const end = parseInt(value, 10);
        if (isNaN(end)) return;
        if (start === end) {
            setCount(end);
            return;
        }

        // Total animation duration: 1200ms
        const totalDuration = 1200;
        const steps = Math.min(end, 60); // Maximum 60 ticks to keep it smooth
        const stepTime = Math.floor(totalDuration / steps);
        const increment = Math.ceil(end / steps);

        let timer;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                timer = setInterval(() => {
                    start += increment;
                    if (start >= end) {
                        setCount(end);
                        clearInterval(timer);
                    } else {
                        setCount(start);
                    }
                }, stepTime);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        const currentRef = statRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            clearInterval(timer);
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [value]);

    return (
        <TiltCard ref={statRef} className="stat-card tilt-card">
            <div className="stat-num">{count}{suffix}</div>
            <div className="stat-label">{label}</div>
        </TiltCard>
    );
}

export default function About() {
    const aboutRef = useRef(null);

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
                    trigger: aboutRef.current.querySelector('.section-header'),
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.text-card',
            { x: -35, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: aboutRef.current.querySelector('.about-grid'),
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.stat-card',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: aboutRef.current.querySelector('.about-stats-container'),
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, { scope: aboutRef });

    return (
        <div ref={aboutRef} className="about-container-inner" style={{ width: '100%' }}>
            <div className="section-header">
                <h2 className="section-title">About Me</h2>
                <div className="section-divider"></div>
            </div>

            <div className="about-grid">
                <div className="about-card text-card">
                    <h3>My Journey & Philosophy</h3>
                    <p>
                        I'm currently pursuing a <strong>B.Tech in Information Technology</strong> at <strong>Chennai Institute of
                        Technology</strong>. My curiosity about how digital systems communicate and protect themselves led me
                        down the path of ethical hacking, networking diagnostics, and web software engineering.
                    </p>
                    <p>
                        I believe in building systems that are not only robust and highly interactive, but also
                        intrinsically secure. Whether configuring network parameters, analyzing security credentials, or
                        constructing user-friendly interfaces, I thrive on tackling real-world problems.
                    </p>
                    <div className="about-details-list">
                        <div className="details-item">
                            <span className="details-icon">🎓</span>
                            <div>
                                <strong>Degree & Institution</strong>
                                <p>B.Tech IT, Chennai Institute of Technology</p>
                            </div>
                        </div>
                        <div className="details-item">
                            <span className="details-icon">🎯</span>
                            <div>
                                <strong>Ultimate Goals</strong>
                                <p>Become an expert in security architectures & network research</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-stats-container">
                    <AnimatedStat value="6" label="Coding Projects" />
                    <AnimatedStat value="11" label="GitHub Followers" />
                    <AnimatedStat value="5" label="GitHub Stars" />
                    <AnimatedStat value="250" label="LeetCode Solves" />
                </div>
            </div>
        </div>
    );
}

