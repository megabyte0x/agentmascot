import { agentStates } from "../content/landing";
import { Section } from "./Section";

export function AgentStates() {
  return (
    <Section id="states" className="states" labelledBy="states-title">
      <div className="section-heading states__heading">
        <p className="kicker">Read the room</p>
        <h2 id="states-title">A clear state, without another dashboard.</h2>
        <p>The Mascot communicates the part of your agent workflow that is easiest to miss when you are deep in the work.</p>
      </div>
      <div className="state-grid">
        {agentStates.map((state, index) => (
          <article className={`state-card state-card--${index + 1}`} key={state.name}>
            <div className="state-card__signal" aria-hidden="true"><i /><i /><i /></div>
            <p className="state-card__label">{state.signal}</p>
            <h3>{state.name}</h3>
            <p>{state.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
