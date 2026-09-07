---
name: sdlc-artifact-handoff
description: 'Defines how Agentic SDLC stage artifacts (requirements.md, architecture.md, design-review.md, impl-plan.md, code-review.md, verification-report.md, pr-description.md) are read, approved, and handed off between stages. Use when starting or finishing any SDLC stage to check upstream inputs, avoid re-deriving prior decisions, and log stage status.'
---

# SDLC Artifact Handoff

## When to Use
- Before starting any SDLC stage, to confirm the required upstream artifact(s) exist and are approved.
- After finishing any SDLC stage, to log the new artifact's status and hand off cleanly to the next stage.

## Artifact Contract
Each stage produces exactly one root-level Markdown artifact and depends only on the finalized artifact(s) from its direct predecessor(s) — never on raw sources (like Jira) once a downstream artifact exists.

| Stage | Reads | Writes |
|---|---|---|
| Requirements | Jira issue | `requirements.md` |
| Architecture | `requirements.md` | `architecture.md` |
| Design Review | `architecture.md` | `design-review.md` (+ updates to `architecture.md` if approved) |
| Implementation Planning | `architecture.md`, `design-review.md` | `impl-plan.md` |
| Implementation | `impl-plan.md` | application code |
| Code Review | implementation changes | `code-review.md` |
| Verification | implementation changes, tests | `verification-report.md` |
| PR | all of the above | `pr-description.md` |

## Procedure

1. **Check inputs before starting.** Verify every artifact in the "Reads" column for your stage exists at the workspace root. If one is missing, stop and tell the user which prior stage to run instead of guessing at its content.
2. **Treat existing artifacts as the source of truth.** Once `requirements.md` exists, do not re-read Jira for requirements — read the file. Once `architecture.md` exists, do not re-derive architecture from `requirements.md` from scratch — read the file. This prevents stages from silently diverging from earlier, human-approved decisions.
3. **Ask before overriding a prior decision.** If a later stage finds that an earlier artifact needs to change (e.g. Design Review wants to change Architecture), propose the change to the user and only edit the earlier artifact after the user approves it.
4. **Write the "Writes" artifact for your stage only.** Keep each artifact self-contained and readable on its own — a reviewer should be able to open just `impl-plan.md` and understand the plan without opening every other file.
5. **Log the handoff.** Append one line to `sdlc-status.md` at the workspace root (create it if missing) in the form:
   `- [<stage name>] wrote <artifact file> — pending user approval`
   This gives the reviewer/orchestrator a single place to see pipeline progress.
6. **Stop for approval.** After writing your artifact and logging it, tell the user what you produced and that you are stopping until they approve it or answer open questions — do not auto-continue to the next stage.
