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
    { cmd: 'download-resume', desc: 'Download Kishore\'s resume' },
];

// Single Line Character Typer with real-time auto-scroll trigger
function SingleLineTyper({ text, baseSpeed = 22, isLatest, onComplete, onType }) {
    const [charIdx, setCharIdx] = useState(isLatest ? 0 : (text ? text.length : 0));
    const [isDone, setIsDone] = useState(!isLatest);

    useEffect(() => {
        if (!isLatest || typeof text !== 'string') {
            setIsDone(true);
            if (onComplete) onComplete();
            return;
        }

        let idx = 0;
        let timeoutId = null;
        setCharIdx(0);
        setIsDone(false);

        const typeNextChar = () => {
            if (idx < text.length) {
                setCharIdx(idx + 1);
                idx++;
                if (onType) onType();
                const randomJitter = baseSpeed + Math.floor(Math.random() * 18);
                timeoutId = setTimeout(typeNextChar, randomJitter);
            } else {
                setIsDone(true);
                if (onType) onType();
                if (onComplete) onComplete();
            }
        };

        const initialDelay = baseSpeed + Math.floor(Math.random() * 12);
        timeoutId = setTimeout(typeNextChar, initialDelay);

        return () => clearTimeout(timeoutId);
    }, [text, baseSpeed, isLatest]);

    if (typeof text !== 'string') return text;

    return (
        <span className="cli-single-line">
            {text.substring(0, charIdx)}
            {!isDone && <span className="typewriter-block-cursor">▋</span>}
        </span>
    );
}

// Line-by-Line Sequential Typer Component with auto-scroll
function LineByLineOutput({ lines, text, isLatest, lineSpeed = 22, onType }) {
    const activeList = useRef(
        Array.isArray(lines)
            ? lines
            : typeof text === 'string'
            ? [{ text, class: '' }]
            : []
    );

    const [currentLineIdx, setCurrentLineIdx] = useState(isLatest ? 0 : activeList.current.length - 1);

    useEffect(() => {
        if (!isLatest) {
            setCurrentLineIdx(activeList.current.length - 1);
            return;
        }
        setCurrentLineIdx(0);
    }, [isLatest]);

    if (!Array.isArray(lines) && typeof text !== 'string') {
        return text;
    }

    return (
        <div className="terminal-output-block">
            {activeList.current.slice(0, currentLineIdx + 1).map((lineObj, idx) => (
                <div key={idx} className={lineObj.class || 'term-sub'}>
                    <SingleLineTyper
                        text={lineObj.text}
                        baseSpeed={lineSpeed}
                        isLatest={isLatest && idx === currentLineIdx}
                        onType={onType}
                        onComplete={() => {
                            if (isLatest && idx === currentLineIdx && currentLineIdx < activeList.current.length - 1) {
                                const linePause = 70 + Math.floor(Math.random() * 110);
                                setTimeout(() => {
                                    setCurrentLineIdx((prev) => prev + 1);
                                    if (onType) onType();
                                }, linePause);
                            }
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

export default function CyberTerminal({ isOpen, onClose, onOpenResume }) {
    const [inputVal, setInputVal] = useState('');
    const [isAutoTyping, setIsAutoTyping] = useState(false);
    const [history, setHistory] = useState([
        { id: 1, type: 'system', text: '⚡ Kishore KV Cyber Security Terminal [v2.4.0]' },
        { id: 2, type: 'system', text: 'Type "help" or click a quick action below to see available commands.' }
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

    // Auto scroll output as line by line typing progresses
    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [history, inputVal]);

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

    // Simulate typing into prompt input line when clicking a chip with human keypress jitter
    const handleChipClick = (commandStr) => {
        if (isAutoTyping) return;
        setIsAutoTyping(true);
        setInputVal('');

        let idx = 0;
        let timeoutId = null;

        const typeNextPromptChar = () => {
            if (idx < commandStr.length) {
                setInputVal(commandStr.substring(0, idx + 1));
                idx++;
                const keypressJitter = 30 + Math.floor(Math.random() * 22);
                timeoutId = setTimeout(typeNextPromptChar, keypressJitter);
            } else {
                setTimeout(() => {
                    handleRunCmd(commandStr);
                    setIsAutoTyping(false);
                }, 160);
            }
        };

        timeoutId = setTimeout(typeNextPromptChar, 40);
    };

    const handleRunCmd = (commandStr) => {
        const trimmed = commandStr.trim();
        if (!trimmed) return;

        const newId = Date.now();
        const newHist = [...history, { id: newId, type: 'input', text: `kishore@sec-box:~# ${trimmed}` }];
        setCmdHistoryList((prev) => [trimmed, ...prev]);
        setHistoryIdx(-1);

        const lower = trimmed.toLowerCase();

        if (lower === 'clear') {
            setHistory([]);
            setInputVal('');
            return;
        }

        const outputId = newId + 1;

        if (lower === 'help') {
            const helpLines = [
                { text: 'AVAILABLE COMMANDS:', class: 'term-heading' },
                ...AVAILABLE_COMMANDS.map((item) => ({
                    text: `${item.cmd.padEnd(18, ' ')} ${item.desc}`,
                    class: 'help-line-row'
                }))
            ];
            newHist.push({
                id: outputId,
                type: 'output',
                lines: helpLines
            });
        } else if (lower === 'skills') {
            newHist.push({
                id: outputId,
                type: 'output',
                lines: [
                    { text: '🛡️ TECHNICAL SKILLS & SECURITY TOOLS', class: 'term-heading' },
                    { text: '• Cybersecurity: Penetration Testing, Threat Analysis, Vulnerability Scanning, Cryptography', class: 'term-sub' },
                    { text: '• Networking: TCP/IP, Wireshark, Cisco Packet Tracer, Subnetting, Router Protocols', class: 'term-sub' },
                    { text: '• Programming: Python, C/C++, JavaScript, React, HTML5, CSS3, Bash', class: 'term-sub' },
                    { text: '• IoT & Hardware: Arduino Microcontrollers, Sensors, Servo Actuators', class: 'term-sub' }
                ]
            });
        } else if (lower === 'projects') {
            newHist.push({
                id: outputId,
                type: 'output',
                lines: [
                    { text: '🚀 FEATURED PROJECTS', class: 'term-heading' },
                    { text: '1. Password Strength Checker [Entropy, PBKDF2, Pattern Analysis]', class: 'term-item' },
                    { text: '2. Router Monitoring Dashboard [Real-Time Bandwidth & Packet Inspection]', class: 'term-item' },
                    { text: '3. Smart Waste Segregation [IoT Hardware, Arduino Sensors]', class: 'term-item' },
                    { text: '4. Cybersecurity Portfolio [Glassmorphism UI, 3D Physics Lanyard]', class: 'term-item' }
                ]
            });
        } else if (lower === 'ping kishore.kv' || lower === 'ping') {
            newHist.push({
                id: outputId,
                type: 'output',
                lines: [
                    { text: 'PING kishore.kv (192.168.1.100) 56(84) bytes of data.', class: 'ping-line' },
                    { text: '64 bytes from kishore.kv: icmp_seq=1 ttl=64 time=1.42 ms', class: 'ping-line' },
                    { text: '64 bytes from kishore.kv: icmp_seq=2 ttl=64 time=0.98 ms', class: 'ping-line' },
                    { text: '64 bytes from kishore.kv: icmp_seq=3 ttl=64 time=1.12 ms', class: 'ping-line' },
                    { text: '--- kishore.kv ping statistics ---', class: 'ping-summary' },
                    { text: '3 packets transmitted, 3 received, 0% packet loss, rtt avg 1.17 ms [ONLINE ⚡]', class: 'ping-line online' }
                ]
            });
        } else if (lower === 'about') {
            newHist.push({
                id: outputId,
                type: 'output',
                lines: [
                    { text: '👤 ABOUT KISHORE K V', class: 'term-heading' },
                    { text: 'Cybersecurity Enthusiast & Information Technology Undergraduate from Chennai, India.', class: 'term-sub' },
                    { text: 'Specializing in network security, threat mitigation, microcontrollers, and modern web application development.', class: 'term-sub' }
                ]
            });
        } else if (lower === 'whoami') {
            newHist.push({
                id: outputId,
                type: 'output',
                text: `visitor@${window.location.hostname} (Guest Access Granted - Level 1)`
            });
        } else if (lower === 'contact') {
            newHist.push({
                id: outputId,
                type: 'output',
                lines: [
                    { text: '📧 Email: kv.kishorevijay@gmail.com', class: 'term-sub' },
                    { text: '🔗 GitHub: github.com/KiShOrE-2008', class: 'term-sub' },
                    { text: '💼 LinkedIn: linkedin.com/in/kishore-k-v-1422a0333/', class: 'term-sub' },
                    { text: '📍 Location: Chennai, Tamil Nadu, India', class: 'term-sub' }
                ]
            });
        } else if (lower === 'theme') {
            newHist.push({
                id: outputId,
                type: 'output',
                text: '🌙 Portfolio is permanently locked to Cyber Dark Mode.'
            });
        } else if (lower === 'download-resume' || lower === 'resume') {
            newHist.push({
                id: outputId,
                type: 'output',
                text: '📄 Initiating secure resume viewer with network latency simulation...'
            });
            if (onOpenResume) {
                onOpenResume();
                onClose();
            } else {
                window.open('/resume.pdf', '_blank');
            }
        } else {
            newHist.push({
                id: outputId,
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
                {/* CRT Scanline & Grid Effect */}
                <div className="terminal-scanline"></div>
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
                    {history.map((item, idx) => {
                        const isLatest = idx === history.length - 1;

                        if (item.type === 'input') {
                            return (
                                <div key={item.id || idx} className="terminal-line line-input">
                                    {item.text}
                                </div>
                            );
                        }

                        const handleAutoScroll = () => {
                            if (bodyRef.current) {
                                bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
                            }
                        };

                        return (
                            <div key={item.id || idx} className={`terminal-line line-${item.type}`}>
                                <LineByLineOutput
                                    lines={item.lines}
                                    text={item.text}
                                    isLatest={isLatest}
                                    lineSpeed={22}
                                    onType={handleAutoScroll}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Quick Action Chips Bar */}
                <div className="terminal-chips-bar">
                    <span className="chips-label">QUICK COMMANDS:</span>
                    {['help', 'skills', 'projects', 'ping kishore.kv', 'contact', 'clear'].map((cmd, cIdx) => (
                        <button
                            key={cIdx}
                            className="chip-btn"
                            onClick={() => handleChipClick(cmd)}
                            disabled={isAutoTyping}
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
                        placeholder={isAutoTyping ? 'Executing command...' : "Type a command (e.g. 'help', 'skills', 'ping kishore.kv')..."}
                        spellCheck="false"
                        autoComplete="off"
                        disabled={isAutoTyping}
                    />
                    <span className="terminal-live-cursor">▋</span>
                </div>
            </div>
        </div>
    );
}
