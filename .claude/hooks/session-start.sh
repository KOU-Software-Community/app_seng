#!/bin/bash
# SessionStart hook.
#
# The cloud container is rebuilt from scratch every session, so anything that
# is not committed to the repo is gone. This restores the one thing that
# matters and is not in git: graphify.
#
# Three traps, all real:
#   1. The package is `graphifyy` (two y's); the command is `graphify` (one y).
#      Typo it and the install fails silently and /graphify never shows up.
#   2. `graphify install` is a separate step. Installing the package is not
#      enough - that command is what registers the skill with the session.
#   3. $HOME/.local/bin must be on PATH, or `uv tool install` succeeds and the
#      command is still not found. The CLAUDE_ENV_FILE line carries that to
#      later shells too.
#
# Idempotent: re-running is harmless.
set -euo pipefail

export PATH="$HOME/.local/bin:$PATH"
echo 'export PATH="$HOME/.local/bin:$PATH"' >> "${CLAUDE_ENV_FILE:-/dev/null}" 2>/dev/null || true

if command -v graphify >/dev/null 2>&1; then
  echo "graphify already present ($(graphify --version 2>&1 | head -1))"
else
  if command -v uv >/dev/null 2>&1; then
    echo "installing graphify..."
    uv tool install graphifyy
  else
    echo "uv not found - skipping graphify install" >&2
    exit 0
  fi
fi

graphify install >/dev/null 2>&1 && echo "graphify skill registered" \
  || echo "graphify skill registration skipped" >&2
