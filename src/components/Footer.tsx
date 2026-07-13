export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <a className="wordmark" href="#top" aria-label="Agent Mascot home">
          <img className="wordmark__mark" src="/agent-mascot-mark.png" alt="" aria-hidden="true" />
          <span>Agent Mascot</span>
        </a>
        <p>© {new Date().getFullYear()} Agent Mascot</p>
      </div>
    </footer>
  );
}
