AGENT MASCOT

A mascot which will sit beside your agent locally on your system and calls you when an input is required. 

User Flow:
- User signups 
- Upload images to generate an Agent Mascot
- Pay to download Agent Mascot locally
- Download the application
- Login into the app 
- Select the Agent Mascot you generated
- Live with your buddy

Technical Flow:
- User signups with email 
- Upload the images which will sent to the pipeline
    - The openai will generate an avatar through the image
    - Teh generated avatar will be converted to animated videos 
        - Three variants:
            - Idle
            - Working 
            - Requires input
    - The animated variants will be stored in db attached to the user id 
- Modal pop ups for the downloading the application
- Requires dodo payment of $5 
- DMG installs 
- User login in the DMG 
- If paid, then they will see the generated avatar from the DB and can download it 
- Then they can start with codex or any other Hermes harness 

## Landing page development

This repository contains a static React, Vite, TypeScript, and Tailwind CSS landing page for Agent Mascot.

### Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

### Quality and production build

```bash
npm run typecheck
npm run lint
npm run build
npm run preview -- --host 127.0.0.1
```

The production build also renders the React landing page into `dist/index.html` so search and AI crawlers receive meaningful content without executing JavaScript. Canonical metadata and JSON-LD live in `index.html`; crawler guidance lives in `public/robots.txt`, `public/sitemap.xml`, and `public/llms.txt`.

### Cloudflare Pages deployment

Create a Cloudflare Pages project using the **Vite** framework preset with:

- Build command: `npm run build`
- Build output directory: `dist`
- Production environment variable: `VITE_TALLY_URL=https://tally.so/r/MeqEQg`

The deployment URL is intentionally not hard-coded. Set the canonical and Open Graph URLs in `index.html` when the production Pages or custom-domain URL is known. Enable Cloudflare Web Analytics from the Cloudflare dashboard and add only the exact beacon snippet it supplies after confirming it does not affect the page's CTA behavior.

Hero source media lives at `assets/haland_out.mov`; it is preserved locally and is not part of the browser-delivered build. Optimized derivatives are in `public/media/`.
