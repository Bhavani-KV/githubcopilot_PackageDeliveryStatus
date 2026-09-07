# Project Guidelines — Package Delivery Status (Agentic SDLC Capstone)

## Purpose
This workspace demonstrates an Agentic SDLC pipeline, driven by GitHub Copilot custom agents, for a future "Package Delivery Status" application. The SDLC itself is the deliverable being built right now — application code comes later, only after the planning stages are complete and approved.

## SDLC Stages and Artifacts
The pipeline always produces these root-level artifacts, in this order. Each stage reads only the finalized artifact(s) from the prior stage(s):

1. Requirements Agent → `requirements.md` (source: Jira story, read via the `atlassian` MCP server)
2. Architecture Agent → `architecture.md` (source: `requirements.md`)
3. Design Review Agent → `design-review.md` (source: `architecture.md`, may update `architecture.md`)
4. Implementation Planning Agent → `impl-plan.md` (source: `architecture.md` + `design-review.md`)
5. Implementation (Copilot agent mode, no dedicated `.agent.md`) → application code (source: `impl-plan.md`)
6. Code Review Agent → `code-review.md` (source: implementation diff)
7. Verification Agent → `verification-report.md` (source: implementation + tests)
8. PR Agent → `pr-description.md` (source: all prior artifacts)

## Rules
- Do not invent or assume requirements — ask the user clarification questions and wait for answers.
- Do not skip a stage or generate an artifact before its required upstream artifact exists and is approved by the user.
- Do not write application source code until `impl-plan.md` exists and has been approved.
- Each agent stays in its lane: only the Requirements Agent talks to Jira; only the Implementation stage writes application code.
- Use the `SDLC Orchestrator` agent to run the full pipeline, or invoke a single stage agent directly to resume/redo one stage.

## Jira Access
The `atlassian` MCP server (configured in [.mcp.json](../.mcp.json)) is how the Requirements Agent reads Jira stories (e.g. `KAN-1`). It requires `JIRA_URL`, `JIRA_USERNAME`, and `JIRA_API_TOKEN` environment variables to be set locally.
