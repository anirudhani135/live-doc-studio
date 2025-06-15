
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Edit, Trash2, Bolt, Folder, Clock, Plus, Code2, Bug, BarChart2, Box, Ticket, RefreshCw } from "lucide-react";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";

const metricCards = [
  {
    label: "Time Saved",
    value: "228.0 hours",
    sub: "+3.5 hours from last project",
    icon: <Clock size={28} className="text-slate-500" />,
  },
  {
    label: "Tokens Saved",
    value: "58 million",
    sub: "+0.4 million from last document",
    icon: <Bolt size={28} className="text-slate-500" />,
  },
  {
    label: "Projects Created",
    value: "50",
    sub: "145 documents created",
    icon: <Folder size={28} className="text-slate-500" />,
  },
];

const projects = [
  {
    id: 1,
    name: "Codeguide Starter Lite: Modern Web App...",
    type: "Code Project",
    draft: true,
    created: "6/14/2025",
    updated: "6/14/2025",
    status: "Active",
    icon: <FileText size={20} className="text-violet-500" />,
    iconBg: "bg-violet-100",
  },
  {
    id: 2,
    name: "Codeguide Starter Lite: Next.js 14 Web Ap...",
    type: "Code Project",
    draft: true,
    created: "6/14/2025",
    updated: "6/14/2025",
    status: "Active",
    icon: <FileText size={20} className="text-blue-500" />,
    iconBg: "bg-blue-100",
  },
  {
    id: 3,
    name: "AI-Driven Task Management System:...",
    type: "Code Project",
    draft: false,
    created: "6/11/2025",
    updated: "6/11/2025",
    status: "Active",
    icon: <FileText size={20} className="text-emerald-500" />,
    iconBg: "bg-emerald-100",
  },
];

const quickActions = [
    { label: "New Project", icon: <Plus size={20} className="text-blue-500" />, iconBg: "bg-blue-100" },
    { label: "Existing Codebase", icon: <Code2 size={20} className="text-emerald-500" />, iconBg: "bg-emerald-100" },
    { label: "Debug Agent", icon: <Bug size={20} className="text-red-500" />, iconBg: "bg-red-100" },
    { label: "LLM Comparison", icon: <BarChart2 size={20} className="text-violet-500" />, iconBg: "bg-violet-100" },
    { label: "Starter Kits", icon: <Box size={20} className="text-amber-500" />, iconBg: "bg-amber-100" },
    { label: "Member Pass", icon: <Ticket size={20} className="text-slate-500" />, iconBg: "bg-slate-100" },
];

const StatusBadge = ({ status }: { status: string }) => (
  <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
    <span>{status}</span>
  </div>
);

const Tag = ({ children, icon }: { children: React.ReactNode, icon?: React.ReactNode }) => (
  <div className="inline-flex items-center gap-1.5 rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 border border-slate-200">
    {icon}
    {children}
  </div>
);


const Dashboard = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 bg-slate-50 min-h-screen">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metricCards.map((card) => (
          <Card key={card.label} className="bg-white border shadow-sm rounded-xl">
            <CardContent className="p-6 flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">{card.label}</p>
                <p className="text-4xl font-bold text-blue-600 mt-2 mb-1">{card.value}</p>
                <p className="text-xs text-slate-400">{card.sub}</p>
              </div>
              {card.icon}
            </CardContent>
          </Card>
        ))}
      </div>

      <AnalyticsChart />

      {/* Lower section: Recents + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Recent Projects */}
        <Card className="lg:col-span-3 bg-white border shadow-sm rounded-xl">
          <CardHeader className="flex-row justify-between items-center pb-4">
            <div>
              <CardTitle className="text-xl font-bold text-slate-800">Recent Projects</CardTitle>
              <CardDescription className="text-sm text-slate-500">Your recently worked on projects</CardDescription>
            </div>
            <Button variant="link" size="sm" className="text-blue-600 font-medium">
              View all
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {projects.map((p) => (
              <div key={p.id} className="rounded-lg border border-slate-200 bg-white p-4 flex items-center gap-4 transition-all hover:bg-slate-50 cursor-pointer">
                <div className={`p-2 rounded-md ${p.iconBg}`}>
                  {p.icon}
                </div>
                <div className="flex-1 space-y-1">
                    <p className="font-semibold text-sm text-slate-800">{p.name}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Tag>{p.type}</Tag>
                        {p.draft && <Tag icon={<RefreshCw size={12} />}>Draft</Tag>}
                        <span>•</span>
                        <span>Created {p.created}</span>
                        <span>•</span>
                        <StatusBadge status={p.status} />
                    </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md hover:bg-slate-200" aria-label="Edit">
                    <Edit size={16} className="text-slate-500" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md hover:bg-red-100" aria-label="Delete">
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-2 bg-white border shadow-sm rounded-xl">
            <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                    <Bolt size={20} className="text-slate-600" />
                    <div>
                        <CardTitle className="text-xl font-bold text-slate-800">Quick Actions</CardTitle>
                        <CardDescription className="text-sm text-slate-500">Quick access to common tasks</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-3">
                {quickActions.map((item) => (
                    <div
                    key={item.label}
                    className="flex items-center gap-3 p-3 border border-slate-200 bg-white rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                    >
                        <div className={`p-2 rounded-md ${item.iconBg}`}>
                            {item.icon}
                        </div>
                        <span>{item.label}</span>
                    </div>
                ))}
                </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;
