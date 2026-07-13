# Mascot Animation Pipeline Skill

**Date:** 2026-07-12  
**Status:** Approved direction

## Goal

Create a repo-local Codex skill that turns one source image into a reusable premium mascot workflow. The skill generates multiple mascot candidates, carries one explicitly selected canonical mascot into multiple office-scene candidates, and produces multiple ready-to-paste image-to-video prompts from one selected office scene.

The skill is for personal use in this project and will live at `.agents/skills/generating-mascot-animation-pipelines`.

## Chosen Direction

Use a checkpointed canonical-reference pipeline:

1. Generate multiple clean mascot candidates from the source image.
2. Pause until the user explicitly selects one canonical mascot.
3. Generate multiple office-scene candidates from the selected mascot.
4. Pause until the user explicitly selects one canonical office scene.
5. Produce multiple animation prompts that vary motion while preserving the selected still image as the visual source of truth.

This design favors identity consistency and user control over maximum unattended output volume.

## Considered Approaches

### 1. Checkpointed canonical reference — selected

Select one canonical output after each image stage. This limits accumulated identity drift, avoids generating expensive downstream variants from weak candidates, and creates a stable reference for future scenes.

### 2. Full fan-out

Generate office scenes and video prompts from every mascot candidate. This maximizes variety but increases cost, review burden, and identity drift.

### 3. Direct office-scene transformation

Generate office scenes directly from the original image and omit the clean mascot stage. This is faster but produces a less reusable character identity and weaker continuity across future scenes.

## Pipeline Contract

### Input

- Require one attached source image or an inspectable local image.
- Treat the source as an identity-preserving edit target, not loose visual inspiration.
- Stop and request a usable image when the source is missing or cannot be inspected.

### Stage 1: Canonical mascot

- Generate three candidates by default, with a user-configurable count.
- Preserve the subject's core identity, silhouette, colors, and recognizable features.
- Simplify details into premium, rounded, vector-like mascot geometry.
- Keep the entire mascot visible, centered, and approximately 70–80% of the canvas.
- Use generous empty padding filled with the chroma color; do not request white padding or a white background.
- Use a perfectly uniform chroma background with no floor, shadow, texture, reflection, gradient, or background object.
- Pause after generation and require the user to select the canonical mascot.

### Stage 2: Canonical office scene

- Use only the selected Stage 1 mascot as the reference.
- Generate three candidates by default, with a user-configurable count.
- Preserve face, hairstyle, skin tone, clothing, accessories, athletic or body proportions, shoes, socks, and overall silhouette.
- Preserve simplified original clothing numbers, patterns, and marks while forbidding invented text or branding.
- Place Agent Mascot on an office chair at a modern wooden desk, typing with both hands on a clean aluminum laptop.
- Keep the complete body, desk, chair, laptop, legs, and feet visible with stable, believable geometry.
- Keep the chroma background perfectly uniform and the composition suitable for animation.
- Pause after generation and require the user to select the canonical office scene.

### Stage 3: Animation prompt package

Create three prompts by default, with a user-configurable count. The default motion variants are:

1. Focused continuous typing loop.
2. Typing with a brief pleased reaction before resuming.
3. A short reading pause followed by resumed typing.

Every prompt must:

- Use the selected office scene as the exact visual reference.
- Preserve Agent Mascot's design, proportions, colors, face, clothing, desk, laptop, framing, lighting, and background.
- Keep the camera completely locked with no zoom, pan, shake, or rotation.
- Restrict movement to Agent Mascot's hands, wrists, eyes, eyelids, head, breathing, subtle body shifts, facial expression, and interactions with the laptop.
- Keep the desk, chair, laptop position, chroma field, perspective, and constant screen glow stable and flicker-free.
- Target a smooth, seamless loop of approximately 5–10 seconds.
- Avoid object deformation, exaggerated cartoon motion, regenerated scenery, identity drift, and appearance changes.

The skill produces ready-to-paste video prompts because no video-generation tool is currently available in this Codex environment.

## Shared Variables and Invariants

- `{{CHROMA_COLOR}}` defaults to `#00FF00`.
- If the chosen key color materially appears in Agent Mascot, select a contrasting configurable color such as `#FF00FF` to preserve subject colors and enable clean extraction.
- Stage counts default to three and remain configurable independently.
- Reuse one identity-lock block across every stage.
- Treat original clothing marks as identity details; prohibit only invented logos, text, and decorative elements.
- Correct the source wording from "sitting on a clean wooden desk" to "sitting at a clean wooden desk, on the office chair behind it."
- Preserve accepted canonical images as immutable references for downstream generation.

## Skill Structure

```text
.agents/skills/generating-mascot-animation-pipelines/
├── SKILL.md
├── agents/
│   └── openai.yaml
└── references/
    ├── prompt-templates.md
    └── quality-gates.md
```

### `SKILL.md`

Define triggers, orchestration, user checkpoints, configurable inputs, output handling, and the required use of the installed image-generation skill. Keep the file concise and route detailed prompt text and checks to references.

### `references/prompt-templates.md`

Contain normalized Stage 1 and Stage 2 prompt templates plus the default Stage 3 motion variants. Separate stable identity and environment locks from variable motion instructions so downstream prompts cannot silently redesign the character.

### `references/quality-gates.md`

Provide acceptance checks for identity, anatomy, clothing, composition, chroma uniformity, object geometry, animation stability, and loop suitability.

### `agents/openai.yaml`

Provide UI-facing display name, concise description, and a default prompt aligned with `SKILL.md`.

No custom script is required initially. The built-in image tool performs image generation, and a Markdown manifest records the selected assets and final animation prompts.

## Output Contract

- Preview candidates after each image stage.
- Save accepted project assets under a dedicated project output directory using stable, descriptive names.
- Do not require rejected preview variants to be retained.
- Write a Markdown manifest containing the source reference, selected canonical assets, effective chroma color, variant counts, final normalized prompts, and generated animation prompts.
- Report saved asset and manifest paths when a run completes.

## Failure Handling

- Missing or unreadable source: stop and request a usable attachment or local path.
- No canonical selection: remain at the current checkpoint and do not fan out downstream work.
- Identity or clothing drift: regenerate with one targeted preservation correction.
- Cropping, extra fingers, warped anatomy, floating objects, or incorrect geometry: reject the candidate and regenerate with the specific defect named.
- Nonuniform or conflicting chroma: change only the background instruction or choose a safe contrasting key color.
- Weak candidate set: generate targeted replacements rather than restarting accepted earlier stages.
- Video prompt drift: restore the selected still as the immutable source and remove any motion instruction that implies scene regeneration.

## Validation Strategy

Follow a skill-authoring RED–GREEN–REFACTOR cycle:

1. Run representative orchestration scenarios without the new skill and record failures such as skipped checkpoints, conflicting background instructions, identity drift, or mixed image/video prompts.
2. Implement the smallest skill and references that address observed failures.
3. Run the same scenarios with the skill and verify correct staging, canonical selection gates, normalized variables, and separated animation prompts.
4. Forward-test the finished skill with a fresh agent using only the skill path and a realistic request.
5. Run the standard skill validator and check that `agents/openai.yaml` matches the final skill.

Live image quality still requires a real source image and user review. Structural validation must not pretend that prompt-only tests prove visual identity preservation.

## Scope Boundaries

- Do not add a video API, external service integration, or model-specific video parameters.
- Do not generate every possible fan-out combination by default.
- Do not automatically remove the chroma background unless the user asks for transparent assets.
- Do not redesign original clothing, invent marks, or add decorative scene objects.
- Do not advance past a selection checkpoint without explicit user input.
