# Product CTA Consistency

## Goal

Replace the landing page's remaining waitlist conversion language with direct product actions so every prominent CTA points users toward generating a personalized mascot or downloading the macOS app.

## Chosen approach

Use one consistent two-action hierarchy across the landing page:

- Primary: **Generate Personalized Mascot**, linking to `https://app.agentmascot.app`.
- Secondary: **Download Mac App**, linking directly to `https://app.agentmascot.app/downloads/the-mascot.dmg` with a `.dmg` download hint.

This replaces the remaining waitlist-oriented buttons, navigation label, anchor name, and supporting copy. The existing visual system remains unchanged: dark primary pill, light secondary pill in the hero, and lime treatment inside the final CTA.

## Component changes

### Shared product destinations

Move the product and download destinations into the existing configuration module so the header, hero, and final CTA consume one source of truth.

### Header

- Replace the waitlist button with **Generate Personalized Mascot**.
- Replace the **Waitlist** navigation item with **Get the App** and point it at the final product CTA section.
- Preserve the current mobile menu behavior and the existing unrelated header changes.

### Hero

- Use the exact primary label **Generate Personalized Mascot**.
- Use **Download Mac App** for the secondary action.
- Preserve the current destinations and visual hierarchy.

### Compatibility section

Replace the sentence inviting visitors to join the waitlist with product-oriented copy that directs them to create their mascot and download the app.

### Final CTA

- Rename the section anchor from `waitlist` to `get-the-app`.
- Replace waitlist supporting copy with direct product copy.
- Present both actions using the same primary and secondary hierarchy as the hero, adapted to the dark CTA panel.

## Accessibility and behavior

- Links retain descriptive visible labels.
- The generation link is normal same-tab navigation to the web app.
- The macOS link includes a `download="The-Mascot.dmg"` hint; browsers may still navigate if the remote server does not permit cross-origin downloads.
- Keyboard focus and responsive wrapping continue to use the existing button styles.

## Verification

- Search source files to confirm no visitor-facing waitlist language remains.
- Confirm all product links use the shared destinations.
- Run TypeScript/build and lint checks.
- Inspect the responsive CTA layouts in the browser at desktop and mobile widths.
- Verify the generation and download link attributes in the rendered page.

## Out of scope

- Changing the app or `.dmg` hosting destinations.
- Modifying the download artifact itself.
- Redesigning unrelated page content or styling.
