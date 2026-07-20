import React, { useState } from 'react';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [formStatus, setFormStatus] = useState('');
    const [statusClass, setStatusClass] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        setFormStatus('');
        setStatusClass('');

        // Simulate server POST request
        setTimeout(() => {
            setIsSubmitting(false);

            if (name.trim() && email.trim() && message.trim()) {
                setFormStatus(`Thank you, ${name}! Your message has been sent successfully.`);
                setStatusClass('success');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setFormStatus('Oops! Please fill in all fields before sending.');
                setStatusClass('error');
            }
        }, 1200);
    };

    return (
        <section id="contact" className="section contact-section">
            <div className="section-header">
                <h2 className="section-title">Get In Touch</h2>
                <div className="section-divider"></div>
            </div>

            <div className="contact-grid">
                {/* Contact Direct Card */}
                <div className="contact-card info-card">
                    <h3>Contact Information</h3>
                    <p>Have an interesting project, dynamic challenge, or simply want to chat about networking and
                        security? Drop me a line!</p>

                    <div className="contact-methods">
                        <a href="mailto:kv.kishorevijay@gmail.com" className="method-item" id="contactEmailLink">
                            <span className="method-icon">📧</span>
                            <div className="method-details">
                                <span className="method-label">Email</span>
                                <span className="method-val">kv.kishorevijay@gmail.com</span>
                            </div>
                        </a>
                        <div className="method-item">
                            <span className="method-icon">📍</span>
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
                            rel="noopener noreferrer" className="social-btn" id="contactSocialLinkedin">LinkedIn</a>
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
                                placeholder="John Doe"
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
                                placeholder="john@example.com"
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
                                placeholder="Your message here..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="btn btn-primary btn-block" 
                            id="contactSubmitBtn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                        
                        {formStatus && (
                            <div className={`form-status ${statusClass}`} id="formStatus">
                                {formStatus}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
