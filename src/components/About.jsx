import React, { useEffect, useState, useRef } from 'react';
import TiltCard from './TiltCard';

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
    return (
        <>
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
        </>
    );
}
