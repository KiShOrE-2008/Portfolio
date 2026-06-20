document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navbar Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // Navbar scroll effect
    const mainNavbar = document.getElementById('mainNavbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainNavbar.classList.add('scrolled');
        } else {
            mainNavbar.classList.remove('scrolled');
        }
    });

    // 2. Typing Effect
    const typedTextSpan = document.getElementById('typedText');
    const textArray = [
        "B.Tech Information Technology Student",
        "Cybersecurity Enthusiast",
        "Networking & Traffic Analyst",
        "Smart IoT System builder"
    ];
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingSpeed + 500);
        }
    }

    if (typedTextSpan) {
        setTimeout(type, newTextDelay - 1000);
    }

    // 3. Dynamic 3D Tilt Effect on Cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
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
        });
        
        card.addEventListener('mouseleave', () => {
            // Restore original transform state smoothly
            card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // 4. Background Radial Glow Follower
    const radialGlow1 = document.getElementById('radialGlow1');
    const radialGlow2 = document.getElementById('radialGlow2');

    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        
        if (radialGlow1) {
            radialGlow1.style.transform = `translate(${clientX - window.innerWidth / 2}px, ${clientY - window.innerHeight / 2}px)`;
        }
    });

    // 5. Skills Tab Selection switcher
    const tabBtns = document.querySelectorAll('.tab-btn');
    const skillGrids = document.querySelectorAll('.skills-grid');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetCategory = btn.getAttribute('data-target');
            
            // Toggle buttons active class
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Toggle corresponding grid visibility
            skillGrids.forEach(grid => {
                const gridId = grid.getAttribute('id');
                if (gridId.toLowerCase().includes(targetCategory.toLowerCase())) {
                    grid.classList.add('active');
                } else {
                    grid.classList.remove('active');
                }
            });
        });
    });

    // 6. Intersection Observer for Scroll Fade-In Effects & Active Link highlighting
    const sections = document.querySelectorAll('.section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Active Navigation Highlighting
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 250)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // 7. Contact Form Simulation logic
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const contactSubmitBtn = document.getElementById('contactSubmitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;

            // Set loading state
            contactSubmitBtn.disabled = true;
            contactSubmitBtn.textContent = 'Sending...';
            formStatus.textContent = '';
            formStatus.className = 'form-status';

            // Simulate server post action
            setTimeout(() => {
                contactSubmitBtn.disabled = false;
                contactSubmitBtn.textContent = 'Send Message';
                
                if (name && email && message) {
                    formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
                    formStatus.classList.add('success');
                    contactForm.reset();
                } else {
                    formStatus.textContent = 'Oops! Please fill in all fields before sending.';
                    formStatus.classList.add('error');
                }
            }, 1200);
        });
    }
});
