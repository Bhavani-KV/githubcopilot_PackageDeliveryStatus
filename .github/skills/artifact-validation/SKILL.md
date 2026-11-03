---
name: artifact-validation
description: "Use when checking an Agentic SDLC artifact for completeness, consistency, correct scope, and readiness for handoff."
---

# Artifact Validation

## When to Use
- Validate a requirements, architecture, design review, implementation plan, code review, verification report, or PR description artifact.
- Check an artifact before presenting it for approval or handing it to the next SDLC stage.

## Procedure
1. Identify the artifact's stage and the required upstream inputs from the project instructions.
2. Confirm the artifact exists at the expected location and contains the information needed for its stage.
3. Check that claims and decisions are consistent with the approved upstream artifacts. Do not fill gaps by guessing.
4. Check links, referenced files, and stated outputs when they can be verified in the workspace.
5. Report findings as pass, issue, or not verified, with a concise reason and the affected section.

## Boundaries
- Do not silently rewrite an artifact during validation.
- Do not treat an unstated convention as a requirement.
- Ask for clarification when an upstream decision is missing or contradictory.

## Handoff Decision
- Mark the artifact as `ready for approval`, `not ready`, or `blocked`.
- Do not allow handoff to the next stage until required upstream inputs exist and the artifact is approved according to the project’s human-in-the-loop rules.
- Report the artifact path, validation decision, open issues or questions, and the next allowed stage.