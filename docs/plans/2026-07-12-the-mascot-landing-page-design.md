# The Mascot Landing Page Design

**Date:** 2026-07-12
**Status:** Approved

## Goal

Create a polished single-page website that helps developers understand The Mascot and sends interested visitors to a Tally waitlist form.

The primary product promise is:

> Give your AI coding agent a personalized desktop companion.

## Audience

The primary audience is developers using Hermes, Codex, and similar local AI-agent workflows.

## MVP Scope

The landing page will include:

1. A compact header with anchor navigation and a waitlist CTA.
2. A hero section with the product promise, supporting copy, CTA, and autoplaying muted demo loop.
3. A three-benefit value strip.
4. An explanation of the mascot's Idle, Working, and Needs Input states.
5. A short How It Works section.
6. Compatibility messaging led by Hermes and Codex.
7. A final waitlist CTA.
8. A minimal footer.
9. Responsive layout, accessibility basics, SEO metadata, Open Graph metadata, and Cloudflare Web Analytics.

The waitlist CTA will open `https://tally.so/r/MeqEQg` in a new tab.

## Out of Scope

The MVP will not include:

- Convex or Convex Auth
- A first-party email form or database
- Account creation or login
- Avatar generation
- Payments
- Desktop application downloads
- User dashboards
- Automated test infrastructure

Convex should be introduced later for authenticated product functionality such as user identity, generated mascot ownership, payment state, and desktop-app login. It is unnecessary for a static page whose form is hosted by Tally.

## Architecture

- React, Vite, and TypeScript provide the frontend application.
- Tailwind CSS provides styling.
- Vite emits a static `dist/` build.
- Cloudflare Pages serves the static build through Git-based deployment.
- The page has no server runtime and no database.
- Cloudflare Web Analytics measures aggregate site traffic.
- Waitlist clicks may emit a best-effort client-side analytics event, but tracking must never delay or prevent navigation.
- The production Tally URL is supplied through `VITE_TALLY_URL`, with the approved URL documented in `.env.example` and configured in Cloudflare Pages.

## Visual Direction

The site will use a polished modern SaaS aesthetic with subtle mascot elements. It should feel credible as a developer tool rather than like a game or children's product.

Visual characteristics:

- Strong typography and restrained color usage
- Dark or neutral product framing where it improves the demo presentation
- Subtle rounded surfaces, soft borders, and controlled depth
- Small mascot-inspired accents rather than a heavily illustrated page
- Clear hierarchy and generous spacing
- Visible keyboard focus styles and sufficient color contrast

## Hero Media

The source hero video is `assets/haland_out.mov`.

Inspection results:

- Duration: approximately 4.06 seconds
- Resolution: 1280x720
- Source codec: ProRes
- Pixel format: `yuva444p12le` with alpha
- Source size: approximately 71.5 MB
- Includes an AAC audio stream

The source file must not be delivered directly. Implementation will create:

- A silent optimized WebM hero loop
- A silent MP4 fallback, composited onto the chosen hero background if alpha cannot be retained
- A WebP poster image

The video will use autoplay, muted, loop, and playsinline behavior. It will have explicit dimensions and a poster image. Visitors who prefer reduced motion will see the poster instead of forced autoplay.

If optimized local media remains too large for acceptable page performance, a shorter derivative or Cloudflare Stream can be considered later. Cloudflare Stream is not an MVP dependency.

## Page Structure

### Header

- The Mascot wordmark
- How It Works, States, and Waitlist anchors
- Join the Waitlist CTA

### Hero

- Headline: “Give your AI coding agent a personalized desktop companion.”
- Supporting copy focused on visibility, state, and intervention cues
- Primary waitlist CTA
- Secondary in-page How It Works link
- Optimized autoplaying muted demo loop in a product frame

### Benefit Strip

- See what your agent is doing
- Know when it needs you
- Make the companion your own

### Agent States

- Idle
- Working
- Needs Input

Each state will have concise explanatory copy and use available media without claiming behavior that has not been implemented.

### How It Works

1. Run The Mascot beside a supported coding-agent workflow.
2. The companion reflects the agent's current state.
3. Receive an obvious visual cue when intervention is needed.

The wording will remain conceptual until the exact integration mechanics are production-ready.

### Compatibility

Lead with:

> Designed for Hermes, Codex, and modern agent workflows.

Do not claim verified compatibility with tools that have not been tested.

### Final CTA and Footer

- Restate the core promise.
- Open the Tally waitlist in a new tab.
- Do not invent a launch date.
- Keep footer links minimal; omit empty legal/contact destinations until real URLs exist.

## Interaction and Data Flow

1. A visitor opens the landing page.
2. Text and the poster render without waiting for the hero video.
3. The muted loop begins when browser and motion preferences permit it.
4. The visitor reviews the product states and workflow.
5. A waitlist CTA opens Tally in a new tab.
6. Best-effort analytics records the outbound click when available.

The application stores no visitor data. Tally controls waitlist submission and associated form privacy behavior.

## Failure Handling

- If `VITE_TALLY_URL` is missing or invalid, waitlist CTAs render disabled and do not open an empty tab.
- Waitlist links use `target="_blank"` and `rel="noopener noreferrer"` and indicate their new-tab behavior to assistive technology.
- If analytics is blocked, the Tally link still works.
- If video playback fails, the poster remains visible.
- If autoplay is unavailable, a play affordance/native controls may be exposed without obscuring the content.
- With reduced motion enabled, the static poster replaces nonessential animation.
- If optional media fails, textual content remains sufficient to understand the product.

## Verification Strategy

No automated testing framework is required for the MVP.

Release verification consists of:

- TypeScript checking
- ESLint
- A successful production build
- Manual desktop and mobile review
- Manual Safari and Chromium review
- Keyboard and focus-state review
- Verification that every waitlist CTA opens the approved Tally form in a new tab
- Verification of hero playback, poster fallback, and reduced-motion behavior
- Review of the deployed Cloudflare Pages URL
- A Lighthouse mobile performance check, targeting 90 or better where the hero media permits it

## Missing Stack Decisions

The MVP requires no additional backend service. The remaining non-service requirements are:

- Node.js and npm for local development
- FFmpeg for media optimization
- A Git repository/provider for Cloudflare Pages Git deployment
- A Cloudflare Pages project
- A Cloudflare Web Analytics site/token if analytics is enabled
- Optional custom domain, favicon, social preview image, and real legal/contact URLs
