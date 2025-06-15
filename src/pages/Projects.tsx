
import { HelpGuide } from "@/components/HelpGuide";
import { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@/types/project";
import ProjectDialog from "@/components/projects/ProjectDialog";
import ProjectCreationWizard from "@/components/projects/ProjectCreationWizard";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ProjectsHeader from "@/components/projects/ProjectsHeader";
import ProjectsBanner from "@/components/projects/ProjectsBanner";
import ProjectsEmptyState from "@/components/projects/ProjectsEmptyState";
import ProjectsGrid from "@/components/projects/ProjectsGrid";

const Projects = () => {
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState("projects");

  const { projects, loading, createProject, updateProject, deleteProject } = useProjects();

  // Project handlers
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

  // Show wizard if active
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
            <ProjectsHeader
              activeTab={activeTab}
              onTabChange={setActiveTab}
              projectCount={projects.length}
              onCreateProject={handleCreateProject}
              onStartWizard={handleStartWizard}
            />

            <TabsContent value="projects" className="space-y-6">
              <ProjectsBanner onStartWizard={handleStartWizard} />

              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">My Projects</h2>
                <div className="text-sm text-muted-foreground">
                  {projects.length} project{projects.length !== 1 ? 's' : ''} total
                </div>
              </div>

              {projects.length === 0 && !loading ? (
                <ProjectsEmptyState
                  onStartWizard={handleStartWizard}
                  onCreateProject={handleCreateProject}
                />
              ) : (
                <ProjectsGrid
                  projects={projects}
                  loading={loading}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                  onOpen={handleOpenProject}
                />
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
