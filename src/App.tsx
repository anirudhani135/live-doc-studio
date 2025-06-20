
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";
import { AppSidebar } from "./components/AppSidebar";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import Landing from "./pages/Landing";
import { PageTransition } from "./components/ui/page-transition";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./components/auth/AuthPage";
import { errorHandler } from "./lib/errorHandler";
import React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    errorHandler.logError(error, 'react_error_boundary', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-muted-foreground mb-4">
              We've encountered an unexpected error. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const isAuthPage = location.pathname === "/auth";

  if (isLandingPage) {
    return <PageTransition>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute>
                <Projects />
              </ProtectedRoute>} />
          <Route path="/documents" element={<ProtectedRoute>
                <Documents />
              </ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute>
                <Settings />
              </ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>;
  }

  if (isAuthPage) {
    return <div className="min-h-screen flex items-center justify-center bg-background">
        <AuthPage />
      </div>;
  }

  return <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-col min-h-screen">
            <header className="w-full flex items-center p-2 border-b">
              
              
            </header>
            <main className="flex-1">
              <PageTransition>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/dashboard" element={<ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>} />
                  <Route path="/projects" element={<ProtectedRoute>
                        <Projects />
                      </ProtectedRoute>} />
                  <Route path="/documents" element={<ProtectedRoute>
                        <Documents />
                      </ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </PageTransition>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>;
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
