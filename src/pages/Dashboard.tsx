
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
  <span className="inline-flex items-center text-xs font-semibold rounded-full px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 gap-2 shadow-sm hover:shadow-md transition-all duration-200">
    <BadgeCheck size={14} className="text-emerald-600" />
    {status}
  </span>
);

const CategoryTag = ({ category }: { category: string }) => (
  <span className="inline-flex items-center text-xs font-medium rounded-full px-4 py-2 bg-slate-50 text-slate-600 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
    {category}
  </span>
);

const Dashboard = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-10 py-16 flex flex-col gap-12 bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/50 min-h-screen transition-all duration-300">
      {/* Dashboard Header */}
      <div className="space-y-4">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 mb-3">Dashboard</h1>
        <div className="text-slate-600 text-xl font-medium">Welcome to your documentation workspace</div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {metricCards.map((card, i) => (
          <Card key={card.label} className="shadow-xl border-0 bg-white/98 backdrop-blur-md rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] group overflow-hidden">
            <CardContent className="flex flex-col gap-4 py-10 px-10 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  {card.icon}
                </div>
                <span className="text-xl font-semibold text-slate-800">{card.label}</span>
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-slate-900 mt-3 mb-2 relative z-10">{card.value}</div>
              <div className="text-sm text-slate-500 font-medium relative z-10">{card.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lower section: Recents + Inspiration */}
      <div className="flex flex-col lg:flex-row gap-10 w-full">
        {/* Recent Projects */}
        <Card className="flex-1 min-w-[400px] shadow-xl border-0 bg-white/98 backdrop-blur-md rounded-3xl overflow-hidden">
          <CardHeader className="flex-row justify-between items-center pt-10 pb-4 px-10">
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold text-slate-900 mb-0">Recent Projects</CardTitle>
              <CardDescription className="text-lg font-medium text-slate-600">Your recently worked on projects</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600 font-semibold hover:bg-blue-50 px-4 py-3 h-auto rounded-2xl group transition-all duration-200 border border-transparent hover:border-blue-200">
              View all <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </CardHeader>
          <CardContent className="pt-2 px-10 pb-10">
            <div className="flex flex-col gap-6">
              {projects.map((p) => (
                <div key={p.id} className="rounded-2xl border border-slate-200 bg-gradient-to-r from-white via-slate-50/30 to-white px-8 py-8 shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:scale-[1.02] group cursor-pointer">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 group-hover:bg-blue-100 transition-colors duration-300">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="font-semibold text-xl text-slate-900 leading-tight group-hover:text-blue-900 transition-colors duration-300">{p.name}</span>
                    </div>
                    <div className="flex gap-4">
                      <StatusTag status={p.status} />
                      <CategoryTag category={p.category} />
                    </div>
                    <div className="text-sm text-slate-500 font-medium">{`Created ${p.created}  •  Updated ${p.updated}`}</div>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-3 ml-auto">
                    <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-200" aria-label="Edit">
                      <Edit size={20} className="text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl hover:bg-red-50 transition-all duration-200 border border-transparent hover:border-red-200" aria-label="Delete">
                      <Trash2 size={20} className="text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inspiration */}
        <Card className="flex-[1.1] min-w-[400px] shadow-xl border-0 bg-white/98 backdrop-blur-md rounded-3xl overflow-hidden">
          <CardHeader className="flex-row justify-between items-center pt-10 pb-4 px-10">
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold text-slate-900 mb-0">Inspiration</CardTitle>
              <CardDescription className="text-lg font-medium text-slate-600">Ideas to kickstart your next project</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600 font-semibold hover:bg-blue-50 px-4 py-3 h-auto rounded-2xl group transition-all duration-200 border border-transparent hover:border-blue-200">
              View all <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </CardHeader>
          <CardContent className="pt-2 px-10 pb-10">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {inspirationCards.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 px-5 py-4 border border-slate-200 bg-gradient-to-br from-white via-slate-50/50 to-white rounded-2xl text-base font-medium text-slate-800 shadow-lg hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50/50 hover:via-white hover:to-blue-50/30 hover:shadow-xl transition-all duration-300 hover:scale-[1.05] cursor-pointer group"
                  style={{ minHeight: 64 }}
                >
                  <span className="text-blue-600 group-hover:text-blue-700 transition-colors duration-300 group-hover:scale-110 transform">{item.icon}</span>
                  <span className="group-hover:text-slate-900 transition-colors duration-300 font-semibold">{item.label}</span>
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
