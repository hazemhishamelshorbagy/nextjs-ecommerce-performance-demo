# create/overwrite README.md
cat > README.md << 'EOF'
# PDP Performance Demo — Fast, Accessible Product Page

![CI](https://github.com/<your-username>/pdp-performance-nextjs/actions/workflows/ci.yml/badge.svg)

**Tech:** Next.js · React · TypeScript · Tailwind CSS · Framer Motion  
**Focus:** Core Web Vitals (LCP/CLS/INP), Accessibility (WCAG AA), clean UI

## Overview
A reference Product Detail Page (PDP) built with Next.js to demonstrate **performance-first** and **accessibility-first** frontend engineering. Includes SSR/ISR, image optimization, code-splitting, and motion used sparingly for clarity.

## Highlights
- ⚡ **Performance:** target **LCP < 2s (mobile)**, **CLS < 0.1** with responsive images & skeletons
- ♿ **Accessibility:** keyboard navigation, ARIA labels, color contrast suitable for WCAG AA
- 🧩 **Reusability:** component architecture, clean state & folder structure
- 🧪 **Quality-ready:** unit (RTL/Jest) & e2e (Playwright) scaffolds (to be added)

## Features
- PDP with gallery, variant selector, price, and add-to-cart CTA
- Optimistic UI & skeleton loading
- Basic analytics hook for vitals

## Tech Stack
Next.js · React · TypeScript · Tailwind CSS · Framer Motion · (RHF + Zod optional)

## Performance Notes
- Lighthouse (mobile) goal: **Performance ≥ 90**, **Accessibility ≥ 95**
- Bundle trimmed via **dynamic imports** & **tree-shaking**

## Getting Started
```bash
pnpm i
pnpm dev
