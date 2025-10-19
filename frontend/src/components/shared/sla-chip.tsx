import { Badge } from '../ui/badge';
import { Clock, AlertTriangle } from 'lucide-react';
import { cn } from '../ui/utils';

interface SLAChipProps {
  type: 'respond' | 'onsite' | 'resolve';
  dueDate: string;
  breached?: boolean;
  className?: string;
}

export function SLAChip({ type, dueDate, breached, className }: SLAChipProps) {
  const now = new Date();
  const due = new Date(dueDate);
  const hoursUntilDue = (due.getTime() - now.getTime()) / (1000 * 60 * 60);
  
  const isWarning = hoursUntilDue > 0 && hoursUntilDue <= (type === 'respond' ? 2 : 24) * 0.3; // 30% threshold
  const isOverdue = hoursUntilDue <= 0;

  const getVariant = () => {
    if (breached || isOverdue) return 'destructive';
    if (isWarning) return 'warning';
    return 'secondary';
  };

  const getLabel = () => {
    const labels = {
      respond: 'Response',
      onsite: 'Onsite',
      resolve: 'Resolution'
    };
    return labels[type];
  };

  const formatTimeRemaining = () => {
    if (isOverdue) return 'Overdue';
    
    if (hoursUntilDue < 1) {
      const minutes = Math.floor(hoursUntilDue * 60);
      return `${minutes}m`;
    }
    if (hoursUntilDue < 24) {
      return `${Math.floor(hoursUntilDue)}h`;
    }
    const days = Math.floor(hoursUntilDue / 24);
    return `${days}d`;
  };

  return (
    <Badge 
      variant={getVariant() as any}
      className={cn('flex items-center gap-1', className)}
    >
      {breached || isOverdue ? (
        <AlertTriangle className="w-3 h-3" />
      ) : (
        <Clock className="w-3 h-3" />
      )}
      <span>{getLabel()}: {formatTimeRemaining()}</span>
    </Badge>
  );
}

interface SLABadgeProps {
  breached: boolean;
  className?: string;
}

export function SLABadge({ breached, className }: SLABadgeProps) {
  if (!breached) return null;
  
  return (
    <Badge variant="destructive" className={cn('', className)}>
      SLA Breached
    </Badge>
  );
}
