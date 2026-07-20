import React, { useState, useEffect } from 'react';

const bootSequence = [
    { text: "> INITIALIZING SHIELD PORT PROTOCOLS...", delay: 100 },
    { text: "> ESTABLISHING TCP/IP DIAGNOSTICS...", delay: 500 },
    { text: "> STATUS: 3-WAY SYN-ACK HANDSHAKE SECURE", delay: 900 },
    { text: "> RESOLVING CISCO VPN TUNNEL ACCESS...", delay: 1300 },
    { text: "> LOADING POLICE CYBER CRIMES DATA CORRELATOR...", delay: 1700 },
    { text: "> MOUNTING NETWORK PACKET ANALYZER...", delay: 2100 },
    { text: "> ACCESS GRANTED. SYSTEM SECURE.", delay: 2500 }
];

export default function Preloader({ onComplete }) {
    const [logs, setLogs] = useState([]);
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Fast counting progress simulation (takes ~2.5s)
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 4;
            });
        }, 100);

        // Print log statements sequentially
        const timeouts = [];
        bootSequence.forEach((step) => {
            const timeout = setTimeout(() => {
                setLogs((prev) => [...prev, step.text]);
            }, step.delay);
            timeouts.push(timeout);
        });

        // Trigger fade out and complete
        const shutdownTimer = setTimeout(() => {
            setFadeOut(true);
            const completeTimer = setTimeout(() => {
                onComplete();
            }, 800); // Match CSS fade-out animation length
            timeouts.push(completeTimer);
        }, 3200);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(shutdownTimer);
            timeouts.forEach(clearTimeout);
        };
    }, [onComplete]);

    return (
        <div className={`cyber-preloader ${fadeOut ? 'fade-out' : ''}`}>
            <div className="preloader-bg-matrix"></div>
            <div className="preloader-content">
                <div className="terminal-header">
                    <span className="terminal-dot red"></span>
                    <span className="terminal-dot yellow"></span>
                    <span className="terminal-dot green"></span>
                    <span className="terminal-title">sec_boot_sequence.sh</span>
                </div>
                
                <div className="terminal-body">
                    <div className="cyber-logo-wrapper">
                        <div className="cyber-scanner"></div>
                        <svg className="cyber-shield-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path 
                                d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" 
                                stroke="currentColor" 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                            <path 
                                d="M12 6V12L16 14" 
                                stroke="currentColor" 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <div className="console-logs">
                        {logs.map((log, idx) => (
                            <div 
                                key={idx} 
                                className={`console-line ${log.includes('GRANTED') ? 'success' : ''}`}
                            >
                                {log}
                            </div>
                        ))}
                    </div>

                    <div className="progress-section">
                        <div className="progress-header">
                            <span className="progress-label">System Integrity Scan</span>
                            <span className="progress-percent">{progress}%</span>
                        </div>
                        <div className="progress-bar-container">
                            <div 
                                className="progress-bar-fill" 
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
