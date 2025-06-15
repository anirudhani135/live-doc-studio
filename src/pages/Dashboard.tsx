
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
    icon: <Wand2 size={22} className="text-primary" />,
  },
  {
    label: "Tokens Saved",
    value: "5.2 million",
    sub: "+0.4 million from last document",
    icon: <Bolt size={22} className="text-primary" />,
  },
  {
    label: "Projects Completed",
    value: "2",
    sub: "13 documents created",
    icon: <FileText size={22} className="text-primary" />,
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
  <span className="inline-flex items-center text-xs font-medium rounded px-2 py-1 bg-green-50 text-green-700 border border-green-200 gap-1">
    <BadgeCheck size={14} className="text-green-500 inline-block" />
    {status}
  </span>
);
const CategoryTag = ({ category }: { category: string }) => (
  <span className="inline-flex items-center text-xs font-medium rounded px-2 py-1 bg-gray-50 text-gray-700 border border-gray-200">
    {category}
  </span>
);

const Dashboard = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-10 flex flex-col gap-7 bg-gradient-to-br from-[#f7fafc] via-[#f4f7fb] to-[#edf2fa] min-h-[90vh] transition-colors duration-200">
      {/* Dashboard Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-1">Dashboard</h1>
        <div className="text-muted-foreground text-base">Welcome to your documentation workspace</div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {metricCards.map((card, i) => (
          <Card key={card.label} className="shadow-none border border-[#e5eaf2] bg-white/90 rounded-xl">
            <CardContent className="flex flex-col gap-2 py-6 px-6">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded bg-[#f9fafe] border border-[#e3e8ef]">{card.icon}</div>
                <span className="text-base font-medium">{card.label}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mt-1 mb-0.5">{card.value}</div>
              <div className="text-xs text-muted-foreground">{card.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lower section: Recents + Inspiration */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Recent Projects */}
        <Card className="flex-1 min-w-[340px] shadow-none border border-[#e5eaf2] bg-white/90 rounded-xl">
          <CardHeader className="flex-row justify-between items-center pt-5 pb-1 px-6">
            <div>
              <CardTitle className="text-lg font-semibold mb-0">Recent Projects</CardTitle>
              <CardDescription className="text-[15px] font-medium">Your recently worked on projects</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary font-semibold hover:bg-primary/10 px-2 h-8 group">
              View all <ChevronRight className="ml-1 w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
            </Button>
          </CardHeader>
          <CardContent className="pt-1 px-6 pb-4">
            <div className="flex flex-col gap-4">
              {projects.map((p) => (
                <div className="rounded-lg border border-[#e9ebf0] bg-[#f8fafc] px-5 py-4 mb-0 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 transition hover:border-primary/40 hover:shadow-md group">
                  <div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <span className="font-semibold text-md text-foreground">{p.name}</span>
                    </div>
                    <div className="flex gap-2 mt-2 mb-1">
                      <StatusTag status={p.status} />
                      <CategoryTag category={p.category} />
                    </div>
                    <div className="text-xs text-muted-foreground pl-1">{`Created ${p.created}  •  Updated ${p.updated}`}</div>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-2 ml-auto">
                    <Button variant="ghost" size="icon" className="w-8 h-8" aria-label="Edit">
                      <Edit size={16} className="text-primary" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8" aria-label="Delete">
                      <Trash2 size={16} className="text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Inspiration */}
        <Card className="flex-[1.1] min-w-[340px] shadow-none border border-[#e5eaf2] bg-white/90 rounded-xl">
          <CardHeader className="flex-row justify-between items-center pt-5 pb-1 px-6">
            <div>
              <CardTitle className="text-lg font-semibold mb-0">Inspiration</CardTitle>
              <CardDescription className="text-[15px] font-medium">Ideas to kickstart your next project</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary font-semibold hover:bg-primary/10 px-2 h-8 group">
              View all <ChevronRight className="ml-1 w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
            </Button>
          </CardHeader>
          <CardContent className="pt-1 px-6 pb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {inspirationCards.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 px-3 py-2 border border-[#e9ebf0] bg-[#f7fafd] rounded-lg text-[15px] font-medium text-foreground shadow-sm hover:border-primary/30 hover:bg-primary/5 transition"
                  style={{ minHeight: 44 }}
                >
                  <span className="text-primary">{item.icon}</span>
                  {item.label}
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
