
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function Auth() {
  // State to track time of day for dynamic gradient
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "afternoon" | "evening" | "night">("morning");

  // Update gradient based on time of day
  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setTimeOfDay("morning");
      } else if (hour >= 12 && hour < 17) {
        setTimeOfDay("afternoon");
      } else if (hour >= 17 && hour < 20) {
        setTimeOfDay("evening");
      } else {
        setTimeOfDay("night");
      }
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000);
    return () => clearInterval(interval);
  }, []);

  // Get gradient based on time of day
  const getGradientClass = () => {
    switch (timeOfDay) {
      case "morning":
        return "bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200";
      case "afternoon":
        return "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400";
      case "evening":
        return "bg-gradient-to-r from-blue-800 via-indigo-600 to-purple-500";
      case "night":
        return "bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900";
      default:
        return "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400";
    }
  };

  return (
    <div className={cn(
      "flex min-h-screen w-full flex-col justify-center animate-gradient-shift",
      getGradientClass()
    )}>
      <div className="container flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-enterprise-primary/85" />
          <div className="relative z-20 flex items-center font-headers text-lg font-medium">
            <BookOpen className="mr-2 h-6 w-6" />
            RAG Question Paper Generator
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                "This platform has transformed how we create assessments, saving time while ensuring high-quality question papers aligned with our curriculum."
              </p>
              <footer className="text-sm">Dr. Emily Johnson, Computer Science Department</footer>
            </blockquote>
          </div>
        </div>
        <div className="p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-headers font-semibold tracking-tight text-white lg:text-enterprise-dark">
                Welcome back
              </h1>
              <p className="text-sm text-white/80 lg:text-muted-foreground">
                Enter your credentials to access your account
              </p>
            </div>
            <div className="grid gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="name@example.com" type="email" autoCapitalize="none" autoComplete="email" autoCorrect="off" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="#" className="text-xs text-enterprise-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" type="password" autoComplete="current-password" />
                </div>
                <Button className="w-full bg-enterprise-primary hover:bg-enterprise-primary/90" asChild>
                  <Link to="/">Sign In</Link>
                </Button>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline">
                    Google
                  </Button>
                  <Button variant="outline">
                    Microsoft
                  </Button>
                </div>
              </div>
            </div>
            <p className="px-8 text-center text-sm text-white/80 lg:text-muted-foreground">
              Don't have an account?{" "}
              <Link to="#" className="underline hover:text-white lg:hover:text-enterprise-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
