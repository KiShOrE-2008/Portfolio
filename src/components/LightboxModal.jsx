import React, { useEffect } from 'react';

const internshipImages = Array.from({ length: 7 }, (_, i) => ({
    src: `/images/internship_${i + 1}.jpg`,
    caption: `Uttar Pradesh Police Cyber Security Internship - Photo ${i + 1}`
}));

export default function LightboxModal({ isOpen, onClose, currentImgIndex, setCurrentImgIndex }) {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowRight') {
                setCurrentImgIndex((prev) => (prev + 1) % internshipImages.length);
            } else if (e.key === 'ArrowLeft') {
                setCurrentImgIndex((prev) => (prev - 1 + internshipImages.length) % internshipImages.length);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, setCurrentImgIndex]);

    if (!isOpen) return null;

    const currentImg = internshipImages[currentImgIndex];

    const showNextImage = (e) => {
        e.stopPropagation();
        setCurrentImgIndex((prev) => (prev + 1) % internshipImages.length);
    };

    const showPrevImage = (e) => {
        e.stopPropagation();
        setCurrentImgIndex((prev) => (prev - 1 + internshipImages.length) % internshipImages.length);
    };

    return (
        <div 
            id="imageModal" 
            className="image-modal open" 
            style={{ display: 'flex' }}
            onClick={onClose}
            aria-hidden="false"
        >
            <button 
                className="modal-close" 
                id="modalClose" 
                aria-label="Close image popup" 
                onClick={onClose}
            >
                &times;
            </button>
            
            {/* Navigation Buttons */}
            <button 
                className="modal-prev" 
                id="modalPrev" 
                aria-label="Previous image" 
                onClick={showPrevImage}
            >
                &#10094;
            </button>
            <button 
                className="modal-next" 
                id="modalNext" 
                aria-label="Next image" 
                onClick={showNextImage}
            >
                &#10095;
            </button>
            
            <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
                <div className="modal-counter" id="modalCounter">
                    {currentImgIndex + 1} / {internshipImages.length}
                </div>
                <img 
                    className="modal-image" 
                    id="modalImage" 
                    src={currentImg.src} 
                    alt={currentImg.caption} 
                />
                <div className="modal-caption" id="modalCaption">
                    {currentImg.caption}
                </div>
            </div>
        </div>
    );
}
