import { WaitlistLink } from "./WaitlistLink";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="wordmark" href="#top" aria-label="The Mascot home">
          <span className="wordmark__mark" aria-hidden="true">M</span>
          <span>The Mascot</span>
        </a>
        <span className="header-status" aria-label="The Mascot is in development">
          <span className="status-dot" aria-hidden="true" /> in development
        </span>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#states">States</a>
          <a href="#waitlist">Waitlist</a>
        </nav>
        <WaitlistLink className="button--small">Join the waitlist</WaitlistLink>
      </div>
    </header>
  );
}
