import { cn } from '../ui/utils';
import { Badge } from '../ui/badge';
import { ChevronRight } from 'lucide-react';

interface SidebarNavItemProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
  isCollapsed?: boolean;
  badge?: number;
  onClick?: () => void;
}

export function SidebarNavItem({
  title,
  icon: Icon,
  isActive = false,
  isCollapsed = false,
  badge,
  onClick,
}: SidebarNavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
        'hover:bg-sidebar-accent focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2',
        'touch-target', // Min 44x44 for accessibility
        isActive && 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90',
        !isActive && 'text-sidebar-foreground hover:text-sidebar-accent-foreground'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0')} />
      {!isCollapsed && (
        <>
          <span className="flex-1 text-left">{title}</span>
          {badge !== undefined && badge > 0 && (
            <Badge 
              variant="secondary" 
              className="bg-muted text-muted-foreground h-5 px-2 min-w-[20px] flex items-center justify-center"
            >
              {badge}
            </Badge>
          )}
          {isActive && !badge && <ChevronRight className="w-4 h-4 flex-shrink-0" />}
        </>
      )}
      {isCollapsed && badge !== undefined && badge > 0 && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
      )}
    </button>
  );
}
