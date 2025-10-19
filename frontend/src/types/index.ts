// ============================================================================
// User & Auth Types
// ============================================================================

export type Role = "user" | "admin" | "super_admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatarUrl?: string;
  tenantId?: string;
}

// ============================================================================
// ISP Platform Types (from existing system)
// ============================================================================

export type UserRole = 
  | 'super_admin'
  | 'system_admin'
  | 'customer_support'
  | 'billing_officer'
  | 'it_staff'
  | 'field_technician'
  | 'customer';

export type TicketStatus = 'open' | 'in_progress' | 'onsite' | 'resolved' | 'closed' | 'escalated';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';
export type TicketCategory = 'installation' | 'repair' | 'transfer' | 'it_support' | 'billing';

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'disputed' | 'cancelled';
export type PaymentMethod = 'cash' | 'bank_transfer' | 'gcash' | 'credit_card';

export type TenantStatus = 'active' | 'suspended' | 'inactive';

export interface Tenant {
  id: string;
  name: string;
  status: TenantStatus;
  admin: string;
  customers: number;
  createdAt: string;
  plan?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  plan: string;
  status: 'active' | 'suspended' | 'cancelled';
  balance: number;
  tenantId: string;
}

export interface Ticket {
  id: string;
  customerId: string;
  customerName: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  assigneeId?: string;
  assigneeName?: string;
  subject: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  slaRespondDue?: string;
  slaOnsiteDue?: string;
  slaResolveDue?: string;
  slaBreach?: boolean;
  tenantId: string;
}

export interface Invoice {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
  issuedDate: string;
  paidDate?: string;
  tenantId: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  customerId: string;
  customerName: string;
  amount: number;
  method: PaymentMethod;
  date: string;
  reference: string;
  tenantId: string;
}

export interface SLAMetric {
  type: 'respond' | 'onsite' | 'resolve';
  dueDate: string;
  breached: boolean;
  warningThreshold: number; // percentage
}

export interface TimelineEvent {
  id: string;
  type: 'status_change' | 'assignment' | 'note' | 'attachment' | 'sla_breach';
  timestamp: string;
  user: string;
  description: string;
  metadata?: Record<string, any>;
}

export interface KPIMetric {
  label: string;
  value: number | string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  format?: 'number' | 'currency' | 'percentage';
}
