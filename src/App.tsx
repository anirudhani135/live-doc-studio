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
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import { AppSidebar } from "./components/AppSidebar";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import Landing from "./pages/Landing";
import { PageTransition } from "./components/ui/page-transition";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./components/auth/AuthPage";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const isAuthPage = location.pathname === "/auth";

  if (isLandingPage) {
    return (
      <PageTransition>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/projects" 
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/documents" 
            element={
              <ProtectedRoute>
                <Documents />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/team" 
            element={
              <ProtectedRoute>
                <Team />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    );
  }

  if (isAuthPage) {
    // Render AuthPage without sidebar or main layout
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <AuthPage />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-col min-h-screen">
            <header className="w-full flex items-center p-2 border-b">
              <SidebarTrigger />
              <span className="text-xl font-bold ml-2 tracking-tight text-primary">
                Livedoc
              </span>
            </header>
            <main className="flex-1">
              <PageTransition>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/projects" 
                    element={
                      <ProtectedRoute>
                        <Projects />
                      </ProtectedRoute>
                    }
                  />
                  <Route 
                    path="/documents" 
                    element={
                      <ProtectedRoute>
                        <Documents />
                      </ProtectedRoute>
                    }
                  />
                  <Route 
                    path="/team" 
                    element={
                      <ProtectedRoute>
                        <Team />
                      </ProtectedRoute>
                    }
                  />
                  <Route 
                    path="/settings" 
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </PageTransition>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

const App = () => (
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
);

export default App;
