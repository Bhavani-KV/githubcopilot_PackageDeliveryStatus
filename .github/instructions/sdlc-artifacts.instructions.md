---
applyTo: "{requirements,architecture,design-review,impl-plan,code-review,verification-report,pr-description,sdlc-status}.md"
description: "Guidance for authoring and reviewing root-level Agentic SDLC Markdown artifacts in this repository."
---

# SDLC Artifact Instructions

These instructions apply only to the named root-level SDLC Markdown artifacts. They do not apply to application source, tests, agent definitions, skills, or general documentation.

- Follow the stage order and upstream-artifact rules in `.github/copilot-instructions.md`.
- Treat approved upstream artifacts as the source of truth; do not invent requirements or silently change prior decisions.
- Distinguish proposed, pending, and approved decisions. Do not mark an artifact approved without recorded user approval.
- Cite repository paths for implementation and test evidence. In verification reports, separate checks actually run from checks not run or merely proposed.
- Keep each artifact focused on its stage and handoff needs.