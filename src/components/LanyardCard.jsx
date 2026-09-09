import React, { useRef, useEffect } from 'react';

const barcodeBars = [
    { width: '3.5px', height: '50%' },
    { width: '1px', height: '94.3%' },
    { width: '2px', height: '65.1%' },
    { width: '1px', height: '10.8%' },
    { width: '3.5px', height: '21.6%' },
    { width: '1px', height: '79.6%' },
    { width: '2px', height: '88.5%' },
    { width: '1px', height: '33.5%' },
    { width: '3.5px', height: '5.9%' },
    { width: '1px', height: '51.5%' },
    { width: '2px', height: '94.6%' },
    { width: '1px', height: '63.6%' },
    { width: '3.5px', height: '10.1%' },
    { width: '1px', height: '22.8%' },
    { width: '2px', height: '80.7%' },
    { width: '1px', height: '87.6%' },
    { width: '3.5px', height: '32.1%' },
    { width: '1px', height: '6.3%' },
    { width: '2px', height: '53.0%' },
    { width: '1px', height: '94.8%' },
    { width: '3.5px', height: '62.2%' },
    { width: '1px', height: '9.4%' },
    { width: '2px', height: '24.0%' },
    { width: '1px', height: '81.8%' },
    { width: '3.5px', height: '86.8%' },
    { width: '1px', height: '30.7%' },
    { width: '2px', height: '6.7%' },
    { width: '1px', height: '54.5%' },
    { width: '3.5px', height: '94.9%' },
    { width: '1px', height: '60.7%' },
    { width: '2px', height: '8.8%' },
    { width: '1px', height: '25.3%' },
    { width: '3.5px', height: '82.8%' },
    { width: '1px', height: '85.9%' },
    { width: '2px', height: '29.4%' },
    { width: '1px', height: '7.1%' }
];

export default function LanyardCard() {
    const armRef = useRef(null);
    const cardRef = useRef(null);

    // Physics State Refs (bypass React re-render churn for 120fps smoothness)
    const state = useRef({
        rotation: -30,         // Initial swing offset on drop
        tiltX: -12,
        tiltY: 10,
        targetTiltX: 0,
        targetTiltY: 0,
        velocity: 140,         // Initial pendulum momentum when landing
        dropY: -320,           // Starts 320px above hanging position
        dropVel: 0,            // Downward drop speed
        isDropping: true,      // Entry drop phase flag
        isDragging: false,
        dragRotation: 0,       // Direct mouse-mapped rotation during drag
        lastClientX: 0,
        lastMoveTime: 0,
        hasMoved: false,
        isSpinning: false,
        spinProgress: 0,
        spinStartAngle: 0,
    });

    const rAFRef = useRef(null);

    // Continuous Physics & Render Loop
    useEffect(() => {
        let lastTime = performance.now();

        const updatePhysics = (now) => {
            const rawDt = (now - lastTime) / 1000;
            const dt = Math.min(rawDt, 0.05);
            lastTime = now;

            const s = state.current;

            // Frame-rate independent smoothing factor
            const smooth = (factor, delta) => 1 - Math.pow(1 - factor, delta * 60);

            // Startup Drop-Down Physics (Card drops from above and bounces off ribbon strap tension)
            if (s.isDropping) {
                const gravity = 2200; // px/s^2
                s.dropVel += gravity * dt;
                s.dropY += s.dropVel * dt;

                if (s.dropY >= 0) {
                    s.dropY = 0;
                    if (Math.abs(s.dropVel) > 60) {
                        s.dropVel = -s.dropVel * 0.32; // Ribbon elastic bounce
                        s.velocity += 140;             // Transfer drop impact into pendulum swing
                    } else {
                        s.dropVel = 0;
                        s.isDropping = false;
                    }
                }
            }

            if (s.isDragging) {
                s.isDropping = false;
                s.dropY = 0;

                // Unconstrained 360° responsive drag tracking — card follows pointer freely around 360 degrees
                const dragSmooth = smooth(0.95, dt);
                s.rotation += (s.dragRotation - s.rotation) * dragSmooth;

                const rad = (s.rotation * Math.PI) / 180;
                s.targetTiltX = -6 * Math.cos(rad);
                s.targetTiltY = Math.max(-25, Math.min(25, -Math.sin(rad) * 25));

                const tiltSmooth = smooth(0.3, dt);
                s.tiltX += (s.targetTiltX - s.tiltX) * tiltSmooth;
                s.tiltY += (s.targetTiltY - s.tiltY) * tiltSmooth;
            } else {
                // Non-Linear 360° Gravitational Pendulum Dynamics (Applies to both free swing & click impulses)
                const rad = (s.rotation * Math.PI) / 180;
                const gravityTorque = -Math.sin(rad) * 450; // restoring acceleration pulling down towards bottom (0°, 360°, etc.)
                const damping = 1.1;                        // air resistance damping for natural 360° swings

                const force = gravityTorque - damping * s.velocity;
                s.velocity += force * dt;
                s.rotation += s.velocity * dt;

                // Dynamic 3D tilt adhering to 360° position and velocity
                s.targetTiltX = Math.max(-15, Math.min(15, -Math.abs(Math.sin(rad)) * 14));
                s.targetTiltY = Math.max(-25, Math.min(25, -Math.sin(rad) * 25 + s.velocity * 0.015));

                // Settling check near stable bottom equilibrium
                if (Math.abs(s.velocity) < 0.05 && Math.abs(Math.sin(rad)) < 0.005) {
                    s.rotation = s.rotation % 360;
                    if (Math.abs(s.rotation) < 2) s.rotation = 0;
                    s.velocity = 0;
                    s.targetTiltX = 0;
                    s.targetTiltY = 0;
                }

                const tiltSmooth = smooth(0.2, dt);
                s.tiltX += (s.targetTiltX - s.tiltX) * tiltSmooth;
                s.tiltY += (s.targetTiltY - s.tiltY) * tiltSmooth;
            }

            // Apply transforms
            if (armRef.current) {
                armRef.current.style.transform = `translate3d(0, ${s.dropY}px, 0) rotate(${s.rotation}deg)`;
            }

            if (cardRef.current) {
                const shadowOffsetX = -Math.sin((s.rotation * Math.PI) / 180) * 25;
                cardRef.current.style.transform = `perspective(1000px) rotateX(${s.tiltX}deg) rotateY(${s.tiltY}deg)`;
                cardRef.current.style.boxShadow = `${shadowOffsetX}px 25px 50px rgba(0, 0, 0, 0.45), 0 8px 20px rgba(0, 0, 0, 0.25)`;
            }

            rAFRef.current = requestAnimationFrame(updatePhysics);
        };

        rAFRef.current = requestAnimationFrame(updatePhysics);

        return () => {
            if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
        };
    }, []);

    // Pointer Handlers
    const handlePointerDown = (e) => {
        const s = state.current;
        s.isDropping = false;
        s.dropY = 0;
        s.isDragging = true;
        s.isSpinning = false;
        s.lastClientX = e.clientX;
        s.lastMoveTime = performance.now();
        s.dragRotation = s.rotation; // Start smoothly from current angle
        s.velocity = 0;
        s.hasMoved = false;
        if (armRef.current) armRef.current.classList.add('is-dragging');
        if (e.target && e.target.setPointerCapture) {
            e.target.setPointerCapture(e.pointerId);
        }
    };

    const handlePointerMove = (e) => {
        const s = state.current;
        if (s.isDragging) {
            const dx = e.clientX - s.lastClientX;

            if (Math.abs(dx) > 0.5) {
                s.hasMoved = true;
            }

            // Continuous 360° unconstrained dragging with refined sensitivity
            const sensitivity = 0.45;
            s.dragRotation = s.dragRotation - dx * sensitivity;

            // Instantaneous velocity calculation for realistic 360° flick momentum
            const now = performance.now();
            const timeDelta = Math.max(now - s.lastMoveTime, 1);
            const instantVel = (-dx / timeDelta) * 1000 * sensitivity; // deg/sec
            s.velocity = s.velocity * 0.4 + instantVel * 0.6;

            s.lastClientX = e.clientX;
            s.lastMoveTime = now;
        } else {
            // Hover 3D tilt
            const card = cardRef.current;
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            s.targetTiltX = ((y - centerY) / centerY) * -12;
            s.targetTiltY = ((x - centerX) / centerX) * 12;
        }
    };

    const triggerFull360Spin = (e) => {
        const s = state.current;
        s.isSpinning = false;
        
        // Determine spin direction based on click position relative to card center
        let direction = 1;
        if (e && cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            if (e.clientX < centerX) {
                direction = -1;
            }
        }

        // Impart a balanced free physics rotational momentum impulse (1250 deg/sec)
        const impulse = 1250;
        if (Math.abs(s.velocity) < 300) {
            s.velocity = impulse * direction;
        } else {
            s.velocity += Math.sign(s.velocity || direction) * impulse * 0.7;
        }
    };

    const handlePointerUp = (e) => {
        const s = state.current;
        if (!s.isDragging) return;
        s.isDragging = false;
        if (armRef.current) armRef.current.classList.remove('is-dragging');
        if (e.target && e.target.hasPointerCapture && e.target.hasPointerCapture(e.pointerId)) {
            e.target.releasePointerCapture(e.pointerId);
        }

        if (!s.hasMoved) {
            // Clicked without drag => trigger free 360° physics impulse spin
            triggerFull360Spin(e);
        } else {
            // Release drag: retain velocity momentum up to 1500 deg/sec
            const timeSinceLastMove = performance.now() - s.lastMoveTime;
            if (timeSinceLastMove > 80) {
                s.velocity = 0;
            } else {
                s.velocity = Math.max(-1500, Math.min(1500, s.velocity));
            }
        }
    };

    const handleMouseLeave = () => {
        const s = state.current;
        if (!s.isDragging) {
            s.targetTiltX = 0;
            s.targetTiltY = 0;
        }
    };

    return (
        <div className="lanyard-container">
            {/* Fixed Top Pivot Attachment Pin (Does NOT move) */}
            <div
                className="fixed-pivot-pin"
                title="Fixed Pivot Anchor"
                onClick={triggerFull360Spin}
            ></div>

            {/* Rotating Arm (Origin at Top Center - Pendulum Rotation Around Fixed Pivot) */}
            <div
                ref={armRef}
                className="rotating-arm"
                style={{
                    transformOrigin: 'center top',
                    willChange: 'transform',
                    marginTop: '-6px'
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onMouseLeave={handleMouseLeave}
            >
                {/* SVG Lanyard Strap, Metallic Header & Clip Hook */}
                <div style={{ pointerEvents: 'none' }}>
                    <svg
                        width="44"
                        height="113"
                        viewBox="0 0 44 113"
                        style={{ display: 'block', margin: '0 auto', overflow: 'visible' }}
                    >
                        <defs>
                            <linearGradient id="metalDark" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#71717a" />
                                <stop offset="35%" stopColor="#27272a" />
                                <stop offset="70%" stopColor="#52525b" />
                                <stop offset="100%" stopColor="#18181b" />
                            </linearGradient>
                            <linearGradient id="hookDark" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#52525b" />
                                <stop offset="40%" stopColor="#18181b" />
                                <stop offset="100%" stopColor="#3f3f46" />
                            </linearGradient>
                            <linearGradient id="strapHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
                                <stop offset="25%" stopColor="#ffffff" stopOpacity="0.12" />
                                <stop offset="75%" stopColor="#ffffff" stopOpacity="0.05" />
                                <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
                            </linearGradient>
                        </defs>
                        <rect x="12" y="0" width="20" height="79" rx="2" fill="#27272a" />
                        <rect x="12" y="0" width="20" height="79" rx="2" fill="url(#strapHighlight)" />
                        <line x1="13.5" y1="0" x2="13.5" y2="79" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="0.75" strokeDasharray="3 2" />
                        <line x1="30.5" y1="0" x2="30.5" y2="79" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="0.75" strokeDasharray="3 2" />
                        <rect x="10" y="75" width="24" height="10" rx="2.5" fill="url(#metalDark)" stroke="#18181b" strokeWidth="0.8" />
                        <circle cx="13.5" cy="80" r="1.3" fill="#a1a1aa" />
                        <circle cx="30.5" cy="80" r="1.3" fill="#a1a1aa" />
                        <path d="M 15 84 C 15 91, 29 91, 29 84" fill="none" stroke="url(#metalDark)" strokeWidth="3" strokeLinecap="round" />
                        <rect x="19" y="87" width="6" height="6" rx="1" fill="url(#metalDark)" />
                        <path d="M 20 92 L 20 99 C 20 108, 24 108, 24 99 L 24 92" fill="none" stroke="url(#hookDark)" strokeWidth="3.5" strokeLinecap="round" />
                        <line x1="20.5" y1="94" x2="20.5" y2="103" stroke="#d4d4d8" strokeWidth="1.2" />
                    </svg>
                </div>

                {/* Glassmorphic Badge Card Body (Overlaps metallic hook) */}
                <div
                    ref={cardRef}
                    className="lanyard-card glass-panel"
                    style={{
                        marginTop: '-16px',
                        willChange: 'transform, box-shadow'
                    }}
                >
                    {/* Top Clip Hole Slot */}
                    <div className="lanyard-card-clip-slot">
                        <div className="clip-slot-outer">
                            <div className="clip-slot-inner"></div>
                        </div>
                    </div>

                    {/* Gradient Banner Header */}
                    <div className="lanyard-banner"></div>

                    {/* Avatar Ring overlapping banner */}
                    <div className="lanyard-avatar-wrapper">
                        <div className="avatar-gradient-ring">
                            <div className="lanyard-avatar" title="Kishore K V">
                                <img src="/images/kishore_avatar.png" alt="Kishore K V Profile" />
                            </div>
                        </div>
                    </div>

                    {/* Main Card Body Info */}
                    <div className="lanyard-info">
                        <h3 className="lanyard-name">Kishore K V</h3>
                        <div className="lanyard-role-badge">Cybersecurity • Networking</div>

                        {/* Metadata Grid (2x2) */}
                        <div className="lanyard-meta-grid">
                            <div className="meta-box">
                                <span className="meta-lbl">SPECIALTY</span>
                                <span className="meta-val">Cybersecurity &amp; Networking</span>
                            </div>
                            <div className="meta-box">
                                <span className="meta-lbl">LOCATION</span>
                                <span className="meta-val" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/google-maps.webp" alt="Location" width="13" height="13" style={{ objectFit: 'contain' }} />
                                    Chennai, India
                                </span>
                            </div>
                            <div className="meta-box">
                                <span className="meta-lbl">EDUCATION</span>
                                <span className="meta-val">B.Tech IT</span>
                            </div>
                            <div className="meta-box">
                                <span className="meta-lbl">STATUS</span>
                                <span className="meta-val status-active">
                                    <span className="status-dot"></span> Open to Work
                                </span>
                            </div>
                        </div>

                        {/* Bottom Barcode Section */}
                        <div className="lanyard-barcode-box">
                            <div className="barcode-bars-container">
                                {barcodeBars.map((bar, idx) => (
                                    <div
                                        key={idx}
                                        className="barcode-bar-item"
                                        style={{ width: bar.width, height: bar.height }}
                                    ></div>
                                ))}
                            </div>
                            <div className="barcode-labels-row">
                                <span className="code-id">KKV-2026</span>
                                <span className="brand-id">KISHORE.KV</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <span className="lanyard-hint">Drag or click for 360° spin</span>
        </div>
    );
}
