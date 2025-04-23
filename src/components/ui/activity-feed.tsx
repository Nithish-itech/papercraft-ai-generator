
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: ReactNode;
  type: 'upload' | 'generate' | 'edit' | 'delete';
}

interface ActivityFeedProps {
  items: ActivityItem[];
  className?: string;
}

export function ActivityFeed({ items, className }: ActivityFeedProps) {
  return (
    <div className={cn("bg-white dark:bg-card rounded-lg shadow-sm border border-border p-6", className)}>
      <h3 className="text-lg font-headers font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start space-x-4">
            <div className={cn(
              "flex-shrink-0 p-2 rounded-full",
              {
                'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300': item.type === 'upload',
                'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300': item.type === 'generate',
                'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300': item.type === 'edit',
                'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300': item.type === 'delete',
              }
            )}>
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
            </div>
            <div className="text-xs text-muted-foreground">{item.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
