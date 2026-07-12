import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");

test("publishes Agent Mascot canonical metadata and linked schema", () => {
  const html = read("index.html");
  assert.match(html, /<title>AI Coding Agent Desktop Companion \| Agent Mascot<\/title>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/agentmascot\.app\/"/);
  assert.match(html, /property="og:image" content="https:\/\/agentmascot\.app\/og\/agent-mascot-og\.webp"/);
  assert.match(html, /type="application\/ld\+json"/);
  for (const type of ["Organization", "WebSite", "WebPage", "SoftwareApplication", "VideoObject"]) {
    assert.match(html, new RegExp(`"@type": "${type}"`));
  }
  assert.doesNotMatch(html, />The Mascot<|content="The Mascot|<title[^>]*>The Mascot/);
});

test("publishes crawler, sitemap, and llms guidance", () => {
  const robots = read("public/robots.txt");
  assert.match(robots, /User-agent: OAI-SearchBot[\s\S]*Allow: \//);
  assert.match(robots, /User-agent: PerplexityBot[\s\S]*Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/agentmascot\.app\/sitemap\.xml/);

  const sitemap = read("public/sitemap.xml");
  assert.match(sitemap, /<loc>https:\/\/agentmascot\.app\/<\/loc>/);

  const llms = read("public/llms.txt");
  assert.match(llms, /^# Agent Mascot/m);
  assert.match(llms, /https:\/\/app\.agentmascot\.app/);
});

test("adds one citable answer block with verified product facts", () => {
  const source = read("src/components/Definition.tsx");
  const match = source.match(/data-citable-answer[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/);
  assert.ok(match, "expected a data-citable-answer section");
  const words = match[1].replace(/<[^>]+>/g, " ").replace(/&apos;/g, "'").replace(/\s+/g, " ").trim().split(" ");
  assert.ok(words.length >= 134 && words.length <= 167, `expected 134-167 words, received ${words.length}`);
  assert.match(read("src/App.tsx"), /<Definition \/>/);
});

test("production build contains meaningful initial HTML", () => {
  const html = read("dist/index.html");
  assert.match(html, /<h1[^>]*>[^<]*AI coding agent[^<]*desktop companion/i);
  assert.match(html, /data-citable-answer/);
  assert.match(html, /https:\/\/app\.agentmascot\.app/);
  assert.match(html, /Morphling\.dmg/);
  assert.doesNotMatch(html, /<div id="root"><\/div>/);
});

test("uses Agent Mascot consistently in public-facing source", () => {
  const files = [
    "src/components/Header.tsx",
    "src/components/Hero.tsx",
    "src/components/Footer.tsx",
    "src/content/landing.ts",
    "public/favicon.svg",
  ];
  for (const file of files) {
    assert.doesNotMatch(read(file), /The Mascot/, `${file} uses the legacy name`);
  }
});
