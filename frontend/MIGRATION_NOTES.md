# Migration: Vite → Next.js (TypeScript)

Your project had both a Vite setup **and** a complete Next.js App Router living under `src/src/app`.  
I removed Vite and **promoted the Next.js app** to be the primary application.

## What I changed
- **Removed Vite artifacts**: `vite.config.*` and the HTML shell (`index.html`).
- **Promoted Next.js app** from `src/src/app` → `src/app` and preserved all routes and layouts.
- **Root config**:
  - Added `next.config.mjs`, `tsconfig.json`, and `next-env.d.ts` at the repository root.
  - `package.json` now uses Next scripts: `next dev`, `next build`, `next start`.
  - Pinned `next` (and `eslint-config-next`) to a stable `^14.2.10`.
- **Styles**:
  - Kept your original `src/src/styles/globals.css` and moved it to `src/styles/globals.css`.
  - If you previously imported `src/index.css`, it remains available and can be referenced as needed.

## How to run
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Notes
- Your original `src/App.tsx` is still present for reference, but the app now relies on **file‑system routes** under `src/app/`.
- If you need Tailwind or other build plugins, we can add `tailwindcss`, `postcss`, and `autoprefixer` along with configs. The current `globals.css` does **not** use `@tailwind` directives, so no extra setup is required.
- TypeScript path alias `@/*` maps to `src/*` via `tsconfig.json`.
