'use client';

import { useState } from 'react';
import { CollapsibleSidebar } from './collapsible-sidebar';
import { TopBar } from './top-bar';
import { Breadcrumbs } from './breadcrumbs';
import type { UserRole } from '@/lib/types';
import { Toaster } from '../ui/sonner';

interface AppLayoutProps {
  children: React.ReactNode;
  currentRole: UserRole;
  currentPath: string;
  onNavigate: (path: string) => void;
  onRoleChange?: (role: UserRole) => void;
  hideRoleSwitcher?: boolean;
}

export function AppLayout({
  children,
  currentRole,
  currentPath,
  onNavigate,
  onRoleChange,
  hideRoleSwitcher = false,
}: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getBreadcrumbs = () => {
    const pathParts = currentPath.split('/').filter(Boolean);
    
    if (pathParts.length === 0 || pathParts[0] === 'dashboard') {
      return [{ label: 'Dashboard', href: '/dashboard' }];
    }

    const breadcrumbs = [
      { label: 'Dashboard', href: '/dashboard' }
    ];

    pathParts.forEach((part, index) => {
      const label = part
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        label,
        href: index === pathParts.length - 1 ? undefined : `/${pathParts.slice(0, index + 1).join('/')}`
      });
    });

    return breadcrumbs;
  };

  const getPageTitle = () => {
    if (currentPath === '/dashboard' || currentPath === '/') {
      const roleTitles: Record<UserRole, string> = {
        super_admin: 'Platform Dashboard',
        system_admin: 'Tenant Dashboard',
        customer_support: 'Support Dashboard',
        billing_officer: 'Billing Dashboard',
        it_staff: 'IT Dashboard',
        field_technician: 'My Jobs',
        customer: 'My Account'
      };
      return roleTitles[currentRole];
    }

    if (currentPath === '/ui-kit') {
      return 'UI Kit';
    }

    const pathParts = currentPath.split('/').filter(Boolean);
    return pathParts[pathParts.length - 1]
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getUserName = () => {
    const roleNames: Record<UserRole, string> = {
      super_admin: 'Super Admin',
      system_admin: 'System Admin',
      customer_support: 'Support Agent',
      billing_officer: 'Billing Officer',
      it_staff: 'IT Staff',
      field_technician: 'Field Tech',
      customer: 'Customer'
    };
    return roleNames[currentRole];
  };

  const getTenantName = () => {
    if (currentRole === 'super_admin') return undefined;
    return 'Metro Manila Fiber';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <CollapsibleSidebar
          currentRole={currentRole}
          currentPath={currentPath}
          onNavigate={onNavigate}
        />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:hidden',
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="w-64">
          <CollapsibleSidebar
            currentRole={currentRole}
            currentPath={currentPath}
            onNavigate={(path) => {
              onNavigate(path);
              setMobileMenuOpen(false);
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-16 transition-all duration-300">
        <TopBar
          userName={getUserName()}
          tenantName={getTenantName()}
          onToggleSidebar={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        <div className="p-4 md:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <Breadcrumbs items={getBreadcrumbs()} onNavigate={onNavigate} />
            <div className="flex items-center justify-between mt-4">
              <h1>{getPageTitle()}</h1>
              
              {/* Role Switcher (Demo purposes) */}
              {!hideRoleSwitcher && onRoleChange && (
                <select
                  value={currentRole}
                  onChange={(e) => {
                    onRoleChange(e.target.value as UserRole);
                  }}
                  className="px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring caption"
                  aria-label="Switch user role (demo)"
                >
                  <option value="super_admin">Super Admin</option>
                  <option value="system_admin">System Admin</option>
                  <option value="customer_support">Customer Support</option>
                  <option value="billing_officer">Billing Officer</option>
                  <option value="it_staff">IT Staff</option>
                  <option value="field_technician">Field Technician</option>
                  <option value="customer">Customer</option>
                </select>
              )}
            </div>
          </div>

          {/* Main Content */}
          {children}
        </div>
      </div>

      <Toaster />
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
