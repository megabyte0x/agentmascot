import { benefits } from "../content/landing";
import { Section } from "./Section";

export function BenefitStrip() {
  return (
    <Section className="benefits" labelledBy="benefits-title">
      <div className="section-heading section-heading--compact">
        <p className="kicker">Why a companion?</p>
        <h2 id="benefits-title">Keep the important parts of the loop visible.</h2>
      </div>
      <div className="benefit-grid">
        {benefits.map((benefit) => (
          <article className="benefit" key={benefit.number}>
            <span className="benefit__number">{benefit.number}</span>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
