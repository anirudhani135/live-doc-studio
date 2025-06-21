
import React, { useState, useCallback, useMemo } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Project } from '@/types/project';
import ProjectsHeader from '@/components/projects/ProjectsHeader';
import ProjectsBanner from '@/components/projects/ProjectsBanner';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import ProjectsEmptyState from '@/components/projects/ProjectsEmptyState';
import ProjectDialog from '@/components/projects/ProjectDialog';
import AIProjectWizard from '@/components/projects/AIProjectWizard';

/**
 * Main Projects page component with optimized performance
 * Uses memoization and optimized re-rendering patterns
 */
const Projects = () => {
  const { projects, createProject, updateProject, deleteProject, loading } = useProjects();
  const { trackProjectCreated, trackFeatureUsed } = useAnalytics();
  
  const [activeTab, setActiveTab] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);

  // Memoize filtered projects to prevent unnecessary recalculations
  const filteredProjects = useMemo(() => {
    if (loading || !Array.isArray(projects)) return [];
    
    return projects.filter(project => {
      switch (activeTab) {
        case 'recent': {
          const recentDate = new Date();
          recentDate.setDate(recentDate.getDate() - 7);
          return new Date(project.created_at) > recentDate;
        }
        case 'favorites':
          return project.metadata?.favorited;
        default:
          return true;
      }
    });
  }, [projects, activeTab, loading]);

  // Memoized event handlers to prevent unnecessary re-renders
  const handleCreateProject = useCallback(() => {
    trackFeatureUsed('manual_project_creation');
    setDialogOpen(true);
  }, [trackFeatureUsed]);

  const handleStartWizard = useCallback(() => {
    trackFeatureUsed('ai_project_wizard');
    setWizardOpen(true);
  }, [trackFeatureUsed]);

  const handleProjectSave = useCallback(async (projectData: any) => {
    try {
      await createProject(projectData);
      trackProjectCreated(projectData);
      setDialogOpen(false);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  }, [createProject, trackProjectCreated]);

  const handleEditProject = useCallback((project: Project) => {
    console.log('Edit project:', project);
    // TODO: Implement edit functionality
  }, []);

  const handleDeleteProject = useCallback(async (id: string) => {
    try {
      await deleteProject(id);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  }, [deleteProject]);

  const handleOpenProject = useCallback((project: Project) => {
    console.log('Open project:', project);
    // TODO: Implement project opening functionality
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  // Show loading spinner during initial load
  if (loading && !projects.length) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      {/* Projects header with tabs and actions */}
      <ProjectsHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        projectCount={projects?.length || 0}
        onCreateProject={handleCreateProject}
        onStartWizard={handleStartWizard}
      />

      {/* Banner for AI wizard promotion (only show when projects exist) */}
      {projects?.length > 0 && (
        <div className="mb-6">
          <ProjectsBanner onStartWizard={handleStartWizard} />
        </div>
      )}

      {/* Main content area - projects grid or empty state */}
      {filteredProjects.length > 0 ? (
        <ProjectsGrid 
          projects={filteredProjects}
          loading={loading}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
          onOpen={handleOpenProject}
        />
      ) : (
        <ProjectsEmptyState 
          onStartWizard={handleStartWizard}
          onCreateProject={handleCreateProject}
        />
      )}

      {/* Modal dialogs */}
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
