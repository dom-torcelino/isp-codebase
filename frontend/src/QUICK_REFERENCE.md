# Quick Reference Card

## 🚀 Getting Started

```bash
# Install
npm install

# Run dev server
npm run dev

# Type check
npm run type-check

# Build
npm run build
```

## 📁 Directory Structure

```
src/
├── app/              # Routes
├── components/       # Reusable components
│   └── ui/          # Primitives only
├── features/        # Feature modules
├── hooks/           # Custom hooks
├── lib/             # Utils, API, mocks
├── store/           # Zustand stores
├── styles/          # CSS
└── types/           # TypeScript types
```

## 🎯 Import Aliases

```typescript
import { User } from "@/types";
import { Button } from "@/components/ui/Button";
import { LoginForm } from "@/features/auth";
import { useUserStore } from "@/store/useUserStore";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
```

## 🔐 Zustand Store

```typescript
// Get state
const user = useUserStore(state => state.user);
const status = useUserStore(selectStatus);

// Call actions (future - not in UI yet)
const { login, logout } = useUserStore();
await login(email, password);
```

## 🌐 API Client

```typescript
// Future use - not called from UI yet
import { api, loginRequest } from "@/lib/api";

// Login
const { user, token } = await loginRequest(email, password);

// Authenticated request
const data = await api.get("/tickets");
```

## 📄 Routes

```
/                    → Home (login form)
/(auth)              → Login page (grouped)
/(app)/dashboard     → Dashboard (with nav)
```

## 🎨 Component Rules

### UI Components (`src/components/ui/`)
```typescript
// ✅ YES
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

// ❌ NO
import { useUserStore } from "@/store/useUserStore";
import { LoginForm } from "@/features/auth";
```

### Feature Components (`src/features/`)
```typescript
// ✅ YES
import Button from "@/components/ui/Button";
import { useUserStore } from "@/store/useUserStore";
import { api } from "@/lib/api";

// ⚠️ LATER (not yet)
const { login } = useUserStore();
```

## 🔧 Create New Feature

```bash
# 1. Create directory
mkdir -p src/features/my-feature/components

# 2. Create component
touch src/features/my-feature/components/MyComponent.tsx

# 3. Create barrel export
touch src/features/my-feature/index.ts
```

```typescript
// src/features/my-feature/index.ts
export { default as MyComponent } from "./components/MyComponent";

// Usage
import { MyComponent } from "@/features/my-feature";
```

## 📊 TypeScript

```typescript
// Define types
// src/types/index.ts
export interface MyType {
  id: string;
  name: string;
}

// Use everywhere
import type { MyType } from "@/types";
```

## 🎭 Mock Data

```typescript
import { DEFAULT_MOCK_USER, MOCK_USERS } from "@/lib/mockUser";

// Use in components
const user = DEFAULT_MOCK_USER;
```

## 🔄 State Flow (Future)

```
Component
  ↓
useUserStore.login()
  ↓
lib/api.ts → loginRequest()
  ↓
POST /auth/login
  ↓
Store updates
  ↓
Component re-renders
```

## 🚨 Common Errors

### "Cannot find module '@/...'"
```bash
# Restart TS server
Cmd+Shift+P → TypeScript: Restart TS Server
```

### Import not working
```typescript
// Check tsconfig.json paths
"@/*": ["src/*"]

// Ensure file is in src/
src/components/ui/Button.tsx ✅
components/ui/Button.tsx ❌
```

## 📝 Conventions

### File Naming
```
ComponentName.tsx       # Component
use-hook-name.ts       # Hook
my-utility.ts          # Utility
types.ts               # Types
index.ts               # Barrel export
```

### Component Structure
```typescript
// Imports
import { ... } from "react";
import { ... } from "external-lib";
import { ... } from "@/...";

// Types
interface Props { ... }

// Component
export default function MyComponent({ ... }: Props) {
  // Hooks
  // Handlers
  // Render
}
```

## 🎯 Next Actions

### Static Demo (Current)
- [x] Run `npm install`
- [x] Run `npm run dev`
- [x] Test login form
- [x] View dashboard

### Migrate Existing (Next)
- [ ] Move `components/ui/*` to `src/components/ui/`
- [ ] Move `components/layout/*` to `src/components/layout/`
- [ ] Move dashboards to `src/features/dashboards/`
- [ ] Update all imports to `@/*`

### Backend Integration (Future)
- [ ] Set `NEXT_PUBLIC_API_URL` in `.env.local`
- [ ] Update LoginForm to call `useUserStore.login()`
- [ ] Add protected route middleware
- [ ] Test with real API

## 📚 Documentation

- `RESTRUCTURE_GUIDE.md` - Complete guide
- `RESTRUCTURE_SUMMARY.md` - What was built
- `QUICK_REFERENCE.md` - This file

## 💡 Tips

```bash
# View all TODOs
grep -r "TODO" src/

# Check for console.logs
grep -r "console.log" src/

# Find unused imports
npm run lint
```

---

**Keep this handy while developing!** 📌
