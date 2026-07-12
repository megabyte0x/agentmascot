export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <a className="wordmark" href="#top" aria-label="Agent Mascot home">
          <span className="wordmark__mark" aria-hidden="true">M</span>
          <span>Agent Mascot</span>
        </a>
        <p>© {new Date().getFullYear()} Agent Mascot</p>
      </div>
    </footer>
  );
}
