import React, { useState, useRef, useEffect } from 'react';

const AVAILABLE_COMMANDS = [
    { cmd: 'help', desc: 'Display all available commands' },
    { cmd: 'skills', desc: 'List technical competencies & security tools' },
    { cmd: 'projects', desc: 'Show featured projects & repository links' },
    { cmd: 'ping kishore.kv', desc: 'Run ICMP ping test to Kishore\'s server' },
    { cmd: 'about', desc: 'Display background profile summary' },
    { cmd: 'whoami', desc: 'Check visitor session details' },
    { cmd: 'contact', desc: 'Get direct contact info & socials' },
    { cmd: 'clear', desc: 'Clear the terminal output' },
    { cmd: 'theme', desc: 'Toggle light / dark color mode' },
    { cmd: 'download-resume', desc: 'Download Kishore\'s resume' },
];

export default function CyberTerminal({ isOpen, onClose, theme, onToggleTheme }) {
    const [inputVal, setInputVal] = useState('');
    const [history, setHistory] = useState([
        { type: 'system', text: '⚡ Kishore KV Cyber Security Terminal [v2.4.0]' },
        { type: 'system', text: 'Type "help" or click a quick action below to see available commands.' }
    ]);
    const [cmdHistoryList, setCmdHistoryList] = useState([]);
    const [historyIdx, setHistoryIdx] = useState(-1);

    const inputRef = useRef(null);
    const bodyRef = useRef(null);

    // Auto-focus input when terminal opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    // Auto scroll output
    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [history]);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleRunCmd = (commandStr) => {
        const trimmed = commandStr.trim();
        if (!trimmed) return;

        const newHist = [...history, { type: 'input', text: `kishore@sec-box:~# ${trimmed}` }];
        setCmdHistoryList((prev) => [trimmed, ...prev]);
        setHistoryIdx(-1);

        const lower = trimmed.toLowerCase();

        if (lower === 'clear') {
            setHistory([]);
            setInputVal('');
            return;
        }

        if (lower === 'help') {
            newHist.push({
                type: 'output',
                text: (
                    <div className="terminal-help-grid">
                        <div className="terminal-help-header">AVAILABLE COMMANDS:</div>
                        {AVAILABLE_COMMANDS.map((item, i) => (
                            <div key={i} className="help-row">
                                <span className="help-cmd">{item.cmd.padEnd(18, ' ')}</span>
                                <span className="help-desc">{item.desc}</span>
                            </div>
                        ))}
                    </div>
                )
            });
        } else if (lower === 'skills') {
            newHist.push({
                type: 'output',
                text: (
                    <div className="terminal-output-block">
                        <div className="term-heading">🛡️ TECHNICAL SKILLS & SECURITY TOOLS</div>
                        <div className="term-sub">• Cybersecurity: Penetration Testing, Threat Analysis, Vulnerability Scanning, Cryptography</div>
                        <div className="term-sub">• Networking: TCP/IP, Wireshark, Cisco Packet Tracer, Subnetting, Router Protocols</div>
                        <div className="term-sub">• Programming: Python, C/C++, JavaScript, React, HTML5, CSS3, Bash</div>
                        <div className="term-sub">• IoT & Hardware: Arduino Microcontrollers, Sensors, Servo Actuators</div>
                    </div>
                )
            });
        } else if (lower === 'projects') {
            newHist.push({
                type: 'output',
                text: (
                    <div className="terminal-output-block">
                        <div className="term-heading">🚀 FEATURED PROJECTS</div>
                        <div className="term-item">1. Password Strength Checker [Entropy, PBKDF2, Pattern Analysis]</div>
                        <div className="term-item">2. Router Monitoring Dashboard [Real-Time Bandwidth & Packet Inspection]</div>
                        <div className="term-item">3. Smart Waste Segregation [IoT Hardware, Arduino Sensors]</div>
                        <div className="term-item">4. Cybersecurity Portfolio [Glassmorphism UI, 3D Physics Lanyard]</div>
                    </div>
                )
            });
        } else if (lower === 'ping kishore.kv' || lower === 'ping') {
            newHist.push({
                type: 'output',
                text: (
                    <div className="terminal-output-block ping-block">
                        <div>PING kishore.kv (192.168.1.100) 56(84) bytes of data.</div>
                        <div>64 bytes from kishore.kv: icmp_seq=1 ttl=64 time=1.42 ms</div>
                        <div>64 bytes from kishore.kv: icmp_seq=2 ttl=64 time=0.98 ms</div>
                        <div>64 bytes from kishore.kv: icmp_seq=3 ttl=64 time=1.12 ms</div>
                        <div className="ping-summary">--- kishore.kv ping statistics ---</div>
                        <div>3 packets transmitted, 3 received, 0% packet loss, rtt avg 1.17 ms [ONLINE]</div>
                    </div>
                )
            });
        } else if (lower === 'about') {
            newHist.push({
                type: 'output',
                text: (
                    <div className="terminal-output-block">
                        <div className="term-heading">👤 ABOUT KISHORE K V</div>
                        <div>Cybersecurity Enthusiast & Information Technology Undergraduate from Chennai, India.</div>
                        <div>Specializing in network security, threat mitigation, microcontrollers, and modern web application development.</div>
                    </div>
                )
            });
        } else if (lower === 'whoami') {
            newHist.push({
                type: 'output',
                text: `visitor@${window.location.hostname} (Guest Access Granted - Level 1)`
            });
        } else if (lower === 'contact') {
            newHist.push({
                type: 'output',
                text: (
                    <div className="terminal-output-block">
                        <div>📧 Email: kv.kishorevijay@gmail.com</div>
                        <div>🔗 GitHub: github.com/KiShOrE-2008</div>
                        <div>💼 LinkedIn: linkedin.com/in/kishore-k-v-1422a0333/</div>
                        <div>📍 Location: Chennai, Tamil Nadu, India</div>
                    </div>
                )
            });
        } else if (lower === 'theme') {
            onToggleTheme();
            newHist.push({
                type: 'output',
                text: `Color theme toggled to: ${theme === 'dark' ? 'LIGHT' : 'DARK'} mode.`
            });
        } else if (lower === 'download-resume' || lower === 'resume') {
            newHist.push({
                type: 'output',
                text: '📄 Initiating resume download...'
            });
            window.open('https://github.com/KiShOrE-2008', '_blank');
        } else {
            newHist.push({
                type: 'error',
                text: `zsh: command not found: ${trimmed}. Type "help" for available commands.`
            });
        }

        setHistory(newHist);
        setInputVal('');
    };

    const handleKeyDownInput = (e) => {
        if (e.key === 'Enter') {
            handleRunCmd(inputVal);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (cmdHistoryList.length > 0) {
                const nextIdx = Math.min(historyIdx + 1, cmdHistoryList.length - 1);
                setHistoryIdx(nextIdx);
                setInputVal(cmdHistoryList[nextIdx]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIdx > 0) {
                const nextIdx = historyIdx - 1;
                setHistoryIdx(nextIdx);
                setInputVal(cmdHistoryList[nextIdx]);
            } else if (historyIdx === 0) {
                setHistoryIdx(-1);
                setInputVal('');
            }
        }
    };

    return (
        <div className="cyber-terminal-overlay" onClick={onClose}>
            <div className="cyber-terminal-modal glass-panel" onClick={(e) => e.stopPropagation()}>
                {/* Terminal Window Top Title Bar */}
                <div className="terminal-header">
                    <div className="terminal-window-buttons">
                        <span className="term-btn term-close" onClick={onClose} title="Close Terminal (ESC)"></span>
                        <span className="term-btn term-minimize"></span>
                        <span className="term-btn term-maximize"></span>
                    </div>
                    <div className="terminal-title">
                        <span className="term-icon">💻</span> kishore@cyber-sec-box:~ (bash)
                    </div>
                    <div className="terminal-status-tag">
                        <span className="status-dot-green"></span> 443 OPEN
                    </div>
                </div>

                {/* Output Area */}
                <div className="terminal-body" ref={bodyRef}>
                    {history.map((item, idx) => (
                        <div key={idx} className={`terminal-line line-${item.type}`}>
                            {item.text}
                        </div>
                    ))}
                </div>

                {/* Quick Action Chips Bar */}
                <div className="terminal-chips-bar">
                    <span className="chips-label">QUICK COMMANDS:</span>
                    {['help', 'skills', 'projects', 'ping kishore.kv', 'contact', 'clear'].map((cmd, cIdx) => (
                        <button
                            key={cIdx}
                            className="chip-btn"
                            onClick={() => handleRunCmd(cmd)}
                        >
                            {cmd}
                        </button>
                    ))}
                </div>

                {/* Input Prompt Row */}
                <div className="terminal-input-row">
                    <span className="prompt-label">kishore@sec-box:~#</span>
                    <input
                        ref={inputRef}
                        type="text"
                        className="terminal-input"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={handleKeyDownInput}
                        placeholder="Type a command (e.g. 'help', 'skills', 'ping kishore.kv')..."
                        spellCheck="false"
                        autoComplete="off"
                    />
                </div>
            </div>
        </div>
    );
}
