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
  ChevronRight,
} from 'lucide-react';
import { cn } from '../ui/utils';
import { UserRole } from '../../lib/types';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
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
    roles: ['system_admin', 'customer_support', 'it_staff', 'field_technician', 'customer']
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
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['super_admin', 'system_admin', 'customer']
  }
];

interface AppSidebarProps {
  currentRole: UserRole;
  currentPath: string;
  isCollapsed?: boolean;
  onNavigate: (path: string) => void;
}

export function AppSidebar({ currentRole, currentPath, isCollapsed, onNavigate }: AppSidebarProps) {
  const filteredItems = navItems.filter(item => item.roles.includes(currentRole));

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-surface border-r border-border transition-all duration-300 z-30',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white">IS</span>
            </div>
            <span className="text-foreground">ISP Platform</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
            <span className="text-white">IS</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');
          
          return (
            <button
              key={item.href}
              onClick={() => onNavigate(item.href)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                'hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring',
                isActive && 'bg-primary text-primary-foreground hover:bg-primary/90',
                !isActive && 'text-foreground hover:text-foreground'
              )}
            >
              <Icon className={cn('w-5 h-5 flex-shrink-0')} />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.title}</span>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
