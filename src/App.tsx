import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import Dashboard from "@/pages/Dashboard";
import UploadDocument from "@/pages/UploadDocument";
import DocumentLibrary from "@/pages/DocumentLibrary";
import QuestionGeneration from "@/pages/QuestionGeneration";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";
import Auth from "@/pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Authentication route */}
          <Route path="/auth" element={<Auth />} />
          
          {/* Protected routes inside main layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<UploadDocument />} />
            <Route path="/library" element={<DocumentLibrary />} />
            <Route path="/questions" element={<QuestionGeneration />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
