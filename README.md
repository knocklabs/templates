# Knock workflow templates

A set of templates to power your Knock resources, managed via the [Knock CLI](https://docs.knock.app/developer-tools/knock-cli) and deployed through GitHub Actions.

## Repository structure

```
workflows/
├── alerts/
├── comments/
├── invite-with-reminder/
├── magic-link/
├── mentions/
├── password-changed/
├── referral-accepted/
├── referral-sent/
├── replies/
├── reset-password/
└── welcome-messages/
```

Each workflow directory contains a `workflow.json` definition along with template files for its channel steps (email visual blocks, in-app feed markdown, SMS text, push text, etc.).

## CI/CD workflows

Two GitHub Actions workflows automate how changes flow from this repository into your Knock environments.

### PR preview (`knock-branch-preview.yml`)

**Trigger:** A pull request is opened, updated, or reopened against `main`.

When you push changes on a PR, this workflow:

1. **Creates a Knock branch** named `pr-<number>` (skipped if it already exists).
2. **Pushes all resources** from the repository into that Knock branch.
3. **Commits** the changes on the branch so they're callable via the API.
4. **Posts a sticky comment** on the PR with a direct link to the Knock dashboard for that branch, plus instructions for testing via the API.

This gives reviewers a live preview of every notification change before it's merged. Open the dashboard link from the PR comment to inspect workflows, templates, and layouts on the branch.

**Cleanup:** When the PR is closed (merged or not), the workflow deletes the Knock branch to keep things tidy.

A concurrency group per-PR ensures that rapid pushes don't create conflicting runs.

### Deploy to production (`knock-deploy.yml`)

**Trigger:** A pull request is merged into `main`.

Once a PR merges, this workflow:

1. **Pushes all resources** to the Knock `development` environment.
2. **Commits** the changes with a message referencing the PR number and title.
3. **Promotes** the commit to the `production` environment.

This means merging to `main` is a full deployment — development and production are always in sync with the latest merged state of this repository.

### Flow diagram

```
PR opened/updated          PR merged into main
       │                           │
       ▼                           ▼
 Create Knock branch         Push all resources
   (pr-<number>)            to development env
       │                           │
       ▼                           ▼
 Push resources to            Commit changes
    branch                         │
       │                           ▼
       ▼                    Promote commit
 Commit on branch            to production
       │
       ▼
 Post preview comment
 on PR with dashboard link
       │
       │   PR closed
       ▼
 Delete Knock branch
```

## Setup

### Prerequisites

- A [Knock](https://knock.app) account with the `knock-workflow-templates` workspace.
- A Knock **service token** with permissions to push, commit, promote, and manage branches.

### GitHub repository configuration

Add the following **secret** in your repository settings under **Settings > Secrets and variables > Actions**:

| Name | Description |
|------|-------------|
| `KNOCK_SERVICE_TOKEN` | Your Knock service token for CLI authentication |

### Local development

To work with these resources locally, install the Knock CLI and authenticate:

```bash
npm install -g @knocklabs/cli
export KNOCK_SERVICE_TOKEN=<your-token>
```

Pull the latest resources:

```bash
knock pull --all --knock-dir . --force
```

Push changes after editing:

```bash
knock push --all --knock-dir .
```

## Making changes

1. **Create a branch** in git and open a pull request against `main`.
2. **Review the preview** — the PR comment will include a link to the Knock dashboard where you can inspect your changes on an isolated Knock branch.
3. **Iterate** — any new commits pushed to the PR automatically update the Knock branch.
4. **Merge** — once approved, merge the PR. The deploy workflow pushes to development and promotes to production automatically.
