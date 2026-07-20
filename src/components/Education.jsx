import React from 'react';
import TiltCard from './TiltCard';

export default function Education() {
    return (
        <section id="education" className="section education-section">
            <div className="section-header">
                <h2 className="section-title">Education</h2>
                <div className="section-divider"></div>
            </div>

            <div className="education-grid">
                {/* CIT B.Tech */}
                <TiltCard className="education-card tilt-card">
                    <div className="edu-header">
                        <div className="edu-icon">🎓</div>
                        <div className="edu-meta">
                            <span className="edu-period">Sep 2025 – May 2029</span>
                            <span className="edu-location">Chennai, India</span>
                        </div>
                    </div>
                    <h3 className="edu-degree">B.Tech, Information Technology</h3>
                    <span className="edu-institution">Chennai Institute of Technology</span>
                    <p className="edu-description">
                        Pursuing specialized training in software architectures, cybersecurity diagnostics, computer networks, and traffic analysis. Actively engaging in code challenges and building secure IoT and web applications.
                    </p>
                </TiltCard>

                {/* High School */}
                <TiltCard className="education-card tilt-card">
                    <div className="edu-header">
                        <div className="edu-icon">🏫</div>
                        <div className="edu-meta">
                            <span className="edu-period">Apr 2024 – Mar 2025</span>
                            <span className="edu-location">India</span>
                        </div>
                    </div>
                    <h3 className="edu-degree">12th Grade (PCMCS)</h3>
                    <span className="edu-institution">Shri Vidhya Mandhir</span>
                    <p className="edu-description">
                        Completed higher secondary education specializing in Physics, Chemistry, Mathematics, and Computer Science (PCMCS) with a 70% grade. Active member in photography and multimedia activities. Simultaneously completed an 8-week course in <strong>Data Science & AI</strong> at <strong>IIT Madras</strong>.
                    </p>
                </TiltCard>
            </div>
        </section>
    );
}
