# FixIt — AI-Powered Repair & Home Services Platform

A pixel-accurate, production-quality, fully responsive landing page and live service tracking platform for **FixIt**. Built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

---

## 🌟 Key Features

### 1. "Show Your Problem" Camera & Upload Diagnostic Flow
- **Multi-Input Capture**:
  - **Photo**: Live viewfinder using `navigator.mediaDevices.getUserMedia` with rear-camera preference (`facingMode: "environment"`), instant shutter capture, client-side canvas compression (max 1280px), and support for up to 5 removable photo thumbnails.
  - **Video**: Video capture using `MediaRecorder` with a visible 30-second countdown timer and retake option.
  - **Gallery / Drag-and-Drop**: Mobile and desktop file upload fallback with camera permission error handling.
- **Voice-to-Text Input**: Integrated Web Speech API (`webkitSpeechRecognition`) with an animated microphone indicator to let users speak their problem.
- **Neural Hardware Analysis**: High-tech 3-second animated scanning engine (pluggable via `src/lib/analyzeProblem.ts`).
- **Tri-Action Resolution**:
  - **Book Technician**: Direct slot selection (date + 2-hour window) and address confirmation.
  - **Fix It Myself (DIY Guide)**: Step-by-step instructions, tool checklist, and safety precautions.
  - **Compare Repair vs Replace**: Side-by-side financial comparison and savings percentage.

### 2. Multi-Category Support (All Household Products & Home Services)
- Comprehensive data taxonomy in `src/data/categories.ts` covering **13 household categories**:
  - Mobiles & Tablets, Laptops & Computers, TV & Displays
  - Refrigerator, Washing Machine, Air Conditioner
  - Kitchen Appliances, Small Appliances (Iron, Kettle, etc.)
  - Fans, Coolers & Heaters
  - Furniture (Tables, Chairs, Beds, Wardrobes, etc.)
  - Plumbing (Taps, Showers, Tanks, Drainage)
  - Electrical (Switches, Wiring, MCBs, Inverters)
  - Other household hardware
- **Interactive Section**: *"WHAT CAN FIXIT FIX?"* placed right after the Hero, complete with a live search box and "View all 13 categories" expander.
- **Rotating Hero Chips**: Dynamically cycles through multiple household repairs (Smartphone, Refrigerator, Dining Table, Steam Iron, Bathroom Tap).

### 3. "My Bookings & Live Status" (`/bookings`) — Dark Futuristic Theme
- **Theme Consistency**: Implemented using FixIt's deep navy gradient (`#020617` → `#050B1F` → `#0A1433`), glassmorphic panels, and glowing teal accents.
- **Live Service Timeline**: 5-phase visual progress tracker:
  `Booking Confirmed` → `Technician Assigned` → `En Route` → `In Progress` → `Completed`.
- **Technician & Security OTP**: Monospace 4-digit `START OTP` visible exclusively during active technician phases, technician profile card with experience and phone link, and role tailored to the category (e.g., *Verified Master Plumber*, *Certified Appliance Technician*).
- **Interactive Demo Controls**: `⚡ Advance Status (Demo Step X/5)` button that steps through the workflow live.
- **Experience Rating**: 5-star review module with comment box upon service completion.
- **Floating AI Copilot**: Floating round chat widget with red "AI" badge and dark glass support drawer for instant guidance.
- **State Persistence**: Syncs bookings and status updates to `localStorage` across page refreshes.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the active port displayed in terminal, e.g. `3005`).

### 3. Build & Production Run
```bash
npm run build
npm run start
```

---

## 📁 Project Architecture

- **`src/app/page.tsx`**: Main landing page with Hero, Categories, FixIt Signal, How It Works, Features, Repair vs Replace, Why FixIt, Circular Economy, and Final CTA.
- **`src/app/bookings/page.tsx`**: Live service tracking and bookings management dashboard.
- **`src/components/ShowProblemModal.tsx`**: Multi-step camera, video, gallery, voice input, AI analysis, and technician scheduling modal.
- **`src/components/CategoriesSection.tsx`**: Category grid with live search and preselection triggers.
- **`src/components/FloatingChat.tsx`**: Floating AI customer support widget.
- **`src/lib/analyzeProblem.ts`**: Pluggable AI problem diagnostic service (ready for real multimodal AI API integration).
- **`src/data/categories.ts`**: Category taxonomy, sub-items, and technician role mappings.
- **`src/data/bookings.ts`**: Booking models, initial mock data, status advancing, and `localStorage` synchronization.
- **`src/data/content.ts`**: Centralized landing page copy and rotating hero diagnostic datasets.
- **`public/hero-phone.jpg`**: Replaceable hero image.
