import { agentMascotAppUrl, macAppDmgUrl } from "../config";

export function FinalCta() {
  return (
    <section className="final-cta" id="get-the-app" aria-labelledby="final-cta-title" data-reveal>
      <div className="final-cta__inner">
        <p className="kicker">Meet your agent where it works</p>
        <h2 id="final-cta-title">Give your coding agent a companion with presence.</h2>
        <p>Generate a mascot that feels like yours, then bring it beside your coding-agent workflow on macOS.</p>
        <div className="final-cta__actions">
          <a className="button" href={agentMascotAppUrl}>
            Generate Personalized Mascot <span aria-hidden="true">↗</span>
          </a>
          <a className="text-link" href={macAppDmgUrl} download="The-Mascot.dmg">
            Download Mac App <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
