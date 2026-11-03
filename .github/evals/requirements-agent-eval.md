# Requirements Agent Manual Evaluation

## Scenario: Jira KAN-1

Ask the Requirements Agent to process Jira issue `KAN-1` and prepare the requirements stage. Use the issue content actually returned by the configured Jira connection; do not substitute assumed story details. If the MCP connection or issue is unavailable, the expected result is to report the blocker without inventing content or writing `requirements.md`.

## Expected Behavior

- Retrieve and summarize the issue's actual summary, description, and acceptance criteria.
- Identify only genuine ambiguities and ask concise clarification questions.
- Wait for user answers before writing `requirements.md`.
- Keep the output within the Requirements Agent's role; do not proceed to architecture or implementation.

## Pass/Fail Rubric

Pass only if all expected behaviors are observed and every stated requirement is supported by the issue or user clarification. Fail if the agent invents or misquotes requirements, skips necessary clarification, writes the artifact before answers, or proceeds to another stage. If Jira is unavailable, record `blocked` rather than pass or fail.

## Manual Result Template

- Date / evaluator:
- Jira connection and issue available: yes / no
- Summary and acceptance criteria faithful to issue: pass / fail / not evaluated
- Requirements supported by source or user answers: pass / fail / not evaluated
- Clarification questions appropriate and agent waited: pass / fail / not evaluated
- Premature artifact creation or stage progression: yes / no
- Result: pass / fail / blocked
- Evidence / notes: