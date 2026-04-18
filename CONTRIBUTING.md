# Contributing to ZConnect SDK

Thank you for your interest in contributing to the ZConnect SDK!

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/zoniqx/zConnect-sdk.git
cd zConnect-sdk
```

2. Install dependencies:
```bash
pnpm install
```

3. Build all packages:
```bash
pnpm build
```

## Project Structure

```
zConnect-sdk/
├── packages/
│   ├── core/              # Core SDK (client, transport, auth, middleware)
│   ├── listings/          # Listings module
│   ├── transactions/      # Transactions module
│   ├── connections/       # Connections module
│   ├── kyc/               # KYC module
│   ├── wallet/            # Wallet module
│   ├── organization/      # Organization module
│   ├── chat/              # Chat module
│   └── sdk/               # Umbrella package (composes all modules)
├── openapi.json           # OpenAPI spec for type generation
├── pnpm-workspace.yaml    # Workspace configuration
└── tsconfig.json          # Root TypeScript configuration
```

## Adding a New Module

1. Create the package directory:
```bash
mkdir -p packages/new-module/src/{operations,types}
```

2. Create package.json:
```json
{
  "name": "@zoniqx/sdk-new-module",
  "version": "0.0.0",
  "description": "ZConnect SDK New Module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "clean": "rm -rf dist"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "dependencies": {
    "@zoniqx/sdk-core": "workspace:*"
  },
  "devDependencies": {
    "tsup": "^8.0.2",
    "typescript": "^5.3.3"
  }
}
```

3. Create tsconfig.json:
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "composite": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"],
  "references": [{ "path": "../core" }]
}
```

4. Create tsup.config.ts:
```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false,
  clean: true,
  sourcemap: true,
  external: ['@zoniqx/sdk-core'],
});
```

5. Create types in `src/types/input.ts` and `src/types/output.ts`

6. Create operations in `src/operations/`

7. Create module class in `src/module.ts`

8. Create barrel files:
- `src/types/index.ts`
- `src/operations/index.ts`
- `src/index.ts`

9. Add to pnpm-workspace.yaml:
```yaml
packages:
  - 'packages/*'
```

10. Add to root tsconfig.json references

11. Add to umbrella package dependencies

## Code Style

- Use TypeScript for all code
- Follow the existing code structure
- Use functional and class-based patterns (both are supported)
- Add JSDoc comments for public APIs

## Testing

```bash
pnpm test
```

## Building

Build all packages:
```bash
pnpm build
```

Build a specific package:
```bash
cd packages/core
pnpm build
```

Clean build artifacts:
```bash
pnpm clean
```

## Versioning

This project uses Changesets for versioning. To create a changeset:

```bash
pnpm changeset
```

Follow the prompts to describe your changes. Changesets will automatically manage version bumps and changelog generation.

## Publishing

Publishing is handled automatically via GitHub Actions when changesets are merged to the main branch.

## Type Generation

OpenAPI types are generated from `openapi.json` using openapi-typescript. To regenerate:

```bash
pnpm generate:types
```

## Known Limitations

- TypeScript declaration files (.d.ts) are currently disabled due to TypeScript project references issues with tsup.

## Getting Help

- Open an issue on GitHub for bugs or feature requests
- Check existing documentation before asking questions
- Be respectful and constructive in all interactions
