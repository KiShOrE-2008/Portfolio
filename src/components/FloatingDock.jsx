import React from 'react';

const dockItems = [
    { id: 'hero', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'what-i-do', label: 'Services', icon: '⚡' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'contact', label: 'Contact', icon: '💬' }
];

export default function FloatingDock({ activeSection }) {
    const handleScrollTo = (id) => {
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="floating-dock-wrapper" aria-label="Floating Quick Navigation Dock">
            <nav className="floating-dock glass-panel">
                {dockItems.map((item) => (
                    <button
                        key={item.id}
                        className={`dock-item ${activeSection === item.id ? 'active' : ''}`}
                        onClick={() => handleScrollTo(item.id)}
                        aria-label={item.label}
                        title={item.label}
                    >
                        <span className="dock-icon">{item.icon}</span>
                        <span className="dock-tooltip">{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}
