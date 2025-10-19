# Quick Start Guide

## Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- A code editor (VS Code recommended)

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local

# 3. Start development server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## First Steps

### 1. Explore the UI Kit
Navigate to [http://localhost:3000/ui-kit](http://localhost:3000/ui-kit) to see:
- All design tokens (colors, typography, spacing)
- Complete component library
- Interactive examples
- Accessibility guidelines

### 2. Try Different Roles
Use the role switcher in the top-right corner to switch between:
- **Super Admin** - Platform management
- **System Admin** - Tenant administration  
- **Customer Support** - Ticket handling
- **Billing Officer** - Invoice management
- **IT Staff** - Technical operations
- **Field Technician** - Job management
- **Customer Portal** - Self-service

### 3. Test the Sidebar
- **Desktop**: Click the "Collapse" button at the bottom of the sidebar
- **Mobile**: Tap the hamburger menu icon in the top-left
- Notice the smooth animations and badge indicators

### 4. Navigate the Platform
Try these pages:
- `/dashboard` - Role-specific dashboard
- `/tickets` - Ticket management (with badge count: 12)
- `/customers` - Customer table
- `/ui-kit` - Design system documentation

## Project Structure

```
isp-platform/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home/Dashboard
│   └── ui-kit/            # UI Kit page
│       └── page.tsx
├── components/
│   ├── dashboards/        # 7 role-specific dashboards
│   ├── layout/            # Layout components
│   │   ├── app-layout.tsx              # Main layout wrapper
│   │   ├── collapsible-sidebar.tsx     # Collapsible sidebar
│   │   ├── sidebar-nav-item.tsx        # Navigation item component
│   │   ├── top-bar.tsx                 # Top navigation bar
│   │   └── breadcrumbs.tsx             # Breadcrumb navigation
│   ├── shared/            # Shared components
│   │   ├── kpi-card.tsx               # KPI display cards
│   │   ├── status-badge.tsx           # Status indicators
│   │   └── sla-chip.tsx               # SLA countdown
│   ├── tickets/           # Ticket features
│   ├── customers/         # Customer features
│   ├── billing/           # Billing features
│   ├── ui/                # shadcn/ui components (50+)
│   └── ui-kit/            # UI Kit documentation
├── lib/
│   ├── types.ts           # TypeScript types
│   └── mock-data.ts       # Demo data
├── styles/
│   └── globals.css        # Design tokens & global styles
└── public/                # Static assets
```

## Key Files to Understand

### 1. Design Tokens
**File**: `styles/globals.css`
- All color variables (light & dark mode)
- Typography scale
- Spacing system
- Border radius values
- Shadow definitions

### 2. Layout System
**File**: `components/layout/app-layout.tsx`
- Wraps all pages
- Manages sidebar state
- Handles breadcrumbs
- Controls page titles

### 3. Sidebar Navigation
**Files**: 
- `components/layout/collapsible-sidebar.tsx` - Main sidebar
- `components/layout/sidebar-nav-item.tsx` - Individual nav items

### 4. Page Structure
**File**: `app/page.tsx`
- Route management
- Role switching
- Content rendering

### 5. Type Definitions
**File**: `lib/types.ts`
- UserRole types
- Ticket, Customer, Invoice types
- Component prop types

## Common Tasks

### Add a New Page

1. Create page file:
```tsx
// app/my-page/page.tsx
'use client';

import { AppLayout } from '@/components/layout/app-layout';

export default function MyPage() {
  return (
    <AppLayout currentRole="system_admin" currentPath="/my-page">
      <div className="p-8">
        <h1>My New Page</h1>
      </div>
    </AppLayout>
  );
}
```

2. Add to sidebar navigation:
```tsx
// components/layout/collapsible-sidebar.tsx
{
  title: 'My Page',
  href: '/my-page',
  icon: MyIcon,
  roles: ['system_admin']
}
```

### Customize Colors

Edit `styles/globals.css`:
```css
:root {
  --primary: #YOUR_COLOR;
}
```

### Add a Component

1. Create component file in appropriate directory
2. Use design tokens from globals.css
3. Follow shadcn/ui patterns
4. Include accessibility features
5. Document in UI Kit if reusable

### Modify Sidebar Width

Edit `components/layout/collapsible-sidebar.tsx`:
```tsx
// Change these values
isCollapsed ? 'w-16' : 'w-64'  // 64px collapsed, 256px expanded
```

Update layout margin in `components/layout/app-layout.tsx`:
```tsx
<div className="lg:ml-16">  // Match collapsed width
```

## Development Tips

### Hot Module Replacement
- Changes auto-reload in browser
- CSS updates instantly
- Component changes preserve state

### TypeScript
- Strict mode enabled
- All types in `lib/types.ts`
- VS Code IntelliSense available

### Tailwind CSS
- Tailwind 4.0 (CSS-first configuration)
- Design tokens in globals.css
- Auto-completion in VS Code

### Component Development
1. Check UI Kit for existing components
2. Use shadcn/ui components from `/components/ui`
3. Follow accessibility guidelines
4. Test in light and dark mode
5. Test on mobile, tablet, and desktop

## Accessibility Testing

### Keyboard Navigation
- Tab through all interactive elements
- Enter/Space to activate
- Escape to close dialogs/menus
- Arrow keys in lists

### Screen Reader Testing
- Use NVDA (Windows) or VoiceOver (Mac)
- Check all labels are announced
- Verify status changes are announced

### Visual Testing
- Check focus indicators are visible
- Verify touch targets are 44×44
- Test color contrast
- Test without color (ensure icons/text provide context)

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### TypeScript Errors
```bash
# Check for errors
npm run type-check

# Common fix: restart TypeScript server in VS Code
Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Style Not Updating
```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Radix UI](https://www.radix-ui.com)

### Internal Docs
- `README.md` - Project overview
- `MIGRATION_REPORT.md` - Migration details
- `SIDEBAR_IMPLEMENTATION.md` - Sidebar guide
- `FIGMA_UI_KIT_SPEC.md` - Figma specifications

### Design System
- Navigate to `/ui-kit` in the app
- Reference `styles/globals.css` for tokens
- Check `components/ui/` for base components

## Next Steps

1. **Backend Integration**
   - Set up Supabase or your preferred backend
   - Create API routes in `app/api/`
   - Replace mock data with real data

2. **Authentication**
   - Implement NextAuth.js
   - Add login/logout flows
   - Protect routes with middleware

3. **Database**
   - Design schema
   - Set up migrations
   - Create type-safe queries

4. **Testing**
   - Add Jest + React Testing Library
   - Write component tests
   - Add E2E tests with Playwright

5. **Deployment**
   - Deploy to Vercel, Netlify, or your platform
   - Configure environment variables
   - Set up CI/CD pipeline

## Getting Help

- Check existing documentation in project root
- Review code comments in components
- Explore the UI Kit at `/ui-kit`
- Reference the design system in `globals.css`

## License

Private project - see project documentation for details.

---

**Version**: 2.0.0  
**Last Updated**: October 16, 2025

Happy coding! 🚀
