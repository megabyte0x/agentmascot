import { Section } from "./Section";

export function Compatibility() {
  return (
    <Section className="compatibility" labelledBy="compatibility-title">
      <div>
        <p className="kicker">Built for the next prompt</p>
        <h2 id="compatibility-title">Designed for Hermes, Codex, and modern agent workflows.</h2>
        <div className="compatibility__tools" aria-label="Lead workflows">
          <span>Hermes</span>
          <span>Codex</span>
        </div>
      </div>
      <p className="compatibility__note">The Mascot is being shaped around the coding-agent workflows developers already use. Join the waitlist to follow its development.</p>
    </Section>
  );
}
