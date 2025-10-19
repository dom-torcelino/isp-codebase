import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <Card className="shadow-soft">
      <CardContent className="py-16 text-center">
        {Icon && (
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Icon className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
        )}
        <h3 className="mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
        {action && (
          <Button onClick={action.onClick}>{action.label}</Button>
        )}
      </CardContent>
    </Card>
  );
}

interface DataUnavailableProps {
  onRetry?: () => void;
}

export function DataUnavailable({ onRetry }: DataUnavailableProps) {
  return (
    <Card className="shadow-soft border-destructive/20">
      <CardContent className="py-12 text-center">
        <h3 className="mb-2">Data Unavailable</h3>
        <p className="text-muted-foreground mb-6">
          Unable to load data. Please try again.
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline">Retry</Button>
        )}
      </CardContent>
    </Card>
  );
}
