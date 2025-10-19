# Architecture Overview

## Application Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Next.js App Router                       │
│                                                                  │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────────┐  │
│  │  app/layout.tsx │  │  app/page.tsx  │  │ app/ui-kit/      │  │
│  │  (Root Layout)  │  │  (Dashboard)   │  │ page.tsx         │  │
│  └────────────────┘  └────────────────┘  └──────────────────┘  │
│                                                                  │
└──────────────────────────────┬───────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      App Layout Component                        │
│                  (components/layout/app-layout.tsx)              │
│                                                                  │
│  ┌──────────────────┐  ┌────────────────────────────────────┐  │
│  │ Collapsible      │  │                                    │  │
│  │ Sidebar          │  │  Main Content Area                 │  │
│  │                  │  │                                    │  │
│  │ ┌──────────────┐ │  │  ┌──────────────────────────────┐ │  │
│  │ │ Nav Item     │ │  │  │ TopBar                       │ │  │
│  │ │ (Dashboard)  │ │  │  │  - User Menu                 │ │  │
│  │ │ Nav Item     │ │  │  │  - Notifications             │ │  │
│  │ │ (Tickets) 12 │ │  │  │  - Role Switcher             │ │  │
│  │ │ Nav Item     │ │  │  └──────────────────────────────┘ │  │
│  │ │ (Customers)  │ │  │                                    │  │
│  │ │ ...          │ │  │  ┌──────────────────────────────┐ │  │
│  │ │              │ │  │  │ Breadcrumbs                  │ │  │
│  │ │ Collapse Btn │ │  │  └──────────────────────────────┘ │  │
│  │ └──────────────┘ │  │                                    │  │
│  │                  │  │  ┌──────────────────────────────┐ │  │
│  │ 256px / 64px     │  │  │                              │ │  │
│  └──────────────────┘  │  │  Page Content                │ │  │
│                         │  │  (Dashboard, Tickets, etc)   │ │  │
│                         │  │                              │ │  │
│                         │  └──────────────────────────────┘ │  │
│                         └────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App (Next.js)
│
├── RootLayout (app/layout.tsx)
│   └── HTML + Body + Fonts + Metadata
│
└── Page Routes
    │
    ├── Home/Dashboard (app/page.tsx)
    │   └── AppLayout
    │       ├── CollapsibleSidebar
    │       │   ├── Logo
    │       │   ├── Navigation Items
    │       │   │   └── SidebarNavItem (×11)
    │       │   │       ├── Icon (Lucide)
    │       │   │       ├── Label
    │       │   │       └── Badge (optional)
    │       │   └── Collapse Toggle
    │       │
    │       ├── TopBar
    │       │   ├── Hamburger Menu (mobile)
    │       │   ├── Global Search
    │       │   ├── Notifications
    │       │   └── User Menu
    │       │
    │       ├── Breadcrumbs
    │       │
    │       └── Content
    │           ├── Role-Specific Dashboard
    │           │   ├── KPI Cards (×4-6)
    │           │   ├── Charts (Recharts)
    │           │   ├── Recent Activity
    │           │   └── Quick Actions
    │           │
    │           ├── Tickets Table
    │           │   ├── Filters
    │           │   ├── Data Table
    │           │   └── Pagination
    │           │
    │           └── Customers Table
    │               ├── Filters
    │               ├── Data Table
    │               └── Pagination
    │
    └── UI Kit (app/ui-kit/page.tsx)
        └── AppLayout
            └── UIKitContent
                ├── Design Tokens
                ├── Component Examples
                └── Accessibility Guide
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      User Interaction                        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    Component State                           │
│  (useState, useCallback, useEffect)                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ├─────────────┬──────────────┐
                       ▼             ▼              ▼
              ┌────────────┐  ┌──────────┐  ┌──────────────┐
              │  Navigate  │  │  Filter  │  │  Open Modal  │
              │  to Route  │  │   Data   │  │  /Sheet      │
              └────────────┘  └──────────┘  └──────────────┘
                       │             │              │
                       ▼             ▼              ▼
              ┌─────────────────────────────────────────────┐
              │           Mock Data (lib/mock-data.ts)      │
              │         (Future: API/Supabase calls)        │
              └─────────────────────────────────────────────┘
                                   │
                                   ▼
              ┌─────────────────────────────────────────────┐
              │            UI Components Render             │
              │    (Tables, Cards, Charts, Badges, etc)     │
              └─────────────────────────────────────────────┘
```

## Sidebar State Management

```
┌─────────────────────────────────────────────────────────┐
│              Sidebar State (Local)                       │
│                                                          │
│  isCollapsed: boolean                                    │
│                                                          │
│  Desktop:     Expanded (256px) ←──→ Collapsed (64px)     │
│  Mobile:      Hidden ←──→ Overlay (256px)                │
│                                                          │
└───────────────────┬──────────────────────────────────────┘
                    │
                    ├─── Triggers
                    │    ├── Collapse Button Click
                    │    ├── Hamburger Menu Click (mobile)
                    │    └── Backdrop Click (mobile)
                    │
                    └─── Effects
                         ├── Width Transition (300ms)
                         ├── Text Opacity Fade
                         ├── Badge Transform (full → dot)
                         └── Main Content Margin Shift
```

## Navigation Flow

```
User Clicks Nav Item
         │
         ▼
   onNavigate(path)
         │
         ├─── Update currentPath state
         │
         ├─── Render new content
         │         │
         │         ├─── Dashboard → Show role-specific dashboard
         │         ├─── Tickets → Show tickets table
         │         ├─── Customers → Show customers table
         │         ├─── UI Kit → Show UI documentation
         │         └─── Other → Show "Coming Soon"
         │
         ├─── Update breadcrumbs
         │
         ├─── Update page title
         │
         └─── Highlight active nav item
                   │
                   └─── Apply active state styles
                         ├── Background: primary color
                         ├── Text: primary-foreground
                         └── Show chevron/badge
```

## Responsive Behavior

```
┌─────────────────────────────────────────────────────────────┐
│                    Viewport Width                            │
└──────────────────────┬───────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┬──────────────────┐
        │              │              │                  │
        ▼              ▼              ▼                  ▼
   Mobile (<768)   Tablet         Desktop           Wide (>1440)
                  (768-1023)    (1024-1439)
        │              │              │                  │
        ▼              ▼              ▼                  ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Sidebar:     │ │ Sidebar:     │ │ Sidebar:     │ │ Sidebar:     │
│ Hidden       │ │ Fixed Left   │ │ Fixed Left   │ │ Fixed Left   │
│ (Overlay)    │ │ Collapsible  │ │ Collapsible  │ │ Expanded     │
│              │ │              │ │              │ │              │
│ Content:     │ │ Content:     │ │ Content:     │ │ Content:     │
│ Full Width   │ │ ml-16/ml-64  │ │ ml-16/ml-64  │ │ ml-64        │
│              │ │              │ │              │ │              │
│ Grid:        │ │ Grid:        │ │ Grid:        │ │ Grid:        │
│ 4 columns    │ │ 8 columns    │ │ 12 columns   │ │ 12 columns   │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

## Design Token System

```
┌─────────────────────────────────────────────────────────────┐
│                   styles/globals.css                         │
│                                                              │
│  :root {                           .dark {                  │
│    --primary: #0052CC                --primary: #0052CC     │
│    --background: #FFFFFF             --background: #0B1220  │
│    --foreground: #101828             --foreground: #E5E7EB  │
│    ...                               ...                    │
│  }                                 }                         │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                 Tailwind CSS Classes                         │
│                                                              │
│  bg-primary → var(--color-primary)                          │
│  text-foreground → var(--color-foreground)                  │
│  border-border → var(--color-border)                        │
│  ...                                                         │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                 Component Styling                            │
│                                                              │
│  <div className="bg-primary text-primary-foreground">       │
│    Styled with design tokens                                │
│  </div>                                                      │
└─────────────────────────────────────────────────────────────┘
```

## File Organization

```
isp-platform/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout + metadata
│   ├── page.tsx                 # Home page (dashboard router)
│   └── ui-kit/
│       └── page.tsx             # UI Kit documentation
│
├── components/
│   ├── dashboards/              # 7 role-specific dashboards
│   │   ├── super-admin-dashboard.tsx
│   │   ├── system-admin-dashboard.tsx
│   │   ├── customer-support-dashboard.tsx
│   │   ├── billing-officer-dashboard.tsx
│   │   ├── it-staff-dashboard.tsx
│   │   ├── field-tech-dashboard.tsx
│   │   └── customer-portal-dashboard.tsx
│   │
│   ├── layout/                  # Layout components
│   │   ├── app-layout.tsx       # ⭐ Main layout wrapper
│   │   ├── collapsible-sidebar.tsx  # ⭐ Sidebar with collapse
│   │   ├── sidebar-nav-item.tsx     # ⭐ Nav item with badge
│   │   ├── top-bar.tsx          # Top navigation
│   │   └── breadcrumbs.tsx      # Breadcrumb navigation
│   │
│   ├── shared/                  # Shared components
│   │   ├── kpi-card.tsx         # KPI display cards
│   │   ├── status-badge.tsx     # Status indicators
│   │   ├── sla-chip.tsx         # SLA countdown
│   │   ├── empty-state.tsx      # Empty states
│   │   ├── loading-skeleton.tsx # Loading placeholders
│   │   └── quick-actions.tsx    # Quick action buttons
│   │
│   ├── tickets/                 # Ticket management
│   │   ├── tickets-table.tsx    # Ticket list
│   │   ├── ticket-detail-sheet.tsx  # Detail view
│   │   └── create-ticket-dialog.tsx # Create form
│   │
│   ├── customers/               # Customer management
│   │   └── customers-table.tsx  # Customer list
│   │
│   ├── billing/                 # Billing features
│   │   └── invoice-detail-sheet.tsx
│   │
│   ├── tenants/                 # Tenant management
│   │   └── create-tenant-stepper.tsx
│   │
│   ├── ui/                      # shadcn/ui components (50+)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...
│   │
│   └── ui-kit/                  # UI Kit documentation
│       └── ui-kit-content.tsx   # ⭐ Complete component docs
│
├── lib/
│   ├── types.ts                 # TypeScript definitions
│   └── mock-data.ts             # Demo data
│
├── styles/
│   └── globals.css              # ⭐ Design tokens + styles
│
├── public/                      # Static assets
│
└── Documentation files...       # Comprehensive docs
```

## Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│                       Frontend Stack                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Framework:     Next.js 14+ (App Router)                     │
│  Language:      TypeScript (Strict Mode)                     │
│  Styling:       Tailwind CSS 4.0                             │
│  Components:    Radix UI + shadcn/ui                         │
│  Icons:         Lucide React                                 │
│  Charts:        Recharts                                     │
│  Forms:         React Hook Form                              │
│  Notifications: Sonner (Toast)                               │
│  Date:          date-fns + React Day Picker                  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                     Development Tools                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  TypeScript:    Type safety + IntelliSense                   │
│  ESLint:        Code quality                                 │
│  Tailwind:      Utility-first CSS                            │
│  Hot Reload:    Fast Refresh                                 │
│  Path Aliases:  @/* imports                                  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                  Future Backend (Ready)                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Database:      Supabase / PostgreSQL                        │
│  Auth:          NextAuth.js / Supabase Auth                  │
│  API:           Next.js Route Handlers                       │
│  Storage:       Supabase Storage                             │
│  Realtime:      Supabase Realtime                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## State Management Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                      Current State                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Component State (useState)                                  │
│  ├── Sidebar collapse                                        │
│  ├── Modal open/close                                        │
│  ├── Form data                                               │
│  └── UI interactions                                         │
│                                                              │
│  Prop Drilling                                               │
│  ├── currentRole                                             │
│  ├── currentPath                                             │
│  └── Event handlers                                          │
│                                                              │
│  Mock Data (lib/mock-data.ts)                                │
│  ├── Tickets                                                 │
│  ├── Customers                                               │
│  ├── Invoices                                                │
│  └── Users                                                   │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                   Future State (Recommended)                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Server State (React Query / SWR)                            │
│  ├── API data caching                                        │
│  ├── Optimistic updates                                      │
│  └── Automatic revalidation                                  │
│                                                              │
│  Auth State (NextAuth / Supabase)                            │
│  ├── User session                                            │
│  ├── Role information                                        │
│  └── Permissions                                             │
│                                                              │
│  Global State (Context API / Zustand)                        │
│  ├── Theme preference                                        │
│  ├── Language preference                                     │
│  └── User preferences                                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Performance Considerations

```
┌─────────────────────────────────────────────────────────────┐
│                    Optimization Strategy                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Code Splitting                                              │
│  ✅ Automatic route-based splitting                          │
│  ✅ Dynamic imports for modals/sheets                        │
│  ⏳ Lazy load charts (future)                                │
│                                                              │
│  Asset Optimization                                          │
│  ✅ Font optimization (next/font)                            │
│  ⏳ Image optimization (next/image)                          │
│  ✅ CSS purging (Tailwind)                                   │
│                                                              │
│  Rendering Strategy                                          │
│  ✅ Client components where needed                           │
│  ⏳ Server components for static content                     │
│  ⏳ ISR for dashboards (future)                              │
│  ⏳ SSG for marketing pages (future)                         │
│                                                              │
│  Caching                                                     │
│  ⏳ API response caching                                     │
│  ⏳ Static asset caching                                     │
│  ⏳ Database query caching                                   │
│                                                              │
│  Bundle Size                                                 │
│  ✅ Tree shaking enabled                                     │
│  ✅ Production minification                                  │
│  ✅ Compression ready                                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Legend: ✅ Implemented | ⏳ Future Enhancement
```

---

**Last Updated**: October 16, 2025  
**Version**: 2.0.0  
**Status**: Production Ready
