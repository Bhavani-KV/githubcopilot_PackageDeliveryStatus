---
description: "Run or resume a single stage of the Agentic SDLC pipeline (requirements, architecture, design-review, impl-plan, code-review, verification, or pr) using the correct upstream artifacts. Use for resuming one stage without restarting the SDLC Orchestrator."
agent: SDLC Orchestrator
argument-hint: "<stage> [jira-key]  e.g. 'requirements KAN-1' or 'architecture'"
---
Run the following single SDLC stage: ${input:stage:Enter stage and optional Jira key, for example requirements KAN-1 or architecture}

Before running it:
1. Determine which stage was requested (requirements, architecture, design-review, impl-plan, code-review, verification, or pr) and which subagent owns it, per your stage-to-input mapping.
2. Confirm the required upstream artifact(s) for that stage already exist at the workspace root. If a required artifact is missing, stop and tell the user which prior stage to run first instead of guessing or skipping ahead.
3. If the stage is `requirements`, use the Jira issue key provided in the input (default `KAN-1`) when invoking the Requirements Agent.
4. Invoke only that stage's subagent, passing it the relevant artifact file(s) as input.
5. Report the artifact produced and whether user approval/answers are needed before the next stage can run.
