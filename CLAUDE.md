# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

The marketing website for Generative Gains LLC, an enterprise AI company in Qatar. It's a single static page built with Next.js 16 (App Router) and Tailwind CSS 4. There is no backend, database or test suite.

## Commands

```bash
npm run dev     # dev server at http://localhost:3000
npm run build   # production build; also catches prerender errors
npm run lint    # eslint (flat config, eslint-config-next)
npx tsc --noEmit
```

Run `npm run build` after any change. `next.config.ts` enables `cacheComponents`, so non-deterministic values in server components, like `new Date()` or `Math.random()`, fail the prerender at build time even when `dev` works. Put such values in a client component or hardcode them. For example, the footer year is a literal.

## Architecture

- **Content is separate from layout.** All copy, nav items and outbound links live in `src/content/site.ts`. Edit text and URLs there, not in components. `links.thermalTrace` and `links.freshDriv` point to the two product landing pages. `links.contact` is deliberately empty: the contact section shows a "coming soon" note until it's set, then renders a "Get in touch" button.
- **`src/app/page.tsx`** is a server component. Each section is a local function component, and they share the `wrap` container and `h2` class strings defined at the top.
- **Interactive pieces are client components in `src/components/`:**
  - `HeroFlow.tsx` routes every particle input → hub (on the diagonal "GenOps" slash) → outcome, along the drawn curves only. Each half of the trip eases in and out, so particles pause at the hub, which pulses. It updates SVG attributes directly through refs inside a `requestAnimationFrame` loop instead of using React state. It pauses off-screen via IntersectionObserver and renders a static frame under `prefers-reduced-motion`. Headless Chrome `--screenshot` freezes rAF, so verify motion in a real browser or over CDP (`Page.captureScreenshot`).
  - `GenOpsStack.tsx` draws an isometric SVG stack of plates. Plates are drawn bottom-up so the upper ones overlap, and plates above the selected one lift via a CSS transform.
- **Static illustrations** live in `src/components/Visuals.tsx` (server components): the service glyphs (keyed by `icon` in `site.ts`), the adoption `PhaseArt`, `SovereignArt` and the `BrowserFrame` around product screenshots. Product screenshots are `public/products/*.webp`, captured from the live product sites at 1440×900 and resized to 1200px. Retake them when those sites change.
- **Styling:** design tokens are CSS variables in `src/app/globals.css` (`--ink`, `--deep`, `--line`, `--frost`, `--mist`, `--sand`), exposed to Tailwind through `@theme inline` as `bg-ink`, `text-sand` and similar. SVG state styling (`.is-hit`, `.is-crossed`, `[data-active]`) also lives in `globals.css`. Fonts are Bodoni Moda (`font-display`) and Jost (`font-sans`), loaded with `next/font` in `layout.tsx`.

## Conventions

- The site is dark-only (`color-scheme: dark`) because the logo (`public/logo.png`) is pale and only reads on dark backgrounds.
- The second product's name is spelled **FreshDriv** (no "e"), matching freshdriv.qa.
- Copy is written for customers, not investors, in British spelling ("organisations") with no em dashes.
- `Generative Gains Profile data.docx` in the repo root is the source material (company profile and pitch text). It is gitignored on purpose because the repo is public and the document holds investor and strategy content. It isn't used by the build.

## Deploy

Push to GitHub and import into Vercel, or run `npx vercel` from the repo root.
