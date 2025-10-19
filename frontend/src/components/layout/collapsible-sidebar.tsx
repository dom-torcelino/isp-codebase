import { useState } from 'react';
import {
  LayoutDashboard,
  Ticket,
  CreditCard,
  Users,
  UserCog,
  Wrench,
  BarChart3,
  Plug,
  Settings,
  ChevronLeft,
  ChevronRight,
  Palette,
} from 'lucide-react';
import { cn } from '../ui/utils';
import { UserRole } from '../../lib/types';
import { SidebarNavItem } from './sidebar-nav-item';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
  badge?: number;
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['super_admin', 'system_admin', 'customer_support', 'billing_officer', 'it_staff', 'field_technician', 'customer']
  },
  {
    title: 'Tickets',
    href: '/tickets',
    icon: Ticket,
    roles: ['system_admin', 'customer_support', 'it_staff', 'field_technician', 'customer'],
    badge: 12 // Example badge count
  },
  {
    title: 'Billing',
    href: '/billing',
    icon: CreditCard,
    roles: ['system_admin', 'billing_officer']
  },
  {
    title: 'Customers',
    href: '/customers',
    icon: Users,
    roles: ['system_admin', 'customer_support', 'billing_officer']
  },
  {
    title: 'Users',
    href: '/users',
    icon: UserCog,
    roles: ['super_admin', 'system_admin']
  },
  {
    title: 'Technicians',
    href: '/technicians',
    icon: Wrench,
    roles: ['system_admin']
  },
  {
    title: 'Tenants',
    href: '/tenants',
    icon: Users,
    roles: ['super_admin']
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: BarChart3,
    roles: ['super_admin', 'system_admin']
  },
  {
    title: 'Integrations',
    href: '/integrations',
    icon: Plug,
    roles: ['system_admin']
  },
  {
    title: 'UI Kit',
    href: '/ui-kit',
    icon: Palette,
    roles: ['super_admin', 'system_admin', 'customer_support', 'billing_officer', 'it_staff', 'field_technician', 'customer']
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['super_admin', 'system_admin', 'customer']
  }
];

interface CollapsibleSidebarProps {
  currentRole: UserRole;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function CollapsibleSidebar({ currentRole, currentPath, onNavigate }: CollapsibleSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const filteredItems = navItems.filter(item => item.roles.includes(currentRole));

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-30 flex flex-col',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border flex-shrink-0">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground">IS</span>
            </div>
            <span className="text-sidebar-foreground">ISP Platform</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
            <span className="text-primary-foreground">IS</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
        {filteredItems.map((item) => {
          const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');
          
          return (
            <SidebarNavItem
              key={item.href}
              title={item.title}
              icon={item.icon}
              isActive={isActive}
              isCollapsed={isCollapsed}
              badge={item.badge}
              onClick={() => onNavigate(item.href)}
            />
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-sidebar-border flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            'w-full justify-start',
            isCollapsed && 'justify-center px-0'
          )}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 mr-2" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
