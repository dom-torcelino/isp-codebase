import { ChevronRight } from 'lucide-react';
import { cn } from '../ui/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (href: string) => void;
}

export function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-muted-foreground" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={index} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <button
                onClick={() => onNavigate?.(item.href!)}
                className="hover:text-foreground transition-colors focus:outline-none focus:underline"
              >
                {item.label}
              </button>
            ) : (
              <span className={cn(isLast && 'text-foreground')}>{item.label}</span>
            )}
            {!isLast && <ChevronRight className="w-4 h-4" />}
          </div>
        );
      })}
    </nav>
  );
}
