import { WaitlistLink } from "./WaitlistLink";

export function FinalCta() {
  return (
    <section className="final-cta" id="waitlist" aria-labelledby="final-cta-title" data-reveal>
      <div className="final-cta__inner">
        <p className="kicker">Meet your agent where it works</p>
        <h2 id="final-cta-title">Give your coding agent a companion with presence.</h2>
        <p>Be among the first developers to see what The Mascot becomes.</p>
        <WaitlistLink>Join the waitlist</WaitlistLink>
      </div>
    </section>
  );
}
