---
name: requirements-traceability
description: "Use when mapping approved requirements to architecture, implementation plans, code, and tests, or when checking requirement coverage."
---

# Requirements Traceability

## When to Use
- Build or update a traceability matrix from the approved `requirements.md`.
- Check whether requirements are addressed by design, implementation, and verification evidence.

## Procedure
1. Use the approved `requirements.md` as the source of truth; preserve its identifiers and meaning.
2. For each requirement, identify the relevant downstream artifact section, code location, and test or verification evidence when available.
3. Mark coverage as covered, partial, missing, or not verifiable, and explain gaps briefly.
4. Record downstream items that have no supporting requirement as untraced for review rather than assuming intent.
5. Present the mapping in a concise table and distinguish confirmed links from inferred candidates.

## Boundaries
- Do not invent requirements, identifiers, acceptance criteria, or implementation evidence.
- Do not change approved upstream requirements while building the mapping.
- Ask the user to resolve ambiguous or conflicting requirements before claiming coverage.

## Guardrails
- Use only approved artifacts and repository evidence; never infer completion from intent or planned work.
- Do not mark a requirement as covered unless supporting evidence is identified.
- Mark requirements without code or test evidence as `partial`, `missing`, or `not verifiable`.
- Do not allow implementation, verification, or PR completion to claim all requirements are complete when any required item is missing or unverified.
- Do not modify `requirements.md` or approved upstream artifacts while performing traceability.
- Stop and request clarification if requirements conflict, identifiers are missing, or evidence cannot be reliably linked.