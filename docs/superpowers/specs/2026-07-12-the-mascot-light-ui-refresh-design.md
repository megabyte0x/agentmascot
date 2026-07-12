# The Mascot Light UI Refresh

**Date:** 2026-07-12  
**Status:** Approved direction

## Goal

Refresh the existing landing page into a brighter, softer, product-first experience inspired by the visual confidence of Hold My Lid while keeping The Mascot's own product identity, copy, information architecture, and waitlist flow.

## Chosen Direction

The page will use a warm, macOS-adjacent editorial aesthetic:

- A warm off-white canvas with pale lime and amber ambient glows
- A floating capsule header instead of the current full-width dark bar
- A centered, concise hero with the product promise as the dominant element
- The mascot demo presented as a large desktop product stage below the hero copy
- Dark ink typography, muted stone supporting text, and lime as the primary signal color
- Rounded, softly elevated surfaces with precise borders and restrained shadows
- Subtle entrance motion and state animation that respects reduced-motion preferences

The design should feel friendly and physical without becoming childish. The mascot is the memorable product object; decorative effects remain secondary.

## Considered Approaches

### 1. Full bright product stage — selected

Shift the entire page to a warm light theme and restructure the hero around a centered message and oversized demo. This creates the clearest visual improvement and best reflects the reference's strongest qualities.

### 2. Light hero, dark lower page

Use a bright hero and retain the current dark sections below. This would reduce implementation scope but create a less cohesive visual story and make the page feel like two separate sites.

### 3. Dark theme with softer composition

Keep the current palette and only adopt floating navigation, centered composition, and greater whitespace. This is lower risk but does not deliver the requested visual shift strongly enough.

## Page Design

### Header

- Float inside the page with a maximum width and generous top margin.
- Use a white translucent capsule with a subtle border and shadow.
- Preserve the wordmark, anchor links, and waitlist CTA.
- Add a compact live-status pill using the existing signal vocabulary.
- Collapse navigation cleanly on smaller screens while retaining the primary CTA.

### Hero

- Center the eyebrow, headline, lede, and actions.
- Tighten the headline to an editorial display width while preserving its approved wording.
- Use a dark primary waitlist button and a light secondary anchor button.
- Place soft lime and warm amber radial light behind the copy, with low-contrast grain or grid texture for depth.
- Present the demo in a wide, rounded desktop frame with a believable top bar, layered shadow, and small floating state chips.
- Keep video fallback, poster behavior, accessibility labels, and reduced-motion behavior unchanged.

### Benefits

- Replace the heavy segmented dark strip with three airy editorial columns.
- Use compact numbered markers, thin rules, and minimal icon-like geometry.
- Maintain the existing benefit content and responsive single-column behavior.

### Agent States

- Make this the strongest product-explanation section after the hero.
- Use a soft tinted section background and three differentiated state cards.
- Give each state a recognizable signal color and simple animated waveform or pulse.
- Keep descriptions honest and avoid implying integrations that are not implemented.

### Workflow and Compatibility

- Turn the workflow into a large two-column sequence with generous typography and numbered steps.
- Render compatibility messaging as a concise trust strip rather than a generic text block.
- Retain Hermes and Codex as the named lead workflows.

### Final CTA and Footer

- Use a dark ink CTA panel to create one decisive contrast moment near the bottom.
- Preserve the waitlist destination and new-tab behavior.
- Keep the footer minimal and aligned with the floating-header visual language.

## Interaction and Motion

- Use one orchestrated entrance sequence for the hero and product stage.
- Add restrained hover elevation to actionable elements and cards.
- Animate signal indicators rather than decorative page chrome.
- Disable nonessential motion under `prefers-reduced-motion`.
- Preserve keyboard focus visibility and semantic landmarks.

## Technical Boundaries

- Keep the React component structure and content arrays.
- Implement the refresh primarily through CSS with small, presentation-only JSX additions.
- Add no backend, dependency, form, account, or analytics changes.
- Do not copy proprietary assets, exact copy, or brand elements from Hold My Lid.
- Continue using the existing local video, poster, and waitlist configuration.

## Responsive Behavior

- Desktop uses centered hero composition and wide product staging.
- Tablet reduces the header and card spacing without collapsing the visual hierarchy.
- Mobile stacks all content, keeps headline text within the viewport, makes the primary CTA full width where helpful, and avoids floating elements that obscure the demo.

## Verification

- Run lint and production build.
- Inspect desktop and narrow mobile layouts in the in-app browser.
- Verify hero video or poster rendering, all anchors, and every waitlist CTA.
- Check browser console errors.
- Confirm visible focus states and reduced-motion fallback.
- Compare the refreshed page against the original for stronger hierarchy, product prominence, and cohesion.

