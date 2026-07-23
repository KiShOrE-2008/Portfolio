import React, { useState, useEffect } from 'react';
import NetworkBackground from './NetworkBackground';

export default function Preloader({ onComplete }) {
    const [typedText, setTypedText] = useState("");
    const [commandCompleted, setCommandCompleted] = useState(false);
    const [consoleLines, setConsoleLines] = useState([]);
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const command = "npx kishore-kv --init";
        let typeIndex = 0;
        
        // 1. Command typing animation
        const typingInterval = setInterval(() => {
            if (typeIndex < command.length) {
                setTypedText((prev) => prev + command.charAt(typeIndex));
                typeIndex++;
            } else {
                clearInterval(typingInterval);
                // Start log output sequence after a short delay
                setTimeout(() => {
                    setCommandCompleted(true);
                    startExecution();
                }, 300);
            }
        }, 55);

        const startExecution = () => {
            const events = [
                { text: "> Fetching system modules... OK", delay: 200 },
                { text: "> Connecting to cyber-nodes... Connected", delay: 600 },
                { text: "> Loading portfolio experience nodes... Done", delay: 1000 },
                { text: "> Initializing interactive layout...", delay: 1400 }
            ];

            events.forEach((event) => {
                setTimeout(() => {
                    setConsoleLines((prev) => [...prev, event.text]);
                }, event.delay);
            });

            // Start progress bar after logs finish writing
            setTimeout(() => {
                let currentProgress = 0;
                const progressInterval = setInterval(() => {
                    currentProgress += 5;
                    if (currentProgress >= 100) {
                        setProgress(100);
                        clearInterval(progressInterval);
                        
                        // Hold completed state briefly before transition
                        setTimeout(() => {
                            setFadeOut(true);
                            setTimeout(() => {
                                onComplete();
                            }, 800);
                        }, 500);
                    } else {
                        setProgress(currentProgress);
                    }
                }, 40);
            }, 1600);
        };

        return () => {
            clearInterval(typingInterval);
        };
    }, [onComplete]);

    // Construct ASCII progress bar matching progress
    const barLength = 20;
    const filledCount = Math.round((progress / 100) * barLength);
    const emptyCount = barLength - filledCount;
    const progressBarText = '='.repeat(filledCount) + ' '.repeat(emptyCount);

    return (
        <div className={`network-preloader-container ${fadeOut ? 'fade-out' : ''}`}>
            {/* Blast Wave transition element */}
            <div className="blast-wave"></div>

            {/* Mesh Background running behind the preloader content */}
            <div className="preloader-background">
                <NetworkBackground />
            </div>
            
            {/* Terminal Window Mockup */}
            <div className="terminal-preloader-window">
                <div className="terminal-header">
                    <div className="terminal-button red"></div>
                    <div className="terminal-button yellow"></div>
                    <div className="terminal-button green"></div>
                    <div className="terminal-title">bash - guest@kishore-kv:~</div>
                </div>
                <div className="terminal-body">
                    <div className="terminal-prompt">
                        <span className="terminal-user">guest@kishore-kv</span>:<span className="terminal-dir">~</span>$ <span className="terminal-command">{typedText}</span>
                        {!commandCompleted && <span className="terminal-cursor"></span>}
                    </div>
                    
                    {commandCompleted && (
                        <div className="terminal-output">
                            {consoleLines.map((line, idx) => (
                                <div key={idx} className="terminal-line">{line}</div>
                            ))}
                            
                            {progress > 0 && (
                                <div className="terminal-progress-line">
                                    <span className="progress-bracket">[</span>
                                    <span className="progress-bar-text">{progressBarText}</span>
                                    <span className="progress-bracket">]</span>
                                    <span className="progress-pct"> {progress}%</span>
                                </div>
                            )}
                            
                            {progress === 100 && (
                                <div className="terminal-success-line">Launch successful. Entering portfolio...</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
