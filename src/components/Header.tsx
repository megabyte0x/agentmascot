import { useEffect, useState } from "react";
import { agentMascotAppUrl } from "../config";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="wordmark" href="#top" aria-label="Agent Mascot home">
          <span className="wordmark__mark" aria-hidden="true">M</span>
          <span>Agent Mascot</span>
        </a>
        <nav
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          <a href="#how-it-works" onClick={closeMenu}>How it works</a>
          <a href="#states" onClick={closeMenu}>States</a>
          <a href="#get-the-app" onClick={closeMenu}>Get the App</a>
        </nav>
        <a className="button button--small" href={agentMascotAppUrl}>
          Generate Personalized Mascot <span aria-hidden="true">↗</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
