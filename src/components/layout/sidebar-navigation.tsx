
import { cn } from "@/lib/utils";
import {
  Book,
  File,
  FileText,
  Grid2x2,
  Image,
  PieChart,
  Settings,
  Upload,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Navigation items with icons
const navigation = [
  { name: "Dashboard", href: "/", icon: Grid2x2 },
  { name: "Upload Documents", href: "/upload", icon: Upload },
  { name: "Document Library", href: "/library", icon: Book },
  { name: "Question Papers", href: "/questions", icon: FileText },
  { name: "Analytics", href: "/analytics", icon: PieChart },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface SidebarNavigationProps {
  collapsed?: boolean;
  className?: string;
}

export function SidebarNavigation({ collapsed = false, className }: SidebarNavigationProps) {
  const location = useLocation();

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {navigation.map((item) => {
        const isActive = location.pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive
                ? "bg-enterprise-primary text-white"
                : "text-sidebar-foreground hover:bg-muted hover:text-sidebar-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            {!collapsed && <span>{item.name}</span>}
          </Link>
        );
      })}
    </div>
  );
}
