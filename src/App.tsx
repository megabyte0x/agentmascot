import { AgentStates } from "./components/AgentStates";
import { BenefitStrip } from "./components/BenefitStrip";
import { Compatibility } from "./components/Compatibility";
import { Definition } from "./components/Definition";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { useScrollReveal } from "./hooks/useScrollReveal";

function App() {
  useScrollReveal();

  return (
    <div className="page-shell">
      <Header />
      <main>
        <Hero />
        <Definition />
        <BenefitStrip />
        <AgentStates />
        <HowItWorks />
        <Compatibility />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

export default App;
