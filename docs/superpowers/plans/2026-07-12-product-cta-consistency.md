# Product CTA Consistency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every visitor-facing waitlist conversion surface with consistent mascot-generation and macOS-download actions.

**Architecture:** Keep the two production destinations in `src/config.ts` and render ordinary accessible anchors in the header, hero, and final CTA. Add a dependency-free Node contract test that verifies the exact copy, destinations, download attribute, final-section anchor, and absence of visitor-facing waitlist text.

**Tech Stack:** React 19, TypeScript 6, Vite 8, CSS, Node test runner

## Global Constraints

- Primary copy is exactly **Generate Personalized Mascot**.
- Secondary copy is exactly **Download Mac App**.
- The primary destination is exactly `https://app.agentmascot.app`.
- The macOS destination is exactly `https://app.agentmascot.app/downloads/the-mascot.dmg`.
- Preserve the existing visual system and all unrelated uncommitted changes in `src/components/Header.tsx` and `src/styles.css`.
- Do not change the hosted application or `.dmg` artifact.

---

### Task 1: Lock the product CTA contract and centralize destinations

**Files:**
- Create: `tests/product-cta-contract.test.mjs`
- Modify: `src/config.ts`

**Interfaces:**
- Consumes: Node's built-in `node:test`, `node:assert/strict`, and `node:fs` APIs.
- Produces: `agentMascotAppUrl: string` and `macAppDmgUrl: string` exports for all CTA components.

- [ ] **Step 1: Write the failing CTA contract test**

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const componentSource = [
  "src/components/Header.tsx",
  "src/components/Hero.tsx",
  "src/components/Compatibility.tsx",
  "src/components/FinalCta.tsx",
].map(read).join("\n");

test("all conversion surfaces use the product CTA contract", () => {
  assert.equal((componentSource.match(/Generate Personalized Mascot/g) ?? []).length, 3);
  assert.equal((componentSource.match(/Download Mac App/g) ?? []).length, 2);
  assert.doesNotMatch(componentSource, /waitlist/i);
  assert.match(read("src/components/FinalCta.tsx"), /id="get-the-app"/);
  assert.match(read("src/components/Header.tsx"), /href="#get-the-app"/);
});

test("product destinations are centralized and the Mac action is a DMG download", () => {
  const config = read("src/config.ts");
  assert.match(config, /agentMascotAppUrl\s*=\s*"https:\/\/app\.agentmascot\.app"/);
  assert.match(config, /macAppDmgUrl\s*=\s*`\$\{agentMascotAppUrl\}\/downloads\/the-mascot\.dmg`/);
  assert.equal((componentSource.match(/from "\.\.\/config"/g) ?? []).length, 3);
  assert.equal((componentSource.match(/download="The-Mascot\.dmg"/g) ?? []).length, 2);
});
```

- [ ] **Step 2: Run the contract test and confirm it fails**

Run: `node --test tests/product-cta-contract.test.mjs`

Expected: FAIL because the header and final CTA still contain waitlist language and the URLs are not exported from `src/config.ts`.

- [ ] **Step 3: Export the shared destinations**

Append to `src/config.ts`:

```ts
export const agentMascotAppUrl = "https://app.agentmascot.app";
export const macAppDmgUrl = `${agentMascotAppUrl}/downloads/the-mascot.dmg`;
```

- [ ] **Step 4: Leave the test red until all conversion surfaces are updated**

Run: `node --test tests/product-cta-contract.test.mjs`

Expected: FAIL only on component-copy and component-link assertions; destination assertions pass.

### Task 2: Replace every visitor-facing waitlist surface

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Compatibility.tsx`
- Modify: `src/components/FinalCta.tsx`
- Modify: `src/styles.css`
- Delete: `src/components/WaitlistLink.tsx`

**Interfaces:**
- Consumes: `agentMascotAppUrl` and `macAppDmgUrl` from `src/config.ts`.
- Produces: three **Generate Personalized Mascot** links, two **Download Mac App** links, and the `#get-the-app` page anchor.

- [ ] **Step 1: Update the header navigation and primary CTA**

Replace the waitlist import and actions while retaining the existing menu state and unrelated header edits:

```tsx
import { agentMascotAppUrl } from "../config";

<a href="#get-the-app" onClick={closeMenu}>Get the App</a>

<a className="button button--small" href={agentMascotAppUrl}>
  Generate Personalized Mascot <span aria-hidden="true">↗</span>
</a>
```

- [ ] **Step 2: Update the hero to consume shared destinations and exact labels**

```tsx
import { agentMascotAppUrl, macAppDmgUrl } from "../config";

<div className="hero__actions">
  <a className="button" href={agentMascotAppUrl}>
    Generate Personalized Mascot <span aria-hidden="true">↗</span>
  </a>
  <a className="text-link" href={macAppDmgUrl} download="The-Mascot.dmg">
    Download Mac App <span aria-hidden="true">↓</span>
  </a>
</div>
```

- [ ] **Step 3: Replace the compatibility waitlist sentence**

```tsx
<p className="compatibility__note">
  Create a personalized mascot for the coding-agent workflows you already use, then bring it to your desktop with the Mac app.
</p>
```

- [ ] **Step 4: Replace the final waitlist section with both product actions**

```tsx
import { agentMascotAppUrl, macAppDmgUrl } from "../config";

<section className="final-cta" id="get-the-app" aria-labelledby="final-cta-title" data-reveal>
  <div className="final-cta__inner">
    <p className="kicker">Meet your agent where it works</p>
    <h2 id="final-cta-title">Give your coding agent a companion with presence.</h2>
    <p>Generate a mascot that feels like yours, then bring it beside your coding-agent workflow on macOS.</p>
    <div className="final-cta__actions">
      <a className="button" href={agentMascotAppUrl}>
        Generate Personalized Mascot <span aria-hidden="true">↗</span>
      </a>
      <a className="text-link" href={macAppDmgUrl} download="The-Mascot.dmg">
        Download Mac App <span aria-hidden="true">↓</span>
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Add final CTA action styling without disturbing existing edits**

Add beside the existing final CTA rules:

```css
.final-cta__actions { position: relative; z-index: 1; display: flex; flex-wrap: wrap; gap: 12px; }
.final-cta .text-link { border-color: rgba(255,255,255,.18); color: #fff; background: rgba(255,255,255,.07); }
.final-cta .text-link:hover { background: rgba(255,255,255,.13); }
```

Add inside the existing `@media (max-width: 520px)` block:

```css
.final-cta__actions > * { width: 100%; }
```

- [ ] **Step 6: Remove the obsolete waitlist component**

Delete `src/components/WaitlistLink.tsx` after confirming it has no imports:

Run: `rg -n "WaitlistLink" src`

Expected: only `src/components/WaitlistLink.tsx` matches before deletion; no matches afterward.

- [ ] **Step 7: Run the focused contract test**

Run: `node --test tests/product-cta-contract.test.mjs`

Expected: 2 tests pass, 0 fail.

- [ ] **Step 8: Run static verification**

Run: `npm run typecheck && npm run lint && npm run build`

Expected: all commands exit 0 and Vite emits the production bundle in `dist/`.

- [ ] **Step 9: Inspect visitor-facing source language**

Run: `rg -n -i "waitlist|join the waitlist" src`

Expected: no matches.

- [ ] **Step 10: Verify the page at desktop and mobile widths**

Run the Vite preview and inspect the header, hero, compatibility copy, and final CTA at approximately 1440px and 390px widths. Confirm both final CTA buttons remain readable, keyboard-focusable, and non-overlapping.

- [ ] **Step 11: Commit the implementation**

```bash
git add tests/product-cta-contract.test.mjs src/config.ts src/components/Header.tsx src/components/Hero.tsx src/components/Compatibility.tsx src/components/FinalCta.tsx src/components/WaitlistLink.tsx src/styles.css
git commit -m "feat: replace waitlist with product CTAs"
```
