
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({ title, value, icon, trend, className }: StatsCardProps) {
  return (
    <div className={cn(
      "bg-white dark:bg-card p-6 rounded-lg shadow-sm border border-border flex flex-col space-y-4",
      className
    )}>
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="text-foreground/70">{icon}</div>
      </div>
      <div className="flex flex-col space-y-1">
        <p className="text-2xl font-bold">{value}</p>
        {trend && (
          <div className="flex items-center space-x-1.5">
            <span className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              {trend.isPositive ? "+" : "-"}{trend.value}%
            </span>
            <span className="text-xs text-muted-foreground">from last month</span>
          </div>
        )}
      </div>
    </div>
  );
}
