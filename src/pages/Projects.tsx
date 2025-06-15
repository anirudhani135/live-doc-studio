
import { HelpGuide } from "@/components/HelpGuide";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles, Plus, Grid } from "lucide-react";
import { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@/types/project";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectDialog from "@/components/projects/ProjectDialog";
import ProjectCreationWizard from "@/components/projects/ProjectCreationWizard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Projects = () => {
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState("projects");

  const { projects, loading, createProject, updateProject, deleteProject } = useProjects();

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setShowProjectDialog(true);
  };

  const handleCreateProject = () => {
    setSelectedProject(null);
    setShowProjectDialog(true);
  };

  const handleStartWizard = () => {
    setShowWizard(true);
  };

  const handleWizardComplete = async (projectData: any) => {
    // Create project from wizard data
    const newProject = {
      name: projectData.analysis?.name || "AI Generated Project",
      description: projectData.description,
      type: 'code_project' as const,
      status: 'draft' as const,
      tech_stack: projectData.analysis?.tech_recommendations || [],
      ai_model: projectData.selectedModel as Project['ai_model'],
      metadata: {
        features: projectData.analysis?.features || [],
        timeline: projectData.analysis?.timeline_estimate || "8-12 weeks",
        complexity: "medium" as const,
        questionnaire: projectData.questionnaire,
        integrations: projectData.integrations,
        exportSettings: projectData.exportSettings,
        monitoringConfig: projectData.monitoringConfig
      }
    };

    await createProject(newProject);
    setShowWizard(false);
    setActiveTab("projects");
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

  if (showWizard) {
    return (
      <ProjectCreationWizard
        onComplete={handleWizardComplete}
        onCancel={() => setShowWizard(false)}
      />
    );
  }

  return (
    <div className="flex h-full bg-slate-50">
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="projects" className="flex items-center gap-2">
                  <Grid className="h-4 w-4" />
                  My Projects ({projects.length})
                </TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCreateProject}>
                  <Plus className="h-4 w-4 mr-2" />
                  Quick Create
                </Button>
                <Button onClick={handleStartWizard} className="bg-blue-600 hover:bg-blue-700">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Project Wizard
                </Button>
              </div>
            </div>

            <TabsContent value="projects" className="space-y-6">
              {/* AI Project Wizard Banner */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-2">Create Your Next Project with AI</h2>
                    <p className="mb-4 opacity-90">
                      Let our AI guide you through a comprehensive 9-step project creation process
                    </p>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Sparkles className="h-4 w-4" />
                        AI-Powered Analysis
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        Auto Documentation
                      </div>
                      <div className="flex items-center gap-1">
                        <Grid className="h-4 w-4" />
                        Project Monitoring
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={handleStartWizard}
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Start AI Wizard
                  </Button>
                </div>
              </div>

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
                  <Sparkles className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects yet</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Create your first AI-powered project to get started with intelligent documentation and collaboration
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button onClick={handleStartWizard} className="bg-blue-600 hover:bg-blue-700">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Start AI Wizard
                    </Button>
                    <Button variant="outline" onClick={handleCreateProject}>
                      <Plus className="h-4 w-4 mr-2" />
                      Quick Create
                    </Button>
                  </div>
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
