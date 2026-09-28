# 🌹 Deborah — Bespoke Birthday Tribute & Interactive Experience

> An exclusive, mobile-first haute-couture digital tribute and celebration web experience crafted for **Deborah**.

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Netlify Status](https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://www.netlify.com/)

---

## ✨ Project Overview

This repository contains a bespoke, mobile-optimized birthday tribute application designed to be opened directly on smartphones from messaging platforms like **WhatsApp**. 

Moving away from generic birthday templates, the design system utilizes an intimate, luxury editorial aesthetic featuring:
- **Palette**: Deep Espresso background (`#140a08`), Rich Velvet Crimson Red accents (`#be123c`), softly glowing Brushed Copper highlights (`#e07a5f`), and Warm Ivory/Cream text (`#faf5ef`).
- **Typography**: Editorial serif headings (*Playfair Display*, *Cinzel*, *Cormorant Garamond*), elegant script accents (*Alex Brush*), and geometric body copy (*Plus Jakarta Sans*).
- **Tone**: Authentic, intimate Nigerian terms of endearment (*"Nwunye 'm"*, *"Fine girl"*, *"My darling"*, *"My special one"*).

---

## 💎 Core Interactive Features

1. **Digital Tribute Hero & 3D Glowing Frame**:
   - Dynamic 3D mouse/touch tilt physics on Deborah's portrait with crimson backlighting.
   - Interactive heart counter with sparkle burst feedback on tap.
   - Full-width celebration button that showers the screen with fireworks and confetti.

2. **Tactile Memoir Folio Cards ("Open When" Notes)**:
   - Expandable accordion letters styled like handcrafted mahogany folios with copper inlays.
   - Micro-sparkle particle burst on unsealing.

3. **Artisanal Digital Wax Seal Celebration**:
   - Tactile 3D wax seal button in deep velvet crimson with embossed copper monogram **"D"**.
   - Triggers celebratory fanfares, fireworks, and increases the global love counter.

4. **Interactive Birthday Cake & Candle Ritual**:
   - Multi-tier luxury cake with 3 interactive candle flames.
   - Tap individual flames to blow them out (with animated smoke puffs) or trigger the "Blow All" / "Relight" controls.
   - Sound synthesis and fanfare upon extinguishing all candles.

5. **"Why I Celebrate You" Tribute Showcase**:
   - Interactive trait cards celebrating Deborah's poise, grace, intellect, and loyalty.

6. **Interactive Guestbook & Wishes Board**:
   - Real-time guestbook where friends and loved ones can leave personalized blessings.
   - Emblem badge selector (`👑`, `💖`, `🥂`, `✨`, `💐`, `🎂`, `🌟`, `🕊️`) and tribute like counters.

7. **Ambient Sound Synthesizer & Music Serenade**:
   - Built-in Web Audio API sound synthesizer providing musical serenade chimes, tactile tap clicks, and celebratory fanfares with mute toggle.

8. **WhatsApp & Mobile-First Optimization**:
   - Fully compliant with iOS/Android safe area insets (`env(safe-area-inset-*)`).
   - Minimum 44×44px touch targets on all interactive elements.
   - 16px form inputs to prevent iOS Safari auto-zoom.
   - Complete Open Graph (`og:*`) & Twitter Card metadata for rich WhatsApp link preview cards.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tooling** | [Vite 6](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + Custom Design Tokens + Vanilla CSS |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/) |
| **Particle Physics** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Audio Engine** | Native Web Audio API Synthesizer |
| **Deployment** | [Netlify](https://www.netlify.com/) / [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.x or higher recommended)
- [npm](https://www.npmjs.com/) (or yarn / pnpm)

### Local Development

1. **Clone or Navigate to the Repository**:
   ```bash
   cd birthday
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser (or use responsive device mode in DevTools to view the mobile layout).

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Preview Production Build Locally**:
   ```bash
   npm run preview
   ```
   Open [http://localhost:4173](http://localhost:4173) to preview the production bundle.

---

## 🌐 Deploying to Netlify

This repository is pre-configured with [`netlify.toml`](./netlify.toml) and [`public/_redirects`](./public/_redirects) for instant deployment.

### Method 1: Deploy via GitHub (Recommended)

1. **Initialize Git & Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: Deborah's bespoke birthday celebration experience"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/birthday.git
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Log in to [Netlify](https://app.netlify.com/).
   - Click **"Add new site"** → **"Import an existing project"**.
   - Select **GitHub** and authorize your repository.
   - Netlify will automatically detect build settings from [`netlify.toml`](./netlify.toml):
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Click **"Deploy birthday"**.

### Method 2: Deploy via Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

---

## 📁 Project Structure

```text
birthday/
├── public/
│   ├── _redirects            # SPA redirect rule for Netlify/Cloudflare
│   └── image1.png            # Deborah's portrait asset
├── src/
│   ├── components/
│   │   ├── AmbientBackground.tsx    # Dynamic floating dust particle canvas
│   │   ├── BirthdayWishesCard.tsx   # Interactive guestbook and wish feed
│   │   ├── DeborahHighlights.tsx    # "Why I Celebrate You" tribute traits
│   │   ├── EditorialClosing.tsx     # "Sent with Love" closing sign-off
│   │   ├── Footer.tsx               # Impressum & bottom signature
│   │   ├── HeroSection.tsx          # 3D tilting portrait frame & headline
│   │   ├── InteractiveCandles.tsx   # Candle blowing & relighting cake ritual
│   │   ├── MemoirCards.tsx          # "Words from My Heart" accordion folios
│   │   ├── Navigation.tsx           # Fixed header with serenade & sound FX
│   │   ├── WaxSealCelebration.tsx   # Embossed monogram "D" wax seal button
│   │   └── WishModal.tsx            # Modal for writing tribute notes
│   ├── hooks/
│   │   └── useSound.ts              # Audio & serenade management hook
│   ├── utils/
│   │   ├── audio.ts                 # Web Audio API sound generator
│   │   └── confetti.ts              # Custom confetti & firework bursts
│   ├── App.tsx                      # Root application layout
│   ├── index.css                    # Design system, glassmorphism & safe areas
│   └── main.tsx                     # React entrypoint
├── index.html                       # HTML5 shell & WhatsApp OG preview meta
├── netlify.toml                     # Netlify deployment configuration
├── package.json                     # Scripts & dependencies
├── tailwind.config.js               # Color tokens, breakpoints & font families
├── tsconfig.json                    # TypeScript compiler configuration
├── vercel.json                      # Vercel deployment configuration
└── vite.config.ts                   # Vite bundler configuration
```

---

## 📄 License
Created exclusively for Deborah's Birthday Tribute. All rights reserved.
