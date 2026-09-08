import React from 'react';

const dockItems = [
    { id: 'hero', label: 'Home', icon: <i className="fas fa-home"></i> },
    { id: 'about', label: 'About', icon: <i className="fas fa-user-astronaut"></i> },
    { id: 'what-i-do', label: 'Services', icon: <i className="fas fa-bolt"></i> },
    { id: 'education', label: 'Education', icon: <i className="fas fa-graduation-cap"></i> },
    { id: 'experience', label: 'Experience', icon: <i className="fas fa-briefcase"></i> },
    { id: 'skills', label: 'Skills', icon: <i className="fas fa-code"></i> },
    { id: 'projects', label: 'Projects', icon: <i className="fas fa-folder-open"></i> },
    { id: 'contact', label: 'Contact', icon: <i className="fas fa-paper-plane"></i> }
];

export default function FloatingDock({ activeSection, onOpenTerminal }) {
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
                    >
                        <span className="dock-icon">{item.icon}</span>
                        <span className="dock-tooltip">{item.label}</span>
                    </button>
                ))}

                <button
                    className="dock-item dock-cli-item"
                    onClick={onOpenTerminal}
                    aria-label="Open CLI Terminal (Ctrl + K)"
                >
                    <span className="dock-icon"><i className="fas fa-terminal"></i></span>
                    <span className="dock-tooltip">Terminal (Ctrl+K)</span>
                </button>
            </nav>
        </div>
    );
}
