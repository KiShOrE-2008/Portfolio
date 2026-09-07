import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const contactRef = useRef(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [formStatus, setFormStatus] = useState('');
    const [statusClass, setStatusClass] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useGSAP(() => {
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReducedMotion) return;

        gsap.fromTo('.section-header',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: contactRef.current.querySelector('.section-header'),
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.info-card',
            { x: -35, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: contactRef.current.querySelector('.contact-grid'),
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.form-card',
            { x: 35, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: contactRef.current.querySelector('.contact-grid'),
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.form-group',
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: contactRef.current.querySelector('#contactForm'),
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, { scope: contactRef });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !message.trim()) {
            setFormStatus('Oops! Please fill in all fields before sending.');
            setStatusClass('error');
            return;
        }

        setIsSubmitting(true);
        setFormStatus('');
        setStatusClass('');

        try {
            const response = await fetch('https://formsubmit.co/ajax/kv.kishorevijay@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    message: message.trim()
                })
            });

            if (response.ok) {
                setFormStatus(`Thank you, ${name}! Your message has been sent successfully.`);
                setStatusClass('success');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Contact Form Submission Error:', error);
            setFormStatus('Oops! Something went wrong while sending your message. Please try again later.');
            setStatusClass('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const [copiedEmail, setCopiedEmail] = useState(false);

    const handleCopyEmail = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText('kv.kishorevijay@gmail.com');
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2200);
    };

    return (
        <div ref={contactRef} className="contact-container-inner" style={{ width: '100%' }}>
            <div className="section-header">
                <span className="section-technical-tag">09 // CONTACT</span>
                <h2 className="section-title">Get In Touch</h2>
                <div className="section-divider"></div>
            </div>

            <div className="contact-grid">
                {/* Contact Direct Card */}
                <div className="contact-card info-card">
                    <div className="telemetry-channel-badge">
                        <span className="channel-dot"></span>
                        <span>SECURE CHANNEL • AES-256 ONLINE</span>
                    </div>

                    <h3>Contact Information</h3>
                    <p>Have an interesting project, dynamic challenge, or simply want to chat about networking and security? Drop me a line!</p>

                    <div className="contact-methods">
                        <div className="method-item email-method-item" onClick={handleCopyEmail}>
                            <span className="method-icon">
                                <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/gmail.webp" alt="Email" width="22" height="22" style={{ objectFit: 'contain', verticalAlign: 'middle' }} />
                            </span>
                            <div className="method-details">
                                <span className="method-label">Email</span>
                                <span className="method-val">kv.kishorevijay@gmail.com</span>
                            </div>
                            <button className="copy-email-btn" type="button" aria-label="Copy Email">
                                {copiedEmail ? '✓ Copied' : 'Copy ⧉'}
                            </button>
                        </div>
                        <div className="method-item">
                            <span className="method-icon">
                                <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/google-maps.webp" alt="Location" width="22" height="22" style={{ objectFit: 'contain', verticalAlign: 'middle' }} />
                            </span>
                            <div className="method-details">
                                <span className="method-label">Location</span>
                                <span className="method-val">Chennai, Tamil Nadu, India</span>
                            </div>
                        </div>
                    </div>

                    <div className="contact-social-row">
                        <a href="https://github.com/KiShOrE-2008" target="_blank" rel="noopener noreferrer"
                            className="social-btn" id="contactSocialGithub">GitHub</a>
                        <a href="https://www.linkedin.com/in/kishore-k-v-090491349/" target="_blank"
                            rel="noopener noreferrer" className="social-btn" id="contactSocialLinkedin">
                            <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/linkedin.webp" alt="LinkedIn" width="16" height="16" style={{ objectFit: 'contain', verticalAlign: 'middle', marginRight: '6px' }} />
                            LinkedIn
                        </a>
                    </div>
                </div>

                {/* Interactive Contact Form */}
                <div className="contact-card form-card">
                    <form id="contactForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="contactName">Name</label>
                            <input 
                                type="text" 
                                id="contactName" 
                                name="name" 
                                required 
                                placeholder="Your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactEmail">Email</label>
                            <input 
                                type="email" 
                                id="contactEmail" 
                                name="email" 
                                required 
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactMessage">Message</label>
                            <textarea 
                                id="contactMessage" 
                                name="message" 
                                rows="5" 
                                required
                                placeholder="Tell me about your project..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="btn btn-primary btn-block contact-send-btn" 
                            id="contactSubmitBtn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : <>Send Message <span className="btn-arrow-icon">→</span></>}
                        </button>
                        
                        {formStatus && (
                            <div className={`form-status ${statusClass}`} id="formStatus">
                                {formStatus}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
