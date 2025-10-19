'use client'

import { useState } from 'react';
import { AppSidebar } from './components/layout/app-sidebar';
import { TopBar } from './components/layout/top-bar';
import { Breadcrumbs } from './components/layout/breadcrumbs';
import { SystemAdminDashboard } from './components/dashboards/system-admin-dashboard';
import { SuperAdminDashboard } from './components/dashboards/super-admin-dashboard';
import { BillingOfficerDashboard } from './components/dashboards/billing-officer-dashboard';
import { FieldTechDashboard } from './components/dashboards/field-tech-dashboard';
import { CustomerPortalDashboard } from './components/dashboards/customer-portal-dashboard';
import { ITStaffDashboard } from './components/dashboards/it-staff-dashboard';
import { CustomerSupportDashboard } from './components/dashboards/customer-support-dashboard';
import { TicketsTable } from './components/tickets/tickets-table';
import { TicketDetailSheet } from './components/tickets/ticket-detail-sheet';
import { CreateTicketDialog } from './components/tickets/create-ticket-dialog';
import { CustomersTable } from './components/customers/customers-table';
import type { UserRole, Ticket } from './lib/types';
import { Toaster } from './components/ui/sonner';

function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('system_admin');
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Closed by default on mobile
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [ticketSheetOpen, setTicketSheetOpen] = useState(false);
  const [createTicketOpen, setCreateTicketOpen] = useState(false);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
  };

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setTicketSheetOpen(true);
  };

  const getBreadcrumbs = () => {
    const pathParts = currentPath.split('/').filter(Boolean);
    const breadcrumbs = [
      { label: 'Dashboard', href: '/dashboard' }
    ];

    if (pathParts.length > 1) {
      pathParts.slice(1).forEach((part, index) => {
        breadcrumbs.push({
          label: part.charAt(0).toUpperCase() + part.slice(1),
          href: index === pathParts.length - 2 ? undefined : `/${pathParts.slice(0, index + 2).join('/')}`
        });
      });
    }

    return breadcrumbs;
  };

  const getPageTitle = () => {
    if (currentPath === '/dashboard') {
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
    const pathParts = currentPath.split('/').filter(Boolean);
    return pathParts[pathParts.length - 1].charAt(0).toUpperCase() + 
           pathParts[pathParts.length - 1].slice(1);
  };

  const renderContent = () => {
    // Dashboard routes
    if (currentPath === '/dashboard') {
      switch (currentRole) {
        case 'super_admin':
          return <SuperAdminDashboard />;
        case 'system_admin':
          return <SystemAdminDashboard />;
        case 'customer_support':
          return <CustomerSupportDashboard />;
        case 'billing_officer':
          return <BillingOfficerDashboard />;
        case 'it_staff':
          return <ITStaffDashboard />;
        case 'field_technician':
          return <FieldTechDashboard />;
        case 'customer':
          return <CustomerPortalDashboard />;
        default:
          return <SystemAdminDashboard />;
      }
    }

    // Tickets route
    if (currentPath === '/tickets') {
      return (
        <div className="p-8">
          <TicketsTable 
            onRowClick={handleTicketClick}
            onCreateTicket={() => setCreateTicketOpen(true)}
          />
        </div>
      );
    }

    // Customers route
    if (currentPath === '/customers') {
      return (
        <div className="p-8">
          <CustomersTable 
            onRowClick={(customer) => console.log('View customer:', customer)}
            onCreateCustomer={() => console.log('Create customer')}
          />
        </div>
      );
    }

    // Default placeholder for other routes
    return (
      <div className="p-8">
        <div className="bg-surface border border-border rounded-lg p-12 text-center shadow-soft">
          <h3 className="mb-2">Coming Soon</h3>
          <p className="text-muted-foreground">
            This section is under development
          </p>
        </div>
      </div>
    );
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
      {/* Sidebar - hidden on mobile by default */}
      <div className={`${sidebarCollapsed ? 'hidden lg:block' : 'hidden lg:block'}`}>
        <AppSidebar
          currentRole={currentRole}
          currentPath={currentPath}
          isCollapsed={false}
          onNavigate={handleNavigate}
        />
      </div>

      {/* Mobile sidebar overlay */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
      <div className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 lg:hidden ${
        !sidebarCollapsed ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <AppSidebar
          currentRole={currentRole}
          currentPath={currentPath}
          isCollapsed={false}
          onNavigate={(path) => {
            handleNavigate(path);
            setSidebarCollapsed(true);
          }}
        />
      </div>

      <div className="lg:ml-64 transition-all duration-300">
        <TopBar
          userName={getUserName()}
          tenantName={getTenantName()}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <div className="p-4 md:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <Breadcrumbs items={getBreadcrumbs()} onNavigate={handleNavigate} />
            <div className="flex items-center justify-between mt-4">
              <h1>{getPageTitle()}</h1>
              
              {/* Role Switcher (Demo purposes) */}
              <select
                value={currentRole}
                onChange={(e) => {
                  setCurrentRole(e.target.value as UserRole);
                  setCurrentPath('/dashboard');
                }}
                className="px-3 py-2 border border-border rounded-lg bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="super_admin">Super Admin</option>
                <option value="system_admin">System Admin</option>
                <option value="customer_support">Customer Support</option>
                <option value="billing_officer">Billing Officer</option>
                <option value="it_staff">IT Staff</option>
                <option value="field_technician">Field Technician</option>
                <option value="customer">Customer</option>
              </select>
            </div>
          </div>

          {/* Main Content */}
          {renderContent()}
        </div>
      </div>

      {/* Ticket Detail Sheet */}
      <TicketDetailSheet
        ticket={selectedTicket}
        open={ticketSheetOpen}
        onOpenChange={setTicketSheetOpen}
      />

      {/* Create Ticket Dialog */}
      <CreateTicketDialog
        open={createTicketOpen}
        onOpenChange={setCreateTicketOpen}
        onSubmit={(ticket) => console.log('New ticket:', ticket)}
      />

      <Toaster />
    </div>
  );
}

export default App;
