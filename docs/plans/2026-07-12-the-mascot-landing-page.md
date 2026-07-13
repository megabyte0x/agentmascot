# Agent Mascot Landing Page Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Build and deploy a polished single-page website that explains Agent Mascot to developers and opens the Tally waitlist in a new tab.

**Architecture:** A static React/Vite application will render the landing page and optimized hero media. Tally owns form submission, while Cloudflare Pages hosts the generated `dist/` directory and Cloudflare Web Analytics supplies aggregate traffic measurement. Convex and authentication are deliberately deferred until the product has account-based functionality.

**Tech Stack:** React, Vite, TypeScript, Tailwind CSS, FFmpeg, ESLint, Cloudflare Pages, Cloudflare Web Analytics, Tally.

**Approved Tally URL:** `https://tally.so/r/MeqEQg`

**Testing decision:** Do not add Vitest, React Testing Library, Playwright, or another automated testing framework in this MVP. Use type checking, linting, build verification, and manual release checks.

---

## Task 1: Establish the project and source-control baseline

**Objective:** Turn the current planning directory into a documented frontend project without losing existing files.

**Files:**
- Preserve: `README.md`
- Preserve: `assets/haland_out.mov`
- Create: `.gitignore`
- Create: `.nvmrc`

**Steps:**

1. Confirm the directory still contains the approved plans and source media.
2. If the user approves source-control initialization, run:

```bash
git init
git branch -M main
```

3. Create `.nvmrc` with the current Node.js LTS major selected for the project.
4. Create `.gitignore` containing at least:

```gitignore
node_modules/
dist/
.env
.env.local
.DS_Store
coverage/
```

5. Confirm prerequisites:

```bash
node --version
npm --version
ffmpeg -version
```

6. Do not commit the 71.5 MB ProRes source until the repository's media-storage policy is decided. If it must live in Git, consider Git LFS; otherwise preserve it as a local source and commit only optimized derivatives.

**Verification:** The directory is ready for scaffolding, source media remains intact, and no secrets are tracked.

**Commit, if Git is enabled:**

```bash
git add .gitignore .nvmrc docs/plans README.md
git commit -m "docs: define Agent Mascot landing page"
```

---

## Task 2: Scaffold React, Vite, TypeScript, and Tailwind

**Objective:** Create the minimal static application and build toolchain.

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `eslint.config.js`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles.css`

**Steps:**

1. Scaffold into a temporary directory so existing repository files are not overwritten:

```bash
npm create vite@latest .scaffold -- --template react-ts
```

2. Move the generated application files into the project root, inspect conflicts individually, and remove `.scaffold` only after confirming all required files were copied.
3. Install dependencies:

```bash
npm install
npm install tailwindcss @tailwindcss/vite
```

4. Add the Tailwind Vite plugin to `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

5. Replace starter CSS with:

```css
@import "tailwindcss";

:root {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
  color: #f5f7fb;
  background: #090b10;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

6. Add package scripts for `dev`, `build`, `lint`, `preview`, and an explicit `typecheck` command using `tsc --noEmit`.
7. Remove Vite sample assets and counter UI.

**Verification:**

```bash
npm run typecheck
npm run lint
npm run build
```

Expected: all commands exit successfully and `dist/index.html` exists.

**Commit:**

```bash
git add package.json package-lock.json index.html vite.config.ts tsconfig*.json eslint.config.js src
git commit -m "chore: scaffold landing page frontend"
```

---

## Task 3: Optimize the hero media

**Objective:** Convert the 71.5 MB ProRes source into browser-ready silent assets while preserving the original.

**Files:**
- Read: `assets/haland_out.mov`
- Create: `public/media/the-mascot-demo.webm`
- Create: `public/media/the-mascot-demo.mp4`
- Create: `public/media/the-mascot-demo-poster.webp`

**Steps:**

1. Create the destination directory:

```bash
mkdir -p public/media
```

2. Produce a VP9 WebM derivative that attempts to preserve alpha and removes audio:

```bash
ffmpeg -i assets/haland_out.mov \
  -an -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf 32 \
  -row-mt 1 -deadline good -cpu-used 2 \
  public/media/the-mascot-demo.webm
```

3. Produce an H.264 MP4 fallback. Because standard H.264 does not preserve alpha, composite it onto the approved hero background color before encoding:

```bash
ffmpeg -f lavfi -i color=c=0x11141b:s=1280x720:r=24 \
  -i assets/haland_out.mov \
  -filter_complex "[0:v][1:v]overlay=shortest=1,format=yuv420p" \
  -an -c:v libx264 -crf 24 -preset slow -movflags +faststart \
  public/media/the-mascot-demo.mp4
```

4. Generate a poster from a representative frame, composited onto the same background if needed:

```bash
ffmpeg -f lavfi -i color=c=0x11141b:s=1280x720 \
  -ss 1 -i assets/haland_out.mov \
  -filter_complex "[0:v][1:v]overlay=shortest=1" \
  -frames:v 1 -c:v libwebp -quality 82 \
  public/media/the-mascot-demo-poster.webp
```

5. Inspect the generated assets:

```bash
ffprobe -v error -show_entries format=duration,size -of json public/media/the-mascot-demo.webm
ffprobe -v error -show_entries format=duration,size -of json public/media/the-mascot-demo.mp4
```

6. Visually inspect transparency, color, framing, and loop seam. If the VP9 alpha is not decoded correctly by target browsers, use the composited WebM variant too.
7. Prefer a combined hero media budget below roughly 3 MB. If it is larger, reduce dimensions to 960×540 and/or increase CRF before considering Cloudflare Stream.

**Verification:** Both video files play silently, loop cleanly, and the poster displays independently.

**Commit:**

```bash
git add public/media
git commit -m "feat: add optimized hero media"
```

---

## Task 4: Add public configuration and metadata

**Objective:** Configure the waitlist destination and make the page discoverable and shareable.

**Files:**
- Create: `.env.example`
- Create: `src/config.ts`
- Modify: `index.html`
- Create: `public/favicon.svg`
- Create: `public/og/the-mascot-og.webp`

**Steps:**

1. Add `.env.example`:

```dotenv
VITE_TALLY_URL=https://tally.so/r/MeqEQg
```

2. Add `src/config.ts` with validation:

```ts
const rawTallyUrl = import.meta.env.VITE_TALLY_URL?.trim();

export const tallyUrl = (() => {
  if (!rawTallyUrl) return null;

  try {
    const url = new URL(rawTallyUrl);
    return url.protocol === "https:" && url.hostname === "tally.so"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
})();
```

3. Configure the local development value in `.env.local`, which stays ignored by Git.
4. Update `index.html` with:
   - Title: `Agent Mascot — A desktop companion for your AI coding agent`
   - Concise meta description
   - Canonical URL placeholder until the domain is known
   - Open Graph and X/Twitter metadata
   - Theme color
   - Favicon
5. Create a 1200×630 social image using the approved brand direction and real mascot/demo imagery.
6. Do not invent a production domain. Mark canonical and `og:url` as deployment-time values until the Pages/custom-domain URL is known.

**Verification:** Build succeeds; the Tally URL resolves to the approved HTTPS host; metadata references valid public assets.

**Commit:**

```bash
git add .env.example src/config.ts index.html public/favicon.svg public/og
git commit -m "feat: add landing page configuration and metadata"
```

---

## Task 5: Build reusable navigation and CTA behavior

**Objective:** Implement consistent waitlist behavior and the page shell.

**Files:**
- Create: `src/components/WaitlistLink.tsx`
- Create: `src/components/Header.tsx`
- Create: `src/components/Section.tsx`
- Modify: `src/App.tsx`

**Steps:**

1. Implement `WaitlistLink` as the single source of truth for all Tally CTAs.
2. When `tallyUrl` is valid, render an anchor with:

```tsx
<a
  href={tallyUrl}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Join Agent Mascot waitlist (opens in a new tab)"
>
  Join the waitlist
</a>
```

3. When configuration is invalid, render a visibly disabled element with `aria-disabled="true"` and explanatory title text. Do not open an empty tab.
4. Add a best-effort analytics hook that never calls `preventDefault` and never delays navigation. Keep it isolated so analytics can be removed without touching CTA markup.
5. Build the header with wordmark, anchor links, and CTA.
6. Build a small `Section` layout primitive for consistent content width and vertical spacing. Do not create a broad design system.
7. Establish the page landmarks: header, main, and footer.

**Verification:** Every waitlist CTA is implemented through `WaitlistLink`; valid links open Tally in a new tab with safe attributes; missing configuration does not open a tab.

**Commit:**

```bash
git add src/components src/App.tsx
git commit -m "feat: add page shell and waitlist navigation"
```

---

## Task 6: Implement the hero and reduced-motion media behavior

**Objective:** Communicate the product immediately and display the optimized demo loop responsibly.

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/hooks/useReducedMotion.ts`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

**Steps:**

1. Implement the hero headline exactly as approved:

```text
Give your AI coding agent a personalized desktop companion.
```

2. Add concise supporting copy explaining that Agent Mascot lives beside a local coding agent, reflects its current state, and makes requests for input visible.
3. Add primary waitlist and secondary `#how-it-works` actions.
4. Add a `useReducedMotion` hook using `window.matchMedia("(prefers-reduced-motion: reduce)")`, including change-listener cleanup.
5. For ordinary motion preferences, render:

```tsx
<video
  autoPlay
  muted
  loop
  playsInline
  poster="/media/the-mascot-demo-poster.webp"
  width={1280}
  height={720}
  preload="metadata"
  aria-label="Agent Mascot reacting beside an AI coding-agent workflow"
>
  <source src="/media/the-mascot-demo.webm" type="video/webm" />
  <source src="/media/the-mascot-demo.mp4" type="video/mp4" />
</video>
```

6. For reduced motion, render the poster image instead of autoplaying video.
7. Keep the headline, CTA, and layout functional before media loads.
8. Use explicit dimensions and aspect ratio to prevent layout shift.
9. If autoplay is rejected, retain the poster and expose a simple play affordance only if needed after browser review.

**Verification:** The hero is understandable without video, ordinary visitors receive a silent inline loop, and reduced-motion visitors receive a static poster.

**Commit:**

```bash
git add src/components/Hero.tsx src/hooks/useReducedMotion.ts src/App.tsx src/styles.css
git commit -m "feat: build product hero and demo loop"
```

---

## Task 7: Implement the product explanation sections

**Objective:** Explain value, states, workflow, and compatibility without overstating product readiness.

**Files:**
- Create: `src/content/landing.ts`
- Create: `src/components/BenefitStrip.tsx`
- Create: `src/components/AgentStates.tsx`
- Create: `src/components/HowItWorks.tsx`
- Create: `src/components/Compatibility.tsx`
- Modify: `src/App.tsx`

**Steps:**

1. Centralize editable copy and section data in `src/content/landing.ts`.
2. Add the approved benefit items:
   - See what your agent is doing
   - Know when it needs you
   - Make the companion your own
3. Add state cards for:
   - Idle
   - Working
   - Needs Input
4. Keep state descriptions factual. Do not imply integrations or automation that are not implemented.
5. Add the three-step workflow:
   - Run Agent Mascot beside your coding-agent workflow.
   - Let the companion reflect the agent's current state.
   - Notice immediately when the agent needs intervention.
6. Add compatibility copy:

```text
Designed for Hermes, Codex, and modern agent workflows.
```

7. Lead with verified tools; avoid logos or claims for unverified integrations.
8. Use semantic headings and ordered lists where appropriate.

**Verification:** A developer can understand what the product is, what the three states mean, and where it fits without relying on the hero video.

**Commit:**

```bash
git add src/content src/components src/App.tsx
git commit -m "feat: explain mascot states and workflow"
```

---

## Task 8: Add final CTA, footer, and responsive polish

**Objective:** Complete the conversion path and ensure the page feels intentional across viewport sizes.

**Files:**
- Create: `src/components/FinalCta.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

**Steps:**

1. Add a final CTA that restates the personalized-companion promise without inventing a launch date.
2. Reuse `WaitlistLink` for the final action.
3. Add a minimal footer with the product name and current year.
4. Omit privacy, terms, social, and contact links until real destinations exist.
5. Add responsive layouts for narrow mobile, tablet, laptop, and wide desktop screens.
6. Ensure touch targets are comfortably sized.
7. Add visible `:focus-visible` styles.
8. Check text contrast, heading order, landmarks, alt text, and new-tab labels.
9. Verify the header does not cover anchor targets.
10. Keep decorative animation disabled under reduced motion.

**Verification:** The page remains readable and actionable at approximately 320 px width, standard mobile widths, and desktop widths; keyboard navigation reaches every interactive element clearly.

**Commit:**

```bash
git add src/components src/App.tsx src/styles.css
git commit -m "feat: complete responsive landing page"
```

---

## Task 9: Configure Cloudflare Pages and analytics

**Objective:** Prepare a repeatable static deployment with production configuration.

**Files:**
- Create: `public/_headers`
- Modify: `README.md`
- Optionally create: `wrangler.toml` only if direct Wrangler deployment is selected

**Steps:**

1. Add conservative static security headers in `public/_headers`. Start with:

```text
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/media/*
  Cache-Control: public, max-age=86400
```

Use one-year immutable caching for media only after filenames include a content hash or version. The initial fixed filenames must remain refreshable when the demo is replaced.

2. Do not add a strict Content Security Policy until the exact Cloudflare analytics and external-resource requirements are known and tested.
3. Document Cloudflare Pages settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Production environment variable: `VITE_TALLY_URL=https://tally.so/r/MeqEQg`
4. Connect the Git repository to Cloudflare Pages.
5. Enable Cloudflare Web Analytics in Cloudflare and add the exact production beacon snippet or Pages integration provided by the dashboard.
6. If Git integration is unavailable, use direct deployment only after the Pages project exists:

```bash
npx wrangler pages deploy dist --project-name <approved-project-name>
```

7. Update canonical and Open Graph URLs after the actual Pages/custom-domain URL is known.
8. Add the custom domain only if one is available; it is not required for the first deploy.

**Verification:** A production build deploys, the Pages URL loads over HTTPS, the Tally URL is present, and analytics failure does not affect page behavior.

**Commit:**

```bash
git add public/_headers README.md index.html
git commit -m "chore: configure Cloudflare Pages deployment"
```

---

## Task 10: Perform release verification

**Objective:** Verify the real artifact without adding test infrastructure.

**Files:**
- Modify only files required to fix discovered release blockers.

**Steps:**

1. Run all required quality commands:

```bash
npm run typecheck
npm run lint
npm run build
```

2. Preview the production build:

```bash
npm run preview -- --host 127.0.0.1
```

3. Manually verify in Safari and Chromium:
   - Header anchors work.
   - Hero copy renders before media completes.
   - The hero video is silent, loops, and plays inline.
   - The poster remains useful if video playback is blocked.
   - Reduced-motion mode displays the static poster.
   - Every waitlist CTA opens `https://tally.so/r/MeqEQg` in a new tab.
   - Focus indicators and keyboard navigation are visible.
   - Mobile and desktop layouts have no horizontal overflow.
4. Run a mobile Lighthouse check and target a performance score of at least 90. If hero media prevents that target, reduce resolution/bitrate or shorten the loop before adding infrastructure.
5. Deploy to Cloudflare Pages.
6. Repeat the CTA, media, responsive, and metadata checks on the real deployed URL.
7. Confirm Cloudflare Web Analytics receives production traffic if analytics is enabled.

**Verification:** Type checking, linting, and production build succeed; the deployed page works on mobile and desktop; the real Tally form opens correctly.

**Commit:**

```bash
git add -A
git commit -m "chore: prepare landing page release"
```

---

## Deferred Follow-Up Stack

Add these only when the product flow requires them:

1. Convex backend for user and mascot data.
2. Convex Auth or another explicitly selected authentication provider for product accounts.
3. Object storage strategy for generated mascot media.
4. Dodo Payments for the paid download flow.
5. Desktop application signing, notarization, updates, and secure login handoff.
6. Automated component/browser tests after interactions become more complex.
7. Cloudflare Stream if video delivery cannot meet performance goals through optimized static media.

## Required Inputs Before Implementation Completes

- Approval to initialize Git in this directory, if desired.
- Final logo/wordmark treatment.
- Approved color palette and font choice, or permission for the implementer to select them.
- Production Cloudflare Pages project name.
- Final deployment URL/custom domain for canonical metadata.
- Cloudflare Web Analytics configuration if analytics remains in scope.
- Decision on whether the 71.5 MB ProRes source belongs in Git, Git LFS, or external/local source storage.
