# GitHub Copilot Practices in This Repository

These are repository-specific working examples, not claims that unconfigured Copilot or MCP features are available. The configurations referenced below are present in this workspace; successful service connections are not verified here.

## Copilot Modes

The repository explicitly assigns implementation to Copilot Agent mode, following the approved `impl-plan.md` (`.github/copilot-instructions.md`). Example: `Implement TASK-02 from the approved impl-plan.md. Change only its listed deliverables, then stop.` For a review, make the no-edit constraint explicit: `Compare AC-01 through AC-04 with the named source and test files. Do not edit files; return evidence and gaps.`

To demonstrate Ask mode in VS Code, ask: `Explain how the Requirements Agent handles unanswered clarification questions. Cite its repository instructions; do not edit files.`

## Skills and Instructions

Use `.github/copilot-instructions.md` for repository-wide SDLC rules. The file instruction in `.github/instructions/sdlc-artifacts.instructions.md` is scoped to the named root artifact files by `applyTo`. Use a skill for an on-demand procedure, such as `.github/skills/sdlc-artifact-handoff/SKILL.md` when checking stage inputs and handoff. Example: follow repository rules on every task, load the handoff procedure when preparing a stage transition.

## Long-Context Handling

To reduce important details being buried in long context, put the goal, authoritative artifact, and constraints first; provide only the relevant stage inputs; finish with a short checklist of required outputs and stop conditions. Example: give the Architecture Agent `requirements.md`, ask for the architecture decisions and open questions, and explicitly prohibit invented requirements. This is a prompting practice, not a measured guarantee about model attention.

## Reusable Prompt Prefix

Keep stable role and constraints together, then append task-specific material. Reuse is a prompt-organization practice; this repository does not demonstrate or guarantee platform prompt caching.

Stable prefix:

> You are the Requirements Agent for this repository. Use only Jira issue content and user clarifications. Do not invent requirements. Ask necessary clarification questions and wait before writing `requirements.md`.

Variable task section:

> Jira key: `KAN-1`. Issue content: [provide the retrieved summary, description, and acceptance criteria]. User clarifications: [provide answers, if any].

## Memory and Persistent Context

No user, session, or agent-memory configuration is evidenced in this repository. The persistent project context is in files: approved decisions in `requirements.md` and later stage artifacts, and stage progress in `sdlc-status.md`. Treat that status log as workflow evidence, not conversational or model memory. Example: reopen the relevant approved artifact rather than relying on an earlier chat.

## Token-Conscious Prompts

- Name only the source files and acceptance criteria relevant to the task.
- Request a defined output shape and omit background already captured in approved artifacts.
- Prefer a focused stage handoff over pasting the entire pipeline history.

Before: `Review everything and tell me if it is good.`

After: `Using only requirements.md, check AC-03 against src/trackerService.js, src/app.js, and tests/trackerService.test.js. Return evidence and status; do not edit files or run tests.`

## Jira and GitHub MCP Configuration

The workspace configuration is [`.vscode/mcp.json`](../.vscode/mcp.json). It declares an `atlassian` stdio server with `JIRA_URL`, `JIRA_USERNAME`, and `JIRA_API_TOKEN` environment references, and a `github` HTTP server with `GITHUB_PERSONAL_ACCESS_TOKEN`. Example request when the configured server is exposed to the session: ask the Requirements Agent to read Jira `KAN-1`, summarize only its stated acceptance criteria, and ask unresolved clarifications before authoring requirements. For GitHub, request a read-only repository lookup before any write operation. The config alone does not prove credentials, connection, or a particular agent's MCP tool access.