import React, { useRef, forwardRef } from 'react';

const TiltCard = forwardRef(({ children, className = '', ...props }, ref) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!window.matchMedia('(hover: hover)').matches) return;
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x coordinate within element
        const y = e.clientY - rect.top;  // y coordinate within element
        
        // Calculate normalized values (-0.5 to 0.5)
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        
        // Calculate tilt degrees (max 15 degrees)
        const angleX = -((y - yc) / yc) * 15;
        const angleY = ((x - xc) / xc) * 15;
        
        // Apply transformations
        card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        // Restore original transform state smoothly
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    };

    return (
        <div
            ref={(node) => {
                cardRef.current = node;
                if (typeof ref === 'function') {
                    ref(node);
                } else if (ref) {
                    ref.current = node;
                }
            }}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {children}
        </div>
    );
});

TiltCard.displayName = 'TiltCard';

export default TiltCard;

