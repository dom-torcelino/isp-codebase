# Migration Checklist

Use this checklist to track your progress migrating from the old structure to the new `src/` based structure.

## ✅ Phase 1: Infrastructure (COMPLETE)

- [x] Create `src/` directory structure
- [x] Create Zustand store (`src/store/useUserStore.ts`)
- [x] Create API client (`src/lib/api.ts`)
- [x] Create mock data (`src/lib/mockUser.ts`)
- [x] Create utilities (`src/lib/utils.ts`)
- [x] Create types (`src/types/index.ts`)
- [x] Create root layout (`src/app/layout.tsx`)
- [x] Create home page (`src/app/page.tsx`)
- [x] Create auth route (`src/app/(auth)/page.tsx`)
- [x] Create app layout (`src/app/(app)/layout.tsx`)
- [x] Create dashboard (`src/app/(app)/dashboard/page.tsx`)
- [x] Create Button component (`src/components/ui/Button.tsx`)
- [x] Create LoginForm (`src/features/auth/components/LoginForm.tsx`)
- [x] Copy global styles (`src/styles/globals.css`)
- [x] Update tsconfig.json with path aliases
- [x] Update package.json with zustand and axios
- [x] Create .env.example
- [x] Create documentation (RESTRUCTURE_GUIDE.md, etc.)

## 📋 Phase 2: Component Migration (TODO)

### UI Components
Move from `components/ui/*` to `src/components/ui/*`:

- [ ] accordion.tsx
- [ ] alert-dialog.tsx
- [ ] alert.tsx
- [ ] aspect-ratio.tsx
- [ ] avatar.tsx
- [ ] badge.tsx
- [ ] breadcrumb.tsx
- [ ] button.tsx ✅ (new version created)
- [ ] calendar.tsx
- [ ] card.tsx
- [ ] carousel.tsx
- [ ] chart.tsx
- [ ] checkbox.tsx
- [ ] collapsible.tsx
- [ ] command.tsx
- [ ] context-menu.tsx
- [ ] dialog.tsx
- [ ] drawer.tsx
- [ ] dropdown-menu.tsx
- [ ] form.tsx
- [ ] hover-card.tsx
- [ ] input-otp.tsx
- [ ] input.tsx
- [ ] label.tsx
- [ ] menubar.tsx
- [ ] navigation-menu.tsx
- [ ] pagination.tsx
- [ ] popover.tsx
- [ ] progress.tsx
- [ ] radio-group.tsx
- [ ] resizable.tsx
- [ ] scroll-area.tsx
- [ ] select.tsx
- [ ] separator.tsx
- [ ] sheet.tsx
- [ ] sidebar.tsx
- [ ] skeleton.tsx
- [ ] slider.tsx
- [ ] sonner.tsx
- [ ] switch.tsx
- [ ] table.tsx
- [ ] tabs.tsx
- [ ] textarea.tsx
- [ ] toggle-group.tsx
- [ ] toggle.tsx
- [ ] tooltip.tsx
- [ ] use-mobile.ts
- [ ] utils.ts ✅ (moved to src/lib/utils.ts)

**For each component:**
1. Copy file to `src/components/ui/`
2. Update imports to use `@/` aliases
3. Change `import { cn } from "./utils"` to `import { cn } from "@/lib/utils"`
4. Test component renders correctly
5. Delete old file

### Layout Components
Move from `components/layout/*` to `src/components/layout/*`:

- [ ] app-layout.tsx ✅ (new version in src/app/(app)/layout.tsx)
- [ ] app-sidebar.tsx
- [ ] breadcrumbs.tsx
- [ ] collapsible-sidebar.tsx
- [ ] sidebar-nav-item.tsx
- [ ] top-bar.tsx

**For each component:**
1. Copy file to `src/components/layout/`
2. Update all imports to `@/` aliases
3. Update any relative imports
4. Test component works in app
5. Delete old file

### Shared Components
Move from `components/shared/*` to `src/components/shared/*`:

- [ ] empty-state.tsx
- [ ] kpi-card.tsx
- [ ] loading-skeleton.tsx
- [ ] quick-actions.tsx
- [ ] sla-chip.tsx
- [ ] status-badge.tsx

**For each component:**
1. Copy to `src/components/shared/`
2. Update imports
3. Test
4. Delete old file

### Special Components
Move from `components/figma/*` to `src/components/figma/*`:

- [ ] ImageWithFallback.tsx

## 🎯 Phase 3: Feature Migration (TODO)

### Dashboards
Move from `components/dashboards/*` to `src/features/dashboards/*`:

- [ ] billing-officer-dashboard.tsx
- [ ] customer-portal-dashboard.tsx
- [ ] customer-support-dashboard.tsx
- [ ] field-tech-dashboard.tsx
- [ ] it-staff-dashboard.tsx
- [ ] super-admin-dashboard.tsx
- [ ] system-admin-dashboard.tsx

**Steps:**
1. Create `src/features/dashboards/components/`
2. Move each dashboard file
3. Create `src/features/dashboards/index.ts`:
   ```typescript
   export { default as BillingOfficerDashboard } from "./components/billing-officer-dashboard";
   export { default as CustomerPortalDashboard } from "./components/customer-portal-dashboard";
   // ... etc
   ```
4. Update imports in page files
5. Test each dashboard
6. Delete old files

### Tickets
Move from `components/tickets/*` to `src/features/tickets/*`:

- [ ] create-ticket-dialog.tsx
- [ ] ticket-detail-sheet.tsx
- [ ] tickets-table.tsx

**Steps:**
1. Create `src/features/tickets/components/`
2. Move files
3. Create barrel export `src/features/tickets/index.ts`
4. Consider creating `src/store/useTicketsStore.ts` (future)
5. Update imports
6. Test
7. Delete old files

### Customers
Move from `components/customers/*` to `src/features/customers/*`:

- [ ] customers-table.tsx

**Steps:**
1. Create `src/features/customers/components/`
2. Move file
3. Create barrel export
4. Consider creating `src/store/useCustomersStore.ts` (future)
5. Update imports
6. Test
7. Delete old file

### Billing
Move from `components/billing/*` to `src/features/billing/*`:

- [ ] invoice-detail-sheet.tsx

**Steps:**
1. Create `src/features/billing/components/`
2. Move file
3. Create barrel export
4. Consider creating `src/store/useBillingStore.ts` (future)
5. Update imports
6. Test
7. Delete old file

### Tenants
Move from `components/tenants/*` to `src/features/tenants/*`:

- [ ] create-tenant-stepper.tsx

**Steps:**
1. Create `src/features/tenants/components/`
2. Move file
3. Create barrel export
4. Update imports
5. Test
6. Delete old file

### UI Kit
Move from `components/ui-kit/*` to `src/features/ui-kit/*`:

- [ ] ui-kit-content.tsx

**Steps:**
1. Create `src/features/ui-kit/components/`
2. Move file
3. Update `app/ui-kit/page.tsx` to use new path
4. Test
5. Delete old file

## 📦 Phase 4: Data & Types (TODO)

### Mock Data
- [ ] Copy `lib/mock-data.ts` to `src/lib/mock-data.ts`
- [ ] Update imports to use `@/types`
- [ ] Update any components using mock data
- [ ] Delete old file

### Types
- [x] Types migrated to `src/types/index.ts` ✅
- [ ] Verify all components use new types import
- [ ] Delete old `lib/types.ts`

## 🗂️ Phase 5: Routes Migration (TODO)

### App Routes
Move from `app/*` to `src/app/*` (if not already):

- [x] layout.tsx ✅ (created new)
- [x] page.tsx ✅ (created new)
- [ ] ui-kit/page.tsx

**Steps:**
1. Create `src/app/ui-kit/page.tsx`
2. Import UIKitContent from new path
3. Test route
4. Delete old `app/ui-kit/page.tsx`

## 🧹 Phase 6: Cleanup (TODO)

### Delete Old Directories
After migration is complete:

- [ ] Delete `components/` (root level)
- [ ] Delete `lib/` (root level)
- [ ] Delete `app/` (root level, keep `src/app/`)
- [ ] Delete `styles/` (root level, keep `src/styles/`)

### Verify No Old Imports
Run these checks:

```bash
# Check for old component imports
grep -r "from '\.\./components" src/
grep -r "from 'components/" src/

# Check for old lib imports
grep -r "from '\.\./lib" src/
grep -r "from 'lib/" src/

# Should be empty!
```

### Update Documentation
- [ ] Update README.md with new structure
- [ ] Update any examples in docs
- [ ] Add migration completion note

## ✅ Phase 7: Testing & Verification

### Build & Type Check
- [ ] `npm run build` succeeds
- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] No TypeScript errors
- [ ] No ESLint warnings

### Visual Testing
- [ ] All pages render correctly
- [ ] All dashboards work
- [ ] Tickets page works
- [ ] Customers page works
- [ ] UI Kit page works
- [ ] Navigation works
- [ ] Mobile responsive works
- [ ] Dark mode works (if enabled)

### Functional Testing
- [ ] Login form renders
- [ ] Can navigate between pages
- [ ] Sidebar works
- [ ] Modal/dialogs open
- [ ] Forms work
- [ ] Tables load
- [ ] Charts render
- [ ] Filters work
- [ ] Search works

## 🚀 Phase 8: Backend Integration (FUTURE)

When backend is ready:

- [ ] Set `NEXT_PUBLIC_API_URL` in `.env.local`
- [ ] Update LoginForm to call `useUserStore.login()`
- [ ] Test login with real API
- [ ] Add error handling
- [ ] Add loading states
- [ ] Implement protected routes
- [ ] Add auth middleware
- [ ] Test logout flow
- [ ] Test token refresh
- [ ] Test session persistence

## 📊 Progress Tracking

### Summary
- **Phase 1**: ✅ 18/18 (100%)
- **Phase 2**: ⏳ 2/48 (4%)
- **Phase 3**: ⏳ 0/15 (0%)
- **Phase 4**: ⏳ 1/2 (50%)
- **Phase 5**: ⏳ 2/3 (67%)
- **Phase 6**: ⏳ 0/5 (0%)
- **Phase 7**: ⏳ 0/14 (0%)
- **Phase 8**: ⏳ 0/10 (0%)

**Overall**: 23/115 tasks (20%)

### Estimated Time
- **Phase 2**: 2-3 hours
- **Phase 3**: 1-2 hours
- **Phase 4**: 30 minutes
- **Phase 5**: 30 minutes
- **Phase 6**: 15 minutes
- **Phase 7**: 1 hour
- **Phase 8**: Depends on backend readiness

**Total**: ~5-7 hours of work

## 💡 Tips

### Use a Script
Create a migration script to automate file moving:

```bash
#!/bin/bash
# migrate-component.sh

OLD_PATH=$1
NEW_PATH=$2

# Copy file
cp "$OLD_PATH" "$NEW_PATH"

# Update imports in the file
sed -i '' 's|from "../ui/utils"|from "@/lib/utils"|g' "$NEW_PATH"
sed -i '' 's|from "./utils"|from "@/lib/utils"|g' "$NEW_PATH"
sed -i '' 's|from "../components/|from "@/components/|g' "$NEW_PATH"

echo "Migrated $OLD_PATH to $NEW_PATH"
echo "Please review changes and test!"
```

Usage:
```bash
chmod +x migrate-component.sh
./migrate-component.sh components/ui/button.tsx src/components/ui/button.tsx
```

### Git Workflow
Create a branch for migration:

```bash
git checkout -b restructure/migrate-to-src
git add src/
git commit -m "feat: add new src/ structure"

# Then migrate in small chunks
git commit -m "feat: migrate UI components"
git commit -m "feat: migrate dashboards"
# etc.
```

### Test As You Go
Don't migrate everything at once. Do it in phases:

1. Migrate one UI component
2. Test it works
3. Migrate a few more
4. Test again
5. Continue...

---

**Remember**: The infrastructure is ready! Now it's just a matter of moving files and updating imports. Take it slow and test frequently! 🚀
