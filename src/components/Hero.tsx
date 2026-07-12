import { useReducedMotion } from "../hooks/useReducedMotion";
import { WaitlistLink } from "./WaitlistLink";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="eyebrow"><span aria-hidden="true" /> A companion for local agent workflows</p>
          <h1 id="hero-title">Give your AI coding agent a personalized desktop companion.</h1>
          <p className="hero__lede">
            The Mascot lives beside your coding agent, reflects its current state, and makes
            requests for input visible when it matters.
          </p>
          <div className="hero__actions">
            <WaitlistLink>Join the waitlist</WaitlistLink>
            <a className="text-link" href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="hero__media">
          <span className="floating-status floating-status--working" aria-hidden="true"><i /> Agent working</span>
          <span className="floating-status floating-status--input" aria-hidden="true"><i /> Needs input</span>
          <div className="hero__media-frame">
            <div className="hero__media-bar" aria-hidden="true">
              <div className="window-dots"><span /><span /><span /></div>
              <span className="window-title">The Mascot · agent companion</span>
            </div>
            {prefersReducedMotion ? (
              <img
                src="/media/the-mascot-demo-poster.webp"
                width="1280"
                height="720"
                alt="The Mascot beside an AI coding-agent workflow"
              />
            ) : (
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="/media/the-mascot-demo-poster.webp"
                width={1280}
                height={720}
                preload="metadata"
                aria-label="The Mascot reacting beside an AI coding-agent workflow"
              >
                <source src="/media/the-mascot-demo.webm" type="video/webm" />
                <source src="/media/the-mascot-demo.mp4" type="video/mp4" />
              </video>
            )}
          </div>
          <p className="hero__media-caption"><span className="status-dot" aria-hidden="true" /> A small signal, always within reach.</p>
        </div>
      </div>
    </section>
  );
}
