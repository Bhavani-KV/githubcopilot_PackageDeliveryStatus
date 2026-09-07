#!/usr/bin/env node
// PreToolUse hook: ask for confirmation before writing application code
// until the Implementation Planning stage (impl-plan.md) has been approved.
const fs = require('fs');
const path = require('path');

const EDIT_TOOLS = new Set([
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

function askForConfirmation(reason) {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'ask',
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
    const targetPath =
      toolInput.filePath ||
      (Array.isArray(toolInput.replacements) && toolInput.replacements[0] && toolInput.replacements[0].filePath) ||
      '';
    if (!targetPath) return allow();

    const normalized = targetPath.replace(/\\/g, '/');
    const baseName = normalized.split('/').pop().toLowerCase();

    // SDLC docs and anything under .github/ are always allowed.
    if (normalized.includes('/.github/') || SDLC_DOC_NAMES.has(baseName)) return allow();

    const implPlanPath = path.join(process.cwd(), 'impl-plan.md');
    if (!fs.existsSync(implPlanPath)) {
      return askForConfirmation(
        `Implementation Planning has not produced impl-plan.md yet. Writing "${targetPath}" looks like application code ` +
        `ahead of the approved SDLC plan. Confirm you intend to write this file now.`
      );
    }
    return allow();
  } catch (err) {
    // Never block the session on a hook parsing failure.
    return allow();
  }
});
