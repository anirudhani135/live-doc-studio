
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Folder,
  LifeBuoy,
  Settings,
  FileCode,
  BarChart2,
  Bug,
  Box,
  Ticket,
  LayoutTemplate,
  Sun,
  LogOut,
  FileText,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "New Project", url: "/projects", icon: PlusCircle },
  { title: "Documents", url: "/documents", icon: Folder },
  { title: "Team", url: "/team", icon: LifeBuoy },
  { title: "Settings", url: "/settings", icon: Settings },
];

const aiToolItems = [
  { title: "AI Generator", url: "/ai-generator", icon: FileCode, new: true },
  { title: "Code Sync", url: "/code-sync", icon: BarChart2, new: true },
  { title: "Smart Review", url: "/smart-review", icon: Bug, new: true, active: true },
];

const resourceItems = [
  { title: "Templates", url: "/templates", icon: LayoutTemplate },
  { title: "Integrations", url: "/integrations", icon: Box },
  { title: "Help & Support", url: "/support", icon: Ticket },
];

const NewBadge = () => (
    <span className="bg-green-100 text-green-800 text-xs font-medium px-1.5 py-0.5 rounded">New</span>
);

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
          <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                  <FileText size={20} />
              </div>
              <h1 className="text-xl font-bold text-slate-800">Livedoc</h1>
          </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    className="[&[data-active=true]]:bg-blue-50 [&[data-active=true]]:text-blue-600 font-medium"
                  >
                    <Link to={item.url}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 mt-4">AI TOOLS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {aiToolItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname.startsWith(item.url) || item.active}
                    className={item.active ? "text-red-600 bg-red-50 font-medium" : "[&[data-active=true]]:bg-blue-50 [&[data-active=true]]:text-blue-600 font-medium"}
                  >
                    <Link to={item.url} className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </div>
                      {item.new && <NewBadge />}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 mt-4">RESOURCES</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname.startsWith(item.url)}
                    className="[&[data-active=true]]:bg-blue-50 [&[data-active=true]]:text-blue-600 font-medium"
                  >
                    <Link to={item.url}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t flex flex-col gap-3">
          <Button variant="ghost" className="w-full justify-start gap-2 text-slate-600 font-medium">
              <Sun size={20} />
              <span>Light</span>
          </Button>
          <div className="px-2 py-1">
              <p className="text-sm font-semibold text-slate-800">
                {user?.email?.split('@')[0] || 'User'}
              </p>
              <div className="w-full bg-slate-200 rounded-full h-1 mt-1.5">
                  <div className="bg-blue-600 h-1 rounded-full" style={{ width: '75%' }}></div>
              </div>
          </div>
          <Separator className="my-1" />
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-slate-600 font-medium"
            onClick={handleSignOut}
          >
              <LogOut size={20} />
              <span>Logout</span>
          </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
