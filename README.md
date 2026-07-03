# Rushikesh Pathak — 3D Portfolio (React)

Personal portfolio of **Rushikesh Pathak** — Founder & CEO of 2 successful businesses, full stack developer (MERN · Python · Flask · C#), freelancer with 250+ domestic & international clients and 500+ projects shipped.

Pure black & white aesthetic · glassmorphism · 3D.

## Stack
- **React 18 + Vite**
- **React Three Fiber** (Three.js) — 3D background: starfield, wireframe torus knot, floating glass shapes, mouse parallax
- **Framer Motion** — scroll reveals, staggered hero, animated counters, spring tilt, scroll progress bar
- **3D CSS carousel** — glassmorphism project slider (drag / swipe / arrows / keyboard / autoplay)

## Add your photo
Open `src/components/Hero.jsx` and paste your image link:

```js
const PROFILE_IMAGE = 'PASTE_YOUR_IMAGE_LINK_HERE'
```

Until you do, an "RP" monogram is shown. The image is auto-grayscaled to match the aesthetic.

## Run locally
```bash
npm install
npm run dev
```

## Deploy to Vercel (free)
**Option A — CLI:**
```bash
npm i -g vercel
vercel --prod
```

**Option B — Dashboard:**
1. Push this folder to a GitHub repo
2. Import at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Vite
3. Deploy. Done.
