# AGENTS Instructions

This file provides guidelines for automated tools and contributors working
in this repository.

## Purpose
Automated agents look for `AGENTS.md` to discover project-specific rules.
Keeping instructions here ensures consistent behavior across contributions.

## Setup
- Install dependencies with `npm install`.
- Developers should copy `.env.example` to `.env` and adjust values for local runs. Automated agents already have the necessary environment variables.
- Apply database migrations using `npm run migrate`. Additional scripts like
  `npm run migrate:down`, `npm run db:reset`, and `npm run seed` are
  available when needed.

## Programmatic checks
This project does not include automated tests. However, the TypeScript build
must succeed. Run:

```bash
npm run build
```

to verify the application compiles before committing changes.

## Development
- Start the development server with `npm run dev`.
- Avoid committing `node_modules` or environment files.
