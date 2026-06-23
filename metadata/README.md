# Template metadata

This directory contains reusable metadata and assets for the templates in this
repository.

- `custom/` contains hand-authored metadata overrides for template listings and
  detail views.
- `generated/` contains generated metadata JSON derived from this repository's
  `workflows/`, `partials/`, `guides/`, and `message-types/` folders.
- `extended-descriptions/` contains long-form markdown content keyed by
  template type and slug.
- `images/` contains template image assets keyed by template type and slug.
- `scripts/` at the repository root contains the metadata generators. They read
  only files from this repository.

Consumers should treat paths in generated metadata as repository-relative paths.
Any application-specific URL mapping or preview-only code belongs in the
consuming application.
