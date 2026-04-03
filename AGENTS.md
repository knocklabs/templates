# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This is a **Knock notification templates repository** — it contains declarative JSON/Markdown/HTML resource definitions (workflows, guides, message-types, partials) managed via the **Knock CLI** (`@knocklabs/cli`). There is no application runtime, build step, or database.

### Key resources

| Type | Count | Directory | Config file |
|------|-------|-----------|-------------|
| Workflows | 11 | `workflows/` | `workflow.json` |
| Guides | 4 | `guides/` | `guide.json` |
| Message Types | 4 | `message-types/` | `message_type.json` |
| Partials | 4 | `partials/` | `partial.json` |

### Working with the CLI

- All CLI commands are documented in `.agents/skills/knock-cli/rules/cli-commands-reference.md`.
- The project config `knock.json` sets `knockDir` to `.` (repo root).
- **Authentication**: The CLI requires `KNOCK_SERVICE_TOKEN` env var for all remote operations (validate, push, pull, list). Without it, only local file inspection is possible.
- **Always use `--force`** on pull/commit/promote commands to skip interactive prompts.
- **Push commands never prompt** and are safe to run directly.

### Validation without a service token

When `KNOCK_SERVICE_TOKEN` is unavailable, you can still validate templates locally:
1. JSON syntax: parse all `*.json` files under `workflows/`, `guides/`, `message-types/`, `partials/`.
2. File references: walk JSON keys ending in `@` and verify the referenced files exist relative to the containing directory.

### Gotchas

- `knock init` is fully interactive with no `--knock-dir` flag. Pipe `.` via stdin or create `knock.json` manually: `{"$schema": "https://schemas.knock.app/cli/knock.json", "knockDir": "."}`.
- `knock workflow validate`, `knock guide validate`, etc. all require a valid service token — they are not purely offline commands.
- The `KNOCK_API_KEY` secret in this environment is a publishable key, **not** a service token. Do not use it for CLI authentication.
