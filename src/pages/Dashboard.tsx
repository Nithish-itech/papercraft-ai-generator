
import { File, Upload, Check, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/ui/stats-card";
import { ActivityFeed } from "@/components/ui/activity-feed";
import { Link } from "react-router-dom";

// Sample activity data
const activityItems = [
  {
    id: "1",
    title: "Chemistry Textbook uploaded",
    description: "You uploaded a new document to the library",
    time: "2 hours ago",
    icon: <Upload className="h-4 w-4" />,
    type: "upload" as const,
  },
  {
    id: "2",
    title: "Physics Final Question Paper",
    description: "Question paper generated successfully",
    time: "4 hours ago",
    icon: <Check className="h-4 w-4" />,
    type: "generate" as const,
  },
  {
    id: "3",
    title: "Biology Lab Manual",
    description: "You uploaded a new document to the library",
    time: "Yesterday",
    icon: <Upload className="h-4 w-4" />,
    type: "upload" as const,
  },
  {
    id: "4",
    title: "Computer Science Midterm",
    description: "Question paper generated successfully",
    time: "2 days ago",
    icon: <Check className="h-4 w-4" />,
    type: "generate" as const,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Dashboard</span>
      </div>

      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-headers text-2xl md:text-3xl font-bold tracking-tight">Welcome back!</h1>
          <p className="text-muted-foreground mt-1">
            Here's a summary of your RAG question paper generation system.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" asChild>
            <Link to="/library">
              <File className="mr-2 h-4 w-4" />
              View Library
            </Link>
          </Button>
          <Button asChild>
            <Link to="/upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Documents"
          value="124"
          icon={<File className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Papers Generated"
          value="38"
          icon={<Check className="h-5 w-5" />}
          trend={{ value: 24, isPositive: true }}
        />
        <StatsCard
          title="Uploads This Month"
          value="42"
          icon={<Upload className="h-5 w-5" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Storage Used"
          value="1.2 GB"
          icon={<PieChart className="h-5 w-5" />}
          trend={{ value: 3, isPositive: false }}
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity feed */}
        <div className="lg:col-span-2">
          <ActivityFeed items={activityItems} />
        </div>

        {/* Quick actions panel */}
        <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-border p-6">
          <h3 className="text-lg font-headers font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button variant="default" className="w-full justify-start" asChild>
              <Link to="/upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload New Document
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/questions">
                <File className="mr-2 h-4 w-4" />
                Generate New Paper
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/library">
                <PieChart className="mr-2 h-4 w-4" />
                View Analytics
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
