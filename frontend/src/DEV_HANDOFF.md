# ISP/Telecom Billing & Ticketing Platform - Developer Handoff

## Project Overview

This is a comprehensive multi-tenant ISP/Telecom billing and ticketing platform with role-based access control, built with React, TypeScript, Tailwind CSS, and shadcn/ui components.

## Tech Stack

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React useState (expandable to Context API or Redux)
- **Forms**: React Hook Form + Zod (for production)

## Folder Structure

```
/
├── App.tsx                          # Main application entry point
├── components/
│   ├── layout/                      # Layout components
│   │   ├── app-sidebar.tsx         # Role-aware navigation sidebar
│   │   ├── top-bar.tsx             # Header with search, notifications, user menu
│   │   └── breadcrumbs.tsx         # Navigation breadcrumbs
│   ├── dashboards/                  # Role-specific dashboards
│   │   ├── super-admin-dashboard.tsx
│   │   ├── system-admin-dashboard.tsx
│   │   ├── customer-support-dashboard.tsx
│   │   ├── billing-officer-dashboard.tsx
│   │   ├── it-staff-dashboard.tsx
│   │   ├── field-tech-dashboard.tsx
│   │   └── customer-portal-dashboard.tsx
│   ├── tickets/                     # Ticket management
│   │   ├── tickets-table.tsx       # DataTable with filters
│   │   ├── ticket-detail-sheet.tsx # Right sheet for ticket details
│   │   └── create-ticket-dialog.tsx
│   ├── billing/                     # Billing components
│   │   └── invoice-detail-sheet.tsx
│   ├── tenants/                     # Multi-tenant management
│   │   └── create-tenant-stepper.tsx
│   ├── shared/                      # Reusable components
│   │   ├── kpi-card.tsx            # KPI metric cards
│   │   ├── sla-chip.tsx            # SLA countdown chips
│   │   ├── status-badge.tsx        # Status/priority badges
│   │   └── empty-state.tsx         # Empty states & error handling
│   ├── ui/                          # shadcn/ui base components
│   └── figma/                       # System components (protected)
├── lib/
│   ├── types.ts                     # TypeScript type definitions
│   └── mock-data.ts                 # Mock data for demo
├── styles/
│   └── globals.css                  # Global styles & design tokens
└── guidelines/
    └── Guidelines.md
```

## Design System

### Color Palette

```css
/* Primary */
--primary: #1F7A8C
--primary-light: #3FBAC2
--primary-dark: #14505C

/* Secondary */
--secondary: #F4A261
--secondary-light: #F6B980
--secondary-dark: #D9813D

/* Background */
--background: #F9FAFB
--surface: #FFFFFF

/* Text */
--text-primary: #1F2937
--text-secondary: #4B5563

/* Semantic */
--success: #2F855A
--warning: #D97706
--error: #B91C1C
```

### Typography

- **Display**: 32px / Medium
- **H1**: 24px / Medium
- **H2**: 20px / Medium
- **H3**: 18px / Medium
- **Body**: 16px / Normal
- **Caption**: 12px / Normal
- **Font Family**: Inter

### Spacing & Layout

- **Grid**: 12-col (1440px), 8-col (1024px), 4-col (375px)
- **Base Spacing**: 8px increments
- **Border Radius**: 12px
- **Shadows**: Soft elevation (see `shadow-soft` utility)

## User Roles & Routes

### Super Admin (Platform-wide)
- `/dashboard` - Platform KPIs, tenant overview
- `/tenants` - Manage all tenants
- `/tenants/[id]` - Tenant details
- Create tenant with stepper wizard

### System Admin (Tenant-level)
- `/dashboard` - Tenant KPIs, charts, tables
- `/tickets` - All tickets with DataTable
- `/billing` - Billing overview
- `/customers` - Customer management
- `/users` - User management
- `/reports` - Analytics

### Customer Support
- `/dashboard` - My assigned, unassigned, overdue queues
- `/tickets` - Ticket management (no financial access)
- `/customers/[id]` - Read-only customer details

### Billing Officer
- `/dashboard` - Billing KPIs, collections vs target
- `/billing/invoices` - Invoice management
- `/billing/invoices/[id]` - Invoice detail with payment actions

### IT Staff
- `/dashboard` - IT/Repair tickets only
- `/tickets/[id]` - Technical ticket details

### Field Technician (Mobile-first)
- `/jobs` - Job cards with customer info, GPS
- `/jobs/[id]` - Progressive job status updates

### Customer Portal
- `/portal` - Account overview
- `/portal/payments` - Payment history
- `/portal/tickets` - View & create tickets (read-only after creation)

## Key Features

### SLA Tracking
- Visual countdown chips (respond/onsite/resolve)
- 70% warning threshold (yellow badge)
- Breach indicators (red badge + "SLA Breached" tag)
- Timeline audit logs

### Multi-Tenant
- Tenant switcher in TopBar
- Isolated data per tenant
- Super admin can manage all tenants

### Responsive Design
- Desktop: Sidebar navigation
- Mobile: Overlay sidebar, bottom nav for Field Tech
- Breakpoints: 1440px, 1024px, 375px

### Accessibility (WCAG 2.2 AA)
- Visible focus states (ring-2 ring-ring)
- Keyboard navigation support
- Semantic HTML
- Status indicators not reliant on color alone

### Internationalization
- Language toggle (EN/Fil) in TopBar
- UTC timestamps displayed in user's local timezone
- Locale-aware date formatting

## Component Naming Conventions

- **DataTable components** → `*-table.tsx`
- **Detail sheets** → `*-detail-sheet.tsx` (right Sheet component)
- **Dialogs** → `*-dialog.tsx`
- **Dashboards** → `*-dashboard.tsx`
- **shadcn/ui** → Use existing components (Button, Dialog, Sheet, Table, etc.)

## Data Flow

Currently using mock data from `lib/mock-data.ts`. In production:

1. Replace with API calls (REST or GraphQL)
2. Add authentication layer
3. Implement Supabase for backend (if needed)
4. Add real-time updates for ticket assignments
5. Integrate payment gateway for billing

## Next Steps for Development

1. **Authentication**: Add auth provider (Supabase Auth, Auth0, etc.)
2. **API Integration**: Connect to backend services
3. **Real-time**: WebSocket for live ticket updates
4. **File Upload**: S3/CloudFlare for attachments
5. **Email**: Transactional emails (SendGrid, Postmark)
6. **SMS**: Twilio for notifications (PH mobile numbers)
7. **Payment Gateway**: Paymongo, PayMongo, or GCash integration
8. **GPS Tracking**: Google Maps API for field tech location
9. **Reporting**: Advanced analytics with filters
10. **Export**: PDF invoices, CSV reports

## Important Notes

- All routes are simulated; implement proper routing with React Router or Next.js App Router
- Mock data is for demo purposes only
- SLA calculations are simplified; implement business logic rules
- File uploads are UI-only; backend integration required
- GPS tracking is placeholder; requires geolocation API

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Type check
npm run type-check
```

## Environment Variables (Production)

```env
VITE_API_URL=your-api-url
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_GOOGLE_MAPS_API_KEY=your-maps-key
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS 14+)
- Chrome Android (latest)

---

**Last Updated**: October 16, 2025  
**Version**: 1.0.0  
**Contact**: dev-team@isp-platform.com
