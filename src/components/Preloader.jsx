import React, { useState, useEffect, useRef } from 'react';

export default function Preloader({ onComplete }) {
    // State machine: 'boot' | 'network' | 'materialize' | 'hud' | 'loading' | 'ready' | 'exit'
    const [phase, setPhase] = useState('boot');
    const [logoText, setLogoText] = useState("");
    const [progress, setProgress] = useState(0);
    const canvasRef = useRef(null);
    const onCompleteCalledRef = useRef(false);

    // ----------------------------------------------------
    // 1. TIMELINE STATE MACHINE CONTROLLER
    // ----------------------------------------------------
    useEffect(() => {
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (isReducedMotion) {
            setLogoText("<Kishore.kv/>");
            setProgress(100);
            setPhase('ready');
            const timer = setTimeout(() => {
                setPhase('exit');
                setTimeout(() => {
                    if (!onCompleteCalledRef.current) {
                        onCompleteCalledRef.current = true;
                        onComplete();
                    }
                }, 400);
            }, 600);
            return () => clearTimeout(timer);
        }

        const timers = [];

        // Scene 1 -> Scene 2: Network formation (600ms)
        timers.push(setTimeout(() => setPhase('network'), 600));

        // Scene 4: Logo materialization starts (1700ms)
        timers.push(setTimeout(() => setPhase('materialize'), 1700));

        // Scene 5: HUD Appears (2600ms)
        timers.push(setTimeout(() => setPhase('hud'), 2600));

        // Scene 7: Network Synchronization starts (3400ms)
        timers.push(setTimeout(() => setPhase('loading'), 3400));

        return () => {
            timers.forEach(clearTimeout);
        };
    }, [onComplete]);

    // ----------------------------------------------------
    // 2. LOGO RECONSTRUCTION / MATERIALIZATION EFFECT
    // ----------------------------------------------------
    useEffect(() => {
        if (phase === 'boot' || phase === 'network') {
            setLogoText("");
            return;
        }

        const fullLogo = "<Kishore.kv/>";
        const stages = [
            "<K_s__re.k_>",
            "<Kish_re.kv>",
            "<Kishore.kv/>"
        ];

        if (phase === 'materialize') {
            let stageIndex = 0;
            setLogoText(stages[0]);

            const interval = setInterval(() => {
                stageIndex++;
                if (stageIndex < stages.length) {
                    setLogoText(stages[stageIndex]);
                } else {
                    clearInterval(interval);
                    setLogoText(fullLogo);
                }
            }, 280);

            return () => clearInterval(interval);
        } else {
            setLogoText(fullLogo);
        }
    }, [phase]);

    // ----------------------------------------------------
    // 3. SMOOTH NETWORK SYNCHRONIZATION PROGRESS (0-100%)
    // ----------------------------------------------------
    useEffect(() => {
        if (phase !== 'loading') return;

        let animationFrameId;
        let startTime = null;
        const duration = 1800; // 1.8s smooth synchronization curve

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            
            // Easing for smooth network settling at 90-95%
            const t = Math.min(1, elapsed / duration);
            const eased = t < 0.8 ? t * 1.15 : 0.92 + (t - 0.8) * 0.4;
            const current = Math.min(100, Math.round(eased * 100));

            setProgress(current);

            if (current < 100) {
                animationFrameId = requestAnimationFrame(step);
            } else {
                // SYSTEM READY - Network Handshake
                setPhase('ready');

                // Exit transition after brief intentional pause
                setTimeout(() => {
                    setPhase('exit');
                    setTimeout(() => {
                        if (!onCompleteCalledRef.current) {
                            onCompleteCalledRef.current = true;
                            onComplete();
                        }
                    }, 800);
                }, 550);
            }
        };

        animationFrameId = requestAnimationFrame(step);

        return () => cancelAnimationFrame(animationFrameId);
    }, [phase, onComplete]);

    // ----------------------------------------------------
    // 4. CANVAS NETWORK ENGINE (THE HERO & PROGRESS DRIVER)
    // ----------------------------------------------------
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        const cx = width / 2;
        const cy = height / 2;

        const isMobile = width < 768;
        const totalNodes = isMobile ? 35 : 75;
        const nodes = [];

        // Central node
        nodes.push({
            x: cx,
            y: cy,
            targetX: cx,
            targetY: cy,
            radius: 4.5,
            currentRadius: 0,
            opacity: 1,
            color: '#00d2ff',
            isCenter: true,
            syncIndex: 0,
        });

        // Surrounding organic network nodes sorted radially from center
        const tempNodes = [];
        for (let i = 1; i < totalNodes; i++) {
            const angle = Math.random() * Math.PI * 2;
            const maxDist = Math.max(width, height) * 0.65;
            const dist = Math.pow(Math.random(), 0.75) * maxDist;

            const targetX = cx + Math.cos(angle) * dist;
            const targetY = cy + Math.sin(angle) * dist;

            tempNodes.push({
                x: cx,
                y: cy,
                targetX,
                targetY,
                distFromCenter: dist,
                radius: Math.random() * 1.6 + 1.2,
                currentRadius: 0,
                opacity: 0,
                color: Math.random() < 0.65 ? '#00d2ff' : '#38bdf8',
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                isCenter: false,
            });
        }

        // Sort by distance so synchronization spreads smoothly outward
        tempNodes.sort((a, b) => a.distFromCenter - b.distFromCenter);
        tempNodes.forEach((n, idx) => {
            n.syncIndex = idx + 1;
            nodes.push(n);
        });

        // Data packets travelling along active lines
        const packets = [];
        const createPacket = (fromNode, toNode) => {
            packets.push({
                fromX: fromNode.x,
                fromY: fromNode.y,
                toX: toNode.x,
                toY: toNode.y,
                progress: 0,
                speed: Math.random() * 0.025 + 0.015,
                color: Math.random() < 0.5 ? '#00d2ff' : '#38bdf8',
            });
        };

        let scanY = -50;
        let exitWaveRadius = 0;
        let handshakePulse = 0;

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            const isBoot = phase === 'boot';
            const isNetwork = phase !== 'boot';
            const isReady = phase === 'ready';
            const isExit = phase === 'exit';

            // Calculate active synchronized node count driven by loading progress
            const activeThreshold = Math.floor((progress / 100) * (nodes.length - 1)) + 1;

            if (isReady && handshakePulse < 1) {
                handshakePulse += 0.04;
            }

            const maxConnDist = isMobile ? 110 : 150;

            // 1. Update & Render Nodes
            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                const isSynchronized = i <= activeThreshold || isReady || isExit;

                if (n.isCenter) {
                    n.currentRadius = isBoot ? 3 + Math.sin(Date.now() * 0.005) * 1.5 : 4.5;
                    n.opacity = 1;
                } else {
                    if (isNetwork) {
                        n.x += (n.targetX - n.x) * 0.05 + n.vx;
                        n.y += (n.targetY - n.y) * 0.05 + n.vy;

                        const targetOpacity = isSynchronized ? (isMobile ? 0.75 : 0.85) : 0.15;
                        n.opacity += (targetOpacity - n.opacity) * 0.08;
                        n.currentRadius += (n.radius - n.currentRadius) * 0.08;
                    } else {
                        n.x = cx;
                        n.y = cy;
                        n.opacity = 0;
                    }
                }

                if (n.opacity > 0.02) {
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, n.currentRadius * (isSynchronized ? 1 : 0.8), 0, Math.PI * 2);
                    ctx.fillStyle = isSynchronized ? n.color : '#475569';
                    ctx.globalAlpha = n.opacity;
                    ctx.fill();

                    // Handshake Pulse Glow when reaching 100%
                    if (isSynchronized && (n.isCenter || isReady)) {
                        ctx.shadowColor = '#00d2ff';
                        ctx.shadowBlur = isReady ? 18 + Math.sin(handshakePulse * Math.PI) * 12 : 8;
                        ctx.fill();
                        ctx.shadowBlur = 0;
                    }
                    ctx.globalAlpha = 1;
                }
            }

            // 2. Render Connection Lines
            if (isNetwork) {
                for (let i = 0; i < nodes.length; i++) {
                    const n1 = nodes[i];
                    if (n1.opacity < 0.08) continue;
                    const sync1 = i <= activeThreshold || isReady || isExit;

                    for (let j = i + 1; j < nodes.length; j++) {
                        const n2 = nodes[j];
                        if (n2.opacity < 0.08) continue;
                        const sync2 = j <= activeThreshold || isReady || isExit;

                        const dx = n1.x - n2.x;
                        const dy = n1.y - n2.y;
                        const dist = Math.hypot(dx, dy);

                        if (dist < maxConnDist) {
                            const bothSync = sync1 && sync2;
                            const baseAlpha = bothSync ? 0.32 : 0.06;
                            const lineAlpha = (1 - dist / maxConnDist) * baseAlpha * Math.min(n1.opacity, n2.opacity);

                            ctx.beginPath();
                            ctx.moveTo(n1.x, n1.y);
                            ctx.lineTo(n2.x, n2.y);
                            ctx.strokeStyle = bothSync ? (n1.color === '#00d2ff' ? '#00d2ff' : '#38bdf8') : '#334155';
                            ctx.globalAlpha = lineAlpha;
                            ctx.lineWidth = bothSync ? 1.0 : 0.6;
                            ctx.stroke();
                            ctx.globalAlpha = 1;

                            // Spawn data packets along active connections
                            if (bothSync && Math.random() < 0.0018 && packets.length < 22) {
                                createPacket(n1, n2);
                            }
                        }
                    }
                }
            }

            // 3. Render Moving Data Packets
            for (let i = packets.length - 1; i >= 0; i--) {
                const p = packets[i];
                p.progress += p.speed;

                if (p.progress >= 1) {
                    packets.splice(i, 1);
                    continue;
                }

                const px = p.fromX + (p.toX - p.fromX) * p.progress;
                const py = p.fromY + (p.toY - p.fromY) * p.progress;

                ctx.beginPath();
                ctx.arc(px, py, 2.0, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            // 4. Scanning Line Wave
            if ((phase === 'loading' || isReady) && !isExit) {
                scanY += 3.8;
                if (scanY > height + 50) scanY = -50;

                const grad = ctx.createLinearGradient(0, scanY - 18, 0, scanY + 18);
                grad.addColorStop(0, 'rgba(56, 189, 248, 0)');
                grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.28)');
                grad.addColorStop(1, 'rgba(56, 189, 248, 0)');

                ctx.fillStyle = grad;
                ctx.fillRect(0, scanY - 18, width, 36);
            }

            // 5. Explosive Radial Expansion on Exit
            if (isExit) {
                exitWaveRadius += Math.max(width, height) * 0.045;

                ctx.beginPath();
                ctx.arc(cx, cy, exitWaveRadius, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(0, 210, 255, 0.85)';
                ctx.lineWidth = 4;
                ctx.shadowColor = '#00d2ff';
                ctx.shadowBlur = 30;
                ctx.stroke();
                ctx.shadowBlur = 0;

                const radialGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, exitWaveRadius);
                radialGlow.addColorStop(0, 'rgba(0, 210, 255, 0.22)');
                radialGlow.addColorStop(0.85, 'rgba(56, 189, 248, 0.08)');
                radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.fillStyle = radialGlow;
                ctx.fill();
            }

            animId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animId);
        };
    }, [phase, progress]);

    // Computed HUD metrics for state machine
    const getHudStatus = () => {
        switch (phase) {
            case 'boot':
            case 'network':
                return {
                    net: { text: 'INITIALIZING...', cls: 'init' },
                    sec: { text: 'PENDING...', cls: 'pending' },
                    core: { text: 'PENDING...', cls: 'pending' },
                    exp: { text: 'PENDING...', cls: 'pending' },
                };
            case 'materialize':
                return {
                    net: { text: 'ONLINE', cls: 'online' },
                    sec: { text: 'AUTHENTICATING...', cls: 'init' },
                    core: { text: 'PENDING...', cls: 'pending' },
                    exp: { text: 'PENDING...', cls: 'pending' },
                };
            case 'hud':
                return {
                    net: { text: 'ONLINE', cls: 'online' },
                    sec: { text: 'ACTIVE', cls: 'online' },
                    core: { text: 'INITIALIZING...', cls: 'init' },
                    exp: { text: 'PENDING...', cls: 'pending' },
                };
            case 'loading':
                return {
                    net: { text: 'ONLINE', cls: 'online' },
                    sec: { text: 'ACTIVE', cls: 'online' },
                    core: { text: 'READY', cls: 'online' },
                    exp: { text: 'SYNCHRONIZING...', cls: 'loading' },
                };
            case 'ready':
            case 'exit':
            default:
                return {
                    net: { text: 'ONLINE', cls: 'online' },
                    sec: { text: 'ACTIVE', cls: 'online' },
                    core: { text: 'READY', cls: 'online' },
                    exp: { text: 'READY', cls: 'online' },
                };
        }
    };

    // Contextual system status text driven by network progress
    const getNetworkStatusText = () => {
        if (phase === 'ready' || phase === 'exit' || progress === 100) {
            return "✔ CONNECTION ESTABLISHED";
        }
        if (progress < 25) return "DISCOVERING NETWORK";
        if (progress < 50) return "SYNCHRONIZING NODES";
        if (progress < 75) return "INITIALIZING CORE";
        return "MOUNTING EXPERIENCE";
    };

    const hud = getHudStatus();

    return (
        <div className={`cyber-boot-preloader phase-${phase}`}>
            {/* Background Canvas Network Layer */}
            <canvas ref={canvasRef} className="preloader-canvas-layer" />

            {/* Foreground Content Overlay */}
            <div className="preloader-overlay-content">
                {/* 1. Materialized Logo */}
                {logoText && (
                    <div className="cyber-logo-wrapper">
                        <h1 className="cyber-logo-text">{logoText}</h1>
                        <div className="cyber-logo-sub">KISHORE K V • CYBER NETWORK PORTFOLIO</div>
                    </div>
                )}

                {/* 2. System Initialization HUD */}
                {(phase === 'hud' || phase === 'loading' || phase === 'ready' || phase === 'exit') && (
                    <div className="cyber-hud-card">
                        <div className="hud-header-label">SYSTEM INITIALIZATION TELEMETRY</div>

                        <div className="hud-grid">
                            <div className="hud-item">
                                <span className="hud-key">NETWORK</span>
                                <span className={`hud-val val-${hud.net.cls}`}>
                                    <span className="dot"></span> {hud.net.text}
                                </span>
                            </div>
                            <div className="hud-item">
                                <span className="hud-key">SECURITY</span>
                                <span className={`hud-val val-${hud.sec.cls}`}>
                                    <span className="dot"></span> {hud.sec.text}
                                </span>
                            </div>
                            <div className="hud-item">
                                <span className="hud-key">CORE</span>
                                <span className={`hud-val val-${hud.core.cls}`}>
                                    <span className="dot"></span> {hud.core.text}
                                </span>
                            </div>
                            <div className="hud-item">
                                <span className="hud-key">EXPERIENCE</span>
                                <span className={`hud-val val-${hud.exp.cls}`}>
                                    <span className="dot"></span> {hud.exp.text}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. Refined System Status Subtitle (Circular Loader Removed) */}
                {(phase === 'loading' || phase === 'ready' || phase === 'exit') && (
                    <div className="network-sync-status-container">
                        <div className={`network-sync-status ${progress === 100 ? 'status-ready' : ''}`}>
                            <span className="sync-dot"></span> {getNetworkStatusText()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
