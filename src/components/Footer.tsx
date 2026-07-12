export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <a className="wordmark" href="#top" aria-label="The Mascot home">
          <span className="wordmark__mark" aria-hidden="true">M</span>
          <span>The Mascot</span>
        </a>
        <p>© {new Date().getFullYear()} The Mascot</p>
      </div>
    </footer>
  );
}
