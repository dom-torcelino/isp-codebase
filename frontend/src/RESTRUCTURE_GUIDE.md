# Frontend Restructuring Guide

## Overview

This project has been restructured from a mixed Next.js structure to a clean **`src/`-based organization** with:
- **Zustand** for global state management
- **Axios** client for future API integration
- **Frontend-only** static demo (no backend calls)
- **Grouped routes** using Next.js App Router conventions
- **Feature-based** component organization

## 🎯 Key Principles

### 1. Static Frontend Only
- ✅ No network requests from UI components
- ✅ Zustand store exists but is NOT called by LoginForm
- ✅ API client exists but is NOT used in this phase
- ✅ Mock data for all demonstrations

### 2. Clean Separation
- **`components/ui/`** - Generic, reusable primitives (no feature imports)
- **`features/`** - Domain-specific components grouped by feature
- **`store/`** - Zustand stores (present for future use)
- **`lib/`** - Utilities, API client, mock data

### 3. TypeScript First
- Strict mode enabled
- Path aliases configured (`@/*`)
- Proper typing throughout

## 📁 New Structure

```
project-root/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── page.tsx          # Login page (grouped route)
│   │   ├── (app)/
│   │   │   ├── layout.tsx        # App shell (nav, header)
│   │   │   └── dashboard/
│   │   │       └── page.tsx      # Dashboard (inside app layout)
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home/welcome page
│   │
│   ├── components/
│   │   ├── ui/                   # Primitives (Button, Input, etc.)
│   │   │   ├── Button.tsx        # ✅ Created
│   │   │   └── ...               # Copy other UI components here
│   │   ├── layout/               # Layout components (Header, Sidebar)
│   │   └── icons/                # SVG icons
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   └── LoginForm.tsx # Static login form
│   │   │   └── index.ts          # Barrel export
│   │   └── user-profile/         # Future feature
│   │
│   ├── hooks/                    # Custom React hooks
│   │
│   ├── lib/
│   │   ├── api.ts                # ✅ Axios client (for future use)
│   │   ├── utils.ts              # ✅ Helper functions
│   │   └── mockUser.ts           # ✅ Mock data
│   │
│   ├── store/
│   │   └── useUserStore.ts       # ✅ Zustand store (for future use)
│   │
│   ├── styles/
│   │   └── globals.css           # ✅ Design tokens
│   │
│   └── types/
│       └── index.ts              # ✅ TypeScript types
│
├── public/                       # Static assets
├── .env.example                  # ✅ Environment template
├── next.config.mjs
├── package.json                  # ✅ Updated with zustand, axios
└── tsconfig.json                 # ✅ Updated with path aliases
```

## 🔧 What Was Created

### State Management (Not Used Yet)

**File**: `src/store/useUserStore.ts`

```typescript
// Full Zustand store with persist middleware
// Has login, logout, setUser, fetchProfile methods
// NOT called from LoginForm in this static phase
```

**Usage (future)**:
```tsx
const { user, login, logout } = useUserStore();
```

### API Client (Not Used Yet)

**File**: `src/lib/api.ts`

```typescript
// Axios instance with interceptors
// Reads NEXT_PUBLIC_API_URL from env
// Auto-attaches Bearer tokens
// NOT called from components in this phase
```

### Mock Data

**File**: `src/lib/mockUser.ts`

```typescript
export const MOCK_USERS = [...]
export const DEFAULT_MOCK_USER = MOCK_USERS[1];
```

### Static Login Form

**File**: `src/features/auth/components/LoginForm.tsx`

```tsx
// Presentational only
// No store calls
// No API calls
// Just console.log on submit
```

### Routes

**Created**:
- `/` → Home page with login form
- `/(auth)` → Login page (grouped route)
- `/(app)/dashboard` → Dashboard inside app layout

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `zustand` - State management
- `axios` - HTTP client
- All existing dependencies

### 2. Run Development Server

```bash
npm run dev
```

### 3. View the App

- **http://localhost:3000** - Home/Login page
- **http://localhost:3000/dashboard** - Dashboard (mock data)

## 📝 Migration Tasks

### Moving Old Components to `src/`

You need to migrate your existing components from the root to `src/`:

#### Step 1: Copy UI Components

```bash
# Copy all UI primitives
cp -r components/ui/* src/components/ui/
```

**Update imports**:
```typescript
// Old
import { Button } from "@/components/ui/button";

// New (same! path aliases work)
import { Button } from "@/components/ui/button";
```

#### Step 2: Copy Layout Components

```bash
cp -r components/layout/* src/components/layout/
```

Update imports to use `@/` aliases.

#### Step 3: Copy Dashboards

```bash
cp -r components/dashboards/* src/features/dashboards/
```

Create `src/features/dashboards/index.ts` for barrel exports.

#### Step 4: Copy Other Components

```bash
# Tickets
cp -r components/tickets/* src/features/tickets/

# Customers  
cp -r components/customers/* src/features/customers/

# Billing
cp -r components/billing/* src/features/billing/
```

#### Step 5: Update Imports

All components using the old structure need imports updated:

```typescript
// Old
import '../styles/globals.css';
import { cn } from '../components/ui/utils';

// New
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
```

### Copy Mock Data

```bash
cp lib/mock-data.ts src/lib/mock-data.ts
```

Update to use `@/types` imports.

## 🔄 Path Aliases Reference

Configured in `tsconfig.json`:

```json
{
  "@/*": ["src/*"],
  "@/app/*": ["src/app/*"],
  "@/components/*": ["src/components/*"],
  "@/features/*": ["src/features/*"],
  "@/hooks/*": ["src/hooks/*"],
  "@/lib/*": ["src/lib/*"],
  "@/store/*": ["src/store/*"],
  "@/styles/*": ["src/styles/*"],
  "@/types": ["src/types"]
}
```

## ✅ Verification Checklist

After restructuring:

- [ ] `npm install` succeeds
- [ ] `npm run dev` starts without errors
- [ ] Home page loads at `/`
- [ ] Login form is visible and styled
- [ ] Dashboard loads at `/dashboard`
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No ESLint errors (`npm run lint`)

## 🎨 Component Architecture

### UI Primitives (src/components/ui/)

**Rules**:
- ✅ Generic, reusable components
- ✅ No feature-specific logic
- ✅ Can use utilities from `@/lib/utils`
- ❌ Cannot import from `@/features`
- ❌ Cannot import from `@/store`

**Example**:
```typescript
// ✅ Good
import { cn } from "@/lib/utils";

// ❌ Bad
import { useUserStore } from "@/store/useUserStore";
```

### Feature Components (src/features/)

**Rules**:
- ✅ Domain-specific components
- ✅ Can use UI primitives
- ✅ Can use stores (when needed)
- ✅ Can use hooks
- ✅ Can call API (when backend ready)

**Example**:
```typescript
// ✅ Good
import Button from "@/components/ui/Button";
import { useUserStore } from "@/store/useUserStore"; // OK but not used yet

// ❌ Bad (circular dependency)
import { OtherFeature } from "@/features/other";
```

## 🔐 Environment Variables

**File**: `.env.example`

```bash
# API Base URL (for future backend integration)
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Feature flags
NEXT_PUBLIC_ENABLE_AUTH=false  # Keep false for static demo
```

Create `.env.local`:
```bash
cp .env.example .env.local
```

## 🧪 Testing (Future)

Directory structure ready for testing:

```
src/
├── components/
│   └── ui/
│       ├── Button.tsx
│       └── Button.test.tsx      # Co-locate tests
├── features/
│   └── auth/
│       ├── components/
│       │   ├── LoginForm.tsx
│       │   └── LoginForm.test.tsx
```

## 📊 State Management Flow (Future)

When you're ready to connect backend:

```
User Action
    ↓
Component calls store action
    ↓
useUserStore.login(email, password)
    ↓
Calls API via lib/api.ts
    ↓
loginRequest(email, password)
    ↓
Returns { user, token }
    ↓
Store updates state
    ↓
Components re-render
```

## 🚨 Common Issues

### Import Errors

**Problem**: `Cannot find module '@/components/...'`

**Solution**: 
1. Restart TypeScript server in VS Code: `Cmd+Shift+P` → "TypeScript: Restart TS Server"
2. Check `tsconfig.json` has correct paths
3. Ensure files are in `src/` directory

### Build Errors

**Problem**: `Module not found: Can't resolve '../old/path'`

**Solution**: Update all imports to use `@/` aliases

### Runtime Errors

**Problem**: Components not rendering

**Solution**: Check browser console, ensure all dependencies installed

## 📚 Next Steps

### Phase 1: Static Demo (Current) ✅
- [x] Create Zustand store (present, not used)
- [x] Create API client (present, not used)
- [x] Create static login form
- [x] Create dashboard with mock data
- [x] Set up grouped routes

### Phase 2: Backend Integration (Future)
- [ ] Create backend API endpoints
- [ ] Set `NEXT_PUBLIC_API_URL` in `.env.local`
- [ ] Update LoginForm to call `useUserStore.login()`
- [ ] Add protected routes middleware
- [ ] Implement real authentication flow

### Phase 3: Enhanced Features (Future)
- [ ] Add more stores (tickets, customers, etc.)
- [ ] Implement optimistic updates
- [ ] Add error boundaries
- [ ] Add loading states
- [ ] Add toast notifications
- [ ] Implement form validation

## 🔗 Resources

- [Next.js App Router](https://nextjs.org/docs/app)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Axios Documentation](https://axios-http.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## 💡 Tips

### VS Code Extensions

Recommended:
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **TypeScript Error Translator**
- **Path Intellisense**

### Code Snippets

Create `.vscode/settings.json`:
```json
{
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "typescript.suggest.autoImports": true,
  "editor.formatOnSave": true
}
```

### Barrel Exports

Always create `index.ts` in feature folders:

```typescript
// src/features/auth/index.ts
export { default as LoginForm } from "./components/LoginForm";
export { useAuth } from "./hooks/useAuth";
```

Then import:
```typescript
import { LoginForm } from "@/features/auth";
```

---

**Status**: ✅ Phase 1 Complete - Static Frontend Ready

**Next**: Migrate existing components from old structure to `src/`

**Questions?** Check the implementation files or create an issue.
