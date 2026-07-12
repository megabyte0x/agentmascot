export const benefits = [
  {
    number: "01",
    title: "See what your agent is doing",
    description:
      "Keep the workflow legible at a glance without pulling focus from the work in front of you.",
  },
  {
    number: "02",
    title: "Know when it needs you",
    description:
      "A clear visual state makes a prompt for input harder to miss at exactly the right moment.",
  },
  {
    number: "03",
    title: "Make the companion your own",
    description:
      "The Mascot is designed to feel like a personal presence alongside your local workflow.",
  },
] as const;

export const agentStates = [
  {
    name: "Idle",
    signal: "Standing by",
    description:
      "Your agent is available and waiting. The companion stays calm, present, and out of your way.",
  },
  {
    name: "Working",
    signal: "In progress",
    description:
      "Your agent is actively working through a task, so you can keep context without watching a terminal.",
  },
  {
    name: "Needs Input",
    signal: "Your turn",
    description:
      "The agent has reached a decision or request that benefits from your attention and intervention.",
  },
] as const;

export const workflow = [
  "Run The Mascot beside your coding-agent workflow.",
  "Let the companion reflect the agent's current state.",
  "Notice immediately when the agent needs intervention.",
] as const;
