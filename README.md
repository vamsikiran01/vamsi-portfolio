# Aradhyula Vamsi Kiran — Personal Portfolio

A personal portfolio built with Next.js 15 App Router, TypeScript, Tailwind CSS, Lucide icons, and a custom **Autonomous Robot Swarm Animation Engine**.

---

## Key Features

- **Strict Resume Grounding**: Every project, skill, internship, certification, and statistic is 100% sourced from the verified resume. Absolutely zero phone numbers, lorem ipsum, or fabricated metrics.
- **Hero Section**:
  - Full-screen layout with the giant word **PORTFOLIO** in Anton font behind headshot.
  - Metallic red-to-black gradient with continuous sweeping light sheen.
  - Black & White high-contrast headshot standing on a soft red radial glow, fading into the page.
  - Handwritten greeting (*"Hello, I'm"* in Caveat Brush), name, role, 2-line resume bio, and 3 verified resume stats.
- **Signature Robot Swarm Animation**:
  - Page loads empty and 12 robot cursors (6 on phones) build it live.
  - Cursors: *Scout, Layout, Typeset, Motion, QA, Deploy, Copy, Lint, Index, Render, Palette, Review*.
  - Each cursor features a vector arrow, colored tag pill, and animated robot head with blinking LED eyes and a pulsing antenna.
  - Cursors glide with smooth easing, drag out wireframe bounding boxes with 4 corner handles and tags, and trigger content reveals (`type` letter-by-letter, `pop` scale-up, or `wipe` clip-path).
  - Max 6 elements building concurrently in reading order.
  - Driven by a single unified `requestAnimationFrame` loop + `IntersectionObserver`.
  - Anti-FOUC preboot inline script in `<head>`.
- **Controls Dock**:
  - Floating bottom pill with **Pause/Resume**, **Agents On/Off** (persisted in `localStorage`), and **Tour Mode**.
  - **Tour Mode**: Smoothly auto-scrolls through the site (ease-in, steady linear reading velocity, ease-out) at an optimal speed for high-definition screen recordings. Canceled immediately by mouse wheel, touch scroll, or pressing `Esc`.
  - Keyboard shortcuts: `T` (tour), `A` (agents), `P` (pause), `Esc` (cancel tour).
  - URL overrides: `?agents=on` (forces build animation) and `?agents=off` (renders full content immediately).
- **Core Sections**:
  1. **Work ("Work that ships")**: Mental Health Detection Using NLP & Library Management System.
  2. **Stack**: Endless marquee moving left with faded edges, pausing on hover.
  3. **Record**: Detailed timeline of internships (APSSDC, Demy Software Solutions), education (NSRIT, Kalam's), and 5 verified certifications (including NVIDIA Prompt Engineering).
  4. **About**: Identity, engineering background, and 4 core principles.
  5. **Contact**: Direct email (`aradhyulavamsikiran@gmail.com`), LinkedIn, GitHub, large CTA card, and clean footer with **NO** phone number.

---

## How to Run Locally

### Prerequisites
- Node.js 18+ (Node.js 20 LTS installed)
- npm

### 1. Open the project directory
```bash
cd "C:\Users\vamsi\.gemini\antigravity\scratch\vamsi-portfolio"
```

### 2. Install dependencies (already prepared)
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## How to Deploy for Free on Vercel

Vercel is the creator of Next.js and provides zero-configuration hosting for Next.js App Router websites for free.

### Option A: Deploy via GitHub (Recommended)
1. Initialize a Git repository and push your project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of vamsi portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/vamsi-portfolio.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
3. Click **"Add New..."** -> **"Project"**.
4. Select your `vamsi-portfolio` repository.
5. Vercel automatically detects Next.js:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Click **Deploy**. Your portfolio will be live worldwide in under 60 seconds with a free `.vercel.app` domain and automatic HTTPS SSL!

### Option B: Deploy via Vercel CLI
```bash
npx vercel
```
Follow the interactive prompts to log in and deploy directly from your terminal.
