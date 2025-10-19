# Sidebar Implementation Guide

## Overview
The collapsible sidebar is a core navigation component of the ISP Platform, featuring two distinct states and full accessibility compliance.

## Component Architecture

### 1. Sidebar Navigation Item (`/components/layout/sidebar-nav-item.tsx`)

A reusable navigation link component demonstrating the "Tickets" example with all specified properties:

#### Properties
```typescript
interface SidebarNavItemProps {
  title: string;                          // Display text
  icon: React.ComponentType;              // Lucide icon component
  isActive?: boolean;                     // Active state indicator
  isCollapsed?: boolean;                  // Sidebar collapsed state
  badge?: number;                         // Notification count (e.g., 12)
  onClick?: () => void;                   // Click handler
}
```

#### States
- **Default (D)**: Normal resting state
- **Hover (H)**: `hover:bg-sidebar-accent` background change
- **Pressed (P)**: Active click state
- **Loading (L)**: Can be implemented with loading prop
- **Disabled (X)**: Disabled state support

#### Badge Implementation
The Tickets navigation item displays a badge with count "12" as specified:
```tsx
<SidebarNavItem
  title="Tickets"
  icon={Ticket}
  isActive={currentPath === '/tickets'}
  badge={12}  // Displays muted background with count
/>
```

Badge styling:
- Background: `bg-muted`
- Foreground: `text-muted-foreground`
- Height: 20px (5 spacing units)
- Min width: 20px
- Padding: 8px horizontal
- Centered content

#### Active State
- Background: `bg-sidebar-primary` (#0052CC)
- Foreground: `text-sidebar-primary-foreground` (#FFFFFF)
- Chevron icon indicator (when expanded)

#### Collapsed State Behavior
When sidebar is collapsed (icon-only):
- Only icon visible
- Badge shows as red dot indicator (top-right)
- Title hidden
- Width: 64px (16 spacing units)

### 2. Collapsible Sidebar (`/components/layout/collapsible-sidebar.tsx`)

Main sidebar container with collapsible functionality.

#### States

**Open State (Default)**
- Width: 256px (64 spacing units)
- Full navigation items with text, icons, and badges
- Logo with full text "ISP Platform"
- Collapse button with "Collapse" text + icon

**Collapsed State**
- Width: 64px (16 spacing units)
- Icon-only navigation
- Logo icon only (no text)
- Collapse button with expand icon only
- Badge indicators as dots

#### Animation
- Transition duration: 300ms
- Easing: Default CSS ease
- Properties animated: width, opacity (text elements)

#### Structure
```
┌─────────────────────────────────┐
│ Logo Area (h: 64px)             │
├─────────────────────────────────┤
│                                 │
│ Navigation Items (scrollable)   │
│  - Dashboard                    │
│  - Tickets [12]  ← Badge        │
│  - Billing                      │
│  - Customers                    │
│  - ...                          │
│                                 │
├─────────────────────────────────┤
│ Collapse Toggle                 │
└─────────────────────────────────┘
```

### 3. App Layout (`/components/layout/app-layout.tsx`)

Unified layout wrapper integrating the sidebar.

#### Responsive Behavior

**Desktop (≥1024px)**
- Sidebar fixed left
- Main content offset by sidebar width
- Sidebar always visible
- Toggle collapse in-place

**Tablet (768px - 1023px)**
- Sidebar fixed left (same as desktop)
- Collapsible for more space
- Touch-friendly interactions

**Mobile (<768px)**
- Sidebar hidden by default
- Hamburger menu in top bar
- Sidebar overlays content when open
- Backdrop overlay (50% black)
- Slide animation from left
- Auto-close on navigation

## Implementation Example

### Basic Usage

```tsx
import { CollapsibleSidebar } from '@/components/layout/collapsible-sidebar';

function MyApp() {
  return (
    <CollapsibleSidebar
      currentRole="system_admin"
      currentPath="/tickets"
      onNavigate={(path) => router.push(path)}
    />
  );
}
```

### With App Layout

```tsx
import { AppLayout } from '@/components/layout/app-layout';

function Page() {
  return (
    <AppLayout
      currentRole={currentRole}
      currentPath={currentPath}
      onNavigate={handleNavigate}
    >
      {/* Your page content */}
    </AppLayout>
  );
}
```

## Accessibility Features

### WCAG 2.2 AA Compliance

1. **Focus Indicators**
   - 2px ring on focus
   - 2px offset for visibility
   - Color: `--sidebar-ring`

2. **Touch Targets**
   - Minimum 44×44px for all clickable items
   - Applied via `.touch-target` utility class

3. **Keyboard Navigation**
   - Tab navigation through items
   - Enter/Space to activate
   - Escape to close (mobile)

4. **Screen Readers**
   - `aria-current="page"` on active item
   - `aria-label` on collapse toggle
   - Semantic HTML structure

5. **Color Independence**
   - Active state uses background + icon indicator
   - Not relying solely on color
   - Icons provide visual cues

## Customization

### Adding New Navigation Items

Edit `/components/layout/collapsible-sidebar.tsx`:

```tsx
const navItems: NavItem[] = [
  // ... existing items
  {
    title: 'New Section',
    href: '/new-section',
    icon: NewIcon,
    roles: ['system_admin'],
    badge: 5  // Optional badge count
  }
];
```

### Styling

Colors are controlled by CSS variables in `styles/globals.css`:

```css
:root {
  --sidebar: #FFFFFF;
  --sidebar-foreground: #101828;
  --sidebar-primary: #0052CC;
  --sidebar-primary-foreground: #FFFFFF;
  --sidebar-accent: #F4F5F7;
  --sidebar-accent-foreground: #101828;
  --sidebar-border: #EAECF0;
  --sidebar-ring: #003F99;
}
```

### Width Customization

Modify in `/components/layout/collapsible-sidebar.tsx`:

```tsx
<aside className={cn(
  'fixed left-0 top-0 h-screen',
  isCollapsed ? 'w-16' : 'w-64'  // Adjust these values
)}>
```

Don't forget to update the margin in `app-layout.tsx`:

```tsx
<div className="lg:ml-16">  {/* Match collapsed width */}
```

## Role-Based Navigation

Navigation items are automatically filtered based on user role:

```tsx
const filteredItems = navItems.filter(item => 
  item.roles.includes(currentRole)
);
```

### Role Matrix

| Item | Super Admin | System Admin | Support | Billing | IT | Field Tech | Customer |
|------|-------------|--------------|---------|---------|----|-----------| ---------|
| Dashboard | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Tickets | - | ✓ | ✓ | - | ✓ | ✓ | ✓ |
| Billing | - | ✓ | - | ✓ | - | - | - |
| Customers | - | ✓ | ✓ | ✓ | - | - | - |
| Users | ✓ | ✓ | - | - | - | - | - |
| Technicians | - | ✓ | - | - | - | - | - |
| Tenants | ✓ | - | - | - | - | - | - |
| Reports | ✓ | ✓ | - | - | - | - | - |
| Integrations | - | ✓ | - | - | - | - | - |
| UI Kit | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Settings | ✓ | ✓ | - | - | - | - | ✓ |

## Performance Considerations

1. **Animation Performance**
   - Uses CSS transitions (GPU-accelerated)
   - Transforms for position changes
   - No layout thrashing

2. **State Management**
   - Local state for collapse (useState)
   - No unnecessary re-renders
   - Memoization where needed

3. **Mobile Optimization**
   - Touch event handling
   - Prevents scroll on backdrop
   - Smooth slide animations

## Testing Recommendations

### Manual Testing Checklist

- [ ] Desktop: Collapse/expand works smoothly
- [ ] Desktop: Active state highlights current page
- [ ] Desktop: Badge displays correctly
- [ ] Desktop: Keyboard navigation works
- [ ] Tablet: Same as desktop
- [ ] Mobile: Hamburger menu opens sidebar
- [ ] Mobile: Backdrop closes sidebar on click
- [ ] Mobile: Navigation closes sidebar automatically
- [ ] Mobile: No scroll issues with overlay
- [ ] All: Focus indicators visible
- [ ] All: Screen reader announces correctly
- [ ] All: Touch targets minimum 44×44
- [ ] Dark mode: All states visible

### Automated Testing (Future)

```tsx
// Example test structure
describe('SidebarNavItem', () => {
  it('renders with badge count', () => {
    render(<SidebarNavItem badge={12} />);
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('shows active state', () => {
    const { container } = render(<SidebarNavItem isActive />);
    expect(container.firstChild).toHaveClass('bg-sidebar-primary');
  });

  it('handles keyboard navigation', () => {
    const onClick = jest.fn();
    render(<SidebarNavItem onClick={onClick} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(onClick).toHaveBeenCalled();
  });
});
```

## Troubleshooting

### Sidebar not collapsing
- Check state management in parent component
- Verify CSS transitions are not disabled
- Check console for JavaScript errors

### Badge not displaying
- Ensure badge prop is a number > 0
- Check CSS for `.badge` class
- Verify muted colors are defined in globals.css

### Active state not showing
- Verify currentPath matches navigation href
- Check path comparison logic (exact vs. starts-with)
- Ensure CSS classes are applied correctly

### Mobile overlay issues
- Check z-index values
- Verify backdrop click handler
- Check transform transitions
- Ensure body scroll is managed

## Future Enhancements

1. **User Preferences**
   - Remember collapsed state in localStorage
   - Per-user sidebar preferences

2. **Nested Navigation**
   - Expandable sub-menus
   - Multi-level navigation

3. **Search**
   - Command palette (Cmd+K)
   - Quick navigation search

4. **Customization**
   - User-configurable menu items
   - Drag-to-reorder navigation

5. **Analytics**
   - Track most-used navigation items
   - Usage patterns for optimization

---

**Last Updated**: October 16, 2025  
**Version**: 2.0.0
