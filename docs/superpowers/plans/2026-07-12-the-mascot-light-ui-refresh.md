# The Mascot Light UI Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing dark landing page into a warm, bright, product-first experience while preserving its approved content, media behavior, and waitlist flow.

**Architecture:** Keep the current React component boundaries and content arrays. Implement the refresh with a CSS token and layout rewrite plus small presentation-only JSX additions for status chips, product-frame detail, and compatibility labels.

**Tech Stack:** React 19, TypeScript, Vite 7, Tailwind CSS import, plain component-scoped class names, CSS keyframes.

## Global Constraints

- Keep the existing Tally waitlist URL and `WaitlistLink` behavior unchanged.
- Keep the existing local WebM, MP4, and WebP fallback media.
- Add no runtime dependencies, backend, authentication, forms, or analytics changes.
- Do not copy Hold My Lid assets, exact copy, or brand elements.
- Respect `prefers-reduced-motion` and preserve visible keyboard focus.
- Preserve honest compatibility language led by Hermes and Codex.
- The workspace is not a Git repository; use build and browser checkpoints instead of commits.

---

### Task 1: Establish the light visual system and floating header

**Files:**
- Modify: `src/styles.css`
- Modify: `src/components/Header.tsx`

**Interfaces:**
- Consumes: Existing `.page-shell`, `.site-header`, `.wordmark`, `.site-nav`, and `.button` class contracts.
- Produces: A warm color-token system and a responsive floating capsule header used by all later sections.

- [ ] **Step 1: Add semantic design tokens**

Define `--canvas`, `--surface`, `--ink`, `--muted`, `--line`, `--lime`, `--lime-soft`, `--amber-soft`, and shadow tokens in `:root`. Replace hard-coded page background and selection colors with those tokens.

- [ ] **Step 2: Convert the header into a capsule**

Change `.site-header` from a full-width sticky bar into a sticky transparent container and style `.site-header__inner` as a rounded translucent white capsule with a border, blur, and soft elevation.

- [ ] **Step 3: Add a live-status pill**

Add this presentation-only element between the wordmark and navigation:

```tsx
<span className="header-status" aria-label="The Mascot is in development">
  <span className="status-dot" aria-hidden="true" /> in development
</span>
```

Hide it at the tablet breakpoint so primary navigation and CTA remain uncluttered.

- [ ] **Step 4: Run the static checks**

Run: `npm run lint && npm run build`

Expected: ESLint exits 0 and Vite emits a successful production build.

---

### Task 2: Recompose the hero around the product demo

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `useReducedMotion()`, `WaitlistLink`, existing media paths, and the Task 1 tokens.
- Produces: Centered hero copy, dual CTAs, a large product-stage demo, and visual state chips.

- [ ] **Step 1: Add the product-stage details**

Keep the video/poster conditional intact. Extend the media frame with a textual window title and add two decorative chips outside the frame:

```tsx
<div className="hero__media-bar" aria-hidden="true">
  <div className="window-dots"><span /><span /><span /></div>
  <span className="window-title">The Mascot · agent companion</span>
</div>
<span className="floating-status floating-status--working"><i /> Agent working</span>
<span className="floating-status floating-status--input"><i /> Needs input</span>
```

The chips must use `aria-hidden="true"` because the same concepts appear in accessible page content below.

- [ ] **Step 2: Center and tighten the hero copy**

Use a single-column `.hero__inner`, constrain the copy to approximately 880px, and set the headline to a balanced `clamp(3.5rem, 7.4vw, 7rem)` scale with dark ink, tight tracking, and a restrained line height.

- [ ] **Step 3: Create the ambient background**

Use pseudo-elements for soft lime and amber radial glows plus a low-contrast grid mask. Keep all decorative layers non-interactive and behind the content.

- [ ] **Step 4: Add orchestrated entrance motion**

Apply one `hero-rise` keyframe to the eyebrow, headline, lede, actions, and product stage with staggered delays. Ensure the existing reduced-motion media query collapses all animation and transition durations.

- [ ] **Step 5: Verify media behavior**

Run: `npm run build`

Expected: the WebM/MP4 sources and poster path remain present in the output bundle and the build exits 0.

---

### Task 3: Restyle benefits, states, workflow, compatibility, CTA, and footer

**Files:**
- Modify: `src/styles.css`
- Modify: `src/components/Compatibility.tsx`

**Interfaces:**
- Consumes: Existing component markup and the Task 1 token system.
- Produces: A cohesive editorial lower page with one dark contrast CTA.

- [ ] **Step 1: Convert benefits to editorial columns**

Remove the dark filled grid treatment. Use an open three-column layout separated by thin vertical rules, compact lime number lozenges, and comfortable text spacing.

- [ ] **Step 2: Give agent states a dedicated tinted stage**

Use a full-width pale lime section background with rounded cards. Preserve green, blue, and amber state distinctions and animate only the signal bars.

- [ ] **Step 3: Refine workflow and compatibility**

Use dark ink typography and hairline dividers for the workflow. Add two presentation chips in `Compatibility.tsx`:

```tsx
<div className="compatibility__tools" aria-label="Lead workflows">
  <span>Hermes</span>
  <span>Codex</span>
</div>
```

- [ ] **Step 4: Create the final contrast moment**

Style `.final-cta__inner` as a near-black rounded panel with lime light, white headline text, and a lime primary button. Keep the footer light and quiet.

- [ ] **Step 5: Rebuild and lint**

Run: `npm run lint && npm run build`

Expected: both commands exit 0.

---

### Task 4: Responsive and browser verification

**Files:**
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: The completed desktop design from Tasks 1–3.
- Produces: Verified desktop and mobile layouts with no console errors.

- [ ] **Step 1: Tune tablet layout**

At 850px, hide nonessential header status and navigation, reduce hero spacing, stack benefits and state cards, and preserve the product-stage width.

- [ ] **Step 2: Tune mobile layout**

At 520px, use 16px page gutters, scale the hero headline below 3.5rem, make the primary hero CTA full width, hide floating status chips, reduce frame radii, and stack compatibility content.

- [ ] **Step 3: Inspect the desktop viewport**

Reload `http://127.0.0.1:4173/` in the in-app browser. Confirm the capsule header, centered hero, video stage, section hierarchy, focus treatment, and all anchor labels render correctly.

- [ ] **Step 4: Inspect a narrow viewport**

Apply a browser viewport override near 390px width, reload, and confirm no horizontal scrolling, clipped headline text, overlapping CTA, or obscured media.

- [ ] **Step 5: Check runtime health**

Read console errors from the local page.

Expected: no React, asset-loading, or runtime errors attributable to the refresh.

- [ ] **Step 6: Final verification**

Run: `npm run lint && npm run build`

Expected: both commands exit 0 and the local browser reflects the finished UI.

