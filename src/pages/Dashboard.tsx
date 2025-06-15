
import { EnhancedCard, EnhancedCardHeader, EnhancedCardTitle, EnhancedCardDescription, EnhancedCardContent } from "@/components/ui/enhanced-card";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { FileText, Edit, Trash2, Bolt, Folder, Clock, Plus, Code2, Bug, BarChart2, Box, Ticket, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { StaggerItem, staggerItemVariants, staggerItemTransition } from "@/components/ui/page-transition";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { enhancedToast } from "@/components/ui/toast-system";

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
    { label: "New Project", icon: <Plus size={20} className="text-blue-500" />, iconBg: "bg-blue-100", action: () => enhancedToast.success("New Project", "Starting new project creation...") },
    { label: "Existing Codebase", icon: <Code2 size={20} className="text-emerald-500" />, iconBg: "bg-emerald-100", action: () => enhancedToast.info("Import Codebase", "Select a repository to import") },
    { label: "Debug Agent", icon: <Bug size={20} className="text-red-500" />, iconBg: "bg-red-100", action: () => enhancedToast.warning("Debug Agent", "Launching AI debugging assistant") },
    { label: "LLM Comparison", icon: <BarChart2 size={20} className="text-violet-500" />, iconBg: "bg-violet-100", action: () => enhancedToast.info("LLM Compare", "Opening model comparison tool") },
    { label: "Starter Kits", icon: <Box size={20} className="text-amber-500" />, iconBg: "bg-amber-100", action: () => enhancedToast.success("Starter Kits", "Browse available templates") },
    { label: "Member Pass", icon: <Ticket size={20} className="text-slate-500" />, iconBg: "bg-slate-100", action: () => enhancedToast.info("Member Pass", "View membership benefits") },
];

const StatusBadge = ({ status }: { status: string }) => (
  <motion.div 
    className="flex items-center gap-2 text-sm font-medium text-slate-600"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
  >
    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
    <span>{status}</span>
  </motion.div>
);

const Tag = ({ children, icon }: { children: React.ReactNode, icon?: React.ReactNode }) => (
  <motion.div 
    className="inline-flex items-center gap-1.5 rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 border border-slate-200"
    whileHover={{ scale: 1.05, backgroundColor: "rgb(241 245 249)" }}
    transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
  >
    {icon}
    {children}
  </motion.div>
);

const Dashboard = () => {
  const handleEdit = (projectId: number) => {
    enhancedToast.success("Edit Project", `Opening project ${projectId} for editing`);
  };

  const handleDelete = (projectId: number) => {
    enhancedToast.error("Delete Project", `Are you sure you want to delete project ${projectId}?`, {
      label: "Undo",
      onClick: () => enhancedToast.info("Undone", "Delete action cancelled")
    });
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 bg-slate-50 min-h-screen">
      {/* Metrics Cards */}
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metricCards.map((card, index) => (
            <StaggerItem
              key={card.label}
              variants={staggerItemVariants}
              transition={staggerItemTransition}
              custom={index}
            >
              <EnhancedCard variant="floating" className="bg-white border shadow-sm rounded-xl">
                <EnhancedCardContent className="p-6 flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{card.label}</p>
                    <motion.p 
                      className="text-4xl font-bold text-blue-600 mt-2 mb-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, type: "spring" as const, stiffness: 200 }}
                    >
                      {card.value}
                    </motion.p>
                    <p className="text-xs text-slate-400">{card.sub}</p>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                  >
                    {card.icon}
                  </motion.div>
                </EnhancedCardContent>
              </EnhancedCard>
            </StaggerItem>
          ))}
        </div>
      </ScrollReveal>

      {/* Lower section: Recents + Quick Actions */}
      <ScrollReveal direction="up" delay={0.2}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Recent Projects */}
          <EnhancedCard variant="interactive" className="lg:col-span-3 bg-white border shadow-sm rounded-xl">
            <EnhancedCardHeader className="flex-row justify-between items-center pb-4">
              <div>
                <EnhancedCardTitle className="text-xl font-bold text-slate-800">Recent Projects</EnhancedCardTitle>
                <EnhancedCardDescription className="text-sm text-slate-500">Your recently worked on projects</EnhancedCardDescription>
              </div>
              <EnhancedButton variant="link" size="sm" className="text-blue-600 font-medium">
                View all
              </EnhancedButton>
            </EnhancedCardHeader>
            <EnhancedCardContent className="flex flex-col gap-3">
              {projects.map((p, index) => (
                <StaggerItem
                  key={p.id}
                  variants={staggerItemVariants}
                  transition={staggerItemTransition}
                  custom={index}
                >
                  <motion.div 
                    className="rounded-lg border border-slate-200 bg-white p-4 flex items-center gap-4 cursor-pointer group"
                    whileHover={{ 
                      backgroundColor: "rgb(248 250 252)",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                    }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                  >
                    <motion.div 
                      className={`p-2 rounded-md ${p.iconBg}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                    >
                      {p.icon}
                    </motion.div>
                    <div className="flex-1 space-y-1">
                        <p className="font-semibold text-sm text-slate-800 group-hover:text-blue-600 transition-colors">{p.name}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Tag>{p.type}</Tag>
                            {p.draft && <Tag icon={<RefreshCw size={12} />}>Draft</Tag>}
                            <span>•</span>
                            <span>Created {p.created}</span>
                            <span>•</span>
                            <StatusBadge status={p.status} />
                        </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <EnhancedButton 
                        variant="ghost" 
                        size="icon" 
                        className="w-8 h-8 rounded-md hover:bg-slate-200" 
                        aria-label="Edit"
                        onClick={() => handleEdit(p.id)}
                        effect="ripple"
                      >
                        <Edit size={16} className="text-slate-500" />
                      </EnhancedButton>
                      <EnhancedButton 
                        variant="ghost" 
                        size="icon" 
                        className="w-8 h-8 rounded-md hover:bg-red-100" 
                        aria-label="Delete"
                        onClick={() => handleDelete(p.id)}
                        effect="ripple"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </EnhancedButton>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </EnhancedCardContent>
          </EnhancedCard>

          {/* Quick Actions */}
          <EnhancedCard variant="floating" className="lg:col-span-2 bg-white border shadow-sm rounded-xl">
              <EnhancedCardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Bolt size={20} className="text-slate-600" />
                      </motion.div>
                      <div>
                          <EnhancedCardTitle className="text-xl font-bold text-slate-800">Quick Actions</EnhancedCardTitle>
                          <EnhancedCardDescription className="text-sm text-slate-500">Quick access to common tasks</EnhancedCardDescription>
                      </div>
                  </div>
              </EnhancedCardHeader>
              <EnhancedCardContent>
                  <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((item, index) => (
                      <StaggerItem
                        key={item.label}
                        variants={staggerItemVariants}
                        transition={staggerItemTransition}
                        custom={index}
                      >
                        <motion.div
                          className="flex items-center gap-3 p-3 border border-slate-200 bg-white rounded-lg text-sm font-medium text-slate-700 cursor-pointer group"
                          whileHover={{ 
                            backgroundColor: "rgb(248 250 252)",
                            scale: 1.02,
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                          }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                          onClick={item.action}
                        >
                            <motion.div 
                              className={`p-2 rounded-md ${item.iconBg}`}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                            >
                                {item.icon}
                            </motion.div>
                            <span className="group-hover:text-blue-600 transition-colors">{item.label}</span>
                        </motion.div>
                      </StaggerItem>
                  ))}
                  </div>
            </EnhancedCardContent>
          </EnhancedCard>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Dashboard;
