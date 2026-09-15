import React from 'react';

export const projectsData = [
    {
        id: 'projectPasswordChecker',
        category: 'cybersecurity',
        categoryLabel: 'Cybersecurity',
        icon: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/authelia.webp',
        badge: 'Security Architecture',
        title: 'Password Strength Checker',
        subtitle: 'Cryptographic entropy engine & pattern weakness analyzer',
        desc: 'Advanced password analysis system applying entropy calculations, pattern matching, crack-time estimation, and PBKDF2 hashing.',
        highlights: [
            'Shannon Entropy calculation to measure randomness bits per character',
            'PBKDF2 key derivation & dictionary pattern weakness detection',
            'Brute-force crack time estimations across GPU cluster speeds',
            'Vulnerability mitigation recommendations for web app developers'
        ],
        tags: ['Python', 'JavaScript', 'Cryptography', 'Security Analysis'],
        link: 'https://github.com/KiShOrE-2008/Password_Checker',
        featured: true,
        codeSnippet: `def calc_entropy(pw):\n    chars = set(pw)\n    entropy = len(pw) * math.log2(len(chars))\n    return round(entropy, 2)`,
        accent: '#00f28f'
    },
    {
        id: 'projectRouterMonitor',
        category: 'networking',
        categoryLabel: 'Networking',
        icon: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/cisco.webp',
        badge: 'Networking',
        title: 'Router Monitoring Dashboard',
        subtitle: 'Real-time bandwidth analytics & ICMP packet inspector',
        desc: 'Network analytics platform providing real-time bandwidth tracking, packet inspection, and admin alerts.',
        highlights: [
            'Live socket telemetry tracking interface bandwidth utilization',
            'Packet header inspection for anomaly & unauthorized IP detection',
            'Automated admin alerts on latency spikes & DDoS threshold triggers',
            'Interactive charts rendering historical traffic metrics'
        ],
        tags: ['Python', 'Traffic Analysis', 'Websockets', 'TCP/IP'],
        link: 'https://github.com/KiShOrE-2008',
        featured: false,
        codeSnippet: `const socket = new WebSocket('ws://router.local:8080');\nsocket.onmessage = (e) => parseTelemetry(e.data);`,
        accent: '#38bdf8'
    },
    {
        id: 'projectWasteSegregation',
        category: 'networking',
        categoryLabel: 'IoT & Hardware',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg',
        badge: 'IoT & Hardware',
        title: 'Smart Waste Segregation',
        subtitle: 'Microcontroller hardware system with automated sensor sorting',
        desc: 'Automated sorting system using hardware sensors, moisture detectors, microcontrollers (Arduino), and servo actuators.',
        highlights: [
            'Inductive & moisture sensor signal processing in C/C++',
            'Real-time servo actuator control loops for automated bin routing',
            'Low-power microcontroller firmware architecture',
            'Edge hardware telemetry via serial communication'
        ],
        tags: ['Arduino', 'C / C++', 'IoT Hardware', 'Sensors'],
        link: 'https://github.com/KiShOrE-2008',
        featured: false,
        codeSnippet: `void loop() {\n  int val = analogRead(MOISTURE_PIN);\n  if (val > THRESHOLD) rotateServo(90);\n}`,
        accent: '#f59e0b'
    },
    {
        id: 'projectLinkWeb',
        category: 'web',
        categoryLabel: 'Web Applications',
        icon: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/crowdsec.webp',
        badge: 'Web UI',
        title: 'Cybersecurity Portfolio Dashboard',
        subtitle: 'Glassmorphism portfolio directory with 3D physics lanyard card',
        desc: 'A modern, responsive link list profile directory featuring micro-interactions, custom themes, and glassmorphic designs.',
        highlights: [
            'Custom 360° rigid-body pendulum physics loop running at 120 FPS',
            'Glassmorphism design system built with CSS variables & backdrop filters',
            'Interactive command-line terminal widget (Ctrl + K)',
            'Dynamic GitHub activity heatmaps & real-time API sync'
        ],
        tags: ['React', 'JavaScript', 'Physics Engine', 'CSS3'],
        link: 'https://github.com/KiShOrE-2008/Portfolio',
        featured: true,
        codeSnippet: `const force = -k * Math.sin(rad) * 450 - damping * vel;\nvelocity += force * dt;\nrotation += velocity * dt;`,
        accent: '#a855f7'
    },
    {
        id: 'projectCarsWeb',
        category: 'web',
        categoryLabel: 'Web Applications',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
        badge: 'Web UI Showcase',
        title: 'Cars Showcase Page',
        subtitle: 'High-performance responsive landing showcase for luxury cars',
        desc: 'A landing showcase for performance cars highlighting fluid responsive grids and smooth imagery animations.',
        highlights: [
            'Responsive multi-column CSS grid & fluid typography scaling',
            'Hardware-accelerated CSS animations and parallax scroll dynamics',
            'Clean semantic HTML5 structure & accessibility compliance'
        ],
        tags: ['HTML5', 'CSS3', 'Design', 'Responsive UI'],
        link: 'https://github.com/KiShOrE-2008/cars',
        featured: false,
        codeSnippet: `@media (min-width: 1024px) {\n  .car-grid { grid-template-columns: repeat(3, 1fr); }\n}`,
        accent: '#ec4899'
    }
];

export default function Projects({ onSelectProject }) {
    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            minHeight: '750px',
            background: '#080808',
            overflow: 'hidden',
        }}>
            <iframe
                src="/landing-pages/complete-shelf-v2.html"
                title="Working Volumes — Seven Tools for Making"
                sandbox="allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
                loading="eager"
                style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    border: 0,
                    background: '#080808',
                }}
            />
        </div>
    );
}
