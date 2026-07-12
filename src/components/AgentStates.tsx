import { useState } from "react";
import { agentStates } from "../content/landing";
import { Section } from "./Section";

export function AgentStates() {
  const [activeState, setActiveState] = useState(1);
  const selectedState = agentStates[activeState];

  return (
    <Section id="states" className="states" labelledBy="states-title">
      <div className="section-heading states__heading">
        <p className="kicker">Read the room</p>
        <h2 id="states-title">A clear state, without another dashboard.</h2>
        <p>The Mascot communicates the part of your agent workflow that is easiest to miss when you are deep in the work.</p>
      </div>
      <div className={`state-preview state-preview--${activeState + 1}`} aria-live="polite">
        <div className="state-preview__mascot" aria-hidden="true">
          <span>M</span>
          <i />
        </div>
        <div className="state-preview__copy">
          <span>Live preview</span>
          <strong>{selectedState.name}</strong>
        </div>
        <p>{selectedState.description}</p>
        <span className="state-preview__status"><i aria-hidden="true" /> {selectedState.signal}</span>
      </div>
      <div className="state-grid">
        {agentStates.map((state, index) => (
          <article
            className={`state-card state-card--${index + 1} ${activeState === index ? "is-active" : ""}`}
            key={state.name}
          >
            <button
              className="state-card__select"
              type="button"
              aria-label={`Preview the ${state.name} state`}
              aria-pressed={activeState === index}
              onClick={() => setActiveState(index)}
            />
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
