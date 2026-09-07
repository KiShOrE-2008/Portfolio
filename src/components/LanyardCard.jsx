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
        rotation: 0,
        targetRotation: 0,
        tiltX: 0,
        tiltY: 0,
        targetTiltX: 0,
        targetTiltY: 0,
        velocity: 0,
        isDragging: false,
        startX: 0,
        startRotation: 0,
        lastX: 0,
        hasMoved: false,
        isSpinning: false,
        spinProgress: 0,
        spinStartAngle: 0
    });

    const rAFRef = useRef(null);

    // 60FPS / 120FPS Continuous Physics & Render Loop
    useEffect(() => {
        let lastTime = performance.now();

        const updatePhysics = (now) => {
            const dt = Math.min((now - lastTime) / 1000, 0.033);
            lastTime = now;

            const s = state.current;

            if (s.isSpinning) {
                // 360° Spin Animation
                s.spinProgress += dt / 1.1; // 1.1s duration
                if (s.spinProgress >= 1) {
                    s.isSpinning = false;
                    s.spinProgress = 1;
                    s.rotation = 0;
                    s.targetRotation = 0;
                    s.velocity = 0;
                } else {
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - s.spinProgress, 3);
                    s.rotation = s.spinStartAngle + 360 * eased;
                }
            } else if (s.isDragging) {
                // Ultra-smooth Lerp while dragging (eliminates raw mouse jitter)
                s.rotation += (s.targetRotation - s.rotation) * 0.35;
                s.tiltX += (s.targetTiltX - s.tiltX) * 0.25;
                s.tiltY += (s.targetTiltY - s.tiltY) * 0.25;
            } else {
                // Damped Pendulum Physics Spring-Back (Correct non-inverted physics)
                const k = 45; // Spring stiffness
                const damping = 6; // Damping constant
                const force = -k * s.rotation - damping * s.velocity;
                s.velocity += force * dt;
                s.rotation += s.velocity * dt;

                // Snap to zero when settled
                if (Math.abs(s.rotation) < 0.05 && Math.abs(s.velocity) < 0.05) {
                    s.rotation = 0;
                    s.velocity = 0;
                }

                // Damp hover tilt back to zero
                s.tiltX += (s.targetTiltX - s.tiltX) * 0.2;
                s.tiltY += (s.targetTiltY - s.tiltY) * 0.2;
            }

            // Apply direct hardware-accelerated transforms (0 React re-renders = 100% fluid)
            if (armRef.current) {
                armRef.current.style.transform = `rotate(${s.rotation}deg)`;
            }

            if (cardRef.current) {
                const shadowOffsetX = -s.rotation * 0.6;
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
        s.isDragging = true;
        s.isSpinning = false;
        s.startX = e.clientX;
        s.lastX = e.clientX;
        s.startRotation = s.rotation;
        s.velocity = 0;
        s.hasMoved = false;
        if (armRef.current) armRef.current.classList.add('is-dragging');
        e.target.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e) => {
        const s = state.current;
        if (s.isDragging) {
            const deltaX = e.clientX - s.startX;
            if (Math.abs(deltaX) > 4) {
                s.hasMoved = true;
            }

            // Calculate instantaneous drag velocity in degrees/sec (negative angle change for rightward movement)
            const dx = e.clientX - s.lastX;
            s.velocity = -dx * 1.8; // Clean velocity scaling
            s.lastX = e.clientX;

            // Target rotation (Mouse RIGHT => card swings RIGHT towards mouse)
            const sensitivity = 0.32;
            s.targetRotation = Math.max(-65, Math.min(65, s.startRotation - deltaX * sensitivity));

            // Target tilt
            s.targetTiltX = -4;
            s.targetTiltY = Math.max(-12, Math.min(12, -deltaX * 0.12));
        } else {
            // Hover 3D tilt
            const card = cardRef.current;
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            s.targetTiltX = ((y - centerY) / centerY) * -10;
            s.targetTiltY = ((x - centerX) / centerX) * 10;
        }
    };

    const handlePointerUp = (e) => {
        const s = state.current;
        if (!s.isDragging) return;
        s.isDragging = false;
        if (armRef.current) armRef.current.classList.remove('is-dragging');

        if (!s.hasMoved) {
            // Clicked without drag => trigger 360° spin
            triggerFull360Spin();
        } else {
            // Release drag => pendulum spring back handles motion automatically!
            s.targetTiltX = 0;
            s.targetTiltY = 0;
        }
    };

    const triggerFull360Spin = () => {
        const s = state.current;
        s.isSpinning = true;
        s.spinProgress = 0;
        s.spinStartAngle = s.rotation;
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

                    {/* Metallic Gradient Banner Header */}
                    <div className="lanyard-banner"></div>

                    {/* Avatar Ring & Status Dot */}
                    <div className="lanyard-avatar-wrapper">
                        <div className="avatar-gradient-ring">
                            <div className="lanyard-avatar">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                    />
                                    <path
                                        d="M20.59 22C20.59 18.13 16.746 15 12 15C7.254 15 3.41 18.13 3.41 22"
                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Main Card Body Info */}
                    <div className="lanyard-info">
                        <h3 className="lanyard-name">Kishore K V</h3>
                        <div className="lanyard-role-badge">Cybersecurity & Software Engineer</div>

                        {/* Metadata Grid */}
                        <div className="lanyard-meta-grid">
                            <div className="meta-box">
                                <span className="meta-lbl">SPECIALTY</span>
                                <span className="meta-val">Cybersecurity & IT</span>
                            </div>
                            <div className="meta-box">
                                <span className="meta-lbl">LOCATION</span>
                                <span className="meta-val" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/google-maps.webp" alt="Location" width="13" height="13" style={{ objectFit: 'contain' }} />
                                    Chennai, India
                                </span>
                            </div>
                            <div className="meta-box">
                                <span className="meta-lbl">EXPERIENCE</span>
                                <span className="meta-val">B.Tech IT (CIT)</span>
                            </div>
                            <div className="meta-box">
                                <span className="meta-lbl">STATUS</span>
                                <span className="meta-val status-active">
                                    <span className="status-dot"></span> Active
                                </span>
                            </div>
                        </div>

                        {/* Bottom Barcode Section with Exact Heights Array */}
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
                                <span className="code-id">KV-89240-PRO</span>
                                <span className="brand-id">LIGHTSWIND UI</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <span className="lanyard-hint">Drag or click for 360° spin</span>
        </div>
    );
}
