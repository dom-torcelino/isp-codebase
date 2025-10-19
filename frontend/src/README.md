# ISP Platform - Telecom Billing & Ticketing System

A comprehensive ISP/telecom billing & ticketing platform with multi-tenant support and role-based access control.

## 🚀 Features

### Multi-Role Support (7 User Types)
- **Super Admin** - Platform-wide management
- **System Admin** - Tenant administration
- **Customer Support** - Ticket handling
- **Billing Officer** - Invoice & payment management
- **IT Staff** - Technical operations
- **Field Technician** - On-site job management
- **Customer Portal** - Self-service dashboard

### Core Functionality
- ✅ Ticket Management with SLA tracking
- ✅ Customer & User Management
- ✅ Invoice & Billing Operations
- ✅ Multi-tenant Architecture
- ✅ Role-based Access Control
- ✅ Interactive Dashboards with KPIs
- ✅ Responsive Design (Desktop/Tablet/Mobile)
- ✅ Dark Mode Support
- ✅ Accessibility Compliant (WCAG 2.2 AA)

## 🎨 Design System

### Design Tokens
- **Colors**: Primary (#0052CC), Accent (#2E90FA), System colors
- **Typography**: Inter font family
  - Display: 32px
  - H1: 24px
  - H2: 20px
  - H3: 18px
  - Body: 16px
  - Caption: 12px
- **Spacing**: 4, 8, 12, 16, 20, 24, 32 (px)
- **Border Radius**: 6, 8, 12, 16 (default: 12)
- **Shadows**: xs, sm, md

### Component Library
50+ components built with shadcn/ui and Radix UI primitives. View the complete UI Kit at `/ui-kit`.

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4.0
- **Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Notifications**: Sonner

## 📦 Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🧪 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # TypeScript type checking
```

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── ui-kit/            # UI Kit documentation
├── components/
│   ├── dashboards/        # Role-specific dashboards
│   ├── layout/            # Layout components
│   │   ├── app-layout.tsx
│   │   ├── collapsible-sidebar.tsx
│   │   ├── sidebar-nav-item.tsx
│   │   ├── top-bar.tsx
│   │   └── breadcrumbs.tsx
│   ├── shared/            # Shared components
│   ├── tickets/           # Ticket management
│   ├── customers/         # Customer management
│   ├── billing/           # Billing components
│   ├── ui/                # shadcn/ui components
│   └── ui-kit/            # UI Kit documentation
├── lib/
│   ├── types.ts           # TypeScript types
│   └── mock-data.ts       # Demo data
├── styles/
│   └── globals.css        # Global styles & tokens
└── public/                # Static assets
```

## 🎯 Key Components

### Collapsible Sidebar
- Full width (256px) and collapsed (64px) states
- Role-based navigation filtering
- Badge support for notifications
- Smooth animations
- Mobile responsive with overlay

### Sidebar Navigation Item
- Active/Default states
- Icon integration
- Badge counters
- Accessibility compliant (44×44 touch targets)

### KPI Cards
- Trend indicators (up/down/neutral)
- Multiple formats (currency, percentage, number)
- Loading states
- Icon support

### Status Badges
- Ticket status indicators
- SLA countdown timers
- Priority levels
- Accessibility compliant (not color-only)

## ♿ Accessibility

WCAG 2.2 AA Compliant:
- ✅ 4.5:1 contrast ratio for text
- ✅ 3:1 contrast ratio for large text
- ✅ Visible focus indicators (2px ring)
- ✅ Minimum 44×44 touch targets
- ✅ Semantic HTML
- ✅ Proper ARIA labels
- ✅ Keyboard navigation
- ✅ Screen reader support

## 🌐 Internationalization (Planned)

Future support for:
- English (EN)
- Filipino (Fil)

## 🔐 Authentication (Backend Integration)

Ready for integration with:
- NextAuth.js
- Supabase Auth
- Custom authentication

## 📊 Data Management

Currently uses mock data for demonstration. Ready for backend integration:
- Supabase
- REST APIs
- GraphQL
- tRPC

## 🎨 UI Kit

Visit `/ui-kit` to explore:
- All design tokens
- Component variants
- Interactive examples
- Accessibility guidelines
- Usage documentation

## 📝 License

Private - Not for public distribution

## 🤝 Contributing

This is a private project. Contact the team for contribution guidelines.

## 📞 Support

For issues or questions, contact the development team.

---

**Version**: 2.0.0  
**Framework**: Next.js 14+  
**Last Updated**: October 16, 2025
