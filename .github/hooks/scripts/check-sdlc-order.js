#!/usr/bin/env node
// PreToolUse hook: block application code edits until impl-plan.md is approved.
const fs = require('fs');
const path = require('path');

const EDIT_TOOLS = new Set([
  'apply_patch',
  'create_file',
  'replace_string_in_file',
  'multi_replace_string_in_file',
  'edit_notebook_file',
]);

const SDLC_DOC_NAMES = new Set([
  'requirements.md',
  'architecture.md',
  'design-review.md',
  'impl-plan.md',
  'code-review.md',
  'verification-report.md',
  'pr-description.md',
  'sdlc-status.md',
]);

function allow() {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'allow' },
  }));
  process.exit(0);
}

function deny(reason) {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: reason,
    },
  }));
  process.exit(0);
}

let raw = '';
process.stdin.on('data', (chunk) => { raw += chunk; });
process.stdin.on('end', () => {
  try {
    const payload = JSON.parse(raw || '{}');
    const toolName = payload.tool_name || payload.toolName || '';
    if (!EDIT_TOOLS.has(toolName)) return allow();

    const toolInput = payload.tool_input || payload.toolInput || {};
    const targetPaths = toolInput.filePath
      ? [toolInput.filePath]
      : Array.isArray(toolInput.replacements)
        ? toolInput.replacements.map((replacement) => replacement.filePath).filter(Boolean)
        : typeof toolInput.input === 'string'
          ? Array.from(toolInput.input.matchAll(/^\*\*\* (?:Update|Add|Delete) File: (.+)$/gm), (match) => match[1])
          : [];
    if (targetPaths.length === 0) {
      return deny('Cannot determine the edit target, so implementation-plan approval cannot be verified.');
    }

    const targetsOnlyApprovedDocs = targetPaths.every((targetPath) => {
      const normalized = targetPath.replace(/\\/g, '/');
      const baseName = normalized.split('/').pop().toLowerCase();
      return normalized.includes('/.github/') || SDLC_DOC_NAMES.has(baseName);
    });
    if (targetsOnlyApprovedDocs) return allow();

    const implPlanPath = path.join(process.cwd(), 'impl-plan.md');
    if (!fs.existsSync(implPlanPath)) {
      return deny(
        'Implementation edits are blocked because impl-plan.md does not exist and cannot be approved.'
      );
    }

    const implPlan = fs.readFileSync(implPlanPath, 'utf8');
    const statusMatch = implPlan.match(/^\s*-?\s*\*{0,2}Status:\*{0,2}\s*(.*?)\s*$/im);
    const status = statusMatch ? statusMatch[1] : '';
    if (status !== 'Approved') {
      return deny(
        `Implementation edits are blocked until impl-plan.md says "Status: Approved"; current status is "${status || 'missing'}".`
      );
    }

    return allow();
  } catch (err) {
    return deny('Could not verify implementation-plan approval; implementation edits are blocked.');
  }
});
