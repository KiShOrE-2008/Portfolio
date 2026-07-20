import React from 'react';
import TiltCard from './TiltCard';

export default function Experience({ onOpenLightbox }) {
    return (
        <section id="experience" className="section experience-section">
            <div className="section-header">
                <h2 className="section-title">Work Experience</h2>
                <div className="section-divider"></div>
            </div>

            <div className="timeline">
                {/* UP Police Internship */}
                <div className="timeline-item">
                    <TiltCard 
                        className="timeline-content tilt-card clickable-card"
                        onClick={() => onOpenLightbox(0)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="timeline-header">
                            <span className="time-period">June 2026</span>
                            <span className="view-cert-badge">🔍 View Gallery</span>
                            <span className="location">Moradabad, India</span>
                        </div>
                        <h3 className="role-title">Cyber Security Student Intern</h3>
                        <span className="company-name">Uttar Pradesh Police ( "सुरक्षा आपकी, संकल्प हमारा" )</span>
                        <div className="timeline-body">
                            <p className="internship-badge">Amroha Police Cyber Security Internship Program (APCSIP-2026)</p>
                            <ul className="experience-bullets">
                                <li>Completed the APCSIP-2026, gaining hands-on experience in cybersecurity, cybercrime investigation, digital forensics, and cyber awareness.</li>
                                <li>Learned about cybercrime investigation methodologies, digital security practices, and emerging cyber threats.</li>
                                <li>Collaborated with industry experts, law enforcement professionals, and peers during technical sessions and workshops.</li>
                            </ul>
                        </div>
                    </TiltCard>
                </div>
            </div>
        </section>
    );
}
