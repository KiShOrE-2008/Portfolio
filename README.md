# 🌐 Premium Cyber-Dark Portfolio Website

A modern, responsive, and highly interactive personal portfolio designed for a **Cybersecurity, Networking, and Software Development** profile. Built with glassmorphism aesthetics, dynamic glow effects, 3D mouse tilt cards, and optimized responsive layouts.

Live Demo: **[kishore-2008.github.io/Portfolio](https://kishore-2008.github.io/Portfolio/)**

---

## ✨ Features

- **🛡️ Cybersecurity & Networking Showcase**: Dedicated section detailing technical capabilities (Wireshark traffic analysis, penetration testing, cybercrime investigation, TCP/IP, digital forensics, etc.).
- **📈 Uttar Pradesh Police Cyber Internship Timeline**: Vertical glowing experience timeline node showing internship milestones, integrated with a keyboard-navigable 7-photo slide lightbox gallery popup.
- **🎓 Interactive Education Section**: Responsive glassmorphic layouts mapping academic credentials at **Chennai Institute of Technology** and **Shri Vidhya Mandhir**, highlighting specialized coursework (IIT Madras Data Science & AI).
- **🥇 Licenses & Certifications Grid**: Compact glassmorphic cards display for Cisco, Forage, HackerRank, and Hack & Fix certifications.
- **🎛️ Interactive Animations & 3D Tilt**: 
  - Mouse-position tracking 3D tilt effects (`Vanilla JS`) applied to sections and cards.
  - Smooth intersection observers for fade-in scroll triggers.
  - Radial pointer glow-tracking background overlay.
- **📱 Fully Responsive**: Custom mobile drawer menus and responsive media padding overrides across all grid systems.

---

## 🛠️ Tech Stack & Utilities

- **Core**: HTML5, Vanilla CSS3 (Custom Variables, CSS Grid, Flexbox), Vanilla JavaScript (ES6+).
- **Aesthetics**: Glassmorphism, CSS Custom Gradients, Backdrop Blur Filters.
- **Fonts**: [Outfit](https://fonts.google.com/specimen/Outfit) & [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) from Google Fonts.
- **Interactions**: Vanilla mousemove tilt handlers, viewport IntersectionObserver API.

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/KiShOrE-2008/Portfolio.git
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
├── public/               # Static assets
│   └── images/           # Internship photos & favicon
├── src/
│   ├── components/       # Section & UI components
│   ├── App.jsx           # Main page controller
│   ├── index.css         # Stylings & tokens
│   └── main.jsx          # React app mounting script
├── index.html            # Entry layout for Vite
├── package.json          # Project scripts & packages
├── vite.config.js        # Vite compilation options
├── vercel.json           # Vercel deployment mappings
└── README.md             # Documentation
```

---

## 📄 License
This repository is open-source and available for personal and educational use.
