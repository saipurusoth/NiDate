# For Nithya ❤️ — an interactive date invitation

A small, romantic, single-page React experience — a little interactive story that
ends with one important question.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (default http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## The flow

Welcome → Pick your vibe → A little surprise → A small question →
Date planning → The big question → **YES** → 🎉 Date Accepted
(or *Maybe…* → a playful nudge → Try again)

## Tech

- React 18 + Vite
- Framer Motion for page/card transitions
- Pure-CSS ambient hearts & petals (fixed pool, no timers — no leaks)
- Fonts: Playfair Display + Poppins (Google Fonts, with system fallbacks)

## Optional music

Drop `romantic.mp3` into `public/music/`. The toggle (top-right) plays it on a
loop. Music never autoplays and the app works fine without a file.

## Notes

- Fully responsive, mobile-first (320px → 1920px).
- Respects `prefers-reduced-motion`.
- Keyboard accessible with visible focus states.
