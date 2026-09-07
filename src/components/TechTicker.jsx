import React from 'react';

const techBadges = [
    { name: 'Python', icon: '🐍' },
    { name: 'Cybersecurity', icon: '🛡️' },
    { name: 'C / C++', icon: '⚙️' },
    { name: 'Networking', icon: '🌐' },
    { name: 'Traffic Analysis', icon: '📡' },
    { name: 'Wireshark', icon: '🦈' },
    { name: 'React.js', icon: '⚛️' },
    { name: 'JavaScript', icon: '🟨' },
    { name: 'HTML5 & CSS3', icon: '🎨' },
    { name: 'Linux OS', icon: '🐧' },
    { name: 'Git & GitHub', icon: '🐙' },
    { name: 'Arduino & IoT', icon: '🤖' },
    { name: 'Cryptography', icon: '🔑' },
    { name: 'Security Auditing', icon: '🔒' }
];

export default function TechTicker() {
    return (
        <div className="tech-ticker-container" aria-label="Technology Stack Marquee">
            <div className="tech-ticker-track">
                {/* Render twice for seamless infinite loop */}
                {[...techBadges, ...techBadges, ...techBadges].map((item, idx) => (
                    <div key={idx} className="ticker-badge glass-panel">
                        <span className="badge-icon">{item.icon}</span>
                        <span className="badge-name">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
