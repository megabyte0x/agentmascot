import { workflow } from "../content/landing";
import { Section } from "./Section";

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="workflow" labelledBy="workflow-title">
      <div className="workflow__intro">
        <p className="kicker">How it works</p>
        <h2 id="workflow-title">A companion that stays in the flow.</h2>
      </div>
      <ol className="workflow__list">
        {workflow.map((step, index) => (
          <li key={step}>
            <span aria-hidden="true">0{index + 1}</span>
            <p>{step}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
