import { HelpGuide } from "@/components/HelpGuide";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Sparkles, Zap, Brain, ChevronRight, Plus, Grid } from "lucide-react";
import { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@/types/project";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectDialog from "@/components/projects/ProjectDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const suggestionChips = [
  "Purpose & Goals", 
  "Target Audience", 
  "Key Features", 
  "Tech Stack", 
  "Design Preferences",
  "Integration Needs"
];

const aiModels = [
  { name: "GPT-4", description: "Most capable for complex projects", speed: "Medium", accuracy: "High" },
  { name: "Claude", description: "Excellent for documentation", speed: "Fast", accuracy: "High" },
  { name: "Gemini", description: "Great for code generation", speed: "Very Fast", accuracy: "Medium" }
];

const Projects = () => {
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedModel, setSelectedModel] = useState("GPT-4");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState("create");

  const { projects, loading, createProject, updateProject, deleteProject } = useProjects();

  const handleGenerate = async () => {
    if (!projectDescription.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
      // Create a new project based on AI analysis
      const newProject = {
        name: "EcommerceCRM Pro",
        description: projectDescription,
        type: 'code_project' as const,
        status: 'draft' as const,
        tech_stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
        ai_model: selectedModel.toLowerCase() as Project['ai_model'],
        metadata: {
          features: ["Customer Management", "Sales Pipeline", "Inventory Management"],
          timeline: "12-16 weeks",
          complexity: "enterprise" as const,
        }
      };
      createProject(newProject);
      setActiveTab("projects");
    }, 3000);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setShowProjectDialog(true);
  };

  const handleCreateProject = () => {
    setSelectedProject(null);
    setShowProjectDialog(true);
  };

  const handleSaveProject = async (projectData: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    if (selectedProject) {
      await updateProject(selectedProject.id, projectData);
    } else {
      await createProject(projectData);
    }
    setShowProjectDialog(false);
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
    }
  };

  const handleOpenProject = (project: Project) => {
    // TODO: Navigate to project detail page
    console.log('Opening project:', project);
  };

  return (
    <div className="flex h-full bg-slate-50">
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="create" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Create Project
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex items-center gap-2">
                  <Grid className="h-4 w-4" />
                  My Projects ({projects.length})
                </TabsTrigger>
              </TabsList>
              
              <Button onClick={handleCreateProject} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </div>

            <TabsContent value="create" className="space-y-6">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-3 text-slate-800 flex items-center gap-3">
                  <Sparkles className="h-8 w-8 text-blue-600" />
                  What do you want to build?
                </h1>
                <p className="text-muted-foreground text-lg">
                  Describe your project in detail. Our AI will generate comprehensive documentation, 
                  architecture diagrams, and implementation roadmaps.
                </p>
              </div>

              {/* AI Model Selection */}
              <div className="mb-6 p-4 bg-white rounded-lg border">
                <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Choose AI Model
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {aiModels.map((model) => (
                    <button
                      key={model.name}
                      onClick={() => setSelectedModel(model.name)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        selectedModel === model.name
                          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-medium text-slate-800">{model.name}</div>
                      <div className="text-sm text-slate-600 mb-2">{model.description}</div>
                      <div className="flex gap-2">
                        <span className="text-xs px-2 py-1 bg-slate-100 rounded">
                          {model.speed}
                        </span>
                        <span className="text-xs px-2 py-1 bg-slate-100 rounded">
                          {model.accuracy}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Suggestion Chips */}
              <div className="flex items-center gap-4 mb-4">
                <p className="text-sm font-medium text-slate-600 shrink-0">Include details about:</p>
                <div className="flex flex-wrap items-center gap-2">
                  {suggestionChips.map(chip => (
                    <Button 
                      key={chip} 
                      variant="outline" 
                      size="sm" 
                      className="bg-white rounded-full font-normal hover:bg-blue-50 hover:border-blue-300"
                      onClick={() => {
                        const addition = `\n\n${chip}: `;
                        setProjectDescription(prev => prev + addition);
                      }}
                    >
                      {chip}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Template Button */}
              <div className="flex items-center gap-2 mb-6">
                <Button variant="outline" className="bg-white hover:bg-gray-50">
                  <FileText className="h-4 w-4 mr-2"/>
                  Use Template
                </Button>
                <Button variant="outline" className="bg-white hover:bg-gray-50">
                  <Zap className="h-4 w-4 mr-2"/>
                  Import from GitHub
                </Button>
              </div>
              
              {/* Main Input */}
              <div className="mb-6">
                <Textarea 
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="I want to build a comprehensive CRM tool for e-commerce store owners to manage clients, track sales, monitor inventory, orchestrate marketing campaigns, and communicate with clients efficiently. This platform should centralize customer data, streamline sales workflows, provide advanced reporting features, and include AI-powered insights for business optimization."
                  className="min-h-[200px] text-base bg-white border-2 focus:border-blue-400 transition-colors"
                />
              </div>

              {/* Generate Button */}
              <div className="mb-8">
                <Button 
                  onClick={handleGenerate}
                  disabled={!projectDescription.trim() || isGenerating}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-medium"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                      Generating with {selectedModel}...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Project with AI
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>

              {/* AI Output Preview */}
              {(projectDescription || isGenerating) && (
                <div className="border-t pt-8 space-y-6">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">AI-Generated Project Analysis</h3>
                  </div>
                  
                  {isGenerating ? (
                    <div className="space-y-4">
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 border rounded-lg bg-white space-y-3">
                        <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Project Overview
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Name:</span> EcommerceCRM Pro</p>
                          <p><span className="font-medium">Type:</span> Full-stack Web Application</p>
                          <p><span className="font-medium">Complexity:</span> Enterprise-level</p>
                          <p><span className="font-medium">Timeline:</span> 12-16 weeks</p>
                        </div>
                      </div>

                      <div className="p-6 border rounded-lg bg-white space-y-3">
                        <h4 className="font-semibold text-slate-800">Tech Stack Recommendations</h4>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Frontend:</span> React, TypeScript, Tailwind</p>
                          <p><span className="font-medium">Backend:</span> Node.js, Express, PostgreSQL</p>
                          <p><span className="font-medium">Auth:</span> Supabase Auth</p>
                          <p><span className="font-medium">Hosting:</span> Vercel + Supabase</p>
                        </div>
                      </div>

                      <div className="p-6 border rounded-lg bg-white space-y-3 md:col-span-2">
                        <h4 className="font-semibold text-slate-800">Core Features</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <ul className="space-y-1">
                            <li>• Customer Management System</li>
                            <li>• Sales Pipeline Tracking</li>
                            <li>• Inventory Management</li>
                            <li>• Order Processing</li>
                          </ul>
                          <ul className="space-y-1">
                            <li>• Marketing Campaign Tools</li>
                            <li>• Communication Hub</li>
                            <li>• Analytics Dashboard</li>
                            <li>• AI-Powered Insights</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      <FileText className="h-4 w-4 mr-2" />
                      Export Documentation
                    </Button>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      Start Building Project
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">My Projects</h2>
                <div className="text-sm text-muted-foreground">
                  {projects.length} project{projects.length !== 1 ? 's' : ''} total
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-48 bg-gray-200 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects yet</h3>
                  <p className="text-gray-600 mb-4">Create your first project to get started</p>
                  <Button onClick={() => setActiveTab("create")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Project
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onEdit={handleEditProject}
                      onDelete={handleDeleteProject}
                      onOpen={handleOpenProject}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <HelpGuide />
      
      <ProjectDialog
        open={showProjectDialog}
        onOpenChange={setShowProjectDialog}
        project={selectedProject}
        onSave={handleSaveProject}
      />
    </div>
  );
};

export default Projects;
