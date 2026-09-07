# 🌐 Kishore K V — Cyber-Dark Premium Portfolio Website

A modern, responsive, and highly interactive personal portfolio website designed for a **Cybersecurity, Networking & Software Development** profile. Built with glassmorphism aesthetics, dynamic 3D physics lanyard cards, GSAP scroll animations, platform coding activity metrics, and custom theme tokens.

Live Demo: **[kishore-kv-portfolio.vercel.app](https://kishore-kv-portfolio.vercel.app/)**

---

## ✨ Highlights & Features

- **🪪 Interactive 3D Lanyard Badge Card**: Real-time physics engine using `requestAnimationFrame` with spring damping forces, direct cursor drag-tracking, ~2-second natural pendulum swing-back momentum, 3D tilt response, and 360° click-spin animation. Features standard badge header photo, 2x2 metadata grid (`SPECIALTY`, `LOCATION`, `EDUCATION`, `STATUS: Open to Work`), and barcode identifier.
- **⚓ Floating Quick-Navigation Dock**: Fixed glassmorphic quick-access navigation dock with section shortcuts, active tab highlighting, high-contrast dark theme icon styling, and smooth scroll triggers.
- **⚡ What I Do & Tech Ticker Showcase**: Specialized service cards for Cybersecurity, Penetration Testing, Software Development, and Networking, paired with an ambient continuous marquee tech stack ticker.
- **📊 Live Coding Activity Modal**: Interactive platform metrics overlay showcasing LeetCode & GitHub statistics, submission charts, solved problems, and live sync status.
- **🛡️ Cybersecurity & IT Domain Showcase**: Dedicated section detailing technical capabilities (Wireshark packet analysis, penetration testing, digital forensics, TCP/IP networking, and secure coding principles).
- **💻 Interactive Terminal Preloader**: Simulated CLI terminal preloader (`npx kishore-kv --init`) printing system diagnostic verification logs and installation progress before revealing site contents.
- **🕸️ Ambient Network Background**: Canvas-based particle background system with interactive mouse-repelling node connections and vertical parallax drift.
- **📈 Uttar Pradesh Police Cyber Internship Timeline**: Vertical timeline detailing hands-on cybercrime analysis experience, integrated with a keyboard-navigable 7-photo slide lightbox gallery popup.
- **🎓 Education & Certifications**: Glassmorphic credential cards highlighting B.Tech IT studies at **Chennai Institute of Technology**, **Shri Vidhya Mandhir**, and certifications from Cisco, Forage, HackerRank, and Hack & Fix.
- **💎 Glassmorphic Ambient Footer**: Styled `.footer-ambient-banner` glass box with backdrop blur, `INNOVATE & SECURE` pill badge, bold gradient typography, and quick top-scroll action.

---

## 🛠️ Tech Stack & Utilities

- **Core**: React 18, Vite (Fast build system & HMR), Vanilla CSS3 (Custom Tokens, CSS Grid, Flexbox), HTML5 Canvas API.
- **Animations**: GSAP & ScrollTrigger, Physics Spring Mechanics (Custom `requestAnimationFrame` hooks).
- **Aesthetics**: Glassmorphism, Backdrop Blur Filters, Gradient Text, Custom Dark/Light Theme Tokens.
- **Fonts**: [Outfit](https://fonts.google.com/specimen/Outfit) & [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) from Google Fonts.
- **Icons**: FontAwesome 6, Custom SVG Icons, Dashboard WebP Icons.
- **Deployment**: Hosted on **Vercel** with custom routing options.

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/KiShOrE-2008/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally
```bash
npm run dev
```

### 4. Build Production Bundle
```bash
npm run build
```

---

## 📁 Repository Structure

```plaintext
Portfolio/
├── public/               # Static assets (internship photos, badges & favicon)
├── src/
│   ├── components/       # UI Components
│   │   ├── LanyardCard.jsx        # 3D Physics Lanyard Card component
│   │   ├── FloatingDock.jsx       # Quick navigation floating dock
│   │   ├── WhatIDo.jsx            # Engineering specialization cards
│   │   ├── TechTicker.jsx         # Continuous tech stack marquee ticker
│   │   ├── CodingActivity.jsx     # LeetCode & GitHub stats modal
│   │   ├── Hero.jsx               # Hero section controller
│   │   ├── Navbar.jsx             # Top navigation bar
│   │   ├── About.jsx              # Personal overview section
│   │   ├── Skills.jsx             # Technical skills matrix
│   │   ├── Projects.jsx           # Showcase project gallery
│   │   ├── Experience.jsx         # Internship timeline
│   │   ├── Education.jsx          # Academic history
│   │   ├── Certifications.jsx     # Licenses & certificates
│   │   ├── Contact.jsx            # Interactive contact form
│   │   ├── Footer.jsx             # Glassmorphic ambient footer
│   │   └── Preloader.jsx          # Simulated CLI terminal preloader
│   ├── App.jsx           # Main application controller
│   ├── index.css         # Custom design tokens, utilities & theme rules
│   └── main.jsx          # Application entry point
├── index.html            # Vite entry template
├── package.json          # Dependency specifications & scripts
├── vite.config.js        # Vite compilation configuration
├── vercel.json           # Vercel deployment options
└── README.md             # Project documentation
```

---

## 📄 License

This repository is open-source and available for personal and educational use.
