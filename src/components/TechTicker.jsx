import React from 'react';

const techBadges = [
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { name: 'Cybersecurity', icon: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/kali-linux.webp' },
    { name: 'C / C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
    { name: 'Networking', icon: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/cisco.webp' },
    { name: 'Wireshark', icon: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/wireshark.webp' },
    { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    { name: 'HTML5 & CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
    { name: 'Linux OS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
    { name: 'Git & GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
    { name: 'Arduino & IoT', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg' },
    { name: 'MySQL & Databases', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
    { name: 'Security Auditing', icon: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/crowdsec.webp' }
];

export default function TechTicker() {
    return (
        <div className="tech-ticker-container" aria-label="Technology Stack Marquee">
            <div className="tech-ticker-track">
                {/* Render thrice for continuous seamless infinite loop */}
                {[...techBadges, ...techBadges, ...techBadges].map((item, idx) => (
                    <div key={idx} className="ticker-badge glass-panel">
                        <img
                            src={item.icon}
                            alt={item.name}
                            width="20"
                            height="20"
                            className="badge-icon-img"
                            style={{ objectFit: 'contain', display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}
                        />
                        <span className="badge-name">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
