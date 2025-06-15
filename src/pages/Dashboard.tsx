
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck, FileText, Folder, Edit, Trash2, Bolt, Settings, Users, LayoutDashboard, ChevronRight, Star, Wand2, ShoppingCart, Book, Music, Utensils, GraduationCap, ShieldCheck, MessageSquare } from "lucide-react";

// Sample data (to match screenshots)
const projects = [
  {
    id: 1,
    name: "Comprehensive CRM for E-commerce Management",
    description: "E-commerce Solutions",
    created: "Dec 25, 2024",
    updated: "Dec 25, 2024",
    status: "Completed",
    category: "E-commerce Solutions",
  },
  {
    id: 2,
    name: "Website (Multi-Page)",
    description: "Web Development",
    created: "Dec 24, 2024",
    updated: "Dec 24, 2024",
    status: "Completed",
    category: "Web Development",
  },
];

const metricCards = [
  {
    label: "Time Saved",
    value: "20.5 hours",
    sub: "+3.5 hours from last document",
    icon: <Wand2 size={22} className="text-blue-600" />,
  },
  {
    label: "Tokens Saved",
    value: "5.2 million",
    sub: "+0.4 million from last document",
    icon: <Bolt size={22} className="text-amber-600" />,
  },
  {
    label: "Projects Completed",
    value: "2",
    sub: "13 documents created",
    icon: <FileText size={22} className="text-emerald-600" />,
  },
];

const inspirationCards = [
  { icon: <Folder size={20} />, label: "Fitness Tracker" },
  { icon: <Star size={20} />, label: "Local Events" },
  { icon: <Settings size={20} />, label: "Smart Home Hub" },
  { icon: <Book size={20} />, label: "Learning Assistant" },
  { icon: <ShoppingCart size={20} />, label: "E-commerce" },
  { icon: <Utensils size={20} />, label: "Recipe Finder" },
  { icon: <MessageSquare size={20} />, label: "Chat Application" },
  { icon: <Music size={20} />, label: "Music Streaming" },
  { icon: <GraduationCap size={20} />, label: "Engineering" },
];

const StatusTag = ({ status }: { status: string }) => (
  <span className="inline-flex items-center text-xs font-semibold rounded-full px-3 py-1.5 bg-emerald-100 text-emerald-800 border border-emerald-200 gap-1.5 shadow-sm">
    <BadgeCheck size={12} className="text-emerald-600 inline-block" />
    {status}
  </span>
);

const CategoryTag = ({ category }: { category: string }) => (
  <span className="inline-flex items-center text-xs font-medium rounded-full px-3 py-1.5 bg-slate-100 text-slate-700 border border-slate-200 shadow-sm">
    {category}
  </span>
);

const Dashboard = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-8 py-12 flex flex-col gap-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 min-h-[90vh] transition-all duration-300">
      {/* Dashboard Header */}
      <div className="space-y-2">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-2">Dashboard</h1>
        <div className="text-slate-600 text-lg font-medium">Welcome to your documentation workspace</div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metricCards.map((card, i) => (
          <Card key={card.label} className="shadow-lg border-0 bg-white/95 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="flex flex-col gap-3 py-8 px-8">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-sm">{card.icon}</div>
                <span className="text-lg font-semibold text-slate-800">{card.label}</span>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-1">{card.value}</div>
              <div className="text-sm text-slate-500 font-medium">{card.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lower section: Recents + Inspiration */}
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Recent Projects */}
        <Card className="flex-1 min-w-[380px] shadow-lg border-0 bg-white/95 backdrop-blur-sm rounded-2xl">
          <CardHeader className="flex-row justify-between items-center pt-8 pb-2 px-8">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold text-slate-900 mb-0">Recent Projects</CardTitle>
              <CardDescription className="text-base font-medium text-slate-600">Your recently worked on projects</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600 font-semibold hover:bg-blue-50 px-3 py-2 h-auto rounded-xl group transition-all duration-200">
              View all <ChevronRight className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </CardHeader>
          <CardContent className="pt-2 px-8 pb-8">
            <div className="flex flex-col gap-5">
              {projects.map((p) => (
                <div key={p.id} className="rounded-2xl border border-slate-200 bg-gradient-to-r from-white to-slate-50/50 px-6 py-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-200 hover:border-blue-300 hover:shadow-md hover:scale-[1.01] group">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100 border border-blue-200">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-semibold text-lg text-slate-900 leading-tight">{p.name}</span>
                    </div>
                    <div className="flex gap-3">
                      <StatusTag status={p.status} />
                      <CategoryTag category={p.category} />
                    </div>
                    <div className="text-sm text-slate-500 font-medium">{`Created ${p.created}  •  Updated ${p.updated}`}</div>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-2 ml-auto">
                    <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-blue-50 transition-colors duration-200" aria-label="Edit">
                      <Edit size={18} className="text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-red-50 transition-colors duration-200" aria-label="Delete">
                      <Trash2 size={18} className="text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inspiration */}
        <Card className="flex-[1.1] min-w-[380px] shadow-lg border-0 bg-white/95 backdrop-blur-sm rounded-2xl">
          <CardHeader className="flex-row justify-between items-center pt-8 pb-2 px-8">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold text-slate-900 mb-0">Inspiration</CardTitle>
              <CardDescription className="text-base font-medium text-slate-600">Ideas to kickstart your next project</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600 font-semibold hover:bg-blue-50 px-3 py-2 h-auto rounded-xl group transition-all duration-200">
              View all <ChevronRight className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </CardHeader>
          <CardContent className="pt-2 px-8 pb-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {inspirationCards.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-4 py-3.5 border border-slate-200 bg-gradient-to-br from-white to-slate-50/50 rounded-xl text-base font-medium text-slate-800 shadow-sm hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer group"
                  style={{ minHeight: 52 }}
                >
                  <span className="text-blue-600 group-hover:text-blue-700 transition-colors duration-200">{item.icon}</span>
                  <span className="group-hover:text-slate-900 transition-colors duration-200">{item.label}</span>
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
