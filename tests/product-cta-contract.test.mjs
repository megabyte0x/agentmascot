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
  assert.match(
    config,
    /macAppDmgUrl\s*=\s*"https:\/\/coojbofwpebbwwqpefwr\.supabase\.co\/storage\/v1\/object\/public\/default-bucket\/Morphling\.dmg"/,
  );
  assert.equal((componentSource.match(/from "\.\.\/config"/g) ?? []).length, 3);
  assert.equal((componentSource.match(/download="Morphling\.dmg"/g) ?? []).length, 2);
});

test("the long header CTA is hidden at phone widths", () => {
  const styles = read("src/styles.css");
  assert.match(
    styles,
    /@media \(max-width: 520px\)[\s\S]*?\.site-header \.button \{ display: none; \}/,
  );
});
