import React, { useEffect, useRef, useState } from 'react';

export default function MouseTrailCursor() {
    const cursorDotRef = useRef(null);
    const cursorRingRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only run on desktop devices with hover support
        if (!window.matchMedia('(hover: hover)').matches) return;

        setIsVisible(true);

        const mouse = { x: -100, y: -100, targetX: -100, targetY: -100, vx: 0, vy: 0 };
        const ring = { x: -100, y: -100, angle: 0, scaleX: 1, scaleY: 1 };
        let animationFrameId;

        const handleMouseMove = (e) => {
            mouse.targetX = e.clientX;
            mouse.targetY = e.clientY;
        };

        const handleMouseDown = () => setIsMouseDown(true);
        const handleMouseUp = () => setIsMouseDown(false);

        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('.bento-project-card') ||
                target.closest('.cyber-project-card') ||
                target.closest('.skill-card-box') ||
                target.closest('.lanyard-card') ||
                target.closest('.fixed-pivot-pin') ||
                target.closest('.chip-btn') ||
                target.closest('.filter-pill-btn') ||
                target.closest('.cli-nav-btn')
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        // 120 FPS Spring Lerp Animation Loop (Skiper UI skiper61 physics)
        const animate = () => {
            // Direct dot tracking
            mouse.x += (mouse.targetX - mouse.x) * 0.45;
            mouse.y += (mouse.targetY - mouse.y) * 0.45;

            // Trailing ring lerp tracking
            const prevRingX = ring.x;
            const prevRingY = ring.y;
            ring.x += (mouse.targetX - ring.x) * 0.15;
            ring.y += (mouse.targetY - ring.y) * 0.15;

            // Velocity calculation for dynamic directional stretching
            const dx = ring.x - prevRingX;
            const dy = ring.y - prevRingY;
            const speed = Math.hypot(dx, dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            // Stretch ring according to velocity speed
            const stretch = Math.min(speed * 0.04, 0.45);
            ring.scaleX = 1 + stretch;
            ring.scaleY = 1 - stretch * 0.5;
            ring.angle = angle;

            // Apply transforms
            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
            }

            if (cursorRingRef.current) {
                cursorRingRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) rotate(${ring.angle}deg) scale(${ring.scaleX}, ${ring.scaleY})`;
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className={`skiper-mouse-container ${isHovered ? 'hovered' : ''} ${isMouseDown ? 'active' : ''}`}>
            {/* Center Pointer Dot */}
            <div ref={cursorDotRef} className="skiper-cursor-dot" />

            {/* Trailing Spring Velocity Ring (Skiper61) */}
            <div ref={cursorRingRef} className="skiper-cursor-ring">
                <div className="ring-inner-glow" />
            </div>
        </div>
    );
}
