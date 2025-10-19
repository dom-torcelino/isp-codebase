# Figma UI Kit Specification

## Overview
This document provides specifications for creating a comprehensive UI Kit in Figma that matches the implemented codebase.

## Design Tokens (Variables in Figma)

### Color Variables

#### Light Mode

**Primitives**
- `color/primary/base` → #0052CC
- `color/primary/foreground` → #FFFFFF
- `color/accent/base` → #2E90FA
- `color/accent/foreground` → #FFFFFF
- `color/secondary/base` → #EAECF0
- `color/secondary/foreground` → #101828

**System Colors**
- `color/success` → #00875A
- `color/warning` → #FFAB00
- `color/info` → #2E90FA
- `color/destructive` → #DE350B
- `color/destructive/foreground` → #FFFFFF

**Neutral**
- `color/background` → #FFFFFF
- `color/foreground` → #101828
- `color/card` → #FFFFFF
- `color/card/foreground` → #101828
- `color/muted` → #F4F5F7
- `color/muted/foreground` → #667085
- `color/border` → #EAECF0
- `color/input` → #EAECF0
- `color/ring` → #003F99

**Text**
- `color/text/primary` → #101828
- `color/text/secondary` → #344054
- `color/text/muted` → #667085
- `color/text/disabled` → #98A2B3

**Sidebar**
- `color/sidebar/background` → #FFFFFF
- `color/sidebar/foreground` → #101828
- `color/sidebar/primary` → #0052CC
- `color/sidebar/primary/foreground` → #FFFFFF
- `color/sidebar/accent` → #F4F5F7
- `color/sidebar/accent/foreground` → #101828
- `color/sidebar/border` → #EAECF0

#### Dark Mode

**Primitives**
- `color/primary/base` → #0052CC
- `color/primary/foreground` → #FFFFFF
- `color/accent/base` → #2E90FA
- `color/accent/foreground` → #FFFFFF
- `color/secondary/base` → #111827
- `color/secondary/foreground` → #E5E7EB

**System Colors**
(Same as light mode)

**Neutral**
- `color/background` → #0B1220
- `color/foreground` → #E5E7EB
- `color/card` → #0B1220
- `color/card/foreground` → #E5E7EB
- `color/muted` → #111827
- `color/muted/foreground` → #98A2B3
- `color/border` → #111827
- `color/input` → #111827
- `color/ring` → #66A3FF

**Text**
- `color/text/primary` → #E5E7EB
- `color/text/secondary` → #98A2B3
- `color/text/muted` → #667085
- `color/text/disabled` → #667085

**Sidebar**
- `color/sidebar/background` → #0B1220
- `color/sidebar/foreground` → #E5E7EB
- `color/sidebar/primary` → #0052CC
- `color/sidebar/primary/foreground` → #FFFFFF
- `color/sidebar/accent` → #111827
- `color/sidebar/accent/foreground` → #E5E7EB
- `color/sidebar/border` → #111827

### Typography Variables

**Font Family**
- `typography/font/family` → Inter

**Font Sizes**
- `typography/size/display` → 32px
- `typography/size/h1` → 24px
- `typography/size/h2` → 20px
- `typography/size/h3` → 18px
- `typography/size/body` → 16px
- `typography/size/caption` → 12px

**Font Weights**
- `typography/weight/normal` → 400
- `typography/weight/medium` → 500

**Line Heights**
- `typography/lineHeight/display` → 1.3 (41.6px)
- `typography/lineHeight/h1` → 1.4 (33.6px)
- `typography/lineHeight/h2` → 1.4 (28px)
- `typography/lineHeight/h3` → 1.5 (27px)
- `typography/lineHeight/body` → 1.5 (24px)
- `typography/lineHeight/caption` → 1.5 (18px)

### Spacing Variables

**Base Unit**: 4px

- `spacing/1` → 4px
- `spacing/2` → 8px
- `spacing/3` → 12px
- `spacing/4` → 16px
- `spacing/5` → 20px
- `spacing/6` → 24px
- `spacing/8` → 32px

### Radius Variables

- `radius/sm` → 6px
- `radius/md` → 8px
- `radius/lg` → 12px (default)
- `radius/xl` → 16px

### Shadow Variables

- `effect/shadow/xs` → Drop Shadow (0, 1, 2, 0.05 opacity)
- `effect/shadow/sm` → Multi-shadow:
  - Drop Shadow (0, 1, 3, 0.1 opacity)
  - Drop Shadow (0, 1, 2, 0.06 opacity)
- `effect/shadow/md` → Multi-shadow:
  - Drop Shadow (0, 4, 6, 0.07 opacity)
  - Drop Shadow (0, 2, 4, 0.06 opacity)

## Component Library

### Component Organization

```
UI Kit
├── 1. Foundation
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   ├── Radius
│   └── Shadows
├── 2. Navigation
│   ├── Sidebar Navigation Item ⭐
│   └── Breadcrumb
├── 3. Inputs
│   ├── Button
│   ├── Input
│   ├── Textarea
│   ├── Label
│   ├── Select
│   ├── Checkbox
│   ├── Radio Group
│   └── Switch
├── 4. Display
│   ├── Badge
│   ├── Status Badge
│   ├── SLA Chip
│   ├── Avatar
│   └── Separator
├── 5. Feedback
│   ├── Alert
│   ├── Toast
│   └── Progress
├── 6. Layout
│   ├── Card
│   ├── KPI Card
│   ├── Tabs
│   └── Accordion
└── 7. Overlays
    ├── Dialog
    ├── Sheet
    ├── Dropdown Menu
    ├── Popover
    └── Tooltip
```

## Key Component: Sidebar Navigation Item ⭐

### Component Structure

**Name**: `Navigation/Sidebar Nav Item`

**Properties**:
1. **Variant** (Boolean - Variant)
   - Default
   - Active

2. **State** (Variant)
   - Default
   - Hover
   - Pressed
   - Disabled

3. **Badge** (Boolean)
   - True (shows badge)
   - False (no badge)

4. **Collapsed** (Boolean)
   - True (icon-only, 64px width)
   - False (full, 256px width)

5. **Icon** (Instance Swap - Lucide Icons)
   - Home
   - Ticket
   - CreditCard
   - Users
   - etc.

6. **Label** (Text)
   - Default: "Tickets"
   - Editable text

7. **Badge Count** (Text)
   - Default: "12"
   - Visible when Badge = True

### Specifications

#### Full Width (Collapsed = False, 256px)

**Container**
- Width: 256px
- Height: 44px (touch-target)
- Padding: 12px (top/bottom), 12px (left/right)
- Gap: 12px (between elements)
- Corner Radius: {radius/lg} = 12px

**Layout**
```
┌─────────────────────────────────────────┐
│ [Icon] [Label................] [Badge]  │
│         (flex-grow)                     │
└─────────────────────────────────────────┘
```

**Icon**
- Size: 20×20px
- Color: Current text color
- Source: Lucide icons

**Label**
- Font: {typography/font/family}
- Size: {typography/size/body} = 16px
- Weight: {typography/weight/medium} = 500
- Color: Inherits from container

**Badge**
- Height: 20px
- Min Width: 20px
- Padding: 0px (vertical), 8px (horizontal)
- Corner Radius: {radius/md} = 8px
- Background: {color/muted}
- Foreground: {color/muted/foreground}
- Font Size: {typography/size/caption} = 12px
- Font Weight: {typography/weight/medium} = 500
- Text: "12" (editable)
- Alignment: Center

**Chevron (Active only, no badge)**
- Size: 16×16px
- Icon: lucide/chevron-right
- Color: Current text color

#### Collapsed Width (Collapsed = True, 64px)

**Container**
- Width: 64px
- Height: 44px
- Padding: 12px
- Justify: Center
- Corner Radius: {radius/lg} = 12px

**Layout**
```
┌──────────┐
│  [Icon]  │
└──────────┘
```

**Icon**
- Size: 20×20px
- Color: Current text color
- Centered

**Badge Indicator (when Badge = True)**
- Size: 8×8px
- Position: Absolute (top: 4px, right: 4px)
- Shape: Circle
- Fill: {color/destructive}
- No border

### States & Variants

#### Variant: Default, State: Default
- Background: Transparent
- Text Color: {color/sidebar/foreground}
- Icon Color: {color/sidebar/foreground}

#### Variant: Default, State: Hover
- Background: {color/sidebar/accent}
- Text Color: {color/sidebar/accent/foreground}
- Transition: 200ms ease

#### Variant: Default, State: Pressed
- Background: {color/sidebar/accent}
- Text Color: {color/sidebar/accent/foreground}
- Scale: 0.98

#### Variant: Default, State: Disabled
- Background: Transparent
- Text Color: {color/text/disabled}
- Opacity: 0.5
- Cursor: not-allowed

#### Variant: Active, State: Default
- Background: {color/sidebar/primary}
- Text Color: {color/sidebar/primary/foreground}
- Icon Color: {color/sidebar/primary/foreground}

#### Variant: Active, State: Hover
- Background: {color/sidebar/primary} @ 90% opacity
- Text Color: {color/sidebar/primary/foreground}

#### Variant: Active, State: Pressed
- Background: {color/sidebar/primary} @ 90% opacity
- Text Color: {color/sidebar/primary/foreground}
- Scale: 0.98

#### Variant: Active, State: Disabled
(Not typically used)

### Accessibility Annotations

Add these as Figma annotations:

1. **Focus Ring**
   - Width: 2px
   - Offset: 2px
   - Color: {color/sidebar/ring}
   - Note: "Visible on keyboard focus"

2. **Touch Target**
   - Size: 44×44px minimum
   - Note: "WCAG 2.2 AA compliant"

3. **Color Contrast**
   - Text: 4.5:1 minimum
   - Large text: 3:1 minimum
   - Note: "Meets WCAG AA standards"

## Complete Component Checklist

### Buttons
- [ ] Variant: Default, Secondary, Destructive, Outline, Ghost, Link
- [ ] Size: Small (32px), Default (36px), Large (40px), Icon (36px)
- [ ] State: Default, Hover, Pressed, Disabled, Loading

### Input
- [ ] State: Default, Hover, Focus, Error, Disabled
- [ ] With Icon (left/right)
- [ ] Sizes: Default, Small, Large

### Textarea
- [ ] State: Default, Hover, Focus, Error, Disabled
- [ ] Resizable variants

### Select
- [ ] State: Default, Hover, Focus, Disabled
- [ ] With options dropdown

### Checkbox
- [ ] State: Unchecked, Checked, Indeterminate, Disabled
- [ ] Focus ring

### Radio Group
- [ ] State: Unselected, Selected, Disabled
- [ ] Focus ring

### Switch
- [ ] State: Off, On, Disabled
- [ ] Focus ring

### Badge
- [ ] Variant: Default, Secondary, Destructive, Outline
- [ ] With/without icon

### Status Badge
- [ ] Status: Open, In Progress, Resolved, Closed, Pending
- [ ] With icons

### SLA Chip
- [ ] State: Safe (green), Warning (yellow), Breached (red)
- [ ] With countdown timer

### Card
- [ ] Basic card
- [ ] With header
- [ ] With footer
- [ ] With actions

### KPI Card
- [ ] With trend indicator (up/down/neutral)
- [ ] With icon
- [ ] Loading state

### Alert
- [ ] Variant: Info, Success, Warning, Error
- [ ] With icon
- [ ] With/without title

### Progress
- [ ] Determinate
- [ ] Indeterminate
- [ ] Colors: Primary, Success, Warning, Error

### Avatar
- [ ] With image
- [ ] With initials fallback
- [ ] With icon fallback
- [ ] Sizes: Small, Medium, Large

### Tabs
- [ ] Horizontal
- [ ] With active state
- [ ] With disabled state

### Separator
- [ ] Horizontal
- [ ] Vertical

### Dialog/Sheet
- [ ] Open/Closed states
- [ ] With header, content, footer
- [ ] Mobile overlay

### Dropdown Menu
- [ ] Open/Closed states
- [ ] Menu items
- [ ] With icons
- [ ] With separators

### Tooltip
- [ ] Top, Right, Bottom, Left positions
- [ ] Light/Dark variants

## Grid System

### Desktop (1440px)
- Columns: 12
- Gutter: 24px
- Margin: 80px

### Tablet (1024px)
- Columns: 8
- Gutter: 20px
- Margin: 40px

### Mobile (375px)
- Columns: 4
- Gutter: 16px
- Margin: 20px

## Figma Best Practices

### Auto Layout
- Use Auto Layout for all components
- Set appropriate padding and spacing
- Use "Hug contents" for flexible components
- Use "Fill container" for responsive components

### Variants
- Organize by: Variant → State → Size
- Use boolean properties for toggles (Badge, Collapsed)
- Use instance swap for icons
- Name consistently across components

### Components
- Create base components
- Use component sets for variants
- Document properties in description
- Add example usage frames

### Naming Convention
```
Component-Name/Variant/State/Size
Examples:
- Button/Default/Default/Medium
- Navigation/Sidebar Nav Item/Active/Hover
- Badge/Status/Open
```

### Documentation
- Create cover page with design system overview
- Include token reference sheet
- Add usage examples for each component
- Document accessibility requirements
- Include responsive breakpoints

## Delivery

### Figma File Structure
```
📄 ISP Platform UI Kit
├── 🎨 Cover
├── 📐 Foundation
│   ├── Colors (Light)
│   ├── Colors (Dark)
│   ├── Typography
│   ├── Spacing
│   ├── Radius
│   └── Shadows
├── 🧩 Components
│   ├── Navigation ⭐
│   ├── Inputs
│   ├── Display
│   ├── Feedback
│   ├── Layout
│   └── Overlays
├── 📱 Examples
│   ├── Dashboard Desktop
│   ├── Dashboard Tablet
│   ├── Dashboard Mobile
│   ├── Sidebar States
│   └── Component Combinations
└── 📚 Guidelines
    ├── Accessibility
    ├── Responsive Design
    └── Usage Examples
```

### Checklist Before Delivery
- [ ] All color variables defined
- [ ] All typography variables defined
- [ ] All spacing variables defined
- [ ] All components have variants
- [ ] All states are documented
- [ ] Accessibility annotations added
- [ ] Focus states visible
- [ ] Touch targets minimum 44×44
- [ ] Examples included
- [ ] Dark mode versions created
- [ ] Responsive versions shown
- [ ] Component descriptions added
- [ ] Usage guidelines included

---

**Created**: October 16, 2025  
**Version**: 1.0.0  
**For**: ISP Platform Design System
