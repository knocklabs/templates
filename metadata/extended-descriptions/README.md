# Extended Descriptions

This directory contains extended descriptions for template resources. Each
subdirectory corresponds to a resource type:

- **workflows/** - Extended descriptions for workflow templates
- **partials/** - Extended descriptions for email partial templates
- **components/** - Extended descriptions for in-app component templates (guides)

## How it works

Each markdown file in these directories corresponds to a specific resource by
type and slug. For example:

- `workflows/magic-link.md` describes the `workflows/magic-link` template.
- `partials/author-block.md` describes the `partials/author-block` template.
- `components/conference-banner.md` describes the
  `components/conference-banner` template.

Consumers can render these descriptions anywhere they display template detail
content.

## Adding new extended descriptions

To add an extended description for a new resource:

1. Create a new markdown file in the appropriate subdirectory with the resource's slug as the filename
2. Write your extended description content using standard markdown
3. Regenerate metadata so consumers can load the new content

## Format guidelines

Extended descriptions typically include sections like:

- **What this template solves** - The problems this template addresses
- **When to use this template** - Use cases and scenarios
- **How it works (step-by-step)** - Implementation details
- **Best practices** - Tips for optimal usage
- **Common mistakes to avoid** - Pitfalls to watch out for
- **FAQ** - Frequently asked questions

You can use standard markdown syntax including:

- Headers (`###`)
- Lists (ordered and unordered)
- Code blocks
- Bold/italic text
- Links
- Horizontal rules (`---`)

## Error handling

If a resource doesn't have a corresponding extended description file, consumers
should treat the extended description as optional. This is by design to allow
incremental addition of extended descriptions.
