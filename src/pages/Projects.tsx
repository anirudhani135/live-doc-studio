
import React, { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { useAnalytics } from '@/hooks/useAnalytics';
import ProjectsHeader from '@/components/projects/ProjectsHeader';
import ProjectsBanner from '@/components/projects/ProjectsBanner';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import ProjectsEmptyState from '@/components/projects/ProjectsEmptyState';
import ProjectDialog from '@/components/projects/ProjectDialog';
import AIProjectWizard from '@/components/projects/AIProjectWizard';

const Projects = () => {
  const { projects, createProject, loading } = useProjects();
  const { trackProjectCreated, trackFeatureUsed } = useAnalytics();
  
  const [activeTab, setActiveTab] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);

  const handleCreateProject = () => {
    trackFeatureUsed('manual_project_creation');
    setDialogOpen(true);
  };

  const handleStartWizard = () => {
    trackFeatureUsed('ai_project_wizard');
    setWizardOpen(true);
  };

  const handleProjectSave = async (projectData: any) => {
    try {
      await createProject(projectData);
      trackProjectCreated(projectData);
      setDialogOpen(false);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const filteredProjects = projects.filter(project => {
    switch (activeTab) {
      case 'recent':
        const recentDate = new Date();
        recentDate.setDate(recentDate.getDate() - 7);
        return new Date(project.created_at) > recentDate;
      case 'favorites':
        return project.metadata?.favorited;
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <ProjectsHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        projectCount={projects.length}
        onCreateProject={handleCreateProject}
        onStartWizard={handleStartWizard}
      />

      {projects.length > 0 && (
        <div className="mb-6">
          <ProjectsBanner onStartWizard={handleStartWizard} />
        </div>
      )}

      {filteredProjects.length > 0 ? (
        <ProjectsGrid projects={filteredProjects} />
      ) : (
        <ProjectsEmptyState onStartWizard={handleStartWizard} />
      )}

      <ProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleProjectSave}
      />

      <AIProjectWizard
        open={wizardOpen}
        onOpenChange={setWizardOpen}
      />
    </div>
  );
};

export default Projects;
