import type { Tenant, Customer, Ticket, Invoice, Payment, User } from './types';

export const mockTenants: Tenant[] = [
  {
    id: 'tenant-1',
    name: 'Metro Manila Fiber',
    status: 'active',
    admin: 'Juan dela Cruz',
    customers: 1250,
    createdAt: '2024-01-15',
    plan: 'Enterprise'
  },
  {
    id: 'tenant-2',
    name: 'Cebu Broadband Co.',
    status: 'active',
    admin: 'Maria Santos',
    customers: 890,
    createdAt: '2024-03-20',
    plan: 'Professional'
  },
  {
    id: 'tenant-3',
    name: 'Davao Connect',
    status: 'suspended',
    admin: 'Pedro Reyes',
    customers: 450,
    createdAt: '2024-06-10',
    plan: 'Starter'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Roberto Martinez',
    email: 'roberto.m@email.com',
    phone: '+63 917 123 4567',
    address: '123 Rizal St, Makati City',
    plan: 'Fiber 100 Mbps',
    status: 'active',
    balance: 0,
    tenantId: 'tenant-1'
  },
  {
    id: 'cust-2',
    name: 'Ana Reyes',
    email: 'ana.reyes@email.com',
    phone: '+63 918 234 5678',
    address: '456 Quezon Ave, QC',
    plan: 'Fiber 50 Mbps',
    status: 'active',
    balance: 2500,
    tenantId: 'tenant-1'
  },
  {
    id: 'cust-3',
    name: 'Carlos Bautista',
    email: 'carlos.b@email.com',
    phone: '+63 919 345 6789',
    address: '789 EDSA, Pasig City',
    plan: 'Fiber 200 Mbps',
    status: 'suspended',
    balance: 7500,
    tenantId: 'tenant-1'
  },
  {
    id: 'cust-4',
    name: 'Linda Garcia',
    email: 'linda.g@email.com',
    phone: '+63 920 456 7890',
    address: '321 Taft Ave, Manila',
    plan: 'Fiber 100 Mbps',
    status: 'active',
    balance: 1200,
    tenantId: 'tenant-1'
  }
];

export const mockTickets: Ticket[] = [
  {
    id: 'TK-2025-001',
    customerId: 'cust-1',
    customerName: 'Roberto Martinez',
    category: 'repair',
    priority: 'high',
    status: 'open',
    assigneeId: 'tech-1',
    assigneeName: 'John Tech',
    subject: 'No internet connection',
    description: 'Customer reports complete loss of internet connectivity since this morning.',
    createdAt: '2025-10-16T08:30:00Z',
    updatedAt: '2025-10-16T08:30:00Z',
    slaRespondDue: '2025-10-16T10:30:00Z',
    slaOnsiteDue: '2025-10-16T16:30:00Z',
    slaResolveDue: '2025-10-17T08:30:00Z',
    slaBreach: false,
    tenantId: 'tenant-1'
  },
  {
    id: 'TK-2025-002',
    customerId: 'cust-2',
    customerName: 'Ana Reyes',
    category: 'installation',
    priority: 'medium',
    status: 'in_progress',
    assigneeId: 'tech-2',
    assigneeName: 'Mike Installer',
    subject: 'New fiber installation',
    description: 'Schedule installation for Fiber 50 Mbps plan.',
    createdAt: '2025-10-15T14:00:00Z',
    updatedAt: '2025-10-16T09:00:00Z',
    slaRespondDue: '2025-10-15T16:00:00Z',
    slaOnsiteDue: '2025-10-18T14:00:00Z',
    slaResolveDue: '2025-10-20T14:00:00Z',
    slaBreach: false,
    tenantId: 'tenant-1'
  },
  {
    id: 'TK-2025-003',
    customerId: 'cust-3',
    customerName: 'Carlos Bautista',
    category: 'billing',
    priority: 'critical',
    status: 'escalated',
    assigneeId: 'support-1',
    assigneeName: 'Jane Support',
    subject: 'Billing dispute - overcharged',
    description: 'Customer claims to be charged for services not rendered.',
    createdAt: '2025-10-14T10:00:00Z',
    updatedAt: '2025-10-16T07:00:00Z',
    slaRespondDue: '2025-10-14T11:00:00Z',
    slaOnsiteDue: '2025-10-14T14:00:00Z',
    slaResolveDue: '2025-10-15T10:00:00Z',
    slaBreach: true,
    tenantId: 'tenant-1'
  },
  {
    id: 'TK-2025-004',
    customerId: 'cust-4',
    customerName: 'Linda Garcia',
    category: 'it_support',
    priority: 'low',
    status: 'open',
    subject: 'Router configuration help',
    description: 'Customer needs assistance configuring WiFi settings.',
    createdAt: '2025-10-16T07:00:00Z',
    updatedAt: '2025-10-16T07:00:00Z',
    slaRespondDue: '2025-10-16T15:00:00Z',
    slaResolveDue: '2025-10-18T07:00:00Z',
    slaBreach: false,
    tenantId: 'tenant-1'
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: 'INV-2025-10-001',
    customerId: 'cust-1',
    customerName: 'Roberto Martinez',
    amount: 1500,
    dueDate: '2025-10-25',
    status: 'sent',
    issuedDate: '2025-10-01',
    tenantId: 'tenant-1'
  },
  {
    id: 'INV-2025-10-002',
    customerId: 'cust-2',
    customerName: 'Ana Reyes',
    amount: 2500,
    dueDate: '2025-10-15',
    status: 'overdue',
    issuedDate: '2025-10-01',
    tenantId: 'tenant-1'
  },
  {
    id: 'INV-2025-10-003',
    customerId: 'cust-3',
    customerName: 'Carlos Bautista',
    amount: 7500,
    dueDate: '2025-10-05',
    status: 'disputed',
    issuedDate: '2025-09-25',
    tenantId: 'tenant-1'
  },
  {
    id: 'INV-2025-09-004',
    customerId: 'cust-4',
    customerName: 'Linda Garcia',
    amount: 1200,
    dueDate: '2025-09-25',
    status: 'paid',
    issuedDate: '2025-09-01',
    paidDate: '2025-09-20',
    tenantId: 'tenant-1'
  }
];

export const mockPayments: Payment[] = [
  {
    id: 'PAY-001',
    invoiceId: 'INV-2025-09-004',
    customerId: 'cust-4',
    customerName: 'Linda Garcia',
    amount: 1200,
    method: 'gcash',
    date: '2025-09-20',
    reference: 'GC20250920001',
    tenantId: 'tenant-1'
  },
  {
    id: 'PAY-002',
    invoiceId: 'INV-2025-09-001',
    customerId: 'cust-1',
    customerName: 'Roberto Martinez',
    amount: 1500,
    method: 'bank_transfer',
    date: '2025-09-15',
    reference: 'BT20250915001',
    tenantId: 'tenant-1'
  }
];

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'super_admin'
  },
  {
    id: 'user-2',
    name: 'System Admin',
    email: 'sysadmin@metro-fiber.com',
    role: 'system_admin',
    tenantId: 'tenant-1'
  },
  {
    id: 'user-3',
    name: 'Support Agent',
    email: 'support@metro-fiber.com',
    role: 'customer_support',
    tenantId: 'tenant-1'
  }
];
