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
import { useLocation, Link } from "react-router-dom";
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
  Moon,
  LogOut,
  Code2,
  Sparkles,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

// All yellow/amber classes removed below!
const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "New Project", url: "/projects", icon: PlusCircle },
  { title: "Saved Projects", url: "/projects", icon: Folder },
  { title: "Support", url: "/support", icon: LifeBuoy },
  { title: "Settings", url: "/settings", icon: Settings },
];

const toolItems = [
  { title: "Repo to Docs", url: "/repo-to-docs", icon: FileCode, new: true },
  { title: "LLM Compare", url: "/llm-compare", icon: BarChart2, new: true },
  { title: "Debug Agent", url: "/debug-agent", icon: Bug, new: true, active: true },
];

// Resource items verified: none use yellow/amber
const resourceItems = [
  { title: "Starter Kits", url: "/starter-kits", icon: Box },
  { title: "CodeGuide Pass", url: "/codeguide-pass", icon: Ticket },
  { title: "Templates", url: "/templates", icon: LayoutTemplate },
];

const NewBadge = () => (
  <span className="bg-emerald-50 text-emerald-700 text-xs font-medium px-2 py-0.5 rounded-full border border-emerald-200">
    New
  </span>
);

export function AppSidebar() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-2.5 rounded-xl shadow-sm">
            <Code2 size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Livedoc</h1>
            <p className="text-xs text-gray-600">AI Documentation Platform</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-3 bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    className="transition-all duration-200 hover:bg-gray-100 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-50 data-[active=true]:to-blue-25 data-[active=true]:text-blue-600 data-[active=true]:border-r-2 data-[active=true]:border-blue-500 font-medium rounded-lg px-3 py-2.5"
                  >
                    <Link to={item.url} className="flex items-center gap-3">
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
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mt-6 mb-3 flex items-center gap-2">
            <Sparkles className="h-3 w-3" />
            AI Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {toolItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname.startsWith(item.url) || item.active}
                    className={`transition-all duration-200 hover:bg-gray-100 rounded-lg px-3 py-2.5 font-medium ${
                      item.active 
                        ? "text-red-600 bg-red-50 border border-red-200" 
                        : "data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-50 data-[active=true]:to-blue-25 data-[active=true]:text-blue-600 data-[active=true]:border-r-2 data-[active=true]:border-blue-500"
                    }`}
                  >
                    <Link to={item.url} className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-3">
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
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mt-6 mb-3">
            Resources
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {resourceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname.startsWith(item.url)}
                    className="transition-all duration-200 hover:bg-gray-100 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-50 data-[active=true]:to-blue-25 data-[active=true]:text-blue-600 data-[active=true]:border-r-2 data-[active=true]:border-blue-500 font-medium rounded-lg px-3 py-2.5"
                  >
                    <Link to={item.url} className="flex items-center gap-3">
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

      <SidebarFooter className="p-4 border-t border-gray-200 space-y-3 bg-white">
        <Button 
          variant="ghost" 
          onClick={toggleTheme}
          className="w-full justify-start gap-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg px-3 py-2.5"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
        </Button>
        
        <div className="px-3 py-2">
          <p className="text-sm font-semibold text-gray-900 mb-2">Pro Member</p>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">75% of quota used</p>
        </div>
        
        <Separator className="my-2 bg-gray-200" />
        
        <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg px-3 py-2.5">
          <LogOut size={18} />
          <span>Sign Out</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
