---
name: verification-test-evidence
description: "Use when running or documenting verification, tests, and other evidence for an implementation or SDLC handoff."
---

# Verification and Test Evidence

## When to Use
- Run tests or other verification checks for an implementation.
- Prepare a verification report or substantiate a claim that a change is ready for handoff.

## Procedure
1. Identify the implementation scope and the requirements or acceptance criteria being verified.
2. Select the narrowest relevant checks first, then run any required project-level verification gates.
3. Record each command or check, its result, and relevant test totals or failure details.
4. Link evidence to requirement identifiers and affected code or test files where possible.
5. Separate passed, failed, blocked, and not-run checks. State environmental limitations and unresolved gaps.

## Evidence Rules
- Report only checks actually performed; do not present suggested commands as executed evidence.
- Do not claim full coverage from a passing test suite without checking which requirements it covers.
- Preserve failures and uncertainty in the report; do not edit tests or implementation merely to make the evidence appear green.