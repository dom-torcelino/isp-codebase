import { Button } from '../ui/button';
import { LucideIcon } from 'lucide-react';

interface QuickAction {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: 'default' | 'secondary' | 'outline';
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <Button
            key={index}
            variant={action.variant || (index === 0 ? 'default' : 'secondary')}
            className="gap-2"
            onClick={action.onClick}
          >
            <Icon className="w-4 h-4" />
            {action.label}
          </Button>
        );
      })}
    </div>
  );
}
