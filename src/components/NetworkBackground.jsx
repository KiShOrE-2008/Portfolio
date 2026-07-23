import React, { useEffect, useRef } from 'react';

export default function NetworkBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const particleCount = 130;
        const connectionDistance = 130;
        const mouseRadius = 150;
        const particles = [];
        const mouse = { x: null, y: null };

        // Handle resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        // Handle mouse move
        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                // Speeds (slow, floating drift)
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 1.5 + 1; // 1px to 2.5px
                
                // Color selection: 75% cyan-blue, 17% purple, 8% mild green
                const rand = Math.random();
                if (rand < 0.75) {
                    this.color = 'rgba(56, 189, 248, 0.75)'; // Cyan-blue
                } else if (rand < 0.92) {
                    this.color = 'rgba(139, 92, 246, 0.75)'; // Purple
                } else {
                    this.color = 'rgba(34, 197, 94, 0.7)'; // Mild Green
                }
            }

            update(deltaScroll) {
                this.x += this.vx;
                this.y += this.vy - deltaScroll;

                // Bounce off left/right edges
                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                
                // Wrap top/bottom edges and disperse coordinates to prevent horizontal clustering
                if (this.y < 0) {
                    this.y = canvas.height - Math.random() * (canvas.height * 0.5);
                    this.x = Math.random() * canvas.width;
                }
                if (this.y > canvas.height) {
                    this.y = Math.random() * (canvas.height * 0.5);
                    this.x = Math.random() * canvas.width;
                }

                // Mouse interaction (slight push away)
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < mouseRadius) {
                        const force = (mouseRadius - dist) / mouseRadius;
                        const angle = Math.atan2(dy, dx);
                        // Gently nudge the particle
                        this.x += Math.cos(angle) * force * 1.2;
                        this.y += Math.sin(angle) * force * 1.2;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        let lastScrollY = window.scrollY;

        // Animation Loop
        const animate = () => {
            const currentScrollY = window.scrollY;
            const deltaScroll = (currentScrollY - lastScrollY) * 0.85;
            lastScrollY = currentScrollY;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update & Draw particles
            particles.forEach((p) => {
                p.update(deltaScroll);
                p.draw();
            });

            // Draw connections between nodes
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < connectionDistance) {
                        // Opacity fades as distance increases
                        const opacity = (1 - dist / connectionDistance) * 0.38; // Increased connection line opacity
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        
                        // Use a mild green connection if BOTH particles are green
                        if (p1.color.includes('34, 197, 94') && p2.color.includes('34, 197, 94')) {
                            ctx.strokeStyle = `rgba(34, 197, 94, ${opacity * 0.8})`;
                        } else {
                            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`; // Purple connection line
                        }
                        ctx.lineWidth = 0.9;
                        ctx.stroke();
                    }
                }

                // Draw connection to mouse pointer
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = p1.x - mouse.x;
                    const dy = p1.y - mouse.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < mouseRadius) {
                        const opacity = (1 - dist / mouseRadius) * 0.55; // Increased mouse connector line opacity
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`; // Cyan connector to mouse
                        ctx.lineWidth = 1.1;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="network-canvas" />;
}
