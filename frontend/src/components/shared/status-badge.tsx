import { Badge } from '../ui/badge';
import type { TicketStatus, TicketPriority, InvoiceStatus } from '../../lib/types';

interface StatusBadgeProps {
  status: TicketStatus | InvoiceStatus | string;
  type?: 'ticket' | 'invoice' | 'general';
}

export function StatusBadge({ status, type = 'general' }: StatusBadgeProps) {
  const getTicketStatusVariant = (status: string) => {
    switch (status) {
      case 'open':
        return 'default';
      case 'in_progress':
        return 'secondary';
      case 'onsite':
        return 'secondary';
      case 'resolved':
        return 'outline';
      case 'closed':
        return 'outline';
      case 'escalated':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getInvoiceStatusVariant = (status: string) => {
    switch (status) {
      case 'draft':
        return 'outline';
      case 'sent':
        return 'secondary';
      case 'paid':
        return 'outline';
      case 'overdue':
        return 'destructive';
      case 'disputed':
        return 'destructive';
      case 'cancelled':
        return 'outline';
      default:
        return 'default';
    }
  };

  const formatLabel = (status: string) => {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const variant = type === 'ticket' 
    ? getTicketStatusVariant(status)
    : type === 'invoice'
    ? getInvoiceStatusVariant(status)
    : 'default';

  return (
    <Badge variant={variant as any}>
      {formatLabel(status)}
    </Badge>
  );
}

interface PriorityBadgeProps {
  priority: TicketPriority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const getVariant = () => {
    switch (priority) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <Badge variant={getVariant() as any}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
}
