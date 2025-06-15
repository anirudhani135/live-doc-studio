
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/ui/metric-card";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { 
  FileText, 
  Edit, 
  Trash2, 
  Bolt, 
  Folder, 
  Clock, 
  Plus, 
  Code2, 
  Bug, 
  BarChart2, 
  Box, 
  Ticket, 
  RefreshCw,
  TrendingUp,
  Zap,
  FolderOpen,
  ArrowRight,
  Sparkles
} from "lucide-react";

// Re-checked all color classes for yellow/amber, NONE remain!
// All classes are neutral, blue, emerald, or violet. No yellow/amber Tailwind classes.

const metricCards = [
  {
    label: "Time Saved",
    value: "228.0",
    unit: "hours",
    subtitle: "This quarter",
    icon: <Clock size={24} />,
    trend: { value: "+15%", isPositive: true },
  },
  {
    label: "AI Tokens",
    value: "58M",
    subtitle: "Total processed",
    icon: <Zap size={24} />,
    trend: { value: "+0.4M", isPositive: true },
  },
  {
    label: "Projects",
    value: "50",
    subtitle: "145 documents created",
    icon: <FolderOpen size={24} />,
    trend: { value: "+12", isPositive: true },
  },
];

const projects = [
  {
    id: 1,
    name: "Codeguide Starter Lite: Modern Web App Architecture",
    type: "Code Project",
    draft: true,
    created: "6/14/2025",
    updated: "6/14/2025",
    status: "Active",
    icon: <FileText size={20} className="text-blue-500" />,
    iconBg: "bg-blue-50",
    progress: 75,
  },
  {
    id: 2,
    name: "Codeguide Starter Lite: Next.js 14 Web Application",
    type: "Code Project",
    draft: true,
    created: "6/14/2025",
    updated: "6/14/2025",
    status: "Active",
    icon: <FileText size={20} className="text-emerald-500" />,
    iconBg: "bg-emerald-50",
    progress: 60,
  },
  {
    id: 3,
    name: "AI-Driven Task Management System: Complete Architecture",
    type: "Code Project",
    draft: false,
    created: "6/11/2025",
    updated: "6/11/2025",
    status: "Completed",
    icon: <FileText size={20} className="text-violet-500" />,
    iconBg: "bg-violet-50",
    progress: 100,
  },
];

const quickActions = [
  { 
    label: "New Project", 
    icon: <Plus size={20} />, 
    iconBg: "bg-blue-50", 
    iconColor: "text-blue-600",
    description: "Start from scratch"
  },
  { 
    label: "Import Codebase", 
    icon: <Code2 size={20} />, 
    iconBg: "bg-emerald-50", 
    iconColor: "text-emerald-600",
    description: "From existing code"
  },
  { 
    label: "Debug Agent", 
    icon: <Bug size={20} />, 
    iconBg: "bg-red-50", 
    iconColor: "text-red-600",
    description: "AI-powered debugging",
    badge: "New"
  },
  { 
    label: "LLM Compare", 
    icon: <BarChart2 size={20} />, 
    iconBg: "bg-violet-50", 
    iconColor: "text-violet-600",
    description: "Model comparison"
  },
  { 
    label: "Starter Kits", 
    icon: <Box size={20} />, 
    iconBg: "bg-slate-50", 
    iconColor: "text-slate-600",
    description: "Template library"
  },
  { 
    label: "Member Pass", 
    icon: <Ticket size={20} />, 
    iconBg: "bg-slate-50", 
    iconColor: "text-slate-600",
    description: "Exclusive features"
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const isCompleted = status === "Completed";
  return (
    <div className={cn(
      "flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full",
      isCompleted 
        ? "text-green-600 bg-green-50" 
        : "text-emerald-600 bg-emerald-50"
    )}>
      <span className={cn(
        "h-1.5 w-1.5 rounded-full",
        isCompleted ? "bg-green-500" : "bg-emerald-500"
      )}></span>
      <span>{status}</span>
    </div>
  );
};

const Tag = ({ children, icon }: { children: React.ReactNode, icon?: React.ReactNode }) => (
  <div className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 border">
    {icon}
    {children}
  </div>
);

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
    <div 
      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
      style={{ width: `${progress}%` }}
    />
  </div>
);

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

const Dashboard = () => {
  return (
    <div className="page-transition bg-white min-h-screen">
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-8 space-y-8 bg-white min-h-screen">
        {/* Header */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-100">
              <Sparkles className="h-5 w-5 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          </div>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-container">
          {metricCards.map((card, index) => (
            <MetricCard
              key={card.label}
              label={card.label}
              value={card.value}
              subtitle={card.subtitle}
              icon={card.icon}
              trend={card.trend}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Lower section: Recents + Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Recent Projects */}
          <EnhancedCard
            title="Recent Projects"
            description="Your recently worked on projects"
            className="lg:col-span-3"
            delay={300}
          >
            <div className="flex justify-end mb-4">
              <Button variant="ghost" size="sm" className="text-blue-600 font-medium hover:bg-blue-50 interactive-button">
                View all
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="space-y-3">
              {projects.map((project, index) => (
                <div 
                  key={project.id} 
                  className="group rounded-xl border bg-white p-4 transition-all duration-300 hover:shadow-md hover:bg-gray-50 cursor-pointer animate-slide-in-from-left"
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn("p-2.5 rounded-lg", project.iconBg)}>
                      {project.icon}
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {project.name}
                        </h3>
                        
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                          <Tag>{project.type}</Tag>
                          {project.draft && <Tag icon={<RefreshCw size={10} />}>Draft</Tag>}
                          <span>•</span>
                          <span>Created {project.created}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <StatusBadge status={project.status} />
                          <span className="text-xs text-gray-500">
                            {project.progress}% complete
                          </span>
                        </div>
                      </div>
                      
                      <ProgressBar progress={project.progress} />
                    </div>
                    
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-gray-100">
                        <Edit size={14} className="text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-red-50">
                        <Trash2 size={14} className="text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </EnhancedCard>

          {/* Quick Actions */}
          <EnhancedCard
            title="Quick Actions"
            description="Fast access to common tasks"
            className="lg:col-span-2"
            delay={400}
          >
            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((action, index) => (
                <div
                  key={action.label}
                  className="group flex items-center gap-4 p-4 border rounded-lg bg-white hover:bg-gray-50 transition-all duration-200 cursor-pointer animate-slide-in-from-right"
                  style={{ animationDelay: `${500 + index * 50}ms` }}
                >
                  <div className={cn("p-2.5 rounded-lg transition-colors", action.iconBg)}>
                    <div className={action.iconColor}>
                      {action.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
                        {action.label}
                      </span>
                      {action.badge && (
                        <span className="bg-blue-100 text-blue-600 text-xs px-1.5 py-0.5 rounded font-medium">
                          {action.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {action.description}
                    </p>
                  </div>
                  
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </EnhancedCard>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
