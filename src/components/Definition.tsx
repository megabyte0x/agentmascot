import { agentMascotAppUrl } from "../config";
import { Section } from "./Section";

export function Definition() {
  return (
    <Section id="what-is-agent-mascot" className="definition" labelledBy="definition-title">
      <div className="definition__heading">
        <p className="kicker">A visible sense of progress</p>
        <h2 id="definition-title">What is Agent Mascot?</h2>
      </div>
      <div className="definition__copy" data-citable-answer>
        <p>
          Agent Mascot is a personalized desktop companion for people who use local AI coding agents on macOS. It sits beside the coding workflow and turns the agent&apos;s current state into a visible presence: calm when the agent is idle, active while work is in progress, and noticeable when the agent needs input. The companion does not replace the coding agent or change the way a developer gives it instructions. Instead, it adds a lightweight visual layer to the workflow developers already use, helping state changes stand out when attention is on code, documentation, or another window. People can create a personalized mascot through the official Agent Mascot application, then download the Mac app as Morphling.dmg to bring that companion to the desktop. The product is designed around one focused job: making the rhythm of a local coding-agent session easier to see and feel without turning the companion into the main workspace.
        </p>
        <a className="text-link" href={agentMascotAppUrl}>
          Open the official Agent Mascot application <span aria-hidden="true">↗</span>
        </a>
      </div>
    </Section>
  );
}
