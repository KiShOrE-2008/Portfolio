import React, { useEffect, useRef, useState } from 'react';

export default function ScrollSection({ id, className = '', children }) {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                // Once it is visible, we stop observing to keep it visible
                observer.unobserve(entry.target);
            }
        }, {
            threshold: 0.15
        });

        const currentSection = sectionRef.current;
        if (currentSection) {
            observer.observe(currentSection);
        }

        return () => {
            if (currentSection) {
                observer.unobserve(currentSection);
            }
        };
    }, []);

    return (
        <section
            id={id}
            ref={sectionRef}
            className={`section ${className} ${isVisible ? 'visible' : ''}`}
        >
            {children}
        </section>
    );
}
