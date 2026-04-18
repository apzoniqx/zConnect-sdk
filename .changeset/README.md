# Changesets

This repository uses [Changesets](https://github.com/changesets/changesets) to manage versioning and publishing.

## Adding a Changeset

When you make a change that should trigger a version bump, run:

```bash
pnpm changeset
```

Follow the prompts to select which packages changed and what kind of change it was (major, minor, or patch).

## Versioning

When you're ready to publish a new version, run:

```bash
pnpm changeset:version
```

This will update the versions of all packages that have changesets and update the CHANGELOG.md files.

## Publishing

To publish packages to GitHub Packages, run:

```bash
pnpm changeset:publish
```

This is typically done automatically via GitHub Actions when changes are merged to the main branch.

## Conventional Commit Pattern

When creating a changeset, use conventional commit-style messages:

- `feat:` for new features (minor version)
- `fix:` for bug fixes (patch version)
- `BREAKING CHANGE:` for breaking changes (major version)

Example:
```
feat: add support for listing marketplace API
```
