<div align="center">

# ✦ Abhishek Suvarna — Portfolio

**Premium 3D Engineering Portfolio · AI & ML Engineering Student · Software Developer**

[![Live Site]([https://img.shields.io/badge/Live%20Site-abhishek--suvarna--portfolio.vercel.app-black?style=for-the-badge&logo=vercel](https://abhishek-suvarna-portfolio-gabr.vercel.app/))](https://abhishek-suvarna-portfolio.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-abhisheksuvarna782--coder-181717?style=for-the-badge&logo=github)](https://github.com/abhisheksuvarna782-coder)
[![Built with React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-0.168-black?style=for-the-badge&logo=threedotjs)](https://threejs.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)

</div>

---

## 🌐 Live Preview. 

> **[https://abhishek-suvarna-portfolio.vercel.app/](https://abhishek-suvarna-portfolio.vercel.app/)**

A luxury-editorial, light-themed personal portfolio featuring immersive 3D WebGL scenes, smooth scroll-driven animations, and a curated showcase of AI/ML engineering projects.

---

## ✨ Features

| Feature | Details |
|---|---|
| **3D WebGL Background** | Native Three.js particle field with real-time mouse-parallax interaction |
| **3D Project Cards** | CSS perspective tilt cards with depth layers and shimmer highlights |
| **Smooth Section Transitions** | Scroll-driven slide-in and fade animations via `IntersectionObserver` |
| **Interactive Work Archive** | Filterable project grid with an animated detail modal |
| **Journey Timeline** | Animated timeline of education & experience milestones |
| **Skills Constellation** | 3D orbiting skill tags rendered in a WebGL canvas |
| **Contact Section** | Copyable email, live social links, and an animated CTA |
| **Fully Responsive** | Mobile-first layout, adapts from 320 px to ultrawide screens |
| **Zero Dependencies Bloat** | Only React 19, Three.js, and Lucide Icons — no CSS framework |

---

## 🚀 Tech Stack

```
Frontend Framework   →  React 19 + TypeScript
Bundler              →  Vite 8
3D Graphics          →  Three.js 0.168 (native, no react-three-fiber)
Icons                →  Lucide React
Styling              →  Vanilla CSS (custom design system)
Linter               →  OXLint
Deployment           →  Vercel
```

---

## 📁 Project Structure

```
abhi-portfolio/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components (Navbar, Cursor, etc.)
│   ├── data/
│   │   └── projects.ts      # All project & achievement data
│   ├── hooks/
│   │   └── useIntersection.ts  # Scroll-based animation hook
│   ├── sections/            # Page sections (Hero, Work, Journey, Skills, Contact)
│   ├── styles/              # Global design tokens & utilities
│   ├── App.tsx              # Root layout & section composition
│   └── main.tsx             # React entry point
├── index.html               # HTML shell with SEO meta tags
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 🛠 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation & Development

```bash
# 1. Clone the repository
git clone https://github.com/abhisheksuvarna782-coder/ABHISHEK_SUVARNA_PORTFOLIO.git
cd ABHISHEK_SUVARNA_PORTFOLIO

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build      # Type-check + Vite build → dist/
npm run preview    # Preview the production bundle locally
```

### Lint

```bash
npm run lint       # OXLint — 0 warnings policy
```

---

## 🗂 Featured Projects

| # | Project | Domain | Stack |
|---|---|---|---|
| 01 | **DeepShield** — AI deepfake detection & cybersecurity platform | AI/ML · CV · Security | Python, FastAPI, React, ViT |
| 02 | **RouteRecover AI** — Travel disruption recovery platform | AI/ML · Full Stack | Python, AI Planning, Vercel |
| 03 | **CyberGuard X** — ML-powered spam & threat intelligence | AI/ML · Security | Flask, scikit-learn, Railway |
| 04 | **HealVision** — AI health analysis & wellness platform | AI/ML | Python, FastAPI, ML |
| 05 | **PathFinder AI** — Career learning path guidance | AI/ML · Full Stack | Python, AI/ML |
| 06 | **Finance Dashboard** — Financial data visualisation | Full Stack | JS, HTML, CSS, REST API |
| 07 | **Weather AI** — Real-time location-based weather app | Full Stack | Vanilla JS, Geolocation API |
| 08 | **Viksith Bharat** — National development tech project | Full Stack | Python, Web Dev |

---

## 🏆 Achievements

- 🥇 **National AI Innovation Challenge** — Team QuadCoders (RouteRecover AI)
- 🔬 **94.2% ViT Accuracy** on deepfake detection (DeepShield)
- ⚡ **98.7% Precision** ML spam classifier (CyberGuard X) — live on Railway
- 🏥 **National 24-Hour Hackathon** — HealVision health AI project

---

## 🎨 Design System

The portfolio uses a hand-crafted CSS design system with:

- **Color Palette** — Warm off-white `#FAF8F5` base, olive `#777C5B`, cognac `#A88A62`, ink `#1A1A14`
- **Typography** — Inter (UI), Playfair Display (editorial headings), JetBrains Mono (code)
- **Motion** — CSS custom properties driving scroll-linked transforms, no JavaScript animation libraries
- **3D** — Native WebGL via Three.js; CSS `perspective` + `rotateX/Y` for card tilt effects

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Designed & built by **Abhishek Suvarna** · [LinkedIn](https://linkedin.com/in/abhisheksuvarna782) · [GitHub](https://github.com/abhisheksuvarna782-coder)

</div>
